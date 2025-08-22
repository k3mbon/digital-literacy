// Removed React Router dependency
import { grades } from '../data/topics';
import { ChevronRight, BookOpen, Code, Zap } from 'lucide-react';
import '../styles/LandingPage.css';

const LandingPage = ({ onNavigate }) => {
  return (
    <div className="landing-page">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-background">
          <div className="grid-pattern"></div>
          <div className="floating-elements">
            <div className="floating-element element-1"></div>
            <div className="floating-element element-2"></div>
            <div className="floating-element element-3"></div>
          </div>
        </div>
        
        <div className="hero-content">
          <div className="hero-badge">
            <Zap size={16} />
            <span>Digital Literacy & Assessment Platform</span>
          </div>
          
          <h1 className="hero-title">
            <span className="gradient-text">Super Cool Digital Literacy Lesson</span>
            <br />
            Master Digital Skills for the Future
          </h1>
          
          <p className="hero-description">
            Comprehensive digital literacy education with interactive learning,
            hands-on coding experiences, and real-world applications.
          </p>
          
          <div className="hero-stats">
            <div className="stat">
              <div className="stat-number">4</div>
              <div className="stat-label">Core Topics</div>
            </div>
            <div className="stat">
              <div className="stat-number">20+</div>
              <div className="stat-label">Subtopics</div>
            </div>
            <div className="stat">
              <div className="stat-number">3</div>
              <div className="stat-label">Grade Levels</div>
            </div>
          </div>
        </div>
      </div>

      {/* Grade Selection Section */}
      <div className="grade-selection">
        <div className="section-header">
          <h2>Choose Your Grade Level</h2>
          <p>Select your current grade to access tailored content and assessments</p>
        </div>
        
        <div className="grade-cards">
          {Object.values(grades).map((grade) => (
             <button 
               key={grade.level}
               onClick={() => onNavigate('grade', { gradeLevel: grade.level })}
               className="grade-card"
               style={{ '--grade-color': grade.color }}
             >
               <div className="grade-card-header">
                 <div className="grade-number">{grade.level}</div>
                 <ChevronRight className="grade-arrow" size={20} />
               </div>
               
               <div className="grade-content">
                 <h3>{grade.title}</h3>
                 <p>{grade.description}</p>
               </div>
              
              <div className="grade-features">
                <div className="feature">
                  <BookOpen size={16} />
                  <span>Interactive Lessons</span>
                </div>
                <div className="feature">
                  <Code size={16} />
                  <span>Coding Playground</span>
                </div>
                <div className="feature">
                  <Zap size={16} />
                  <span>Assessments</span>
                </div>
              </div>
              
              <div className="grade-card-glow"></div>
            </button>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="features-section">
        <div className="section-header">
          <h2>Why Choose Our Platform?</h2>
          <p>Experience the future of digital education</p>
        </div>
        
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <BookOpen size={24} />
            </div>
            <h3>Interactive Learning</h3>
            <p>Engage with dynamic content, visual examples, and step-by-step tutorials designed for modern learners.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">
              <Code size={24} />
            </div>
            <h3>Hands-on Coding</h3>
            <p>Practice programming concepts in our integrated playground with real-time feedback and guidance.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">
              <Zap size={24} />
            </div>
            <h3>Smart Assessments</h3>
            <p>Test your knowledge with adaptive quizzes and receive personalized feedback to track your progress.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;