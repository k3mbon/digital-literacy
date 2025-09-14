import { useState, useEffect, useCallback } from 'react';
import { ArrowLeft, Clock, CheckCircle, XCircle, RotateCcw, Trophy, BookOpen, Code } from 'lucide-react';
import { grades, topics } from '../data/topics';
import OrderingQuestion from '../components/OrderingQuestion';
import QuestionRenderer from '../components/QuestionRenderer';
import QuestionGenerator from '../utils/QuestionGenerator';
import EnhancedQuestionGenerator from '../utils/EnhancedQuestionGenerator';
import '../styles/Assessment.css';

// Add CSS for loading spinner
const spinnerStyles = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.type = 'text/css';
  styleSheet.innerText = spinnerStyles;
  document.head.appendChild(styleSheet);
}

const Assessment = ({ onNavigate, gradeLevel, topicId, subtopicId }) => {
  const grade = grades[gradeLevel];
  const topic = topics[topicId];
  const subtopic = topic?.subtopics[subtopicId];
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(1200); // 20 minutes for 20 questions
  const [isActive, setIsActive] = useState(true);
  const [questionGenerator] = useState(new EnhancedQuestionGenerator());
  const [questions, setQuestions] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGeneratingQuestions, setIsGeneratingQuestions] = useState(false);
  const [error, setError] = useState(null);
  
  // Generate 20 unique questions using comprehensive question bank
  const getQuestions = (subtopicId) => {
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error('Question generation timed out after 10 seconds'));
      }, 10000);
      
      try {
        // Use comprehensive question bank with unique questions for each subtopic
        const comprehensiveQuestions = getComprehensiveQuestionBank(subtopicId);
        
        if (comprehensiveQuestions.length >= 20) {
          // If we have 20+ unique questions, return exactly 20
          clearTimeout(timeout);
          resolve(comprehensiveQuestions.slice(0, 20));
        } else if (comprehensiveQuestions.length > 0) {
          // If we have some questions but less than 20, use them and fill with fallback
          const legacyQuestions = getLegacyQuestions(subtopicId);
          const remainingNeeded = 20 - comprehensiveQuestions.length;
          const expandedLegacy = expandQuestionBank(legacyQuestions, subtopicId, remainingNeeded);
          clearTimeout(timeout);
          resolve([...comprehensiveQuestions, ...expandedLegacy]);
        } else {
          // Fallback to legacy system if no comprehensive questions available
          console.log(`No comprehensive questions for ${subtopicId}, using legacy system`);
          const legacyQuestions = getLegacyQuestions(subtopicId);
          const expandedQuestions = expandQuestionBank(legacyQuestions, subtopicId, 20);
          clearTimeout(timeout);
          resolve(expandedQuestions);
        }
      } catch (error) {
        clearTimeout(timeout);
        console.log('Question generation failed, using expanded legacy questions');
        const legacyQuestions = getLegacyQuestions(subtopicId);
        const expandedQuestions = expandQuestionBank(legacyQuestions, subtopicId, 20);
        resolve(expandedQuestions);
      }
    });
  };

  // Function to expand question bank to exactly 20 questions
  const expandQuestionBank = (baseQuestions, subtopicId, targetCount) => {
    if (baseQuestions.length >= targetCount) {
      return shuffleArray([...baseQuestions]).slice(0, targetCount);
    }

    const expanded = [...baseQuestions];
    const questionTemplates = getQuestionTemplates(subtopicId);
    
    // Add template-based questions to reach target count
    while (expanded.length < targetCount && questionTemplates.length > 0) {
      const template = questionTemplates[expanded.length % questionTemplates.length];
      const newQuestion = {
        ...template,
        id: expanded.length + 1
      };
      expanded.push(newQuestion);
    }

    // If still not enough, create variations of existing questions
    while (expanded.length < targetCount) {
      const baseQuestion = baseQuestions[expanded.length % baseQuestions.length];
      const variation = createQuestionVariation(baseQuestion, expanded.length + 1, subtopicId);
      expanded.push(variation);
    }

    return shuffleArray(expanded).slice(0, targetCount);
  };

  // Create question variations
  const createQuestionVariation = (baseQuestion, newId, subtopicId) => {
    const variations = {
      'multiple-choice': createMCVariation,
      'true-false': createTFVariation,
      'fill-blank': createFBVariation,
      'ordering': createOrderingVariation
    };

    const createVariation = variations[baseQuestion.type] || createMCVariation;
    return createVariation(baseQuestion, newId, subtopicId);
  };

  // Variation creators
  const createMCVariation = (base, id, subtopicId) => ({
    ...base,
    id,
    question: `${base.question} (Alternative perspective)`,
    options: shuffleArray([...base.options])
  });

  const createTFVariation = (base, id, subtopicId) => ({
    ...base,
    id,
    question: base.correct ? `It is false that: ${base.question.toLowerCase()}` : `It is true that: ${base.question.toLowerCase()}`,
    correct: !base.correct
  });

  const createFBVariation = (base, id, subtopicId) => ({
    ...base,
    id,
    question: `Complete the statement: ${base.question}`
  });

  const createOrderingVariation = (base, id, subtopicId) => ({
    ...base,
    id,
    items: shuffleArray([...base.items])
  });

  // Question templates for each subtopic
  const getQuestionTemplates = (subtopicId) => {
    const templates = {
      '1.1': [ // Pseudocode additional templates
        {
          question: "What is the main benefit of using pseudocode?",
          type: "multiple-choice",
          options: ["Faster execution", "Better planning and communication", "Uses less memory", "Automatic debugging"],
          correct: 1,
          explanation: "Pseudocode helps in planning algorithms and communicating ideas clearly before implementation."
        },
        {
          question: "Pseudocode is independent of programming language syntax.",
          type: "true-false",
          correct: true,
          explanation: "True. Pseudocode focuses on logic rather than specific programming language syntax."
        },
        {
          question: "In pseudocode, _____ is used to store values.",
          type: "fill-blank",
          answer: "variables",
          alternatives: ["SET", "STORE", "memory"],
          explanation: "Variables are used to store and manipulate values in pseudocode algorithms."
        }
      ],
      '1.2': [ // Selection statements templates
        {
          question: "What is the purpose of ELSE in a selection statement?",
          type: "multiple-choice",
          options: ["To end the program", "To provide an alternative action", "To repeat code", "To get input"],
          correct: 1,
          explanation: "ELSE provides an alternative action when the IF condition is false."
        },
        {
          question: "ELIF allows you to test multiple conditions in sequence.",
          type: "true-false",
          correct: true,
          explanation: "True. ELIF (else if) allows testing multiple conditions in a structured way."
        },
        {
          question: "A _____ statement tests whether a condition is true or false.",
          type: "fill-blank",
          answer: "conditional",
          alternatives: ["IF", "selection", "decision"],
          explanation: "Conditional statements evaluate whether specified conditions are true or false."
        }
      ],
      '1.3': [ // Searching algorithms templates  
        {
          question: "Which search algorithm is more efficient for large sorted datasets?",
          type: "multiple-choice",
          options: ["Linear search", "Binary search", "Random search", "Sequential search"],
          correct: 1,
          explanation: "Binary search is much more efficient for large sorted datasets with O(log n) complexity."
        },
        {
          question: "Binary search can only work on sorted data.",
          type: "true-false",
          correct: true,
          explanation: "True. Binary search requires the data to be sorted to work correctly."
        },
        {
          question: "Linear search has _____ time complexity in the worst case.",
          type: "fill-blank",
          answer: "O(n)",
          alternatives: ["linear", "proportional", "direct"],
          explanation: "Linear search has O(n) complexity as it may need to check every element."
        }
      ]
      // Add more templates for other subtopics as needed
    };

    return templates[subtopicId] || [];
  };
  
  const handleSubmit = useCallback(async () => {
    console.log('Assessment: Starting submission process');
    setIsSubmitting(true);
    setError(null);
    
    try {
      console.log('Assessment: Calculating score for', questions.length, 'questions');
      setIsActive(false);
      
      // Add a small delay to show loading state
      await new Promise(resolve => setTimeout(resolve, 100));
      
      setShowResults(true);
      console.log('Assessment: Submission completed successfully');
    } catch (err) {
      console.error('Assessment: Error during submission:', err);
      setError('Failed to submit assessment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }, [questions.length]);
  
  // Initialize questions on component mount
  useEffect(() => {
    if (subtopicId && questions.length === 0) {
      const generateQuestionsAsync = async () => {
        console.log('Assessment: Starting question generation for subtopic:', subtopicId);
        setIsGeneratingQuestions(true);
        setError(null);
        
        try {
          // Add a small delay to prevent UI blocking
          await new Promise(resolve => setTimeout(resolve, 50));
          
          const generatedQuestions = await getQuestions(subtopicId);
          console.log('Assessment: Generated', generatedQuestions.length, 'questions');
          
          if (generatedQuestions.length === 0) {
            throw new Error('No questions could be generated for this topic');
          }
          
          setQuestions(generatedQuestions);
        } catch (err) {
          console.error('Assessment: Error generating questions:', err);
          setError('Failed to load assessment questions. Please refresh and try again.');
        } finally {
          setIsGeneratingQuestions(false);
        }
      };
      
      generateQuestionsAsync();
    }
  }, [subtopicId, questions.length]);
  
  // Timer effect - must be before early return
  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0 && !showResults) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft => timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      // Only call handleSubmit if component is properly initialized
      if (grade && topic && subtopic) {
        handleSubmit();
      }
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, showResults, grade, topic, subtopic, handleSubmit]);
  
  if (!grade || !topic || !subtopic) {
    return <div>Assessment not found</div>;
  }

  // Handle answer changes
  const handleAnswerChange = (questionId, answer) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  // Navigation handlers that clear previous answers for multiple choice
  const handleNextQuestion = () => {
    const nextIndex = currentQuestion + 1;
    if (nextIndex < questions.length) {
      setCurrentQuestion(nextIndex);
      
      // Clear any previous selection for the next question if it's multiple choice
      const nextQuestion = questions[nextIndex];
      if (nextQuestion && (nextQuestion.type === 'multiple-choice' || nextQuestion.type === 'true-false')) {
        setSelectedAnswers(prev => {
          const newAnswers = { ...prev };
          delete newAnswers[nextQuestion.id];
          return newAnswers;
        });
      }
    }
  };

  const handlePreviousQuestion = () => {
    const prevIndex = currentQuestion - 1;
    if (prevIndex >= 0) {
      setCurrentQuestion(prevIndex);
    }
  };

  // Utility function to shuffle array
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Check if an answer is valid for the given question
  const isAnswerValid = (question, answer) => {
    if (answer === undefined || answer === null) return false;
    
    switch (question.type) {
      case 'matching':
        // For matching questions, check if all left column items have been matched
        if (typeof answer !== 'object') return false;
        const requiredMatches = question.leftColumn?.length || 0;
        const completedMatches = Object.keys(answer).filter(key => answer[key] && answer[key].trim() !== '').length;
        return completedMatches === requiredMatches;
      
      case 'multi-select':
        // For multi-select, check if minimum selections are met
        return Array.isArray(answer) && answer.length >= (question.minSelections || 1);
      
      case 'fill-blank':
        // For fill-blank, check if all blanks are filled
        if (Array.isArray(answer)) {
          return answer.every(blank => blank && blank.trim() !== '');
        }
        return answer && answer.trim() !== '';
      
      case 'ordering':
        // For ordering, check if array has items
        return Array.isArray(answer) && answer.length > 0;
      
      case 'drag-drop':
        // For drag-drop, check if mapping object has entries
        return typeof answer === 'object' && Object.keys(answer).length > 0;
      
      case 'hotspot':
        // For hotspot, check if array has selections
        return Array.isArray(answer) && answer.length > 0;
      
      case 'code-completion':
        // For code completion, check if all blanks are filled
        if (Array.isArray(answer)) {
          return answer.every(blank => blank !== undefined && blank !== null && blank !== '');
        }
        return answer !== undefined && answer !== null && answer !== '';
      
      default:
        // For simple question types (multiple-choice, true-false, scenario)
        return answer !== undefined && answer !== null && answer !== '';
    }
  };
  
  // Calculate final score using the question generator's scoring system
  const calculateScore = () => {
    let totalScore = 0;
    let maxScore = questions.length;
    let correctCount = 0;
    
    questions.forEach(question => {
      const userAnswer = selectedAnswers[question.id];
      const questionScore = questionGenerator.calculateQuestionScore(question, userAnswer);
      totalScore += questionScore;
  if (questionScore > 0) correctCount += 1;
    });
    
    return {
      score: Math.round(totalScore),
      total: maxScore,
      percentage: Math.round((totalScore / maxScore) * 100),
      correct: correctCount
    };
  };

  // Comprehensive unique question banks for each subtopic (20 unique questions each)
  const getComprehensiveQuestionBank = (subtopicId) => {
    const questionBanks = {
      '1.1': [ // Pseudocode - 20 unique questions
        {
          id: 1,
          question: "What is the primary purpose of pseudocode in algorithm development?",
          type: "multiple-choice",
          options: [
            "To execute programs faster",
            "To plan and communicate algorithms before coding",
            "To replace actual programming languages",
            "To debug existing programs"
          ],
          correct: 1,
          explanation: "Pseudocode serves as a planning and communication tool to design algorithms before implementation in actual code."
        },
        {
          id: 2,
          question: "Which keyword combination properly starts and ends a pseudocode algorithm?",
          type: "multiple-choice",
          options: [
            "START...STOP",
            "BEGIN...END",
            "INIT...FINISH",
            "OPEN...CLOSE"
          ],
          correct: 1,
          explanation: "BEGIN and END are the standard keywords used to mark the beginning and conclusion of pseudocode algorithms."
        },
        {
          id: 3,
          question: "In pseudocode, what keyword is used to receive data from the user?",
          type: "multiple-choice",
          options: [
            "RECEIVE",
            "GET",
            "INPUT",
            "ACCEPT"
          ],
          correct: 2,
          explanation: "INPUT is the standard pseudocode keyword for receiving data from users."
        },
        {
          id: 4,
          question: "What keyword displays results to the user in pseudocode?",
          type: "multiple-choice",
          options: [
            "SHOW",
            "OUTPUT",
            "PRINT",
            "All of the above"
          ],
          correct: 3,
          explanation: "SHOW, OUTPUT, and PRINT are all acceptable keywords for displaying results in pseudocode."
        },
        {
          id: 5,
          question: "True or False: Pseudocode must follow strict syntax rules like programming languages.",
          type: "true-false",
          correct: false,
          explanation: "False. Pseudocode is meant to be flexible and readable, focusing on logic rather than strict syntax rules."
        },
        {
          id: 6,
          question: "True or False: Pseudocode can be written in any natural language.",
          type: "true-false",
          correct: true,
          explanation: "True. Pseudocode can be written in any natural language as long as it clearly expresses the algorithm logic."
        },
        {
          id: 7,
          question: "True or False: Comments should never be included in pseudocode.",
          type: "true-false",
          correct: false,
          explanation: "False. Comments help explain the logic and make pseudocode more understandable and maintainable."
        },
        {
          id: 8,
          question: "True or False: Pseudocode is only useful for beginners learning to program.",
          type: "true-false",
          correct: false,
          explanation: "False. Professional programmers use pseudocode to plan complex algorithms and communicate with team members."
        },
        {
          id: 9,
          question: "Complete the pseudocode statement: _____ username FROM user",
          type: "fill-blank",
          answer: "INPUT",
          alternatives: ["GET", "READ", "ACCEPT"],
          explanation: "INPUT is the standard keyword for receiving data from users in pseudocode."
        },
        {
          id: 10,
          question: "Complete the assignment statement: _____ total = price + tax",
          type: "fill-blank",
          answer: "SET",
          alternatives: ["ASSIGN", "LET", "MAKE"],
          explanation: "SET is commonly used to assign values to variables in pseudocode."
        },
        {
          id: 11,
          question: "Complete the loop structure: _____ counter = 1 TO 10",
          type: "fill-blank",
          answer: "FOR",
          alternatives: ["REPEAT", "LOOP", "COUNT"],
          explanation: "FOR is used to create counting loops in pseudocode."
        },
        {
          id: 12,
          question: "Complete the conditional: _____ age >= 18 THEN OUTPUT 'Adult'",
          type: "fill-blank",
          answer: "IF",
          alternatives: ["WHEN", "CHECK", "TEST"],
          explanation: "IF is used to create conditional statements in pseudocode."
        },
        {
          id: 13,
          question: "Arrange these pseudocode steps to calculate the area of a rectangle:",
          type: "ordering",
          items: [
            "INPUT length",
            "INPUT width", 
            "SET area = length * width",
            "OUTPUT area"
          ],
          correct: [0, 1, 2, 3],
          explanation: "The logical order is: get length, get width, calculate area, display result."
        },
        {
          id: 14,
          question: "Arrange these steps to find the largest number in a list:",
          type: "ordering",
          items: [
            "INPUT list of numbers",
            "SET largest = first number",
            "FOR each remaining number",
            "IF number > largest THEN SET largest = number",
            "OUTPUT largest"
          ],
          correct: [0, 1, 2, 3, 4],
          explanation: "Start with input, initialize largest, compare each number, update if needed, output result."
        },
        {
          id: 15,
          question: "Order these steps to validate user input:",
          type: "ordering",
          items: [
            "INPUT password",
            "CHECK password length",
            "IF valid THEN grant access",
            "ELSE request new password"
          ],
          correct: [0, 1, 2, 3],
          explanation: "Get input, validate it, take appropriate action based on validation result."
        },
        {
          id: 16,
          question: "Arrange the structure of a WHILE loop:",
          type: "ordering",
          items: [
            "WHILE condition is true",
            "Execute statements",
            "Check condition again",
            "END WHILE"
          ],
          correct: [0, 1, 2, 3],
          explanation: "WHILE loops check condition, execute statements, recheck condition, and end when false."
        },
        {
          id: 17,
          question: "What type of structure is represented by FOR...END FOR?",
          type: "multiple-choice",
          options: [
            "Sequential structure",
            "Selection structure", 
            "Repetition structure",
            "Input/Output structure"
          ],
          correct: 2,
          explanation: "FOR...END FOR represents a repetition (loop) structure that repeats actions a specific number of times."
        },
        {
          id: 18,
          question: "Which structure allows a program to make decisions?",
          type: "multiple-choice",
          options: [
            "Sequential",
            "Selection (IF...THEN...ELSE)",
            "Repetition", 
            "Assignment"
          ],
          correct: 1,
          explanation: "Selection structures like IF...THEN...ELSE allow programs to make decisions based on conditions."
        },
        {
          id: 19,
          question: "What does the WHILE structure create in pseudocode?",
          type: "multiple-choice",
          options: [
            "A conditional statement",
            "A counting loop",
            "A conditional loop",
            "An assignment statement"
          ],
          correct: 2,
          explanation: "WHILE creates a conditional loop that continues as long as a specified condition remains true."
        },
        {
          id: 20,
          question: "Which pseudocode structure executes statements in order from top to bottom?",
          type: "multiple-choice",
          options: [
            "Selection structure",
            "Repetition structure",
            "Sequential structure",
            "Conditional structure"
          ],
          correct: 2,
          explanation: "Sequential structure executes statements in order from top to bottom without branching or looping."
        }
      ],

      '1.2': [ // Selection Statements - 20 unique questions
        {
          id: 1,
          question: "What is the primary purpose of selection statements in programming?",
          type: "multiple-choice",
          options: [
            "To repeat code multiple times",
            "To make decisions based on conditions",
            "To store data in variables",
            "To display output to users"
          ],
          correct: 1,
          explanation: "Selection statements allow programs to make decisions by choosing different paths based on whether conditions are true or false."
        },
        {
          id: 2,
          question: "Which structure represents a two-way selection in pseudocode?",
          type: "multiple-choice",
          options: [
            "IF...END IF",
            "IF...ELSE...END IF",
            "WHILE...END WHILE",
            "FOR...END FOR"
          ],
          correct: 1,
          explanation: "IF...ELSE...END IF provides two alternative paths: one when the condition is true, another when it's false."
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
          explanation: "Since 85 is not >= 90 but is >= 80, the ELIF condition is true and 'B' is output."
        },
        {
          id: 4,
          question: "What does ELIF stand for in programming?",
          type: "multiple-choice",
          options: [
            "End Life",
            "Else If",
            "Equal If",
            "Every If"
          ],
          correct: 1,
          explanation: "ELIF stands for 'Else If' and allows testing additional conditions when the initial IF is false."
        },
        {
          id: 5,
          question: "True or False: You can have multiple ELIF statements in a selection structure.",
          type: "true-false",
          correct: true,
          explanation: "True. You can chain multiple ELIF statements to test several conditions in sequence."
        },
        {
          id: 6,
          question: "True or False: The ELSE clause is mandatory in every IF statement.",
          type: "true-false",
          correct: false,
          explanation: "False. The ELSE clause is optional and only needed when you want an alternative action for false conditions."
        },
        {
          id: 7,
          question: "True or False: Nested IF statements are possible in programming.",
          type: "true-false",
          correct: true,
          explanation: "True. IF statements can be nested inside other IF statements to create complex decision structures."
        },
        {
          id: 8,
          question: "True or False: Only one condition can be tested in a selection structure.",
          type: "true-false",
          correct: false,
          explanation: "False. Multiple conditions can be tested using ELIF statements or logical operators like AND/OR."
        },
        {
          id: 9,
          question: "Complete: To check if a number is positive, negative, or zero, you use _____ selection.",
          type: "fill-blank",
          answer: "multi-way",
          alternatives: ["multiple", "three-way", "nested"],
          explanation: "Multi-way selection allows testing multiple conditions to handle three or more different cases."
        },
        {
          id: 10,
          question: "Complete: The _____ operator is used to test if two values are equal.",
          type: "fill-blank",
          answer: "==",
          alternatives: ["equality", "comparison", "equal"],
          explanation: "The == operator tests for equality between two values in conditional statements."
        },
        {
          id: 11,
          question: "Complete: To test if a number is NOT equal to zero, use the _____ operator.",
          type: "fill-blank",
          answer: "!=",
          alternatives: ["not equal", "<>", "≠"],
          explanation: "The != operator tests for inequality (not equal) between two values."
        },
        {
          id: 12,
          question: "Complete: The _____ keyword provides an alternative action when the IF condition is false.",
          type: "fill-blank",
          answer: "ELSE",
          alternatives: ["OTHERWISE", "ALTERNATIVE", "DEFAULT"],
          explanation: "ELSE provides the alternative action executed when the IF condition evaluates to false."
        },
        {
          id: 13,
          question: "Arrange these parts of a complete IF-ELIF-ELSE structure:",
          type: "ordering",
          items: [
            "IF first_condition THEN",
            "first_action",
            "ELIF second_condition THEN", 
            "second_action",
            "ELSE",
            "default_action",
            "END IF"
          ],
          correct: [0, 1, 2, 3, 4, 5, 6],
          explanation: "The structure flows from IF to ELIF to ELSE, each with their respective actions, ending with END IF."
        },
        {
          id: 14,
          question: "Order these steps to determine student grades:",
          type: "ordering",
          items: [
            "INPUT student_score",
            "IF score >= 90 THEN grade = 'A'",
            "ELIF score >= 80 THEN grade = 'B'",
            "ELIF score >= 70 THEN grade = 'C'",
            "ELSE grade = 'F'",
            "OUTPUT grade"
          ],
          correct: [0, 1, 2, 3, 4, 5],
          explanation: "Get the score, test conditions from highest to lowest, assign grade, output result."
        },
        {
          id: 15,
          question: "Arrange the logical flow of nested IF statements:",
          type: "ordering",
          items: [
            "IF outer_condition THEN",
            "IF inner_condition THEN",
            "inner_action",
            "END IF (inner)",
            "END IF (outer)"
          ],
          correct: [0, 1, 2, 3, 4],
          explanation: "Nested IF statements require proper nesting with inner statements completely contained within outer ones."
        },
        {
          id: 16,
          question: "Order the evaluation of this compound condition: IF (age >= 18) AND (hasLicense = true)",
          type: "ordering",
          items: [
            "Evaluate (age >= 18)",
            "Evaluate (hasLicense = true)",
            "Apply AND operation",
            "Execute IF block if both true"
          ],
          correct: [0, 1, 2, 3],
          explanation: "Compound conditions evaluate each part, then apply the logical operator to determine the final result."
        },
        {
          id: 17,
          question: "What happens when multiple conditions in an IF-ELIF chain are true?",
          type: "multiple-choice",
          options: [
            "All matching conditions execute",
            "Only the first true condition executes",
            "Only the last true condition executes",
            "The program throws an error"
          ],
          correct: 1,
          explanation: "In IF-ELIF chains, only the first true condition executes, then the program skips the remaining conditions."
        },
        {
          id: 18,
          question: "Which logical operator requires both conditions to be true?",
          type: "multiple-choice",
          options: [
            "OR",
            "AND",
            "NOT",
            "XOR"
          ],
          correct: 1,
          explanation: "The AND operator requires both conditions to be true for the overall expression to be true."
        },
        {
          id: 19,
          question: "Which operator reverses the truth value of a condition?",
          type: "multiple-choice",
          options: [
            "AND",
            "OR", 
            "NOT",
            "EQUAL"
          ],
          correct: 2,
          explanation: "The NOT operator reverses the truth value: NOT true becomes false, NOT false becomes true."
        },
        {
          id: 20,
          question: "What is the main advantage of using ELIF over multiple separate IF statements?",
          type: "multiple-choice",
          options: [
            "ELIF is faster to type",
            "ELIF prevents multiple conditions from executing",
            "ELIF uses less memory",
            "ELIF is required by programming languages"
          ],
          correct: 1,
          explanation: "ELIF ensures only one condition executes, preventing unintended multiple actions when conditions overlap."
        }
      ],

      '1.3': [ // Searching Algorithms - 20 unique questions
        {
          id: 1,
          question: "What is the fundamental difference between linear search and binary search?",
          type: "multiple-choice",
          options: [
            "Linear search is faster than binary search",
            "Binary search requires sorted data, linear search doesn't",
            "Linear search uses more memory",
            "Binary search only works with numbers"
          ],
          correct: 1,
          explanation: "Binary search requires data to be sorted beforehand, while linear search works on unsorted data."
        },
        {
          id: 2,
          question: "What happens in binary search when the target is found?",
          type: "multiple-choice",
          options: [
            "Continue searching for duplicates",
            "Return the position and stop",
            "Search the remaining list",
            "Start over from beginning"
          ],
          correct: 1,
          explanation: "When the target is found, binary search returns the position and stops searching immediately."
        },
        {
          id: 3,
          question: "What is the time complexity of linear search in the worst case?",
          type: "multiple-choice",
          options: [
            "O(1)",
            "O(log n)",
            "O(n)",
            "O(n²)"
          ],
          correct: 2,
          explanation: "Linear search has O(n) time complexity in worst case because it may need to check every element."
        },
        {
          id: 4,
          question: "What is the time complexity of binary search?",
          type: "multiple-choice",
          options: [
            "O(1)",
            "O(log n)",
            "O(n)",
            "O(n²)"
          ],
          correct: 1,
          explanation: "Binary search has O(log n) time complexity because it halves the search space each iteration."
        },
        {
          id: 5,
          question: "True or False: Binary search is always better than linear search.",
          type: "true-false",
          correct: false,
          explanation: "False. Binary search is only better for sorted data. For unsorted or very small datasets, linear search might be more practical."
        },
        {
          id: 6,
          question: "True or False: Linear search examines elements sequentially from start to end.",
          type: "true-false",
          correct: true,
          explanation: "True. Linear search checks each element one by one in sequential order until the target is found or the list ends."
        },
        {
          id: 7,
          question: "True or False: Binary search can work on unsorted data if we sort it first.",
          type: "true-false",
          correct: true,
          explanation: "True. While binary search requires sorted data, you can sort unsorted data first, though this adds time complexity."
        },
        {
          id: 8,
          question: "True or False: Linear search always takes the same amount of time regardless of data size.",
          type: "true-false",
          correct: false,
          explanation: "False. Linear search time depends on where the target is located and the size of the dataset."
        },
        {
          id: 9,
          question: "Complete: Binary search works by repeatedly _____ the search space.",
          type: "fill-blank",
          answer: "halving",
          alternatives: ["dividing", "splitting", "cutting"],
          explanation: "Binary search repeatedly halves the search space by comparing with the middle element."
        },
        {
          id: 10,
          question: "Complete: Linear search has _____ space complexity.",
          type: "fill-blank",
          answer: "O(1)",
          alternatives: ["constant", "minimal", "low"],
          explanation: "Linear search uses constant O(1) space complexity as it only needs variables for the current position."
        },
        {
          id: 11,
          question: "Complete: The _____ element is examined first in binary search.",
          type: "fill-blank",
          answer: "middle",
          alternatives: ["center", "median", "mid"],
          explanation: "Binary search always starts by examining the middle element of the current search range."
        },
        {
          id: 12,
          question: "Complete: Linear search is also known as _____ search.",
          type: "fill-blank",
          answer: "sequential",
          alternatives: ["progressive", "step-by-step", "ordered"],
          explanation: "Linear search is also called sequential search because it examines elements in sequence."
        },
        {
          id: 13,
          question: "Arrange the steps of linear search algorithm:",
          type: "ordering",
          items: [
            "Start at the first element",
            "Compare current element with target",
            "If match found, return position",
            "If not match, move to next element",
            "Repeat until found or end reached"
          ],
          correct: [0, 1, 2, 3, 4],
          explanation: "Linear search starts at beginning, compares each element, returns position if found, otherwise continues to next."
        },
        {
          id: 14,
          question: "Order the steps of binary search algorithm:",
          type: "ordering",
          items: [
            "Find middle element of current range",
            "Compare middle element with target",
            "If match, return position",
            "If target smaller, search left half",
            "If target larger, search right half",
            "Repeat until found or range empty"
          ],
          correct: [0, 1, 2, 3, 4, 5],
          explanation: "Binary search finds middle, compares, returns if match, otherwise eliminates half and repeats."
        },
        {
          id: 15,
          question: "Arrange these steps to implement linear search in pseudocode:",
          type: "ordering",
          items: [
            "FOR i = 0 TO length-1",
            "IF array[i] = target THEN",
            "RETURN i",
            "END IF",
            "END FOR",
            "RETURN -1 (not found)"
          ],
          correct: [0, 1, 2, 3, 4, 5],
          explanation: "Loop through array, check each element, return index if found, return -1 if not found."
        },
        {
          id: 16,
          question: "Order the binary search implementation steps:",
          type: "ordering",
          items: [
            "SET left = 0, right = length-1",
            "WHILE left <= right",
            "SET mid = (left + right) / 2",
            "IF array[mid] = target RETURN mid",
            "ELIF target < array[mid] SET right = mid-1",
            "ELSE SET left = mid+1"
          ],
          correct: [0, 1, 2, 3, 4, 5],
          explanation: "Initialize bounds, loop while valid range, find middle, compare and adjust bounds accordingly."
        },
        {
          id: 17,
          question: "When is linear search more efficient than binary search?",
          type: "multiple-choice",
          options: [
            "Never, binary search is always better",
            "When data is unsorted and small",
            "When searching for multiple items",
            "When using slow computers"
          ],
          correct: 1,
          explanation: "Linear search can be more efficient for small, unsorted datasets where the overhead of sorting isn't justified."
        },
        {
          id: 18,
          question: "What is the best-case time complexity of linear search?",
          type: "multiple-choice",
          options: [
            "O(1) - target is first element",
            "O(log n) - target is in middle",
            "O(n) - target is last element",
            "O(n²) - target not found"
          ],
          correct: 0,
          explanation: "Best case for linear search is O(1) when the target element is found at the first position."
        },
        {
          id: 19,
          question: "What happens in binary search when the target is smaller than the middle element?",
          type: "multiple-choice",
          options: [
            "Search the right half",
            "Search the left half",
            "Search both halves",
            "Return not found"
          ],
          correct: 1,
          explanation: "When target is smaller than middle element, binary search continues with the left half of the current range."
        },
        {
          id: 20,
          question: "Which search algorithm is better for finding all occurrences of a value?",
          type: "multiple-choice",
          options: [
            "Binary search is always better",
            "Linear search, as it can easily continue searching",
            "Both are equally efficient",
            "Neither can find multiple occurrences"
          ],
          correct: 1,
          explanation: "Linear search can easily continue after finding a match to locate all occurrences, while binary search requires modification."
        }
      ],

      '2.1': [ // Data Types - 20 unique questions
        {
          id: 1,
          question: "Which data type is used to store whole numbers without decimal points?",
          type: "multiple-choice",
          options: [
            "Float",
            "String",
            "Integer",
            "Boolean"
          ],
          correct: 2,
          explanation: "Integer data type stores whole numbers like -5, 0, 42 without decimal points."
        },
        {
          id: 2,
          question: "What data type would you use to store a person's name?",
          type: "multiple-choice",
          options: [
            "Integer",
            "Float",
            "String",
            "Boolean"
          ],
          correct: 2,
          explanation: "String data type is used to store text data like names, addresses, and sentences."
        },
        {
          id: 3,
          question: "Which data type can only store True or False values?",
          type: "multiple-choice",
          options: [
            "Integer",
            "Boolean",
            "String",
            "Character"
          ],
          correct: 1,
          explanation: "Boolean data type can only store two values: True or False, used for logical operations."
        },
        {
          id: 4,
          question: "What data type is best for storing prices with cents?",
          type: "multiple-choice",
          options: [
            "Integer",
            "Boolean",
            "Float",
            "Character"
          ],
          correct: 2,
          explanation: "Float (floating-point) data type stores decimal numbers like prices: $19.99, $5.50."
        },
        {
          id: 5,
          question: "True or False: A string can contain numbers and symbols.",
          type: "true-false",
          correct: true,
          explanation: "True. Strings can contain any characters including letters, numbers, symbols, and spaces."
        },
        {
          id: 6,
          question: "True or False: Integer data type can store negative numbers.",
          type: "true-false",
          correct: true,
          explanation: "True. Integers include positive numbers, negative numbers, and zero."
        },
        {
          id: 7,
          question: "True or False: Boolean values are case-sensitive in most programming languages.",
          type: "true-false",
          correct: true,
          explanation: "True. Most languages require 'True'/'False' or 'true'/'false' with specific capitalization."
        },
        {
          id: 8,
          question: "True or False: Float and Integer can be used interchangeably in all operations.",
          type: "true-false",
          correct: false,
          explanation: "False. While often compatible, some operations require specific types, and precision can differ."
        },
        {
          id: 9,
          question: "Complete: The _____ data type stores text information.",
          type: "fill-blank",
          answer: "String",
          alternatives: ["Text", "Char", "VARCHAR"],
          explanation: "String is the primary data type for storing textual information in programming."
        },
        {
          id: 10,
          question: "Complete: _____ numbers include decimal points like 3.14 or 2.5.",
          type: "fill-blank",
          answer: "Float",
          alternatives: ["Floating-point", "Decimal", "Real"],
          explanation: "Float (floating-point) numbers contain decimal points for precise mathematical calculations."
        },
        {
          id: 11,
          question: "Complete: A _____ variable can store either true or false.",
          type: "fill-blank",
          answer: "Boolean",
          alternatives: ["Bool", "Logical", "Binary"],
          explanation: "Boolean variables store logical values: true or false, used in decision-making."
        },
        {
          id: 12,
          question: "Complete: The _____ data type stores single characters like 'A' or '5'.",
          type: "fill-blank",
          answer: "Character",
          alternatives: ["Char", "Letter", "Symbol"],
          explanation: "Character data type stores individual characters, often denoted with single quotes."
        },
        {
          id: 13,
          question: "Match data types with appropriate uses:",
          type: "ordering",
          items: [
            "Age of a person → Integer",
            "Person's full name → String",
            "Account balance → Float",
            "Is student enrolled → Boolean"
          ],
          correct: [0, 1, 2, 3],
          explanation: "Age uses Integer (whole numbers), names use String (text), money uses Float (decimals), enrollment uses Boolean (yes/no)."
        },
        {
          id: 14,
          question: "Order these from most specific to most general data storage:",
          type: "ordering",
          items: [
            "Character (single letter)",
            "String (multiple characters)",
            "Text file (multiple strings)",
            "Database (multiple files)"
          ],
          correct: [0, 1, 2, 3],
          explanation: "Data storage hierarchy goes from individual characters to strings to files to databases."
        },
        {
          id: 15,
          question: "Arrange the typical memory usage from smallest to largest:",
          type: "ordering",
          items: [
            "Boolean (1 bit)",
            "Character (1 byte)",
            "Integer (4 bytes)",
            "Float (4-8 bytes)",
            "String (variable)"
          ],
          correct: [0, 1, 2, 3, 4],
          explanation: "Memory usage typically increases: Boolean < Character < Integer ≈ Float < String (varies by length)."
        },
        {
          id: 16,
          question: "Order the process of data type selection:",
          type: "ordering",
          items: [
            "Identify what kind of data to store",
            "Consider the range of possible values",
            "Choose appropriate data type",
            "Declare variable with chosen type"
          ],
          correct: [0, 1, 2, 3],
          explanation: "Good programming practice: analyze data needs, consider constraints, select type, then implement."
        },
        {
          id: 17,
          question: "What happens when you try to store a decimal number in an integer variable?",
          type: "multiple-choice",
          options: [
            "The decimal part is kept exactly",
            "The decimal part is truncated (cut off)",
            "An error always occurs",
            "The number becomes a string"
          ],
          correct: 1,
          explanation: "When storing decimals in integers, the decimal portion is typically truncated, keeping only the whole number part."
        },
        {
          id: 18,
          question: "Which data type would be most memory-efficient for storing yes/no survey responses?",
          type: "multiple-choice",
          options: [
            "String ('yes'/'no')",
            "Integer (1/0)",
            "Boolean (true/false)",
            "Character ('Y'/'N')"
          ],
          correct: 2,
          explanation: "Boolean is most memory-efficient for yes/no data, using only 1 bit compared to bytes for other types."
        },
        {
          id: 19,
          question: "What is the key difference between a character and a string?",
          type: "multiple-choice",
          options: [
            "Characters are numbers, strings are text",
            "Characters store one symbol, strings store multiple",
            "Characters are faster, strings are slower",
            "There is no difference"
          ],
          correct: 1,
          explanation: "A character stores exactly one symbol, while a string can store zero, one, or many characters together."
        },
        {
          id: 20,
          question: "Which statement about data types is most accurate?",
          type: "multiple-choice",
          options: [
            "All programming languages use identical data types",
            "Data types help optimize memory usage and prevent errors",
            "Data types are optional in modern programming",
            "Data types only matter for mathematical calculations"
          ],
          correct: 1,
          explanation: "Data types optimize memory usage, prevent errors, and help compilers/interpreters understand how to handle data."
        }
      ],

      '2.2': [ // Input/Output Operations - 20 unique questions
        {
          id: 1,
          question: "What is the primary purpose of input operations in programming?",
          type: "multiple-choice",
          options: [
            "To display results to users",
            "To receive data from external sources",
            "To store data permanently",
            "To process mathematical calculations"
          ],
          correct: 1,
          explanation: "Input operations allow programs to receive data from users, files, sensors, or other external sources."
        },
        {
          id: 2,
          question: "Which pseudocode keyword is commonly used for receiving user input?",
          type: "multiple-choice",
          options: [
            "DISPLAY",
            "INPUT",
            "PROCESS",
            "CALCULATE"
          ],
          correct: 1,
          explanation: "INPUT is the standard pseudocode keyword for receiving data from users or external sources."
        },
        {
          id: 3,
          question: "What does the OUTPUT operation do in a program?",
          type: "multiple-choice",
          options: [
            "Receives data from users",
            "Stores data in memory",
            "Displays or sends data to external destinations",
            "Validates input data"
          ],
          correct: 2,
          explanation: "OUTPUT operations display information to users or send data to files, printers, or other destinations."
        },
        {
          id: 4,
          question: "What type of input validation should be performed on user age input?",
          type: "multiple-choice",
          options: [
            "Check if it's a positive number",
            "Check if it's within reasonable range (0-150)",
            "Check if it's a whole number",
            "All of the above"
          ],
          correct: 3,
          explanation: "Age validation should ensure the input is a positive whole number within a reasonable range."
        },
        {
          id: 5,
          question: "True or False: Input validation is optional in professional programming.",
          type: "true-false",
          correct: false,
          explanation: "False. Input validation is essential to prevent errors, security vulnerabilities, and ensure data quality."
        },
        {
          id: 6,
          question: "True or False: Programs can receive input from sources other than keyboards.",
          type: "true-false",
          correct: true,
          explanation: "True. Programs can receive input from files, networks, sensors, databases, and many other sources."
        },
        {
          id: 7,
          question: "True or False: Output operations can only display text on screen.",
          type: "true-false",
          correct: false,
          explanation: "False. Output can be text, graphics, sound, files, network data, or control signals to devices."
        },
        {
          id: 8,
          question: "True or False: User-friendly prompts improve the input experience.",
          type: "true-false",
          correct: true,
          explanation: "True. Clear, descriptive prompts help users understand what input is expected and reduce errors."
        },
        {
          id: 9,
          question: "Complete: The statement '_____ \"Enter your name: \"' displays a prompt to the user.",
          type: "fill-blank",
          answer: "OUTPUT",
          alternatives: ["PRINT", "DISPLAY", "SHOW"],
          explanation: "OUTPUT (or PRINT/DISPLAY) is used to show prompts that guide users on what input to provide."
        },
        {
          id: 10,
          question: "Complete: _____ validation ensures that user input meets expected criteria.",
          type: "fill-blank",
          answer: "Input",
          alternatives: ["Data", "User", "Entry"],
          explanation: "Input validation checks that user input is correct, complete, and safe before processing."
        },
        {
          id: 11,
          question: "Complete: The _____ loop pattern repeatedly asks for input until valid data is received.",
          type: "fill-blank",
          answer: "validation",
          alternatives: ["input", "checking", "retry"],
          explanation: "A validation loop continues asking for input until the user provides acceptable data."
        },
        {
          id: 12,
          question: "Complete: _____ input/output allows users to interact with programs in real-time.",
          type: "fill-blank",
          answer: "Interactive",
          alternatives: ["Real-time", "Dynamic", "Live"],
          explanation: "Interactive I/O enables back-and-forth communication between users and programs during execution."
        },
        {
          id: 13,
          question: "Arrange the steps of a typical input validation process:",
          type: "ordering",
          items: [
            "Display prompt to user",
            "Receive user input",
            "Validate input against criteria",
            "If valid, proceed with processing",
            "If invalid, show error and repeat"
          ],
          correct: [0, 1, 2, 3, 4],
          explanation: "Input validation follows a cycle: prompt, receive, validate, process if valid, or repeat if invalid."
        },
        {
          id: 14,
          question: "Order the components of user-friendly input design:",
          type: "ordering",
          items: [
            "Clear instruction of what to enter",
            "Examples of valid input format",
            "Input field or prompt",
            "Immediate feedback on input",
            "Error messages if needed"
          ],
          correct: [0, 1, 2, 3, 4],
          explanation: "Good input design provides clear instructions, examples, proper prompts, feedback, and helpful error messages."
        },
        {
          id: 15,
          question: "Arrange the typical flow of a calculator program:",
          type: "ordering",
          items: [
            "OUTPUT 'Enter first number:'",
            "INPUT first_number",
            "OUTPUT 'Enter operation (+, -, *, /):'",
            "INPUT operation",
            "OUTPUT 'Enter second number:'",
            "INPUT second_number",
            "Calculate result",
            "OUTPUT result"
          ],
          correct: [0, 1, 2, 3, 4, 5, 6, 7],
          explanation: "Calculator programs typically gather all inputs first, then process, then display the result."
        },
        {
          id: 16,
          question: "Order the error handling process for invalid input:",
          type: "ordering",
          items: [
            "Detect invalid input",
            "Display specific error message",
            "Clear or ignore invalid input",
            "Re-prompt user for correct input",
            "Continue when valid input received"
          ],
          correct: [0, 1, 2, 3, 4],
          explanation: "Error handling detects problems, informs users specifically, clears bad data, asks again, then continues."
        },
        {
          id: 17,
          question: "What is the main advantage of batch input over interactive input?",
          type: "multiple-choice",
          options: [
            "More user-friendly interface",
            "Better error handling",
            "Can process large amounts of data efficiently",
            "Requires less programming skill"
          ],
          correct: 2,
          explanation: "Batch input can process large datasets efficiently without user interaction for each item."
        },
        {
          id: 18,
          question: "Which type of output is most appropriate for displaying a large data report?",
          type: "multiple-choice",
          options: [
            "Screen output only",
            "Audio output",
            "File output or printer",
            "Network transmission"
          ],
          correct: 2,
          explanation: "Large reports are best output to files or printers for permanent storage and easy review."
        },
        {
          id: 19,
          question: "What is the purpose of echo input in secure applications?",
          type: "multiple-choice",
          options: [
            "To repeat user input for confirmation",
            "To hide sensitive input like passwords",
            "To make input louder",
            "To speed up input processing"
          ],
          correct: 1,
          explanation: "Echo control hides sensitive input (like passwords) by not displaying characters as they're typed."
        },
        {
          id: 20,
          question: "Which input method is most appropriate for selecting from a known set of options?",
          type: "multiple-choice",
          options: [
            "Free text input",
            "Numeric input only",
            "Menu selection or dropdown",
            "File input"
          ],
          correct: 2,
          explanation: "Menu selection or dropdowns are ideal for choosing from predetermined options, reducing errors and improving usability."
        }
      ],

      '2.3': [ // Conditional Statements - 20 unique questions
        {
          id: 1,
          question: "What is the main purpose of conditional statements in programming?",
          type: "multiple-choice",
          options: [
            "To repeat code multiple times",
            "To make decisions based on conditions",
            "To store data in variables",
            "To perform mathematical calculations"
          ],
          correct: 1,
          explanation: "Conditional statements allow programs to execute different code paths based on whether certain conditions are true or false."
        },
        {
          id: 2,
          question: "Which logical operator returns true only when both conditions are true?",
          type: "multiple-choice",
          options: [
            "OR",
            "AND",
            "NOT",
            "XOR"
          ],
          correct: 1,
          explanation: "The AND operator requires both conditions to be true for the overall expression to evaluate to true."
        },
        {
          id: 3,
          question: "What will this condition evaluate to: (5 > 3) OR (2 > 4)?",
          type: "multiple-choice",
          options: [
            "True",
            "False",
            "Error",
            "Undefined"
          ],
          correct: 0,
          explanation: "True. The OR operator returns true if at least one condition is true. Since (5 > 3) is true, the entire expression is true."
        },
        {
          id: 4,
          question: "Which comparison operator checks if two values are NOT equal?",
          type: "multiple-choice",
          options: [
            "==",
            "!=",
            "<>",
            "Both B and C"
          ],
          correct: 3,
          explanation: "Both != and <> are used to check inequality, depending on the programming language."
        },
        {
          id: 5,
          question: "True or False: The condition (x >= 5) includes the value 5.",
          type: "true-false",
          correct: true,
          explanation: "True. The >= operator means 'greater than or equal to', so it includes the boundary value 5."
        },
        {
          id: 6,
          question: "True or False: Nested IF statements can be unlimited in depth.",
          type: "true-false",
          correct: false,
          explanation: "False. While technically possible, excessive nesting becomes unreadable and most style guides recommend limits."
        },
        {
          id: 7,
          question: "True or False: The NOT operator reverses the truth value of a condition.",
          type: "true-false",
          correct: true,
          explanation: "True. NOT changes true to false and false to true, inverting the logical value."
        },
        {
          id: 8,
          question: "True or False: Multiple conditions in an IF statement always require parentheses.",
          type: "true-false",
          correct: false,
          explanation: "False. While recommended for clarity, parentheses aren't always required due to operator precedence rules."
        },
        {
          id: 9,
          question: "Complete: The _____ statement provides an alternative when the IF condition is false.",
          type: "fill-blank",
          answer: "ELSE",
          alternatives: ["OTHERWISE", "ALTERNATIVE", "DEFAULT"],
          explanation: "ELSE provides the alternative path when the IF condition evaluates to false."
        },
        {
          id: 10,
          question: "Complete: _____ allows testing multiple conditions in sequence.",
          type: "fill-blank",
          answer: "ELIF",
          alternatives: ["ELSE IF", "ELSEIF", "ELSIF"],
          explanation: "ELIF (else if) allows chaining multiple conditional tests in a single structure."
        },
        {
          id: 11,
          question: "Complete: The condition (age < 18) AND (age >= 13) checks for _____.",
          type: "fill-blank",
          answer: "teenagers",
          alternatives: ["teens", "adolescents", "minors"],
          explanation: "This condition identifies teenagers - people who are 13 or older but still under 18."
        },
        {
          id: 12,
          question: "Complete: _____ precedence determines the order of evaluation in complex conditions.",
          type: "fill-blank",
          answer: "Operator",
          alternatives: ["Logic", "Expression", "Evaluation"],
          explanation: "Operator precedence rules determine which operators are evaluated first in complex expressions."
        },
        {
          id: 13,
          question: "Arrange the logical operators by precedence (highest to lowest):",
          type: "ordering",
          items: [
            "NOT (highest precedence)",
            "AND (medium precedence)",
            "OR (lowest precedence)"
          ],
          correct: [0, 1, 2],
          explanation: "Standard precedence: NOT is evaluated first, then AND, then OR. Parentheses can override this order."
        },
        {
          id: 14,
          question: "Order the evaluation of this expression: NOT (a > 5) AND (b < 3) OR (c == 7)",
          type: "ordering",
          items: [
            "Evaluate (a > 5)",
            "Apply NOT to result",
            "Evaluate (b < 3)",
            "Apply AND operation",
            "Evaluate (c == 7)",
            "Apply OR operation"
          ],
          correct: [0, 1, 2, 3, 4, 5],
          explanation: "Evaluation follows operator precedence: comparisons first, then NOT, then AND, finally OR."
        },
        {
          id: 15,
          question: "Arrange the structure of a complete conditional statement:",
          type: "ordering",
          items: [
            "IF condition",
            "THEN statements",
            "ELIF other_condition",
            "THEN other_statements",
            "ELSE",
            "default_statements",
            "END IF"
          ],
          correct: [0, 1, 2, 3, 4, 5, 6],
          explanation: "Complete conditional structure: IF-THEN, optional ELIF-THEN, optional ELSE, closing END IF."
        },
        {
          id: 16,
          question: "Order the steps to validate a password strength:",
          type: "ordering",
          items: [
            "Check minimum length (8+ characters)",
            "Check for uppercase letters",
            "Check for lowercase letters", 
            "Check for numbers",
            "Check for special characters",
            "Determine overall strength"
          ],
          correct: [0, 1, 2, 3, 4, 5],
          explanation: "Password validation typically checks length first, then character variety, then assigns overall strength."
        },
        {
          id: 17,
          question: "What is the result of: (true AND false) OR (not false)?",
          type: "multiple-choice",
          options: [
            "true",
            "false",
            "Error",
            "Cannot be determined"
          ],
          correct: 0,
          explanation: "true. (true AND false) = false, (not false) = true, so false OR true = true."
        },
        {
          id: 18,
          question: "Which structure is best for testing a grade and assigning letter grades?",
          type: "multiple-choice",
          options: [
            "Simple IF statement",
            "IF-ELSE statement",
            "IF-ELIF-ELSE chain",
            "Nested IF statements"
          ],
          correct: 2,
          explanation: "IF-ELIF-ELSE chain is ideal for multiple ranges like grade categories, testing conditions in order."
        },
        {
          id: 19,
          question: "What happens when multiple ELIF conditions are true in a chain?",
          type: "multiple-choice",
          options: [
            "All true conditions execute",
            "Only the first true condition executes",
            "Only the last true condition executes",
            "An error occurs"
          ],
          correct: 1,
          explanation: "Only the first true condition in an IF-ELIF chain executes, then the program skips the rest."
        },
        {
          id: 20,
          question: "When should you use nested IF statements instead of logical operators?",
          type: "multiple-choice",
          options: [
            "Never, logical operators are always better",
            "When conditions depend on the results of previous conditions",
            "When you want faster execution",
            "When you have only two conditions"
          ],
          correct: 1,
          explanation: "Nested IF statements are useful when later conditions only make sense to test if earlier conditions are true."
        }
      ],

      '3.1': [ // Arrays - 20 unique questions
        {
          id: 1,
          question: "What is an array in programming?",
          type: "multiple-choice",
          options: [
            "A single variable that stores one value",
            "A collection of variables of the same data type",
            "A function that performs calculations",
            "A loop structure"
          ],
          correct: 1,
          explanation: "An array is a data structure that stores multiple values of the same data type in a single variable."
        },
        {
          id: 2,
          question: "How are array elements typically accessed?",
          type: "multiple-choice",
          options: [
            "By their names",
            "By their index numbers",
            "By their data types",
            "By their memory addresses"
          ],
          correct: 1,
          explanation: "Array elements are accessed using index numbers, usually starting from 0 in most programming languages."
        },
        {
          id: 3,
          question: "In most programming languages, what is the index of the first element in an array?",
          type: "multiple-choice",
          options: [
            "1",
            "0", 
            "-1",
            "It varies"
          ],
          correct: 1,
          explanation: "Most programming languages use 0-based indexing, where the first element is at index 0."
        },
        {
          id: 4,
          question: "What happens when you try to access an array element beyond its bounds?",
          type: "multiple-choice",
          options: [
            "The program continues normally",
            "A new element is automatically created",
            "An error or undefined behavior occurs",
            "The first element is returned"
          ],
          correct: 2,
          explanation: "Accessing an array beyond its bounds typically causes an error or undefined behavior, depending on the language."
        },
        {
          id: 5,
          question: "True or False: All elements in an array must be of the same data type.",
          type: "true-false",
          correct: true,
          explanation: "True. Arrays typically store elements of the same data type to ensure consistent memory allocation and operations."
        },
        {
          id: 6,
          question: "True or False: Array size can be changed during program execution in all languages.",
          type: "true-false",
          correct: false,
          explanation: "False. Some languages have fixed-size arrays, while others allow dynamic resizing. It depends on the specific language and array type."
        },
        {
          id: 7,
          question: "True or False: Arrays can store other arrays (nested arrays).",
          type: "true-false",
          correct: true,
          explanation: "True. Multi-dimensional arrays or arrays of arrays are common in programming for storing complex data structures."
        },
        {
          id: 8,
          question: "True or False: The length of an array is always equal to its highest index + 1.",
          type: "true-false",
          correct: true,
          explanation: "True. Since arrays start at index 0, an array of length n has indices from 0 to n-1."
        },
        {
          id: 9,
          question: "Complete: To access the third element of array 'numbers', you would write numbers[___].",
          type: "fill-blank",
          answer: "2",
          alternatives: ["two", "second", "3rd"],
          explanation: "Since arrays use 0-based indexing, the third element is at index 2 (0, 1, 2)."
        },
        {
          id: 10,
          question: "Complete: The _____ property or function typically returns the number of elements in an array.",
          type: "fill-blank",
          answer: "length",
          alternatives: ["size", "count", "len"],
          explanation: "Most languages use 'length' (or similar like 'size' or 'len') to get the number of elements in an array."
        },
        {
          id: 11,
          question: "Complete: A _____ array has rows and columns, like a table or matrix.",
          type: "fill-blank",
          answer: "two-dimensional",
          alternatives: ["2D", "multi-dimensional", "matrix"],
          explanation: "Two-dimensional arrays organize data in rows and columns, useful for tables, grids, and matrices."
        },
        {
          id: 12,
          question: "Complete: Array _____ means adding elements to an existing array.",
          type: "fill-blank",
          answer: "insertion",
          alternatives: ["addition", "appending", "pushing"],
          explanation: "Array insertion adds new elements at specific positions or at the end of the array."
        },
        {
          id: 13,
          question: "Arrange the steps to declare and initialize an array with values [10, 20, 30]:",
          type: "ordering",
          items: [
            "Declare array variable",
            "Specify array size (if required)",
            "Initialize with values {10, 20, 30}",
            "Array is ready for use"
          ],
          correct: [0, 1, 2, 3],
          explanation: "Array creation involves declaration, size specification (if needed), initialization with values, then usage."
        },
        {
          id: 14,
          question: "Order the process of finding the maximum value in an array:",
          type: "ordering",
          items: [
            "Initialize max variable with first element",
            "Loop through remaining array elements",
            "Compare current element with max",
            "If current > max, update max",
            "Return max after loop completes"
          ],
          correct: [0, 1, 2, 3, 4],
          explanation: "Finding maximum: start with first element, compare with each remaining element, update if larger, return final maximum."
        },
        {
          id: 15,
          question: "Arrange the steps to insert an element at a specific position in an array:",
          type: "ordering",
          items: [
            "Check if array has space for new element",
            "Shift elements from insertion point to the right",
            "Insert new element at desired position",
            "Update array size (if tracking separately)"
          ],
          correct: [0, 1, 2, 3],
          explanation: "Array insertion requires space checking, shifting existing elements, inserting new element, and size updating."
        },
        {
          id: 16,
          question: "Order the memory allocation process for arrays:",
          type: "ordering",
          items: [
            "Determine array size and element type",
            "Calculate total memory needed",
            "Allocate contiguous memory block",
            "Initialize array elements",
            "Return reference to array start"
          ],
          correct: [0, 1, 2, 3, 4],
          explanation: "Array memory allocation calculates space needed, allocates contiguous memory, initializes elements, returns reference."
        },
        {
          id: 17,
          question: "What is the main advantage of arrays over individual variables?",
          type: "multiple-choice",
          options: [
            "Arrays use less memory",
            "Arrays allow storing and managing multiple related values efficiently",
            "Arrays are faster to access",
            "Arrays automatically sort their contents"
          ],
          correct: 1,
          explanation: "Arrays excel at storing and managing collections of related data efficiently with simple indexing and iteration."
        },
        {
          id: 18,
          question: "Which operation is typically most efficient on arrays?",
          type: "multiple-choice",
          options: [
            "Inserting at the beginning",
            "Random access by index",
            "Deleting from the middle",
            "Searching for a specific value"
          ],
          correct: 1,
          explanation: "Random access by index is very efficient in arrays (O(1)) because elements are stored in contiguous memory."
        },
        {
          id: 19,
          question: "What is a common use case for two-dimensional arrays?",
          type: "multiple-choice",
          options: [
            "Storing a single list of numbers",
            "Representing game boards or spreadsheets",
            "Storing individual characters",
            "Managing file operations"
          ],
          correct: 1,
          explanation: "Two-dimensional arrays are perfect for representing grids like game boards, spreadsheets, or matrices."
        },
        {
          id: 20,
          question: "Which statement about array indexing is most accurate?",
          type: "multiple-choice",
          options: [
            "All programming languages start arrays at index 1",
            "Array indexing is always 0-based regardless of language",
            "Most modern languages use 0-based indexing",
            "Array indexing has no standard pattern"
          ],
          correct: 2,
          explanation: "While there are exceptions, most modern programming languages use 0-based indexing for arrays."
        }
      ],

      '3.2': [ // Functions - 20 unique questions  
        {
          id: 1,
          question: "What is the primary purpose of functions in programming?",
          type: "multiple-choice",
          options: [
            "To store data permanently",
            "To break code into reusable, organized blocks",
            "To create variables",
            "To display output to users"
          ],
          correct: 1,
          explanation: "Functions organize code into reusable blocks, improving code organization, readability, and maintainability."
        },
        {
          id: 2,
          question: "What are the values passed to a function called?",
          type: "multiple-choice",
          options: [
            "Returns",
            "Parameters",
            "Arguments", 
            "Variables"
          ],
          correct: 2,
          explanation: "Arguments are the actual values passed to a function when it's called, while parameters are the variables that receive these values."
        },
        {
          id: 3,
          question: "What keyword is used to send a value back from a function?",
          type: "multiple-choice",
          options: [
            "SEND",
            "RETURN",
            "GIVE",
            "OUTPUT"
          ],
          correct: 1,
          explanation: "RETURN is used to send a value back from a function to the code that called it."
        },
        {
          id: 4,
          question: "True or False: A function can call itself.",
          type: "true-false", 
          correct: true,
          explanation: "True. When a function calls itself, it's called recursion, which is useful for certain types of problems."
        },
        {
          id: 5,
          question: "True or False: Functions must always return a value.",
          type: "true-false",
          correct: false,
          explanation: "False. Some functions perform actions without returning values (called void functions or procedures)."
        },
        {
          id: 6,
          question: "Complete: Function _____ are the variables that receive values when the function is called.",
          type: "fill-blank",
          answer: "parameters",
          alternatives: ["arguments", "inputs", "variables"],
          explanation: "Parameters are the variables defined in the function that receive the arguments passed to it."
        },
        {
          id: 7,
          question: "What is function scope?",
          type: "multiple-choice",
          options: [
            "How long a function takes to execute",
            "Where variables in a function can be accessed",
            "How many times a function can be called",
            "The number of parameters a function has"
          ],
          correct: 1,
          explanation: "Function scope determines where variables declared in a function can be accessed from within the program."
        },
        {
          id: 8,
          question: "True or False: Local variables exist only inside their function.",
          type: "true-false",
          correct: true,
          explanation: "True. Local variables are only accessible within the function where they're declared."
        },
        {
          id: 9,
          question: "Complete: A function with no parameters is called with _____ parentheses.",
          type: "fill-blank",
          answer: "empty",
          alternatives: ["blank", "void", "no"],
          explanation: "Functions with no parameters are called with empty parentheses: functionName()."
        },
        {
          id: 10,
          question: "What makes code modular?",
          type: "multiple-choice",
          options: [
            "Using many variables",
            "Breaking code into functions",
            "Writing long programs",
            "Using complex algorithms"
          ],
          correct: 1,
          explanation: "Breaking code into functions creates modular code that's easier to understand, test, and maintain."
        },
        {
          id: 11,
          question: "True or False: Function names should describe what the function does.",
          type: "true-false",
          correct: true,
          explanation: "True. Descriptive function names make code more readable and self-documenting."
        },
        {
          id: 12,
          question: "Complete: Functions help eliminate _____ code by allowing reuse.",
          type: "fill-blank",
          answer: "duplicate",
          alternatives: ["repeated", "redundant", "copied"],
          explanation: "Functions eliminate duplicate code by providing a single, reusable implementation."
        },
        {
          id: 13,
          question: "What is a function library?",
          type: "multiple-choice",
          options: [
            "A collection of related functions",
            "A type of variable",
            "A programming language",
            "A loop structure"
          ],
          correct: 0,
          explanation: "A function library is a collection of related functions that can be used together in programs."
        },
        {
          id: 14,
          question: "True or False: Functions can have multiple return statements.",
          type: "true-false",
          correct: true,
          explanation: "True. Functions can have multiple return statements, though only one will execute per function call."
        },
        {
          id: 15,
          question: "Complete: The _____ of a function is defined by what it does, not how it does it.",
          type: "fill-blank",
          answer: "interface",
          alternatives: ["purpose", "contract", "specification"],
          explanation: "A function's interface defines what it does (inputs and outputs) while hiding implementation details."
        },
        {
          id: 16,
          question: "What is function overloading?",
          type: "multiple-choice",
          options: [
            "Calling a function too many times",
            "Having multiple functions with the same name but different parameters",
            "Making a function too complex",
            "Using too many variables in a function"
          ],
          correct: 1,
          explanation: "Function overloading allows multiple functions with the same name but different parameter lists."
        },
        {
          id: 17,
          question: "True or False: Global variables can be accessed inside functions.",
          type: "true-false",
          correct: true,
          explanation: "True. Global variables can typically be accessed from anywhere in the program, including inside functions."
        },
        {
          id: 18,
          question: "Complete: Functions that don't return values are sometimes called _____.",
          type: "fill-blank",
          answer: "procedures",
          alternatives: ["subroutines", "void", "methods"],
          explanation: "Functions that perform actions without returning values are often called procedures or void functions."
        },
        {
          id: 19,
          question: "What is the main benefit of function testing?",
          type: "multiple-choice",
          options: [
            "Making functions run faster",
            "Ensuring functions work correctly in isolation",
            "Reducing memory usage",
            "Making code longer"
          ],
          correct: 1,
          explanation: "Function testing ensures each function works correctly by itself, making debugging easier."
        },
        {
          id: 20,
          question: "True or False: Well-designed functions should do one specific task well.",
          type: "true-false",
          correct: true,
          explanation: "True. Functions should follow the single responsibility principle, doing one thing well for better maintainability."
        }
      ],

      '4.1': [ // Basic Programming Concepts - 20 unique questions
        {
          id: 1,
          question: "What is a variable in programming?",
          type: "multiple-choice",
          options: [
            "A constant value that never changes",
            "A named storage location that can hold data",
            "A type of loop structure",
            "A mathematical operation"
          ],
          correct: 1,
          explanation: "A variable is a named storage location in memory that can hold and change data during program execution."
        },
        {
          id: 2,
          question: "What is an algorithm?",
          type: "multiple-choice",
          options: [
            "A programming language",
            "A step-by-step procedure to solve a problem",
            "A type of computer hardware",
            "A debugging tool"
          ],
          correct: 1,
          explanation: "An algorithm is a step-by-step procedure or set of rules designed to solve a specific problem."
        },
        {
          id: 3,
          question: "True or False: Programming is only about writing code.",
          type: "true-false",
          correct: false,
          explanation: "False. Programming involves problem analysis, algorithm design, coding, testing, and debugging."
        },
        {
          id: 4,
          question: "What is debugging?",
          type: "multiple-choice",
          options: [
            "Writing new code",
            "Finding and fixing errors in code",
            "Deleting old programs",
            "Installing software"
          ],
          correct: 1,
          explanation: "Debugging is the process of finding and fixing errors (bugs) in computer programs."
        },
        {
          id: 5,
          question: "Complete: A _____ is a container that holds data that can change during program execution.",
          type: "fill-blank",
          answer: "variable",
          alternatives: ["container", "holder", "storage"],
          explanation: "A variable is a named container that can store and change data values during program execution."
        },
        {
          id: 6,
          question: "True or False: Constants can be changed during program execution.",
          type: "true-false",
          correct: false,
          explanation: "False. Constants are values that remain unchanged throughout program execution."
        },
        {
          id: 7,
          question: "What is syntax in programming?",
          type: "multiple-choice",
          options: [
            "The meaning of code",
            "The rules for writing code correctly",
            "The speed of execution",
            "The memory usage"
          ],
          correct: 1,
          explanation: "Syntax refers to the rules and structure for writing code correctly in a programming language."
        },
        {
          id: 8,
          question: "Complete: _____ errors occur when code violates language rules.",
          type: "fill-blank",
          answer: "Syntax",
          alternatives: ["Grammar", "Structure", "Format"],
          explanation: "Syntax errors occur when code doesn't follow the correct rules and structure of the programming language."
        },
        {
          id: 9,
          question: "True or False: Logic errors prevent programs from running.",
          type: "true-false",
          correct: false,
          explanation: "False. Logic errors allow programs to run but produce incorrect results."
        },
        {
          id: 10,
          question: "What is a compiler?",
          type: "multiple-choice",
          options: [
            "A type of variable",
            "A program that translates code into machine language",
            "A debugging tool",
            "A data storage method"
          ],
          correct: 1,
          explanation: "A compiler translates high-level programming code into machine language that computers can execute."
        },
        {
          id: 11,
          question: "Complete: An _____ executes code line by line without prior translation.",
          type: "fill-blank",
          answer: "interpreter",
          alternatives: ["executor", "runner", "processor"],
          explanation: "An interpreter executes code directly, line by line, without first translating it to machine code."
        },
        {
          id: 12,
          question: "True or False: Comments in code are executed by the computer.",
          type: "true-false",
          correct: false,
          explanation: "False. Comments are ignored by compilers/interpreters and are only for human readers."
        },
        {
          id: 13,
          question: "What is the purpose of comments in code?",
          type: "multiple-choice",
          options: [
            "To make programs run faster",
            "To explain code for human readers",
            "To store data",
            "To create variables"
          ],
          correct: 1,
          explanation: "Comments explain code for human readers, making programs easier to understand and maintain."
        },
        {
          id: 14,
          question: "Complete: Good _____ makes code easier to read and understand.",
          type: "fill-blank",
          answer: "documentation",
          alternatives: ["commenting", "explanation", "description"],
          explanation: "Good documentation, including comments, makes code easier to read, understand, and maintain."
        },
        {
          id: 15,
          question: "True or False: Variable names should be descriptive and meaningful.",
          type: "true-false",
          correct: true,
          explanation: "True. Descriptive variable names make code more readable and self-documenting."
        },
        {
          id: 16,
          question: "What is pseudocode?",
          type: "multiple-choice",
          options: [
            "Fake programming code",
            "A simplified way to describe algorithms using plain language",
            "Broken code with errors",
            "Code written in a secret language"
          ],
          correct: 1,
          explanation: "Pseudocode is a simplified way to describe algorithms using plain language before writing actual code."
        },
        {
          id: 17,
          question: "Complete: _____ testing involves checking if a program works as expected.",
          type: "fill-blank",
          answer: "Program",
          alternatives: ["Software", "Code", "Application"],
          explanation: "Program testing involves checking if software works correctly and produces expected results."
        },
        {
          id: 18,
          question: "True or False: Programming requires mathematical expertise.",
          type: "true-false",
          correct: false,
          explanation: "False. While math can be helpful, programming primarily requires logical thinking and problem-solving skills."
        },
        {
          id: 19,
          question: "What is the most important skill for programming?",
          type: "multiple-choice",
          options: [
            "Fast typing",
            "Logical problem-solving",
            "Memorizing syntax",
            "Advanced mathematics"
          ],
          correct: 1,
          explanation: "Logical problem-solving is the most important skill, as programming is fundamentally about solving problems systematically."
        },
        {
          id: 20,
          question: "True or False: Learning to program improves logical thinking skills.",
          type: "true-false",
          correct: true,
          explanation: "True. Programming develops logical thinking, problem-solving, and analytical skills that benefit many areas of life."
        }
      ],

      '4.2': [ // Problem Solving - 20 unique questions
        {
          id: 1,
          question: "What is the first step in problem-solving methodology?",
          type: "multiple-choice",
          options: [
            "Write the code immediately",
            "Test the solution",
            "Understand and define the problem clearly",
            "Choose a programming language"
          ],
          correct: 2,
          explanation: "Understanding and clearly defining the problem is the crucial first step before attempting any solution."
        },
        {
          id: 2,
          question: "What is decomposition in problem-solving?",
          type: "multiple-choice",
          options: [
            "Breaking a large problem into smaller, manageable parts",
            "Deleting unnecessary code",
            "Combining multiple problems",
            "Testing solutions"
          ],
          correct: 0,
          explanation: "Decomposition involves breaking down complex problems into smaller, more manageable sub-problems."
        },
        {
          id: 3,
          question: "True or False: There is always only one correct solution to a programming problem.",
          type: "true-false",
          correct: false,
          explanation: "False. Most programming problems can be solved in multiple ways, each with different trade-offs."
        },
        {
          id: 4,
          question: "What is pattern recognition in problem-solving?",
          type: "multiple-choice",
          options: [
            "Recognizing similar problems or solutions",
            "Finding bugs in code",
            "Creating visual patterns",
            "Memorizing code syntax"
          ],
          correct: 0,
          explanation: "Pattern recognition involves identifying similarities between problems to apply known solutions or approaches."
        },
        {
          id: 5,
          question: "Complete: _____ thinking involves looking at problems from different perspectives.",
          type: "fill-blank",
          answer: "Creative",
          alternatives: ["Lateral", "Innovative", "Alternative"],
          explanation: "Creative thinking involves approaching problems from multiple angles to find innovative solutions."
        },
        {
          id: 6,
          question: "True or False: Trial and error is a valid problem-solving approach.",
          type: "true-false",
          correct: true,
          explanation: "True. Trial and error, when used systematically, can be an effective way to explore solutions."
        },
        {
          id: 7,
          question: "What is abstraction in problem-solving?",
          type: "multiple-choice",
          options: [
            "Making problems more complex",
            "Focusing on essential features while ignoring irrelevant details",
            "Creating abstract art",
            "Using complex mathematics"
          ],
          correct: 1,
          explanation: "Abstraction involves focusing on the essential aspects of a problem while filtering out unnecessary details."
        },
        {
          id: 8,
          question: "Complete: A _____ solution works for all valid inputs, not just specific cases.",
          type: "fill-blank",
          answer: "general",
          alternatives: ["universal", "complete", "robust"],
          explanation: "A general solution handles all valid inputs and edge cases, not just specific examples."
        },
        {
          id: 9,
          question: "True or False: It's important to test edge cases when solving problems.",
          type: "true-false",
          correct: true,
          explanation: "True. Edge cases (extreme or unusual inputs) often reveal problems that normal test cases miss."
        },
        {
          id: 10,
          question: "What is an edge case?",
          type: "multiple-choice",
          options: [
            "A normal, typical input",
            "An extreme or boundary condition",
            "The first case to test",
            "An impossible input"
          ],
          correct: 1,
          explanation: "Edge cases are extreme or boundary conditions that might cause problems in solutions."
        },
        {
          id: 11,
          question: "Complete: _____ analysis involves examining what could go wrong with a solution.",
          type: "fill-blank",
          answer: "Risk",
          alternatives: ["Error", "Failure", "Problem"],
          explanation: "Risk analysis involves identifying potential problems and failure points in solutions."
        },
        {
          id: 12,
          question: "True or False: Optimization should be the first priority when solving problems.",
          type: "true-false",
          correct: false,
          explanation: "False. Getting a correct solution first is more important than optimization, which can come later."
        },
        {
          id: 13,
          question: "What is the purpose of prototyping in problem-solving?",
          type: "multiple-choice",
          options: [
            "Creating the final solution",
            "Testing ideas quickly with a simple version",
            "Making solutions more complex",
            "Avoiding actual implementation"
          ],
          correct: 1,
          explanation: "Prototyping allows quick testing of ideas with simplified versions before full implementation."
        },
        {
          id: 14,
          question: "Complete: _____ methodology emphasizes iterative improvement of solutions.",
          type: "fill-blank",
          answer: "Agile",
          alternatives: ["Iterative", "Incremental", "Refinement"],
          explanation: "Agile methodology emphasizes iterative development with continuous improvement and refinement."
        },
        {
          id: 15,
          question: "True or False: Documentation is only needed after the problem is solved.",
          type: "true-false",
          correct: false,
          explanation: "False. Documentation throughout the problem-solving process helps track decisions and reasoning."
        },
        {
          id: 16,
          question: "What is backtracking in problem-solving?",
          type: "multiple-choice",
          options: [
            "Going back to a previous step when the current path fails",
            "Deleting all work and starting over",
            "Working backwards from the solution",
            "Reviewing old code"
          ],
          correct: 0,
          explanation: "Backtracking involves returning to a previous step when the current approach leads to a dead end."
        },
        {
          id: 17,
          question: "Complete: _____ testing involves checking solutions with different types of input.",
          type: "fill-blank",
          answer: "Comprehensive",
          alternatives: ["Thorough", "Complete", "Extensive"],
          explanation: "Comprehensive testing involves checking solutions with various input types to ensure robustness."
        },
        {
          id: 18,
          question: "True or False: Collaboration can improve problem-solving effectiveness.",
          type: "true-false",
          correct: true,
          explanation: "True. Collaboration brings different perspectives and skills that can lead to better solutions."
        },
        {
          id: 19,
          question: "What is the benefit of explaining your solution to others?",
          type: "multiple-choice",
          options: [
            "Showing off your knowledge",
            "Identifying gaps or errors in your reasoning",
            "Making the solution more complex",
            "Wasting time"
          ],
          correct: 1,
          explanation: "Explaining solutions helps identify gaps, errors, or improvements that might not be obvious to yourself."
        },
        {
          id: 20,
          question: "True or False: Good problem-solving skills transfer to areas outside programming.",
          type: "true-false",
          correct: true,
          explanation: "True. Problem-solving skills learned in programming apply to many other areas of life and work."
        }
      ]
    };

    return questionBanks[subtopicId] || [];
  };
  
  const getLegacyQuestions = (subtopicId) => {
    const questionBank = {
      '1.1': [ // Pseudocode - 20 questions
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
            "read()",
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
        },
        {
          id: 6,
          question: "Which keyword is used to display output in pseudocode?",
          type: "multiple-choice",
          options: ["PRINT", "OUTPUT", "DISPLAY", "All of the above"],
          correct: 3,
          explanation: "PRINT, OUTPUT, and DISPLAY are all commonly used keywords in pseudocode to show results."
        },
        {
          id: 7,
          question: "What is the purpose of pseudocode?",
          type: "multiple-choice",
          options: [
            "To replace actual programming",
            "To plan and design algorithms before coding",
            "To debug programs",
            "To run programs faster"
          ],
          correct: 1,
          explanation: "Pseudocode helps plan and design algorithms in a human-readable way before writing actual code."
        },
        {
          id: 8,
          question: "True or False: Pseudocode can be written in any natural language.",
          type: "true-false",
          correct: true,
          explanation: "True. Pseudocode can be written in any natural language as long as it clearly expresses the algorithm logic."
        },
        {
          id: 9,
          question: "Which of these is NOT a typical pseudocode keyword?",
          type: "multiple-choice",
          options: ["IF", "WHILE", "class", "FOR"],
          correct: 2,
          explanation: "While 'class' is a programming construct, it's not typically used in basic pseudocode algorithms."
        },
        {
          id: 10,
          question: "In pseudocode, what does WHILE represent?",
          type: "multiple-choice",
          options: [
            "A conditional statement",
            "A loop that repeats while a condition is true",
            "An input statement",
            "An output statement"
          ],
          correct: 1,
          explanation: "WHILE represents a loop structure that continues executing while a specified condition remains true."
        },
        {
          id: 11,
          question: "Complete this pseudocode statement: _____ name FROM user",
          type: "fill-blank",
          answer: "INPUT",
          alternatives: ["GET", "READ", "ACCEPT"],
          explanation: "INPUT is the standard keyword for getting data from the user in pseudocode."
        },
        {
          id: 12,
          question: "What should come after an IF statement in pseudocode?",
          type: "multiple-choice",
          options: ["ELSE", "THEN", "DO", "END"],
          correct: 1,
          explanation: "THEN typically follows an IF statement to indicate what action to perform when the condition is true."
        },
        {
          id: 13,
          question: "True or False: Pseudocode should include specific programming language syntax.",
          type: "true-false",
          correct: false,
          explanation: "False. Pseudocode should be language-independent and focus on logic rather than specific syntax."
        },
        {
          id: 14,
          question: "Which structure would you use to repeat an action a specific number of times?",
          type: "multiple-choice",
          options: ["IF...THEN", "WHILE", "FOR", "OUTPUT"],
          correct: 2,
          explanation: "FOR loops are typically used when you know exactly how many times you want to repeat an action."
        },
        {
          id: 15,
          question: "What does SET mean in pseudocode?",
          type: "multiple-choice",
          options: [
            "Create a collection",
            "Assign a value to a variable",
            "Start a loop",
            "End the program"
          ],
          correct: 1,
          explanation: "SET is used to assign a value to a variable in pseudocode."
        },
        {
          id: 16,
          question: "Complete: FOR i = 1 TO 10 _____ OUTPUT i",
          type: "fill-blank",
          answer: "DO",
          alternatives: ["THEN", "REPEAT", "EXECUTE"],
          explanation: "DO is commonly used after FOR statements to indicate the actions to be repeated."
        },
        {
          id: 17,
          question: "True or False: Comments can be included in pseudocode.",
          type: "true-false",
          correct: true,
          explanation: "True. Comments help explain the logic and make pseudocode more understandable."
        },
        {
          id: 18,
          question: "Which is the correct way to end a pseudocode algorithm?",
          type: "multiple-choice",
          options: ["STOP", "END", "FINISH", "All are acceptable"],
          correct: 3,
          explanation: "STOP, END, and FINISH are all acceptable ways to indicate the end of a pseudocode algorithm."
        },
        {
          id: 19,
          question: "What type of structure is IF...THEN...ELSE?",
          type: "multiple-choice",
          options: [
            "Sequential",
            "Selection/Decision",
            "Repetition/Loop",
            "Input/Output"
          ],
          correct: 1,
          explanation: "IF...THEN...ELSE is a selection or decision structure that chooses between different paths."
        },
        {
          id: 20,
          question: "True or False: Pseudocode must be written before any actual programming begins.",
          type: "true-false",
          correct: false,
          explanation: "False. While pseudocode is helpful for planning, it's not mandatory to write it before programming, though it's often recommended."
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
      '1.3': [
        {
          id: 1,
          question: "What is the main difference between linear search and binary search?",
          type: "multiple-choice",
          options: [
            "Linear search is faster than binary search",
            "Binary search requires sorted data, linear search doesn't",
            "Linear search uses more memory than binary search",
            "Binary search only works with numbers"
          ],
          correct: 1,
          explanation: "Binary search requires the data to be sorted beforehand, while linear search can work on unsorted data."
        },
        {
          id: 2,
          question: "In binary search, what happens when the target is found?",
          type: "multiple-choice",
          options: [
            "Continue searching to find duplicates",
            "Return the position and stop searching",
            "Search the entire remaining list",
            "Start over from the beginning"
          ],
          correct: 1,
          explanation: "When the target is found in binary search, the algorithm returns the position and stops searching."
        },
        {
          id: 3,
          question: "What is the time complexity of linear search in the worst case?",
          type: "multiple-choice",
          options: [
            "O(1)",
            "O(log n)",
            "O(n)",
            "O(n²)"
          ],
          correct: 2,
          explanation: "Linear search has O(n) time complexity in the worst case because it may need to check every element."
        },
        {
          id: 4,
          question: "True or False: Binary search is always better than linear search.",
          type: "true-false",
          correct: false,
          explanation: "False. Binary search is only better when data is sorted. For unsorted data or very small datasets, linear search might be more practical."
        },
        {
          id: 5,
          question: "Complete the statement: Binary search works by repeatedly _____ the search space.",
          type: "fill-blank",
          answer: "halving",
          alternatives: ["dividing", "splitting", "cutting"],
          explanation: "Binary search works by repeatedly halving the search space by comparing with the middle element."
        }
      ],
      '1.4': [
        {
          id: 1,
          question: "Which of the following is a correct if statement in Python?",
          type: "multiple-choice",
          options: [
            "if (x > 5) { print('greater') }",
            "if x > 5: print('greater')",
            "if x > 5 then print('greater')",
            "if x > 5 do print('greater')"
          ],
          correct: 1,
          explanation: "Python uses 'if condition:' syntax with a colon and indentation for the code block."
        },
        {
          id: 2,
          question: "What is the purpose of the 'elif' statement?",
          type: "multiple-choice",
          options: [
            "To end an if statement",
            "To check additional conditions when the first if is false",
            "To repeat a condition",
            "To create a loop"
          ],
          correct: 1,
          explanation: "'elif' (else if) allows you to check additional conditions when the previous if/elif conditions are false."
        },
        {
          id: 3,
          question: "What will this code output?\n\nx = 10\nif x > 15:\n    print('A')\nelif x > 5:\n    print('B')\nelse:\n    print('C')",
          type: "multiple-choice",
          options: [
            "A",
            "B",
            "C",
            "Nothing"
          ],
          correct: 1,
          explanation: "Since x=10 is not > 15 but is > 5, the elif condition is true and 'B' is printed."
        },
        {
          id: 4,
          question: "True or False: In Python, indentation is required for conditional statements.",
          type: "true-false",
          correct: true,
          explanation: "True. Python uses indentation to define code blocks, making it mandatory for conditional statements."
        },
        {
          id: 5,
          question: "What operator is used for 'not equal to' in most programming languages?",
          type: "fill-blank",
          answer: "!=",
          alternatives: ["<>", "~="],
          explanation: "The != operator is used for 'not equal to' comparison in most programming languages."
        }
      ],
      '1.5': [
        {
          id: 1,
          question: "Which of the following is NOT a basic data type in most programming languages?",
          type: "multiple-choice",
          options: [
            "Integer",
            "String",
            "Boolean",
            "Algorithm"
          ],
          correct: 3,
          explanation: "Algorithm is not a data type; it's a set of instructions. Integer, String, and Boolean are basic data types."
        },
        {
          id: 2,
          question: "What is the difference between a list and a string?",
          type: "multiple-choice",
          options: [
            "Lists can only store numbers, strings can only store text",
            "Lists can store multiple items of different types, strings store sequences of characters",
            "There is no difference",
            "Lists are faster than strings"
          ],
          correct: 1,
          explanation: "Lists can store multiple items of various data types, while strings specifically store sequences of characters."
        },
        {
          id: 3,
          question: "What does 'variable scope' refer to?",
          type: "multiple-choice",
          options: [
            "The size of a variable",
            "The type of data a variable can hold",
            "Where in the program a variable can be accessed",
            "How fast a variable can be processed"
          ],
          correct: 2,
          explanation: "Variable scope refers to the region of the program where a variable can be accessed and used."
        },
        {
          id: 4,
          question: "True or False: In most programming languages, you must declare a variable's type before using it.",
          type: "true-false",
          correct: false,
          explanation: "False. Many modern languages like Python are dynamically typed and don't require explicit type declaration."
        },
        {
          id: 5,
          question: "What is the term for converting one data type to another?",
          type: "fill-blank",
          answer: "casting",
          alternatives: ["conversion", "transformation", "type conversion"],
          explanation: "Type casting (or conversion) is the process of converting one data type to another."
        }
      ],
      '1.6': [
        {
          id: 1,
          question: "What is a programming library?",
          type: "multiple-choice",
          options: [
            "A place where programmers work",
            "A collection of pre-written code that can be reused",
            "A type of programming language",
            "A debugging tool"
          ],
          correct: 1,
          explanation: "A programming library is a collection of pre-written code, functions, and modules that can be reused in programs."
        },
        {
          id: 2,
          question: "What is the main advantage of using libraries?",
          type: "multiple-choice",
          options: [
            "They make programs run slower",
            "They save time and reduce code duplication",
            "They make programs harder to understand",
            "They are only for advanced programmers"
          ],
          correct: 1,
          explanation: "Libraries save development time and reduce code duplication by providing tested, reusable functionality."
        },
        {
          id: 3,
          question: "Which statement about importing libraries is correct?",
          type: "multiple-choice",
          options: [
            "You must import the entire library every time",
            "You can import specific functions or the entire library",
            "Libraries cannot be imported in most languages",
            "Importing libraries slows down your program significantly"
          ],
          correct: 1,
          explanation: "Most programming languages allow you to import specific functions or modules from a library, or import the entire library."
        },
        {
          id: 4,
          question: "True or False: Popular libraries are usually well-tested and reliable.",
          type: "true-false",
          correct: true,
          explanation: "True. Popular libraries are typically well-tested by many developers and maintained by experienced teams."
        },
        {
          id: 5,
          question: "What is the Python keyword used to import libraries?",
          type: "fill-blank",
          answer: "import",
          alternatives: ["include", "require", "use"],
          explanation: "Python uses the 'import' keyword to include libraries and modules in your program."
        }
      ],
      '1.7': [
        {
          id: 1,
          question: "What does SDLC stand for?",
          type: "multiple-choice",
          options: [
            "Software Design Life Cycle",
            "Software Development Life Cycle",
            "System Development Life Cycle",
            "Software Debugging Life Cycle"
          ],
          correct: 1,
          explanation: "SDLC stands for Software Development Life Cycle, which is the process of developing software applications."
        },
        {
          id: 2,
          question: "Which phase comes first in the software development process?",
          type: "multiple-choice",
          options: [
            "Coding",
            "Testing",
            "Planning and Requirements",
            "Deployment"
          ],
          correct: 2,
          explanation: "Planning and Requirements gathering is the first phase, where you understand what needs to be built."
        },
        {
          id: 3,
          question: "What is the purpose of version control systems like Git?",
          type: "multiple-choice",
          options: [
            "To make programs run faster",
            "To track changes and collaborate on code",
            "To compile programs",
            "To test software automatically"
          ],
          correct: 1,
          explanation: "Version control systems track changes to code over time and enable multiple developers to collaborate effectively."
        },
        {
          id: 4,
          question: "True or False: Testing should only be done after all coding is complete.",
          type: "true-false",
          correct: false,
          explanation: "False. Modern software development practices emphasize testing throughout the development process, not just at the end."
        },
        {
          id: 5,
          question: "What methodology emphasizes iterative development and customer collaboration?",
          type: "fill-blank",
          answer: "Agile",
          alternatives: ["Scrum", "iterative"],
          explanation: "Agile methodology emphasizes iterative development, customer collaboration, and responding to change."
        }
      ],
      '1.8': [
        {
          id: 1,
          question: "What is physical computing?",
          type: "multiple-choice",
          options: [
            "Computing with physical exercise",
            "Building and interacting with physical systems using software and hardware",
            "Using only desktop computers",
            "Computing without electricity"
          ],
          correct: 1,
          explanation: "Physical computing involves building interactive physical systems by using software and hardware that can sense and respond to the physical world."
        },
        {
          id: 2,
          question: "Which of the following is commonly used in physical computing projects?",
          type: "multiple-choice",
          options: [
            "Arduino",
            "Microsoft Word",
            "Photoshop",
            "Web browsers"
          ],
          correct: 0,
          explanation: "Arduino is a popular microcontroller platform used in physical computing projects to control sensors, motors, and other hardware."
        },
        {
          id: 3,
          question: "What is a sensor in physical computing?",
          type: "multiple-choice",
          options: [
            "A type of computer screen",
            "A device that detects and measures physical properties",
            "A programming language",
            "A type of software"
          ],
          correct: 1,
          explanation: "A sensor is a device that detects and measures physical properties like temperature, light, motion, or sound."
        },
        {
          id: 4,
          question: "True or False: Physical computing projects can only work with digital inputs.",
          type: "true-false",
          correct: false,
          explanation: "False. Physical computing projects work with both analog inputs (like temperature, light levels) and digital inputs (like button presses)."
        },
        {
          id: 5,
          question: "What type of device converts digital signals to physical actions?",
          type: "fill-blank",
          answer: "actuator",
          alternatives: ["motor", "servo", "output device"],
          explanation: "An actuator is a device that converts digital signals into physical actions, such as motors, servos, or LEDs."
        }
      ],
      '2.1': [
        {
          id: 1,
          question: "What is a database?",
          type: "multiple-choice",
          options: [
            "A collection of unorganized files",
            "A structured collection of data that can be easily accessed and managed",
            "A type of computer hardware",
            "A programming language"
          ],
          correct: 1,
          explanation: "A database is a structured collection of data that is organized and stored in a way that allows for efficient access, management, and retrieval."
        },
        {
          id: 2,
          question: "What does SQL stand for?",
          type: "multiple-choice",
          options: [
            "Simple Query Language",
            "Structured Query Language",
            "Standard Query Language",
            "System Query Language"
          ],
          correct: 1,
          explanation: "SQL stands for Structured Query Language, which is used to communicate with and manipulate databases."
        },
        {
          id: 3,
          question: "What is the primary key in a database table?",
          type: "multiple-choice",
          options: [
            "The most important data in the table",
            "A unique identifier for each record in the table",
            "The first column in the table",
            "The password to access the table"
          ],
          correct: 1,
          explanation: "A primary key is a unique identifier for each record (row) in a database table, ensuring no duplicate records exist."
        },
        {
          id: 4,
          question: "True or False: Data in a database can be sorted and filtered.",
          type: "true-false",
          correct: true,
          explanation: "True. Databases provide powerful capabilities to sort, filter, and query data based on various criteria."
        },
        {
          id: 5,
          question: "What is the term for retrieving specific data from a database?",
          type: "fill-blank",
          answer: "query",
          alternatives: ["search", "select", "retrieval"],
          explanation: "A query is a request for specific data from a database, typically written in SQL or another database language."
        }
      ],
      '2.2': [
        {
          id: 1,
          question: "What is data validation?",
          type: "multiple-choice",
          options: [
            "Making data look prettier",
            "Checking that data meets certain criteria before it's processed or stored",
            "Deleting unnecessary data",
            "Converting data to different formats"
          ],
          correct: 1,
          explanation: "Data validation is the process of checking that data meets certain criteria, rules, or constraints before it's processed or stored."
        },
        {
          id: 2,
          question: "Which of the following is an example of data validation?",
          type: "multiple-choice",
          options: [
            "Checking that an email address contains an @ symbol",
            "Making text bold",
            "Changing font colors",
            "Adding more data to a file"
          ],
          correct: 0,
          explanation: "Checking that an email address contains an @ symbol is a form of format validation to ensure the data follows expected patterns."
        },
        {
          id: 3,
          question: "What is data verification?",
          type: "multiple-choice",
          options: [
            "Making data faster to process",
            "Confirming that data has been accurately entered or transferred",
            "Encrypting data for security",
            "Compressing data to save space"
          ],
          correct: 1,
          explanation: "Data verification is the process of confirming that data has been accurately entered, transferred, or processed without errors."
        },
        {
          id: 4,
          question: "True or False: Data validation should only be done once when data is first entered.",
          type: "true-false",
          correct: false,
          explanation: "False. Data validation should be performed at multiple stages - during input, processing, and storage to ensure data integrity throughout its lifecycle."
        },
        {
          id: 5,
          question: "What type of validation checks if a number falls within an acceptable range?",
          type: "fill-blank",
          answer: "range",
          alternatives: ["boundary", "limit", "constraint"],
          explanation: "Range validation (or range checking) ensures that numerical data falls within specified minimum and maximum values."
        }
      ],
      '3.1': [
        {
          id: 1,
          question: "What is a computer network?",
          type: "multiple-choice",
          options: [
            "A single computer with multiple programs",
            "A group of interconnected computers that can communicate and share resources",
            "A type of computer hardware",
            "A programming language for computers"
          ],
          correct: 1,
          explanation: "A computer network is a group of interconnected computers that can communicate with each other and share resources like files, printers, and internet connections."
        },
        {
          id: 2,
          question: "What does LAN stand for?",
          type: "multiple-choice",
          options: [
            "Large Area Network",
            "Local Area Network",
            "Long Access Network",
            "Limited Area Network"
          ],
          correct: 1,
          explanation: "LAN stands for Local Area Network, which connects computers within a limited geographical area like a home, office, or school."
        },
        {
          id: 3,
          question: "What is the main difference between LAN and WAN?",
          type: "multiple-choice",
          options: [
            "LAN is faster than WAN",
            "LAN covers a smaller geographical area than WAN",
            "LAN is more secure than WAN",
            "All of the above"
          ],
          correct: 3,
          explanation: "All statements are generally true: LANs typically cover smaller areas, are faster due to shorter distances, and are more secure due to physical control."
        },
        {
          id: 4,
          question: "True or False: The Internet is an example of a WAN (Wide Area Network).",
          type: "true-false",
          correct: true,
          explanation: "True. The Internet is the largest example of a WAN, connecting networks and computers across the globe."
        },
        {
          id: 5,
          question: "What device is commonly used to connect multiple devices in a local network?",
          type: "fill-blank",
          answer: "router",
          alternatives: ["switch", "hub", "gateway"],
          explanation: "A router is commonly used to connect multiple devices in a local network and provide internet access."
        }
      ],
      '3.2': [
        {
          id: 1,
          question: "What does HTTP stand for?",
          type: "multiple-choice",
          options: [
            "HyperText Transfer Protocol",
            "High Transfer Text Protocol",
            "HyperText Transmission Protocol",
            "Home Transfer Text Protocol"
          ],
          correct: 0,
          explanation: "HTTP stands for HyperText Transfer Protocol, which is used for transferring web pages and data over the internet."
        },
        {
          id: 2,
          question: "What is the difference between HTTP and HTTPS?",
          type: "multiple-choice",
          options: [
            "HTTPS is faster than HTTP",
            "HTTPS is encrypted and more secure than HTTP",
            "HTTPS only works with certain browsers",
            "There is no difference"
          ],
          correct: 1,
          explanation: "HTTPS (HTTP Secure) uses encryption to protect data transmission, making it more secure than regular HTTP."
        },
        {
          id: 3,
          question: "What is a URL?",
          type: "multiple-choice",
          options: [
            "A type of computer virus",
            "A web address that specifies the location of a resource on the internet",
            "A programming language",
            "A type of network cable"
          ],
          correct: 1,
          explanation: "URL (Uniform Resource Locator) is a web address that specifies the location of a resource on the internet."
        },
        {
          id: 4,
          question: "True or False: Digital communication protocols ensure that data is transmitted reliably between devices.",
          type: "true-false",
          correct: true,
          explanation: "True. Communication protocols like TCP/IP, HTTP, and others provide rules and standards for reliable data transmission."
        },
        {
          id: 5,
          question: "What protocol is commonly used for sending emails?",
          type: "fill-blank",
          answer: "SMTP",
          alternatives: ["POP3", "IMAP", "email protocol"],
          explanation: "SMTP (Simple Mail Transfer Protocol) is the standard protocol used for sending emails across the internet."
        }
      ],
      '4.1': [
        {
          id: 1,
          question: "What is the CPU in a computer system?",
          type: "multiple-choice",
          options: [
            "Central Processing Unit - the brain of the computer that executes instructions",
            "Computer Power Unit - provides electricity to the computer",
            "Central Program Unit - stores all the programs",
            "Computer Printing Unit - handles all printing tasks"
          ],
          correct: 0,
          explanation: "CPU stands for Central Processing Unit, which is often called the 'brain' of the computer as it executes instructions and performs calculations."
        },
        {
          id: 2,
          question: "What is the main function of RAM in a computer?",
          type: "multiple-choice",
          options: [
            "Permanent storage of files",
            "Temporary storage of data and programs currently being used",
            "Processing mathematical calculations",
            "Connecting to the internet"
          ],
          correct: 1,
          explanation: "RAM (Random Access Memory) provides temporary storage for data and programs that are currently being used by the CPU."
        },
        {
          id: 3,
          question: "What happens to data in RAM when the computer is turned off?",
          type: "multiple-choice",
          options: [
            "It remains permanently stored",
            "It is automatically backed up",
            "It is lost because RAM is volatile memory",
            "It is transferred to the hard drive"
          ],
          correct: 2,
          explanation: "RAM is volatile memory, meaning all data stored in it is lost when the computer loses power or is turned off."
        },
        {
          id: 4,
          question: "True or False: The motherboard connects all the major components of a computer together.",
          type: "true-false",
          correct: true,
          explanation: "True. The motherboard is the main circuit board that connects and allows communication between all major computer components."
        },
        {
          id: 5,
          question: "What component is responsible for rendering graphics and images on your screen?",
          type: "fill-blank",
          answer: "GPU",
          alternatives: ["graphics card", "video card", "graphics processor"],
          explanation: "The GPU (Graphics Processing Unit) or graphics card is responsible for rendering graphics, images, and video output."
        }
      ],
      '4.2': [
        {
          id: 1,
          question: "What is an operating system?",
          type: "multiple-choice",
          options: [
            "A type of computer hardware",
            "Software that manages computer hardware and provides services for other programs",
            "A programming language",
            "A type of computer virus"
          ],
          correct: 1,
          explanation: "An operating system is system software that manages computer hardware resources and provides common services for other programs."
        },
        {
          id: 2,
          question: "Which of the following is NOT a common operating system?",
          type: "multiple-choice",
          options: [
            "Windows",
            "macOS",
            "Linux",
            "Microsoft Word"
          ],
          correct: 3,
          explanation: "Microsoft Word is an application software (word processor), not an operating system. Windows, macOS, and Linux are all operating systems."
        },
        {
          id: 3,
          question: "What is multitasking in an operating system?",
          type: "multiple-choice",
          options: [
            "Using multiple computers at once",
            "The ability to run multiple programs simultaneously",
            "Having multiple users on one computer",
            "Using multiple monitors"
          ],
          correct: 1,
          explanation: "Multitasking is the operating system's ability to run multiple programs or processes simultaneously by rapidly switching between them."
        },
        {
          id: 4,
          question: "True or False: The operating system manages memory allocation for running programs.",
          type: "true-false",
          correct: true,
          explanation: "True. One of the key functions of an operating system is to manage memory allocation, ensuring programs get the memory they need."
        },
        {
          id: 5,
          question: "What is the term for the operating system's interface that users interact with?",
          type: "fill-blank",
          answer: "GUI",
          alternatives: ["user interface", "desktop", "shell"],
          explanation: "GUI (Graphical User Interface) is the visual interface that allows users to interact with the operating system using windows, icons, and menus."
        }
      ],
      '4.3': [
        {
          id: 1,
          question: "Which of the following is an input device?",
          type: "multiple-choice",
          options: [
            "Monitor",
            "Printer",
            "Keyboard",
            "Speakers"
          ],
          correct: 2,
          explanation: "A keyboard is an input device that allows users to enter text and commands into the computer."
        },
        {
          id: 2,
          question: "What is the primary function of output devices?",
          type: "multiple-choice",
          options: [
            "To send data to the computer",
            "To process data within the computer",
            "To display or present information from the computer to users",
            "To store data permanently"
          ],
          correct: 2,
          explanation: "Output devices display or present information from the computer to users, such as monitors showing images or speakers producing sound."
        },
        {
          id: 3,
          question: "Which device can function as both input and output?",
          type: "multiple-choice",
          options: [
            "Monitor",
            "Touchscreen",
            "Printer",
            "Speakers"
          ],
          correct: 1,
          explanation: "A touchscreen can display information (output) and receive touch input from users, making it both an input and output device."
        },
        {
          id: 4,
          question: "True or False: A webcam is considered an input device.",
          type: "true-false",
          correct: true,
          explanation: "True. A webcam captures video and audio input from the environment and sends it to the computer for processing."
        },
        {
          id: 5,
          question: "What type of device is a microphone?",
          type: "fill-blank",
          answer: "input",
          alternatives: ["audio input", "sound input"],
          explanation: "A microphone is an input device that captures sound and converts it into digital signals for the computer to process."
        }
      ],
      '4.4': [
        {
          id: 1,
          question: "What is the main difference between primary and secondary storage?",
          type: "multiple-choice",
          options: [
            "Primary storage is larger than secondary storage",
            "Primary storage is temporary and fast, secondary storage is permanent and slower",
            "Primary storage is more expensive than secondary storage",
            "There is no difference"
          ],
          correct: 1,
          explanation: "Primary storage (like RAM) is temporary and fast, used for active data. Secondary storage (like hard drives) is permanent and slower, used for long-term data storage."
        },
        {
          id: 2,
          question: "Which of the following is an example of secondary storage?",
          type: "multiple-choice",
          options: [
            "RAM",
            "Cache memory",
            "Hard disk drive (HDD)",
            "CPU registers"
          ],
          correct: 2,
          explanation: "A hard disk drive (HDD) is secondary storage that provides permanent storage for data and programs even when the computer is turned off."
        },
        {
          id: 3,
          question: "What does SSD stand for?",
          type: "multiple-choice",
          options: [
            "Super Speed Drive",
            "Solid State Drive",
            "Secondary Storage Device",
            "System Storage Drive"
          ],
          correct: 1,
          explanation: "SSD stands for Solid State Drive, which is a type of storage device that uses flash memory and has no moving parts."
        },
        {
          id: 4,
          question: "True or False: SSDs are generally faster than traditional hard disk drives (HDDs).",
          type: "true-false",
          correct: true,
          explanation: "True. SSDs are generally much faster than HDDs because they use flash memory with no moving parts, allowing for quicker data access."
        },
        {
          id: 5,
          question: "What unit is commonly used to measure storage capacity?",
          type: "fill-blank",
          answer: "bytes",
          alternatives: ["gigabytes", "GB", "terabytes"],
          explanation: "Storage capacity is measured in bytes and its multiples (kilobytes, megabytes, gigabytes, terabytes)."
        }
      ],
      '4.5': [
        {
          id: 1,
          question: "What factors affect a computer system's performance?",
          type: "multiple-choice",
          options: [
            "Only the CPU speed",
            "CPU speed, RAM amount, storage type, and software efficiency",
            "Only the amount of storage space",
            "Only the operating system"
          ],
          correct: 1,
          explanation: "Computer performance is affected by multiple factors including CPU speed, RAM amount, storage type (SSD vs HDD), and software efficiency."
        },
        {
          id: 2,
          question: "What happens when a computer runs out of available RAM?",
          type: "multiple-choice",
          options: [
            "The computer shuts down immediately",
            "The computer uses virtual memory (hard drive space) which slows performance",
            "The computer automatically buys more RAM",
            "Nothing happens"
          ],
          correct: 1,
          explanation: "When RAM is full, the operating system uses virtual memory (hard drive space) as temporary RAM, which significantly slows performance."
        },
        {
          id: 3,
          question: "Which upgrade would most likely improve a computer's boot time?",
          type: "multiple-choice",
          options: [
            "Adding more RAM",
            "Upgrading from HDD to SSD",
            "Getting a faster internet connection",
            "Installing more software"
          ],
          correct: 1,
          explanation: "Upgrading from HDD to SSD would most improve boot time because SSDs can read the operating system files much faster than traditional hard drives."
        },
        {
          id: 4,
          question: "True or False: Having too many programs running simultaneously can slow down computer performance.",
          type: "true-false",
          correct: true,
          explanation: "True. Running many programs simultaneously uses more RAM and CPU resources, which can slow down overall system performance."
        },
        {
          id: 5,
          question: "What is the term for temporary files and data that can slow down a computer over time?",
          type: "fill-blank",
          answer: "cache",
          alternatives: ["junk files", "temporary files", "clutter"],
          explanation: "Cache and temporary files can accumulate over time and slow down computer performance if not regularly cleaned."
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



  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const resetAssessment = () => {
    setCurrentQuestion(0);
    setSelectedAnswers({}); // Clear all selected answers
    setShowResults(false);
    setTimeLeft(1200); // 20 minutes for 20 questions
    setIsActive(true);
    setIsSubmitting(false);
    setError(null);
    
    // Regenerate questions to ensure fresh set
    if (subtopicId) {
      setQuestions([]);
      // This will trigger the useEffect to regenerate questions
    }
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

                // Normalize helper
                const norm = (v) => typeof v === 'string' ? v.trim().toLowerCase() : '';

                // Extract choice for true/false if object with justification
                const effectiveUserAnswer = (question.type === 'true-false' && userAnswer && typeof userAnswer === 'object' && 'choice' in userAnswer)
                  ? userAnswer.choice
                  : userAnswer;

                let isCorrect = false;
                if (question.type === 'multiple-choice' || question.type === 'true-false') {
                  isCorrect = effectiveUserAnswer === question.correct;
                } else if (question.type === 'fill-blank') {
                  if (Array.isArray(effectiveUserAnswer)) {
                    const expectedArray = Array.isArray(question.answer) ? question.answer : [question.answer];
                    // Determine alternative structure: flat or per-blank arrays
                    const alternatives = Array.isArray(question.alternatives) ? question.alternatives : [];
                    const perBlankAlts = Array.isArray(alternatives[0]) ? alternatives : null;
                    isCorrect = effectiveUserAnswer.every((ua, i) => {
                      const uaNorm = norm(ua);
                      const expectedNorm = norm(expectedArray[i] !== undefined ? expectedArray[i] : expectedArray[0]);
                      if (!uaNorm) return false;
                      if (uaNorm === expectedNorm) return true;
                      if (perBlankAlts) {
                        return (perBlankAlts[i] || []).map(norm).includes(uaNorm);
                      }
                      return alternatives.map(norm).includes(uaNorm);
                    });
                  } else {
                    const uaNorm = norm(effectiveUserAnswer);
                    const ansNorm = norm(Array.isArray(question.answer) ? question.answer[0] : question.answer);
                    const altList = Array.isArray(question.alternatives)
                      ? (Array.isArray(question.alternatives[0]) ? question.alternatives.flat() : question.alternatives).map(norm)
                      : [];
                    isCorrect = !!uaNorm && (uaNorm === ansNorm || altList.includes(uaNorm));
                  }
                } else {
                  // Fallback deep equality for other structured answers
                  try {
                    isCorrect = JSON.stringify(effectiveUserAnswer) === JSON.stringify(question.correct);
                  } catch {
                    isCorrect = false;
                  }
                }

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
                          (question.type === 'multiple-choice' ? question.options[effectiveUserAnswer] :
                           question.type === 'true-false' ? (effectiveUserAnswer === undefined ? 'Not answered' : (effectiveUserAnswer ? 'True' : 'False')) :
                           (Array.isArray(effectiveUserAnswer) ? effectiveUserAnswer.join(', ') : (typeof effectiveUserAnswer === 'string' ? effectiveUserAnswer : JSON.stringify(effectiveUserAnswer)))
                          ) : 'Not answered'}
                        </p>
                        {!isCorrect && (
                          <p><strong>Correct answer:</strong> {
                            question.type === 'multiple-choice' ? question.options[question.correct] :
                            question.type === 'true-false' ? (question.correct ? 'True' : 'False') :
                            question.type === 'fill-blank' ? (Array.isArray(question.answer) ? question.answer.join(', ') : question.answer) :
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
            
            <button 
              onClick={() => onNavigate('notes', { gradeLevel, topicId, subtopicId })}
              className="action-btn review"
            >
              <BookOpen size={16} />
              <span>Review Notes</span>
            </button>
            
            <button 
              onClick={() => onNavigate('playground', { gradeLevel, topicId, subtopicId })}
              className="action-btn practice"
            >
              <Code size={16} />
              <span>Practice More</span>
            </button>
            
            <button 
              onClick={() => onNavigate('topic', { gradeLevel, topicId })}
              className="action-btn continue"
            >
              <span>Continue Learning</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Show loading state while questions are being generated
  if (questions.length === 0) {
    return (
      <div className="assessment">
        <div className="assessment-header">
          <div className="header-background">
            <div className="test-pattern"></div>
          </div>
          
          <div className="header-content">
            <button onClick={() => onNavigate('topic', { gradeLevel, topicId })} className="back-button">
              <ArrowLeft size={20} />
              <span>Back to {topic.title}</span>
            </button>
            
            <div className="assessment-info">
              <div className="assessment-badge">
                <Trophy size={16} />
                <span>Assessment</span>
              </div>
              <h1>{subtopic.title} Test</h1>
              {error ? (
                <div className="error-message">
                  <p style={{color: '#ff6b6b'}}>{error}</p>
                  <button 
                    onClick={() => window.location.reload()} 
                    className="retry-button"
                    style={{
                      background: '#ff6b6b',
                      color: 'white',
                      border: 'none',
                      padding: '0.5rem 1rem',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      marginTop: '1rem'
                    }}
                  >
                    Retry
                  </button>
                </div>
              ) : (
                <p>{isGeneratingQuestions ? 'Generating randomized questions...' : 'Loading assessment...'}</p>
              )}
            </div>
          </div>
        </div>
        
        <div className="loading-container" style={{ padding: '2rem', textAlign: 'center' }}>
          <div className="loading-spinner" style={{ margin: '2rem auto', width: '40px', height: '40px', border: '4px solid #f3f3f3', borderTop: '4px solid #3498db', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
          <p>Preparing your personalized assessment...</p>
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
          <button onClick={() => onNavigate('topic', { gradeLevel, topicId })} className="back-button">
            <ArrowLeft size={20} />
            <span>Back to {topic.title}</span>
          </button>
          
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
            <QuestionRenderer
              question={currentQ}
              selectedAnswer={selectedAnswers[currentQ.id]}
              onAnswerChange={(answer) => handleAnswerChange(currentQ.id, answer)}
            />
          </div>
        </div>
        
        {/* Navigation */}
        <div className="question-navigation">
          <button
            className="nav-btn prev"
            onClick={handlePreviousQuestion}
            disabled={currentQuestion === 0}
          >
            Previous
          </button>
          
          {currentQuestion < questions.length - 1 ? (
            <button
              className="nav-btn next"
              onClick={handleNextQuestion}
              disabled={!isAnswerValid(currentQ, selectedAnswers[currentQ.id])}
            >
              Next
            </button>
          ) : (
            <button
              className="nav-btn submit"
              onClick={handleSubmit}
              disabled={questions.some(q => !isAnswerValid(q, selectedAnswers[q.id])) || isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="loading-spinner" style={{
                    width: '16px',
                    height: '16px',
                    border: '2px solid #ffffff40',
                    borderTop: '2px solid #ffffff',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite',
                    marginRight: '0.5rem'
                  }}></div>
                  Submitting...
                </>
              ) : (
                'Submit Test'
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Assessment;