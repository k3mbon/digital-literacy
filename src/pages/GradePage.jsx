import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ChevronRight, BookOpen, Play, TestTube } from 'lucide-react';
import { grades, topics } from '../data/topics';
import '../styles/GradePage.css';

const GradePage = () => {
  const { gradeLevel } = useParams();
  const grade = grades[gradeLevel];
  
  if (!grade) {
    return <div>Grade not found</div>;
  }

  return (
    <div className="grade-page">
      {/* Header */}
      <div className="grade-header">
        <div className="header-background">
          <div className="circuit-pattern"></div>
        </div>
        
        <div className="header-content">
          <Link to="/" className="back-button">
            <ArrowLeft size={20} />
            <span>Back to Home</span>
          </Link>
          
          <div className="grade-info">
            <div className="grade-badge" style={{ backgroundColor: grade.color }}>
              {grade.level}
            </div>
            <div className="grade-details">
              <h1>{grade.title}</h1>
              <p>{grade.description}</p>
            </div>
          </div>
          
          <div className="progress-stats">
            <div className="stat">
              <div className="stat-value">{Object.keys(topics).length}</div>
              <div className="stat-label">Topics Available</div>
            </div>
            <div className="stat">
              <div className="stat-value">
                {Object.values(topics).reduce((acc, topic) => acc + Object.keys(topic.subtopics).length, 0)}
              </div>
              <div className="stat-label">Total Lessons</div>
            </div>
          </div>
        </div>
      </div>

      {/* Topics Grid */}
      <div className="topics-section">
        <div className="section-header">
          <h2>Choose a Topic to Begin</h2>
          <p>Explore comprehensive lessons, interactive activities, and assessments</p>
        </div>
        
        <div className="topics-grid">
          {Object.values(topics).map((topic) => (
            <div key={topic.id} className="topic-card" style={{ '--topic-color': topic.color }}>
              <div className="topic-header">
                <div className="topic-icon">
                  <div className="icon-placeholder" style={{ backgroundColor: topic.color }}>
                    {topic.icon === 'cpu' && '💻'}
                    {topic.icon === 'database' && '🗄️'}
                    {topic.icon === 'network' && '🌐'}
                    {topic.icon === 'monitor' && '🖥️'}
                  </div>
                </div>
                <div className="topic-info">
                  <h3>{topic.title}</h3>
                  <div className="subtopic-count">
                    {Object.keys(topic.subtopics).length} subtopics
                  </div>
                </div>
              </div>
              
              <div className="subtopics-preview">
                {Object.values(topic.subtopics).slice(0, 3).map((subtopic) => (
                  <div key={subtopic.id} className="subtopic-preview">
                    <div className="subtopic-dot"></div>
                    <span>{subtopic.title}</span>
                  </div>
                ))}
                {Object.keys(topic.subtopics).length > 3 && (
                  <div className="subtopic-preview more">
                    <div className="subtopic-dot"></div>
                    <span>+{Object.keys(topic.subtopics).length - 3} more</span>
                  </div>
                )}
              </div>
              
              <div className="topic-actions">
                <Link 
                  to={`/grade/${gradeLevel}/topic/${topic.id}`}
                  className="action-button primary"
                >
                  <BookOpen size={16} />
                  <span>Start Learning</span>
                  <ChevronRight size={16} />
                </Link>
              </div>
              
              <div className="topic-glow"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Learning Path */}
      <div className="learning-path">
        <div className="section-header">
          <h2>Your Learning Journey</h2>
          <p>Follow the recommended path for optimal learning experience</p>
        </div>
        
        <div className="path-container">
          <div className="path-line"></div>
          {Object.values(topics).map((topic, index) => (
            <div key={topic.id} className="path-step">
              <div className="step-connector" style={{ backgroundColor: topic.color }}>
                <div className="step-number">{index + 1}</div>
              </div>
              <div className="step-content">
                <h4>{topic.title}</h4>
                <p>Master {Object.keys(topic.subtopics).length} essential concepts</p>
                <div className="step-features">
                  <div className="feature">
                    <BookOpen size={14} />
                    <span>Interactive Lessons</span>
                  </div>
                  <div className="feature">
                    <Play size={14} />
                    <span>Hands-on Practice</span>
                  </div>
                  <div className="feature">
                    <TestTube size={14} />
                    <span>Knowledge Tests</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GradePage;