import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, Play, TestTube, Clock, Award, ChevronRight } from 'lucide-react';
import { grades, topics, getDifficultyColor } from '../data/topics';
import '../styles/TopicPage.css';

const TopicPage = () => {
  const { gradeLevel, topicId } = useParams();
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
          <Link to={`/grade/${gradeLevel}`} className="back-button">
            <ArrowLeft size={20} />
            <span>Back to {grade.title}</span>
          </Link>
          
          <div className="topic-info">
            <div className="topic-icon" style={{ backgroundColor: topic.color }}>
              {topic.icon === 'cpu' && '💻'}
              {topic.icon === 'database' && '🗄️'}
              {topic.icon === 'network' && '🌐'}
              {topic.icon === 'monitor' && '🖥️'}
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
          {Object.values(topic.subtopics).map((subtopic, index) => (
            <div key={subtopic.id} className="subtopic-card">
              <div className="card-header">
                <div className="subtopic-number">
                  {index + 1}
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
                <Link 
                  to={`/grade/${gradeLevel}/topic/${topicId}/subtopic/${subtopic.id}/notes`}
                  className="action-btn notes"
                >
                  <BookOpen size={16} />
                  <span>Notes</span>
                </Link>
                
                <Link 
                  to={`/grade/${gradeLevel}/topic/${topicId}/subtopic/${subtopic.id}/playground`}
                  className="action-btn playground"
                >
                  <Play size={16} />
                  <span>Playground</span>
                </Link>
                
                <Link 
                  to={`/grade/${gradeLevel}/topic/${topicId}/subtopic/${subtopic.id}/assessment`}
                  className="action-btn assessment"
                >
                  <TestTube size={16} />
                  <span>Test</span>
                </Link>
              </div>
              
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '0%' }}></div>
              </div>
              
              <div className="card-glow" style={{ '--glow-color': topic.color }}></div>
            </div>
          ))}
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
                  <Link 
                    to={`/grade/${gradeLevel}/topic/${topicId}/subtopic/${subtopic.id}/notes`}
                    className="node-action"
                  >
                    <BookOpen size={14} />
                    <span>Study</span>
                    <ChevronRight size={14} />
                  </Link>
                  <Link 
                    to={`/grade/${gradeLevel}/topic/${topicId}/subtopic/${subtopic.id}/playground`}
                    className="node-action"
                  >
                    <Play size={14} />
                    <span>Practice</span>
                    <ChevronRight size={14} />
                  </Link>
                  <Link 
                    to={`/grade/${gradeLevel}/topic/${topicId}/subtopic/${subtopic.id}/assessment`}
                    className="node-action"
                  >
                    <TestTube size={14} />
                    <span>Test</span>
                    <ChevronRight size={14} />
                  </Link>
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
            <Link 
              to={`/grade/${gradeLevel}/topic/${topicId}/subtopic/${Object.values(topic.subtopics)[0].id}/notes`}
              className="start-button"
              style={{ backgroundColor: topic.color }}
            >
              <Play size={20} />
              <span>Start Learning</span>
              <ChevronRight size={20} />
            </Link>
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