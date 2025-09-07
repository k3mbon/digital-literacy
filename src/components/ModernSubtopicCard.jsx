import React from 'react';
import { 
  IconBook, 
  IconNotebook, 
  IconPlayerPlay, 
  IconFlask, 
  IconEye,
  IconChevronRight,
  IconClock,
  IconStar
} from '@tabler/icons-react';
import '../styles/HackTheBoxTheme.css';
import '../styles/ModernSubtopicCard.css';

const ModernSubtopicCard = ({ 
  subtopic, 
  topicId, 
  index, 
  onNavigate, 
  gradeLevel,
  progress = 0,
  isCompleted = false,
  onDetailedView
}) => {
  const getSubtopicIcon = (topicId, subtopicId) => {
    const iconMap = {
      '1': {
        '1.1': '🧠', '1.2': '🔀', '1.3': '🔍', '1.4': '❓',
        '1.5': '📊', '1.6': '📚', '1.7': '⚙️', '1.8': '🔌'
      },
      '2': { '2.1': '🏗️', '2.2': '🗄️' },
      '3': { '3.1': '🌐', '3.2': '🔒' },
      '5': { '5.1': '🏛️', '5.2': '💻', '5.3': '⌨️', '5.4': '💾', '5.5': '⚡' }
    };
    return iconMap[topicId]?.[subtopicId] || '📖';
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'beginner': return '#22c55e';
      case 'intermediate': return '#f59e0b';
      case 'advanced': return '#ef4444';
      default: return '#64748b';
    }
  };

  const getDifficultyLabel = (difficulty) => {
    switch (difficulty) {
      case 'beginner': return 'Beginner';
      case 'intermediate': return 'Intermediate';
      case 'advanced': return 'Advanced';
      default: return 'Unknown';
    }
  };

  const actions = [
    {
      key: 'detailed-view',
      label: 'Detailed View',
      icon: IconEye,
      color: 'var(--htb-accent-blue)',
      action: () => {
        // Use custom detailed view handler if provided, otherwise navigate to lesson
        if (onDetailedView) {
          onDetailedView(subtopic.id);
        } else {
          onNavigate('lesson', { gradeLevel, topicId, subtopicId: subtopic.id });
        }
      }
    },
    {
      key: 'lesson',
      label: 'Lesson',
      icon: IconBook,
      color: 'var(--htb-primary)',
      action: () => onNavigate('lesson', { gradeLevel, topicId, subtopicId: subtopic.id })
    },
    {
      key: 'notes',
      label: 'Notes',
      icon: IconNotebook,
      color: 'var(--htb-accent-purple)',
      action: () => onNavigate('notes', { gradeLevel, topicId, subtopicId: subtopic.id })
    },
    {
      key: 'playground',
      label: 'Playground',
      icon: IconPlayerPlay,
      color: 'var(--htb-accent-orange)',
      action: () => onNavigate('playground', { gradeLevel, topicId, subtopicId: subtopic.id })
    },
    {
      key: 'test',
      label: 'Test',
      icon: IconFlask,
      color: 'var(--htb-accent-red)',
      action: () => onNavigate('assessment', { gradeLevel, topicId, subtopicId: subtopic.id })
    }
  ];

  return (
    <div className="modern-subtopic-card htb-card htb-animated-bg">
      <div className="card-header">
        <div className="card-icon-section">
          <div className="subtopic-emoji-icon">
            {getSubtopicIcon(topicId, subtopic.id)}
          </div>
          <div className="subtopic-number-badge">
            {index + 1}
          </div>
        </div>
        
        <div className="card-status-section">
          <div 
            className="difficulty-badge htb-badge"
            style={{ 
              '--badge-color': getDifficultyColor(subtopic.difficulty),
              backgroundColor: `${getDifficultyColor(subtopic.difficulty)}20`,
              borderColor: `${getDifficultyColor(subtopic.difficulty)}40`,
              color: getDifficultyColor(subtopic.difficulty)
            }}
          >
            <IconStar size={12} />
            {getDifficultyLabel(subtopic.difficulty)}
          </div>
          
          {isCompleted && (
            <div className="completion-badge htb-badge htb-badge-success">
              ✓ Complete
            </div>
          )}
        </div>
      </div>

      <div className="card-content">
        <h3 className="htb-heading-sm">{subtopic.title}</h3>
        <p className="htb-text-secondary card-description">
          {subtopic.description}
        </p>
        
        <div className="card-meta">
          <div className="meta-item">
            <IconClock size={14} />
            <span>~30 min</span>
          </div>
          <div className="meta-item">
            <IconBook size={14} />
            <span>5 sections</span>
          </div>
        </div>
      </div>

      <div className="card-progress-section">
        <div className="progress-info">
          <span className="htb-text-muted">Progress</span>
          <span className="htb-text-primary">{Math.round(progress)}%</span>
        </div>
        <div className="htb-progress">
          <div 
            className="htb-progress-fill" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      <div className="card-actions">
        <div className="action-buttons-grid">
          {actions.map((action) => {
            const IconComponent = action.icon;
            return (
              <button
                key={action.key}
                className="action-button htb-btn htb-btn-ghost htb-hover-lift"
                onClick={action.action}
                style={{ '--action-color': action.color }}
              >
                <IconComponent size={16} className="htb-icon" />
                <span>{action.label}</span>
                <IconChevronRight size={14} className="htb-icon action-arrow" />
              </button>
            );
          })}
        </div>
      </div>

      <div className="card-glow-effect"></div>
    </div>
  );
};

export default ModernSubtopicCard;
