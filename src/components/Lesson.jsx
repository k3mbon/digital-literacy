import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/Lesson.css';

// Mock lesson data - replace with actual API call
const mockLessonData = {
  id: 1,
  title: "Introduction to Digital Literacy",
  description: "Learn the fundamentals of digital literacy and essential computer skills.",
  difficulty: "beginner",
  estimatedTime: "45 min",
  sections: [
    {
      id: 1,
      title: "What is Digital Literacy?",
      subtitle: "Understanding the basics",
      content: {
        theory: `
          <h2>Understanding Digital Literacy</h2>
          <p>Digital literacy is the ability to use digital technology, communication tools, and networks to access, manage, integrate, evaluate, and create information in order to function in a knowledge society.</p>
          
          <h3>Key Components</h3>
          <ul>
            <li>Technical skills - Operating devices and software</li>
            <li>Information literacy - Finding and evaluating information</li>
            <li>Communication skills - Using digital tools to communicate</li>
            <li>Critical thinking - Analyzing digital content</li>
          </ul>
          
          <h3>Why It Matters</h3>
          <p>In today's digital world, these skills are essential for:</p>
          <ul>
            <li>Educational success</li>
            <li>Career advancement</li>
            <li>Social participation</li>
            <li>Personal empowerment</li>
          </ul>
        `,
        practice: "Complete the interactive exercises to test your understanding.",
        notes: [
          {
            title: "Key Takeaways",
            points: [
              "Digital literacy goes beyond basic computer skills",
              "It includes critical thinking about digital information",
              "Essential for success in modern society",
              "Requires continuous learning and adaptation"
            ]
          }
        ]
      },
      completed: true
    },
    {
      id: 2,
      title: "Basic Computer Operations",
      subtitle: "Essential skills for computer use",
      content: {
        theory: `
          <h2>Basic Computer Operations</h2>
          <p>Understanding fundamental computer operations is the foundation of digital literacy.</p>
          
          <h3>Hardware Components</h3>
          <ul>
            <li>Input devices (keyboard, mouse, touchscreen)</li>
            <li>Output devices (monitor, speakers, printer)</li>
            <li>Processing unit (CPU)</li>
            <li>Storage devices (hard drive, SSD, USB)</li>
          </ul>
          
          <h3>Operating System Basics</h3>
          <p>The operating system manages your computer's resources and provides a user interface.</p>
          <ul>
            <li>Desktop and taskbar navigation</li>
            <li>File and folder management</li>
            <li>Program installation and removal</li>
            <li>System settings and preferences</li>
          </ul>
        `,
        practice: "Practice navigating your computer's interface and organizing files.",
        notes: [
          {
            title: "Essential Skills",
            points: [
              "Know your hardware components",
              "Master file management",
              "Understand system navigation",
              "Learn keyboard shortcuts"
            ]
          }
        ]
      },
      completed: false
    },
    {
      id: 3,
      title: "Internet and Web Browsing",
      subtitle: "Navigating the digital world",
      content: {
        theory: `
          <h2>Internet and Web Browsing</h2>
          <p>The internet is a global network that connects billions of devices worldwide.</p>
          
          <h3>Web Browsers</h3>
          <p>Browsers are applications that allow you to access and view websites.</p>
          <ul>
            <li>Popular browsers: Chrome, Firefox, Safari, Edge</li>
            <li>Address bar for entering URLs</li>
            <li>Bookmarks for saving favorite sites</li>
            <li>Tabs for multiple pages</li>
          </ul>
          
          <h3>Search Strategies</h3>
          <ul>
            <li>Use specific keywords</li>
            <li>Use quotation marks for exact phrases</li>
            <li>Evaluate source credibility</li>
            <li>Cross-reference information</li>
          </ul>
        `,
        practice: "Practice effective web searching and evaluate website credibility.",
        notes: [
          {
            title: "Best Practices",
            points: [
              "Always verify information from multiple sources",
              "Be aware of bias in online content",
              "Protect your privacy while browsing",
              "Use secure connections (HTTPS)"
            ]
          }
        ]
      },
      completed: false
    },
    {
      id: 4,
      title: "Digital Communication",
      subtitle: "Email, messaging, and social media",
      content: {
        theory: `
          <h2>Digital Communication</h2>
          <p>Digital communication has revolutionized how we connect and share information.</p>
          
          <h3>Email Fundamentals</h3>
          <ul>
            <li>Creating professional email addresses</li>
            <li>Writing effective subject lines</li>
            <li>Proper email etiquette</li>
            <li>Managing inbox organization</li>
          </ul>
          
          <h3>Social Media Awareness</h3>
          <p>Understanding the impact and proper use of social platforms.</p>
          <ul>
            <li>Privacy settings and controls</li>
            <li>Digital footprint awareness</li>
            <li>Recognizing misinformation</li>
            <li>Professional vs. personal presence</li>
          </ul>
        `,
        practice: "Set up email filters and review social media privacy settings.",
        notes: [
          {
            title: "Communication Tips",
            points: [
              "Think before you post or send",
              "Respect others' privacy and opinions",
              "Use appropriate tone and language",
              "Be mindful of your digital reputation"
            ]
          }
        ]
      },
      completed: false
    },
    {
      id: 5,
      title: "Digital Security and Privacy",
      subtitle: "Protecting yourself online",
      content: {
        theory: `
          <h2>Digital Security and Privacy</h2>
          <p>Protecting your digital identity and information is crucial in today's connected world.</p>
          
          <h3>Password Security</h3>
          <ul>
            <li>Creating strong, unique passwords</li>
            <li>Using password managers</li>
            <li>Enabling two-factor authentication</li>
            <li>Regular password updates</li>
          </ul>
          
          <h3>Online Safety</h3>
          <ul>
            <li>Recognizing phishing attempts</li>
            <li>Safe downloading practices</li>
            <li>Secure online shopping</li>
            <li>Protecting personal information</li>
          </ul>
        `,
        practice: "Create strong passwords and enable two-factor authentication on your accounts.",
        notes: [
          {
            title: "Security Checklist",
            points: [
              "Use unique passwords for each account",
              "Keep software and systems updated",
              "Be cautious with public Wi-Fi",
              "Regularly review account activity"
            ]
          }
        ]
      },
      completed: false
    }
  ]
};

