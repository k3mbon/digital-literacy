import React, { useState, useEffect } from 'react';
import CodeEditor from '../components/CodeEditor';
import InteractiveLessonComponents from '../components/InteractiveLessonComponents';
import { getLessonContent } from '../data/lessonLoader';
import { grades, topics } from '../data/topics';
import '../styles/Lesson.css';

const Lesson = ({ onNavigate, gradeLevel, topicId, subtopicId }) => {
  const [language, setLanguage] = useState('python');
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [currentSection, setCurrentSection] = useState(0);

  // Get lesson content dynamically with grade-level differentiation
  const grade = parseInt(gradeLevel) || 8;
  const lessonData = getLessonContent(subtopicId, grade);
  const topic = topics[topicId];
  const subtopic = topic?.subtopics[subtopicId];
  
  // Fallback content if lesson not found
  const fallbackLesson = {
    title: subtopic?.title || 'Lesson Content',
    sections: [
      {
        title: 'Coming Soon',
        content: [
          {
            type: 'text',
            content: 'This lesson content is currently being developed. Please check back soon for comprehensive learning materials.'
          }
        ]
      }
    ]
  };
  
  // Transform lesson data to expected format
  const transformLessonData = (data) => {
    if (!data) return fallbackLesson;
    
    // If lesson has content as string, keep it as string for HTML rendering
    if (data.content && typeof data.content === 'string') {
      return {
        ...data,
        title: data.title || subtopic?.title || 'Lesson Content',
        difficulty: data.difficulty || 'beginner',
        estimatedTime: data.estimatedTime || '30 minutes',
        // Keep content as string for HTML rendering
        content: data.content
      };
    }
    
    // If lesson already has sections, use as is
    if (data.sections && Array.isArray(data.sections)) {
      return {
        ...data,
        title: data.title || subtopic?.title || 'Lesson Content',
        difficulty: data.difficulty || 'beginner',
        estimatedTime: data.estimatedTime || '30 minutes'
      };
    }
    
    // Fallback
    return fallbackLesson;
  };

  const lessons = {
    [subtopicId]: transformLessonData(lessonData)
  };

  // Get starter code for different topics and languages
  const getStarterCode = (topicId, lessonId, language) => {
    if (!topicId || !lessonId || !language) {
      return language === 'python' ? 
        `# Welcome to the coding environment\nprint("Hello, World!")` :
        `// Welcome to the coding environment\nconsole.log("Hello, World!");`;
    }

    const codeExamples = {
      '1': { // Hardware
        '1': language === 'python' ?
          `# CPU simulation\nclass CPU:\n    def __init__(self, cores=4, base_clock=3.2):\n        self.cores = cores\n        self.base_clock = base_clock  # GHz\n        self.current_load = 0\n        self.processes = []\n    \n    def add_process(self, process_name, cpu_usage):\n        if len(self.processes) < self.cores:\n            self.processes.append({"name": process_name, "usage": cpu_usage})\n            self.current_load += cpu_usage\n            print("Process " + process_name + " added. CPU usage: " + str(cpu_usage) + "%")\n        else:\n            print("All CPU cores are busy!")\n    \n    def remove_process(self, process_name):\n        for i, process in enumerate(self.processes):\n            if process["name"] == process_name:\n                self.current_load -= process["usage"]\n                self.processes.pop(i)\n                print("Process " + process_name + " removed.")\n                return\n        print("Process " + process_name + " not found.")\n    \n    def get_status(self):\n        print("CPU Status: " + str(self.cores) + " cores at " + str(self.base_clock) + "GHz")\n        print("Current load: " + str(self.current_load) + "%")\n        print("Running processes: " + str(len(self.processes)))\n        for process in self.processes:\n            print("  - " + process["name"] + ": " + str(process["usage"]) + "%")\n\n# Test the CPU simulation\ncpu = CPU()\ncpu.add_process("Web Browser", 15)\ncpu.add_process("Text Editor", 5)\ncpu.add_process("Video Player", 25)\ncpu.get_status()` :
          `// CPU simulation\nclass CPU {\n    constructor(cores = 4, baseClock = 3.2) {\n        this.cores = cores;\n        this.baseClock = baseClock; // GHz\n        this.currentLoad = 0;\n        this.processes = [];\n    }\n    \n    addProcess(processName, cpuUsage) {\n        if (this.processes.length < this.cores) {\n            this.processes.push({name: processName, usage: cpuUsage});\n            this.currentLoad += cpuUsage;\n            console.log('Process ' + processName + ' added. CPU usage: ' + cpuUsage + '%');\n        } else {\n            console.log("All CPU cores are busy!");\n        }\n    }\n    \n    removeProcess(processName) {\n        const index = this.processes.findIndex(p => p.name === processName);\n        if (index !== -1) {\n            this.currentLoad -= this.processes[index].usage;\n            this.processes.splice(index, 1);\n            console.log('Process ' + processName + ' removed.');\n        } else {\n            console.log('Process ' + processName + ' not found.');\n        }\n    }\n    \n    getStatus() {\n        console.log('CPU Status: ' + this.cores + ' cores at ' + this.baseClock + 'GHz');\n        console.log('Current load: ' + this.currentLoad + '%');\n        console.log('Running processes: ' + this.processes.length);\n        this.processes.forEach(process => {\n            console.log('  - ' + process.name + ': ' + process.usage + '%');\n        });\n    }\n}\n\n// Test the CPU simulation\nlet cpu = new CPU();\ncpu.addProcess("Web Browser", 15);\ncpu.addProcess("Text Editor", 5);\ncpu.addProcess("Video Player", 25);\ncpu.getStatus();`
      }
    };

    const topicExamples = codeExamples[topicId];
    if (topicExamples && topicExamples[lessonId]) {
      return topicExamples[lessonId];
    }

    // Fallback based on language
    return language === 'python' ? 
      `# ${topicId || 'Lesson'} - Python Code\nprint("Hello, World!")` :
      `// ${topicId || 'Lesson'} - JavaScript Code\nconsole.log("Hello, World!");`;
  };

  const currentLesson = lessons[subtopicId];
  const currentLessonSection = currentLesson?.sections?.[currentSection];
  
  // Additional safety checks
  const hasValidSections = currentLesson?.sections && Array.isArray(currentLesson.sections) && currentLesson.sections.length > 0;
  const validCurrentSection = hasValidSections ? Math.min(currentSection, currentLesson.sections.length - 1) : 0;
  
  // Ensure currentSection is within bounds
  useEffect(() => {
    if (hasValidSections && currentSection >= currentLesson.sections.length) {
      setCurrentSection(0);
    }
  }, [currentLesson, currentSection, hasValidSections]);

  useEffect(() => {
    if (topicId && subtopicId) {
      const starterCode = getStarterCode(topicId, subtopicId, language);
      setCode(starterCode);
    }
  }, [topicId, subtopicId, language]);

  const runCode = () => {
    if (!code || code.trim() === '') {
      setOutput('Error: No code to execute');
      return;
    }

    try {
      if (language === 'python') {
        // For Python, we'll simulate execution
        setOutput('Python code execution simulated. In a real environment, this would run your Python code.');
      } else {
        // For JavaScript, we can actually execute it
        const originalLog = console.log;
        let output = '';
        console.log = (...args) => {
          output += args.join(' ') + '\n';
        };
        
        // Execute the code
        eval(code);
        
        // Restore console.log
        console.log = originalLog;
        
        setOutput(output || 'Code executed successfully (no output)');
      }
    } catch (error) {
      setOutput(`Error: ${error.message}`);
    }
  };

  const nextSection = () => {
    if (currentLesson?.sections && Array.isArray(currentLesson.sections) && currentSection < currentLesson.sections.length - 1) {
      setCurrentSection(currentSection + 1);
    }
  };

  const prevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };
  
  // Safe getter for current section data
  const getCurrentSectionData = () => {
    if (!currentLesson?.sections || !Array.isArray(currentLesson.sections)) {
      return null;
    }
    const safeIndex = Math.max(0, Math.min(currentSection, currentLesson.sections.length - 1));
    return currentLesson.sections[safeIndex];
  };

  const renderContent = (content) => {
    if (!content) {
      return <div className="no-content">No content available</div>;
    }
    
    // If content is a string (HTML), render it directly
    if (typeof content === 'string') {
      return (
        <div 
          className="lesson-html-content" 
          dangerouslySetInnerHTML={{ __html: content }}
        />
      );
    }
    
    // If content is an array, process each item
    if (Array.isArray(content)) {
      return content.map((item, index) => {
        if (!item || typeof item !== 'object') {
          return null;
        }
        switch (item.type) {
          case 'text':
            return <p key={index} className="lesson-text">{item.content || ''}</p>;
          case 'list':
            return (
              <div key={index} className="lesson-list">
                {item.title && <h4>{item.title}</h4>}
                <ul>
                  {item.items && Array.isArray(item.items) && item.items.map((listItem, listIndex) => (
                    <li key={listIndex} dangerouslySetInnerHTML={{ __html: listItem || '' }} />
                  ))}
                </ul>
              </div>
            );
          case 'comparison':
            return (
              <div key={index} className="lesson-comparison">
                {item.title && <h4>{item.title}</h4>}
                <div className="comparison-table">
                  {item.items && Array.isArray(item.items) && item.items.map((compItem, compIndex) => (
                    <div key={compIndex} className="comparison-row">
                      <div className="comparison-category">{compItem?.category || ''}</div>
                      <div className="comparison-values">
                        {compItem && Object.entries(compItem).filter(([key]) => key !== 'category').map(([key, value]) => (
                          <div key={key} className="comparison-item">
                            <strong>{key.toUpperCase()}:</strong> {value || ''}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          case 'categories':
            return (
              <div key={index} className="lesson-categories">
                {item.title && <h4>{item.title}</h4>}
                <div className="categories-grid">
                  {item.categories && Array.isArray(item.categories) && item.categories.map((category, catIndex) => (
                    <div key={catIndex} className="category-card">
                      <h5>{category?.name || 'Category'}</h5>
                      <ul>
                        {category?.items && Array.isArray(category.items) && category.items.map((catItem, catItemIndex) => (
                          <li key={catItemIndex}>{catItem || ''}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            );
          case 'interactive':
            const InteractiveComponent = item.component && InteractiveLessonComponents[item.component];
            return InteractiveComponent ? <InteractiveComponent key={index} /> : null;
          default:
            return null;
        }
      });
    }
    
    return <div className="no-content">Invalid content format</div>;
  };

  // Check if lesson needs hands-on coding (has interactive elements or code examples)
  const needsHandsOn = currentLesson && (
    (currentLesson.interactiveElements && Array.isArray(currentLesson.interactiveElements) && currentLesson.interactiveElements.length > 0) ||
    (currentLesson.content && typeof currentLesson.content === 'string' && 
     (currentLesson.content.includes('<pre><code>') || currentLesson.content.includes('pseudocode'))) ||
    (topicId && subtopicId) // Always show hands-on for lessons with topic and subtopic IDs
  );

  if (!currentLesson) {
    return (
      <div className="htb-lesson-container">
        <div className="htb-header">
          <div className="htb-header-content">
            <button onClick={() => onNavigate('topic', { gradeLevel, topicId })} className="htb-back-btn">
              ← Back
            </button>
            <div className="htb-lesson-info">
              <h1>Lesson Not Found</h1>
            </div>
          </div>
        </div>
        <div className="htb-main-layout">
          <div className="htb-content-area">
            <div className="htb-theory-section">
              <div className="htb-theory-content">
                <p>The requested lesson could not be found.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="htb-lesson-container">
      {/* Header */}
      <div className="htb-header">
        <div className="htb-header-content">
          <button onClick={() => onNavigate('topic', { gradeLevel, topicId })} className="htb-back-btn">
            ← Back to {topic?.title}
          </button>
          <div className="htb-lesson-info">
            <h1 className="htb-lesson-title">{currentLesson?.title || subtopic?.title || 'Loading...'}</h1>
            <div className="htb-lesson-meta">
              <span className={`htb-difficulty ${(currentLesson?.difficulty || 'beginner').toLowerCase()}`}>
                {(currentLesson?.difficulty || 'Beginner').charAt(0).toUpperCase() + (currentLesson?.difficulty || 'beginner').slice(1)}
              </span>
              <span className="htb-estimated-time">
                <i className="fas fa-clock"></i>
                {currentLesson?.estimatedTime || '30 minutes'}
              </span>
            </div>
            {hasValidSections && currentLesson?.sections && (
              <div className="htb-progress">
                <span className="htb-progress-text">
                  Section {Math.min(currentSection + 1, currentLesson.sections.length)} of {currentLesson.sections.length}
                </span>
                <div className="htb-progress-bar">
                  <div 
                    className="htb-progress-fill" 
                    style={{ width: `${((Math.min(currentSection + 1, currentLesson.sections.length)) / currentLesson.sections.length) * 100}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Layout */}
      <div className="htb-main-layout">
        {/* Sidebar - only show if there are multiple sections */}
        {hasValidSections && currentLesson.sections.length > 1 && (
          <div className="htb-sidebar">
            <div className="htb-sidebar-header">
              <h3>Sections</h3>
            </div>
            <div className="htb-section-list">
              {currentLesson.sections.map((section, index) => (
                <div
                  key={index}
                  className={`htb-section-item ${
                    index === currentSection ? 'active' : ''
                  } ${index < currentSection ? 'completed' : ''}`}
                  onClick={() => setCurrentSection(index)}
                >
                  <div className="htb-section-number">{index + 1}</div>
                  <div className="htb-section-title">{section.title}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Content Area */}
        <div className="htb-content-area" style={{
          gridColumn: (!hasValidSections || currentLesson.sections.length <= 1) ? '1 / -1' : 'auto'
        }}>
          {/* Theory Section */}
          <div className="htb-theory-section">
            <div className="htb-theory-header">
              <h2>{currentLessonSection?.title || currentLesson?.title || 'Content'}</h2>
              <div className="htb-theory-tabs">
                <button className="htb-tab active">Theory</button>
                {needsHandsOn && <button className="htb-tab">Practice</button>}
              </div>
            </div>
            <div className="htb-theory-content">
              {/* Render lesson content */}
              {currentLesson?.content ? (
                renderContent(currentLesson.content)
              ) : (() => {
                const sectionData = getCurrentSectionData();
                return hasValidSections && sectionData ? (
                  <div className="htb-section">
                    <h2>{sectionData.title || `Section ${Math.min(currentSection + 1, currentLesson?.sections?.length || 1)}`}</h2>
                    {sectionData.content && renderContent(sectionData.content)}
                  </div>
                ) : (
                  <div className="no-content">
                    <p>No lesson content available for this topic.</p>
                    {subtopic && (
                      <p>Topic: {subtopic.title}</p>
                    )}
                  </div>
                );
              })()}
              
              {/* Navigation */}
              {hasValidSections && currentLesson?.sections && (
                <div className="htb-navigation">
                  <button 
                    className="htb-nav-btn htb-nav-prev" 
                    onClick={prevSection}
                    disabled={currentSection === 0}
                  >
                    <i className="fas fa-chevron-left"></i>
                    Previous
                  </button>
                  <span className="htb-section-indicator">
                    {Math.min(currentSection + 1, currentLesson.sections.length)} / {currentLesson.sections.length}
                  </span>
                  <button 
                    className="htb-nav-btn htb-nav-next" 
                    onClick={nextSection}
                    disabled={currentSection >= currentLesson.sections.length - 1}
                  >
                    Next
                    <i className="fas fa-chevron-right"></i>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Hands-on Section - only show if needed */}
          {needsHandsOn && (
            <div className="htb-hands-on-section">
              <div className="htb-hands-on-header">
                <h3>🧪 Hands-on Practice</h3>
                <div className="htb-language-selector">
                  <button 
                    onClick={() => {
                      setLanguage('python');
                      setCode(getStarterCode(topicId, subtopicId, 'python'));
                    }} 
                    className={`htb-lang-btn ${language === 'python' ? 'active' : ''}`}
                  >
                    Python
                  </button>
                  <button 
                    onClick={() => {
                      setLanguage('javascript');
                      setCode(getStarterCode(topicId, subtopicId, 'javascript'));
                    }} 
                    className={`htb-lang-btn ${language === 'javascript' ? 'active' : ''}`}
                  >
                    JavaScript
                  </button>
                </div>
              </div>
              
              <div className="htb-ide-container">
                <div className="htb-code-editor">
                  <div className="htb-editor-header">
                    <span className="htb-file-name">main.{language === 'python' ? 'py' : 'js'}</span>
                  </div>
                  <CodeEditor
                    code={code || ''}
                    setCode={setCode}
                    language={language || 'javascript'}
                  />
                </div>
                
                <div className="htb-terminal">
                  <div className="htb-terminal-header">
                    <span className="htb-terminal-title">Terminal</span>
                    <button 
                      onClick={runCode} 
                      className="htb-run-btn"
                      disabled={!code || code.trim() === ''}
                    >
                      ▶ Run
                    </button>
                  </div>
                  <div className="htb-terminal-content">
                    {output ? (
                      <pre className="htb-output">{output}</pre>
                    ) : (
                      <div className="htb-terminal-placeholder">
                        {code && code.trim() !== '' ? 'Click "Run" to execute your code...' : 'Write some code first, then click "Run"'}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Lesson;