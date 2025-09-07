// Simple test component to debug lesson page
import React from 'react';

const TestLessonPage = ({ onNavigate, gradeLevel, topicId, subtopicId }) => {
  console.log('TestLessonPage props:', { gradeLevel, topicId, subtopicId });
  
  return (
    <div style={{ padding: '20px', background: 'white', color: 'black' }}>
      <h1>Test Lesson Page</h1>
      <p>Grade Level: {gradeLevel}</p>
      <p>Topic ID: {topicId}</p>
      <p>Subtopic ID: {subtopicId}</p>
      <button onClick={() => onNavigate('topic', { gradeLevel, topicId })}>
        Back to Topic
      </button>
    </div>
  );
};

export default TestLessonPage;
