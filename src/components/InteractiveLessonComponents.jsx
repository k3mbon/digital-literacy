import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Lightbulb, Play, Pause, RotateCcw, ChevronRight, Star, Target, Zap } from 'lucide-react';
import '../styles/InteractiveLessonComponents.css';

// Interactive Story Component with animations
export const InteractiveStory = ({ story, definition, analogy }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const steps = [
    { type: 'story', content: story, icon: <Lightbulb size={24} /> },
    { type: 'definition', content: definition, icon: <Target size={24} /> },
    { type: 'analogy', content: analogy, icon: <Star size={24} /> }
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
        setIsAnimating(false);
      }, 300);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep(currentStep - 1);
        setIsAnimating(false);
      }, 300);
    }
  };

  return (
    <div className="interactive-story">
      <div className="story-progress">
        {steps.map((_, index) => (
          <div 
            key={index} 
            className={`progress-dot ${index <= currentStep ? 'active' : ''}`}
            onClick={() => setCurrentStep(index)}
          />
        ))}
      </div>
      
      <div className={`story-content ${isAnimating ? 'animating' : ''}`}>
        <div className="story-header">
          {steps[currentStep].icon}
          <h3>{steps[currentStep].type === 'story' ? '📖 Story' : 
               steps[currentStep].type === 'definition' ? '🎯 Definition' : 
               '⭐ Analogy'}</h3>
        </div>
        
        <div className="story-text">
          {steps[currentStep].type === 'analogy' ? (
            <div className="analogy-content">
              <h4>{steps[currentStep].content.title}</h4>
              <p>{steps[currentStep].content.description}</p>
            </div>
          ) : (
            <p>{steps[currentStep].content}</p>
          )}
        </div>
      </div>
      
      <div className="story-controls">
        <button 
          onClick={prevStep} 
          disabled={currentStep === 0}
          className="story-btn secondary"
        >
          ← Previous
        </button>
        <span className="step-indicator">{currentStep + 1} of {steps.length}</span>
        <button 
          onClick={nextStep} 
          disabled={currentStep === steps.length - 1}
          className="story-btn primary"
        >
          Next →
        </button>
      </div>
    </div>
  );
};

