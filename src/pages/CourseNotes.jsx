import React from 'react';
import { ArrowLeft, BookOpen, Play, TestTube, ChevronRight, Lightbulb, Code, FileText, Clock, User, Target, Book } from 'lucide-react';
import { grades, topics } from '../data/topics';
import { getLessonContent } from '../data/lessonLoader';
import { InteractiveStory, InteractiveList, InteractiveCodeExample, InteractiveQuiz } from '../components/InteractiveLessonComponents';
import '../styles/CourseNotes.css';
import '../styles/ModernCourseNotes.css';

const CourseNotes = ({ onNavigate, gradeLevel, topicId, subtopicId }) => {
  const grade = grades[gradeLevel];
  const topic = topics[topicId];
  const subtopic = topic?.subtopics[subtopicId];
  
  if (!grade || !topic || !subtopic) {
    return <div>Content not found</div>;
  }

  // Get lesson content from the comprehensive lesson content file
  const lessonData = getLessonContent(subtopicId);
  
  // Enhanced content processing for better readability
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
      notes.keyPoints = data.objectives.map((obj, index) => ({
        id: index,
        title: `Learning Objective ${index + 1}`,
        content: obj,
        type: "objective",
        icon: "🎯"
      }));
    }
    
    // Enhanced content processing
    if (data.content) {
      // Remove HTML tags for processing
      const cleanContent = data.content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ');
      
      // Extract concepts from headings and strong text
      const conceptMatches = data.content.match(/<h[23]>(.*?)<\/h[23]>|<strong>(.*?)<\/strong>/g) || [];
      notes.concepts = conceptMatches.slice(0, 8).map((match, index) => ({
        id: index,
        title: match.replace(/<[^>]*>/g, '').trim(),
        description: cleanContent.substring(cleanContent.indexOf(match.replace(/<[^>]*>/g, '')), 150).trim() + '...',
        icon: getConceptIcon(match),
        type: 'concept'
      }));
      
      // Extract examples from specific patterns
      const exampleMatches = data.content.match(/example[^.]*\.|for instance[^.]*\.|let[''']s say[^.]*\./gi) || [];
      notes.examples = exampleMatches.slice(0, 5).map((example, index) => ({
        id: index,
        scenario: `Example ${index + 1}`,
        content: example.trim(),
        type: 'example'
      }));
    }
    
    return notes;
  };

  // Get appropriate icon for concept
  const getConceptIcon = (text) => {
    const iconMap = {
      'algorithm': '🔧',
      'code': '💻',
      'data': '📊',
      'problem': '🧩',
      'solution': '✅',
      'step': '👣',
      'process': '⚙️',
      'example': '📝',
      'why': '💡',
      'how': '🔍',
      'what': '❓',
      default: '📚'
    };
    
    const key = Object.keys(iconMap).find(k => text.toLowerCase().includes(k));
    return iconMap[key] || iconMap.default;
  };

  const notes = createNotesFromLessonData(lessonData);

  if (!notes) {
    return (
      <div className="course-notes-container">
        <div className="notes-header">
          <button 
            className="back-btn"
            onClick={() => onNavigate('topic', { gradeLevel, topicId })}
          >
            <ArrowLeft size={16} />
            Back to Topic
          </button>
          <h1>Content Coming Soon</h1>
          <p>Notes for this lesson are being prepared.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="course-notes-container">
      {/* Enhanced Header */}
      <div className="notes-header">
        <button 
          className="back-btn"
          onClick={() => onNavigate('topic', { gradeLevel, topicId })}
        >
          <ArrowLeft size={16} />
          Back to Topic
        </button>
        
        <h1 className="notes-title">{notes.summary.title}</h1>
        <p className="notes-subtitle">{notes.summary.description}</p>
        
        <div className="notes-meta">
          <div className="notes-meta-item">
            <Clock size={16} />
            {notes.summary.estimatedTime}
          </div>
          <div className="notes-meta-item">
            <Target size={16} />
            {notes.summary.difficulty}
          </div>
          <div className="notes-meta-item">
            <User size={16} />
            Grade {gradeLevel}
          </div>
          <div className="notes-meta-item">
            <Book size={16} />
            Study Notes
          </div>
        </div>
      </div>

      {/* Quick Navigation */}
      <div className="notes-navigation">
        <h2 className="nav-section-title">
          <BookOpen size={20} />
          Quick Navigation
        </h2>
        <div className="nav-items">
          <a href="#key-points" className="nav-item">
            <h4>Key Learning Points</h4>
            <p>Essential objectives and takeaways</p>
          </a>
          <a href="#concepts" className="nav-item">
            <h4>Core Concepts</h4>
            <p>Main ideas and principles</p>
          </a>
          <a href="#examples" className="nav-item">
            <h4>Examples</h4>
            <p>Practical applications and scenarios</p>
          </a>
          <a href="#vocabulary" className="nav-item">
            <h4>Vocabulary</h4>
            <p>Important terms and definitions</p>
          </a>
        </div>
      </div>

      {/* Main Content */}
      <div className="notes-content">
        {/* Key Points Section */}
        {notes.keyPoints.length > 0 && (
          <div id="key-points" className="content-section">
            <h2 className="section-title">
              <Target size={24} />
              Key Learning Points
            </h2>
            <div className="key-points-grid">
              {notes.keyPoints.map((point) => (
                <div key={point.id} className="key-point-card">
                  <h4>
                    <span>{point.icon}</span>
                    {point.title}
                  </h4>
                  <p>{point.content}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Concepts Section */}
        {notes.concepts.length > 0 && (
          <div id="concepts" className="content-section">
            <h2 className="section-title">
              <Lightbulb size={24} />
              Core Concepts
            </h2>
            <div className="concepts-grid">
              {notes.concepts.map((concept) => (
                <div key={concept.id} className="concept-card">
                  <div className="concept-icon">{concept.icon}</div>
                  <h4>{concept.title}</h4>
                  <p>{concept.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Examples Section */}
        {notes.examples.length > 0 && (
          <div id="examples" className="content-section">
            <div className="examples-section">
              <h3>
                <FileText size={20} />
                Practical Examples
              </h3>
              {notes.examples.map((example) => (
                <div key={example.id} className="example-item">
                  <div className="example-scenario">{example.scenario}:</div>
                  <div className="example-solution">{example.content}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Vocabulary Section */}
        {notes.vocabulary.length > 0 && (
          <div id="vocabulary" className="content-section">
            <div className="vocabulary-section">
              <h3>
                <Book size={20} />
                Key Vocabulary
              </h3>
              <div className="vocabulary-grid">
                {notes.vocabulary.map((term, index) => (
                  <div key={index} className="vocabulary-term">
                    <div className="term-word">{term.term}</div>
                    <div className="term-definition">{term.definition}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Interactive Note */}
        <div className="interactive-note">
          <h4>Study Tip</h4>
          <p>
            Take time to understand each concept before moving on. Try to relate new information 
            to what you already know, and don't hesitate to review previous sections if needed.
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="notes-actions">
        <button 
          className="action-btn"
          onClick={() => onNavigate('lesson', { gradeLevel, topicId, subtopicId })}
          title="View Full Lesson"
        >
          <BookOpen size={20} />
        </button>
        <button 
          className="action-btn"
          onClick={() => onNavigate('playground', { gradeLevel, topicId, subtopicId })}
          title="Practice"
        >
          <Play size={20} />
        </button>
        <button 
          className="action-btn"
          onClick={() => window.print()}
          title="Print Notes"
        >
          <FileText size={20} />
        </button>
      </div>
    </div>
  );
};

export default CourseNotes;
