import React, { useState, useEffect, useCallback } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useRef } from 'react';
import { Check, X, Code, Image, Target } from 'lucide-react';
import './QuestionRenderer.css';

const QuestionRenderer = ({ question, selectedAnswer, onAnswerChange, questionNumber }) => {
  const [localAnswer, setLocalAnswer] = useState(selectedAnswer || null);
  const [dragItems, setDragItems] = useState([]);
  const [matchingPairs, setMatchingPairs] = useState({});
  const [selectedHotspots, setSelectedHotspots] = useState([]);
  const [multiSelectAnswers, setMultiSelectAnswers] = useState([]);
  const [dropZoneItems, setDropZoneItems] = useState({});
  const [orderingItems, setOrderingItems] = useState([]);
  // Custom drag-drop (for question.type === 'drag-drop')
  const [draggingItem, setDraggingItem] = useState(null); // index of item being dragged
  const [dragPos, setDragPos] = useState({ x: 0, y: 0 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const dropZoneRefs = useRef([]);
  const dragContainerRef = useRef(null);

  // Moved above effects to avoid temporal dead zone when referenced in dependency arrays
  const handleAnswerUpdate = useCallback((answer) => {
    setLocalAnswer(answer);
    onAnswerChange(answer);
  }, [onAnswerChange]);

  // Single drag end handler for all drag-drop operations
  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination, draggableId } = result;

    // Handle ordering questions
    if (result.source.droppableId === 'ordering-list' && result.destination.droppableId === 'ordering-list') {
      const newItems = Array.from(orderingItems);
      const [reorderedItem] = newItems.splice(source.index, 1);
      newItems.splice(destination.index, 0, reorderedItem);
      setOrderingItems(newItems);
      handleAnswerUpdate(newItems);
      return;
    }

    // Handle drag-drop questions
    if (question.type === 'drag-drop') {
      const sourceId = source.droppableId;
      const destId = destination.droppableId;
      const itemId = draggableId;

      const newMapping = { ...dropZoneItems };
      
      // Remove from source
      if (sourceId !== 'items-pool') {
        delete newMapping[sourceId];
      }
      
      // Add to destination
      if (destId !== 'items-pool') {
        newMapping[destId] = itemId;
      }

      setDropZoneItems(newMapping);
      handleAnswerUpdate(newMapping);
    }
  };

  useEffect(() => {
    if (question.type === 'drag-drop' && question.draggableItems) {
      setDragItems(question.draggableItems.map((item, index) => ({ id: `item-${index}`, content: item })));
      // Initialize dropZoneItems from selectedAnswer if available
      if (selectedAnswer && typeof selectedAnswer === 'object') {
        setDropZoneItems(selectedAnswer);
      } else {
        setDropZoneItems({});
      }
    }
    if (question.type === 'multi-select' && selectedAnswer) {
      setMultiSelectAnswers(selectedAnswer);
    }
    if (question.type === 'matching' && selectedAnswer) {
      setMatchingPairs(selectedAnswer);
    }
    if (question.type === 'ordering' && question.items) {
      // Initialize orderingItems from selectedAnswer if available, otherwise use question.items
      if (selectedAnswer && Array.isArray(selectedAnswer)) {
        setOrderingItems(selectedAnswer);
      } else {
        setOrderingItems([...question.items]);
      }
    }
  }, [question, selectedAnswer]);

  // Ensure fill-blank (and other types) don't retain previous question's local input state
  useEffect(() => {
    // Reset local answer when question id changes
    setLocalAnswer(selectedAnswer || null);
  }, [question.id]);

  // Global mouse handlers for custom drag-drop
  useEffect(() => {
    const handleMove = (e) => {
      if (draggingItem === null) return;
      setDragPos({ x: e.clientX - dragOffset.x, y: e.clientY - dragOffset.y });
    };
    const handleUp = (e) => {
      if (draggingItem === null) return;
      // Determine drop zone under cursor center
      const cursorX = e.clientX;
      const cursorY = e.clientY;
      let matchedZone = null;
      dropZoneRefs.current.forEach((el, idx) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        if (cursorX >= rect.left && cursorX <= rect.right && cursorY >= rect.top && cursorY <= rect.bottom) {
          matchedZone = idx;
        }
      });
      if (matchedZone !== null) {
        const itemId = `item-${draggingItem}`;
        setDropZoneItems(prev => {
          const updated = { ...prev };
          // Remove existing mapping of this item if previously placed
          Object.keys(updated).forEach(zoneKey => {
            if (updated[zoneKey] === itemId) delete updated[zoneKey];
          });
          updated[`zone-${matchedZone}`] = itemId;
          handleAnswerUpdate(updated);
          return updated;
        });
      }
      setDraggingItem(null);
    };
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', handleUp);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleUp);
    };
  }, [draggingItem, dragOffset, handleAnswerUpdate]);

  // (previous handleAnswerUpdate definition moved higher)

  const renderMultipleChoice = () => (
    <div className="answer-section multiple-choice">
      {question.options.map((option, index) => (
        <div
          key={index}
          className={`option ${localAnswer === index ? 'selected' : ''}`}
          onClick={() => handleAnswerUpdate(index)}
        >
          <div className="option-indicator">
            <div className="option-letter">{String.fromCharCode(65 + index)}</div>
          </div>
          <span className="option-text">{option}</span>
        </div>
      ))}
    </div>
  );

  const renderTrueFalse = () => (
    <div className="answer-section true-false">
      <div
        className={`tf-option ${localAnswer === true ? 'selected' : ''}`}
        onClick={() => handleAnswerUpdate(true)}
      >
        <Check className="tf-icon" />
        <span>True</span>
      </div>
      <div
        className={`tf-option ${localAnswer === false ? 'selected' : ''}`}
        onClick={() => handleAnswerUpdate(false)}
      >
        <X className="tf-icon" />
        <span>False</span>
      </div>
      {question.justification && (
        <div className="justification-prompt">
          <p>Explain your reasoning:</p>
          <textarea
            placeholder="Why did you choose this answer?"
            onChange={(e) => {
              const newAnswer = { choice: localAnswer, justification: e.target.value };
              handleAnswerUpdate(newAnswer);
            }}
          />
        </div>
      )}
    </div>
  );

  const renderFillBlank = () => {
    const blanks = question.blanks || 1;
    const answers = Array.isArray(localAnswer) ? localAnswer : new Array(blanks).fill('');

    return (
      <div className="answer-section fill-blank">
        <div className="question-with-blanks">
          {question.question.split('_____').map((part, index) => (
            <React.Fragment key={index}>
              <span>{part}</span>
              {index < blanks && (
                <input
                  type="text"
                  className="blank-input"
                  value={answers[index] || ''}
                  onChange={(e) => {
                    const newAnswers = [...answers];
                    newAnswers[index] = e.target.value;
                    handleAnswerUpdate(newAnswers);
                  }}
                  placeholder={`Blank ${index + 1}`}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  };

  const renderOrdering = () => {
    return (
      <div className="answer-section ordering">
        <p className="instruction">Drag and drop to arrange in the correct order:</p>
        <Droppable droppableId="ordering-list">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="ordering-list">
              {orderingItems.map((item, index) => (
                <Draggable key={`item-${index}`} draggableId={`item-${index}`} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`ordering-item ${snapshot.isDragging ? 'dragging' : ''}`}
                    >
                      <div className="order-number">{index + 1}</div>
                      <span>{item}</span>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    );
  };

  const renderMatching = () => {
    const handlePairSelection = (left, right) => {
      const newPairs = { ...matchingPairs };
      newPairs[left] = right;
      setMatchingPairs(newPairs);
      handleAnswerUpdate(newPairs);
    };

    return (
      <div className="answer-section matching">
        <p className="instruction">Match items from the left column with the right column:</p>
        <div className="matching-container">
          <div className="left-column">
            {question.leftColumn.map((leftItem, index) => (
              <div key={index} className="matching-item left">
                <span>{leftItem}</span>
                <select
                  value={matchingPairs[leftItem] || ''}
                  onChange={(e) => handlePairSelection(leftItem, e.target.value)}
                >
                  <option value="">Select match...</option>
                  {question.rightColumn.map((rightItem, rightIndex) => (
                    <option key={rightIndex} value={rightItem}>{rightItem}</option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderCodeCompletion = () => {
    const blanks = question.blanks || [];
    const answers = Array.isArray(localAnswer) ? localAnswer : new Array(blanks.length).fill('');

    return (
      <div className="answer-section code-completion">
        <div className="code-container">
          <div className="code-header">
            <Code className="code-icon" />
            <span>{question.language || 'Code'}</span>
          </div>
          <pre className="code-snippet">
            <code>{question.codeSnippet}</code>
          </pre>
        </div>
        <div className="code-blanks">
          {blanks.map((blank, index) => (
            <div key={index} className="code-blank">
              <label>Fill in blank {index + 1}:</label>
              <select
                value={answers[index] || ''}
                onChange={(e) => {
                  const newAnswers = [...answers];
                  newAnswers[index] = parseInt(e.target.value);
                  handleAnswerUpdate(newAnswers);
                }}
              >
                <option value="">Select option...</option>
                {question.options[index]?.map((option, optIndex) => (
                  <option key={optIndex} value={optIndex}>{option}</option>
                ))}
              </select>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderScenario = () => (
    <div className="answer-section scenario">
      <div className="scenario-container">
        <div className="scenario-text">
          <h4>Scenario:</h4>
          <p>{question.scenario}</p>
        </div>
        <div className="scenario-question">
          <h4>Question:</h4>
          <p>{question.question}</p>
        </div>
      </div>
      <div className="scenario-options">
        {question.options.map((option, index) => (
          <div
            key={index}
            className={`scenario-option ${localAnswer === index ? 'selected' : ''}`}
            onClick={() => handleAnswerUpdate(index)}
          >
            <div className="option-indicator">
              <div className="option-letter">{String.fromCharCode(65 + index)}</div>
            </div>
            <span className="option-text">{option}</span>
          </div>
        ))}
      </div>
    </div>
  );

  const renderDragDrop = () => {
    // Available items exclude those already placed
    const placedIds = new Set(Object.values(dropZoneItems));
    const availableItems = question.draggableItems.map((item, idx) => ({ item, idx })).filter(({ idx }) => !placedIds.has(`item-${idx}`));
    return (
      <div className="answer-section drag-drop" ref={dragContainerRef}>
        <p className="instruction">Drag items to the correct drop zones:</p>
        <div className="drag-drop-container interactive">
          <div className="items-pool interactive-pool">
            <h4>Available Items:</h4>
            {availableItems.map(({ item, idx }) => (
              <div
                key={idx}
                className={`interactive-draggable ${draggingItem === idx ? 'dragging' : ''}`}
                onMouseDown={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  setDraggingItem(idx);
                  setDragOffset({ x: e.clientX - rect.left, y: e.clientY - rect.top });
                  setDragPos({ x: rect.left, y: rect.top });
                }}
                style={draggingItem === idx ? { left: dragPos.x, top: dragPos.y } : {}}
              >
                {item}
              </div>
            ))}
          </div>
          <div className="drop-zones">
            {question.dropZones.map((zone, index) => (
              <div
                key={index}
                className="drop-zone interactive-zone"
                ref={el => (dropZoneRefs.current[index] = el)}
              >
                <h4>{zone}</h4>
                {dropZoneItems[`zone-${index}`] && (
                  <div className="dropped-item">
                    {question.draggableItems[parseInt(dropZoneItems[`zone-${index}`].split('-')[1])]}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        {draggingItem !== null && (
          <div className="drag-hint">Release over a zone to place the item</div>
        )}
      </div>
    );
  };

  const renderHotspot = () => {
    const handleHotspotClick = (hotspotId) => {
      const newSelected = selectedHotspots.includes(hotspotId)
        ? selectedHotspots.filter(id => id !== hotspotId)
        : [...selectedHotspots, hotspotId];
      
      setSelectedHotspots(newSelected);
      handleAnswerUpdate(newSelected);
    };

    return (
      <div className="answer-section hotspot">
        <p className="instruction">Click on the correct areas in the image:</p>
        <div className="hotspot-container">
          <div className="hotspot-image">
            <img 
              src={question.image} 
              alt="Interactive Flowchart" 
              className="flowchart-image"
              draggable={false}
            />
            {question.hotspots.map((hotspot) => (
              <div
                key={hotspot.id}
                className={`hotspot ${selectedHotspots.includes(hotspot.id) ? 'selected' : ''}`}
                style={{
                  left: `${hotspot.x}px`,
                  top: `${hotspot.y}px`,
                  width: `${hotspot.width}px`,
                  height: `${hotspot.height}px`
                }}
                onClick={() => handleHotspotClick(hotspot.id)}
                title={hotspot.label}
              >
                <Target size={16} />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderMultiSelect = () => {
    const handleOptionToggle = (optionIndex) => {
      const newAnswers = multiSelectAnswers.includes(optionIndex)
        ? multiSelectAnswers.filter(index => index !== optionIndex)
        : [...multiSelectAnswers, optionIndex];
      
      setMultiSelectAnswers(newAnswers);
      handleAnswerUpdate(newAnswers);
    };

    return (
      <div className="answer-section multi-select">
        <p className="instruction">
          Select {question.minSelections === question.maxSelections 
            ? `exactly ${question.minSelections}` 
            : `${question.minSelections}-${question.maxSelections}`} options:
        </p>
        {question.options.map((option, index) => (
          <div
            key={index}
            className={`multi-option ${multiSelectAnswers.includes(index) ? 'selected' : ''}`}
            onClick={() => handleOptionToggle(index)}
          >
            <div className="checkbox">
              {multiSelectAnswers.includes(index) && <Check size={16} />}
            </div>
            <span className="option-text">{option}</span>
          </div>
        ))}
      </div>
    );
  };

  const getQuestionTypeLabel = (type) => {
    const labels = {
      'multiple-choice': 'Multiple Choice',
      'true-false': 'True/False',
      'fill-blank': 'Fill in the Blank',
      'ordering': 'Ordering',
      'matching': 'Matching',
      'code-completion': 'Code Completion',
      'scenario': 'Scenario',
      'drag-drop': 'Drag & Drop',
      'hotspot': 'Hotspot',
      'multi-select': 'Multiple Select'
    };
    return labels[type] || 'Question';
  };

  const renderQuestion = () => {
    switch (question.type) {
      case 'multiple-choice':
        return renderMultipleChoice();
      case 'true-false':
        return renderTrueFalse();
      case 'fill-blank':
        return renderFillBlank();
      case 'ordering':
        return renderOrdering();
      case 'matching':
        return renderMatching();
      case 'code-completion':
        return renderCodeCompletion();
      case 'scenario':
        return renderScenario();
      case 'drag-drop':
        return renderDragDrop();
      case 'hotspot':
        return renderHotspot();
      case 'multi-select':
        return renderMultiSelect();
      default:
        return <div>Unsupported question type: {question.type}</div>;
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="question-renderer">
        <div className="question-header">
          <div className="question-number">Question {questionNumber}</div>
          <div className="question-type">{getQuestionTypeLabel(question.type)}</div>
        </div>
        
        <div className="question-text">
          <h2>{question.question}</h2>
        </div>
        
        {renderQuestion()}
        
        {question.explanation && (
          <div className="question-hint">
            <p><strong>Hint:</strong> This question tests your understanding of {question.explanation.split('.')[0].toLowerCase()}.</p>
          </div>
        )}
      </div>
    </DragDropContext>
  );
};

export default QuestionRenderer;