// Interactive List with expandable items
export const InteractiveList = ({ items }) => {
  const [expandedItems, setExpandedItems] = useState(new Set());
  const [completedItems, setCompletedItems] = useState(new Set());

  const toggleExpand = (index) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedItems(newExpanded);
  };

  const markComplete = (index) => {
    const newCompleted = new Set(completedItems);
    newCompleted.add(index);
    setCompletedItems(newCompleted);
  };

  return (
    <div className="interactive-list">
      {items.map((item, index) => (
        <div 
          key={index} 
          className={`list-item ${expandedItems.has(index) ? 'expanded' : ''} ${completedItems.has(index) ? 'completed' : ''}`}
        >
          <div className="item-header" onClick={() => toggleExpand(index)}>
            <div className="item-icon">{item.icon}</div>
            <div className="item-title">
              <h4>{item.title}</h4>
              <p className="item-preview">{item.description}</p>
            </div>
            <div className="item-controls">
              {completedItems.has(index) ? (
                <CheckCircle className="check-icon completed" size={20} />
              ) : (
                <button 
                  onClick={(e) => { e.stopPropagation(); markComplete(index); }}
                  className="complete-btn"
                >
                  <CheckCircle size={16} />
                </button>
              )}
              <ChevronRight 
                className={`expand-icon ${expandedItems.has(index) ? 'rotated' : ''}`} 
                size={20} 
              />
            </div>
          </div>
          
          {expandedItems.has(index) && (
            <div className="item-details">
              <div className="detail-content">
                <p>{item.description}</p>
                {item.example && (
                  <div className="example-box">
                    <strong>Example:</strong>
                    <code>{item.example}</code>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      ))}
      
      <div className="list-progress">
        <div className="progress-text">
          {completedItems.size} of {items.length} completed
        </div>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${(completedItems.size / items.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};

// Interactive Code Example with step-by-step execution
export const InteractiveCodeExample = ({ code, steps, title }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [highlightedLines, setHighlightedLines] = useState([]);

  useEffect(() => {
    if (steps && steps[currentStep]) {
      setHighlightedLines(steps[currentStep].lines || []);
    }
  }, [currentStep, steps]);

  const playAnimation = () => {
    setIsPlaying(true);
    setCurrentStep(0);
    
    const interval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= steps.length - 1) {
          clearInterval(interval);
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, 2000);
  };

  const resetAnimation = () => {
    setCurrentStep(0);
    setIsPlaying(false);
  };

  return (
    <div className="interactive-code">
      <div className="code-header">
        <h4>{title}</h4>
        <div className="code-controls">
          <button 
            onClick={playAnimation} 
            disabled={isPlaying}
            className="code-btn play"
          >
            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
            {isPlaying ? 'Playing' : 'Play'}
          </button>
          <button 
            onClick={resetAnimation}
            className="code-btn reset"
          >
            <RotateCcw size={16} />
            Reset
          </button>
        </div>
      </div>
      
      <div className="code-container">
        <div className="code-block">
          {code.split('\n').map((line, index) => (
            <div 
              key={index}
              className={`code-line ${highlightedLines.includes(index + 1) ? 'highlighted' : ''}`}
            >
              <span className="line-number">{index + 1}</span>
              <span className="line-content">{line}</span>
            </div>
          ))}
        </div>
        
        {steps && steps[currentStep] && (
          <div className="step-explanation">
            <div className="step-header">
              <Zap size={16} />
              <span>Step {currentStep + 1} of {steps.length}</span>
            </div>
            <p>{steps[currentStep].explanation}</p>
            {steps[currentStep].output && (
              <div className="output-box">
                <strong>Output:</strong>
                <code>{steps[currentStep].output}</code>
              </div>
            )}
          </div>
        )}
      </div>
      
      {steps && (
        <div className="step-navigation">
          <button 
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0 || isPlaying}
            className="step-btn"
          >
            ← Previous Step
          </button>
          <div className="step-dots">
            {steps.map((_, index) => (
              <div 
                key={index}
                className={`step-dot ${index === currentStep ? 'active' : ''} ${index < currentStep ? 'completed' : ''}`}
                onClick={() => !isPlaying && setCurrentStep(index)}
              />
            ))}
          </div>
          <button 
            onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
            disabled={currentStep === steps.length - 1 || isPlaying}
            className="step-btn"
          >
            Next Step →
          </button>
        </div>
      )}
    </div>
  );
};

// Interactive Quiz Component
export const InteractiveQuiz = ({ questions, onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswerSelect = (questionIndex, answerIndex) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionIndex]: answerIndex
    });
  };

  const submitQuiz = () => {
    let correctCount = 0;
    questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        correctCount++;
      }
    });
    setScore(correctCount);
    setShowResults(true);
    if (onComplete) {
      onComplete(correctCount, questions.length);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setShowResults(false);
    setScore(0);
  };

  if (showResults) {
    return (
      <div className="quiz-results">
        <div className="results-header">
          <div className="score-circle">
            <span className="score-number">{score}</span>
            <span className="score-total">/{questions.length}</span>
          </div>
          <h3>Quiz Complete!</h3>
          <p className="score-percentage">
            {Math.round((score / questions.length) * 100)}% Correct
          </p>
        </div>
        
        <div className="results-breakdown">
          {questions.map((question, index) => {
            const isCorrect = selectedAnswers[index] === question.correctAnswer;
            return (
              <div key={index} className={`result-item ${isCorrect ? 'correct' : 'incorrect'}`}>
                <div className="result-icon">
                  {isCorrect ? <CheckCircle size={20} /> : <XCircle size={20} />}
                </div>
                <div className="result-content">
                  <p className="question-text">{question.question}</p>
                  <p className="answer-text">
                    Your answer: {question.options[selectedAnswers[index]]}
                  </p>
                  {!isCorrect && (
                    <p className="correct-answer">
                      Correct answer: {question.options[question.correctAnswer]}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        
        <button onClick={resetQuiz} className="quiz-btn retry">
          <RotateCcw size={16} />
          Try Again
        </button>
      </div>
    );
  }

  const question = questions[currentQuestion];
  const allAnswered = questions.every((_, index) => selectedAnswers.hasOwnProperty(index));

  return (
    <div className="interactive-quiz">
      <div className="quiz-progress">
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          />
        </div>
        <span className="progress-text">
          Question {currentQuestion + 1} of {questions.length}
        </span>
      </div>
      
      <div className="question-container">
        <h3 className="question-text">{question.question}</h3>
        
        <div className="options-container">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(currentQuestion, index)}
              className={`option-btn ${
                selectedAnswers[currentQuestion] === index ? 'selected' : ''
              }`}
            >
              <span className="option-letter">{String.fromCharCode(65 + index)}</span>
              <span className="option-text">{option}</span>
            </button>
          ))}
        </div>
      </div>
      
      <div className="quiz-navigation">
        <button 
          onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
          disabled={currentQuestion === 0}
          className="quiz-btn secondary"
        >
          ← Previous
        </button>
        
        {currentQuestion === questions.length - 1 ? (
          <button 
            onClick={submitQuiz}
            disabled={!allAnswered}
            className="quiz-btn primary submit"
          >
            Submit Quiz
          </button>
        ) : (
          <button 
            onClick={() => setCurrentQuestion(Math.min(questions.length - 1, currentQuestion + 1))}
            className="quiz-btn primary"
          >
            Next →
          </button>
        )}
      </div>
    </div>
  );
};