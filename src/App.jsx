import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import GradePage from './pages/GradePage'
import TopicPage from './pages/TopicPage'
import CourseNotes from './pages/CourseNotes'
import Playground from './pages/Playground'
import Assessment from './pages/Assessment'
import NotFound from './pages/NotFound'
import './App.css'

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/grade/:gradeLevel" element={<GradePage />} />
          <Route path="/grade/:gradeLevel/topic/:topicId" element={<TopicPage />} />
          <Route path="/grade/:gradeLevel/topic/:topicId/subtopic/:subtopicId/notes" element={<CourseNotes />} />
          <Route path="/grade/:gradeLevel/topic/:topicId/subtopic/:subtopicId/playground" element={<Playground />} />
          <Route path="/grade/:gradeLevel/topic/:topicId/subtopic/:subtopicId/assessment" element={<Assessment />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
