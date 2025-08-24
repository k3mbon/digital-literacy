import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useParams } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import GradePage from './pages/GradePage';
import TopicPage from './pages/TopicPage';
import Lesson from './pages/Lesson';
import Assessment from './pages/Assessment';
import CourseNotes from './pages/CourseNotes';
import Playground from './pages/Playground';
import NotFound from './pages/NotFound';
import './App.css';

// Route wrapper components to extract URL parameters
function GradePageWrapper({ onNavigate }) {
  const { gradeLevel } = useParams();
  return <GradePage onNavigate={onNavigate} gradeLevel={gradeLevel} />;
}

function TopicPageWrapper({ onNavigate }) {
  const { gradeLevel, topicId } = useParams();
  return <TopicPage onNavigate={onNavigate} gradeLevel={gradeLevel} topicId={topicId} />;
}

function LessonWrapper({ onNavigate }) {
  const { gradeLevel, topicId, subtopicId } = useParams();
  return <Lesson onNavigate={onNavigate} gradeLevel={gradeLevel} topicId={topicId} subtopicId={subtopicId} />;
}

function AssessmentWrapper({ onNavigate }) {
  const { gradeLevel, topicId, subtopicId } = useParams();
  return <Assessment onNavigate={onNavigate} gradeLevel={gradeLevel} topicId={topicId} subtopicId={subtopicId} />;
}

function CourseNotesWrapper({ onNavigate }) {
  const { gradeLevel, topicId, subtopicId } = useParams();
  return <CourseNotes onNavigate={onNavigate} gradeLevel={gradeLevel} topicId={topicId} subtopicId={subtopicId} />;
}

// Navigation wrapper component to provide navigation functions to all pages
function AppContent() {
  const navigate = useNavigate();

  const navigateTo = (page, params = {}) => {
    // Map page names to routes
    const routeMap = {
      'landing': '/',
      'grade': `/grade/${params.gradeLevel || ''}`,
      'topic': `/grade/${params.gradeLevel || ''}/topic/${params.topicId || ''}`,
      'lesson': `/grade/${params.gradeLevel || ''}/topic/${params.topicId || ''}/lesson/${params.subtopicId || ''}`,
      'assessment': `/grade/${params.gradeLevel || ''}/topic/${params.topicId || ''}/assessment/${params.subtopicId || ''}`,
      'notes': `/grade/${params.gradeLevel || ''}/topic/${params.topicId || ''}/notes/${params.subtopicId || ''}`,
      'playground': '/playground',
      'notfound': '/404'
    };
    
    const route = routeMap[page] || '/';
    navigate(route);
  };

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<LandingPage onNavigate={navigateTo} />} />
        <Route path="/grade/:gradeLevel" element={<GradePageWrapper onNavigate={navigateTo} />} />
        <Route path="/grade/:gradeLevel/topic/:topicId" element={<TopicPageWrapper onNavigate={navigateTo} />} />
        <Route path="/grade/:gradeLevel/topic/:topicId/lesson/:subtopicId" element={<LessonWrapper onNavigate={navigateTo} />} />
        <Route path="/grade/:gradeLevel/topic/:topicId/assessment/:subtopicId" element={<AssessmentWrapper onNavigate={navigateTo} />} />
        <Route path="/grade/:gradeLevel/topic/:topicId/notes/:subtopicId" element={<CourseNotesWrapper onNavigate={navigateTo} />} />
        <Route path="/playground" element={<Playground onNavigate={navigateTo} />} />
        <Route path="/404" element={<NotFound onNavigate={navigateTo} />} />
        <Route path="*" element={<NotFound onNavigate={navigateTo} />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
