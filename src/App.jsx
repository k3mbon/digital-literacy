import React, { useState } from 'react';
import LandingPage from './pages/LandingPage';
import GradePage from './pages/GradePage';
import TopicPage from './pages/TopicPage';
import Lesson from './pages/Lesson';
import Assessment from './pages/Assessment';
import CourseNotes from './pages/CourseNotes';
import Playground from './pages/Playground';
import NotFound from './pages/NotFound';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [pageParams, setPageParams] = useState({});

  const navigateTo = (page, params = {}) => {
    setCurrentPage(page);
    setPageParams(params);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage onNavigate={navigateTo} />;
      case 'grade':
        return <GradePage onNavigate={navigateTo} gradeLevel={pageParams.gradeLevel} />;
      case 'topic':
        return <TopicPage onNavigate={navigateTo} gradeLevel={pageParams.gradeLevel} topicId={pageParams.topicId} />;
      case 'lesson':
        return <Lesson onNavigate={navigateTo} gradeLevel={pageParams.gradeLevel} topicId={pageParams.topicId} subtopicId={pageParams.subtopicId} />;
      case 'assessment':
        return <Assessment onNavigate={navigateTo} gradeLevel={pageParams.gradeLevel} topicId={pageParams.topicId} subtopicId={pageParams.subtopicId} />;
      case 'notes':
        return <CourseNotes onNavigate={navigateTo} gradeLevel={pageParams.gradeLevel} topicId={pageParams.topicId} subtopicId={pageParams.subtopicId} />;
      case 'playground':
        return <Playground onNavigate={navigateTo} gradeLevel={pageParams.gradeLevel} topicId={pageParams.topicId} subtopicId={pageParams.subtopicId} />;
      case 'notfound':
        return <NotFound onNavigate={navigateTo} />;
      default:
        return <LandingPage onNavigate={navigateTo} />;
    }
  };

  return (
    <div className="app">
      {renderCurrentPage()}
    </div>
  );
}

export default App;
