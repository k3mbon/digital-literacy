import { ArrowLeft, BookOpen, Play, TestTube, ChevronRight, Lightbulb, Code, FileText } from 'lucide-react';
import { grades, topics } from '../data/topics';
import { getLessonContent } from '../data/lessonLoader';
import { InteractiveStory, InteractiveList, InteractiveCodeExample, InteractiveQuiz } from '../components/InteractiveLessonComponents';
import '../styles/CourseNotes.css';

const CourseNotes = ({ onNavigate, gradeLevel, topicId, subtopicId }) => {
  const grade = grades[gradeLevel];
  const topic = topics[topicId];
  const subtopic = topic?.subtopics[subtopicId];
  
  if (!grade || !topic || !subtopic) {
    return <div>Content not found</div>;
  }

  // Get lesson content from the comprehensive lesson content file
  const lessonData = getLessonContent(subtopicId);
  
  // Fallback content for subtopics not yet implemented
  const getFallbackContent = () => ({
    sections: [
      {
        title: "Introduction",
        content: `Welcome to ${subtopic.title}! This comprehensive guide will help you understand the fundamental concepts and practical applications.`,
        type: "definition"
      },
      {
        title: "Key Concepts",
        content: "• Understanding the basics\n• Practical applications\n• Real-world examples\n• Best practices and guidelines",
        type: "list"
      },
      {
        title: "Learning Objectives",
        content: "By the end of this lesson, you will be able to:\n1. Understand core concepts\n2. Apply knowledge practically\n3. Solve related problems\n4. Explain concepts to others",
        type: "tips"
      }
    ]
  });

  const content = lessonData || getFallbackContent();

  const getSectionIcon = (type) => {
    switch (type) {
      case 'definition': return <BookOpen size={20} />;
      case 'list': return <FileText size={20} />;
      case 'code': return <Code size={20} />;
      case 'tips': return <Lightbulb size={20} />;
      default: return <BookOpen size={20} />;
    }
  };

  const getSectionColor = (type) => {
    switch (type) {
      case 'definition': return '#3b82f6';
      case 'list': return '#10b981';
      case 'code': return '#8b5cf6';
      case 'tips': return '#f59e0b';
      default: return '#6b7280';
    }
  };

  return (
    <div className="course-notes">
      {/* Header */}
      <div className="notes-header">
        <div className="header-background">
          <div className="knowledge-pattern"></div>
        </div>
        
        <div className="header-content">
          <button onClick={() => onNavigate('topic', { gradeLevel, topicId })} className="back-button">
            <ArrowLeft size={20} />
            <span>Back to {topic.title}</span>
          </button>
          
          <div className="lesson-info">
            <div className="lesson-badge">
              <BookOpen size={16} />
              <span>Course Notes</span>
            </div>
            <h1>{subtopic.title}</h1>
            <p>{subtopic.description}</p>
            
            <div className="lesson-meta">
              <div className="meta-item">
                <span className="meta-label">Topic:</span>
                <span className="meta-value">{topic.title}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Grade:</span>
                <span className="meta-value">{grade.title}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Difficulty:</span>
                <span className="meta-value difficulty" style={{ color: getSectionColor(subtopic.difficulty) }}>
                  {subtopic.difficulty}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="notes-content">
        <div className="content-container">
          <div className="main-content">
            {/* Display lesson objectives if available */}
            {lessonData && lessonData.objectives && (
              <div className="lesson-objectives">
                <h3>🎯 Learning Objectives</h3>
                <ul>
                  {lessonData.objectives.map((objective, index) => (
                    <li key={index}>{objective}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* Render sections with interactive components */}
            {content.sections ? content.sections.map((section, index) => (
              <div key={index} className="content-section" style={{ '--section-color': getSectionColor(section.type) }}>
                <div className="section-header">
                  <div className="section-icon">
                    {getSectionIcon(section.type)}
                  </div>
                  <h2>{section.title}</h2>
                </div>
                
                <div className="section-content">
                  {section.type === 'code' ? (
                    <pre className="code-block">
                      <code>{section.content}</code>
                    </pre>
                  ) : (
                    <div className="text-content">
                      {section.content.split('\n').map((line, lineIndex) => (
                        <p key={lineIndex}>{line}</p>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="section-glow"></div>
              </div>
            )) : (
              // Render interactive lesson content if available
              lessonData && lessonData.sections && lessonData.sections.map((section, index) => (
                <div key={index} className="interactive-section">
                  {section.type === 'story' && (
                    <InteractiveStory 
                      story={section.content.story}
                      definition={section.content.definition}
                      analogy={section.content.analogy}
                    />
                  )}
                  
                  {section.type === 'interactive_list' && (
                    <div>
                      <h3>{section.title}</h3>
                      <InteractiveList items={section.content.items} />
                    </div>
                  )}
                  
                  {section.type === 'interactive_example' && (
                    <div>
                      <h3>{section.title}</h3>
                      <InteractiveCodeExample 
                        title={section.content.title}
                        code={section.content.code}
                        steps={section.content.steps}
                      />
                    </div>
                  )}
                  
                  {section.type === 'guided_practice' && section.content.quiz && (
                    <div>
                      <h3>{section.title}</h3>
                      <p>{section.content.description}</p>
                      <InteractiveQuiz 
                        questions={section.content.quiz.questions}
                        onComplete={(score, total) => {
                          console.log(`Quiz completed: ${score}/${total}`);
                        }}
                      />
                    </div>
                  )}
                  
                  {/* Fallback for other section types */}
                  {!['story', 'interactive_list', 'interactive_example', 'guided_practice'].includes(section.type) && (
                    <div className="content-section" style={{ '--section-color': getSectionColor(section.type) }}>
                      <div className="section-header">
                        <div className="section-icon">
                          {getSectionIcon(section.type)}
                        </div>
                        <h2>{section.title}</h2>
                      </div>
                      <div className="section-content">
                        <div className="text-content">
                          {typeof section.content === 'string' ? (
                            section.content.split('\n').map((paragraph, i) => (
                              <p key={i}>{paragraph}</p>
                            ))
                          ) : (
                            <p>{section.content.description || 'Content not available'}</p>
                          )}
                        </div>
                      </div>
                      <div className="section-glow"></div>
                    </div>
                  )}
                </div>
              ))
            )}
            
            {/* Interactive Elements */}
            <div className="interactive-section">
              <h3>💡 Quick Check</h3>
              <div className="quick-check">
                <p>Test your understanding of the concepts covered in this lesson.</p>
                <div className="check-questions">
                  <div className="question-item">
                    <span>Can you explain the main concept in your own words?</span>
                  </div>
                  <div className="question-item">
                    <span>How would you apply this in a real-world scenario?</span>
                  </div>
                  <div className="question-item">
                    <span>What are the key benefits of this approach?</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="content-sidebar">
            <div className="sidebar-section">
              <h3>In This Lesson</h3>
              <div className="lesson-outline">
                {content.sections.map((section, index) => (
                  <div key={index} className="outline-item">
                    <div className="outline-dot" style={{ backgroundColor: getSectionColor(section.type) }}></div>
                    <span>{section.title}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="sidebar-section">
              <h3>Next Steps</h3>
              <div className="next-actions">
                <button 
                  onClick={() => onNavigate('playground', { gradeLevel, topicId, subtopicId })}
                  className="action-link playground"
                >
                  <Play size={16} />
                  <span>Try Playground</span>
                  <ChevronRight size={16} />
                </button>
                
                <button 
                  onClick={() => onNavigate('assessment', { gradeLevel, topicId, subtopicId })}
                  className="action-link assessment"
                >
                  <TestTube size={16} />
                  <span>Take Assessment</span>
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
            
            <div className="sidebar-section">
              <h3>Study Tips</h3>
              <div className="study-tips">
                <div className="tip-item">
                  <Lightbulb size={14} />
                  <span>Take notes while reading</span>
                </div>
                <div className="tip-item">
                  <Lightbulb size={14} />
                  <span>Practice with examples</span>
                </div>
                <div className="tip-item">
                  <Lightbulb size={14} />
                  <span>Test your understanding</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="notes-footer">
        <div className="footer-content">
          <div className="progress-info">
            <span>Lesson Progress</span>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: '100%' }}></div>
            </div>
          </div>
          
          <div className="footer-actions">
            <button 
              onClick={() => onNavigate('playground', { gradeLevel, topicId, subtopicId })}
              className="footer-button primary"
            >
              <Play size={16} />
              <span>Continue to Playground</span>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseNotes;