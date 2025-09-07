import React, { useState, useEffect } from 'react';
import { ArrowLeft, BookOpen, Play, TestTube, Clock, Award, ChevronRight, FileText, Filter, Grid, List, Eye } from 'lucide-react';
import { grades, topics, getDifficultyColor, getGradeAppropriateSubtopics } from '../data/topics';
import { getLessonContent, getLessonMetadata } from '../data/lessonLoader';
import { segmentLessonContent, calculateTotalTime, groupCardsByComplexity, filterCardsByType } from '../utils/contentSegmentation';
import ModernSubtopicCard from '../components/ModernSubtopicCard';
import '../styles/TopicPage.css';
import '../styles/HackTheBoxTheme.css';

const TopicPage = ({ onNavigate, gradeLevel, topicId }) => {
  const [selectedSubtopic, setSelectedSubtopic] = useState(null);
  const [contentCards, setContentCards] = useState([]);
  const [viewMode, setViewMode] = useState('overview'); // 'overview' or 'segmented'
  const [filterType, setFilterType] = useState('all');
  const [filterComplexity, setFilterComplexity] = useState('all');
  
  const grade = grades[gradeLevel];
  const topic = topics[topicId];
  const gradeAppropriateSubtopics = getGradeAppropriateSubtopics(topicId, gradeLevel);
  
  if (!grade || !topic) {
    return <div>Topic not found</div>;
  }
  
  // Load content cards for selected subtopic
  useEffect(() => {
    if (selectedSubtopic) {
      const cards = segmentLessonContent(selectedSubtopic, parseInt(gradeLevel));
      setContentCards(cards);
    }
  }, [selectedSubtopic, gradeLevel]);

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
                  <span>{Object.keys(gradeAppropriateSubtopics).length} Subtopics</span>
                </div>
                <div className="meta-item">
                  <Clock size={16} />
                  <span>~{Object.keys(gradeAppropriateSubtopics).length * 30} minutes</span>
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

      {/* View Mode Toggle */}
      <div className="view-controls">
        <div className="view-toggle">
          <button 
            className={`toggle-btn ${viewMode === 'overview' ? 'active' : ''}`}
            onClick={() => setViewMode('overview')}
          >
            <Grid size={16} />
            <span>Overview</span>
          </button>
          <button 
            className={`toggle-btn ${viewMode === 'segmented' ? 'active' : ''}`}
            onClick={() => setViewMode('segmented')}
          >
            <List size={16} />
            <span>Detailed View</span>
          </button>
        </div>
      </div>

      {viewMode === 'overview' ? (
        /* Original Subtopics Grid */
        <div className="subtopics-section">
          <div className="section-header">
            <h2>Learning Modules</h2>
            <p>Each module includes comprehensive notes, interactive playground, and assessment</p>
          </div>
          
          <div className="subtopics-grid htb-grid htb-grid-3">
            {Object.values(gradeAppropriateSubtopics).map((subtopic, index) => {
              return (
                <ModernSubtopicCard
                  key={subtopic.id}
                  subtopic={subtopic}
                  topicId={topicId}
                  index={index}
                  onNavigate={onNavigate}
                  gradeLevel={gradeLevel}
                  progress={Math.random() * 100} // Mock progress - replace with real data
                  isCompleted={Math.random() > 0.7} // Mock completion - replace with real data
                  onDetailedView={(subtopicId) => {
                    setSelectedSubtopic(subtopicId);
                    setViewMode('segmented');
                  }}
                />
              );
            })}
          </div>
        </div>
      ) : (
        /* Segmented Content View */
        <div className="segmented-content-section">
          <div className="section-header">
            <h2>Detailed Content View</h2>
            <p>Content broken down into digestible segments for better learning</p>
          </div>
          
          {/* Subtopic Selector */}
          <div className="subtopic-selector">
            <h3>Select a Subtopic:</h3>
            <div className="subtopic-tabs">
              {Object.values(gradeAppropriateSubtopics).map((subtopic, index) => (
                <button
                  key={subtopic.id}
                  className={`subtopic-tab ${selectedSubtopic === subtopic.id ? 'active' : ''}`}
                  onClick={() => setSelectedSubtopic(subtopic.id)}
                >
                  <img src={getSubtopicIcon(topicId, subtopic.id)} alt={subtopic.title} className="tab-icon" />
                  <span>{subtopic.title}</span>
                </button>
              ))}
            </div>
          </div>
          
          {/* Content Cards */}
          {selectedSubtopic && contentCards.length > 0 && (
            <div className="content-cards-container">
              {/* Filters */}
              <div className="content-filters">
                <div className="filter-group">
                  <label>Filter by Type:</label>
                  <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                    <option value="all">All Types</option>
                    <option value="introduction">Introduction</option>
                    <option value="algorithm">Algorithms</option>
                    <option value="comparison">Comparisons</option>
                    <option value="application">Applications</option>
                    <option value="interactive">Interactive</option>
                    <option value="assessment">Assessment</option>
                  </select>
                </div>
                
                <div className="filter-group">
                  <label>Filter by Complexity:</label>
                  <select value={filterComplexity} onChange={(e) => setFilterComplexity(e.target.value)}>
                    <option value="all">All Levels</option>
                    <option value="simple">Simple</option>
                    <option value="medium">Medium</option>
                    <option value="complex">Complex</option>
                  </select>
                </div>
                
                <div className="content-stats">
                  <span>📚 {contentCards.length} segments</span>
                  <span>⏱️ ~{calculateTotalTime(contentCards)} min read</span>
                </div>
              </div>
              
              {/* Filtered Content Cards */}
              <div className="content-cards-grid">
                {contentCards
                  .filter(card => filterType === 'all' || card.type === filterType)
                  .filter(card => filterComplexity === 'all' || card.complexity === filterComplexity)
                  .map((card, index) => (
                    <div key={card.id} className={`content-card ${card.complexity}`}>
                      <div className="content-card-header">
                        <div className="card-icon" style={{ backgroundColor: card.color }}>
                          {card.icon}
                        </div>
                        <div className="card-title-area">
                          <h4>{card.title}</h4>
                          <div className="card-meta">
                            <span className={`complexity-tag ${card.complexity}`}>
                              {card.complexity}
                            </span>
                            <span className="time-tag">⏱️ {card.estimatedTime} min</span>
                            {card.hasCode && <span className="feature-tag">💻 Code</span>}
                            {card.hasInteractive && <span className="feature-tag">🎮 Interactive</span>}
                          </div>
                        </div>
                      </div>
                      
                      <div className="content-card-body">
                        {card.type === 'interactive' || card.type === 'assessment' ? (
                          <p>{card.content}</p>
                        ) : (
                          <div 
                            className="card-content-preview"
                            dangerouslySetInnerHTML={{ __html: card.content }}
                          />
                        )}
                      </div>
                      
                      <div className="content-card-actions">
                        <button 
                          onClick={() => onNavigate('lesson', { gradeLevel, topicId, subtopicId: card.id })}
                          className="card-action-btn primary"
                        >
                          <BookOpen size={14} />
                          <span>View Full Content</span>
                        </button>
                        
                        {card.type === 'interactive' && (
                          <button 
                            onClick={() => onNavigate('playground', { gradeLevel, topicId, subtopicId: selectedSubtopic })}
                            className="card-action-btn secondary"
                          >
                            <Play size={14} />
                            <span>Try Interactive</span>
                          </button>
                        )}
                        
                        {card.type === 'assessment' && (
                          <button 
                            onClick={() => onNavigate('assessment', { gradeLevel, topicId, subtopicId: selectedSubtopic })}
                            className="card-action-btn secondary"
                          >
                            <TestTube size={14} />
                            <span>Take Quiz</span>
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                }
              </div>
              
              {/* No cards message */}
              {contentCards
                .filter(card => filterType === 'all' || card.type === filterType)
                .filter(card => filterComplexity === 'all' || card.complexity === filterComplexity)
                .length === 0 && (
                <div className="no-cards-message">
                  <p>No content segments match your current filters.</p>
                  <button onClick={() => { setFilterType('all'); setFilterComplexity('all'); }}>Clear Filters</button>
                </div>
              )}
            </div>
          )}
          
          {/* No subtopic selected */}
          {!selectedSubtopic && (
            <div className="no-selection-message">
              <h3>Select a subtopic above to view its segmented content</h3>
              <p>Content will be broken down into digestible cards based on complexity and type.</p>
              <button 
                className="default-lesson-btn"
                onClick={() => {
                  const defaultSubtopicId = Object.keys(gradeAppropriateSubtopics)[0];
                  onNavigate('lesson', { gradeLevel, topicId, subtopicId: defaultSubtopicId });
                }}
              >
                Load Default Lesson
              </button>
            </div>
          )}
        </div>
      )}

      {/* Learning Path Visualization */}
      <div className="learning-path-section">
        <div className="section-header">
          <h2>Your Learning Path</h2>
          <p>Follow the recommended sequence for optimal understanding</p>
        </div>
        
        <div className="path-visualization">
          <div className="path-line"></div>
          {Object.values(gradeAppropriateSubtopics).map((subtopic, index) => (
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
              onClick={() => onNavigate('notes', { gradeLevel, topicId, subtopicId: Object.values(gradeAppropriateSubtopics)[0].id })}
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