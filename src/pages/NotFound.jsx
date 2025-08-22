import { Home, ArrowLeft, Search, BookOpen } from 'lucide-react';
import '../styles/NotFound.css';

const NotFound = ({ onNavigate }) => {
  return (
    <div className="not-found-page">
      {/* Animated Background */}
      <div className="not-found-background">
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
          <div className="shape shape-4"></div>
        </div>
        <div className="grid-overlay"></div>
      </div>

      <div className="not-found-content">
        {/* 404 SVG Illustration */}
        <div className="error-illustration">
          <svg width="300" height="200" viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="errorGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3B82F6"/>
                <stop offset="100%" stopColor="#8B5CF6"/>
              </linearGradient>
              <linearGradient id="screenGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1F2937"/>
                <stop offset="100%" stopColor="#374151"/>
              </linearGradient>
            </defs>
            
            {/* Computer Monitor */}
            <rect x="50" y="40" width="200" height="120" rx="8" fill="url(#screenGradient)" stroke="#6B7280" strokeWidth="2"/>
            <rect x="60" y="50" width="180" height="100" rx="4" fill="#111827"/>
            
            {/* Monitor Stand */}
            <rect x="140" y="160" width="20" height="20" fill="#6B7280"/>
            <rect x="120" y="180" width="60" height="8" rx="4" fill="#6B7280"/>
            
            {/* 404 Text on Screen */}
            <text x="150" y="90" textAnchor="middle" fontSize="24" fontWeight="bold" fill="url(#errorGradient)">404</text>
            <text x="150" y="110" textAnchor="middle" fontSize="8" fill="#9CA3AF">PAGE NOT FOUND</text>
            
            {/* Error Lines */}
            <g stroke="#EF4444" strokeWidth="2" fill="none">
              <path d="M70 120 L90 140" opacity="0.7">
                <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite"/>
              </path>
              <path d="M90 120 L70 140" opacity="0.7">
                <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite"/>
              </path>
              <path d="M210 120 L230 140" opacity="0.7">
                <animate attributeName="opacity" values="0.3;1;0.3" dur="1.5s" repeatCount="indefinite"/>
              </path>
              <path d="M230 120 L210 140" opacity="0.7">
                <animate attributeName="opacity" values="1;0.3;1" dur="1.5s" repeatCount="indefinite"/>
              </path>
            </g>
            
            {/* Floating Question Marks */}
            <g fill="#F59E0B" fontSize="16" fontWeight="bold">
              <text x="30" y="30">?
                <animateTransform attributeName="transform" type="translate" values="0,0; 0,-10; 0,0" dur="3s" repeatCount="indefinite"/>
              </text>
              <text x="270" y="40">?
                <animateTransform attributeName="transform" type="translate" values="0,0; 0,-8; 0,0" dur="2.5s" repeatCount="indefinite"/>
              </text>
              <text x="20" y="180">?
                <animateTransform attributeName="transform" type="translate" values="0,0; 0,-12; 0,0" dur="3.5s" repeatCount="indefinite"/>
              </text>
            </g>
          </svg>
        </div>

        {/* Error Message */}
        <div className="error-message">
          <h1 className="error-title">
            <span className="gradient-text">Oops!</span> Page Not Found
          </h1>
          <p className="error-description">
            The page you're looking for seems to have wandered off into the digital void. 
            Don't worry though - let's get you back on track to mastering those digital skills!
          </p>
        </div>

        {/* Action Buttons */}
        <div className="error-actions">
          <button onClick={() => onNavigate('landing')} className="btn btn-primary">
            <Home size={20} />
            <span>Back to Home</span>
          </button>
          
          <button 
            onClick={() => window.history.back()} 
            className="btn btn-secondary"
          >
            <ArrowLeft size={20} />
            <span>Go Back</span>
          </button>
        </div>

        {/* Quick Links */}
        <div className="quick-links">
          <h3>Popular Learning Paths:</h3>
          <div className="links-grid">
            <button onClick={() => onNavigate('grade', { gradeLevel: '7' })} className="quick-link">
              <BookOpen size={16} />
              <span>Grade 7 - Digital Basics</span>
            </button>
            <button onClick={() => onNavigate('grade', { gradeLevel: '8' })} className="quick-link">
              <BookOpen size={16} />
              <span>Grade 8 - Intermediate Skills</span>
            </button>
            <button onClick={() => onNavigate('grade', { gradeLevel: '9' })} className="quick-link">
              <BookOpen size={16} />
              <span>Grade 9 - Advanced Concepts</span>
            </button>
          </div>
        </div>

        {/* Fun Fact */}
        <div className="fun-fact">
          <div className="fact-icon">💡</div>
          <p>
            <strong>Did you know?</strong> The first 404 error was discovered at CERN in 1992. 
            Now you're part of internet history!
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;