const Lesson = () => {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const [lesson, setLesson] = useState(null);
  const [currentSectionId, setCurrentSectionId] = useState(1);
  const [activeTab, setActiveTab] = useState('content');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [loading, setLoading] = useState(true);

  // Calculate progress
  const progress = useMemo(() => {
    if (!lesson) return 0;
    const completedSections = lesson.sections.filter(section => section.completed).length;
    return Math.round((completedSections / lesson.sections.length) * 100);
  }, [lesson]);

  const currentSection = useMemo(() => {
    if (!lesson) return null;
    return lesson.sections.find(section => section.id === currentSectionId);
  }, [lesson, currentSectionId]);

  const completedSections = useMemo(() => {
    if (!lesson) return 0;
    return lesson.sections.filter(section => section.completed).length;
  }, [lesson]);

  useEffect(() => {
    // Simulate API call
    const fetchLesson = async () => {
      setLoading(true);
      try {
        // In a real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 500));
        setLesson(mockLessonData);
      } catch (error) {
        console.error('Error fetching lesson:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLesson();
  }, [lessonId]);

  const handleSectionClick = (sectionId) => {
    setCurrentSectionId(sectionId);
    setActiveTab('content');
  };

  const handleMarkComplete = () => {
    if (!lesson || !currentSection) return;
    
    const updatedSections = lesson.sections.map(section => 
      section.id === currentSectionId 
        ? { ...section, completed: true }
        : section
    );
    
    setLesson({ ...lesson, sections: updatedSections });
  };

  const handleNextSection = () => {
    const currentIndex = lesson.sections.findIndex(s => s.id === currentSectionId);
    if (currentIndex < lesson.sections.length - 1) {
      setCurrentSectionId(lesson.sections[currentIndex + 1].id);
      setActiveTab('content');
    }
  };

  const handlePrevSection = () => {
    const currentIndex = lesson.sections.findIndex(s => s.id === currentSectionId);
    if (currentIndex > 0) {
      setCurrentSectionId(lesson.sections[currentIndex - 1].id);
      setActiveTab('content');
    }
  };

  const getSectionStatus = (section) => {
    if (section.completed) return 'completed';
    if (section.id === currentSectionId) return 'active';
    return 'pending';
  };

  const getSectionProgress = (section) => {
    if (section.completed) return 100;
    if (section.id === currentSectionId) return 50;
    return 0;
  };

  if (loading) {
    return (
      <div className="htb-lesson-container">
        <div className="htb-lesson-header">
          <div className="htb-header-content">
            <div className="htb-breadcrumb">
              <span>Loading...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="htb-lesson-container">
        <div className="htb-lesson-header">
          <div className="htb-header-content">
            <div className="htb-breadcrumb">
              <span>Lesson not found</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`htb-lesson-container ${!sidebarCollapsed ? 'sidebar-open' : ''}`}>
      {/* Header */}
      <header className="htb-lesson-header">
        <div className="htb-header-content">
          <nav className="htb-breadcrumb">
            <button 
              className="htb-breadcrumb-link"
              onClick={() => navigate('/courses')}
            >
              <i className="htb-breadcrumb-icon">🏠</i>
              Courses
            </button>
            <span className="htb-breadcrumb-separator">›</span>
            <button 
              className="htb-breadcrumb-link"
              onClick={() => navigate('/course/digital-literacy')}
            >
              <i className="htb-breadcrumb-icon">📚</i>
              Digital Literacy
            </button>
            <span className="htb-breadcrumb-separator">›</span>
            <span className="htb-breadcrumb-current">{lesson.title}</span>
          </nav>

          <div className="htb-lesson-meta">
            <div className="htb-progress-info">
              <div className="htb-progress-text">{progress}% Complete</div>
              <div className="htb-section-info">
                Section {currentSectionId} of {lesson.sections.length}
              </div>
            </div>
            <button 
              className="htb-sidebar-toggle"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              aria-label="Toggle sidebar"
            >
              {sidebarCollapsed ? '☰' : '✕'}
            </button>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="htb-progress-bar">
          <div 
            className="htb-progress-fill" 
            style={{ width: `${progress}%` }}
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="htb-lesson-main">
        {/* Sidebar */}
        <aside className={`htb-lesson-sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
          {/* Mobile overlay click handler */}
          <div 
            className="htb-sidebar-overlay"
            onClick={() => setSidebarCollapsed(true)}
            style={{ display: window.innerWidth <= 768 && !sidebarCollapsed ? 'block' : 'none' }}
          />
          <div className="htb-sidebar-content">
            <div className="htb-sidebar-header">
              <h3>{lesson.title}</h3>
              <div className="htb-sidebar-stats">
                <div className="htb-stat-item">
                  <i className="htb-stat-icon">📊</i>
                  <span>{completedSections}/{lesson.sections.length} completed</span>
                </div>
                <div className="htb-stat-item">
                  <i className="htb-stat-icon">⏱️</i>
                  <span>{lesson.estimatedTime}</span>
                </div>
                <div className="htb-stat-item">
                  <i className="htb-stat-icon">🎯</i>
                  <span className={`difficulty ${lesson.difficulty}`}>
                    {lesson.difficulty}
                  </span>
                </div>
              </div>
            </div>

            <div className="htb-section-list">
              {lesson.sections.map((section, index) => {
                const status = getSectionStatus(section);
                const sectionProgress = getSectionProgress(section);
                
                return (
                  <div
                    key={section.id}
                    className={`htb-section-item ${status}`}
                    onClick={() => handleSectionClick(section.id)}
                  >
                    <div className="htb-section-indicator">
                      <div className="htb-section-number">
                        {index + 1}
                      </div>
                      {section.completed && (
                        <div className="htb-completion-badge">✓</div>
                      )}
                    </div>
                    
                    <div className="htb-section-details">
                      <h4 className="htb-section-title">{section.title}</h4>
                      <p className="htb-section-subtitle">{section.subtitle}</p>
                      <div className="htb-section-progress">
                        <div 
                          className="htb-section-progress-fill"
                          style={{ width: `${sectionProgress}%` }}
                        />
                      </div>
                    </div>
                    
                    <div className="htb-section-status">
                      {status === 'completed' && (
                        <span className="htb-status-completed">✓</span>
                      )}
                      {status === 'active' && (
                        <span className="htb-status-active">▶</span>
                      )}
                      {status === 'pending' && (
                        <span className="htb-status-pending">○</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="htb-sidebar-actions">
              <button 
                className="htb-action-btn"
                onClick={handleMarkComplete}
                disabled={!currentSection || currentSection.completed}
              >
                <i className="htb-btn-icon">✓</i>
                {currentSection?.completed ? 'Completed' : 'Mark Complete'}
              </button>
            </div>
          </div>
        </aside>

        {/* Content Area */}
        <section className="htb-lesson-content">
          <div className="htb-content-header">
            <div className="htb-content-tabs">
              <button 
                className={`htb-tab ${activeTab === 'content' ? 'active' : ''}`}
                onClick={() => setActiveTab('content')}
              >
                <i className="htb-tab-icon">📖</i>
                Content
              </button>
              <button 
                className={`htb-tab ${activeTab === 'practice' ? 'active' : ''}`}
                onClick={() => setActiveTab('practice')}
              >
                <i className="htb-tab-icon">🎯</i>
                Practice
              </button>
              <button 
                className={`htb-tab ${activeTab === 'notes' ? 'active' : ''}`}
                onClick={() => setActiveTab('notes')}
              >
                <i className="htb-tab-icon">📝</i>
                Notes
              </button>
            </div>
          </div>

          <div className="htb-content-body">
            {activeTab === 'content' && currentSection && (
              <div className="htb-content-panel">
                <div 
                  dangerouslySetInnerHTML={{ __html: currentSection.content.theory }}
                />
                
                {/* Navigation */}
                <div className="htb-section-navigation">
                  <button 
                    className="htb-nav-btn htb-nav-prev"
                    onClick={handlePrevSection}
                    disabled={currentSectionId === 1}
                  >
                    <i>←</i> Previous
                  </button>
                  
                  <span className="htb-section-indicator">
                    {currentSectionId} / {lesson.sections.length}
                  </span>
                  
                  <button 
                    className="htb-nav-btn htb-nav-next"
                    onClick={handleNextSection}
                    disabled={currentSectionId === lesson.sections.length}
                  >
                    Next <i>→</i>
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'practice' && currentSection && (
              <div className="htb-practice-panel">
                <div className="htb-practice-header">
                  <h3>Practice Exercise</h3>
                  <p>Apply what you've learned in this interactive section.</p>
                </div>
                <div className="htb-practice-content">
                  <p>{currentSection.content.practice}</p>
                  <div className="htb-interactive-placeholder">
                    <div className="htb-placeholder-icon">🎯</div>
                    <p>Interactive exercises will be available here</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'notes' && currentSection && (
              <div className="htb-notes-panel">
                <div className="htb-notes-header">
                  <h3>Study Notes</h3>
                  <p>Key points and takeaways from this section.</p>
                </div>
                <div className="htb-notes-content">
                  {currentSection.content.notes.map((note, index) => (
                    <div key={index} className="htb-note-section">
                      <h4>{note.title}</h4>
                      <ul className="htb-key-points">
                        {note.points.map((point, pointIndex) => (
                          <li key={pointIndex}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Lesson;