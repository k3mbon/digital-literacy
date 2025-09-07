import React, { useState, useEffect } from 'react';
import { ArrowLeft, BookOpen, Trophy, Target, Users, Clock, BarChart3 } from 'lucide-react';
import EnhancedQuestionGenerator from '../utils/EnhancedQuestionGenerator';
import { topics } from '../data/topics';
import '../styles/QuizSystemOverview.css';

const QuizSystemOverview = ({ onNavigate }) => {
  const [stats, setStats] = useState({
    totalSubtopics: 0,
    totalQuestions: 0,
    quizTypes: 10,
    gradelevels: 3
  });

  const [questionGenerator] = useState(new EnhancedQuestionGenerator());

  useEffect(() => {
    // Calculate statistics
    let subtopicCount = 0;
    Object.values(topics).forEach(topic => {
      subtopicCount += Object.keys(topic.subtopics).length;
    });

    setStats({
      totalSubtopics: subtopicCount,
      totalQuestions: subtopicCount * 10 * 20 * 3, // subtopics × types × questions × grades
      quizTypes: 10,
      gradelevels: 3
    });
  }, []);

  const quizTypes = [
    { id: 'TYPE_A', name: 'Multiple Choice', icon: '⚪', description: '4-option questions with single correct answer' },
    { id: 'TYPE_B', name: 'True/False', icon: '✓', description: 'Binary choice questions' },
    { id: 'TYPE_C', name: 'Fill in the Blank', icon: '📝', description: 'Complete sentences with missing words' },
    { id: 'TYPE_D', name: 'Ordering/Sequencing', icon: '🔢', description: 'Arrange items in correct order' },
    { id: 'TYPE_E', name: 'Matching', icon: '🔗', description: 'Connect related items from two columns' },
    { id: 'TYPE_F', name: 'Code Completion', icon: '💻', description: 'Complete programming code snippets' },
    { id: 'TYPE_G', name: 'Scenario-Based', icon: '🎭', description: 'Real-world problem-solving scenarios' },
    { id: 'TYPE_H', name: 'Drag and Drop', icon: '🖱️', description: 'Interactive element placement' },
    { id: 'TYPE_I', name: 'Hotspot/Click', icon: '🎯', description: 'Click on correct areas of images' },
    { id: 'TYPE_J', name: 'Multi-Select', icon: '☑️', description: 'Choose multiple correct answers' }
  ];

  const gradeFeatures = [
    {
      grade: 7,
      title: 'Grade 7 - Foundation',
      color: '#EF4444',
      features: [
        'Basic vocabulary and concepts',
        'Simple, clear explanations',
        'Introductory difficulty level',
        'Extra time allowance (1.5x)',
        'Focus on Remember & Understand (Bloom\'s)'
      ]
    },
    {
      grade: 8,
      title: 'Grade 8 - Development',
      color: '#3B82F6',
      features: [
        'Intermediate vocabulary',
        'Detailed explanations',
        'Moderate difficulty level',
        'Standard time allowance',
        'Focus on Understand, Apply & Analyze'
      ]
    },
    {
      grade: 9,
      title: 'Grade 9 - Mastery',
      color: '#10B981',
      features: [
        'Advanced vocabulary',
        'Comprehensive explanations',
        'Complex difficulty level',
        'Standard time allowance',
        'Focus on Analyze, Evaluate & Create'
      ]
    }
  ];

  const generateSampleQuestions = async (subtopicId, grade) => {
    try {
      const questions = questionGenerator.generateQuestions(subtopicId, 'medium', grade, 5);
      return questions;
    } catch (error) {
      console.error('Error generating sample questions:', error);
      return [];
    }
  };

  return (
    <div className="quiz-system-overview">
      {/* Header */}
      <div className="overview-header">
        <div className="header-background">
          <div className="pattern-overlay"></div>
        </div>
        
        <div className="header-content">
          <button onClick={() => onNavigate('landing')} className="back-button">
            <ArrowLeft size={20} />
            <span>Back to Home</span>
          </button>
          
          <div className="header-info">
            <div className="system-badge">
              <Trophy size={16} />
              <span>Comprehensive Quiz System</span>
            </div>
            <h1>Grade-Specific Digital Literacy Assessments</h1>
            <p>10 quiz types × 20 questions × 3 grade levels for each subtopic</p>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="stats-section">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">
              <BookOpen size={24} />
            </div>
            <div className="stat-content">
              <div className="stat-number">{stats.totalSubtopics}</div>
              <div className="stat-label">Subtopics</div>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">
              <Target size={24} />
            </div>
            <div className="stat-content">
              <div className="stat-number">{stats.quizTypes}</div>
              <div className="stat-label">Quiz Types</div>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">
              <Users size={24} />
            </div>
            <div className="stat-content">
              <div className="stat-number">{stats.gradelevels}</div>
              <div className="stat-label">Grade Levels</div>
            </div>
          </div>
          
          <div className="stat-card highlight">
            <div className="stat-icon">
              <BarChart3 size={24} />
            </div>
            <div className="stat-content">
              <div className="stat-number">{stats.totalQuestions.toLocaleString()}</div>
              <div className="stat-label">Total Questions</div>
            </div>
          </div>
        </div>
      </div>

      {/* Quiz Types */}
      <div className="section">
        <h2>10 Quiz Types Available</h2>
        <div className="quiz-types-grid">
          {quizTypes.map(type => (
            <div key={type.id} className="quiz-type-card">
              <div className="type-header">
                <span className="type-icon">{type.icon}</span>
                <h3>{type.name}</h3>
              </div>
              <p>{type.description}</p>
              <div className="type-stats">
                <span>20 questions per grade</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Grade Adaptations */}
      <div className="section">
        <h2>Grade-Specific Adaptations</h2>
        <div className="grade-features-grid">
          {gradeFeatures.map(gradeInfo => (
            <div key={gradeInfo.grade} className="grade-card">
              <div className="grade-header" style={{ backgroundColor: gradeInfo.color }}>
                <h3>{gradeInfo.title}</h3>
              </div>
              <div className="grade-content">
                <ul>
                  {gradeInfo.features.map((feature, index) => (
                    <li key={index}>
                      <CheckCircle size={16} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Topics Overview */}
      <div className="section">
        <h2>Available Topics & Subtopics</h2>
        <div className="topics-grid">
          {Object.values(topics).map(topic => (
            <div key={topic.id} className="topic-card">
              <div className="topic-header" style={{ backgroundColor: topic.color }}>
                <h3>{topic.title}</h3>
                <div className="topic-stats">
                  {Object.keys(topic.subtopics).length} subtopics
                </div>
              </div>
              <div className="subtopics-list">
                {Object.values(topic.subtopics).map(subtopic => (
                  <div key={subtopic.id} className="subtopic-item">
                    <span className="subtopic-id">{subtopic.id}</span>
                    <span className="subtopic-title">{subtopic.title}</span>
                    <span className="question-count">600 questions</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Implementation Status */}
      <div className="section">
        <h2>Implementation Status</h2>
        <div className="status-grid">
          <div className="status-card implemented">
            <div className="status-header">
              <CheckCircle size={20} />
              <h3>Implemented</h3>
            </div>
            <ul>
              <li>Enhanced Question Generator</li>
              <li>Grade-specific adaptations</li>
              <li>Pseudocode templates (1.1)</li>
              <li>Comprehensive quiz database structure</li>
              <li>Assessment system integration</li>
            </ul>
          </div>
          
          <div className="status-card in-progress">
            <div className="status-header">
              <Clock size={20} />
              <h3>In Progress</h3>
            </div>
            <ul>
              <li>Template creation for all subtopics</li>
              <li>Advanced question types (drag-drop, hotspot)</li>
              <li>Performance analytics</li>
              <li>Adaptive difficulty algorithms</li>
            </ul>
          </div>
          
          <div className="status-card planned">
            <div className="status-header">
              <Target size={20} />
              <h3>Planned</h3>
            </div>
            <ul>
              <li>Machine learning question generation</li>
              <li>Real-time difficulty adjustment</li>
              <li>Advanced reporting dashboard</li>
              <li>Multi-language support</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="actions-section">
        <div className="actions-grid">
          <button 
            onClick={() => onNavigate('landing')} 
            className="action-btn primary"
          >
            <Trophy size={20} />
            Try Sample Assessment
          </button>
          
          <button 
            onClick={() => onNavigate('landing')} 
            className="action-btn secondary"
          >
            <BookOpen size={20} />
            Browse Topics
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizSystemOverview;
