import React, { useState, useEffect } from 'react';
import { 
  IconBook, 
  IconCode, 
  IconNotes, 
  IconArrowLeft,
  IconArrowRight,
  IconClock,
  IconUser,
  IconUsers,
  IconBulb,
  IconCheckbox,
  IconCheck,
  IconChevronDown,
  IconChevronUp,
  IconTarget,
  IconBookmark,
  IconDownload,
  IconEye,
  IconBrain,
  IconChartLine,
  IconTrophy,
  IconFlag,
  IconShield,
  IconLock,
  IconTerminal,
  IconSettings
} from '@tabler/icons-react';
import MultiLanguageIDE from './MultiLanguageIDE';
import { getLessonContent } from '../data/lessonLoader';
import '../styles/HTBLessonPage.css';
import { grades, topics } from '../data/topics';
import '../styles/HackTheBoxTheme.css';
import '../styles/ModernLessonPage.css';
import '../styles/ModernReadableLessonPage.css';

const ModernLessonPage = ({ onNavigate, gradeLevel, topicId, subtopicId }) => {
  const [completedSections, setCompletedSections] = useState(new Set());
  const [bookmarkedSections, setBookmarkedSections] = useState(new Set());
  const [readingProgress, setReadingProgress] = useState(0);
  const [currentSection, setCurrentSection] = useState(0);
  const [showNotes, setShowNotes] = useState(false);
  const [learningMode, setLearningMode] = useState('guided'); // 'guided', 'explore', 'challenge'
  const [expandedSections, setExpandedSections] = useState(new Set());
  const [lessonContentType, setLessonContentType] = useState('mixed');

  const grade = parseInt(gradeLevel) || 8;
  const lessonData = getLessonContent(subtopicId, grade);
  const topic = topics[topicId];
  const subtopic = topic?.subtopics[subtopicId];

  // Determine if this is a code-heavy lesson or theory-based
  const isCodeLesson = ['1.6', '1.7', '1.8'].includes(subtopicId);
  const isTheoryLesson = ['2.1', '2.2', '3.1', '3.2', '4.1', '4.2', '4.3', '4.4', '4.5'].includes(subtopicId);

  // Helper functions
  const getDifficultyLevel = () => {
    if (grade === 7) return 'beginner';
    if (grade === 8) return 'intermediate';
    return 'advanced';
  };

  const toggleSectionExpansion = (index) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedSections(newExpanded);
  };

  // Set content type based on lesson analysis
  useEffect(() => {
    if (isCodeLesson) {
      setLessonContentType('code');
    } else if (isTheoryLesson) {
      setLessonContentType('theory');
    } else {
      setLessonContentType('mixed');
    }
  }, [isCodeLesson, isTheoryLesson]);

  // Detect content type and set rendering mode
  useEffect(() => {
    if (lessonData?.content) {
      // Auto-advance current section based on scroll or completion
      const timer = setTimeout(() => {
        if (currentSection < safeSections.length - 1 && completedSections.has(currentSection)) {
          setCurrentSection(currentSection + 1);
        }
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [lessonData, subtopicId, currentSection, completedSections]);

  // Reading progress tracking
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setReadingProgress(Math.min(100, Math.max(0, progress)));
    };

    // Throttle scroll events to prevent performance issues
    let timeoutId;
    const throttledHandleScroll = () => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(handleScroll, 16); // ~60fps
    };

    window.addEventListener('scroll', throttledHandleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  // Enhanced content transformation for HackTheBox style
  const transformContentToHTBStyle = (content, sectionType = 'theory') => {
    if (!content || typeof content !== 'string') return '';
    
    // Prevent processing extremely large content that could crash the browser
    if (content.length > 100000) {
      console.warn('Content too large, truncating...');
      content = content.substring(0, 100000) + '... [Content truncated for performance]';
    }
    
    let transformedContent = content;

    if (isTheoryLesson) {
      // For theory lessons, enhance with visual elements and remove code blocks
      transformedContent = transformedContent
        .replace(/```[\s\S]*?```/g, '') // Remove code blocks
        .replace(/<pre[\s\S]*?<\/pre>/g, '') // Remove pre blocks
        .replace(/<h2>([^<]+)<\/h2>/g, '<div class="htb-section-header"><IconShield class="section-icon" /><h2>$1</h2></div>')
        .replace(/<h3>([^<]+)<\/h3>/g, '<div class="htb-subsection-header"><IconFlag class="subsection-icon" /><h3>$1</h3></div>')
        .replace(/<h4>([^<]+)<\/h4>/g, '<div class="htb-point-header"><IconTarget class="point-icon" /><h4>$1</h4></div>');
    } else if (isCodeLesson) {
      // For code lessons, enhance code blocks and maintain structure
      transformedContent = transformedContent
        .replace(/<h2>([^<]+)<\/h2>/g, '<div class="htb-code-section-header"><IconTerminal class="section-icon" /><h2>$1</h2></div>')
        .replace(/<h3>([^<]+)<\/h3>/g, '<div class="htb-code-subsection-header"><IconCode class="subsection-icon" /><h3>$1</h3></div>');
    } else {
      // For mixed content, use balanced approach
      transformedContent = transformedContent
        .replace(/<h2>([^<]+)<\/h2>/g, '<div class="htb-mixed-section-header"><IconBrain class="section-icon" /><h2>$1</h2></div>')
        .replace(/<h3>([^<]+)<\/h3>/g, '<div class="htb-mixed-subsection-header"><IconBulb class="subsection-icon" /><h3>$1</h3></div>');
    }
    
    // Add HTB-style interactive elements
    transformedContent = enhanceWithHTBElements(transformedContent);
    
    return transformedContent;
  };

  // Create visual diagrams from simple text
  const createVisualDiagram = (content) => {
    const steps = content.split('\n').filter(line => line.trim());
    if (steps.length <= 1) return `<div class="simple-concept">${content}</div>`;
    
    return `
      <div class="concept-diagram">
        <h4>Step-by-Step Process</h4>
        <div class="diagram-content">
          ${steps.map(step => `<div class="diagram-step">${step.trim()}</div>`).join('')}
        </div>
      </div>
    `;
  };

  // Enhance content with interactive elements
  const enhanceWithInteractiveElements = (content) => {
    if (!content || typeof content !== 'string') return '';
    
    let enhanced = content;
    
    try {
      // Convert key points to visual cards
      enhanced = enhanced.replace(
        /<ul>([\s\S]*?)<\/ul>/g,
        (match, listContent) => {
          if (listContent.includes('<strong>') || listContent.length > 200) {
            const items = listContent.match(/<li>([\s\S]*?)<\/li>/g) || [];
            if (items.length >= 3 && items.length <= 20) { // Limit items to prevent crashes
              return `
                <div class="visual-learning-aid">
                  ${items.slice(0, 10).map(item => { // Limit to first 10 items
                    const content = item.replace(/<\/?li>/g, '');
                    const title = content.match(/<strong>(.*?)<\/strong>/)?.[1] || 'Key Point';
                    const description = content.replace(/<strong>.*?<\/strong>:?\s*/, '');
                    const icon = getIconForContent(title);
                    return `
                      <div class="learning-card">
                        <div class="learning-card-icon">${icon}</div>
                        <h5>${title}</h5>
                        <p>${description}</p>
                      </div>
                    `;
                  }).join('')}
                </div>
              `;
            }
          }
          return match;
        }
      );
    } catch (error) {
      console.warn('Error enhancing content:', error);
      return content; // Return original content if enhancement fails
    }
    
    // Add interactive examples
    enhanced = enhanced.replace(
      /(<h3>.*?Example.*?<\/h3>)([\s\S]*?)(?=<h[23]|$)/gi,
      `$1
      <div class="interactive-example">
        <h4><span class="heading-icon">🎯</span>Interactive Example</h4>
        $2
      </div>`
    );
    
    // Add key insights boxes
    enhanced = enhanced.replace(
      /(<h3>.*?(Why|Important|Key|Remember).*?<\/h3>)([\s\S]*?)(?=<h[23]|$)/gi,
      `$1
      <div class="key-insights">
        <h4><span class="heading-icon">💡</span>Key Insights</h4>
        $3
      </div>`
    );
    
    return enhanced;
  };

  // Get appropriate icon for content
  const getIconForContent = (title) => {
    const iconMap = {
      'planning': '🎯',
      'sharing': '👥', 
      'remembering': '🧠',
      'organizing': '📋',
      'understanding': '💡',
      'creating': '🔨',
      'solving': '🔧',
      'learning': '📚',
      'practicing': '🎮',
      'thinking': '🤔',
      default: '⭐'
    };
    
    const key = Object.keys(iconMap).find(k => title.toLowerCase().includes(k));
    return iconMap[key] || iconMap.default;
  };

  // Get HTB-style icon for content
  const getHTBIconForContent = (title) => {
    const iconMap = {
      'planning': '🎯',
      'security': '🛡️',
      'network': '🌐',
      'data': '💾',
      'algorithm': '⚡',
      'system': '💻',
      'performance': '📊',
      'architecture': '🏗️',
      'storage': '📁',
      'device': '🖥️',
      default: '🔰'
    };
    
    const key = Object.keys(iconMap).find(k => title.toLowerCase().includes(k));
    return iconMap[key] || iconMap.default;
  };

  // Get difficulty based on grade level
  const getGradeDifficulty = (grade) => {
    if (grade <= 7) return 'beginner';
    if (grade === 8) return 'intermediate';
    return 'advanced';
  };

  // Transform lesson data
  const transformLessonData = (data) => {
    if (!data) return { title: 'Coming Soon', sections: [] };
    
    // If the lesson already has sections array (new format)
    if (data.sections && Array.isArray(data.sections)) {
      return {
        title: data.title || subtopic?.title || 'Lesson',
        description: data.description || subtopic?.description,
        sections: data.sections.map((section, index) => ({
          id: `section-${index}`,
          title: section.title || `Section ${index + 1}`,
          content: section.content,
          keyPoints: section.keyPoints || [],
          codeExample: section.codeExample,
          codeLanguage: section.codeLanguage || 'javascript',
          estimatedTime: section.estimatedTime || 5,
          difficulty: section.difficulty || 'beginner'
        }))
      };
    }
    
    // Transform from old format with single content string
    if (data.content) {
      const sections = transformContentToSections(data.content);
      return {
        title: data.title || subtopic?.title || 'Lesson',
        description: data.description || subtopic?.description,
        estimatedTime: data.estimatedTime || '30 minutes',
        sections: sections
      };
    }
    
    return { title: data.title || 'Lesson', sections: [] };
  };

  // Helper function to transform HTML content into sections
  const transformContentToSections = (htmlContent) => {
    // Split content by h2 tags to create sections
    const sections = [];
    const h2Matches = [...htmlContent.matchAll(/<h2[^>]*>(.*?)<\/h2>/g)];
    
    let lastIndex = 0;
    let sectionIndex = 0;
    
    for (let i = 0; i < h2Matches.length; i++) {
      const match = h2Matches[i];
      
      // Add previous section if exists
      if (lastIndex < match.index) {
        const prevContent = htmlContent.substring(lastIndex, match.index);
        if (prevContent.trim()) {
          sections.push({
            id: `section-${sectionIndex}`,
            title: sectionIndex === 0 ? 'Introduction' : `Section ${sectionIndex}`,
            content: prevContent.trim(),
            estimatedTime: Math.max(3, Math.ceil(prevContent.length / 200)),
            difficulty: 'beginner'
          });
          sectionIndex++;
        }
      }
      
      // Find the content for this section (until next h2 or end)
      const nextMatch = h2Matches[i + 1];
      const endIndex = nextMatch ? nextMatch.index : htmlContent.length;
      const sectionContent = htmlContent.substring(match.index + match[0].length, endIndex);
      
      sections.push({
        id: `section-${sectionIndex}`,
        title: match[1].replace(/<[^>]*>/g, ''), // Remove any HTML tags from title
        content: sectionContent.trim(),
        estimatedTime: Math.max(5, Math.ceil(sectionContent.length / 200)),
        difficulty: 'beginner'
      });
      
      lastIndex = endIndex;
      sectionIndex++;
    }
    
    // Add remaining content if any
    if (lastIndex < htmlContent.length) {
      const remainingContent = htmlContent.substring(lastIndex);
      if (remainingContent.trim()) {
        sections.push({
          id: `section-${sectionIndex}`,
          title: sections.length === 0 ? 'Content' : 'Summary',
          content: remainingContent.trim(),
          estimatedTime: Math.max(3, Math.ceil(remainingContent.length / 200)),
          difficulty: 'beginner'
        });
      }
    }
    
    // If no sections were created, create one with all content
    if (sections.length === 0) {
      sections.push({
        id: 'section-0',
        title: 'Lesson Content',
        content: htmlContent,
        estimatedTime: Math.max(5, Math.ceil(htmlContent.length / 200)),
        difficulty: 'beginner'
      });
    }
    
    return sections;
  };

  const lesson = transformLessonData(lessonData);

  // Safety check to prevent crashes
  if (!lesson || !lesson.sections || !Array.isArray(lesson.sections)) {
    return (
      <div className="lesson-page htb-container" style={{ padding: '40px', textAlign: 'center' }}>
        <h1>Lesson Content Unavailable</h1>
        <p>Sorry, this lesson content could not be loaded properly.</p>
        <button 
          className="htb-btn htb-btn-primary"
          onClick={() => onNavigate('topic', { gradeLevel, topicId })}
        >
          Back to Topic
        </button>
      </div>
    );
  }

  // Limit sections to prevent crashes
  const safeSections = lesson.sections.slice(0, 20); // Max 20 sections

  const markSectionComplete = (index) => {
    const newCompleted = new Set(completedSections);
    newCompleted.add(index);
    setCompletedSections(newCompleted);
  };

  const toggleBookmark = (index) => {
    const newBookmarked = new Set(bookmarkedSections);
    if (newBookmarked.has(index)) {
      newBookmarked.delete(index);
    } else {
      newBookmarked.add(index);
    }
    setBookmarkedSections(newBookmarked);
  };

  const progress = safeSections.length > 0 ? 
    (completedSections.size / safeSections.length) * 100 : 0;

  const totalTime = safeSections.reduce((acc, section) => acc + (section.estimatedTime || 5), 0);

  return (
    <div className="htb-lesson-layout">
      {/* Enhanced Progress Bar */}
      <div className="htb-progress-bar">
        <div 
          className="progress-fill" 
          style={{ width: `${readingProgress}%` }}
        ></div>
        <div className="progress-indicators">
          {safeSections.map((_, index) => (
            <div
              key={index}
              className={`progress-dot ${
                completedSections.has(index) ? 'completed' : 
                currentSection === index ? 'active' : ''
              }`}
              onClick={() => setCurrentSection(index)}
              title={`Section ${index + 1}`}
            ></div>
          ))}
        </div>
      </div>

      {/* HTB Header */}
      <div className="htb-lesson-header">
        <div className="header-backdrop"></div>
        <div className="header-content">
          <div className="navigation-breadcrumb">
            <button 
              className="htb-btn htb-btn-back"
              onClick={() => onNavigate('topic', { gradeLevel, topicId })}
            >
              <IconArrowLeft size={16} />
              Back to Topic
            </button>
          </div>
          
          <div className="lesson-badge-container">
            <div className={`lesson-type-badge ${
              lessonContentType === 'theory' ? 'theory' : 
              lessonContentType === 'code' ? 'code' : 'mixed'
            }`}>
              {lessonContentType === 'theory' ? <IconBulb size={16} /> : 
               lessonContentType === 'code' ? <IconCode size={16} /> : <IconBrain size={16} />}
              {lessonContentType === 'theory' ? 'Theory' : 
               lessonContentType === 'code' ? 'Practical' : 'Mixed'}
            </div>
            <div className={`difficulty-badge ${getDifficultyLevel()}`}>
              <IconTarget size={16} />
              {getDifficultyLevel()}
            </div>
          </div>
          
          <h1 className="htb-lesson-title">{lesson.title}</h1>
          
          {lesson.description && (
            <p className="htb-lesson-description">{lesson.description}</p>
          )}
          
          <div className="lesson-meta-stats">
            <div className="stat-item">
              <IconClock size={16} />
              <span>{totalTime} min read</span>
            </div>
            <div className="stat-item">
              <IconBook size={16} />
              <span>{safeSections.length} sections</span>
            </div>
            <div className="stat-item">
              <IconUsers size={16} />
              <span>Grade {gradeLevel}</span>
            </div>
            <div className="stat-item">
              <IconChartLine size={16} />
              <span>{Math.round(readingProgress)}% Complete</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mode Selector */}
      <div className="htb-mode-selector">
        <div className="mode-tabs">
          <button 
            className={`mode-tab ${learningMode === 'guided' ? 'active' : ''}`}
            onClick={() => setLearningMode('guided')}
          >
            <IconBookmark size={16} />
            Guided Learning
          </button>
          <button 
            className={`mode-tab ${learningMode === 'explore' ? 'active' : ''}`}
            onClick={() => setLearningMode('explore')}
          >
            <IconEye size={16} />
            Free Explore
          </button>
          <button 
            className={`mode-tab ${learningMode === 'challenge' ? 'active' : ''}`}
            onClick={() => setLearningMode('challenge')}
          >
            <IconTarget size={16} />
            Challenge Mode
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="htb-lesson-content">
        {learningMode === 'guided' && (
          <div className="guided-learning-container">
            {/* Section Navigator */}
            <div className="section-navigator">
              <button 
                className="nav-btn"
                onClick={() => setCurrentSection(Math.max(0, currentSection - 1))}
                disabled={currentSection === 0}
              >
                <IconArrowLeft size={16} />
                Previous
              </button>
              
              <div className="section-counter">
                Section {currentSection + 1} of {safeSections.length}
              </div>
              
              <button 
                className="nav-btn"
                onClick={() => setCurrentSection(Math.min(safeSections.length - 1, currentSection + 1))}
                disabled={currentSection === safeSections.length - 1}
              >
                Next
                <IconArrowRight size={16} />
              </button>
            </div>

            {/* Current Section */}
            {safeSections[currentSection] && (
              <div className={`htb-section-card ${
                completedSections.has(currentSection) ? 'completed' : 'active-section'
              }`}>
                <div className="section-header">
                  <div className="section-icon">
                    {lessonContentType === 'theory' ? <IconBulb size={24} /> : 
                     lessonContentType === 'code' ? <IconCode size={24} /> : <IconBrain size={24} />}
                  </div>
                  <div className="section-title-area">
                    <h2>{safeSections[currentSection].title}</h2>
                    <div className="section-meta">
                      <div className="time-estimate">
                        <IconClock size={14} />
                        {Math.max(2, Math.ceil(safeSections[currentSection].content.length / 1000))} min
                      </div>
                      <span>•</span>
                      <span>{lessonContentType === 'theory' ? 'Conceptual' : 'Hands-on'}</span>
                    </div>
                  </div>
                  {completedSections.has(currentSection) && (
                    <IconCheckbox size={24} className="completed-icon" />
                  )}
                </div>
                
                <div className="section-content">
                  <div 
                    className="enhanced-content"
                    dangerouslySetInnerHTML={{ 
                      __html: transformContentToReadable(safeSections[currentSection].content) 
                    }}
                  />
                  
                  {/* Key Points for Theory Lessons */}
                  {lessonContentType === 'theory' && safeSections[currentSection].keyPoints && (
                    <div className="htb-learning-matrix">
                      <div className="matrix-header">
                        <IconBrain size={20} />
                        <h4>Key Learning Objectives</h4>
                      </div>
                      <div className="matrix-grid">
                        {safeSections[currentSection].keyPoints.map((point, idx) => (
                          <div key={idx} className="htb-matrix-item">
                            <div className="matrix-item-header">
                              <IconTarget className="matrix-icon" />
                              <h5>Objective {idx + 1}</h5>
                            </div>
                            <p>{point}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Code Examples for Programming Lessons */}
                  {lessonContentType === 'code' && safeSections[currentSection].codeExample && (
                    <div className="htb-challenge-box">
                      <div className="challenge-header">
                        <IconCode size={20} />
                        <h4>Code Challenge</h4>
                      </div>
                      <pre><code>{safeSections[currentSection].codeExample}</code></pre>
                    </div>
                  )}
                  
                  <div className="section-actions">
                    <button 
                      className={`htb-btn ${
                        completedSections.has(currentSection) ? 'htb-btn-success' : 'htb-btn-primary'
                      }`}
                      onClick={() => markSectionComplete(currentSection)}
                    >
                      {completedSections.has(currentSection) ? (
                        <>
                          <IconCheckbox size={16} />
                          Completed
                        </>
                      ) : (
                        <>
                          <IconCheck size={16} />
                          Mark Complete
                        </>
                      )}
                    </button>
                    
                    {currentSection < safeSections.length - 1 && (
                      <button 
                        className="htb-btn htb-btn-outline"
                        onClick={() => setCurrentSection(currentSection + 1)}
                      >
                        <IconArrowRight size={16} />
                        Next Section
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {learningMode === 'explore' && (
          <div className="explore-mode-container">
            {safeSections.map((section, index) => (
              <div 
                key={section.id} 
                className={`htb-section-card ${
                  completedSections.has(index) ? 'completed' : ''
                }`}
              >
                <div 
                  className="section-header"
                  onClick={() => toggleSectionExpansion(index)}
                >
                  <div className="section-icon">
                    {lessonContentType === 'theory' ? <IconBulb size={24} /> : 
                     lessonContentType === 'code' ? <IconCode size={24} /> : <IconBrain size={24} />}
                  </div>
                  <div className="section-title-area">
                    <h3>{section.title}</h3>
                    <div className="section-meta">
                      <div className="time-estimate">
                        <IconClock size={14} />
                        {Math.max(2, Math.ceil(section.content.length / 1000))} min
                      </div>
                    </div>
                  </div>
                  <IconChevronDown 
                    size={20} 
                    className={`expand-icon ${expandedSections.has(index) ? 'rotated' : ''}`}
                  />
                </div>
                
                {expandedSections.has(index) && (
                  <div className="section-content">
                    <div 
                      className="enhanced-content"
                      dangerouslySetInnerHTML={{ 
                        __html: transformContentToReadable(section.content) 
                      }}
                    />
                    
                    <div className="section-actions">
                      <button 
                        className={`htb-btn ${
                          completedSections.has(index) ? 'htb-btn-success' : 'htb-btn-primary'
                        }`}
                        onClick={() => markSectionComplete(index)}
                      >
                        {completedSections.has(index) ? (
                          <>
                            <IconCheckbox size={16} />
                            Completed
                          </>
                        ) : (
                          <>
                            <IconCheck size={16} />
                            Mark Complete
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {learningMode === 'challenge' && (
          <div className="challenge-mode-container">
            <div className="htb-challenge-box">
              <div className="challenge-header">
                <IconTarget size={24} />
                <h3>Learning Challenge</h3>
              </div>
              <p>Complete all sections to unlock the final challenge!</p>
              
              <div className="challenge-progress">
                <div className="progress-stats">
                  <span>Progress: {completedSections.size}/{safeSections.length}</span>
                  <span>{Math.round((completedSections.size / safeSections.length) * 100)}%</span>
                </div>
                <div className="htb-progress">
                  <div 
                    className="htb-progress-fill" 
                    style={{ width: `${(completedSections.size / safeSections.length) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              {completedSections.size === safeSections.length && (
                <div className="challenge-complete">
                  <IconTrophy size={32} />
                  <h4>Challenge Complete!</h4>
                  <p>Congratulations! You've mastered this lesson.</p>
                </div>
              )}
            </div>
            
            {/* Show all sections in challenge mode */}
            <div className="challenge-sections">
              {safeSections.map((section, index) => (
                <div 
                  key={section.id} 
                  className={`htb-section-card ${
                    completedSections.has(index) ? 'completed' : ''
                  }`}
                >
                  <div className="section-header">
                    <div className="section-icon">
                      {completedSections.has(index) ? (
                        <IconCheckbox size={24} className="completed-icon" />
                      ) : (
                        <IconTarget size={24} />
                      )}
                    </div>
                    <div className="section-title-area">
                      <h3>{section.title}</h3>
                      <div className="section-meta">
                        <span>{completedSections.has(index) ? 'Completed' : 'Pending'}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="section-content">
                    <div 
                      className="enhanced-content"
                      dangerouslySetInnerHTML={{ 
                        __html: transformContentToReadable(section.content) 
                      }}
                    />
                    
                    <div className="section-actions">
                      <button 
                        className={`htb-btn ${
                          completedSections.has(index) ? 'htb-btn-success' : 'htb-btn-primary'
                        }`}
                        onClick={() => markSectionComplete(index)}
                      >
                        {completedSections.has(index) ? (
                          <>
                            <IconCheckbox size={16} />
                            Completed
                          </>
                        ) : (
                          <>
                            <IconCheck size={16} />
                            Complete Challenge
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="htb-lesson-footer">
        <div className="footer-stats">
          <div className="stat">
            <IconClock size={16} />
            <span>Time spent: {Math.round(readingProgress * totalTime / 100)} min</span>
          </div>
          <div className="stat">
            <IconCheckbox size={16} />
            <span>Completed: {completedSections.size}/{safeSections.length}</span>
          </div>
        </div>
        
        <div className="footer-actions">
          <button 
            className="htb-btn htb-btn-outline"
            onClick={() => onNavigate('topic', { gradeLevel, topicId })}
          >
            <IconArrowLeft size={16} />
            Back to Topic
          </button>
          
          {completedSections.size === safeSections.length && (
            <button className="htb-btn htb-btn-success">
              <IconTrophy size={16} />
              Lesson Complete!
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModernLessonPage;
