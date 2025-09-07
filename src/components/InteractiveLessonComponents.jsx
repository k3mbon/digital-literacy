import React, { useState, useEffect, useRef } from 'react';
import { CheckCircle, XCircle, Lightbulb, Play, Pause, RotateCcw, ChevronRight, Star, Target, Zap, Code, Terminal } from 'lucide-react';
import '../styles/InteractiveLessonComponents.css';
import './ArduinoSimulator.css';
import '../styles/MultiLanguageIDE.css';
import MultiLanguageIDE from './MultiLanguageIDE';

// Interactive Story Component with animations and comprehension validation
export const InteractiveStory = ({ story, definition, analogy, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [comprehensionAnswers, setComprehensionAnswers] = useState({});
  const [showValidation, setShowValidation] = useState(false);

  const steps = [
    { type: 'story', content: story, iconType: 'lightbulb' },
    { type: 'definition', content: definition, iconType: 'target' },
    { type: 'analogy', content: analogy, iconType: 'star' }
  ];

  const getStepIcon = (iconType) => {
    switch (iconType) {
      case 'lightbulb': return <Lightbulb size={24} />;
      case 'target': return <Target size={24} />;
      case 'star': return <Star size={24} />;
      default: return <Lightbulb size={24} />;
    }
  };

  const comprehensionQuestions = [
    {
      id: 'understanding',
      question: 'Can you explain the main concept in your own words?',
      type: 'text'
    },
    {
      id: 'application',
      question: 'How would you apply this concept in a real-world scenario?',
      type: 'text'
    },
    {
      id: 'connection',
      question: 'How does this concept connect to what you already know?',
      type: 'text'
    }
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
        setIsAnimating(false);
      }, 300);
    } else if (currentStep === steps.length - 1 && !showValidation) {
      setShowValidation(true);
    }
  };

  const handleComprehensionChange = (questionId, value) => {
    setComprehensionAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const validateComprehension = () => {
    const allAnswered = comprehensionQuestions.every(q => 
      comprehensionAnswers[q.id] && comprehensionAnswers[q.id].trim().length > 0
    );
    
    if (allAnswered) {
      setIsCompleted(true);
      if (onComplete) onComplete();
    }
  };

  return (
    <div className="interactive-story">
      <div className="story-progress">
        {steps.map((_, index) => (
          <div 
            key={index} 
            className={`progress-dot ${
              index <= currentStep ? 'active' : ''
            } ${index === currentStep ? 'current' : ''}`}
          />
        ))}
      </div>

      <div className={`story-content ${isAnimating ? 'animating' : ''}`}>
        {!showValidation ? (
          <div className="story-step">
            <div className="step-icon">
              {getStepIcon(steps[currentStep].iconType)}
            </div>
            <div className="step-content">
              <p>{steps[currentStep].content}</p>
            </div>
            <button 
              className="next-button"
              onClick={nextStep}
              disabled={isAnimating}
            >
              {currentStep < steps.length - 1 ? 'Next' : 'Test Understanding'}
              <ChevronRight size={16} />
            </button>
          </div>
        ) : (
          <div className="comprehension-check">
            <h4>Check Your Understanding</h4>
            {comprehensionQuestions.map(question => (
              <div key={question.id} className="comprehension-question">
                <label>{question.question}</label>
                <textarea
                  value={comprehensionAnswers[question.id] || ''}
                  onChange={(e) => handleComprehensionChange(question.id, e.target.value)}
                  placeholder="Type your answer here..."
                  rows={3}
                />
              </div>
            ))}
            <button 
              className="validate-button"
              onClick={validateComprehension}
              disabled={isCompleted}
            >
              {isCompleted ? (
                <><CheckCircle size={16} /> Completed!</>
              ) : (
                'Submit Answers'
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// SDLC Simulator Component
export const SDLCSimulator = ({ title, description, phases, onComplete }) => {
  const [currentPhase, setCurrentPhase] = useState(0);
  const [phaseProgress, setPhaseProgress] = useState({});
  const [completedTasks, setCompletedTasks] = useState({});
  const [projectData, setProjectData] = useState({
    requirements: [],
    design: null,
    code: '',
    tests: [],
    deployment: null
  });

  const handleTaskComplete = (phaseIndex, taskIndex) => {
    const key = `${phaseIndex}-${taskIndex}`;
    setCompletedTasks(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
    
    // Update phase progress
    const phase = phases[phaseIndex];
    const completedCount = phase.tasks.filter((_, idx) => 
      completedTasks[`${phaseIndex}-${idx}`] || idx === taskIndex
    ).length;
    
    setPhaseProgress(prev => ({
      ...prev,
      [phaseIndex]: (completedCount / phase.tasks.length) * 100
    }));
  };

  const nextPhase = () => {
    if (currentPhase < phases.length - 1) {
      setCurrentPhase(currentPhase + 1);
    } else {
      // Project complete
      if (onComplete) {
        setTimeout(() => onComplete(), 1000);
      }
    }
  };

  const prevPhase = () => {
    if (currentPhase > 0) {
      setCurrentPhase(currentPhase - 1);
    }
  };

  const updateProjectData = (field, value) => {
    setProjectData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const isPhaseComplete = (phaseIndex) => {
    const phase = phases[phaseIndex];
    return phase.tasks.every((_, taskIndex) => 
      completedTasks[`${phaseIndex}-${taskIndex}`]
    );
  };

  return (
    <div className="sdlc-simulator">
      <div className="simulator-header">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>

      <div className="sdlc-phases">
        {phases.map((phase, index) => (
          <div 
            key={index}
            className={`phase-indicator ${
              index === currentPhase ? 'active' : 
              index < currentPhase ? 'completed' : 'pending'
            }`}
          >
            <div className="phase-number">{index + 1}</div>
            <div className="phase-info">
              <div className="phase-name">{phase.name}</div>
              <div className="phase-progress">
                <div 
                  className="progress-bar"
                  style={{ width: `${phaseProgress[index] || 0}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="current-phase">
        <div className="phase-header">
          <h4>{phases[currentPhase].name}</h4>
          <p>{phases[currentPhase].description}</p>
        </div>

        <div className="phase-tasks">
          <h5>Tasks:</h5>
          {phases[currentPhase].tasks.map((task, taskIndex) => {
            const isCompleted = completedTasks[`${currentPhase}-${taskIndex}`];
            return (
              <div 
                key={taskIndex}
                className={`task-item ${isCompleted ? 'completed' : ''}`}
              >
                <div className="task-checkbox">
                  <input 
                    type="checkbox"
                    checked={isCompleted || false}
                    onChange={() => handleTaskComplete(currentPhase, taskIndex)}
                  />
                </div>
                <div className="task-content">
                  <div className="task-title">{task.title}</div>
                  <div className="task-description">{task.description}</div>
                  {task.deliverable && (
                    <div className="task-deliverable">
                      <strong>Deliverable:</strong> {task.deliverable}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {phases[currentPhase].interactive && (
          <div className="phase-interactive">
            {phases[currentPhase].name === 'Requirements' && (
              <div className="requirements-input">
                <h5>Gather Requirements:</h5>
                <textarea 
                  placeholder="Enter project requirements..."
                  value={projectData.requirements.join('\n')}
                  onChange={(e) => updateProjectData('requirements', e.target.value.split('\n'))}
                  rows={4}
                />
              </div>
            )}
            
            {phases[currentPhase].name === 'Implementation' && (
              <div className="code-input">
                <h5>Write Code:</h5>
                <textarea 
                  placeholder="Write your code here..."
                  value={projectData.code}
                  onChange={(e) => updateProjectData('code', e.target.value)}
                  rows={8}
                  className="code-editor"
                />
              </div>
            )}
          </div>
        )}

        <div className="phase-navigation">
          <button 
            className="btn btn-secondary"
            onClick={prevPhase}
            disabled={currentPhase === 0}
          >
            Previous Phase
          </button>
          
          <button 
            className="btn btn-primary"
            onClick={nextPhase}
            disabled={!isPhaseComplete(currentPhase)}
          >
            {currentPhase === phases.length - 1 ? 'Complete Project' : 'Next Phase'}
          </button>
        </div>
      </div>
    </div>
  );
};

// Selection Simulator Component
export const SelectionSimulator = ({ title, description, scenarios, onComplete }) => {
  const [currentScenario, setCurrentScenario] = useState(0);
  const [userChoices, setUserChoices] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const handleChoice = (choiceIndex) => {
    const scenario = scenarios[currentScenario];
    const choice = scenario.choices[choiceIndex];
    
    setUserChoices(prev => [...prev, {
      scenario: currentScenario,
      choice: choiceIndex,
      correct: choice.correct,
      explanation: choice.explanation
    }]);

    if (currentScenario < scenarios.length - 1) {
      setTimeout(() => {
        setCurrentScenario(currentScenario + 1);
      }, 1500);
    } else {
      // Calculate final score
      const correctChoices = userChoices.filter(c => c.correct).length + (choice.correct ? 1 : 0);
      const finalScore = Math.round((correctChoices / scenarios.length) * 100);
      setScore(finalScore);
      setShowResult(true);
      
      if (onComplete) {
        setTimeout(() => onComplete(), 3000);
      }
    }
  };

  const resetSimulator = () => {
    setCurrentScenario(0);
    setUserChoices([]);
    setShowResult(false);
    setScore(0);
  };

  if (showResult) {
    return (
      <div className="selection-simulator">
        <div className="simulator-header">
          <h3>{title} - Results</h3>
        </div>
        
        <div className="results-summary">
          <div className="score-display">
            <div className="score-value">{score}%</div>
            <div className="score-label">Accuracy</div>
          </div>
          
          <div className="performance-feedback">
            {score >= 90 && <p>🎉 Excellent! You have mastered selection logic.</p>}
            {score >= 70 && score < 90 && <p>👍 Good work! You understand most selection concepts.</p>}
            {score >= 50 && score < 70 && <p>📚 Keep practicing to improve your selection skills.</p>}
            {score < 50 && <p>🔄 Review the concepts and try again.</p>}
          </div>
          
          <div className="choice-review">
            <h4>Review Your Choices:</h4>
            {userChoices.map((choice, index) => (
              <div key={index} className={`choice-review-item ${choice.correct ? 'correct' : 'incorrect'}`}>
                <div className="scenario-title">Scenario {index + 1}</div>
                <div className="choice-result">
                  {choice.correct ? '✅' : '❌'} {choice.explanation}
                </div>
              </div>
            ))}
          </div>
          
          <button className="btn btn-primary" onClick={resetSimulator}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="selection-simulator">
      <div className="simulator-header">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>

      <div className="progress-indicator">
        <div className="progress-text">
          Scenario {currentScenario + 1} of {scenarios.length}
        </div>
        <div className="progress-bar">
          <div 
            className="progress-fill"
            style={{ width: `${((currentScenario + 1) / scenarios.length) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="scenario-content">
        <div className="scenario-description">
          <h4>{scenarios[currentScenario].title}</h4>
          <p>{scenarios[currentScenario].description}</p>
          {scenarios[currentScenario].code && (
            <div className="scenario-code">
              <pre><code>{scenarios[currentScenario].code}</code></pre>
            </div>
          )}
        </div>

        <div className="scenario-choices">
          <h5>Choose the best option:</h5>
          {scenarios[currentScenario].choices.map((choice, index) => (
            <button 
              key={index}
              className="choice-button"
              onClick={() => handleChoice(index)}
            >
              <div className="choice-label">{String.fromCharCode(65 + index)}</div>
              <div className="choice-text">{choice.text}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// Search Visualizer Component
export const SearchVisualizer = ({ title, description, algorithms, onComplete }) => {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(0);
  const [searchArray, setSearchArray] = useState([1, 3, 5, 7, 9, 11, 13, 15, 17, 19]);
  const [targetValue, setTargetValue] = useState(7);
  const [isSearching, setIsSearching] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [searchSteps, setSearchSteps] = useState([]);
  const [found, setFound] = useState(false);
  const [comparisons, setComparisons] = useState(0);

  const linearSearch = (arr, target) => {
    const steps = [];
    for (let i = 0; i < arr.length; i++) {
      steps.push({
        type: 'compare',
        index: i,
        value: arr[i],
        message: `Comparing ${arr[i]} with target ${target}`
      });
      
      if (arr[i] === target) {
        steps.push({
          type: 'found',
          index: i,
          value: arr[i],
          message: `Found target ${target} at index ${i}!`
        });
        return steps;
      }
    }
    
    steps.push({
      type: 'not_found',
      message: `Target ${target} not found in array`
    });
    return steps;
  };

  const binarySearch = (arr, target) => {
    const steps = [];
    let left = 0;
    let right = arr.length - 1;
    
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      
      steps.push({
        type: 'compare',
        index: mid,
        value: arr[mid],
        left: left,
        right: right,
        message: `Checking middle element: ${arr[mid]} (index ${mid})`
      });
      
      if (arr[mid] === target) {
        steps.push({
          type: 'found',
          index: mid,
          value: arr[mid],
          message: `Found target ${target} at index ${mid}!`
        });
        return steps;
      } else if (arr[mid] < target) {
        left = mid + 1;
        steps.push({
          type: 'eliminate',
          message: `${arr[mid]} < ${target}, searching right half`
        });
      } else {
        right = mid - 1;
        steps.push({
          type: 'eliminate',
          message: `${arr[mid]} > ${target}, searching left half`
        });
      }
    }
    
    steps.push({
      type: 'not_found',
      message: `Target ${target} not found in array`
    });
    return steps;
  };

  const startSearch = () => {
    setIsSearching(true);
    setCurrentStep(0);
    setFound(false);
    setComparisons(0);
    
    const algorithm = algorithms[selectedAlgorithm];
    let steps = [];
    
    if (algorithm.name === 'Linear Search') {
      steps = linearSearch(searchArray, targetValue);
    } else if (algorithm.name === 'Binary Search') {
      steps = binarySearch(searchArray, targetValue);
    }
    
    setSearchSteps(steps);
    
    // Animate through steps
    steps.forEach((step, index) => {
      setTimeout(() => {
        setCurrentStep(index);
        setComparisons(prev => step.type === 'compare' ? prev + 1 : prev);
        
        if (step.type === 'found') {
          setFound(true);
        }
        
        if (index === steps.length - 1) {
          setIsSearching(false);
          if (onComplete) {
            setTimeout(() => onComplete(), 2000);
          }
        }
      }, index * 1000);
    });
  };

  const resetSearch = () => {
    setCurrentStep(0);
    setSearchSteps([]);
    setFound(false);
    setComparisons(0);
    setIsSearching(false);
  };

  const generateRandomArray = () => {
    const newArray = Array.from({length: 10}, (_, i) => (i + 1) * 2 - 1).sort((a, b) => a - b);
    setSearchArray(newArray);
    resetSearch();
  };

  return (
    <div className="search-visualizer">
      <div className="simulator-header">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>

      <div className="algorithm-selector">
        <h4>Select Search Algorithm:</h4>
        <div className="algorithm-buttons">
          {algorithms.map((algorithm, index) => (
            <button 
              key={index}
              className={`btn ${selectedAlgorithm === index ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setSelectedAlgorithm(index)}
              disabled={isSearching}
            >
              {algorithm.name}
            </button>
          ))}
        </div>
        
        <div className="algorithm-info">
          <p><strong>Time Complexity:</strong> {algorithms[selectedAlgorithm].timeComplexity}</p>
          <p><strong>Description:</strong> {algorithms[selectedAlgorithm].description}</p>
        </div>
      </div>

      <div className="search-controls">
        <div className="control-group">
          <label>Target Value:</label>
          <input 
            type="number"
            value={targetValue}
            onChange={(e) => setTargetValue(parseInt(e.target.value))}
            disabled={isSearching}
          />
        </div>
        
        <button className="btn btn-success" onClick={startSearch} disabled={isSearching}>
          {isSearching ? 'Searching...' : 'Start Search'}
        </button>
        
        <button className="btn btn-secondary" onClick={generateRandomArray} disabled={isSearching}>
          New Array
        </button>
      </div>

      <div className="array-visualization">
        <div className="array-container">
          {searchArray.map((value, index) => {
            let className = 'array-element';
            
            if (searchSteps[currentStep]) {
              const step = searchSteps[currentStep];
              if (step.index === index) {
                className += step.type === 'found' ? ' found' : ' current';
              }
              if (step.left !== undefined && step.right !== undefined) {
                if (index < step.left || index > step.right) {
                  className += ' eliminated';
                }
              }
            }
            
            return (
              <div key={index} className={className}>
                <div className="element-value">{value}</div>
                <div className="element-index">{index}</div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="search-info">
        <div className="info-item">
          <span className="info-label">Comparisons:</span>
          <span className="info-value">{comparisons}</span>
        </div>
        
        <div className="info-item">
          <span className="info-label">Status:</span>
          <span className="info-value">
            {isSearching ? 'Searching...' : found ? 'Found!' : searchSteps.length > 0 ? 'Not Found' : 'Ready'}
          </span>
        </div>
      </div>

      {searchSteps[currentStep] && (
        <div className="step-message">
          <p>{searchSteps[currentStep].message}</p>
        </div>
      )}
    </div>
  );
};

// Hands-On Practice Component with Multi-Language IDE
export const HandsOnPractice = ({ 
  title = "Hands-On Practice",
  description = "Practice coding with this interactive editor",
  language = 'javascript',
  initialCode = '',
  instructions = [],
  hints = [],
  onComplete 
}) => {
  const [isCompleted, setIsCompleted] = useState(false);
  const [currentCode, setCurrentCode] = useState(initialCode);
  const [currentLanguage, setCurrentLanguage] = useState(language);
  const [showHints, setShowHints] = useState(false);
  const [completedSteps, setCompletedSteps] = useState([]);

  const handleCodeChange = (newCode, newLanguage) => {
    setCurrentCode(newCode);
    setCurrentLanguage(newLanguage);
    
    // Check if code meets basic completion criteria
    if (newCode.trim().length > 50) {
      checkCompletion(newCode);
    }
  };

  const checkCompletion = (code) => {
    // Simple completion check based on code content
    const hasFunction = code.includes('function') || code.includes('def ') || code.includes('public static');
    const hasOutput = code.includes('console.log') || code.includes('print(') || code.includes('System.out.println');
    const hasLogic = code.includes('if') || code.includes('for') || code.includes('while');
    
    if (hasFunction && hasOutput && hasLogic && !isCompleted) {
      setIsCompleted(true);
      if (onComplete) {
        onComplete({
          code: currentCode,
          language: currentLanguage,
          completed: true
        });
      }
    }
  };

  const toggleHints = () => {
    setShowHints(!showHints);
  };

  const markStepCompleted = (stepIndex) => {
    if (!completedSteps.includes(stepIndex)) {
      setCompletedSteps([...completedSteps, stepIndex]);
    }
  };

  return (
    <div className="hands-on-practice">
      <div className="practice-header">
        <div className="practice-title">
          <Terminal size={24} className="practice-icon" />
          <h3>{title}</h3>
          {isCompleted && (
            <div className="completion-badge">
              <CheckCircle size={16} />
              Completed
            </div>
          )}
        </div>
        
        <div className="practice-controls">
          {hints.length > 0 && (
            <button 
              className={`hints-btn ${showHints ? 'active' : ''}`}
              onClick={toggleHints}
            >
              <Lightbulb size={16} />
              {showHints ? 'Hide Hints' : 'Show Hints'}
            </button>
          )}
        </div>
      </div>

      <div className="practice-description">
        <p>{description}</p>
      </div>

      {instructions.length > 0 && (
        <div className="practice-instructions">
          <h4>Instructions:</h4>
          <ol>
            {instructions.map((instruction, index) => (
              <li 
                key={index} 
                className={completedSteps.includes(index) ? 'completed' : ''}
                onClick={() => markStepCompleted(index)}
              >
                {completedSteps.includes(index) && <CheckCircle size={16} className="step-check" />}
                {instruction}
              </li>
            ))}
          </ol>
        </div>
      )}

      {showHints && hints.length > 0 && (
        <div className="practice-hints">
          <h4>💡 Hints:</h4>
          <ul>
            {hints.map((hint, index) => (
              <li key={index}>{hint}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="practice-ide">
        <MultiLanguageIDE
          initialCode={initialCode}
          initialLanguage={language}
          onCodeChange={handleCodeChange}
        />
      </div>

      {isCompleted && (
        <div className="practice-completion">
          <div className="completion-message">
            <CheckCircle size={24} className="completion-icon" />
            <div>
              <h4>Great job! 🎉</h4>
              <p>You've successfully completed this hands-on practice exercise.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Library Explorer Component
export const LibraryExplorer = ({ title, description, libraries, onComplete }) => {
  const [selectedLibrary, setSelectedLibrary] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [codeExample, setCodeExample] = useState('');
  const [exploredLibraries, setExploredLibraries] = useState(new Set());

  const selectLibrary = (library) => {
    setSelectedLibrary(library);
    setActiveTab('overview');
    setCodeExample(library.examples[0]?.code || '');
    setExploredLibraries(prev => new Set([...prev, library.name]));
  };

  const runExample = () => {
    // Simulate running the code example
    alert(`Running ${selectedLibrary.name} example:\n\n${codeExample}`);
    
    if (exploredLibraries.size >= libraries.length && onComplete) {
      setTimeout(() => onComplete(), 1000);
    }
  };

  return (
    <div className="library-explorer">
      <div className="simulator-header">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>

      <div className="explorer-layout">
        <div className="library-list">
          <h4>Available Libraries:</h4>
          {libraries.map((library, index) => {
            const isExplored = exploredLibraries.has(library.name);
            const isSelected = selectedLibrary?.name === library.name;
            
            return (
              <div 
                key={index}
                className={`library-item ${isSelected ? 'selected' : ''} ${isExplored ? 'explored' : ''}`}
                onClick={() => selectLibrary(library)}
              >
                <div className="library-header">
                  <div className="library-name">{library.name}</div>
                  {isExplored && <div className="explored-badge">✓</div>}
                </div>
                <div className="library-category">{library.category}</div>
                <div className="library-description">{library.shortDescription}</div>
              </div>
            );
          })}
        </div>

        {selectedLibrary && (
          <div className="library-details">
            <div className="library-header">
              <h4>{selectedLibrary.name}</h4>
              <div className="library-meta">
                <span className="category-tag">{selectedLibrary.category}</span>
                <span className="version-tag">v{selectedLibrary.version}</span>
              </div>
            </div>

            <div className="library-tabs">
              <button 
                className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
                onClick={() => setActiveTab('overview')}
              >
                Overview
              </button>
              <button 
                className={`tab-button ${activeTab === 'examples' ? 'active' : ''}`}
                onClick={() => setActiveTab('examples')}
              >
                Examples
              </button>
              <button 
                className={`tab-button ${activeTab === 'api' ? 'active' : ''}`}
                onClick={() => setActiveTab('api')}
              >
                API Reference
              </button>
            </div>

            <div className="tab-content">
              {activeTab === 'overview' && (
                <div className="overview-content">
                  <p>{selectedLibrary.description}</p>
                  
                  <div className="features-list">
                    <h5>Key Features:</h5>
                    <ul>
                      {selectedLibrary.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="installation">
                    <h5>Installation:</h5>
                    <code className="install-command">{selectedLibrary.installation}</code>
                  </div>
                </div>
              )}

              {activeTab === 'examples' && (
                <div className="examples-content">
                  <div className="example-selector">
                    {selectedLibrary.examples.map((example, index) => (
                      <button 
                        key={index}
                        className="example-button"
                        onClick={() => setCodeExample(example.code)}
                      >
                        {example.title}
                      </button>
                    ))}
                  </div>
                  
                  <div className="code-example">
                    <textarea 
                      value={codeExample}
                      onChange={(e) => setCodeExample(e.target.value)}
                      rows={12}
                      className="code-editor"
                    />
                    
                    <button className="btn btn-success" onClick={runExample}>
                      Run Example
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'api' && (
                <div className="api-content">
                  <div className="api-methods">
                    {selectedLibrary.apiMethods.map((method, index) => (
                      <div key={index} className="api-method">
                        <div className="method-signature">
                          <code>{method.signature}</code>
                        </div>
                        <div className="method-description">{method.description}</div>
                        {method.parameters && (
                          <div className="method-parameters">
                            <strong>Parameters:</strong>
                            <ul>
                              {method.parameters.map((param, pIndex) => (
                                <li key={pIndex}>
                                  <code>{param.name}</code> ({param.type}): {param.description}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="exploration-progress">
        <div className="progress-text">
          Explored {exploredLibraries.size} of {libraries.length} libraries
        </div>
        <div className="progress-bar">
          <div 
            className="progress-fill"
            style={{ width: `${(exploredLibraries.size / libraries.length) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

// PC Building Simulator Component
export const PCBuildingSimulator = ({ title, description, components, onComplete }) => {
  const [selectedComponents, setSelectedComponents] = useState({});
  const [buildPhase, setBuildPhase] = useState('selection'); // selection, assembly, testing
  const [assemblyStep, setAssemblyStep] = useState(0);
  const [compatibility, setCompatibility] = useState({});
  const [_buildComplete, setBuildComplete] = useState(false);
  const [performanceScore, setPerformanceScore] = useState(0);

  const assemblySteps = [
    { name: 'Install CPU', description: 'Place the CPU in the motherboard socket' },
    { name: 'Install RAM', description: 'Insert memory modules into DIMM slots' },
    { name: 'Install Storage', description: 'Connect SSD/HDD to motherboard and power' },
    { name: 'Install GPU', description: 'Insert graphics card into PCIe slot' },
    { name: 'Connect Power', description: 'Connect PSU cables to all components' },
    { name: 'Final Assembly', description: 'Close case and connect peripherals' }
  ];

  const handleComponentSelect = (category, component) => {
    setSelectedComponents(prev => ({
      ...prev,
      [category]: component
    }));
    checkCompatibility(category, component);
  };

  const checkCompatibility = (category, component) => {
    const issues = [];
    
    // Simple compatibility checks
    if (category === 'cpu' && selectedComponents.motherboard) {
      if (component.socket !== selectedComponents.motherboard.socket) {
        issues.push('CPU socket mismatch with motherboard');
      }
    }
    
    if (category === 'ram' && selectedComponents.motherboard) {
      if (component.type !== selectedComponents.motherboard.ram_type) {
        issues.push('RAM type incompatible with motherboard');
      }
    }
    
    if (category === 'gpu' && selectedComponents.psu) {
      if (component.power_requirement > selectedComponents.psu.wattage) {
        issues.push('PSU insufficient for GPU power requirements');
      }
    }

    setCompatibility(prev => ({
      ...prev,
      [category]: issues
    }));
  };

  const startAssembly = () => {
    setBuildPhase('assembly');
    setAssemblyStep(0);
  };

  const nextAssemblyStep = () => {
    if (assemblyStep < assemblySteps.length - 1) {
      setAssemblyStep(assemblyStep + 1);
    } else {
      setBuildPhase('testing');
      calculatePerformance();
    }
  };

  const calculatePerformance = () => {
    let score = 0;
    const componentCount = Object.keys(selectedComponents).length;
    const compatibilityIssues = Object.values(compatibility).flat().length;
    
    score = Math.max(0, (componentCount * 15) - (compatibilityIssues * 10));
    setPerformanceScore(score);
    setBuildComplete(true);
    
    if (onComplete) {
      setTimeout(() => onComplete(), 2000);
    }
  };

  const resetBuild = () => {
    setSelectedComponents({});
    setBuildPhase('selection');
    setAssemblyStep(0);
    setCompatibility({});
    setBuildComplete(false);
    setPerformanceScore(0);
  };

  return (
    <div className="pc-building-simulator">
      <div className="simulator-header">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>

      <div className="build-phases">
        <div className={`phase-indicator ${buildPhase === 'selection' ? 'active' : buildPhase !== 'selection' ? 'completed' : ''}`}>
          <span className="phase-number">1</span>
          <span className="phase-name">Component Selection</span>
        </div>
        <div className={`phase-indicator ${buildPhase === 'assembly' ? 'active' : buildPhase === 'testing' ? 'completed' : ''}`}>
          <span className="phase-number">2</span>
          <span className="phase-name">Assembly</span>
        </div>
        <div className={`phase-indicator ${buildPhase === 'testing' ? 'active' : ''}`}>
          <span className="phase-number">3</span>
          <span className="phase-name">Testing</span>
        </div>
      </div>

      {buildPhase === 'selection' && (
        <div className="component-selection">
          <div className="components-grid">
            {Object.entries(components).map(([category, componentList]) => (
              <div key={category} className="component-category">
                <h4>{category.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}</h4>
                <div className="component-options">
                  {componentList.map((component, index) => {
                    const isSelected = selectedComponents[category] === component;
                    const hasIssues = compatibility[category]?.length > 0;
                    return (
                      <div 
                        key={index}
                        className={`component-card ${isSelected ? 'selected' : ''} ${hasIssues ? 'warning' : ''}`}
                        onClick={() => handleComponentSelect(category, component)}
                      >
                        <div className="component-name">{component.name}</div>
                        <div className="component-specs">
                          {Object.entries(component).filter(([key]) => key !== 'name').map(([key, value]) => (
                            <div key={key} className="spec-item">
                              <span className="spec-label">{key.replace('_', ' ')}:</span>
                              <span className="spec-value">{value}</span>
                            </div>
                          ))}
                        </div>
                        {hasIssues && (
                          <div className="compatibility-issues">
                            {compatibility[category].map((issue, idx) => (
                              <div key={idx} className="issue-text">⚠️ {issue}</div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
          
          <div className="selection-summary">
            <h4>Selected Components:</h4>
            <div className="selected-list">
              {Object.entries(selectedComponents).map(([category, component]) => (
                <div key={category} className="selected-item">
                  <strong>{category.replace('_', ' ')}:</strong> {component.name}
                </div>
              ))}
            </div>
            
            {Object.keys(selectedComponents).length >= 4 && (
              <button className="btn btn-primary" onClick={startAssembly}>
                Start Assembly
              </button>
            )}
          </div>
        </div>
      )}

      {buildPhase === 'assembly' && (
        <div className="assembly-phase">
          <div className="assembly-progress">
            <h4>Assembly Step {assemblyStep + 1} of {assemblySteps.length}</h4>
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{ width: `${((assemblyStep + 1) / assemblySteps.length) * 100}%` }}
              ></div>
            </div>
          </div>
          
          <div className="current-step">
            <h5>{assemblySteps[assemblyStep].name}</h5>
            <p>{assemblySteps[assemblyStep].description}</p>
            
            <button className="btn btn-primary" onClick={nextAssemblyStep}>
              {assemblyStep < assemblySteps.length - 1 ? 'Next Step' : 'Complete Assembly'}
            </button>
          </div>
        </div>
      )}

      {buildPhase === 'testing' && (
        <div className="testing-phase">
          <h4>Build Complete!</h4>
          <div className="performance-results">
            <div className="performance-score">
              <span className="score-value">{performanceScore}%</span>
              <span className="score-label">Performance Score</span>
            </div>
            
            <div className="build-feedback">
              {performanceScore >= 90 && <p>🎉 Excellent build! All components are perfectly compatible.</p>}
              {performanceScore >= 70 && performanceScore < 90 && <p>👍 Good build with minor compatibility issues.</p>}
              {performanceScore >= 50 && performanceScore < 70 && <p>⚠️ Decent build but some components may not work optimally together.</p>}
              {performanceScore < 50 && <p>🔧 This build has significant compatibility issues that need addressing.</p>}
            </div>
            
            <button className="btn btn-secondary" onClick={resetBuild}>
              Build Another PC
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Arduino Simulator Component
export const ArduinoSimulator = ({ title, description, components, projects, onComplete }) => {
  const [code, setCode] = useState(`// Arduino LED Blink Example
void setup() {
  pinMode(13, OUTPUT);
}

void loop() {
  digitalWrite(13, HIGH);
  delay(1000);
  digitalWrite(13, LOW);
  delay(1000);
}`);
  
  const [isRunning, setIsRunning] = useState(false);
  const [serialOutput, setSerialOutput] = useState([]);
  const [pinStates, setPinStates] = useState({});
  const [simulatorComponents, setSimulatorComponents] = useState([
    { id: 'led1', type: 'led', color: 'red', pin: 13, x: 450, y: 150, connected: true },
    { id: 'resistor1', type: 'resistor', value: 220, x: 450, y: 200, connected: true }
  ]);
  
  const intervalRef = useRef(null);
  const executionStateRef = useRef({ 
    currentLine: 0, 
    inSetup: false, 
    inLoop: false, 
    loopStartLine: 0,
    delayUntil: 0,
    variables: {},
    functions: {}
  });

  // Arduino code parser and executor
  const parseArduinoCode = (code) => {
    const lines = code.split('\n').map(line => line.trim()).filter(line => line && !line.startsWith('//'));
    const parsedCode = {
      setup: [],
      loop: [],
      functions: {},
      variables: {}
    };
    
    let currentSection = null;
    let braceCount = 0;
    
    lines.forEach((line, index) => {
      if (line.includes('void setup()')) {
        currentSection = 'setup';
        braceCount = 0;
      } else if (line.includes('void loop()')) {
        currentSection = 'loop';
        braceCount = 0;
      } else if (line.includes('{')) {
        braceCount++;
      } else if (line.includes('}')) {
        braceCount--;
        if (braceCount === 0) {
          currentSection = null;
        }
      } else if (currentSection && braceCount > 0) {
        parsedCode[currentSection].push({ line, index });
      }
    });
    
    return parsedCode;
  };

  const executeArduinoCommand = (command) => {
    const now = Date.now();
    
    // Handle delay
    if (command.includes('delay(')) {
      const delayMatch = command.match(/delay\\((\\d+)\\)/);
      if (delayMatch) {
        const delayTime = parseInt(delayMatch[1]);
        executionStateRef.current.delayUntil = now + delayTime;
        return;
      }
    }
    
    // Handle pinMode
    if (command.includes('pinMode(')) {
      const pinModeMatch = command.match(/pinMode\\((\\d+),\\s*(INPUT|OUTPUT)\\)/);
      if (pinModeMatch) {
        const pin = parseInt(pinModeMatch[1]);
        const mode = pinModeMatch[2];
        setPinStates(prev => ({ ...prev, [`pin_${pin}_mode`]: mode }));
      }
    }
    
    // Handle digitalWrite
    if (command.includes('digitalWrite(')) {
      const digitalWriteMatch = command.match(/digitalWrite\\((\\d+),\\s*(HIGH|LOW)\\)/);
      if (digitalWriteMatch) {
        const pin = parseInt(digitalWriteMatch[1]);
        const value = digitalWriteMatch[2] === 'HIGH';
        setPinStates(prev => ({ ...prev, [`pin_${pin}`]: value }));
        
        // Update connected components
        setSimulatorComponents(prev => prev.map(comp => {
          if (comp.pin === pin && comp.type === 'led') {
            return { ...comp, state: value };
          }
          return comp;
        }));
      }
    }
    
    // Handle Serial.print
    if (command.includes('Serial.print')) {
      const serialMatch = command.match(/Serial\\.print(?:ln)?\\([\"'](.*?)[\"']\\)/);
      if (serialMatch) {
        const message = serialMatch[1];
        setSerialOutput(prev => [...prev, { timestamp: now, message }]);
      }
    }
  };

  const runSimulation = () => {
    if (!isRunning) return;
    
    const now = Date.now();
    const state = executionStateRef.current;
    
    // Check if we're in a delay
    if (state.delayUntil > now) {
      return;
    }
    
    const parsedCode = parseArduinoCode(code);
    
    // Execute setup once
    if (!state.inSetup && !state.inLoop && parsedCode.setup.length > 0) {
      state.inSetup = true;
      state.currentLine = 0;
    }
    
    // Execute setup commands
    if (state.inSetup && state.currentLine < parsedCode.setup.length) {
      const command = parsedCode.setup[state.currentLine];
      executeArduinoCommand(command.line);
      state.currentLine++;
      
      if (state.currentLine >= parsedCode.setup.length) {
        state.inSetup = false;
        state.inLoop = true;
        state.currentLine = 0;
      }
    }
    
    // Execute loop commands
    if (state.inLoop && parsedCode.loop.length > 0) {
      if (state.currentLine >= parsedCode.loop.length) {
        state.currentLine = 0; // Loop back to start
      }
      
      const command = parsedCode.loop[state.currentLine];
      executeArduinoCommand(command.line);
      state.currentLine++;
    }
  };

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(runSimulation, 50); // 20 FPS
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      // Reset execution state
      executionStateRef.current = {
        currentLine: 0,
        inSetup: false,
        inLoop: false,
        delayUntil: 0,
        variables: {},
        functions: {}
      };
    }
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, code]);

  const handleStart = () => {
    setIsRunning(true);
    setSerialOutput([]);
    if (onComplete) {
      setTimeout(() => onComplete(), 5000);
    }
  };

  const handleStop = () => {
    setIsRunning(false);
    // Reset all pin states
    setPinStates({});
    setSimulatorComponents(prev => prev.map(comp => ({ ...comp, state: false })));
  };

  const handleReset = () => {
    handleStop();
    setSerialOutput([]);
  };

  const addComponent = (type) => {
    const newComponent = {
      id: `${type}_${Date.now()}`,
      type,
      pin: type === 'led' ? 13 : null,
      x: 400 + Math.random() * 100,
      y: 150 + Math.random() * 100,
      connected: false,
      state: false
    };
    
    if (type === 'led') {
      newComponent.color = 'red';
    } else if (type === 'resistor') {
      newComponent.value = 220;
    }
    
    setSimulatorComponents(prev => [...prev, newComponent]);
  };

  return (
    <div className="arduino-simulator-enhanced">
      <div className="simulator-header">
        <h3>{title || 'Arduino Simulator - LED Control'}</h3>
        <div className="simulator-controls">
          <button 
            className={`control-btn ${isRunning ? 'running' : ''}`}
            onClick={handleStart}
            disabled={isRunning}
          >
            ▶ Run
          </button>
          <button 
            className="control-btn stop"
            onClick={handleStop}
            disabled={!isRunning}
          >
            ⏹ Stop
          </button>
          <button 
            className="control-btn reset"
            onClick={handleReset}
          >
            🔄 Reset
          </button>
        </div>
      </div>
      
      <div className="simulator-content">
        <div className="code-editor">
          <h4>Arduino Code Editor</h4>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="code-textarea"
            disabled={isRunning}
            placeholder="Enter your Arduino code here..."
          />
          
          <div className="component-toolbar">
            <button onClick={() => addComponent('led')} disabled={isRunning}>
              + Add LED
            </button>
            <button onClick={() => addComponent('resistor')} disabled={isRunning}>
              + Add Resistor
            </button>
          </div>
        </div>
        
        <div className="simulation-area">
          <div className="arduino-board">
            <img 
              src="/src/assets/arduino-board.svg" 
              alt="Arduino Uno Board" 
              className="board-image"
            />
            
            {/* Built-in LED (Pin 13) */}
            <div 
              className={`builtin-led ${pinStates.pin_13 ? 'on' : 'off'}`}
              style={{ position: 'absolute', top: '140px', left: '320px' }}
            >
              <div className={`led-indicator ${pinStates.pin_13 ? 'active' : ''}`}></div>
            </div>
            
            {/* Power LED */}
            <div 
              className="power-led on"
              style={{ position: 'absolute', top: '120px', left: '320px' }}
            >
              <div className="led-indicator active"></div>
            </div>
          </div>
          
          <div className="breadboard-area">
            <img 
              src="/src/assets/breadboard.svg" 
              alt="Breadboard" 
              className="breadboard-image"
            />
            
            {/* Render components */}
            {simulatorComponents.map(component => (
              <div
                key={component.id}
                className={`component ${component.type}`}
                style={{
                  position: 'absolute',
                  left: `${component.x}px`,
                  top: `${component.y}px`
                }}
              >
                {component.type === 'led' && (
                  <div className={`led-component ${component.state ? 'on' : 'off'}`}>
                    <img 
                      src={`/src/assets/led-${component.color}.svg`}
                      alt={`${component.color} LED`}
                      className="component-image"
                    />
                    {component.state && (
                      <div className={`led-glow ${component.color}`}></div>
                    )}
                    <span className="pin-label">Pin {component.pin}</span>
                  </div>
                )}
                
                {component.type === 'resistor' && (
                  <div className="resistor-component">
                    <img 
                      src="/src/assets/resistor.svg"
                      alt="Resistor"
                      className="component-image"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="serial-monitor">
        <h4>Serial Monitor</h4>
        <div className="serial-output">
          {serialOutput.map((entry, index) => (
            <div key={index} className="serial-line">
              <span className="timestamp">[{new Date(entry.timestamp).toLocaleTimeString()}]</span>
              <span className="message">{entry.message}</span>
            </div>
          ))}
          {serialOutput.length === 0 && (
            <div className="serial-placeholder">Serial output will appear here...</div>
          )}
        </div>
      </div>
    </div>
  );
};

// Interactive List Component

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

// Interactive Code Example with step-by-step execution and comprehension validation
export const InteractiveCodeExample = ({ code, steps, title, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [highlightedLines, setHighlightedLines] = useState([]);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [isCompleted, setIsCompleted] = useState(false);

  const codeQuizQuestions = [
    {
      id: 'purpose',
      question: 'What is the main purpose of this code?',
      type: 'text'
    },
    {
      id: 'output',
      question: 'What would be the expected output of this code?',
      type: 'text'
    },
    {
      id: 'modification',
      question: 'How would you modify this code to solve a similar problem?',
      type: 'text'
    }
  ];

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

  const handleQuizAnswer = (questionId, answer) => {
    setQuizAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const validateCodeUnderstanding = () => {
    const allAnswered = codeQuizQuestions.every(
      q => quizAnswers[q.id]?.trim().length > 5
    );
    
    if (allAnswered) {
      setIsCompleted(true);
      if (onComplete) {
        onComplete(quizAnswers);
      }
    }
  };

  const allQuizQuestionsAnswered = codeQuizQuestions.every(
    q => quizAnswers[q.id]?.trim().length > 5
  );

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
          {!showQuiz ? (
            <>
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
                onClick={() => {
                  if (currentStep === steps.length - 1) {
                    setShowQuiz(true);
                  } else {
                    setCurrentStep(Math.min(steps.length - 1, currentStep + 1));
                  }
                }}
                disabled={isPlaying}
                className="step-btn"
              >
                {currentStep === steps.length - 1 ? 'Test Understanding' : 'Next Step →'}
              </button>
            </>
          ) : (
            <div className="code-quiz-section">
              <h4>🧠 Test Your Code Understanding</h4>
              <p>Answer these questions to demonstrate your understanding of the code:</p>
              
              {codeQuizQuestions.map((question) => (
                <div key={question.id} className="code-quiz-question">
                  <label>{question.question}</label>
                  <textarea
                    value={quizAnswers[question.id] || ''}
                    onChange={(e) => handleQuizAnswer(question.id, e.target.value)}
                    placeholder="Type your answer here (minimum 5 characters)..."
                    rows="2"
                    className="quiz-textarea"
                  />
                  {quizAnswers[question.id]?.trim().length > 0 && 
                   quizAnswers[question.id]?.trim().length < 5 && (
                    <div className="validation-hint">
                      Please provide a more detailed answer
                    </div>
                  )}
                </div>
              ))}
              
              <div className="quiz-controls">
                <button 
                  onClick={() => setShowQuiz(false)}
                  className="step-btn secondary"
                >
                  ← Back to Code
                </button>
                <button 
                  onClick={validateCodeUnderstanding}
                  disabled={!allQuizQuestionsAnswered}
                  className={`step-btn ${allQuizQuestionsAnswered ? 'primary' : 'disabled'}`}
                >
                  {isCompleted ? (
                    <>
                      <CheckCircle size={16} />
                      Completed
                    </>
                  ) : (
                    'Submit Answers'
                  )}
                </button>
              </div>
              
              {isCompleted && (
                <div className="completion-message">
                  <CheckCircle size={20} />
                  <span>Excellent! You've demonstrated good understanding of the code.</span>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// ArduinoPlayground is now imported from its own file

// Main component router for interactive lesson components
const InteractiveLessonComponents = ({ component, ...props }) => {
  switch (component) {
    case 'story':
      return <InteractiveStory {...props} />;
    case 'list':
      return <InteractiveList {...props} />;
    case 'code':
      return <InteractiveCodeExample {...props} />;
    case 'quiz':
      return <InteractiveQuiz {...props} />;
    default:
      return <div>Interactive component not found: {component}</div>;
  }
};

// Enhanced Interactive Code Challenge Component
export const InteractiveCodeChallenge = ({ 
  challenge, 
  language = 'python', 
  onComplete 
}) => {
  const [isCompleted, setIsCompleted] = useState(false);

  const handleComplete = () => {
    setIsCompleted(true);
    if (onComplete) {
      onComplete();
    }
  };

  return (
    <div className="interactive-code-challenge">
      <div className="challenge-header">
        <Code size={20} />
        <h3>{challenge.title}</h3>
        {isCompleted && (
          <div className="completion-badge">
            <CheckCircle size={16} />
            Completed
          </div>
        )}
      </div>
      
      <div className="challenge-description">
        <p>{challenge.description}</p>
        {challenge.requirements && (
          <div className="requirements">
            <h4>Requirements:</h4>
            <ul>
              {challenge.requirements.map((req, index) => (
                <li key={index}>{req}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <MultiLanguageIDE
        initialCode={challenge.starterCode || ''}
        initialLanguage={language}
        onCodeChange={(newCode, newLanguage) => {
          // Handle code changes and check completion
          if (newCode.trim().length > 50) {
            handleComplete({
              code: newCode,
              language: newLanguage,
              completed: true
            });
          }
        }}
      />
    </div>
  );
};

// Interactive Quiz Component
export const InteractiveQuiz = ({ questions, onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  // Reset currentQuestion when questions prop changes
  useEffect(() => {
    if (questions && questions.length > 0) {
      setCurrentQuestion(0);
      setSelectedAnswers({});
      setShowResults(false);
      setScore(0);
    }
  }, [questions]);

  // Debug log to check questions
  useEffect(() => {
    console.log('InteractiveQuiz - Questions received:', questions);
    console.log('InteractiveQuiz - Questions length:', questions?.length);
    console.log('InteractiveQuiz - Current question index:', currentQuestion);
    if (questions && questions[currentQuestion]) {
      console.log('InteractiveQuiz - Current question:', questions[currentQuestion]);
    }
    // Log all question texts to see if they're different
    if (questions && Array.isArray(questions)) {
      questions.forEach((q, i) => {
        console.log(`Question ${i + 1}:`, q.question);
      });
    }
  }, [questions, currentQuestion]);

  // Check answer and update selectedAnswers
  const handleAnswerSelect = (questionIndex, answerIndex) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionIndex]: answerIndex
    }));
  };

  // Submit quiz and calculate score
  const submitQuiz = () => {
    let correctCount = 0;
    questions.forEach((question, index) => {
      const correctAnswer = question.correctAnswer !== undefined ? question.correctAnswer : question.correct;
      if (selectedAnswers[index] === correctAnswer) {
        correctCount++;
      }
    });
    setScore(correctCount);
    setShowResults(true);
    if (onComplete) {
      onComplete(correctCount, questions.length);
    }
  };

  // Reset quiz state
  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setShowResults(false);
    setScore(0);
  };

  // When pressing Next, refresh the problem UI
  useEffect(() => {
    // Optionally, scroll to top or reset focus if needed
  }, [currentQuestion]);

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
            const correctAnswer = question.correctAnswer !== undefined ? question.correctAnswer : question.correct;
            const isCorrect = selectedAnswers[index] === correctAnswer;
            return (
              <div key={index} className={`result-item ${isCorrect ? 'correct' : 'incorrect'}`}>
                <div className="result-icon">
                  {isCorrect ? <CheckCircle size={20} /> : <XCircle size={20} />}
                </div>
                <div className="result-content">
                  <p className="question-text">{question.question}</p>
                  <p className="answer-text">
                    Your answer: {question.options && question.options[selectedAnswers[index]] || 'No answer selected'}
                  </p>
                  {!isCorrect && (
                    <p className="correct-answer">
                      Correct answer: {question.options && question.options[correctAnswer] || 'N/A'}
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

  const question = questions && questions[currentQuestion];
  const allAnswered = questions && questions.every((_, index) => Object.hasOwn(selectedAnswers, index));

  // Safety check - if no questions or invalid currentQuestion, don't render
  if (!questions || questions.length === 0 || !question) {
    return <div className="interactive-quiz">No questions available</div>;
  }

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
      <div className="question-container" key={currentQuestion}>
        <h3 className="question-text">{question.question}</h3>
        <div className="options-container">
          {question.options && question.options.map((option, index) => (
            <button
              key={`${currentQuestion}-${index}`}
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
            onClick={() => {
              console.log('Next button clicked, current:', currentQuestion, 'going to:', currentQuestion + 1);
              setCurrentQuestion(Math.min(questions.length - 1, currentQuestion + 1));
            }}
            className="quiz-btn primary"
          >
            Next →
          </button>
        )}
      </div>
    </div>
  );
};

// Decision Tree Simulator Component
export const DecisionTreeSimulator = ({ title, description, factors, decision_tree, onComplete }) => {
  const [selections, setSelections] = useState({});
  const [result, setResult] = useState(null);
  const [showValidation, setShowValidation] = useState(false);

  const handleFactorChange = (factor, value) => {
    setSelections(prev => ({ ...prev, [factor]: value }));
    setResult(null);
    setShowValidation(false);
  };

  const getDecisionResult = () => {
    let current = decision_tree;
    const path = [];
    
    // Navigate through decision tree based on selections
    for (const [factor, value] of Object.entries(selections)) {
      path.push(`${factor}: ${value}`);
      if (current[value]) {
        current = current[value];
      } else if (current.any_weather || current[`${factor}_${value}`]) {
        current = current.any_weather || current[`${factor}_${value}`];
      }
    }
    
    // If we reach a string, that's our result
    if (typeof current === 'string') {
      return { result: current, path };
    }
    
    // Otherwise, continue navigating
    const keys = Object.keys(current);
    if (keys.length === 1) {
      return { result: current[keys[0]], path };
    }
    
    return { result: 'Please make all selections to see the recommendation.', path };
  };

  const handleSubmit = () => {
    const decision = getDecisionResult();
    setResult(decision);
    setShowValidation(true);
    if (decision.result !== 'Please make all selections to see the recommendation.' && onComplete) {
      setTimeout(() => onComplete(), 2000);
    }
  };

  const allFactorsSelected = Object.keys(factors).every(factor => selections[factor]);

  return (
    <div className="decision-tree-simulator">
      <div className="simulator-header">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      
      <div className="factors-selection">
        {Object.entries(factors).map(([factor, options]) => (
          <div key={factor} className="factor-group">
            <label className="factor-label">
              {factor.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}:
            </label>
            <select 
              className="factor-select"
              value={selections[factor] || ''}
              onChange={(e) => handleFactorChange(factor, e.target.value)}
            >
              <option value="">Select {factor.replace('_', ' ')}</option>
              {options.map(option => (
                <option key={option} value={option}>
                  {option.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
      
      <div className="simulator-controls">
        <button 
          className="btn btn-primary"
          onClick={handleSubmit}
          disabled={!allFactorsSelected}
        >
          Get Recommendation
        </button>
      </div>
      
      {showValidation && result && (
        <div className="decision-result">
          <div className="result-header">
            <h4>Recommendation:</h4>
          </div>
          <div className="result-content">
            <p className="result-text">{result.result}</p>
            {result.path && result.path.length > 0 && (
              <div className="decision-path">
                <h5>Decision Path:</h5>
                <ul>
                  {result.path.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// Optimization Comparison Component
export const OptimizationComparison = ({ title, description, scenarios, onComplete }) => {
  const [selectedScenario, setSelectedScenario] = useState(null);
  const [showComparison, setShowComparison] = useState(false);
  const [testResults, setTestResults] = useState({});

  const runOptimizationTest = (scenarioKey) => {
    const _scenario = scenarios[scenarioKey];
    const testCases = [1, 5, 10, 20, 50];
    
    // Simulate performance testing
    const results = testCases.map(testCase => {
      const checks = scenarioKey === 'optimized' 
        ? Math.ceil(Math.log2(testCase)) 
        : Math.ceil(testCase / 2);
      return { testCase, checks };
    });
    
    setTestResults(prev => ({ ...prev, [scenarioKey]: results }));
  };

  const handleScenarioSelect = (scenarioKey) => {
    setSelectedScenario(scenarioKey);
    runOptimizationTest(scenarioKey);
  };

  const handleCompareAll = () => {
    Object.keys(scenarios).forEach(key => {
      runOptimizationTest(key);
    });
    setShowComparison(true);
    if (onComplete) {
      setTimeout(() => onComplete(), 3000);
    }
  };

  return (
    <div className="optimization-comparison">
      <div className="comparison-header">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      
      <div className="scenarios-grid">
        {Object.entries(scenarios).map(([key, scenario]) => (
          <div 
            key={key} 
            className={`scenario-card ${selectedScenario === key ? 'selected' : ''}`}
            onClick={() => handleScenarioSelect(key)}
          >
            <h4>{key.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}</h4>
            <p><strong>Structure:</strong> {scenario.structure}</p>
            <p><strong>Average Checks:</strong> {scenario.average_checks}</p>
            <p><strong>Worst Case:</strong> {scenario.worst_case}</p>
            
            {testResults[key] && (
              <div className="test-results">
                <h5>Performance Test:</h5>
                <div className="results-chart">
                  {testResults[key].map((result, index) => (
                    <div key={index} className="result-bar">
                      <span className="test-case">Items: {result.testCase}</span>
                      <div className="bar-container">
                        <div 
                          className="performance-bar"
                          style={{ width: `${(result.checks / 25) * 100}%` }}
                        ></div>
                        <span className="checks-count">{result.checks} checks</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="comparison-controls">
        <button 
          className="btn btn-primary"
          onClick={handleCompareAll}
          disabled={Object.keys(testResults).length === 0}
        >
          Compare All Scenarios
        </button>
      </div>
      
      {showComparison && (
        <div className="comparison-results">
          <h4>Performance Comparison Summary</h4>
          <div className="summary-stats">
            {Object.entries(scenarios).map(([key, scenario]) => (
              <div key={key} className="stat-card">
                <h5>{key.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}</h5>
                <p>Efficiency: {scenario.average_checks < 4 ? 'High' : scenario.average_checks < 6 ? 'Medium' : 'Low'}</p>
                <p>Best for: {scenario.average_checks < 4 ? 'Large datasets' : 'Small datasets'}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// IoT Simulator Component
export const IoTSimulator = ({ title, description, devices, onComplete }) => {
  const [selectedDevices, setSelectedDevices] = useState([]);
  const [currentScenario, setCurrentScenario] = useState(null);
  const [_simulationState, setSimulationState] = useState({});
  const [isRunning, setIsRunning] = useState(false);
  const [simulationLog, setSimulationLog] = useState([]);

  const handleDeviceToggle = (deviceType, device) => {
    const deviceKey = `${deviceType}_${device}`;
    setSelectedDevices(prev => 
      prev.includes(deviceKey) 
        ? prev.filter(d => d !== deviceKey)
        : [...prev, deviceKey]
    );
  };

  const startScenario = (scenario) => {
    setCurrentScenario(scenario);
    setSimulationLog([`Starting ${scenario} scenario...`]);
    setIsRunning(true);
    
    // Simulate IoT device interactions
    const simulationSteps = [
      'Initializing sensors...',
      'Reading environmental data...',
      'Processing sensor inputs...',
      'Triggering actuator responses...',
      'Logging system state...'
    ];
    
    simulationSteps.forEach((step, index) => {
      setTimeout(() => {
        setSimulationLog(prev => [...prev, step]);
        if (index === simulationSteps.length - 1) {
          setSimulationLog(prev => [...prev, `${scenario} scenario completed successfully!`]);
          setIsRunning(false);
          if (onComplete) {
            setTimeout(() => onComplete(), 1500);
          }
        }
      }, (index + 1) * 1000);
    });
  };

  const resetSimulation = () => {
    setCurrentScenario(null);
    setSimulationState({});
    setIsRunning(false);
    setSimulationLog([]);
  };

  return (
    <div className="iot-simulator">
      <div className="simulator-header">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      
      <div className="device-selection">
        <h4>Available Devices:</h4>
        <div className="device-categories">
          {Object.entries(devices).map(([category, deviceList]) => (
            <div key={category} className="device-category">
              <h5>{category.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}</h5>
              <div className="device-grid">
                {deviceList.map(device => {
                  const deviceKey = `${category}_${device}`;
                  const isSelected = selectedDevices.includes(deviceKey);
                  return (
                    <div 
                      key={device}
                      className={`device-card ${isSelected ? 'selected' : ''}`}
                      onClick={() => handleDeviceToggle(category, device)}
                    >
                      <div className="device-icon">
                        {category === 'sensors' ? '📡' : '⚡'}
                      </div>
                      <span className="device-name">{device}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {devices.scenarios && (
        <div className="scenario-selection">
          <h4>Test Scenarios:</h4>
          <div className="scenario-buttons">
            {devices.scenarios.map(scenario => (
              <button 
                key={scenario}
                className={`btn ${currentScenario === scenario ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => startScenario(scenario)}
                disabled={isRunning || selectedDevices.length === 0}
              >
                {scenario.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </button>
            ))}
          </div>
        </div>
      )}
      
      <div className="simulation-output">
        <div className="simulation-controls">
          <button 
            className="btn btn-danger"
            onClick={resetSimulation}
            disabled={isRunning}
          >
            Reset Simulation
          </button>
        </div>
        
        {simulationLog.length > 0 && (
          <div className="simulation-log">
            <h5>Simulation Log:</h5>
            <div className="log-container">
              {simulationLog.map((entry, index) => (
                <div key={index} className="log-entry">
                  <span className="log-timestamp">[{new Date().toLocaleTimeString()}]</span>
                  <span className="log-message">{entry}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Robotics Simulator Component
export const RoboticsSimulator = ({ title, description, capabilities, onComplete }) => {
  const [selectedCapabilities, setSelectedCapabilities] = useState([]);
  const [_robotConfig, setRobotConfig] = useState({});
  const [simulationPhase, setSimulationPhase] = useState('design'); // design, testing, deployment
  const [testResults, setTestResults] = useState({});
  const [isSimulating, setIsSimulating] = useState(false);

  const handleCapabilitySelect = (category, capability) => {
    const capabilityKey = `${category}_${capability}`;
    setSelectedCapabilities(prev => 
      prev.includes(capabilityKey)
        ? prev.filter(c => c !== capabilityKey)
        : [...prev, capabilityKey]
    );
  };

  const runSimulation = async () => {
    setIsSimulating(true);
    setSimulationPhase('testing');
    
    // Simulate different phases of robotics testing
    const phases = [
      { name: 'Hardware Initialization', duration: 1000 },
      { name: 'Sensor Calibration', duration: 1500 },
      { name: 'Navigation Testing', duration: 2000 },
      { name: 'Task Execution', duration: 2500 },
      { name: 'Performance Analysis', duration: 1000 }
    ];
    
    for (let i = 0; i < phases.length; i++) {
      const phase = phases[i];
      await new Promise(resolve => {
        setTimeout(() => {
          setTestResults(prev => ({
            ...prev,
            [phase.name]: {
              status: 'completed',
              score: Math.floor(Math.random() * 30) + 70, // 70-100% success rate
              timestamp: new Date().toLocaleTimeString()
            }
          }));
          resolve();
        }, phase.duration);
      });
    }
    
    setSimulationPhase('deployment');
    setIsSimulating(false);
    
    if (onComplete) {
      setTimeout(() => onComplete(), 2000);
    }
  };

  const resetRobot = () => {
    setSelectedCapabilities([]);
    setRobotConfig({});
    setSimulationPhase('design');
    setTestResults({});
    setIsSimulating(false);
  };

  const getOverallScore = () => {
    const scores = Object.values(testResults).map(result => result.score);
    return scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;
  };

  return (
    <div className="robotics-simulator">
      <div className="simulator-header">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      
      <div className="simulation-phases">
        <div className={`phase-indicator ${simulationPhase === 'design' ? 'active' : simulationPhase !== 'design' ? 'completed' : ''}`}>
          <span className="phase-number">1</span>
          <span className="phase-name">Design</span>
        </div>
        <div className={`phase-indicator ${simulationPhase === 'testing' ? 'active' : simulationPhase === 'deployment' ? 'completed' : ''}`}>
          <span className="phase-number">2</span>
          <span className="phase-name">Testing</span>
        </div>
        <div className={`phase-indicator ${simulationPhase === 'deployment' ? 'active' : ''}`}>
          <span className="phase-number">3</span>
          <span className="phase-name">Deployment</span>
        </div>
      </div>
      
      {simulationPhase === 'design' && (
        <div className="robot-design">
          <h4>Select Robot Capabilities:</h4>
          <div className="capabilities-grid">
            {Object.entries(capabilities).map(([category, capabilityList]) => (
              <div key={category} className="capability-category">
                <h5>{category.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}</h5>
                <div className="capability-options">
                  {capabilityList.map(capability => {
                    const capabilityKey = `${category}_${capability}`;
                    const isSelected = selectedCapabilities.includes(capabilityKey);
                    return (
                      <div 
                        key={capability}
                        className={`capability-card ${isSelected ? 'selected' : ''}`}
                        onClick={() => handleCapabilitySelect(category, capability)}
                      >
                        <div className="capability-icon">
                          {category === 'navigation' ? '🧭' : category === 'perception' ? '👁️' : '🧠'}
                        </div>
                        <span className="capability-name">{capability}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
          
          <div className="design-controls">
            <button 
              className="btn btn-primary"
              onClick={runSimulation}
              disabled={selectedCapabilities.length === 0 || isSimulating}
            >
              {isSimulating ? 'Running Simulation...' : 'Start Simulation'}
            </button>
            <button 
              className="btn btn-secondary"
              onClick={resetRobot}
              disabled={isSimulating}
            >
              Reset Design
            </button>
          </div>
        </div>
      )}
      
      {(simulationPhase === 'testing' || simulationPhase === 'deployment') && (
        <div className="simulation-results">
          <h4>Test Results:</h4>
          <div className="results-grid">
            {Object.entries(testResults).map(([testName, result]) => (
              <div key={testName} className="result-card">
                <h5>{testName}</h5>
                <div className="result-score">
                  <span className="score-value">{result.score}%</span>
                  <span className="score-label">Success Rate</span>
                </div>
                <div className="result-status">
                  <span className={`status-badge ${result.status}`}>{result.status}</span>
                  <span className="result-time">{result.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
          
          {simulationPhase === 'deployment' && (
            <div className="overall-performance">
              <h4>Overall Performance: {getOverallScore()}%</h4>
              <div className="performance-feedback">
                {getOverallScore() >= 90 && <p>🎉 Excellent! Your robot design shows outstanding performance across all systems.</p>}
                {getOverallScore() >= 75 && getOverallScore() < 90 && <p>👍 Good job! Your robot performs well with minor areas for improvement.</p>}
                {getOverallScore() >= 60 && getOverallScore() < 75 && <p>⚠️ Fair performance. Consider optimizing your capability selections.</p>}
                {getOverallScore() < 60 && <p>🔧 Needs improvement. Try different capability combinations for better performance.</p>}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
