import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, CheckCircle, XCircle, RotateCcw, Trophy, BookOpen, Code } from 'lucide-react';
import { grades, topics } from '../data/topics';
import '../styles/Assessment.css';

const Assessment = () => {
  const { gradeLevel, topicId, subtopicId } = useParams();
  const grade = grades[gradeLevel];
  const topic = topics[topicId];
  const subtopic = topic?.subtopics[subtopicId];
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
  const [isActive, setIsActive] = useState(true);
  
  if (!grade || !topic || !subtopic) {
    return <div>Assessment not found</div>;
  }

  // Sample questions based on subtopic
  const getQuestions = (subtopicId) => {
    const questionBank = {
      '1.1': [
        {
          id: 1,
          question: "What is pseudocode?",
          type: "multiple-choice",
          options: [
            "A programming language used by professionals",
            "A way to write algorithms using plain English-like statements",
            "A type of computer hardware",
            "A debugging tool for programmers"
          ],
          correct: 1,
          explanation: "Pseudocode is a way to write algorithms using plain English-like statements that can be easily understood and later converted to actual code."
        },
        {
          id: 2,
          question: "Which of the following is a correct pseudocode structure?",
          type: "multiple-choice",
          options: [
            "START... FINISH",
            "BEGIN... END",
            "OPEN... CLOSE",
            "INIT... TERM"
          ],
          correct: 1,
          explanation: "BEGIN and END are the standard keywords used to mark the start and finish of pseudocode algorithms."
        },
        {
          id: 3,
          question: "What keyword is used to get user input in pseudocode?",
          type: "multiple-choice",
          options: [
            "GET",
            "READ()",
            "INPUT",
            "SCAN"
          ],
          correct: 2,
          explanation: "INPUT is the standard keyword used in pseudocode to represent getting data from the user."
        },
        {
          id: 4,
          question: "Arrange the following pseudocode steps in the correct order to find the maximum number in a list:",
          type: "ordering",
          items: [
            "INPUT list_of_numbers",
            "SET max = first_number",
            "FOR each number in list",
            "IF number > max THEN SET max = number",
            "OUTPUT max"
          ],
          correct: [0, 1, 2, 3, 4],
          explanation: "The correct order follows the logical flow: input data, initialize maximum, iterate through list, compare and update, output result."
        },
        {
          id: 5,
          question: "True or False: Pseudocode must follow exact syntax rules like programming languages.",
          type: "true-false",
          correct: false,
          explanation: "False. Pseudocode is meant to be flexible and readable, focusing on logic rather than strict syntax rules."
        }
      ],
      '1.2': [
        {
          id: 1,
          question: "What is the purpose of selection statements in programming?",
          type: "multiple-choice",
          options: [
            "To repeat code multiple times",
            "To make decisions based on conditions",
            "To store data in variables",
            "To display output to users"
          ],
          correct: 1,
          explanation: "Selection statements (like IF-ELSE) are used to make decisions in programs based on whether certain conditions are true or false."
        },
        {
          id: 2,
          question: "Which pseudocode structure represents a two-way selection?",
          type: "multiple-choice",
          options: [
            "IF... END IF",
            "IF... ELSE... END IF",
            "WHILE... END WHILE",
            "FOR... END FOR"
          ],
          correct: 1,
          explanation: "IF... ELSE... END IF provides two paths: one when the condition is true, another when it's false."
        },
        {
          id: 3,
          question: "What will this pseudocode output if score = 85?\n\nIF score >= 90 THEN\n  OUTPUT 'A'\nELIF score >= 80 THEN\n  OUTPUT 'B'\nELSE\n  OUTPUT 'C'\nEND IF",
          type: "multiple-choice",
          options: [
            "A",
            "B",
            "C",
            "No output"
          ],
          correct: 1,
          explanation: "Since 85 is not >= 90 but is >= 80, the second condition is true and 'B' is output."
        },
        {
          id: 4,
          question: "True or False: You can have multiple ELIF statements in a selection structure.",
          type: "true-false",
          correct: true,
          explanation: "True. You can chain multiple ELIF (else if) statements to test multiple conditions in sequence."
        },
        {
          id: 5,
          question: "Complete the pseudocode: To check if a number is positive, negative, or zero, you would use _____ selection.",
          type: "fill-blank",
          answer: "multi-way",
          alternatives: ["multiple", "three-way", "nested"],
          explanation: "Multi-way selection allows you to test multiple conditions (positive, negative, zero) in a single structure."
        }
      ],
      'default': [
        {
          id: 1,
          question: `What is the main concept covered in ${subtopic.title}?`,
          type: "multiple-choice",
          options: [
            "Basic programming concepts",
            "Advanced algorithms",
            "Database management",
            "Network security"
          ],
          correct: 0,
          explanation: "This subtopic focuses on fundamental concepts in digital literacy and computational thinking."
        },
        {
          id: 2,
          question: "True or False: Understanding this concept is important for digital literacy.",
          type: "true-false",
          correct: true,
          explanation: "True. All concepts in this course contribute to building strong digital literacy skills."
        },
        {
          id: 3,
          question: "How would you apply this concept in real-world scenarios?",
          type: "multiple-choice",
          options: [
            "Problem-solving and logical thinking",
            "Only in computer programming",
            "Only in academic settings",
            "It has no real-world applications"
          ],
          correct: 0,
          explanation: "Digital literacy concepts have broad applications in problem-solving and logical thinking across many fields."
        }
      ]
    };
    
    return questionBank[subtopicId] || questionBank['default'];
  };

  const questions = getQuestions(subtopicId);
  
  // Timer effect
  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0 && !showResults) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft => timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleSubmit();
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, showResults]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (questionId, answer) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleSubmit = () => {
    setIsActive(false);
    setShowResults(true);
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach(question => {
      const userAnswer = selectedAnswers[question.id];
      if (question.type === 'multiple-choice' || question.type === 'true-false') {
        if (userAnswer === question.correct) correct++;
      } else if (question.type === 'fill-blank') {
        const userText = userAnswer?.toLowerCase().trim();
        const correctAnswer = question.answer.toLowerCase();
        const alternatives = question.alternatives?.map(alt => alt.toLowerCase()) || [];
        if (userText === correctAnswer || alternatives.includes(userText)) correct++;
      } else if (question.type === 'ordering') {
        if (JSON.stringify(userAnswer) === JSON.stringify(question.correct)) correct++;
      }
    });
    return { correct, total: questions.length, percentage: Math.round((correct / questions.length) * 100) };
  };

  const resetAssessment = () => {
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setShowResults(false);
    setTimeLeft(600);
    setIsActive(true);
  };

  const score = showResults ? calculateScore() : null;

  if (showResults) {
    return (
      <div className="assessment">
        <div className="results-container">
          <div className="results-header">
            <div className="results-icon">
              {score.percentage >= 70 ? (
                <Trophy size={48} className="trophy-icon" />
              ) : (
                <XCircle size={48} className="fail-icon" />
              )}
            </div>
            <h1>Assessment Complete!</h1>
            <div className="score-display">
              <div className="score-circle">
                <span className="score-number">{score.percentage}%</span>
              </div>
              <p>{score.correct} out of {score.total} questions correct</p>
            </div>
            
            <div className="grade-message">
              {score.percentage >= 90 && (
                <div className="grade excellent">
                  <h3>🌟 Excellent Work!</h3>
                  <p>You have mastered this topic. Great job!</p>
                </div>
              )}
              {score.percentage >= 70 && score.percentage < 90 && (
                <div className="grade good">
                  <h3>✅ Well Done!</h3>
                  <p>You have a good understanding. Review the missed questions to improve.</p>
                </div>
              )}
              {score.percentage >= 50 && score.percentage < 70 && (
                <div className="grade average">
                  <h3>📚 Keep Learning!</h3>
                  <p>You're on the right track. Review the course notes and try again.</p>
                </div>
              )}
              {score.percentage < 50 && (
                <div className="grade needs-work">
                  <h3>💪 Don't Give Up!</h3>
                  <p>Review the course material and practice more. You can do this!</p>
                </div>
              )}
            </div>
          </div>
          
          <div className="results-details">
            <h3>Question Review</h3>
            <div className="questions-review">
              {questions.map((question, index) => {
                const userAnswer = selectedAnswers[question.id];
                const isCorrect = question.type === 'multiple-choice' || question.type === 'true-false' 
                  ? userAnswer === question.correct
                  : question.type === 'fill-blank'
                  ? userAnswer?.toLowerCase().trim() === question.answer.toLowerCase() ||
                    question.alternatives?.some(alt => alt.toLowerCase() === userAnswer?.toLowerCase().trim())
                  : JSON.stringify(userAnswer) === JSON.stringify(question.correct);
                
                return (
                  <div key={question.id} className={`question-result ${isCorrect ? 'correct' : 'incorrect'}`}>
                    <div className="question-header">
                      <div className="question-number">{index + 1}</div>
                      <div className="result-icon">
                        {isCorrect ? <CheckCircle size={20} /> : <XCircle size={20} />}
                      </div>
                    </div>
                    <div className="question-content">
                      <p className="question-text">{question.question}</p>
                      <div className="answer-info">
                        <p><strong>Your answer:</strong> {userAnswer !== undefined ? 
                          (question.type === 'multiple-choice' ? question.options[userAnswer] :
                           question.type === 'true-false' ? (userAnswer ? 'True' : 'False') :
                           userAnswer) : 'Not answered'}
                        </p>
                        {!isCorrect && (
                          <p><strong>Correct answer:</strong> {
                            question.type === 'multiple-choice' ? question.options[question.correct] :
                            question.type === 'true-false' ? (question.correct ? 'True' : 'False') :
                            question.type === 'fill-blank' ? question.answer :
                            'See explanation'
                          }</p>
                        )}
                      </div>
                      <div className="explanation">
                        <strong>Explanation:</strong> {question.explanation}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          <div className="results-actions">
            <button className="action-btn retry" onClick={resetAssessment}>
              <RotateCcw size={16} />
              <span>Try Again</span>
            </button>
            
            <Link 
              to={`/grade/${gradeLevel}/topic/${topicId}/subtopic/${subtopicId}/notes`}
              className="action-btn review"
            >
              <BookOpen size={16} />
              <span>Review Notes</span>
            </Link>
            
            <Link 
              to={`/grade/${gradeLevel}/topic/${topicId}/subtopic/${subtopicId}/playground`}
              className="action-btn practice"
            >
              <Code size={16} />
              <span>Practice More</span>
            </Link>
            
            <Link 
              to={`/grade/${gradeLevel}/topic/${topicId}`}
              className="action-btn continue"
            >
              <span>Continue Learning</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];

  return (
    <div className="assessment">
      {/* Header */}
      <div className="assessment-header">
        <div className="header-background">
          <div className="test-pattern"></div>
        </div>
        
        <div className="header-content">
          <Link to={`/grade/${gradeLevel}/topic/${topicId}`} className="back-button">
            <ArrowLeft size={20} />
            <span>Back to {topic.title}</span>
          </Link>
          
          <div className="assessment-info">
            <div className="assessment-badge">
              <Trophy size={16} />
              <span>Assessment</span>
            </div>
            <h1>{subtopic.title} Test</h1>
            <p>Test your knowledge and understanding</p>
            
            <div className="test-meta">
              <div className="meta-item">
                <Clock size={16} />
                <span className={`timer ${timeLeft < 60 ? 'warning' : ''}`}>
                  {formatTime(timeLeft)}
                </span>
              </div>
              <div className="meta-item">
                <span>Question {currentQuestion + 1} of {questions.length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="progress-container">
        <div className="progress-bar">
          <div 
            className="progress-fill"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Question */}
      <div className="question-container">
        <div className="question-content">
          <div className="question-header">
            <div className="question-number">
              Question {currentQuestion + 1}
            </div>
            <div className="question-type">
              {currentQ.type.replace('-', ' ').toUpperCase()}
            </div>
          </div>
          
          <div className="question-text">
            <h2>{currentQ.question}</h2>
          </div>
          
          <div className="answer-section">
            {currentQ.type === 'multiple-choice' && (
              <div className="options-list">
                {currentQ.options.map((option, index) => (
                  <button
                    key={index}
                    className={`option-btn ${
                      selectedAnswers[currentQ.id] === index ? 'selected' : ''
                    }`}
                    onClick={() => handleAnswerSelect(currentQ.id, index)}
                  >
                    <div className="option-letter">{String.fromCharCode(65 + index)}</div>
                    <span>{option}</span>
                  </button>
                ))}
              </div>
            )}
            
            {currentQ.type === 'true-false' && (
              <div className="true-false-options">
                <button
                  className={`tf-btn ${
                    selectedAnswers[currentQ.id] === true ? 'selected' : ''
                  }`}
                  onClick={() => handleAnswerSelect(currentQ.id, true)}
                >
                  <CheckCircle size={20} />
                  <span>True</span>
                </button>
                <button
                  className={`tf-btn ${
                    selectedAnswers[currentQ.id] === false ? 'selected' : ''
                  }`}
                  onClick={() => handleAnswerSelect(currentQ.id, false)}
                >
                  <XCircle size={20} />
                  <span>False</span>
                </button>
              </div>
            )}
            
            {currentQ.type === 'fill-blank' && (
              <div className="fill-blank">
                <input
                  type="text"
                  className="blank-input"
                  placeholder="Type your answer here..."
                  value={selectedAnswers[currentQ.id] || ''}
                  onChange={(e) => handleAnswerSelect(currentQ.id, e.target.value)}
                />
              </div>
            )}
            
            {currentQ.type === 'ordering' && (
              <div className="ordering-section">
                <p className="ordering-instruction">Drag and drop to arrange in correct order:</p>
                <div className="ordering-items">
                  {currentQ.items.map((item, index) => (
                    <div key={index} className="ordering-item">
                      <div className="item-number">{index + 1}</div>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Navigation */}
        <div className="question-navigation">
          <button
            className="nav-btn prev"
            onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
            disabled={currentQuestion === 0}
          >
            Previous
          </button>
          
          {currentQuestion < questions.length - 1 ? (
            <button
              className="nav-btn next"
              onClick={() => setCurrentQuestion(currentQuestion + 1)}
              disabled={selectedAnswers[currentQ.id] === undefined}
            >
              Next
            </button>
          ) : (
            <button
              className="nav-btn submit"
              onClick={handleSubmit}
              disabled={Object.keys(selectedAnswers).length < questions.length}
            >
              Submit Test
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Assessment;