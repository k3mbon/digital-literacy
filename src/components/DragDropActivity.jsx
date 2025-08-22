import React, { useState, useRef } from 'react';
import { CheckCircle, XCircle, RotateCcw, Lightbulb } from 'lucide-react';
import '../styles/DragDropActivity.css';

const DragDropActivity = ({ 
  title, 
  description, 
  items, 
  correctOrder, 
  feedback, 
  onComplete 
}) => {
  const [currentOrder, setCurrentOrder] = useState([...Array(items.length).keys()]);
  const [draggedItem, setDraggedItem] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const dragCounter = useRef(0);

  const handleDragStart = (e, index) => {
    setDraggedItem(index);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', e.target.outerHTML);
    e.dataTransfer.setDragImage(e.target, 0, 0);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    dragCounter.current++;
  };

  const handleDragLeave = () => {
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    
    if (draggedItem === null) return;
    
    const newOrder = [...currentOrder];
    const draggedValue = newOrder[draggedItem];
    
    // Remove the dragged item
    newOrder.splice(draggedItem, 1);
    
    // Insert at the new position
    newOrder.splice(dropIndex, 0, draggedValue);
    
    setCurrentOrder(newOrder);
    setDraggedItem(null);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
    dragCounter.current = 0;
  };

  const checkAnswer = () => {
    const isCorrect = JSON.stringify(currentOrder) === JSON.stringify(correctOrder);
    setIsCompleted(isCorrect);
    setShowFeedback(true);
    setAttempts(prev => prev + 1);
    
    if (isCorrect && onComplete) {
      setTimeout(() => {
        onComplete();
      }, 2000);
    }
  };

  const resetActivity = () => {
    setCurrentOrder([...Array(items.length).keys()]);
    setIsCompleted(false);
    setShowFeedback(false);
    setShowHint(false);
    setDraggedItem(null);
  };

  const toggleHint = () => {
    setShowHint(!showHint);
  };

  const getItemStyle = (index) => {
    const baseStyle = {
      transform: draggedItem === index ? 'rotate(5deg) scale(1.05)' : 'none',
      opacity: draggedItem === index ? 0.8 : 1,
      zIndex: draggedItem === index ? 1000 : 1
    };
    
    return baseStyle;
  };

  const getDropZoneStyle = (index) => {
    return {
      backgroundColor: draggedItem !== null && draggedItem !== index ? 
        'rgba(59, 130, 246, 0.1)' : 'transparent',
      borderColor: draggedItem !== null && draggedItem !== index ? 
        '#3b82f6' : 'rgba(148, 163, 184, 0.2)'
    };
  };

  return (
    <div className="drag-drop-activity">
      <div className="activity-header">
        <h4 className="activity-title">{title}</h4>
        <p className="activity-description">{description}</p>
        
        {attempts > 2 && !isCompleted && (
          <button 
            className="hint-button"
            onClick={toggleHint}
            title="Need a hint?"
          >
            <Lightbulb size={16} />
            {showHint ? 'Hide Hint' : 'Show Hint'}
          </button>
        )}
      </div>

      {showHint && (
        <div className="hint-box">
          <p><strong>Hint:</strong> Think about the logical sequence. What needs to happen first, second, third, and so on?</p>
          {correctOrder.length > 0 && (
            <p>The correct sequence should have <strong>{items[correctOrder[0]]}</strong> as the first step.</p>
          )}
        </div>
      )}

      <div className="drag-drop-container">
        <div className="draggable-items">
          {currentOrder.map((itemIndex, position) => (
            <div
              key={`${itemIndex}-${position}`}
              className={`draggable-item ${
                draggedItem === position ? 'dragging' : ''
              } ${
                isCompleted ? 'completed' : ''
              }`}
              draggable={!isCompleted}
              style={getItemStyle(position)}
              onDragStart={(e) => handleDragStart(e, position)}
              onDragEnd={handleDragEnd}
              onDragOver={handleDragOver}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, position)}
            >
              <div className="item-number">{position + 1}</div>
              <div className="item-content">{items[itemIndex]}</div>
              <div className="drag-handle">⋮⋮</div>
            </div>
          ))}
        </div>

        {/* Drop zones between items */}
        {!isCompleted && currentOrder.map((_, index) => (
          <div
            key={`drop-${index}`}
            className="drop-zone"
            style={getDropZoneStyle(index)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, index)}
          />
        ))}
      </div>

      <div className="activity-controls">
        {!showFeedback ? (
          <button 
            className="btn btn-primary check-answer-btn"
            onClick={checkAnswer}
            disabled={isCompleted}
          >
            Check Answer
          </button>
        ) : (
          <div className="feedback-section">
            <div className={`feedback-message ${
              isCompleted ? 'correct' : 'incorrect'
            }`}>
              {isCompleted ? (
                <>
                  <CheckCircle size={20} />
                  <span>{feedback?.correct || 'Excellent! You got the correct order!'}</span>
                </>
              ) : (
                <>
                  <XCircle size={20} />
                  <span>{feedback?.incorrect || 'Not quite right. Try again!'}</span>
                </>
              )}
            </div>
            
            {!isCompleted && (
              <button 
                className="btn btn-secondary reset-btn"
                onClick={resetActivity}
              >
                <RotateCcw size={16} />
                Try Again
              </button>
            )}
          </div>
        )}
      </div>

      <div className="activity-stats">
        <span className="attempts-counter">
          Attempts: {attempts}
        </span>
        {isCompleted && (
          <span className="completion-badge">
            <CheckCircle size={16} />
            Completed!
          </span>
        )}
      </div>
    </div>
  );
};

export default DragDropActivity;