import React from 'react';

const MinimalLessonPage = ({ onNavigate, gradeLevel, topicId, subtopicId }) => {
  return (
    <div style={{ padding: '20px', background: 'white', color: 'black', fontFamily: 'Arial' }}>
      <h1>Minimal Lesson Page</h1>
      <p>Grade: {gradeLevel}</p>
      <p>Topic: {topicId}</p>
      <p>Subtopic: {subtopicId}</p>
      <button 
        onClick={() => onNavigate('topic', { gradeLevel, topicId })}
        style={{ padding: '10px', background: 'blue', color: 'white', border: 'none' }}
      >
        Back to Topic
      </button>
    </div>
  );
};

export default MinimalLessonPage;
