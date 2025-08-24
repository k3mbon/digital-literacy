import React, { useState, useEffect } from 'react';
import MultiLanguageIDE from '../components/MultiLanguageIDE';
import InteractiveLessonComponents from '../components/InteractiveLessonComponents';
import MiniGame from '../components/MiniGames';
import { getLessonContent } from '../data/lessonLoader';
import { grades, topics } from '../data/topics';
import '../styles/Lesson.css';

const Lesson = ({ onNavigate, gradeLevel, topicId, subtopicId }) => {
  const [language, setLanguage] = useState('python');
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [currentSection, setCurrentSection] = useState(0);
  const [collapsedSections, setCollapsedSections] = useState(new Set());
  const [showMiniGame, setShowMiniGame] = useState(false);

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
  
  // Toggle section collapse state
  const toggleSectionCollapse = (sectionId) => {
    const newCollapsedSections = new Set(collapsedSections);
    if (newCollapsedSections.has(sectionId)) {
      newCollapsedSections.delete(sectionId);
    } else {
      newCollapsedSections.add(sectionId);
    }
    setCollapsedSections(newCollapsedSections);
  };
  
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

  // Parse HTML content and create collapsible sections
  const parseHTMLContent = (htmlContent) => {
    if (!htmlContent || typeof htmlContent !== 'string') {
      return [];
    }

    // Create a temporary div to parse HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;
    
    const sections = [];
    let currentSection = null;
    let sectionCounter = 0;
    
    // Process each child element
    Array.from(tempDiv.children).forEach((element) => {
      const tagName = element.tagName.toLowerCase();
      
      // Check if it's a heading that should be collapsible (h2, h3, h4)
      if (['h2', 'h3', 'h4'].includes(tagName)) {
        // Save previous section if exists
        if (currentSection) {
          sections.push(currentSection);
        }
        
        // Start new section
        sectionCounter++;
        currentSection = {
          id: `section-${sectionCounter}`,
          title: element.textContent || '',
          titleElement: element.outerHTML,
          content: [],
          level: parseInt(tagName.charAt(1)) // Extract number from h2, h3, h4
        };
      } else {
        // Add content to current section or create a default section
        if (!currentSection) {
          sectionCounter++;
          currentSection = {
            id: `section-${sectionCounter}`,
            title: 'Content',
            titleElement: null,
            content: [],
            level: 2
          };
        }
        currentSection.content.push(element.outerHTML);
      }
    });
    
    // Add the last section
    if (currentSection) {
      sections.push(currentSection);
    }
    
    return sections;
  };

  const renderContent = (content) => {
    if (!content) {
      return (
        <div className="htb-empty-content-card">
          <div className="htb-empty-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
              <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <p>Content is being prepared for you!</p>
        </div>
      );
    }
    
    // If content is a string (HTML), parse it and make it collapsible
    if (typeof content === 'string') {
      const sections = parseHTMLContent(content);
      
      if (sections.length === 0) {
        return (
          <div className="htb-content-card">
            <div 
              className="htb-card-body" 
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
        );
      }
      
      return (
        <div className="htb-content-sections">
          {sections.map((section, sectionIndex) => {
            const isCollapsed = collapsedSections.has(section.id);
            
            return (
              <div key={section.id} id={section.id} className="htb-content-card">
                <div className="htb-card-header">
                  <div className="htb-card-icon">
                    {section.level === 2 ? (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M9 11H15M9 15H15M17 21H7A2 2 0 0 1 5 19V5A2 2 0 0 1 7 3H12.586A1 1 0 0 1 13.293 3.293L19.707 9.707A1 1 0 0 1 20 10.414V19A2 2 0 0 1 18 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    ) : section.level === 3 ? (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    ) : (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                        <path d="M19.4 15A1.65 1.65 0 0 0 21 13.35V10.65A1.65 1.65 0 0 0 19.4 9L17.7 7.2A1.65 1.65 0 0 0 15.35 7.2L12 4.8L8.65 7.2A1.65 1.65 0 0 0 6.3 7.2L4.6 9A1.65 1.65 0 0 0 3 10.65V13.35A1.65 1.65 0 0 0 4.6 15L6.3 16.8A1.65 1.65 0 0 0 8.65 16.8L12 19.2L15.35 16.8A1.65 1.65 0 0 0 17.7 16.8L19.4 15Z" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                    )}
                  </div>
                  <div className="htb-card-title-area">
                    {section.titleElement ? (
                      <div 
                        className={`htb-card-title level-${section.level}`}
                        dangerouslySetInnerHTML={{ __html: section.titleElement }}
                      />
                    ) : (
                      <h3 className={`htb-card-title level-${section.level}`}>{section.title}</h3>
                    )}
                  </div>
                  <button 
                    className={`htb-collapse-btn ${isCollapsed ? 'collapsed' : ''}`}
                    onClick={() => toggleSectionCollapse(section.id)}
                    aria-label={isCollapsed ? 'Expand section' : 'Collapse section'}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <polyline points="6,9 12,15 18,9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
                
                {!isCollapsed && (
                  <div className="htb-card-content">
                    <div 
                      className="htb-card-body"
                      dangerouslySetInnerHTML={{ __html: section.content.join('') }}
                    />
                    
                    {/* Section-level navigation for HTML content */}
                    {sections.length > 1 && (
                      <div className="htb-section-navigation">
                        <button 
                          className="htb-nav-btn htb-nav-prev" 
                          onClick={() => {
                            if (sectionIndex > 0) {
                              const prevSectionId = sections[sectionIndex - 1].id;
                              if (collapsedSections.has(prevSectionId)) {
                                toggleSectionCollapse(prevSectionId);
                              }
                              document.getElementById(prevSectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            }
                          }}
                          disabled={sectionIndex === 0}
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <polyline points="15,18 9,12 15,6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          Previous
                        </button>
                        <span className="htb-section-indicator">
                          Section {sectionIndex + 1} of {sections.length}
                        </span>
                        <button 
                          className="htb-nav-btn htb-nav-next" 
                          onClick={() => {
                            if (sectionIndex < sections.length - 1) {
                              const nextSectionId = sections[sectionIndex + 1].id;
                              if (collapsedSections.has(nextSectionId)) {
                                toggleSectionCollapse(nextSectionId);
                              }
                              document.getElementById(nextSectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            }
                          }}
                          disabled={sectionIndex >= sections.length - 1}
                        >
                          Next
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <polyline points="9,18 15,12 9,6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
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
      {/* Enhanced Header with HackTheBox styling */}
      <div className="htb-header">
        <div className="htb-header-background">
          <div className="htb-grid-pattern"></div>
          <div className="htb-floating-elements">
            {[...Array(4)].map((_, i) => (
              <div key={i} className={`htb-floating-element htb-element-${i + 1}`}></div>
            ))}
          </div>
        </div>
        <div className="htb-header-content">
          <button 
            onClick={() => {
              try {
                onNavigate('topic', { gradeLevel, topicId });
              } catch (error) {
                console.error('Navigation error:', error);
                window.location.reload();
              }
            }} 
            className="htb-back-btn"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m15 18-6-6 6-6"/>
            </svg>
            Back to {topic?.title || 'Topics'}
          </button>
          <div className="htb-lesson-info">
            <div className="htb-lesson-badge">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                <path d="m2 17 10 5 10-5"/>
                <path d="m2 12 10 5 10-5"/>
              </svg>
              Interactive Lesson
            </div>
            <h1 className="htb-lesson-title">{currentLesson?.title || subtopic?.title || 'Loading...'}</h1>
            <div className="htb-lesson-meta">
              <span className={`htb-difficulty ${(currentLesson?.difficulty || 'beginner').toLowerCase()}`}>
                <div className="htb-difficulty-icon"></div>
                {(currentLesson?.difficulty || 'Beginner').charAt(0).toUpperCase() + (currentLesson?.difficulty || 'beginner').slice(1)}
              </span>
              <span className="htb-estimated-time">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12,6 12,12 16,14"/>
                </svg>
                {currentLesson?.estimatedTime || '30 minutes'}
              </span>
              <span className="htb-lesson-type">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
                </svg>
                Theory & Practice
              </span>
            </div>
            {hasValidSections && currentLesson?.sections && (
              <div className="htb-progress">
                <div className="htb-progress-header">
                  <span className="htb-progress-text">
                    Section {Math.min(currentSection + 1, currentLesson.sections.length)} of {currentLesson.sections.length}
                  </span>
                  <span className="htb-progress-percentage">
                    {Math.round(((Math.min(currentSection + 1, currentLesson.sections.length)) / currentLesson.sections.length) * 100)}%
                  </span>
                </div>
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

      {/* Enhanced Main Layout */}
      <div className="htb-main-layout">
        {/* Enhanced Sidebar with mini-game integration */}
        {hasValidSections && currentLesson.sections.length > 1 && (
          <div className="htb-sidebar">
            <div className="htb-sidebar-header">
              <div className="htb-sidebar-title">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                  <polyline points="9,22 9,12 15,12 15,22"/>
                </svg>
                Course Structure
              </div>
              <div className="htb-sidebar-stats">
                <span className="htb-completed-count">
                  {currentSection} / {currentLesson.sections.length}
                </span>
              </div>
            </div>
            <div className="htb-section-list">
              {currentLesson.sections.map((section, index) => (
                <div
                  key={index}
                  className={`htb-section-item ${
                    index === currentSection ? 'active' : ''
                  } ${index < currentSection ? 'completed' : ''} ${index > currentSection ? 'locked' : ''}`}
                  onClick={() => setCurrentSection(index)}
                >
                  <div className="htb-section-number">
                    {index < currentSection ? (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <polyline points="20,6 9,17 4,12"/>
                      </svg>
                    ) : index === currentSection ? (
                      <div className="htb-current-indicator"></div>
                    ) : (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="3"/>
                        <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1"/>
                      </svg>
                    )}
                  </div>
                  <div className="htb-section-content">
                    <div className="htb-section-title">{section.title}</div>
                    <div className="htb-section-meta">
                      <span className="htb-section-type">
                        {index < currentSection ? 'Completed' : index === currentSection ? 'In Progress' : 'Locked'}
                      </span>
                    </div>
                  </div>
                  {index === currentSection && (
                    <div className="htb-section-indicator">
                      <div className="htb-pulse"></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            {/* Mini-game section */}
            <div className="htb-mini-game-section">
              <div className="htb-mini-game-header">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <polygon points="10,8 16,12 10,16 10,8"/>
                </svg>
                Interactive Challenge
              </div>
              <button 
                className="htb-mini-game-btn"
                onClick={() => setShowMiniGame(true)}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                  <line x1="8" y1="21" x2="16" y2="21"/>
                  <line x1="12" y1="17" x2="12" y2="21"/>
                </svg>
                Start Challenge
              </button>
            </div>
          </div>
        )}

        {/* Content Area */}
        <div className="htb-content-area" style={{
          gridColumn: (!hasValidSections || currentLesson.sections.length <= 1) ? '1 / -1' : 'auto'
        }}>
          {/* Theory Section - HackTheBox Style */}
          <div className="htb-theory-section">
            <div className="htb-theory-header">
              <div className="htb-lesson-title-card">
                <div className="htb-lesson-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="htb-lesson-meta">
                  <h2>{currentLessonSection?.title || currentLesson?.title || 'Learning Adventure'}</h2>
                  <div className="htb-lesson-badges">
                    <span className="htb-difficulty-badge">{currentLesson?.difficulty || 'beginner'}</span>
                    <span className="htb-time-badge">{currentLesson?.estimatedTime || '30 minutes'}</span>
                  </div>
                </div>
              </div>
              <div className="htb-theory-tabs">
                <button className="htb-tab active">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M6.5 2H20V22H6.5A2.5 2.5 0 0 1 4 19.5V4.5A2.5 2.5 0 0 1 6.5 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Learn
                </button>
                {needsHandsOn && (
                  <button className="htb-tab">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M16 4H18A2 2 0 0 1 20 6V18A2 2 0 0 1 18 20H6A2 2 0 0 1 4 18V6A2 2 0 0 1 6 4H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <rect x="8" y="2" width="8" height="4" rx="1" ry="1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Practice
                  </button>
                )}
              </div>
            </div>
            <div className="htb-theory-content">
              {/* Render lesson content in organized cards */}
              {currentLesson?.content ? (
                <div className="htb-content-cards">
                  {renderContent(currentLesson.content)}
                </div>
              ) : (() => {
                const sectionData = getCurrentSectionData();
                return hasValidSections && sectionData ? (
                  <div className="htb-content-cards">
                    <div className="htb-section-card">
                      <div className="htb-card-header">
                        <h3>{sectionData.title || `Part ${Math.min(currentSection + 1, currentLesson?.sections?.length || 1)}`}</h3>
                        <div className="htb-card-progress">
                          <span>{Math.min(currentSection + 1, currentLesson?.sections?.length || 1)} of {currentLesson?.sections?.length || 1}</span>
                        </div>
                      </div>
                      <div className="htb-card-content">
                        {sectionData.content && renderContent(sectionData.content)}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="htb-empty-state">
                    <div className="htb-empty-icon">
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                        <path d="M14 2H6A2 2 0 0 0 4 4V20A2 2 0 0 0 6 22H18A2 2 0 0 0 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <polyline points="14,2 14,8 20,8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <h3>Content Coming Soon!</h3>
                    <p>We're working hard to create amazing learning content for this topic.</p>
                    {subtopic && (
                      <div className="htb-topic-info">
                        <span>Topic: {subtopic.title}</span>
                      </div>
                    )}
                  </div>
                );
              })()}
              
              {/* Enhanced Navigation */}
              {hasValidSections && currentLesson?.sections && (
                <div className="htb-navigation-card">
                  <div className="htb-nav-progress">
                    <div className="htb-progress-bar">
                      <div 
                        className="htb-progress-fill" 
                        style={{width: `${((currentSection + 1) / currentLesson.sections.length) * 100}%`}}
                      ></div>
                    </div>
                    <span className="htb-progress-text">
                      Step {Math.min(currentSection + 1, currentLesson.sections.length)} of {currentLesson.sections.length}
                    </span>
                  </div>
                  <div className="htb-nav-buttons">
                    <button 
                      className="htb-nav-btn htb-nav-prev" 
                      onClick={prevSection}
                      disabled={currentSection === 0}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <polyline points="15,18 9,12 15,6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Previous
                    </button>
                    <button 
                      className="htb-nav-btn htb-nav-next" 
                      onClick={nextSection}
                      disabled={currentSection >= currentLesson.sections.length - 1}
                    >
                      Next
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <polyline points="9,18 15,12 9,6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
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
                <MultiLanguageIDE
                  initialCode={code || ''}
                  initialLanguage={language || 'javascript'}
                  onCodeChange={(newCode, newLanguage) => {
                    setCode(newCode);
                    setLanguage(newLanguage);
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Mini Game Modal */}
      {showMiniGame && (
        <div className="game-modal-overlay" onClick={() => setShowMiniGame(false)}>
          <div className="game-modal-content" onClick={(e) => e.stopPropagation()}>
            <MiniGame 
              topicId={topicId}
              onComplete={(score) => {
                console.log(`Game completed with score: ${score}`);
                setShowMiniGame(false);
              }}
              onClose={() => setShowMiniGame(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Lesson;