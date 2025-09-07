import React, { useState, useEffect } from 'react';
import InteractiveLessonViewer from '../components/InteractiveLessonViewer';
import MultiLanguageIDE from '../components/MultiLanguageIDE';
import MiniGame from '../components/MiniGames';
import { InteractiveStory, InteractiveList, InteractiveQuiz, HandsOnPractice, ArduinoSimulator, InteractiveCodeExample, InteractiveCodeChallenge } from '../components/InteractiveLessonComponents';
import { getLessonContent, getAllLessonMetadata } from '../data/lessonLoader';
import '../styles/InteractiveLessonViewer.css';

const InteractiveLessonDemo = () => {
  const [activeTest, setActiveTest] = useState('lesson-viewer');
  const [testResults, setTestResults] = useState({});
  const [debugMode, setDebugMode] = useState(false);
  const [testLog, setTestLog] = useState([]);
  const [availableLessons, setAvailableLessons] = useState([]);
  const [loadedLessons, setLoadedLessons] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // Load actual lesson data
  useEffect(() => {
    const loadLessonData = async () => {
      try {
        setIsLoading(true);
        const metadata = await getAllLessonMetadata();
        setAvailableLessons(metadata);
        
        // Load content for first few lessons as examples
        const lessonContent = {};
        for (const lesson of metadata.slice(0, 10)) {
          try {
            const content = await getLessonContent(lesson.gradeLevel, lesson.topicId, lesson.subtopicId);
            lessonContent[lesson.subtopicId] = content;
          } catch (error) {
            console.warn(`Failed to load lesson ${lesson.subtopicId}:`, error);
          }
        }
        setLoadedLessons(lessonContent);
      } catch (error) {
        console.error('Failed to load lesson metadata:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadLessonData();
  }, []);

  // Logging function for test tracking
  const logTest = (component, action, data = {}) => {
    const logEntry = {
      timestamp: new Date().toISOString(),
      component,
      action,
      data
    };
    setTestLog(prev => [...prev, logEntry]);
    if (debugMode) {
      console.log('Test Log:', logEntry);
    }
  };

  // Generate test content from actual lesson data
  const generateTestContent = () => {
    if (isLoading || Object.keys(loadedLessons).length === 0) {
      return {
        core: {
          title: 'Loading Lesson Data...',
          description: 'Please wait while lesson content is being loaded',
          sections: []
        }
      };
    }

    const lessonEntries = Object.entries(loadedLessons);
    return {
      core: {
        title: 'Core Interactive Components',
        description: `Testing with ${lessonEntries.length} actual lesson(s)`,
        sections: lessonEntries.slice(0, 3).map(([subtopicId, lesson], index) => ({
          id: `lesson-${subtopicId}`,
          title: lesson.title || `Lesson ${index + 1}`,
          type: 'lesson',
          content: lesson.description || 'Real lesson content loaded',
          lessonData: lesson
        }))
      },
      interactive: {
        title: 'Interactive Learning Components',
        description: 'Testing interactive elements with real data',
        sections: lessonEntries.slice(3, 6).map(([subtopicId, lesson], index) => ({
          id: `interactive-${subtopicId}`,
          title: lesson.title || `Interactive ${index + 1}`,
          type: 'interactive',
          content: lesson.description || 'Interactive lesson content',
          lessonData: lesson
        }))
      },
      reliability: {
        title: 'Reliability & Edge Cases',
        description: 'Testing component behavior with real lesson data',
        sections: lessonEntries.slice(6, 8).map(([subtopicId, lesson], index) => ({
          id: `reliability-${subtopicId}`,
          title: `${lesson.title} - Error Testing` || `Reliability ${index + 1}`,
          type: 'error',
          content: 'Testing error states with real content',
          lessonData: lesson
        }))
      },
      coding: {
        title: 'Coding Challenges',
        description: 'Testing programming exercises with actual lessons',
        sections: lessonEntries.filter(([_, lesson]) => 
          lesson.content && lesson.content.some(section => 
            section.codeExample || section.code || section.script
          )
        ).slice(0, 2).map(([subtopicId, lesson], index) => ({
          id: `coding-${subtopicId}`,
          title: lesson.title || `Coding ${index + 1}`,
          type: 'code-challenge',
          content: 'Real coding exercises from lessons',
          lessonData: lesson
        }))
      },
      tools: {
        title: 'Development Tools',
        description: 'Testing IDE with real lesson code',
        sections: [{
          id: 'ide-real-test',
          title: 'Multi-Language IDE with Real Code',
          type: 'ide',
          content: 'Testing IDE with actual lesson examples',
          lessonData: lessonEntries[0]?.[1]
        }]
      },
      games: {
        title: 'Educational Games',
        description: 'Testing gamification with lesson topics',
        sections: [{
          id: 'mini-game-real',
          title: 'Topic-Based Mini Games',
          type: 'game',
          content: 'Testing games with real lesson topics',
          lessonData: lessonEntries[0]?.[1]
        }]
      }
    };
  };

  // Get current test content
  const testContent = generateTestContent();

  // Test data sets for different scenarios
  const testDataSets = {
    basicLesson: [
      {
        id: 1,
        title: "Basic Section Test",
        subtitle: "Testing basic functionality",
        content: "This is a test section with basic content to verify rendering.",
        keyPoints: ["Point 1", "Point 2", "Point 3"]
      }
    ],
    
    complexLesson: [
      {
        id: 1,
        title: "Multi-Code Section",
        subtitle: "Testing multiple code blocks",
        content: "This section tests multiple code examples in different languages.",
        codeExample: `console.log("JavaScript example");`,
        codeLanguage: "javascript",
        codeTitle: "JavaScript Code",
        code: `print("Python example")`,
        language: "python",
        script: `echo "Bash example"`,
        scriptLanguage: "bash",
        scriptTitle: "Shell Script",
        keyPoints: ["Multi-language support", "Code highlighting", "Copy functionality"]
      },
      {
        id: 2,
        title: "Interactive Elements",
        subtitle: "Testing interactive components",
        content: "This section includes various interactive elements for comprehensive testing.",
        keyPoints: ["Interactive content", "User engagement", "Progress tracking"]
      }
    ],
    
    edgeCases: [
      {
        id: 1,
        title: "Empty Content Test",
        subtitle: "",
        content: "",
        keyPoints: []
      },
      {
        id: 2,
        title: "Very Long Title That Should Handle Text Wrapping Gracefully in the Interface",
        subtitle: "Very long subtitle that tests how the interface handles extended text content and ensures proper wrapping and display",
        content: "This is a very long content section designed to test how the interface handles extensive text content. It includes multiple sentences and should demonstrate proper text wrapping, spacing, and readability across different screen sizes and device types. The content continues to provide comprehensive testing of text rendering capabilities.",
        codeExample: `// Very long code example
function veryLongFunctionNameThatTestsHorizontalScrolling() {
  const veryLongVariableName = "This is a very long string that tests horizontal scrolling in code blocks";
  console.log(veryLongVariableName);
  return veryLongVariableName.split(' ').map(word => word.toUpperCase()).join('_');
}`,
        codeLanguage: "javascript",
        keyPoints: [
          "Very long key point that tests how the interface handles extended bullet point content and ensures proper wrapping",
          "Another long point for comprehensive testing",
          "Short point",
          "Final long point to complete the testing scenario"
        ]
      }
    ]
  };

  // Interactive component test configurations
  const interactiveTests = {
    story: {
      title: "Interactive Story Test",
      story: "Once upon a time, there was a developer who needed to test interactive components...",
      choices: [
        { text: "Continue testing", action: () => logTest('story', 'choice_selected', { choice: 'continue' }) },
        { text: "Explore more features", action: () => logTest('story', 'choice_selected', { choice: 'explore' }) }
      ]
    },
    
    quiz: {
      title: "Interactive Quiz Test",
      questions: [
        {
          question: "What is the primary purpose of this testing interface?",
          options: ["Entertainment", "Testing components", "Learning", "All of the above"],
          correct: 1,
          explanation: "This interface is designed specifically for testing interactive components."
        },
        {
          question: "Which components can be tested here?",
          options: ["Only lesson viewers", "Multiple interactive components", "Just code editors", "None"],
          correct: 1,
          explanation: "This testing environment supports multiple types of interactive components."
        }
      ],
      onComplete: (results) => {
        logTest('quiz', 'completed', { score: results.score, total: results.total });
      }
    },
    
    codeChallenge: {
      title: "Code Challenge Test",
      description: "Write a function that returns 'Hello, Testing!'",
      requirements: [
        "Function should be named 'testFunction'",
        "Should return the exact string 'Hello, Testing!'",
        "Include proper syntax for your chosen language"
      ],
      starterCode: "// Write your test function here\nfunction testFunction() {\n  // Your code here\n}",
      onComplete: (result) => {
        logTest('codeChallenge', 'completed', { result });
      }
    },
    
    handsOnPractice: {
      title: "Hands-On Practice Test",
      description: "Practice coding with multiple language support",
      language: 'javascript',
      initialCode: '// Test the multi-language IDE\nconsole.log("Testing in progress...");',
      instructions: [
        "Modify the code to test different languages",
        "Try switching between JavaScript and Python",
        "Test the code execution functionality"
      ],
      hints: [
        "Use the language selector to switch between languages",
        "Try console.log() for JavaScript or print() for Python"
      ],
      onComplete: (result) => {
        logTest('handsOnPractice', 'completed', { result });
      }
    }
  };

  // Test control functions
  const runAllTests = () => {
    logTest('system', 'run_all_tests_started', {});
    const results = {};
    
    Object.keys(testDataSets).forEach(testKey => {
      try {
        results[testKey] = `Test completed at ${new Date().toLocaleTimeString()}`;
        logTest('system', 'test_completed', { test: testKey, status: 'success' });
      } catch (error) {
        results[testKey] = `Error: ${error.message}`;
        logTest('system', 'test_completed', { test: testKey, status: 'error', error: error.message });
      }
    });
    
    setTestResults(results);
    logTest('system', 'run_all_tests_completed', { totalTests: Object.keys(results).length });
  };

  const clearTestResults = () => {
    setTestResults({});
    setTestLog([]);
    logTest('system', 'test_results_cleared', {});
  };

  const exportTestResults = () => {
    const exportData = {
      timestamp: new Date().toISOString(),
      results: testResults,
      log: testLog,
      activeTest,
      debugMode
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `test-results-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    logTest('system', 'test_results_exported', { filename: a.download });
  };

  const handleSectionComplete = (index, section) => {
    logTest('lessonViewer', 'section_completed', {
      sectionIndex: index,
      sectionTitle: section.title,
      timestamp: new Date().toISOString()
    });
  };

  // Render test component based on type
  const renderTestComponent = (section, testData) => {
    const commonProps = {
      onComplete: (result) => {
        logTest(section.type, 'completed', result);
      },
      onError: (error) => {
        logTest(section.type, 'error', { error: error.message });
      }
    };

    // If we have real lesson data, render it using InteractiveLessonViewer
    if (section.lessonData && section.lessonData.content) {
      return (
        <div className="htb-real-lesson-test">
          <div className="htb-lesson-header">
            <h4>{section.title}</h4>
            <span className="htb-lesson-badge">Real Lesson Data</span>
          </div>
          <InteractiveLessonViewer
            sections={section.lessonData.content}
            onSectionComplete={(sectionIndex) => {
              logTest('lesson', 'section_completed', { sectionIndex });
            }}
            allowMultipleExpanded={true}
          />
        </div>
      );
    }

    // Fallback to component-specific rendering for testing
    switch (section.type) {
      case 'story':
        return (
          <InteractiveStory
            {...commonProps}
            story={testData.story}
            title={section.title}
          />
        );
      
      case 'quiz':
        return (
          <InteractiveQuiz
            {...commonProps}
            questions={testData.quiz.questions}
            title={section.title}
          />
        );
      
      case 'code':
      case 'code-challenge':
        return (
          <InteractiveCodeChallenge
            {...commonProps}
            challenge={testData.codeChallenge}
            title={section.title}
          />
        );
      
      case 'practice':
        return (
          <HandsOnPractice
            {...commonProps}
            {...testData.handsOnPractice}
            title={section.title}
          />
        );
      
      case 'arduino':
        return (
          <ArduinoSimulator
            {...commonProps}
            title={section.title}
            components={['LED', 'Button', 'Resistor']}
          />
        );
      
      case 'code-example':
        return (
          <InteractiveCodeExample
            {...commonProps}
            code={testData.codeExample || 'console.log("Hello World!");'}
            language="javascript"
            title={section.title}
          />
        );
      
      case 'ide':
        return (
          <MultiLanguageIDE
            {...commonProps}
            initialCode={testData.ideCode || 'console.log("Testing IDE");'}
            title={section.title}
          />
        );
      
      case 'game':
        return (
          <MiniGame
            {...commonProps}
            topicId="demo"
            title={section.title}
          />
        );
      
      default:
        return (
          <div className="htb-test-placeholder">
            <h4>{section.title}</h4>
            <p>{section.content}</p>
            <div className="htb-test-info">
              <strong>Type:</strong> {section.type}<br/>
              <strong>Status:</strong> {isLoading ? 'Loading real data...' : 'Ready for testing'}
            </div>
          </div>
        );
    }
  };

  const renderTestInterface = () => {
    const currentTestContent = testContent[activeTest];
    
    if (!currentTestContent) {
      return (
        <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-secondary)' }}>
          <h3>Select a test category to begin testing</h3>
          <p>Choose from the available test categories above to start testing different components.</p>
        </div>
      );
    }

    return (
      <div className="htb-test-category">
        <div className="htb-category-header">
          <h2>{currentTestContent.title}</h2>
          <p>{currentTestContent.description}</p>
        </div>
        
        <div className="htb-test-sections">
          {currentTestContent.sections.map((section, index) => (
            <div key={section.id} className="htb-test-section">
              {renderTestComponent(section, interactiveTests)}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
      {/* Test Control Panel */}
      <div className="test-control-panel" style={{
        background: 'var(--bg-secondary)',
        padding: '20px',
        borderBottom: '2px solid var(--border-primary)',
        marginBottom: '20px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '15px' }}>
          <div>
            <h1 style={{ margin: '0 0 10px 0', color: 'var(--text-primary)' }}>🧪 Interactive Component Testing Environment</h1>
            <p style={{ margin: 0, color: 'var(--text-secondary)' }}>Comprehensive testing interface for all interactive educational components</p>
          </div>
          
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--text-primary)' }}>
              <input 
                type="checkbox" 
                checked={debugMode} 
                onChange={(e) => setDebugMode(e.target.checked)}
              />
              Debug Mode
            </label>
            <button 
              onClick={runAllTests}
              style={{
                padding: '8px 16px',
                background: 'var(--primary-blue)',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              🚀 Run All Tests
            </button>
            <button 
              onClick={clearTestResults}
              style={{
                padding: '8px 16px',
                background: 'var(--accent-orange)',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              🗑️ Clear Results
            </button>
            <button 
              onClick={exportTestResults}
              style={{
                padding: '8px 16px',
                background: 'var(--primary-green)',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              📊 Export Results
            </button>
          </div>
        </div>
        
        {/* Test Selection Buttons */}
        <div style={{ marginTop: '20px' }}>
          <h3 style={{ margin: '0 0 15px 0', color: 'var(--text-primary)' }}>Test Categories:</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {[
              { key: 'core', label: '📚 Core Components', category: 'Core' },
              { key: 'interactive', label: '🔧 Interactive Elements', category: 'Interactive' },
              { key: 'reliability', label: '⚠️ Reliability Testing', category: 'Reliability' },
              { key: 'coding', label: '💻 Coding Challenges', category: 'Coding' },
              { key: 'tools', label: '🌐 Development Tools', category: 'Tools' },
              { key: 'games', label: '🎮 Educational Games', category: 'Games' }
            ].map(test => (
              <button
                key={test.key}
                onClick={() => {
                  setActiveTest(test.key);
                  logTest('system', 'test_selected', { test: test.key });
                }}
                style={{
                  padding: '10px 15px',
                  background: activeTest === test.key ? 'var(--primary-cyan)' : 'var(--bg-tertiary)',
                  color: activeTest === test.key ? 'var(--bg-primary)' : 'var(--text-primary)',
                  border: `2px solid ${activeTest === test.key ? 'var(--primary-cyan)' : 'var(--border-secondary)'}`,
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: activeTest === test.key ? 'bold' : 'normal',
                  transition: 'all 0.3s ease'
                }}
              >
                {test.label}
                <div style={{ fontSize: '10px', opacity: 0.7, marginTop: '2px' }}>{test.category}</div>
              </button>
            ))}
          </div>
        </div>
        
        {/* Test Status Display */}
        {Object.keys(testResults).length > 0 && (
          <div style={{ marginTop: '20px', padding: '15px', background: 'var(--bg-tertiary)', borderRadius: '8px' }}>
            <h4 style={{ margin: '0 0 10px 0', color: 'var(--text-primary)' }}>📊 Test Results Summary:</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
              {Object.entries(testResults).map(([key, result]) => (
                <div key={key} style={{
                  padding: '8px 12px',
                  background: 'var(--primary-green)',
                  color: 'white',
                  borderRadius: '6px',
                  fontSize: '12px'
                }}>
                  ✅ {key}: {typeof result === 'object' ? JSON.stringify(result).length : result} chars
                </div>
              ))}
            </div>
            <div style={{ marginTop: '10px', fontSize: '12px', color: 'var(--text-secondary)' }}>
              Total test log entries: {testLog.length}
            </div>
          </div>
        )}
      </div>
      
      {/* Main Test Interface */}
      <div style={{ padding: '0 20px 20px' }}>
        <style>{`
          .htb-test-category {
            max-width: 1200px;
            margin: 0 auto;
          }
          
          .htb-category-header {
            text-align: center;
            margin-bottom: 30px;
            padding: 20px;
            background: var(--bg-secondary);
            border-radius: 12px;
            border: 2px solid var(--border-primary);
          }
          
          .htb-category-header h2 {
            color: var(--text-primary);
            margin: 0 0 10px 0;
          }
          
          .htb-category-header p {
            color: var(--text-secondary);
            margin: 0;
          }
          
          .htb-test-sections {
            display: grid;
            gap: 20px;
          }
          
          .htb-test-section {
            background: var(--bg-secondary);
            border: 2px solid var(--border-primary);
            border-radius: 12px;
            padding: 20px;
          }
          
          .htb-real-lesson-test .htb-lesson-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 15px;
            padding-bottom: 10px;
            border-bottom: 1px solid var(--border-secondary);
          }
          
          .htb-lesson-badge {
            background: var(--primary-green);
            color: white;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 12px;
            font-weight: bold;
          }
          
          .htb-test-placeholder {
            text-align: center;
            padding: 40px;
            color: var(--text-secondary);
          }
          
          .htb-test-info {
            margin-top: 15px;
            padding: 10px;
            background: var(--bg-tertiary);
            border-radius: 6px;
            font-size: 14px;
            text-align: left;
          }
        `}</style>
        {renderTestInterface()}
      </div>
      
      {/* Debug Panel */}
      {debugMode && (
        <div style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          width: '300px',
          maxHeight: '400px',
          background: 'var(--bg-secondary)',
          border: '2px solid var(--border-primary)',
          borderRadius: '8px',
          padding: '15px',
          overflow: 'auto',
          zIndex: 1000
        }}>
          <h4 style={{ margin: '0 0 10px 0', color: 'var(--text-primary)' }}>🐛 Debug Log</h4>
          <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
            {testLog.slice(-10).map((log, index) => (
              <div key={index} style={{ marginBottom: '5px', padding: '5px', background: 'var(--bg-tertiary)', borderRadius: '4px' }}>
                <strong>{log.component}</strong>: {log.action}
                {Object.keys(log.data).length > 0 && (
                  <div style={{ fontSize: '10px', opacity: 0.7 }}>
                    {JSON.stringify(log.data, null, 1)}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default InteractiveLessonDemo;