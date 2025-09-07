/**
 * Comprehensive Quiz Database
 * 
 * Structure: 10 quiz types for each subtopic
 * Each type has 20 questions for each grade level (7, 8, 9)
 * Total: 10 × 20 × 3 = 600 questions per subtopic
 * 
 * Quiz Types:
 * 1. Multiple Choice (TYPE_A)
 * 2. True/False (TYPE_B) 
 * 3. Fill in the Blank (TYPE_C)
 * 4. Ordering/Sequencing (TYPE_D)
 * 5. Matching (TYPE_E)
 * 6. Code Completion (TYPE_F)
 * 7. Scenario-Based (TYPE_G)
 * 8. Drag and Drop (TYPE_H)
 * 9. Hotspot/Click (TYPE_I)
 * 10. Multi-Select (TYPE_J)
 */

export class QuizDatabase {
  constructor() {
    this.questions = {};
  }

  /**
   * Get questions for a specific subtopic, type, and grade
   * @param {string} subtopicId - The subtopic identifier (e.g., "1.1")
   * @param {string} questionType - The question type (TYPE_A through TYPE_J)
   * @param {number} grade - Grade level (7, 8, or 9)
   * @param {number} count - Number of questions to return (max 20)
   * @returns {Array} Array of question objects
   */
  getQuestions(subtopicId, questionType, grade, count = 20) {
    const key = `${subtopicId}_${questionType}_${grade}`;
    const questions = this.questions[key] || this.generateQuestions(subtopicId, questionType, grade);
    
    // Shuffle and return requested count
    return this.shuffleArray([...questions]).slice(0, Math.min(count, 20));
  }

  /**
   * Generate 20 questions for a specific subtopic, type, and grade
   */
  generateQuestions(subtopicId, questionType, grade) {
    const key = `${subtopicId}_${questionType}_${grade}`;
    
    if (this.questions[key]) {
      return this.questions[key];
    }

    const questions = [];
    const baseTemplates = this.getBaseTemplates(subtopicId, questionType);
    
    for (let i = 0; i < 20; i++) {
      const question = this.createQuestionFromTemplate(
        baseTemplates,
        subtopicId,
        questionType,
        grade,
        i + 1
      );
      if (question) {
        questions.push(question);
      }
    }
    
    this.questions[key] = questions;
    return questions;
  }

  /**
   * Create a question from a template, adapted for the specific grade
   */
  createQuestionFromTemplate(templates, subtopicId, questionType, grade, questionNumber) {
    const template = templates[questionNumber % templates.length];
    const adaptedTemplate = this.adaptForGrade(template, grade);
    
    return {
      id: `${subtopicId}_${questionType}_G${grade}_Q${questionNumber}`,
      subtopic: subtopicId,
      type: this.getQuestionTypeString(questionType),
      grade: grade,
      questionNumber: questionNumber,
      difficulty: this.getDifficultyForGrade(grade),
      points: this.getPointsForGrade(grade),
      bloomLevel: this.getBloomLevelForGrade(grade),
      ...adaptedTemplate
    };
  }

  /**
   * Adapt question content for specific grade level
   */
  adaptForGrade(template, grade) {
    const adaptations = {
      7: {
        vocabularyLevel: 'basic',
        conceptDepth: 'introductory',
        exampleComplexity: 'simple'
      },
      8: {
        vocabularyLevel: 'intermediate',
        conceptDepth: 'detailed',
        exampleComplexity: 'moderate'
      },
      9: {
        vocabularyLevel: 'advanced',
        conceptDepth: 'comprehensive',
        exampleComplexity: 'complex'
      }
    };

    const gradeConfig = adaptations[grade];
    
    // Create a copy of the template and adapt it
    const adapted = JSON.parse(JSON.stringify(template));
    
    // Adapt question text based on grade level
    if (adapted.question) {
      adapted.question = this.adaptText(adapted.question, gradeConfig);
    }
    
    // Adapt options for multiple choice
    if (adapted.options) {
      adapted.options = adapted.options.map(option => this.adaptText(option, gradeConfig));
    }
    
    // Adapt explanation
    if (adapted.explanation) {
      adapted.explanation = this.adaptText(adapted.explanation, gradeConfig);
    }
    
    return adapted;
  }

  /**
   * Adapt text content based on grade configuration
   */
  adaptText(text, gradeConfig) {
    // This is a simplified adaptation - in a real system, you'd have
    // more sophisticated natural language processing
    
    let adapted = text;
    
    // Vocabulary level adaptations
    if (gradeConfig.vocabularyLevel === 'basic') {
      adapted = adapted
        .replace(/algorithm/gi, 'step-by-step instructions')
        .replace(/implementation/gi, 'putting into practice')
        .replace(/optimization/gi, 'making better');
    } else if (gradeConfig.vocabularyLevel === 'advanced') {
      adapted = adapted
        .replace(/step-by-step instructions/gi, 'algorithm')
        .replace(/putting into practice/gi, 'implementation')
        .replace(/making better/gi, 'optimization');
    }
    
    return adapted;
  }

  /**
   * Get difficulty level based on grade
   */
  getDifficultyForGrade(grade) {
    const difficulties = {
      7: 'easy',
      8: 'medium', 
      9: 'hard'
    };
    return difficulties[grade] || 'medium';
  }

