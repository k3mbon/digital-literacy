import React, { useState, useEffect } from 'react';
import CodeSnippet from './CodeSnippet';
import '../styles/InteractiveLessonViewer.css';

const InteractiveLessonViewer = ({ sections = [], onSectionComplete, allowMultipleExpanded = true }) => {
  const [expandedSections, setExpandedSections] = useState(new Set());
  const [currentSection, setCurrentSection] = useState(0);
  const [completedSections, setCompletedSections] = useState(new Set());
  const [progress, setProgress] = useState(0);

  // Update progress when completed sections change
  useEffect(() => {
    const progressPercentage = (completedSections.size / sections.length) * 100;
    setProgress(progressPercentage);
  }, [completedSections, sections.length]);

  const toggleSection = (index) => {
    const newExpanded = new Set(expandedSections);
    
    if (allowMultipleExpanded) {
      // Allow multiple sections to be expanded independently
      if (newExpanded.has(index)) {
        newExpanded.delete(index);
      } else {
        newExpanded.add(index);
      }
    } else {
      // Only allow one section expanded at a time
      if (newExpanded.has(index)) {
        newExpanded.clear();
      } else {
        newExpanded.clear();
        newExpanded.add(index);
      }
    }
    
    setExpandedSections(newExpanded);
    setCurrentSection(index);
  };

  const markSectionComplete = (index) => {
    const newCompleted = new Set(completedSections);
    newCompleted.add(index);
    setCompletedSections(newCompleted);
    
    if (onSectionComplete) {
      onSectionComplete(index, sections[index]);
    }
  };

  const navigateToSection = (direction) => {
    let newIndex;
    if (direction === 'next') {
      newIndex = Math.min(currentSection + 1, sections.length - 1);
    } else {
      newIndex = Math.max(currentSection - 1, 0);
    }
    
    setCurrentSection(newIndex);
    
    // Auto-expand the new section
    const newExpanded = new Set();
    newExpanded.add(newIndex);
    setExpandedSections(newExpanded);
  };

  const getSectionStatus = (index) => {
    if (completedSections.has(index)) return 'completed';
    if (index === currentSection) return 'active';
    return 'pending';
  };

  if (!sections || sections.length === 0) {
    return (
      <div className="htb-lesson-viewer">
        <div className="htb-empty-lesson">
          <div className="htb-empty-icon">📚</div>
          <p>No lesson sections available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="htb-lesson-viewer">
      {/* Progress Header */}
      <div className="htb-lesson-progress-header">
        <div className="htb-progress-info">
          <h2 className="htb-lesson-title">Interactive Lesson</h2>
          <div className="htb-progress-stats">
            <span className="htb-section-counter">
              Section {currentSection + 1} of {sections.length}
            </span>
            <span className="htb-completion-rate">
              {Math.round(progress)}% Complete
            </span>
          </div>
        </div>
        <div className="htb-progress-bar">
          <div 
            className="htb-progress-fill" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="htb-lesson-navigation">
        <button 
          className="htb-nav-btn htb-nav-prev"
          onClick={() => navigateToSection('prev')}
          disabled={currentSection === 0}
        >
          <span className="htb-nav-icon">←</span>
          Previous
        </button>
        
        <div className="htb-section-indicators">
          {sections.map((_, index) => (
            <button
              key={index}
              className={`htb-section-dot ${getSectionStatus(index)}`}
              onClick={() => {
                setCurrentSection(index);
                const newExpanded = new Set();
                newExpanded.add(index);
                setExpandedSections(newExpanded);
              }}
              title={`Section ${index + 1}: ${sections[index]?.title || 'Untitled'}`}
            >
              {completedSections.has(index) && (
                <span className="htb-check-icon">✓</span>
              )}
            </button>
          ))}
        </div>
        
        <button 
          className="htb-nav-btn htb-nav-next"
          onClick={() => navigateToSection('next')}
          disabled={currentSection === sections.length - 1}
        >
          Next
          <span className="htb-nav-icon">→</span>
        </button>
      </div>

      {/* Section Cards */}
      <div className="htb-section-cards">
        {sections.map((section, index) => {
          const isExpanded = expandedSections.has(index);
          const status = getSectionStatus(index);
          
          return (
            <div 
              key={index}
              className={`htb-section-card ${status} ${isExpanded ? 'expanded' : 'collapsed'}`}
            >
              {/* Section Header */}
              <div 
                className="htb-section-header"
                onClick={() => toggleSection(index)}
              >
                <div className="htb-section-info">
                  <div className="htb-section-number">
                    {index + 1}
                  </div>
                  <div className="htb-section-title-area">
                    <h3 className="htb-section-title">{section.title}</h3>
                    {section.subtitle && (
                      <p className="htb-section-subtitle">{section.subtitle}</p>
                    )}
                  </div>
                </div>
                
                <div className="htb-section-controls">
                  <div className="htb-section-status-icon">
                    {completedSections.has(index) ? (
                      <span className="htb-status-completed">✓</span>
                    ) : index === currentSection ? (
                      <span className="htb-status-active">●</span>
                    ) : (
                      <span className="htb-status-pending">○</span>
                    )}
                  </div>
                  
                  <button className="htb-expand-btn">
                    <span className={`htb-expand-icon ${isExpanded ? 'rotated' : ''}`}>
                      ▼
                    </span>
                  </button>
                </div>
              </div>

              {/* Section Content */}
              <div className={`htb-section-content ${isExpanded ? 'expanded' : 'collapsed'}`}>
                <div className="htb-content-wrapper">
                  {section.content && (
                    <div className="htb-section-content">
                      {typeof section.content === 'string' ? (
                        <div dangerouslySetInnerHTML={{ __html: section.content }} />
                      ) : (
                        section.content
                      )}
                    </div>
                  )}
                  
                  {section.codeExample && (
                    <CodeSnippet 
                      code={section.codeExample}
                      language={section.codeLanguage || 'javascript'}
                      title={section.codeTitle || 'Code Example'}
                    />
                  )}
                  
                  {section.code && (
                    <CodeSnippet 
                      code={section.code}
                      language={section.language || 'javascript'}
                      title={section.title || 'Code'}
                    />
                  )}
                  
                  {section.script && (
                    <CodeSnippet 
                      code={section.script}
                      language={section.scriptLanguage || 'javascript'}
                      title={section.scriptTitle || 'Script'}
                    />
                  )}
                  
                  {section.keyPoints && (
                    <div className="htb-key-points">
                      <h4>Key Points:</h4>
                      <ul>
                        {section.keyPoints.map((point, pointIndex) => (
                          <li key={pointIndex}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {/* Section Actions */}
                  <div className="htb-section-actions">
                    {!completedSections.has(index) && (
                      <button 
                        className="htb-complete-btn"
                        onClick={() => markSectionComplete(index)}
                      >
                        Mark as Complete
                      </button>
                    )}
                    
                    {index < sections.length - 1 && (
                      <button 
                        className="htb-continue-btn"
                        onClick={() => navigateToSection('next')}
                      >
                        Continue to Next Section
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Lesson Summary */}
      {completedSections.size === sections.length && (
        <div className="htb-lesson-complete">
          <div className="htb-completion-badge">
            <span className="htb-badge-icon">🎉</span>
            <h3>Lesson Complete!</h3>
            <p>You've successfully completed all {sections.length} sections.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default InteractiveLessonViewer;