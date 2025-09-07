import React from 'react';
import ModernLessonPage from '../components/ModernLessonPage';

const Lesson = ({ onNavigate, gradeLevel, topicId, subtopicId }) => {
  return (
    <ModernLessonPage 
      onNavigate={onNavigate}
      gradeLevel={gradeLevel}
      topicId={topicId}
      subtopicId={subtopicId}
    />
  );
};

export default Lesson;