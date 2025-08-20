import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Play, RotateCcw, BookOpen, TestTube, ChevronRight, Code, Zap, CheckCircle } from 'lucide-react';
import { grades, topics } from '../data/topics';
import '../styles/Playground.css';

const Playground = () => {
  const { gradeLevel, topicId, subtopicId } = useParams();
  const grade = grades[gradeLevel];
  const topic = topics[topicId];
  const subtopic = topic?.subtopics[subtopicId];
  
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [activeTab, setActiveTab] = useState('editor');
  
  if (!grade || !topic || !subtopic) {
    return <div>Playground not found</div>;
  }

  // Sample playground content based on subtopic
  const getPlaygroundContent = (subtopicId) => {
    const playgroundMap = {
      '1.1': {
        title: "Pseudocode Practice",
        description: "Practice writing pseudocode for common algorithms",
        initialCode: `// Write pseudocode to find the largest number in a list\n// Example:\nBEGIN\n  INPUT list_of_numbers\n  SET largest = first_number_in_list\n  FOR each number in list_of_numbers\n    IF number > largest THEN\n      SET largest = number\n    END IF\n  END FOR\n  OUTPUT largest\nEND`,
        challenges: [
          {
            title: "Find Maximum",
            description: "Write pseudocode to find the largest number in a list",
            hint: "Use a variable to keep track of the current maximum"
          },
          {
            title: "Count Even Numbers",
            description: "Write pseudocode to count even numbers in a list",
            hint: "Use the modulo operator (%) to check if a number is even"
          },
          {
            title: "Simple Calculator",
            description: "Write pseudocode for a basic calculator",
            hint: "Use selection statements for different operations"
          }
        ]
      },
      '1.2': {
        title: "Selection Structures",
        description: "Practice with IF-ELSE statements and conditional logic",
        initialCode: `// Grade Calculator\nBEGIN\n  INPUT score\n  IF score >= 90 THEN\n    OUTPUT "Grade: A"\n  ELIF score >= 80 THEN\n    OUTPUT "Grade: B"\n  ELIF score >= 70 THEN\n    OUTPUT "Grade: C"\n  ELIF score >= 60 THEN\n    OUTPUT "Grade: D"\n  ELSE\n    OUTPUT "Grade: F"\n  END IF\nEND`,
        challenges: [
          {
            title: "Age Classifier",
            description: "Create a program that classifies age groups",
            hint: "Use multiple IF-ELIF statements"
          },
          {
            title: "Temperature Converter",
            description: "Convert between Celsius and Fahrenheit",
            hint: "Ask user for conversion type first"
          }
        ]
      },
      'default': {
        title: "Interactive Learning",
        description: "Explore concepts through hands-on practice",
        initialCode: `// Welcome to the ${subtopic.title} playground!\n// This is where you can experiment and practice\n\n// Try writing some code or pseudocode here\n// Click 'Run' to see the results\n\nBEGIN\n  OUTPUT "Hello, Digital Literacy Student!"\n  OUTPUT "Ready to learn ${subtopic.title}?"\nEND`,
        challenges: [
          {
            title: "Basic Concepts",
            description: "Practice the fundamental concepts",
            hint: "Start with simple examples"
          },
          {
            title: "Applied Learning",
            description: "Apply concepts to real scenarios",
            hint: "Think about practical applications"
          }
        ]
      }
    };
    
    return playgroundMap[subtopicId] || playgroundMap['default'];
  };

  const playgroundContent = getPlaygroundContent(subtopicId);
  
  // Initialize code with playground content
  useState(() => {
    if (!code) {
      setCode(playgroundContent.initialCode);
    }
  }, []);

  const runCode = () => {
    setIsRunning(true);
    setOutput('Running...');
    
    // Simulate code execution
    setTimeout(() => {
      const lines = code.split('\n');
      const outputLines = [];
      
      lines.forEach(line => {
        const trimmed = line.trim();
        if (trimmed.startsWith('OUTPUT')) {
          const match = trimmed.match(/OUTPUT\s+["'](.*)["']/);
          if (match) {
            outputLines.push(match[1]);
          }
        }
      });
      
      if (outputLines.length > 0) {
        setOutput(outputLines.join('\n'));
      } else {
        setOutput('Code executed successfully!\n(No output statements found)');
      }
      
      setIsRunning(false);
    }, 1000);
  };

  const resetCode = () => {
    setCode(playgroundContent.initialCode);
    setOutput('');
  };

  return (
    <div className="playground">
      {/* Header */}
      <div className="playground-header">
        <div className="header-background">
          <div className="code-pattern"></div>
        </div>
        
        <div className="header-content">
          <Link to={`/grade/${gradeLevel}/topic/${topicId}`} className="back-button">
            <ArrowLeft size={20} />
            <span>Back to {topic.title}</span>
          </Link>
          
          <div className="playground-info">
            <div className="playground-badge">
              <Code size={16} />
              <span>Interactive Playground</span>
            </div>
            <h1>{playgroundContent.title}</h1>
            <p>{playgroundContent.description}</p>
            
            <div className="playground-meta">
              <div className="meta-item">
                <span className="meta-label">Subtopic:</span>
                <span className="meta-value">{subtopic.title}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Difficulty:</span>
                <span className="meta-value">{subtopic.difficulty}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="playground-content">
        <div className="content-container">
          {/* Code Editor Section */}
          <div className="editor-section">
            <div className="editor-tabs">
              <button 
                className={`tab ${activeTab === 'editor' ? 'active' : ''}`}
                onClick={() => setActiveTab('editor')}
              >
                <Code size={16} />
                <span>Code Editor</span>
              </button>
              <button 
                className={`tab ${activeTab === 'output' ? 'active' : ''}`}
                onClick={() => setActiveTab('output')}
              >
                <Zap size={16} />
                <span>Output</span>
              </button>
            </div>
            
            <div className="editor-content">
              {activeTab === 'editor' ? (
                <div className="code-editor">
                  <div className="editor-toolbar">
                    <div className="toolbar-left">
                      <span className="file-name">playground.pseudo</span>
                    </div>
                    <div className="toolbar-right">
                      <button className="toolbar-btn" onClick={resetCode}>
                        <RotateCcw size={16} />
                        <span>Reset</span>
                      </button>
                      <button 
                        className="toolbar-btn primary" 
                        onClick={runCode}
                        disabled={isRunning}
                      >
                        <Play size={16} />
                        <span>{isRunning ? 'Running...' : 'Run Code'}</span>
                      </button>
                    </div>
                  </div>
                  
                  <textarea
                    className="code-textarea"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="Write your pseudocode here..."
                    spellCheck={false}
                  />
                </div>
              ) : (
                <div className="output-panel">
                  <div className="output-header">
                    <h3>Output</h3>
                    {output && (
                      <div className="output-status">
                        <CheckCircle size={16} />
                        <span>Executed</span>
                      </div>
                    )}
                  </div>
                  <div className="output-content">
                    {output ? (
                      <pre>{output}</pre>
                    ) : (
                      <div className="output-placeholder">
                        <Zap size={24} />
                        <p>Run your code to see the output here</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Challenges Section */}
          <div className="challenges-section">
            <div className="section-header">
              <h3>Practice Challenges</h3>
              <p>Test your skills with these exercises</p>
            </div>
            
            <div className="challenges-list">
              {playgroundContent.challenges.map((challenge, index) => (
                <div key={index} className="challenge-card">
                  <div className="challenge-header">
                    <div className="challenge-number">{index + 1}</div>
                    <h4>{challenge.title}</h4>
                  </div>
                  <p>{challenge.description}</p>
                  <div className="challenge-hint">
                    <span className="hint-label">💡 Hint:</span>
                    <span className="hint-text">{challenge.hint}</span>
                  </div>
                  <button className="challenge-btn">
                    <span>Try This Challenge</span>
                    <ChevronRight size={16} />
                  </button>
                </div>
              ))}
            </div>
            
            {/* Quick Actions */}
            <div className="quick-actions">
              <h4>Continue Learning</h4>
              <div className="action-buttons">
                <Link 
                  to={`/grade/${gradeLevel}/topic/${topicId}/subtopic/${subtopicId}/notes`}
                  className="action-btn notes"
                >
                  <BookOpen size={16} />
                  <span>Review Notes</span>
                </Link>
                
                <Link 
                  to={`/grade/${gradeLevel}/topic/${topicId}/subtopic/${subtopicId}/assessment`}
                  className="action-btn assessment"
                >
                  <TestTube size={16} />
                  <span>Take Test</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tips Section */}
      <div className="tips-section">
        <div className="tips-container">
          <h3>💡 Playground Tips</h3>
          <div className="tips-grid">
            <div className="tip-card">
              <div className="tip-icon">🚀</div>
              <h4>Experiment Freely</h4>
              <p>Don't be afraid to try different approaches and make mistakes - that's how you learn!</p>
            </div>
            <div className="tip-card">
              <div className="tip-icon">🔍</div>
              <h4>Test Your Logic</h4>
              <p>Run your code frequently to see if it works as expected and debug any issues.</p>
            </div>
            <div className="tip-card">
              <div className="tip-icon">📝</div>
              <h4>Comment Your Code</h4>
              <p>Add comments to explain your thinking - it helps you and others understand your logic.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Playground;