  /**
   * Get points for question based on grade
   */
  getPointsForGrade(grade) {
    const points = {
      7: 1,
      8: 2,
      9: 3
    };
    return points[grade] || 2;
  }

  /**
   * Get Bloom's taxonomy level for grade
   */
  getBloomLevelForGrade(grade) {
    const bloomLevels = {
      7: ['remember', 'understand'],
      8: ['understand', 'apply', 'analyze'],
      9: ['analyze', 'evaluate', 'create']
    };
    const levels = bloomLevels[grade] || bloomLevels[8];
    return levels[Math.floor(Math.random() * levels.length)];
  }

  /**
   * Convert question type code to string
   */
  getQuestionTypeString(typeCode) {
    const types = {
      TYPE_A: 'multiple-choice',
      TYPE_B: 'true-false',
      TYPE_C: 'fill-blank',
      TYPE_D: 'ordering',
      TYPE_E: 'matching',
      TYPE_F: 'code-completion',
      TYPE_G: 'scenario',
      TYPE_H: 'drag-drop',
      TYPE_I: 'hotspot',
      TYPE_J: 'multi-select'
    };
    return types[typeCode] || 'multiple-choice';
  }

  /**
   * Shuffle array utility
   */
  shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  /**
   * Get base question templates for a subtopic and type
   */
  getBaseTemplates(subtopicId, questionType) {
    // Import templates based on subtopic
    switch (subtopicId) {
      case '1.1': return this.getPseudocodeTemplates(questionType);
      case '1.2': return this.getSelectionTemplates(questionType);
      case '1.3': return this.getSearchingTemplates(questionType);
      case '1.4': return this.getConditionalStatementsTemplates(questionType);
      case '1.5': return this.getDataProgrammingTemplates(questionType);
      case '1.6': return this.getLibraryTemplates(questionType);
      case '1.7': return this.getSoftwareDevelopmentTemplates(questionType);
      case '1.8': return this.getPhysicalComputingTemplates(questionType);
      case '2.1': return this.getModellingTemplates(questionType);
      case '2.2': return this.getDatabaseTemplates(questionType);
      case '3.1': return this.getNetworkTypesTemplates(questionType);
      case '3.2': return this.getDataSecurityTemplates(questionType);
      case '4.1': return this.getArchitectureTemplates(questionType);
      case '4.2': return this.getOperatingSystemsTemplates(questionType);
      case '4.3': return this.getInputOutputTemplates(questionType);
      case '4.4': return this.getStorageTemplates(questionType);
      case '4.5': return this.getPerformanceTemplates(questionType);
      default: return this.getDefaultTemplates(questionType);
    }
  }

  // ==========================================
  // TEMPLATE METHODS FOR EACH SUBTOPIC
  // ==========================================

  getPseudocodeTemplates(questionType) {
    switch (questionType) {
      case 'TYPE_A': // Multiple Choice
        return [
          {
            question: "What is pseudocode?",
            options: [
              "A programming language",
              "A way to plan algorithms using plain language",
              "A type of computer",
              "A debugging tool"
            ],
            correct: 1,
            explanation: "Pseudocode is a way to plan and describe algorithms using plain, human-readable language before writing actual code."
          },
          {
            question: "Which keyword is commonly used to start pseudocode?",
            options: ["START", "INIT", "RUN", "GO"],
            correct: 0,
            explanation: "START is the standard keyword used to begin pseudocode algorithms."
          },
          {
            question: "What does the DISPLAY command do in pseudocode?",
            options: [
              "Shows the computer screen",
              "Outputs information to the user",
              "Displays the code",
              "Shows errors"
            ],
            correct: 1,
            explanation: "DISPLAY is used in pseudocode to output information or results to the user."
          }
          // ... Continue with 17 more multiple choice questions
        ];
      
      case 'TYPE_B': // True/False
        return [
          {
            question: "Pseudocode must follow exact syntax rules like programming languages.",
            correct: false,
            explanation: "False. Pseudocode is meant to be flexible and readable, focusing on logic rather than strict syntax."
          },
          {
            question: "INPUT is a valid pseudocode command for getting user data.",
            correct: true,
            explanation: "True. INPUT is commonly used in pseudocode to represent getting data from the user."
          }
          // ... Continue with 18 more true/false questions
        ];
      
      case 'TYPE_C': // Fill in the Blank
        return [
          {
            question: "Pseudocode helps programmers _____ their logic before writing actual code.",
            answer: "plan",
            alternatives: ["organize", "structure", "design"],
            explanation: "Pseudocode helps programmers plan their logic and algorithm structure before implementing in a specific programming language."
          }
          // ... Continue with 19 more fill-in-the-blank questions
        ];

      // Continue with other question types (TYPE_D through TYPE_J)
      default:
        return this.getDefaultQuestionTemplates(questionType);
    }
  }

  getSelectionTemplates(questionType) {
    // Similar structure for Selection (1.2) topic
    // ... implement all 10 question types with 20 questions each
    return this.getDefaultQuestionTemplates(questionType);
  }

  // Continue implementing templates for all 17 subtopics...
  
  getDefaultQuestionTemplates(questionType) {
    return [
      {
        question: "This is a default question template.",
        options: ["Option A", "Option B", "Option C", "Option D"],
        correct: 0,
        explanation: "This is a default explanation."
      }
    ];
  }
}

// Create singleton instance
export const quizDatabase = new QuizDatabase();
