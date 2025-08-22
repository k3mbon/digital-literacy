import { ArrowLeft, BookOpen, Play, TestTube, Clock, Award, ChevronRight, FileText } from 'lucide-react';
import { grades, topics, getDifficultyColor } from '../data/topics';
import { getLessonContent, getLessonMetadata } from '../data/lessonLoader';
import '../styles/TopicPage.css';

const TopicPage = ({ onNavigate, gradeLevel, topicId }) => {
  const grade = grades[gradeLevel];
  const topic = topics[topicId];
  
  if (!grade || !topic) {
    return <div>Topic not found</div>;
  }

  const getDifficultyIcon = (difficulty) => {
    switch (difficulty) {
      case 'beginner': return '🟢';
      case 'intermediate': return '🟡';
      case 'advanced': return '🔴';
      default: return '⚪';
    }
  };

  const getTopicIcon = (topicId) => {
    const iconMap = {
      '1': new URL('../assets/icons/computational-thinking.svg', import.meta.url).href,
      '2': new URL('../assets/icons/managing-data.svg', import.meta.url).href,
      '3': new URL('../assets/icons/networks-communications.svg', import.meta.url).href,
      '4': new URL('../assets/icons/computer-systems.svg', import.meta.url).href,
      '5': new URL('../assets/icons/computer-systems.svg', import.meta.url).href
    };
    return iconMap[topicId] || new URL('../assets/icons/computational-thinking.svg', import.meta.url).href;
  };

  const getSubtopicIcon = (topicId, subtopicId) => {
    const iconMap = {
      '1': {
        '1.1': new URL('../assets/icons/subtopic-1-1-pseudocode.svg', import.meta.url).href,
        '1.2': new URL('../assets/icons/subtopic-1-2-selection.svg', import.meta.url).href,
        '1.3': new URL('../assets/icons/subtopic-1-3-searching.svg', import.meta.url).href,
        '1.4': new URL('../assets/icons/subtopic-1-4-conditional.svg', import.meta.url).href,
        '1.5': new URL('../assets/icons/subtopic-1-5-data.svg', import.meta.url).href,
        '1.6': new URL('../assets/icons/subtopic-1-6-library.svg', import.meta.url).href,
        '1.7': new URL('../assets/icons/subtopic-1-7-software-dev.svg', import.meta.url).href,
        '1.8': new URL('../assets/icons/subtopic-1-8-physical-computing.svg', import.meta.url).href
      },
      '2': {
        '2.1': new URL('../assets/icons/subtopic-2-1-modelling.svg', import.meta.url).href,
        '2.2': new URL('../assets/icons/subtopic-2-2-databases.svg', import.meta.url).href
      },
      '3': {
        '3.1': new URL('../assets/icons/subtopic-3-1-network-types.svg', import.meta.url).href,
        '3.2': new URL('../assets/icons/subtopic-3-2-data-security.svg', import.meta.url).href
      },
      '5': {
        '5.1': new URL('../assets/icons/subtopic-4-1-architecture.svg', import.meta.url).href,
        '5.2': new URL('../assets/icons/subtopic-4-2-operating-systems.svg', import.meta.url).href,
        '5.3': new URL('../assets/icons/subtopic-4-3-input-output.svg', import.meta.url).href,
        '5.4': new URL('../assets/icons/subtopic-4-4-storage.svg', import.meta.url).href,
        '5.5': new URL('../assets/icons/subtopic-4-5-performance.svg', import.meta.url).href
      }
    };
    return iconMap[topicId]?.[subtopicId] || new URL('../assets/icons/computational-thinking.svg', import.meta.url).href;
  };

  return (
    <div className="topic-page">
      {/* Header */}
      <div className="topic-header">
        <div className="header-background">
          <div className="tech-grid"></div>
          <div className="floating-particles">
            {[...Array(6)].map((_, i) => (
              <div key={i} className={`particle particle-${i + 1}`}></div>
            ))}
          </div>
        </div>
        
        <div className="header-content">
          <button onClick={() => onNavigate('grade', { gradeLevel })} className="back-button">
            <ArrowLeft size={20} />
            <span>Back to {grade.title}</span>
          </button>
          
          <div className="topic-info">
            <div className="topic-icon">
              <img src={getTopicIcon(topicId)} alt={topic.title} className="topic-icon-svg" />
            </div>
            <div className="topic-details">
              <h1>{topic.title}</h1>
              <p>Master the fundamentals and advanced concepts</p>
              <div className="topic-meta">
                <div className="meta-item">
                  <BookOpen size={16} />
                  <span>{Object.keys(topic.subtopics).length} Subtopics</span>
                </div>
                <div className="meta-item">
                  <Clock size={16} />
                  <span>~{Object.keys(topic.subtopics).length * 30} minutes</span>
                </div>
                <div className="meta-item">
                  <Award size={16} />
                  <span>{grade.title}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Subtopics Grid */}
      <div className="subtopics-section">
        <div className="section-header">
          <h2>Learning Modules</h2>
          <p>Each module includes comprehensive notes, interactive playground, and assessment</p>
        </div>
        
        <div className="subtopics-grid">
          {Object.values(topic.subtopics).map((subtopic, index) => {
            return (
              <div key={subtopic.id} className="subtopic-card">
                <div className="card-header">
                  <div className="subtopic-icon-container">
                    <img src={getSubtopicIcon(topicId, subtopic.id)} alt={subtopic.title} className="subtopic-icon" />
                    <div className="subtopic-number">
                      {index + 1}
                    </div>
                  </div>
                  <div className="difficulty-badge" style={{ backgroundColor: getDifficultyColor(subtopic.difficulty) }}>
                    {getDifficultyIcon(subtopic.difficulty)}
                    <span>{subtopic.difficulty}</span>
                  </div>
                </div>
                
                <div className="card-content">
                  <h3>{subtopic.title}</h3>
                  <p>{subtopic.description}</p>
                </div>
                
                <div className="card-actions">
                  {getLessonContent(subtopic.id) && (
                    <button 
                      onClick={() => onNavigate('lesson', { gradeLevel, topicId, subtopicId: subtopic.id })}
                      className="action-btn lesson"
                    >
                      <FileText size={14} />
                      <span>Lesson</span>
                    </button>
                  )}
                  <button 
                    onClick={() => onNavigate('notes', { gradeLevel, topicId, subtopicId: subtopic.id })}
                    className="action-btn notes"
                  >
                    <BookOpen size={14} />
                    <span>Notes</span>
                  </button>
                  
                  <button 
                    onClick={() => onNavigate('playground', { gradeLevel, topicId, subtopicId: subtopic.id })}
                    className="action-btn playground"
                  >
                    <Play size={14} />
                    <span>Playground</span>
                  </button>
                  
                  <button 
                    onClick={() => onNavigate('assessment', { gradeLevel, topicId, subtopicId: subtopic.id })}
                    className="action-btn assessment"
                  >
                    <TestTube size={14} />
                    <span>Test</span>
                  </button>
                </div>
              
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '0%' }}></div>
              </div>
              
              <div className="card-glow" style={{ '--glow-color': topic.color }}></div>
            </div>
          );
        })}
        </div>
      </div>

      {/* Learning Path Visualization */}
      <div className="learning-path-section">
        <div className="section-header">
          <h2>Your Learning Path</h2>
          <p>Follow the recommended sequence for optimal understanding</p>
        </div>
        
        <div className="path-visualization">
          <div className="path-line"></div>
          {Object.values(topic.subtopics).map((subtopic, index) => (
            <div key={subtopic.id} className="path-node">
              <div className="node-connector" style={{ backgroundColor: getDifficultyColor(subtopic.difficulty) }}>
                <span>{index + 1}</span>
              </div>
              <div className="node-content">
                <h4>{subtopic.title}</h4>
                <div className="node-actions">
                  <button 
                    onClick={() => onNavigate('notes', { gradeLevel, topicId, subtopicId: subtopic.id })}
                    className="node-action"
                  >
                    <BookOpen size={14} />
                    <span>Study</span>
                    <ChevronRight size={14} />
                  </button>
                  <button 
                    onClick={() => onNavigate('playground', { gradeLevel, topicId, subtopicId: subtopic.id })}
                    className="node-action"
                  >
                    <Play size={14} />
                    <span>Practice</span>
                    <ChevronRight size={14} />
                  </button>
                  <button 
                    onClick={() => onNavigate('assessment', { gradeLevel, topicId, subtopicId: subtopic.id })}
                    className="node-action"
                  >
                    <TestTube size={14} />
                    <span>Test</span>
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Start Section */}
      <div className="quick-start-section">
        <div className="quick-start-card">
          <div className="quick-start-content">
            <h3>Ready to Begin?</h3>
            <p>Start with the first subtopic and work your way through each module systematically.</p>
            <button 
              onClick={() => onNavigate('notes', { gradeLevel, topicId, subtopicId: Object.values(topic.subtopics)[0].id })}
              className="start-button"
              style={{ backgroundColor: topic.color }}
            >
              <Play size={20} />
              <span>Start Learning</span>
              <ChevronRight size={20} />
            </button>
          </div>
          <div className="quick-start-visual">
            <div className="visual-element" style={{ backgroundColor: topic.color }}></div>
            <div className="visual-element" style={{ backgroundColor: topic.color, opacity: 0.7 }}></div>
            <div className="visual-element" style={{ backgroundColor: topic.color, opacity: 0.4 }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopicPage;