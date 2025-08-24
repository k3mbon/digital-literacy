import React from 'react';
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
  
  // Create comprehensive notes summary from lesson data
  const createNotesFromLessonData = (data) => {
    if (!data) return null;
    
    const notes = {
      summary: {
        title: data.title || subtopic.title,
        description: data.description || subtopic.description,
        difficulty: data.difficulty || 'beginner',
        estimatedTime: data.estimatedTime || '30 minutes'
      },
      keyPoints: [],
      concepts: [],
      examples: [],
      vocabulary: data.vocabulary || [],
      practiceExercises: data.practiceExercises || []
    };
    
    // Extract key points from objectives
    if (data.objectives) {
      notes.keyPoints = data.objectives.map(obj => ({
        title: "Learning Objective",
        content: obj,
        type: "objective"
      }));
    }
    
    // Extract concepts from content
    if (data.content) {
      const contentText = data.content.replace(/<[^>]*>/g, ''); // Remove HTML tags
      const sections = contentText.split(/\n\s*\n/);
      
      sections.forEach((section, index) => {
        if (section.trim() && section.length > 50) {
          const lines = section.split('\n').filter(line => line.trim());
          if (lines.length > 0) {
            const title = lines[0].replace(/^#+\s*/, '').replace(/[🎯📝🌟💡🔍]/g, '').trim();
            const content = lines.slice(1).join(' ').trim();
            
            if (title && content) {
              notes.concepts.push({
                title: title,
                content: content,
                type: "concept"
              });
            }
          }
        }
      });
    }
    
    // Extract examples from interactive elements
    if (data.interactiveElements) {
      data.interactiveElements.forEach(element => {
        if (element.type === 'code-editor' || element.type === 'code-completion') {
          notes.examples.push({
            title: element.title,
            description: element.description,
            code: element.initialCode || element.code || element.solution,
            type: "code-example"
          });
        } else if (element.type === 'drag-drop' || element.type === 'ordering') {
          notes.examples.push({
            title: element.title,
            description: element.description,
            type: "interactive-example"
          });
        }
      });
    }
    
    return notes;
  };
  
  // Fallback content for subtopics not yet implemented
  const getFallbackContent = () => ({
    summary: {
      title: subtopic.title,
      description: subtopic.description,
      difficulty: 'beginner',
      estimatedTime: '30 minutes'
    },
    keyPoints: [
      {
        title: "Core Understanding",
        content: `Master the fundamental concepts of ${subtopic.title} and understand its importance in computer science.`,
        type: "objective"
      },
      {
        title: "Practical Application",
        content: `Learn how to apply ${subtopic.title} concepts in real-world programming scenarios.`,
        type: "objective"
      },
      {
        title: "Problem Solving",
        content: `Develop skills to solve problems using ${subtopic.title} techniques and best practices.`,
        type: "objective"
      }
    ],
    concepts: [
      {
        title: "Introduction",
        content: `${subtopic.title} is a fundamental concept in computer science that helps us understand how to structure and organize computational thinking. This topic covers essential principles and practical applications.`,
        type: "concept"
      },
      {
        title: "Key Benefits",
        content: "Understanding this concept helps improve problem-solving skills, enhances logical thinking, and provides a foundation for more advanced programming concepts.",
        type: "concept"
      },
      {
        title: "Real-World Applications",
        content: "This concept is widely used in software development, system design, data analysis, and various computational fields to create efficient and maintainable solutions.",
        type: "concept"
      }
    ],
    examples: [],
    vocabulary: [],
    practiceExercises: []
  });

  const notesContent = createNotesFromLessonData(lessonData) || getFallbackContent();

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
              <h1>{notesContent.summary.title}</h1>
              <p>{notesContent.summary.description}</p>
              
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
                  <span className="meta-value difficulty" style={{ color: getSectionColor(notesContent.summary.difficulty) }}>
                    {notesContent.summary.difficulty}
                  </span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Duration:</span>
                  <span className="meta-value">{notesContent.summary.estimatedTime}</span>
                </div>
              </div>
            </div>
        </div>
      </div>

      {/* Content */}
      <div className="notes-content">
        <div className="content-container">
          <div className="main-content">
            {/* Key Learning Points */}
            {notesContent.keyPoints && notesContent.keyPoints.length > 0 && (
              <div className="notes-section">
                <div className="section-header">
                  <div className="section-icon">
                    <Lightbulb size={20} />
                  </div>
                  <h2>🎯 Key Learning Points</h2>
                </div>
                <div className="key-points-grid">
                  {notesContent.keyPoints.map((point, index) => (
                    <div key={index} className="key-point-card">
                      <h4>{point.title}</h4>
                      <p>{point.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Core Concepts */}
            {notesContent.concepts && notesContent.concepts.length > 0 && (
              <div className="notes-section">
                <div className="section-header">
                  <div className="section-icon">
                    <BookOpen size={20} />
                  </div>
                  <h2>📚 Core Concepts</h2>
                </div>
                <div className="concepts-list">
                  {notesContent.concepts.map((concept, index) => (
                    <div key={index} className="concept-item">
                      <h3>{concept.title}</h3>
                      <p>{concept.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Code Examples */}
            {notesContent.examples && notesContent.examples.length > 0 && (
              <div className="notes-section">
                <div className="section-header">
                  <div className="section-icon">
                    <Code size={20} />
                  </div>
                  <h2>💻 Examples & Practice</h2>
                </div>
                <div className="examples-list">
                  {notesContent.examples.map((example, index) => (
                    <div key={index} className="example-item">
                      <h3>{example.title}</h3>
                      <p>{example.description}</p>
                      {example.code && (
                        <pre className="code-block">
                          <code>{example.code}</code>
                        </pre>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Vocabulary */}
            {notesContent.vocabulary && notesContent.vocabulary.length > 0 && (
              <div className="notes-section">
                <div className="section-header">
                  <div className="section-icon">
                    <FileText size={20} />
                  </div>
                  <h2>📖 Key Vocabulary</h2>
                </div>
                <div className="vocabulary-grid">
                  {notesContent.vocabulary.map((term, index) => (
                    <div key={index} className="vocabulary-card">
                      <h4>{term.term}</h4>
                      <p>{term.definition}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Practice Exercises */}
            {notesContent.practiceExercises && notesContent.practiceExercises.length > 0 && (
              <div className="notes-section">
                <div className="section-header">
                  <div className="section-icon">
                    <Play size={20} />
                  </div>
                  <h2>🏃‍♂️ Practice Exercises</h2>
                </div>
                <div className="exercises-list">
                  {notesContent.practiceExercises.map((exercise, index) => (
                    <div key={index} className="exercise-item">
                      <div className="exercise-header">
                        <h3>{exercise.title}</h3>
                        <span className={`difficulty-badge ${exercise.difficulty}`}>
                          {exercise.difficulty}
                        </span>
                      </div>
                      <p>{exercise.description}</p>
                      {exercise.hints && (
                        <div className="exercise-hints">
                          <h4>💡 Hints:</h4>
                          <ul>
                            {exercise.hints.map((hint, hintIndex) => (
                              <li key={hintIndex}>{hint}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Study Tips */}
            <div className="notes-section">
              <div className="section-header">
                <div className="section-icon">
                  <Lightbulb size={20} />
                </div>
                <h2>💡 Study Tips</h2>
              </div>
              <div className="study-tips">
                <div className="tip-card">
                  <h4>📝 Take Notes</h4>
                  <p>Write down key concepts in your own words to reinforce understanding.</p>
                </div>
                <div className="tip-card">
                  <h4>🔄 Practice Regularly</h4>
                  <p>Apply these concepts through coding exercises and real-world projects.</p>
                </div>
                <div className="tip-card">
                  <h4>🤝 Discuss & Share</h4>
                  <p>Explain concepts to others to deepen your own understanding.</p>
                </div>
                <div className="tip-card">
                  <h4>🔍 Explore Further</h4>
                  <p>Look for additional resources and examples to expand your knowledge.</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="content-sidebar">
            <div className="sidebar-section">
              <h3>Notes Overview</h3>
              <div className="lesson-outline">
                {notesContent.keyPoints && notesContent.keyPoints.length > 0 && (
                  <div className="outline-item">
                    <div className="outline-dot" style={{ backgroundColor: '#f59e0b' }}></div>
                    <span>Key Learning Points ({notesContent.keyPoints.length})</span>
                  </div>
                )}
                {notesContent.concepts && notesContent.concepts.length > 0 && (
                  <div className="outline-item">
                    <div className="outline-dot" style={{ backgroundColor: '#3b82f6' }}></div>
                    <span>Core Concepts ({notesContent.concepts.length})</span>
                  </div>
                )}
                {notesContent.examples && notesContent.examples.length > 0 && (
                  <div className="outline-item">
                    <div className="outline-dot" style={{ backgroundColor: '#8b5cf6' }}></div>
                    <span>Examples & Practice ({notesContent.examples.length})</span>
                  </div>
                )}
                {notesContent.vocabulary && notesContent.vocabulary.length > 0 && (
                  <div className="outline-item">
                    <div className="outline-dot" style={{ backgroundColor: '#10b981' }}></div>
                    <span>Key Vocabulary ({notesContent.vocabulary.length})</span>
                  </div>
                )}
                {notesContent.practiceExercises && notesContent.practiceExercises.length > 0 && (
                  <div className="outline-item">
                    <div className="outline-dot" style={{ backgroundColor: '#ef4444' }}></div>
                    <span>Practice Exercises ({notesContent.practiceExercises.length})</span>
                  </div>
                )}
                <div className="outline-item">
                  <div className="outline-dot" style={{ backgroundColor: '#f59e0b' }}></div>
                  <span>Study Tips (4)</span>
                </div>
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
              <h3>Quick Tips</h3>
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