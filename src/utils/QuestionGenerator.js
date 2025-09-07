// Question Generator with 10 Distinct Question Types (A-J)
// Each quiz generates exactly 20 questions with robust randomization

class QuestionGenerator {
  constructor() {
    this.questionTypes = [
      'TYPE_A_MULTIPLE_CHOICE',
      'TYPE_B_TRUE_FALSE', 
      'TYPE_C_FILL_BLANK',
      'TYPE_D_ORDERING',
      'TYPE_E_MATCHING',
      'TYPE_F_CODE_COMPLETION',
      'TYPE_G_SCENARIO_BASED',
      'TYPE_H_DRAG_DROP',
      'TYPE_I_HOTSPOT',
      'TYPE_J_MULTI_SELECT'
    ];
    
    // Grade-based difficulty mapping using Bloom's taxonomy
    this.gradeDifficultyMapping = {
      7: {
        bloomLevels: ['remember', 'understand', 'apply'],
        complexityWeight: 0.6,
        cognitiveLoad: 'low-medium',
        description: 'Focus on foundational knowledge, comprehension, and basic application'
      },
      8: {
        bloomLevels: ['understand', 'apply', 'analyze'],
        complexityWeight: 0.75,
        cognitiveLoad: 'medium',
        description: 'Emphasis on application and beginning analysis skills'
      },
      9: {
        bloomLevels: ['apply', 'analyze', 'evaluate', 'create'],
        complexityWeight: 0.9,
        cognitiveLoad: 'medium-high',
        description: 'Higher-order thinking with analysis, evaluation, and creation'
      }
    };
  }

  // Generate exactly 20 questions with randomized types
  generateQuestions(subtopicId, difficulty = 'medium', grade = 8) {
    console.log('QuestionGenerator: Starting generation for subtopic:', subtopicId);
    const questions = [];
    const usedQuestions = new Set();
    const gradeConfig = this.gradeDifficultyMapping[grade] || this.gradeDifficultyMapping[8];
    
    // Ensure balanced distribution of question types
    const typeDistribution = this.getBalancedTypeDistribution();
    console.log('QuestionGenerator: Type distribution:', typeDistribution);
    
    let attempts = 0;
    let consecutiveFailures = 0;
    const maxAttempts = 100; // Prevent infinite loops
    const maxConsecutiveFailures = 10; // Prevent getting stuck on one type
    
    for (let i = 0; i < 20 && attempts < maxAttempts && consecutiveFailures < maxConsecutiveFailures; attempts++) {
      const questionType = typeDistribution[i % typeDistribution.length];
      console.log(`QuestionGenerator: Attempting to generate question ${i + 1} of type ${questionType} (attempt ${attempts + 1})`);
      
      try {
        console.log(`QuestionGenerator: Calling generateQuestionByType for ${questionType}`);
        const question = this.generateQuestionByType(questionType, subtopicId, difficulty, usedQuestions, grade, gradeConfig);
        console.log(`QuestionGenerator: generateQuestionByType returned:`, question ? 'success' : 'null');
        
        if (question) {
          questions.push({ ...question, id: i + 1 });
          usedQuestions.add(question.uniqueKey || `${questionType}_${i}`);
          i++; // Only increment when we successfully generate a question
          consecutiveFailures = 0; // Reset failure counter
          console.log(`QuestionGenerator: Successfully generated question ${i} of type ${questionType}`);
        } else {
          consecutiveFailures++;
          console.warn(`QuestionGenerator: Failed to generate ${questionType} question (failure ${consecutiveFailures})`);
        }
      } catch (error) {
        consecutiveFailures++;
        console.error(`QuestionGenerator: Error generating ${questionType} question:`, error);
      }
    }
    
    console.log(`QuestionGenerator: Generated ${questions.length} questions after ${attempts} attempts`);
    
    // If we couldn't generate enough questions, fill with default questions
    while (questions.length < 20) {
      try {
        const defaultQuestion = this.generateDefaultQuestion(subtopicId, questions.length + 1, grade, gradeConfig);
        questions.push(defaultQuestion);
        console.log(`QuestionGenerator: Added default question ${questions.length}`);
      } catch (error) {
        console.error('QuestionGenerator: Error generating default question:', error);
        // Create a minimal fallback question
        questions.push({
          id: questions.length + 1,
          type: 'multiple-choice',
          question: 'What is digital literacy?',
          options: ['Understanding technology', 'Using computers', 'Internet safety', 'All of the above'],
          correctAnswer: 3,
          explanation: 'Digital literacy encompasses all aspects of understanding and using technology effectively.',
          difficulty: 'easy',
          points: 1,
          uniqueKey: `fallback_${questions.length + 1}`
        });
      }
    }
    
    // Shuffle the final question order
    const shuffledQuestions = this.shuffleArray(questions);
    console.log('QuestionGenerator: Final question count:', shuffledQuestions.length);
    return shuffledQuestions;
  }

  // Get balanced distribution ensuring all types are represented
  getBalancedTypeDistribution() {
    const distribution = [];
    
    // Each type appears at least once
    this.questionTypes.forEach(type => distribution.push(type));
    
    // Fill remaining slots (20 - 10 = 10) with random types
    for (let i = 0; i < 10; i++) {
      const randomType = this.questionTypes[Math.floor(Math.random() * this.questionTypes.length)];
      distribution.push(randomType);
    }
    
    return this.shuffleArray(distribution);
  }

  // Generate a default question when templates fail
  generateDefaultQuestion(subtopicId, questionId, grade, gradeConfig) {
    // Map subtopic IDs to meaningful topics
    const topicMap = {
      '3.1': 'Network Types',
      '3.2': 'Data Transmission Security',
      '1.1': 'Pseudocode',
      '1.2': 'Selection Statements',
      '1.3': 'Searching Algorithms',
      '1.4': 'Conditional Statements',
      '1.5': 'Data Programming',
      '1.6': 'Library Programs',
      '1.7': 'Software Development',
      '1.8': 'Physical Computing',
      '2.1': 'Data Modelling',
      '2.2': 'Databases',
      '4.1': 'Computer Architecture',
      '4.2': 'Operating Systems',
      '4.3': 'Input/Output Devices',
      '4.4': 'Storage Devices',
      '4.5': 'System Performance'
    };
    
    const topicName = topicMap[subtopicId] || 'Digital Literacy';
    
    return {
      id: questionId,
      type: 'multiple-choice',
      question: `Which of the following best describes ${topicName}?`,
      options: [
        `${topicName} involves understanding basic concepts`,
        `${topicName} requires advanced technical skills only`,
        `${topicName} is not relevant to modern computing`,
        `${topicName} applies only to specific industries`
      ],
      correct: 0,
      explanation: `${topicName} involves understanding fundamental concepts and their practical applications in digital literacy.`,
      difficulty: this.calculateGradeDifficulty('medium', grade, gradeConfig),
      bloomLevel: this.selectBloomLevel(grade, gradeConfig),
      points: this.calculatePoints(grade, gradeConfig),
      uniqueKey: `default_${subtopicId}_${questionId}_${Date.now()}`
    };
  }

  // Generate question based on type
  generateQuestionByType(type, subtopicId, difficulty, usedQuestions, grade, gradeConfig) {
    console.log(`QuestionGenerator: generateQuestionByType called with type: ${type}`);
    const generators = {
      'TYPE_A_MULTIPLE_CHOICE': () => this.generateTypeA(subtopicId, difficulty, usedQuestions, grade, gradeConfig),
      'TYPE_B_TRUE_FALSE': () => this.generateTypeB(subtopicId, difficulty, usedQuestions, grade, gradeConfig),
      'TYPE_C_FILL_BLANK': () => this.generateTypeC(subtopicId, difficulty, usedQuestions, grade, gradeConfig),
      'TYPE_D_ORDERING': () => this.generateTypeD(subtopicId, difficulty, usedQuestions, grade, gradeConfig),
      'TYPE_E_MATCHING': () => this.generateTypeE(subtopicId, difficulty, usedQuestions, grade, gradeConfig),
      'TYPE_F_CODE_COMPLETION': () => this.generateTypeF(subtopicId, difficulty, usedQuestions, grade, gradeConfig),
      'TYPE_G_SCENARIO_BASED': () => this.generateTypeG(subtopicId, difficulty, usedQuestions, grade, gradeConfig),
      'TYPE_H_DRAG_DROP': () => this.generateTypeH(subtopicId, difficulty, usedQuestions, grade, gradeConfig),
      'TYPE_I_HOTSPOT': () => this.generateTypeI(subtopicId, difficulty, usedQuestions, grade, gradeConfig),
      'TYPE_J_MULTI_SELECT': () => this.generateTypeJ(subtopicId, difficulty, usedQuestions, grade, gradeConfig)
    };
    
    if (!generators[type]) {
      console.error(`QuestionGenerator: Unknown question type: ${type}`);
      return null;
    }
    
    console.log(`QuestionGenerator: Calling generator for ${type}`);
    const result = generators[type]();
    console.log(`QuestionGenerator: Generator for ${type} returned:`, result ? 'success' : 'null');
    return result;
  }

  // TYPE A: Enhanced Multiple Choice
  generateTypeA(subtopicId, difficulty, usedQuestions, grade, gradeConfig) {
    const templates = this.getQuestionTemplates(subtopicId, 'multipleChoice', grade, gradeConfig);
    if (!templates || templates.multipleChoice.length === 0) return null;
    
    const template = this.getRandomTemplate(templates.multipleChoice, usedQuestions);
    if (!template) return null;
    
    return {
      id: `${subtopicId}_mc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type: 'multiple-choice',
      question: this.adaptQuestionForGrade(template.question, grade, gradeConfig),
      options: this.shuffleArray([...template.options]),
      correct: template.options.indexOf(template.correctAnswer),
      explanation: this.adaptExplanationForGrade(template.explanation, grade, gradeConfig),
      difficulty: this.calculateGradeDifficulty(difficulty, grade, gradeConfig),
      bloomLevel: this.selectBloomLevel(grade, gradeConfig),
      points: this.calculatePoints(grade, gradeConfig),
      uniqueKey: `mc_${subtopicId}_${template.id}`
    };
  }

  // TYPE B: True/False with Justification
  generateTypeB(subtopicId, difficulty, usedQuestions, grade, gradeConfig) {
    const templates = this.getQuestionTemplates(subtopicId, 'trueFalse', grade, gradeConfig);
    if (!templates || templates.trueFalse.length === 0) return null;
    
    const template = this.getRandomTemplate(templates.trueFalse, usedQuestions);
    if (!template) return null;
    
    return {
      id: `${subtopicId}_tf_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type: 'true-false',
      question: this.adaptQuestionForGrade(template.statement, grade, gradeConfig),
      correct: template.isTrue,
      explanation: this.adaptExplanationForGrade(template.explanation, grade, gradeConfig),
      justification: this.adaptExplanationForGrade(template.justification, grade, gradeConfig),
      difficulty: this.calculateGradeDifficulty(difficulty, grade, gradeConfig),
      bloomLevel: this.selectBloomLevel(grade, gradeConfig),
      points: this.calculatePoints(grade, gradeConfig),
      uniqueKey: `tf_${subtopicId}_${template.id}`
    };
  }

  // TYPE C: Fill in the Blank with Multiple Blanks
  generateTypeC(subtopicId, difficulty, usedQuestions, grade, gradeConfig) {
    const templates = this.getQuestionTemplates(subtopicId, 'fillBlank', grade, gradeConfig);
    if (!templates || templates.fillBlank.length === 0) return null;
    
    const template = this.getRandomTemplate(templates.fillBlank, usedQuestions);
    if (!template) return null;
    
    return {
      id: `${subtopicId}_fb_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type: 'fill-blank',
      question: this.adaptQuestionForGrade(template.question, grade, gradeConfig),
      blanks: template.blanks,
      answers: template.answers,
      alternatives: template.alternatives || [],
      explanation: this.adaptExplanationForGrade(template.explanation, grade, gradeConfig),
      difficulty: this.calculateGradeDifficulty(difficulty, grade, gradeConfig),
      bloomLevel: this.selectBloomLevel(grade, gradeConfig),
      points: this.calculatePoints(grade, gradeConfig),
      uniqueKey: `fb_${subtopicId}_${template.id}`
    };
  }

  // TYPE D: Ordering/Sequencing
  generateTypeD(subtopicId, difficulty, usedQuestions, grade, gradeConfig) {
    const templates = this.getQuestionTemplates(subtopicId, 'ordering', grade, gradeConfig);
    if (!templates || templates.ordering.length === 0) return null;
    
    const template = this.getRandomTemplate(templates.ordering, usedQuestions);
    if (!template) return null;
    
    return {
      id: `${subtopicId}_ord_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type: 'ordering',
      question: this.adaptQuestionForGrade(template.question, grade, gradeConfig),
      items: this.shuffleArray([...template.items]),
      correct: template.correctOrder,
      explanation: this.adaptExplanationForGrade(template.explanation, grade, gradeConfig),
      difficulty: this.calculateGradeDifficulty(difficulty, grade, gradeConfig),
      bloomLevel: this.selectBloomLevel(grade, gradeConfig),
      points: this.calculatePoints(grade, gradeConfig),
      uniqueKey: `ord_${subtopicId}_${template.id}`
    };
  }

  // TYPE E: Matching Pairs
  generateTypeE(subtopicId, difficulty, usedQuestions, grade, gradeConfig) {
    const templates = this.getQuestionTemplates(subtopicId, 'matching', grade, gradeConfig);
    if (!templates || templates.matching.length === 0) return null;
    
    const template = this.getRandomTemplate(templates.matching, usedQuestions);
    if (!template) return null;
    
    return {
      id: `${subtopicId}_match_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type: 'matching',
      question: this.adaptQuestionForGrade(template.question, grade, gradeConfig),
      leftColumn: template.leftColumn,
      rightColumn: this.shuffleArray([...template.rightColumn]),
      correctPairs: template.correctPairs,
      explanation: this.adaptExplanationForGrade(template.explanation, grade, gradeConfig),
      difficulty: this.calculateGradeDifficulty(difficulty, grade, gradeConfig),
      bloomLevel: this.selectBloomLevel(grade, gradeConfig),
      points: this.calculatePoints(grade, gradeConfig),
      uniqueKey: `match_${subtopicId}_${template.id}`
    };
  }

  // TYPE F: Code Completion
  generateTypeF(subtopicId, difficulty, usedQuestions, grade, gradeConfig) {
    const templates = this.getQuestionTemplates(subtopicId, 'codeCompletion', grade, gradeConfig);
    if (!templates || templates.codeCompletion.length === 0) return null;
    
    const template = this.getRandomTemplate(templates.codeCompletion, usedQuestions);
    if (!template) return null;
    
    return {
      id: `${subtopicId}_code_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type: 'code-completion',
      question: this.adaptQuestionForGrade(template.question, grade, gradeConfig),
      codeSnippet: template.codeSnippet,
      language: template.language,
      blanks: template.blanks,
      options: template.options,
      correct: template.correct,
      explanation: this.adaptExplanationForGrade(template.explanation, grade, gradeConfig),
      difficulty: this.calculateGradeDifficulty(difficulty, grade, gradeConfig),
      bloomLevel: this.selectBloomLevel(grade, gradeConfig),
      points: this.calculatePoints(grade, gradeConfig),
      uniqueKey: `code_${subtopicId}_${template.id}`
    };
  }

  // TYPE G: Scenario-Based Questions
  generateTypeG(subtopicId, difficulty, usedQuestions, grade, gradeConfig) {
    const templates = this.getQuestionTemplates(subtopicId, 'scenario', grade, gradeConfig);
    if (!templates || !templates.scenario || templates.scenario.length === 0) return null;
    
    const template = this.getRandomTemplate(templates.scenario, usedQuestions);
    if (!template) return null;
    
    return {
      id: `${subtopicId}_scenario_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type: 'scenario',
      scenario: this.adaptQuestionForGrade(template.scenario, grade, gradeConfig),
      question: this.adaptQuestionForGrade(template.question, grade, gradeConfig),
      options: this.shuffleArray([...template.options]),
      correct: template.options.indexOf(template.correctAnswer),
      explanation: this.adaptExplanationForGrade(template.explanation, grade, gradeConfig),
      difficulty: this.calculateGradeDifficulty(difficulty, grade, gradeConfig),
      bloomLevel: this.selectBloomLevel(grade, gradeConfig),
      points: this.calculatePoints(grade, gradeConfig),
      uniqueKey: `scenario_${subtopicId}_${template.id}`
    };
  }

  // TYPE H: Drag and Drop
  generateTypeH(subtopicId, difficulty, usedQuestions, grade, gradeConfig) {
    const templates = this.getQuestionTemplates(subtopicId, 'dragDrop', grade, gradeConfig);
    if (!templates || templates.dragDrop.length === 0) return null;
    
    const template = this.getRandomTemplate(templates.dragDrop, usedQuestions);
    if (!template) return null;
    
    return {
      id: `${subtopicId}_drag_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type: 'drag-drop',
      question: this.adaptQuestionForGrade(template.question, grade, gradeConfig),
      draggableItems: this.shuffleArray([...template.draggableItems]),
      dropZones: template.dropZones,
      correctMapping: template.correctMapping,
      explanation: this.adaptExplanationForGrade(template.explanation, grade, gradeConfig),
      difficulty: this.calculateGradeDifficulty(difficulty, grade, gradeConfig),
      bloomLevel: this.selectBloomLevel(grade, gradeConfig),
      points: this.calculatePoints(grade, gradeConfig),
      uniqueKey: `drag_${subtopicId}_${template.id}`
    };
  }

  // TYPE I: Hotspot/Image-Based
  generateTypeI(subtopicId, difficulty, usedQuestions, grade, gradeConfig) {
    const templates = this.getQuestionTemplates(subtopicId, 'hotspot', grade, gradeConfig);
    if (!templates || templates.hotspot.length === 0) return null;
    
    const template = this.getRandomTemplate(templates.hotspot, usedQuestions);
    if (!template) return null;
    
    return {
      id: `${subtopicId}_hotspot_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type: 'hotspot',
      question: this.adaptQuestionForGrade(template.question, grade, gradeConfig),
      image: template.image,
      hotspots: template.hotspots,
      correctHotspots: template.correctHotspots,
      explanation: this.adaptExplanationForGrade(template.explanation, grade, gradeConfig),
      difficulty: this.calculateGradeDifficulty(difficulty, grade, gradeConfig),
      bloomLevel: this.selectBloomLevel(grade, gradeConfig),
      points: this.calculatePoints(grade, gradeConfig),
      uniqueKey: `hotspot_${subtopicId}_${template.id}`
    };
  }

  // TYPE J: Multiple Select
  generateTypeJ(subtopicId, difficulty, usedQuestions, grade, gradeConfig) {
    const templates = this.getQuestionTemplates(subtopicId, 'multiSelect', grade, gradeConfig);
    if (!templates || templates.multiSelect.length === 0) return null;
    
    const template = this.getRandomTemplate(templates.multiSelect, usedQuestions);
    if (!template) return null;
    
    return {
      id: `${subtopicId}_multi_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type: 'multi-select',
      question: this.adaptQuestionForGrade(template.question, grade, gradeConfig),
      options: this.shuffleArray([...template.options]),
      correctAnswers: template.correctAnswers,
      minSelections: template.minSelections || 1,
      maxSelections: template.maxSelections || template.options.length,
      explanation: this.adaptExplanationForGrade(template.explanation, grade, gradeConfig),
      difficulty: this.calculateGradeDifficulty(difficulty, grade, gradeConfig),
      bloomLevel: this.selectBloomLevel(grade, gradeConfig),
      points: this.calculatePoints(grade, gradeConfig),
      uniqueKey: `multi_${subtopicId}_${template.id}`
    };
  }

  // Get question templates for specific subtopic
  getQuestionTemplates(subtopicId, questionType = null, grade = 8, gradeConfig = null) {
    const templates = this.generateComprehensiveTemplates(subtopicId, grade, gradeConfig);
    
    if (questionType && templates && templates[questionType]) {
      return templates;
    }
    
    return templates;
  }
  
  // Generate comprehensive question templates for all subtopics and question types
   generateComprehensiveTemplates(subtopicId, grade, gradeConfig) {
     const subtopicTemplates = {
       // Computational Thinking and Programming (Topic 1)
       '1.1': this.getPseudocodeTemplates(grade, gradeConfig),
       '1.2': this.getSelectionTemplates(grade, gradeConfig),
       '1.3': this.getSearchingTemplates(grade, gradeConfig),
       '1.4': this.getConditionalStatementsTemplates(grade, gradeConfig),
       '1.5': this.getDataProgrammingTemplates(grade, gradeConfig),
       '1.6': this.getLibraryProgramTemplates(grade, gradeConfig),
       '1.7': this.getSoftwareDevelopmentTemplates(grade, gradeConfig),
       '1.8': this.getPhysicalComputingTemplates(grade, gradeConfig),
       
       // Managing Data (Topic 2)
       '2.1': this.getModellingTemplates(grade, gradeConfig),
       '2.2': this.getDataDatabasesTemplates(grade, gradeConfig),
       
       // Networks and Digital Communications (Topic 3)
       '3.1': this.getNetworkTypesTemplates(grade, gradeConfig),
       '3.2': this.getDataTransmissionSecurityTemplates(grade, gradeConfig),
       
       // Computer System (Topic 4)
       '4.1': this.getComputerArchitectureTemplates(grade, gradeConfig),
       '4.2': this.getOperatingSystemsTemplates(grade, gradeConfig),
       '4.3': this.getInputOutputDevicesTemplates(grade, gradeConfig),
       '4.4': this.getStorageDevicesTemplates(grade, gradeConfig),
       '4.5': this.getSystemPerformanceTemplates(grade, gradeConfig),
       
       // Legacy mappings for backward compatibility
       'digital-citizenship': this.getDigitalCitizenshipTemplates(grade, gradeConfig),
       'online-safety': this.getOnlineSafetyTemplates(grade, gradeConfig),
       'digital-footprint': this.getDigitalFootprintTemplates(grade, gradeConfig),
       'computer-basics': this.getComputerBasicsTemplates(grade, gradeConfig),
       'hardware-software': this.getHardwareSoftwareTemplates(grade, gradeConfig)
     };
     
     return subtopicTemplates[subtopicId] || this.getDefaultTemplates(grade, gradeConfig);
   }
   
   // Digital Citizenship & Ethics Templates
   getDigitalCitizenshipTemplates(grade, gradeConfig) {
     const baseQuestions = {
       multipleChoice: [
         "What does it mean to be a responsible digital citizen?",
         "Which behavior demonstrates good digital citizenship?",
         "What is the most important aspect of digital ethics?"
       ],
       trueFalse: [
         "It's acceptable to use someone else's work without permission if it's found online.",
         "Digital citizenship only applies to social media use.",
         "Respecting others online is as important as respecting them in person."
       ],
       fillBlank: [
         "A digital _____ is someone who uses technology responsibly and ethically.",
         "The _____ rule applies both online and offline: treat others as you want to be treated.",
         "Digital _____ refers to following laws and ethical principles when using technology."
       ],
       ordering: [
         "Steps to resolve an online conflict respectfully",
         "Process for reporting inappropriate online behavior",
         "Steps to verify information before sharing it online"
       ],
       matching: [
         "Digital citizenship concepts and their definitions",
         "Online behaviors and their ethical classifications",
         "Digital rights and corresponding responsibilities"
       ],
       codeCompletion: [
         "Complete the digital citizenship pledge",
         "Fill in the community guidelines template",
         "Complete the acceptable use policy statement"
       ],
       scenario: [
         "You see cyberbullying happening in your class group chat",
         "A friend asks you to share your streaming account password",
         "You find a great image online for your school project"
       ],
       dragDrop: [
         "Categorize online behaviors as appropriate or inappropriate",
         "Match digital citizenship principles to real-world situations",
         "Organize steps for responsible social media use"
       ],
       hotspot: [
         "Identify elements of a respectful online profile",
         "Click on appropriate sharing settings for different content types",
         "Select privacy settings that protect personal information"
       ],
       multiSelect: [
         "Which actions demonstrate responsible digital citizenship?",
         "Select all the digital rights that citizens should have",
         "Choose the ethical considerations when posting online"
       ]
     };
     
     return this.generateQuestionsFromBase(baseQuestions, 'digital-citizenship', grade, gradeConfig);
    }
    
    // Generate questions from base question prompts
    generateQuestionsFromBase(baseQuestions, subtopic, grade, gradeConfig) {
      const templates = {};
      
      Object.keys(baseQuestions).forEach(questionType => {
        templates[questionType] = [];
        const prompts = baseQuestions[questionType];
        
        // Generate 2 questions per prompt to reach 20 total per type
        prompts.forEach((prompt, index) => {
          for (let i = 0; i < Math.ceil(20 / prompts.length); i++) {
            if (templates[questionType].length >= 20) break;
            
            const question = this.createQuestionFromPrompt(prompt, questionType, subtopic, grade, gradeConfig, templates[questionType].length + 1);
            if (question) {
              templates[questionType].push(question);
            }
          }
        });
        
        // Ensure exactly 20 questions per type with safety counter
        let attempts = 0;
        const maxAttempts = 100; // Prevent infinite loops
        while (templates[questionType].length < 20 && attempts < maxAttempts) {
          const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];
          const question = this.createQuestionFromPrompt(randomPrompt, questionType, subtopic, grade, gradeConfig, templates[questionType].length + 1);
          if (question) {
            templates[questionType].push(question);
          }
          attempts++;
        }
        
        // Log if we couldn't generate enough questions
        if (templates[questionType].length < 20) {
          console.warn(`QuestionGenerator: Could only generate ${templates[questionType].length} questions for type ${questionType}, attempted ${attempts} times`);
        }
      });
      
      return templates;
    }
    
    // Create individual question from prompt
    createQuestionFromPrompt(prompt, questionType, subtopic, grade, gradeConfig, questionId) {
      // Ensure gradeConfig is properly set
      const actualGradeConfig = gradeConfig || this.gradeDifficultyMapping[grade] || this.gradeDifficultyMapping[8];
      const difficulty = this.calculateGradeDifficulty('medium', grade, actualGradeConfig);
      const bloomLevel = this.selectBloomLevel(grade, actualGradeConfig);
      const points = this.calculatePoints(grade, actualGradeConfig);
      
      switch (questionType) {
        case 'multipleChoice':
          return this.createMultipleChoiceQuestion(prompt, subtopic, grade, gradeConfig, questionId, difficulty, bloomLevel, points);
        case 'trueFalse':
          return this.createTrueFalseQuestion(prompt, subtopic, grade, gradeConfig, questionId, difficulty, bloomLevel, points);
        case 'fillBlank':
          return this.createFillBlankQuestion(prompt, subtopic, grade, gradeConfig, questionId, difficulty, bloomLevel, points);
        case 'ordering':
          return this.createOrderingQuestion(prompt, subtopic, grade, gradeConfig, questionId, difficulty, bloomLevel, points);
        case 'matching':
          return this.createMatchingQuestion(prompt, subtopic, grade, gradeConfig, questionId, difficulty, bloomLevel, points);
        case 'codeCompletion':
          return this.createCodeCompletionQuestion(prompt, subtopic, grade, gradeConfig, questionId, difficulty, bloomLevel, points);
        case 'scenario':
          return this.createScenarioQuestion(prompt, subtopic, grade, gradeConfig, questionId, difficulty, bloomLevel, points);
        case 'dragDrop':
          return this.createDragDropQuestion(prompt, subtopic, grade, gradeConfig, questionId, difficulty, bloomLevel, points);
        case 'hotspot':
          return this.createHotspotQuestion(prompt, subtopic, grade, gradeConfig, questionId, difficulty, bloomLevel, points);
        case 'multiSelect':
          return this.createMultiSelectQuestion(prompt, subtopic, grade, gradeConfig, questionId, difficulty, bloomLevel, points);
        default:
          return null;
      }
    }
    
    // Online Safety Templates
    getOnlineSafetyTemplates(grade, gradeConfig) {
      const baseQuestions = {
        multipleChoice: [
          "What should you do if someone online asks for your personal information?",
          "Which of these is a sign of a potentially unsafe website?",
          "What is the safest way to meet someone you've only talked to online?"
        ],
        trueFalse: [
          "It's safe to share your school name and grade with online friends.",
          "You should always tell a trusted adult about uncomfortable online interactions.",
          "Public Wi-Fi networks are always safe for online banking."
        ],
        fillBlank: [
          "Never share your _____ information with strangers online.",
          "A _____ is someone who pretends to be someone else online to harm others.",
          "Always use _____ websites when entering sensitive information."
        ],
        ordering: [
          "Steps to take when encountering cyberbullying",
          "Process for safely downloading files from the internet",
          "Steps to verify if a website is trustworthy"
        ],
        matching: [
          "Online safety threats and their prevention methods",
          "Warning signs and appropriate responses",
          "Safe online practices and their benefits"
        ],
        codeCompletion: [
          "Complete the safety checklist for online gaming",
          "Fill in the steps for reporting online harassment",
          "Complete the guidelines for safe social media use"
        ],
        scenario: [
          "You receive a friend request from someone claiming to be from your school",
          "A pop-up says your computer is infected and asks you to download software",
          "Someone in an online game asks to meet you in person"
        ],
        dragDrop: [
          "Sort online behaviors into safe and unsafe categories",
          "Match online threats with appropriate responses",
          "Organize steps for creating a safe online environment"
        ],
        hotspot: [
          "Identify safe elements in a social media profile setup",
          "Click on secure indicators in a web browser",
          "Select appropriate privacy settings for different platforms"
        ],
        multiSelect: [
          "Which information should never be shared online?",
          "Select all signs that indicate a suspicious email",
          "Choose the best practices for online safety"
        ]
      };
      
      return this.generateQuestionsFromBase(baseQuestions, 'online-safety', grade, gradeConfig);
    }
 
    // Individual question creation methods
     createMultipleChoiceQuestion(prompt, subtopic, grade, gradeConfig, questionId, difficulty, bloomLevel, points) {
       const questionBank = this.getMultipleChoiceBank(subtopic, grade);
       const questionData = questionBank[Math.floor(Math.random() * questionBank.length)];
       
       return {
         id: questionId,
         type: 'multiple-choice',
         question: this.adaptQuestionForGrade(questionData.question, grade, gradeConfig),
         options: questionData.options,
         correctAnswer: questionData.correctAnswer,
         explanation: this.adaptExplanationForGrade(questionData.explanation, grade, gradeConfig),
         difficulty: difficulty,
         bloomLevel: bloomLevel,
         points: points,
         subtopic: subtopic
       };
     }
     
     createTrueFalseQuestion(prompt, subtopic, grade, gradeConfig, questionId, difficulty, bloomLevel, points) {
       const questionBank = this.getTrueFalseBank(subtopic, grade);
       const questionData = questionBank[Math.floor(Math.random() * questionBank.length)];
       
       return {
         id: questionId,
         type: 'true-false',
         statement: this.adaptQuestionForGrade(questionData.statement, grade, gradeConfig),
         isTrue: questionData.isTrue,
         explanation: this.adaptExplanationForGrade(questionData.explanation, grade, gradeConfig),
         difficulty: difficulty,
         bloomLevel: bloomLevel,
         points: points,
         subtopic: subtopic
       };
     }
     
     createFillBlankQuestion(prompt, subtopic, grade, gradeConfig, questionId, difficulty, bloomLevel, points) {
       const questionBank = this.getFillBlankBank(subtopic, grade);
       const questionData = questionBank[Math.floor(Math.random() * questionBank.length)];
       
       return {
         id: questionId,
         type: 'fill-blank',
         question: this.adaptQuestionForGrade(questionData.question, grade, gradeConfig),
         blanks: questionData.blanks,
         answers: questionData.answers,
         alternatives: questionData.alternatives || [],
         explanation: this.adaptExplanationForGrade(questionData.explanation, grade, gradeConfig),
         difficulty: difficulty,
         bloomLevel: bloomLevel,
         points: points,
         subtopic: subtopic
       };
     }
     
     createOrderingQuestion(prompt, subtopic, grade, gradeConfig, questionId, difficulty, bloomLevel, points) {
       const questionBank = this.getOrderingBank(subtopic, grade);
       const questionData = questionBank[Math.floor(Math.random() * questionBank.length)];
       
       return {
         id: questionId,
         type: 'ordering',
         question: this.adaptQuestionForGrade(questionData.question, grade, gradeConfig),
         items: this.shuffleArray([...questionData.correctOrder]),
         correctOrder: questionData.correctOrder,
         explanation: this.adaptExplanationForGrade(questionData.explanation, grade, gradeConfig),
         difficulty: difficulty,
         bloomLevel: bloomLevel,
         points: points,
         subtopic: subtopic
       };
     }
     
     createMatchingQuestion(prompt, subtopic, grade, gradeConfig, questionId, difficulty, bloomLevel, points) {
       const questionBank = this.getMatchingBank(subtopic, grade);
       const questionData = questionBank[Math.floor(Math.random() * questionBank.length)];
       
       return {
         id: questionId,
         type: 'matching',
         question: this.adaptQuestionForGrade(questionData.question, grade, gradeConfig),
         leftColumn: questionData.leftColumn,
         rightColumn: this.shuffleArray([...questionData.rightColumn]),
         correctPairs: questionData.correctPairs,
         explanation: this.adaptExplanationForGrade(questionData.explanation, grade, gradeConfig),
         difficulty: difficulty,
         bloomLevel: bloomLevel,
         points: points,
         subtopic: subtopic
       };
     }
     
     createCodeCompletionQuestion(prompt, subtopic, grade, gradeConfig, questionId, difficulty, bloomLevel, points) {
       const questionBank = this.getCodeCompletionBank(subtopic, grade);
       const questionData = questionBank[Math.floor(Math.random() * questionBank.length)];
       
       return {
         id: questionId,
         type: 'code-completion',
         question: this.adaptQuestionForGrade(questionData.question, grade, gradeConfig),
         codeSnippet: questionData.codeSnippet,
         language: questionData.language,
         blanks: questionData.blanks,
         options: questionData.options,
         correct: questionData.correct,
         explanation: this.adaptExplanationForGrade(questionData.explanation, grade, gradeConfig),
         difficulty: difficulty,
         bloomLevel: bloomLevel,
         points: points,
         subtopic: subtopic
       };
     }
     
     createScenarioQuestion(prompt, subtopic, grade, gradeConfig, questionId, difficulty, bloomLevel, points) {
       const questionBank = this.getScenarioBank(subtopic, grade);
       const questionData = questionBank[Math.floor(Math.random() * questionBank.length)];
       
       return {
         id: questionId,
         type: 'scenario',
         scenario: this.adaptQuestionForGrade(questionData.scenario, grade, gradeConfig),
         question: this.adaptQuestionForGrade(questionData.question, grade, gradeConfig),
         options: questionData.options,
         correctAnswer: questionData.correctAnswer,
         explanation: this.adaptExplanationForGrade(questionData.explanation, grade, gradeConfig),
         difficulty: difficulty,
         bloomLevel: bloomLevel,
         points: points,
         subtopic: subtopic
       };
     }
     
     createDragDropQuestion(prompt, subtopic, grade, gradeConfig, questionId, difficulty, bloomLevel, points) {
       const questionBank = this.getDragDropBank(subtopic, grade);
       const questionData = questionBank[Math.floor(Math.random() * questionBank.length)];
       
       return {
         id: questionId,
         type: 'drag-drop',
         question: this.adaptQuestionForGrade(questionData.question, grade, gradeConfig),
         draggableItems: this.shuffleArray([...questionData.draggableItems]),
         dropZones: questionData.dropZones,
         correctMapping: questionData.correctMapping,
         explanation: this.adaptExplanationForGrade(questionData.explanation, grade, gradeConfig),
         difficulty: difficulty,
         bloomLevel: bloomLevel,
         points: points,
         subtopic: subtopic
       };
     }
     
     createHotspotQuestion(prompt, subtopic, grade, gradeConfig, questionId, difficulty, bloomLevel, points) {
       const questionBank = this.getHotspotBank(subtopic, grade);
       const questionData = questionBank[Math.floor(Math.random() * questionBank.length)];
       
       return {
         id: questionId,
         type: 'hotspot',
         question: this.adaptQuestionForGrade(questionData.question, grade, gradeConfig),
         image: questionData.image,
         hotspots: questionData.hotspots,
         correctHotspots: questionData.correctHotspots,
         explanation: this.adaptExplanationForGrade(questionData.explanation, grade, gradeConfig),
         difficulty: difficulty,
         bloomLevel: bloomLevel,
         points: points,
         subtopic: subtopic
       };
     }
     
     createMultiSelectQuestion(prompt, subtopic, grade, gradeConfig, questionId, difficulty, bloomLevel, points) {
       const questionBank = this.getMultiSelectBank(subtopic, grade);
       const questionData = questionBank[Math.floor(Math.random() * questionBank.length)];
       
       return {
         id: questionId,
         type: 'multi-select',
         question: this.adaptQuestionForGrade(questionData.question, grade, gradeConfig),
         options: this.shuffleArray([...questionData.options]),
         correctAnswers: questionData.correctAnswers,
         minSelections: questionData.minSelections || 1,
         maxSelections: questionData.maxSelections || questionData.options.length,
         explanation: this.adaptExplanationForGrade(questionData.explanation, grade, gradeConfig),
         difficulty: difficulty,
         bloomLevel: bloomLevel,
         points: points,
         subtopic: subtopic
       };
     }
     
     // Default templates for fallback
     getDefaultTemplates(grade, gradeConfig) {
      return this.getDigitalCitizenshipTemplates(grade, gradeConfig);
    }

    // Digital Footprint Templates
    getDigitalFootprintTemplates(grade, gradeConfig) {
      const baseQuestions = {
        multipleChoice: [
          "What is a digital footprint?",
          "Which action creates a permanent digital footprint?",
          "How can you manage your digital reputation?"
        ],
        trueFalse: [
          "Everything you do online leaves a digital trace.",
          "Deleting a post means it's completely gone from the internet.",
          "Your digital footprint can affect future opportunities."
        ],
        fillBlank: [
          "A _____ footprint includes all the information you intentionally share online.",
          "Your _____ reputation is how others perceive you based on your online presence.",
          "_____ engines can find old posts and information about you."
        ],
        ordering: [
          "Steps to clean up your digital footprint",
          "Process for checking what information is available about you online",
          "Steps to create a positive digital presence"
        ],
        matching: [
          "Digital footprint types and their characteristics",
          "Online actions and their digital footprint impact",
          "Privacy settings and their effects on digital footprint"
        ],
        codeCompletion: [
          "Privacy settings configuration",
          "Social media profile cleanup",
          "Digital audit checklist"
        ],
        scenario: [
          "Managing embarrassing content from your past",
          "Dealing with negative search results about yourself",
          "Creating a professional online presence"
        ],
        dragDrop: [
          "Categorizing digital footprint elements",
          "Organizing privacy settings by importance",
          "Sorting online activities by footprint impact"
        ],
        hotspot: [
          "Identifying privacy settings in social media",
          "Finding digital footprint traces in search results",
          "Locating reputation management tools"
        ],
        multiSelect: [
          "Actions that improve your digital reputation",
          "Information that should be kept private",
          "Ways to monitor your digital footprint"
        ]
      };
      
      return this.generateQuestionsFromBase(baseQuestions, 'digital-footprint', grade, gradeConfig);
    }

    // Computer Basics Templates
    getComputerBasicsTemplates(grade, gradeConfig) {
      const baseQuestions = {
        multipleChoice: [
          "What is the main function of a computer's CPU?",
          "Which component stores data permanently?",
          "What does RAM stand for?"
        ],
        trueFalse: [
          "The CPU is the brain of the computer.",
          "RAM stores data permanently even when the computer is off.",
          "All computers need an operating system to function."
        ],
        fillBlank: [
          "The _____ processes all instructions and calculations in a computer.",
          "_____ memory is temporary and loses data when power is turned off.",
          "The _____ connects all computer components together."
        ],
        ordering: [
          "Steps in the computer boot process",
          "Process of how data flows through computer components",
          "Steps to properly shut down a computer"
        ],
        matching: [
          "Computer components and their functions",
          "Input devices and their purposes",
          "Storage types and their characteristics"
        ],
        codeCompletion: [
          "Basic computer maintenance tasks",
          "File organization structure",
          "System information commands"
        ],
        scenario: [
          "Choosing the right computer for different needs",
          "Troubleshooting a slow computer",
          "Upgrading computer components"
        ],
        dragDrop: [
          "Categorizing computer components by function",
          "Organizing files in a logical folder structure",
          "Sorting devices by input/output type"
        ],
        hotspot: [
          "Identifying computer ports and connections",
          "Locating system information in operating system",
          "Finding computer specifications"
        ],
        multiSelect: [
          "Essential computer maintenance tasks",
          "Signs that indicate computer problems",
          "Factors to consider when buying a computer"
        ]
      };
      
      return this.generateQuestionsFromBase(baseQuestions, 'computer-basics', grade, gradeConfig);
    }

    // Hardware Software Templates
    getHardwareSoftwareTemplates(grade, gradeConfig) {
      const baseQuestions = {
        multipleChoice: [
          "What is the difference between hardware and software?",
          "Which is an example of system software?",
          "What type of software is Microsoft Word?"
        ],
        trueFalse: [
          "Hardware refers to the physical components of a computer.",
          "Software can function without hardware.",
          "Device drivers are a type of system software."
        ],
        fillBlank: [
          "_____ is the physical components you can touch, while _____ is the programs and instructions.",
          "_____ software manages computer resources and provides a platform for other programs.",
          "_____ software is designed for end-users to accomplish specific tasks."
        ],
        ordering: [
          "Layers of software from hardware to user applications",
          "Process of software installation",
          "Steps in hardware and software troubleshooting"
        ],
        matching: [
          "Hardware components and software that controls them",
          "Software types and their examples",
          "Hardware problems and software solutions"
        ],
        codeCompletion: [
          "Device driver installation",
          "Software compatibility checking",
          "Hardware diagnostic commands"
        ],
        scenario: [
          "Resolving hardware and software compatibility issues",
          "Choosing between hardware upgrade vs software optimization",
          "Diagnosing whether a problem is hardware or software related"
        ],
        dragDrop: [
          "Categorizing items as hardware or software",
          "Organizing software by type and function",
          "Matching hardware with compatible software"
        ],
        hotspot: [
          "Identifying hardware components in system diagrams",
          "Locating software information in system settings",
          "Finding hardware specifications in device manager"
        ],
        multiSelect: [
          "Examples of system software",
          "Types of application software",
          "Hardware components that require drivers"
        ]
      };
      
      return this.generateQuestionsFromBase(baseQuestions, 'hardware-software', grade, gradeConfig);
    }
     
     // Question bank methods for different question types}

    // Template methods for Computational Thinking and Programming (Topic 1)
    getPseudocodeTemplates(grade, gradeConfig) {
      const baseQuestions = {
        A: [
          {
            prompt: 'What is pseudocode?',
            options: ['A programming language', 'A way to plan algorithms using plain language', 'A type of computer', 'A debugging tool'],
            correctAnswer: 1
          }
        ],
        B: [
          {
            prompt: 'Pseudocode should be written in a specific programming language.',
            correctAnswer: false
          }
        ],
        C: [
          {
            prompt: 'Pseudocode helps programmers _____ their logic before writing actual code.',
            correctAnswer: 'plan'
          }
        ],
        D: [
          {
            prompt: 'Match the pseudocode element with its purpose:',
            pairs: [['START/END', 'Mark beginning and end'], ['IF/THEN', 'Make decisions']]
          }
        ],
        E: [
          {
            prompt: 'Order these steps in writing pseudocode:',
            items: ['Understand the problem', 'Write step-by-step logic', 'Test the logic', 'Convert to actual code']
          }
        ]
      };
      
      return this.generateQuestionsFromBase(baseQuestions, 'pseudocode', grade, gradeConfig);
    }

    getSelectionTemplates(grade, gradeConfig) {
      const baseQuestions = {
        A: [
          {
            prompt: 'What is selection in programming?',
            options: ['Choosing variables', 'Making decisions in code', 'Selecting text', 'Picking a programming language'],
            correctAnswer: 1
          }
        ],
        B: [
          {
            prompt: 'IF statements are used for selection in programming.',
            correctAnswer: true
          }
        ],
        C: [
          {
            prompt: 'The _____ statement allows a program to choose between different paths.',
            correctAnswer: 'IF'
          }
        ],
        D: [
          {
            prompt: 'Match the selection structure with its use:',
            pairs: [['IF', 'Single condition'], ['IF-ELSE', 'Two alternatives']]
          }
        ],
        E: [
          {
            prompt: 'Order these parts of an IF statement:',
            items: ['IF', 'condition', 'THEN', 'action']
          }
        ]
      };
      
      return this.generateQuestionsFromBase(baseQuestions, 'selection', grade, gradeConfig);
    }

    getSearchingTemplates(grade, gradeConfig) {
      const baseQuestions = {
        A: [
          {
            prompt: 'What is a search algorithm?',
            options: ['A way to sort data', 'A method to find specific data', 'A type of loop', 'A programming language'],
            correctAnswer: 1
          }
        ],
        B: [
          {
            prompt: 'Linear search checks every item in a list one by one.',
            correctAnswer: true
          }
        ],
        C: [
          {
            prompt: 'Binary search requires the data to be _____ first.',
            correctAnswer: 'sorted'
          }
        ],
        D: [
          {
            prompt: 'Match the search type with its characteristic:',
            pairs: [['Linear Search', 'Checks each item sequentially'], ['Binary Search', 'Divides search space in half']]
          }
        ],
        E: [
          {
            prompt: 'Order these steps in binary search:',
            items: ['Find middle element', 'Compare with target', 'Eliminate half of data', 'Repeat until found']
          }
        ]
      };
      
      return this.generateQuestionsFromBase(baseQuestions, 'searching', grade, gradeConfig);
    }

    getConditionalStatementsTemplates(grade, gradeConfig) {
      const baseQuestions = {
        A: [
          {
            prompt: 'What do conditional statements do?',
            options: ['Store data', 'Make decisions based on conditions', 'Repeat code', 'Define functions'],
            correctAnswer: 1
          }
        ],
        B: [
          {
            prompt: 'ELSE statements are optional in conditional structures.',
            correctAnswer: true
          }
        ],
        C: [
          {
            prompt: 'The _____ operator is commonly used to test equality in conditions.',
            correctAnswer: '=='
          }
        ],
        D: [
          {
            prompt: 'Match the operator with its meaning:',
            pairs: [['==', 'Equal to'], ['!=', 'Not equal to']]
          }
        ],
        E: [
          {
            prompt: 'Order these parts of a complex conditional:',
            items: ['IF', 'first condition', 'ELIF', 'second condition', 'ELSE']
          }
        ]
      };
      
      return this.generateQuestionsFromBase(baseQuestions, 'conditional', grade, gradeConfig);
    }

    getDataProgrammingTemplates(grade, gradeConfig) {
      const baseQuestions = {
        A: [
          {
            prompt: 'What is a variable in programming?',
            options: ['A fixed value', 'A container for storing data', 'A type of loop', 'A programming language'],
            correctAnswer: 1
          }
        ],
        B: [
          {
            prompt: 'Variables can store different types of data.',
            correctAnswer: true
          }
        ],
        C: [
          {
            prompt: 'An _____ is a collection of items stored in a single variable.',
            correctAnswer: 'array'
          }
        ],
        D: [
          {
            prompt: 'Match the data type with its example:',
            pairs: [['String', 'Hello World'], ['Integer', '42']]
          }
        ],
        E: [
          {
            prompt: 'Order these steps in variable usage:',
            items: ['Declare variable', 'Assign value', 'Use variable', 'Update value']
          }
        ]
      };
      
      return this.generateQuestionsFromBase(baseQuestions, 'data-programming', grade, gradeConfig);
    }

    getLibraryProgramTemplates(grade, gradeConfig) {
      const baseQuestions = {
        A: [
          {
            prompt: 'What is a programming library?',
            options: ['A place to store books', 'Pre-written code that can be reused', 'A type of variable', 'A programming error'],
            correctAnswer: 1
          }
        ],
        B: [
          {
            prompt: 'Libraries help programmers avoid writing code from scratch.',
            correctAnswer: true
          }
        ],
        C: [
          {
            prompt: 'To use a library, you typically need to _____ it first.',
            correctAnswer: 'import'
          }
        ],
        D: [
          {
            prompt: 'Match the library type with its purpose:',
            pairs: [['Math Library', 'Mathematical calculations'], ['Graphics Library', 'Drawing and images']]
          }
        ],
        E: [
          {
            prompt: 'Order these steps in using a library:',
            items: ['Find suitable library', 'Import library', 'Read documentation', 'Use library functions']
          }
        ]
      };
      
      return this.generateQuestionsFromBase(baseQuestions, 'library-program', grade, gradeConfig);
    }

    getSoftwareDevelopmentTemplates(grade, gradeConfig) {
      const baseQuestions = {
        A: [
          {
            prompt: 'What is the software development lifecycle?',
            options: ['A type of computer', 'The process of creating software', 'A programming language', 'A debugging tool'],
            correctAnswer: 1
          }
        ],
        B: [
          {
            prompt: 'Testing is an important part of software development.',
            correctAnswer: true
          }
        ],
        C: [
          {
            prompt: 'The first step in software development is usually _____ the requirements.',
            correctAnswer: 'analyzing'
          }
        ],
        D: [
          {
            prompt: 'Match the development phase with its activity:',
            pairs: [['Planning', 'Define requirements'], ['Implementation', 'Write code']]
          }
        ],
        E: [
          {
            prompt: 'Order these phases of software development:',
            items: ['Planning', 'Design', 'Implementation', 'Testing', 'Deployment']
          }
        ]
      };
      
      return this.generateQuestionsFromBase(baseQuestions, 'software-development', grade, gradeConfig);
    }

    getPhysicalComputingTemplates(grade, gradeConfig) {
      const baseQuestions = {
        A: [
          {
            prompt: 'What is physical computing?',
            options: ['Using only hardware', 'Connecting software to physical world', 'Building computers', 'Repairing devices'],
            correctAnswer: 1
          }
        ],
        B: [
          {
            prompt: 'Sensors are used in physical computing to gather data from the environment.',
            correctAnswer: true
          }
        ],
        C: [
          {
            prompt: 'An _____ is a device that converts electrical signals into physical actions.',
            correctAnswer: 'actuator'
          }
        ],
        D: [
          {
            prompt: 'Match the component with its function:',
            pairs: [['Sensor', 'Collects data'], ['Actuator', 'Performs actions']]
          }
        ],
        E: [
          {
            prompt: 'Order these steps in a physical computing project:',
            items: ['Plan project', 'Connect sensors', 'Write code', 'Test system']
          }
        ]
      };
      
      return this.generateQuestionsFromBase(baseQuestions, 'physical-computing', grade, gradeConfig);
    }

    // Template methods for Managing Data (Topic 2)
    getModellingTemplates(grade, gradeConfig) {
      const baseQuestions = {
        A: [
          {
            prompt: 'What is data modeling?',
            options: ['Creating physical models', 'Organizing and structuring data', 'Drawing pictures', 'Building databases'],
            correctAnswer: 1
          }
        ],
        B: [
          {
            prompt: 'Data models help us understand relationships between different pieces of information.',
            correctAnswer: true
          }
        ],
        C: [
          {
            prompt: 'A _____ diagram shows how different entities relate to each other.',
            correctAnswer: 'relationship'
          }
        ],
        D: [
          {
            prompt: 'Match the modeling concept with its description:',
            pairs: [['Entity', 'A thing or object'], ['Attribute', 'A property of an entity']]
          }
        ],
        E: [
          {
            prompt: 'Order these steps in data modeling:',
            items: ['Identify entities', 'Define attributes', 'Establish relationships', 'Create diagram']
          }
        ]
      };
      
      return this.generateQuestionsFromBase(baseQuestions, 'modelling', grade, gradeConfig);
    }

    getDataDatabasesTemplates(grade, gradeConfig) {
      const baseQuestions = {
        A: [
          {
            type: 'A',
            prompt: 'What is a database?',
            options: ['A type of computer', 'An organized collection of data', 'A programming language', 'A web browser'],
            correctAnswer: 1
          }
        ],
        B: [
          {
            type: 'B',
            prompt: 'Databases allow multiple users to access the same data simultaneously.',
            correctAnswer: true
          }
        ],
        C: [
          {
            type: 'C',
            prompt: 'A _____ is a collection of related records in a database.',
            correctAnswer: 'table'
          }
        ],
        D: [
          {
            type: 'D',
            prompt: 'Match the database term with its meaning:',
            pairs: [['Record', 'A single row of data'], ['Field', 'A single piece of information']]
          }
        ],
        E: [
          {
            type: 'E',
            prompt: 'Order these database operations:',
            items: ['Create table', 'Insert data', 'Query data', 'Update records']
          }
        ]
      };
      
      return this.generateQuestionsFromBase(baseQuestions, 'data-databases', grade, gradeConfig);
    }

    // Template methods for Networks and Digital Communications (Topic 3)
    getNetworkTypesTemplates(grade, gradeConfig) {
      const baseQuestions = {
        multipleChoice: [
          "What is a computer network?",
          "Which type of network covers the largest geographical area?",
          "What does LAN stand for?",
          "Which network type is typically used in a single building?",
          "What is the main advantage of using a network?",
          "Which device is commonly used to connect different networks?",
          "What type of network would you find in a home?",
          "Which network topology connects all devices to a central hub?"
        ],
        trueFalse: [
          "A LAN covers a larger area than a WAN.",
          "Networks allow computers to share resources like printers and files.",
          "A router is used to connect devices within the same network.",
          "WAN stands for Wide Area Network.",
          "All devices in a network must be the same type.",
          "The internet is an example of a WAN.",
          "A switch operates at the physical layer of networking.",
          "Wireless networks are less secure than wired networks."
        ],
        fillBlank: [
          "A _____ connects devices within a small area like a home or office.",
          "The _____ is the largest network that connects computers worldwide.",
          "A _____ is used to forward data between different networks.",
          "_____ topology connects all devices in a line.",
          "A _____ network uses radio waves to connect devices.",
          "_____ stands for Personal Area Network.",
          "A network _____ is a device that connects multiple devices together.",
          "_____ is a protocol used for secure web communication."
        ],
        ordering: [
          "Order these network sizes from smallest to largest coverage area",
          "Arrange the steps to set up a basic home network",
          "Order the layers of network communication from physical to application",
          "Sequence the process of data transmission across networks"
        ],
        matching: [
          "Match network types with their typical coverage areas",
          "Connect network devices with their primary functions",
          "Pair network topologies with their characteristics",
          "Match network protocols with their purposes"
        ],
        codeCompletion: [
          "Complete the network configuration script",
          "Fill in the missing parts of the IP address setup",
          "Complete the wireless network security settings",
          "Finish the network troubleshooting commands"
        ],
        scenario: [
          "Your school wants to connect all classrooms to share resources",
          "A company needs to connect offices in different cities",
          "You need to set up internet access for a small cafe",
          "A hospital requires a secure network for patient data"
        ],
        dragDrop: [
          "Categorize devices as network infrastructure or end-user devices",
          "Sort network types by their typical coverage area",
          "Organize network security measures by their level of protection",
          "Group network protocols by their function"
        ],
        hotspot: [
          "Identify the router in a network diagram",
          "Click on the device that connects to the internet",
          "Select the wireless access point in the office layout",
          "Point to the switch in the network topology"
        ],
        multiSelect: [
          "Which of these are types of computer networks?",
          "Select all devices that can be part of a network",
          "Choose the benefits of using computer networks",
          "Which protocols are used for network communication?"
        ]
      };
      
      return this.generateQuestionsFromBase(baseQuestions, 'network-types', grade, gradeConfig);
    }

    getDataTransmissionSecurityTemplates(grade, gradeConfig) {
      const baseQuestions = {
        multipleChoice: [
          "What is data encryption?",
          "Which protocol provides secure web browsing?",
          "What is the purpose of a firewall?",
          "Which type of attack involves intercepting data transmission?",
          "What does SSL stand for?",
          "Which encryption method uses the same key for encryption and decryption?",
          "What is two-factor authentication?",
          "Which of these is a secure password practice?"
        ],
        trueFalse: [
          "HTTPS is more secure than HTTP for web browsing.",
          "Encryption makes data completely unreadable without the correct key.",
          "Public Wi-Fi networks are always safe for sensitive data transmission.",
          "A VPN creates a secure tunnel for data transmission.",
          "Passwords should be the same across all accounts for convenience.",
          "Antivirus software can protect against all types of cyber threats.",
          "Digital certificates verify the identity of websites.",
          "Phishing attacks only happen through email."
        ],
        fillBlank: [
          "A _____ is needed to decrypt encrypted data.",
          "_____ is a protocol that secures data transmission over the internet.",
          "A _____ protects a network by controlling incoming and outgoing traffic.",
          "_____ authentication requires two different verification methods.",
          "A _____ network creates a secure connection over a public network.",
          "_____ attacks trick users into revealing sensitive information.",
          "_____ software protects computers from malicious programs.",
          "A strong password should include _____, numbers, and special characters."
        ],
        ordering: [
          "Order these steps in secure data transmission",
          "Arrange the process of setting up a secure connection",
          "Sequence the steps to verify a website's security",
          "Order the layers of network security from basic to advanced"
        ],
        matching: [
          "Match security measures with their purposes",
          "Connect cyber threats with their prevention methods",
          "Pair encryption types with their characteristics",
          "Match security protocols with their applications"
        ],
        codeCompletion: [
          "Complete the secure connection configuration",
          "Fill in the encryption algorithm setup",
          "Complete the firewall rule configuration",
          "Finish the secure authentication code"
        ],
        scenario: [
          "You need to send confidential business documents over the internet",
          "A student wants to use public Wi-Fi for online banking",
          "An employee receives a suspicious email asking for login credentials",
          "A company needs to secure their customer database"
        ],
        dragDrop: [
          "Categorize security measures as preventive or detective",
          "Sort cyber threats by their level of severity",
          "Organize security protocols by their encryption strength",
          "Group authentication methods by their security level"
        ],
        hotspot: [
          "Identify the secure connection indicator in a browser",
          "Click on the encryption settings in the security panel",
          "Select the firewall configuration option",
          "Point to the two-factor authentication setup"
        ],
        multiSelect: [
          "Which of these are signs of a secure website?",
          "Select all methods of data encryption",
          "Choose the best practices for password security",
          "Which protocols provide secure data transmission?"
        ]
      };
      
      return this.generateQuestionsFromBase(baseQuestions, 'data-transmission-security', grade, gradeConfig);
    }

    // Template methods for Computer System (Topic 4)
    getComputerArchitectureTemplates(grade, gradeConfig) {
      const baseQuestions = {
        A: [
          {
            type: 'A',
            prompt: 'What is the CPU?',
            options: ['Computer Processing Unit', 'Central Processing Unit', 'Computer Program Unit', 'Central Program Unit'],
            correctAnswer: 1
          }
        ],
        B: [
          {
            type: 'B',
            prompt: 'RAM is a type of permanent storage.',
            correctAnswer: false
          }
        ],
        C: [
          {
            type: 'C',
            prompt: 'The _____ is often called the brain of the computer.',
            correctAnswer: 'CPU'
          }
        ],
        D: [
          {
            type: 'D',
            prompt: 'Match the component with its function:',
            pairs: [['CPU', 'Processes instructions'], ['RAM', 'Temporary storage']]
          }
        ],
        E: [
          {
            type: 'E',
            prompt: 'Order these steps in the fetch-execute cycle:',
            items: ['Fetch instruction', 'Decode instruction', 'Execute instruction', 'Store result']
          }
        ]
      };
      
      return this.generateQuestionsFromBase(baseQuestions, 'computer-architecture', grade, gradeConfig);
    }

    getOperatingSystemsTemplates(grade, gradeConfig) {
      const baseQuestions = {
        A: [
          {
            type: 'A',
            prompt: 'What is an operating system?',
            options: ['A type of hardware', 'Software that manages computer resources', 'A programming language', 'A web browser'],
            correctAnswer: 1
          }
        ],
        B: [
          {
            type: 'B',
            prompt: 'The operating system manages both hardware and software resources.',
            correctAnswer: true
          }
        ],
        C: [
          {
            type: 'C',
            prompt: 'The _____ provides a way for users to interact with the computer.',
            correctAnswer: 'interface'
          }
        ],
        D: [
          {
            type: 'D',
            prompt: 'Match the OS function with its description:',
            pairs: [['File Management', 'Organizing files and folders'], ['Memory Management', 'Allocating RAM to programs']]
          }
        ],
        E: [
          {
            type: 'E',
            prompt: 'Order these OS boot steps:',
            items: ['Power on', 'Load BIOS', 'Load OS', 'Start desktop']
          }
        ]
      };
      
      return this.generateQuestionsFromBase(baseQuestions, 'operating-systems', grade, gradeConfig);
    }

    getInputOutputDevicesTemplates(grade, gradeConfig) {
      const baseQuestions = {
        A: [
          {
            prompt: 'Which of these is an input device?',
            options: ['Monitor', 'Keyboard', 'Printer', 'Speaker'],
            correctAnswer: 1
          }
        ],
        B: [
          {
            prompt: 'A touchscreen can be both an input and output device.',
            correctAnswer: true
          }
        ],
        C: [
          {
            prompt: 'A _____ converts digital signals to printed text or images.',
            correctAnswer: 'printer'
          }
        ],
        D: [
          {
            prompt: 'Match the device with its type:',
            pairs: [['Mouse', 'Input device'], ['Monitor', 'Output device']]
          }
        ],
        E: [
          {
            prompt: 'Order these steps in using a input device:',
            items: ['User action', 'Device detects action', 'Signal sent to computer', 'Computer processes signal']
          }
        ]
      };
      
      return this.generateQuestionsFromBase(baseQuestions, 'input-output-devices', grade, gradeConfig);
    }

    getStorageDevicesTemplates(grade, gradeConfig) {
      const baseQuestions = {
        A: [
          {
            prompt: 'Which storage device is fastest?',
            options: ['Hard disk drive', 'Solid state drive', 'CD-ROM', 'Floppy disk'],
            correctAnswer: 1
          }
        ],
        B: [
          {
            prompt: 'SSDs have moving parts like traditional hard drives.',
            correctAnswer: false
          }
        ],
        C: [
          {
            prompt: 'A _____ uses magnetic storage to save data.',
            correctAnswer: 'hard drive'
          }
        ],
        D: [
          {
            prompt: 'Match the storage type with its characteristic:',
            pairs: [['SSD', 'Fast and silent'], ['HDD', 'Large capacity, slower']]
          }
        ],
        E: [
          {
            prompt: 'Order these storage devices by typical capacity (smallest to largest):',
            items: ['USB flash drive', 'SSD', 'HDD', 'Cloud storage']
          }
        ]
      };
      
      return this.generateQuestionsFromBase(baseQuestions, 'storage-devices', grade, gradeConfig);
    }

    getSystemPerformanceTemplates(grade, gradeConfig) {
      const baseQuestions = {
        A: [
          {
            prompt: 'What affects computer performance the most?',
            options: ['Color of the case', 'CPU speed and RAM amount', 'Number of USB ports', 'Size of the monitor'],
            correctAnswer: 1
          }
        ],
        B: [
          {
            prompt: 'More RAM generally improves computer performance.',
            correctAnswer: true
          }
        ],
        C: [
          {
            prompt: 'CPU speed is measured in _____.',
            correctAnswer: 'hertz'
          }
        ],
        D: [
          {
            prompt: 'Match the component with its performance impact:',
            pairs: [['CPU', 'Processing speed'], ['RAM', 'Multitasking ability']]
          }
        ],
        E: [
          {
            prompt: 'Order these factors by their impact on performance:',
            items: ['CPU speed', 'RAM amount', 'Storage speed', 'Graphics card']
          }
        ]
      };
      
      return this.generateQuestionsFromBase(baseQuestions, 'system-performance', grade, gradeConfig);
    }

      getMultipleChoiceBank(subtopic, grade) {
        const banks = {
          'digital-citizenship': [
            {
              question: "What does it mean to be a responsible digital citizen?",
              options: ["Using technology to help others", "Following online rules and being respectful", "Knowing how to use all apps", "Having the newest devices"],
              correctAnswer: "Following online rules and being respectful",
              explanation: "Digital citizenship involves using technology responsibly and treating others with respect online."
            },
            {
              question: "Which behavior shows good digital citizenship?",
              options: ["Sharing personal information freely", "Respecting others' privacy and opinions", "Copying others' work without permission", "Ignoring cyberbullying"],
              correctAnswer: "Respecting others' privacy and opinions",
              explanation: "Good digital citizens respect others' privacy and treat people with kindness online."
            },
            {
              question: "What should you do if you see someone being bullied online?",
              options: ["Join in the bullying", "Ignore it completely", "Report it to a trusted adult", "Share it with friends"],
              correctAnswer: "Report it to a trusted adult",
              explanation: "When witnessing cyberbullying, it's important to report it to someone who can help."
            },
            {
              question: "What is a digital footprint?",
              options: ["A shoe print on a computer", "The trail of data you leave online", "A type of computer virus", "A digital art technique"],
              correctAnswer: "The trail of data you leave online",
              explanation: "A digital footprint is the record of your online activities and the data you leave behind."
            },
            {
              question: "Why is it important to think before you post online?",
              options: ["To save battery life", "Because posts can be permanent and affect your reputation", "To use less internet data", "Because typing is hard work"],
              correctAnswer: "Because posts can be permanent and affect your reputation",
              explanation: "Online posts can last forever and impact how others see you, so it's important to think carefully."
            },
            {
              question: "What does 'netiquette' mean?",
              options: ["Internet speed", "Online etiquette and good manners", "Network security", "Digital art style"],
              correctAnswer: "Online etiquette and good manners",
              explanation: "Netiquette refers to the proper way to behave and communicate online."
            },
            {
              question: "Which is an example of plagiarism?",
              options: ["Citing your sources properly", "Copying text without giving credit", "Writing your own original work", "Asking for help from a teacher"],
              correctAnswer: "Copying text without giving credit",
              explanation: "Plagiarism is using someone else's work or ideas without proper attribution."
            },
            {
              question: "What should you do if you accidentally share something inappropriate?",
              options: ["Hope nobody notices", "Delete it immediately and apologize if needed", "Share more to distract people", "Blame someone else"],
              correctAnswer: "Delete it immediately and apologize if needed",
              explanation: "Taking responsibility and correcting mistakes quickly shows good digital citizenship."
            },
            {
              question: "How can you be a positive influence in online communities?",
              options: ["By arguing with everyone", "By sharing helpful and encouraging content", "By spreading rumors", "By using inappropriate language"],
              correctAnswer: "By sharing helpful and encouraging content",
              explanation: "Positive digital citizens contribute constructively to online communities."
            },
            {
              question: "What is copyright?",
              options: ["The right to copy anything", "Legal protection for creative works", "A type of computer program", "Permission to use any image"],
              correctAnswer: "Legal protection for creative works",
              explanation: "Copyright protects creators' rights to their original works like music, art, and writing."
            },
            {
              question: "When is it okay to share someone else's photo online?",
              options: ["Whenever you want", "Only with their permission", "If they look good in it", "If it's funny"],
              correctAnswer: "Only with their permission",
              explanation: "Respecting others' privacy means getting permission before sharing their photos."
            },
            {
              question: "What makes a strong digital community?",
              options: ["Having the most members", "Mutual respect and helpful interactions", "Excluding certain people", "Sharing personal secrets"],
              correctAnswer: "Mutual respect and helpful interactions",
              explanation: "Strong digital communities are built on respect, kindness, and positive contributions."
            },
            {
              question: "How should you handle disagreements online?",
              options: ["Start an argument", "Use respectful language and listen to others", "Block everyone who disagrees", "Share the disagreement publicly"],
              correctAnswer: "Use respectful language and listen to others",
              explanation: "Healthy online discussions involve respect, active listening, and constructive dialogue."
            },
            {
              question: "What is digital empathy?",
              options: ["Feeling sorry for your computer", "Understanding and caring about others' online experiences", "Being sad about technology", "Avoiding all digital communication"],
              correctAnswer: "Understanding and caring about others' online experiences",
              explanation: "Digital empathy means considering how your online actions affect others' feelings and experiences."
            },
            {
              question: "Why is it important to verify information before sharing it?",
              options: ["To waste time", "To prevent spreading misinformation", "To show off your knowledge", "To make posts longer"],
              correctAnswer: "To prevent spreading misinformation",
              explanation: "Verifying information helps prevent the spread of false or misleading content."
            },
            {
              question: "What should you do if you make a mistake online?",
              options: ["Pretend it didn't happen", "Take responsibility and learn from it", "Blame technology problems", "Delete your account"],
              correctAnswer: "Take responsibility and learn from it",
              explanation: "Good digital citizens acknowledge their mistakes and use them as learning opportunities."
            },
            {
              question: "How can you protect others' digital rights?",
              options: ["By ignoring their concerns", "By respecting their privacy and intellectual property", "By sharing their personal information", "By copying their work freely"],
              correctAnswer: "By respecting their privacy and intellectual property",
              explanation: "Protecting others' digital rights means respecting their privacy, creativity, and online boundaries."
            },
            {
              question: "What is the golden rule of digital citizenship?",
              options: ["Always use gold-colored themes", "Treat others online as you want to be treated", "Only post during golden hour", "Use expensive devices only"],
              correctAnswer: "Treat others online as you want to be treated",
              explanation: "The golden rule applies online too - treat others with the same respect you'd want to receive."
            },
            {
              question: "How can you contribute to a safer internet for everyone?",
              options: ["By keeping safety tips secret", "By reporting harmful content and supporting others", "By ignoring problems you see", "By only caring about your own safety"],
              correctAnswer: "By reporting harmful content and supporting others",
              explanation: "Everyone can help create a safer internet by reporting problems and supporting fellow users."
            },
            {
              question: "What does it mean to be digitally inclusive?",
              options: ["Only including people with new devices", "Welcoming and supporting all people online regardless of their background", "Excluding people who disagree with you", "Only communicating with people like yourself"],
              correctAnswer: "Welcoming and supporting all people online regardless of their background",
              explanation: "Digital inclusion means creating online spaces where everyone feels welcome and valued."
            }
          ],
          'online-safety': [
            {
              question: "What should you do if someone online asks for your personal information?",
              options: ["Give them some information", "Ask your parents first", "Never share personal information", "Only share your first name"],
              correctAnswer: "Never share personal information",
              explanation: "Personal information should never be shared with strangers online for safety reasons."
            },
            {
              question: "Which is a sign of a potentially unsafe website?",
              options: ["It has colorful graphics", "It asks for personal information immediately", "It loads quickly", "It has a search function"],
              correctAnswer: "It asks for personal information immediately",
              explanation: "Legitimate websites don't typically ask for personal information right away."
            },
            {
              question: "What information should you never share online?",
              options: ["Your favorite color", "Your full name and address", "Your favorite movie", "Your pet's name"],
              correctAnswer: "Your full name and address",
              explanation: "Personal information like your full name and address should be kept private to protect your safety."
            },
            {
              question: "What makes a password strong?",
              options: ["Using your birthday", "Using a mix of letters, numbers, and symbols", "Using your pet's name", "Using the word 'password'"],
              correctAnswer: "Using a mix of letters, numbers, and symbols",
              explanation: "Strong passwords combine different types of characters and are hard to guess."
            },
            {
              question: "What should you do if a stranger contacts you online?",
              options: ["Give them your phone number", "Meet them in person", "Tell a trusted adult", "Share your location"],
              correctAnswer: "Tell a trusted adult",
              explanation: "Always inform a trusted adult when strangers try to contact you online."
            },
            {
              question: "What is phishing?",
              options: ["A type of online game", "Attempts to steal personal information through fake messages", "A way to catch fish online", "A social media feature"],
              correctAnswer: "Attempts to steal personal information through fake messages",
              explanation: "Phishing involves tricking people into sharing personal information through fake emails or websites."
            },
            {
              question: "How can you tell if a website is secure?",
              options: ["It has colorful graphics", "It starts with 'https://' and has a lock icon", "It loads quickly", "It has many advertisements"],
              correctAnswer: "It starts with 'https://' and has a lock icon",
              explanation: "Secure websites use HTTPS encryption and display a lock icon in the browser."
            },
            {
              question: "What should you do if you receive a suspicious email?",
              options: ["Click all the links to investigate", "Forward it to all your friends", "Delete it and report it if necessary", "Reply with your personal information"],
              correctAnswer: "Delete it and report it if necessary",
              explanation: "Suspicious emails should be deleted without clicking links, and reported to help protect others."
            },
            {
              question: "Why shouldn't you use public Wi-Fi for sensitive activities?",
              options: ["It's too slow", "It's not secure and others might see your data", "It costs too much money", "It doesn't work properly"],
              correctAnswer: "It's not secure and others might see your data",
              explanation: "Public Wi-Fi networks are often unsecured, making it easy for others to intercept your data."
            },
            {
              question: "What is two-factor authentication?",
              options: ["Using two passwords", "An extra security step that requires a second form of verification", "Having two user accounts", "Using two different browsers"],
              correctAnswer: "An extra security step that requires a second form of verification",
              explanation: "Two-factor authentication adds an extra layer of security by requiring a second verification method."
            },
            {
              question: "What should you do if your account gets hacked?",
              options: ["Ignore it and hope it goes away", "Change your password immediately and notify the service", "Create a new account with the same password", "Share the news on social media"],
              correctAnswer: "Change your password immediately and notify the service",
              explanation: "Quick action is essential when an account is compromised - change passwords and alert the service provider."
            },
            {
              question: "What is malware?",
              options: ["Good software that helps your computer", "Malicious software designed to harm your device", "A type of email", "A social media platform"],
              correctAnswer: "Malicious software designed to harm your device",
              explanation: "Malware is harmful software that can damage your device, steal data, or cause other problems."
            },
            {
              question: "How can you protect yourself from online scams?",
              options: ["Believe everything you read online", "Be skeptical of offers that seem too good to be true", "Share your credit card information freely", "Click on all pop-up advertisements"],
              correctAnswer: "Be skeptical of offers that seem too good to be true",
              explanation: "Healthy skepticism helps protect you from scams that promise unrealistic benefits."
            },
            {
              question: "What should you do before downloading an app?",
              options: ["Download it immediately", "Check reviews and verify it's from a trusted source", "Give it all permissions it asks for", "Share it with friends first"],
              correctAnswer: "Check reviews and verify it's from a trusted source",
              explanation: "Always research apps and download from official app stores to avoid malicious software."
            },
            {
              question: "Why is it important to keep your software updated?",
              options: ["To make it look newer", "Updates often include important security fixes", "To use more storage space", "To make it run slower"],
              correctAnswer: "Updates often include important security fixes",
              explanation: "Software updates frequently contain security patches that protect against new threats."
            },
            {
              question: "What should you do if you accidentally visit a suspicious website?",
              options: ["Explore it thoroughly", "Leave immediately and clear your browser data", "Download everything you see", "Share the link with others"],
              correctAnswer: "Leave immediately and clear your browser data",
              explanation: "Exit suspicious sites quickly and clear browser data to remove any potential threats."
            },
            {
              question: "Why shouldn't you save passwords in public computers?",
              options: ["It makes the computer slower", "Other users could access your accounts", "It uses too much memory", "It's against the law"],
              correctAnswer: "Other users could access your accounts",
              explanation: "Saved passwords on public computers can be accessed by other users, compromising your accounts."
            },
            {
              question: "What is the safest way to shop online?",
              options: ["Use any website with products you want", "Only use secure, reputable websites and check for HTTPS", "Share your credit card with anyone who asks", "Always use public Wi-Fi for purchases"],
              correctAnswer: "Only use secure, reputable websites and check for HTTPS",
              explanation: "Safe online shopping requires using trusted websites with proper security measures in place."
            },
            {
              question: "How should you handle suspicious pop-up messages?",
              options: ["Click on them to see what happens", "Close them immediately without clicking", "Share them with friends", "Download what they recommend"],
              correctAnswer: "Close them immediately without clicking",
              explanation: "Suspicious pop-ups often contain malware or scams, so close them without interacting."
            },
            {
              question: "What makes an online friend request suspicious?",
              options: ["They have a profile picture", "They have no mutual friends and very little profile information", "They like the same things you do", "They live in your city"],
              correctAnswer: "They have no mutual friends and very little profile information",
              explanation: "Suspicious profiles often lack genuine connections and detailed, authentic information."
            }
          ],
          'information-literacy': [
            {
              question: "What is the best way to verify if information online is reliable?",
              options: ["Check if it has many likes", "Look for credible sources and cross-reference", "See if it's on social media", "Check if it's colorful and well-designed"],
              correctAnswer: "Look for credible sources and cross-reference",
              explanation: "Reliable information comes from credible sources and can be verified through multiple references."
            },
            {
              question: "Which source is most likely to contain accurate information?",
              options: ["A random blog post", "A peer-reviewed academic article", "A social media post", "An anonymous forum comment"],
              correctAnswer: "A peer-reviewed academic article",
              explanation: "Peer-reviewed articles undergo rigorous fact-checking and review processes."
            },
            {
              question: "What does it mean to evaluate a source's credibility?",
              options: ["Checking how popular it is", "Assessing the author's expertise and the source's reliability", "Counting the number of words", "Looking at the website design"],
              correctAnswer: "Assessing the author's expertise and the source's reliability",
              explanation: "Credibility evaluation involves examining the author's qualifications and the source's trustworthiness."
            },
            {
              question: "What is a primary source?",
              options: ["The most important source", "A source that provides firsthand evidence or direct testimony", "The first source you find", "A source with the most information"],
              correctAnswer: "A source that provides firsthand evidence or direct testimony",
              explanation: "Primary sources offer original, firsthand evidence about an event, person, or topic."
            },
            {
              question: "How can you tell if a website is biased?",
              options: ["It has a professional design", "It presents only one perspective without acknowledging others", "It has many advertisements", "It loads quickly"],
              correctAnswer: "It presents only one perspective without acknowledging others",
              explanation: "Biased sources typically present information from only one viewpoint without considering alternatives."
            },
            {
              question: "What should you do when you find conflicting information from different sources?",
              options: ["Choose the most recent one", "Research further and look for additional reliable sources", "Pick the one you like best", "Ignore all of them"],
              correctAnswer: "Research further and look for additional reliable sources",
              explanation: "When sources conflict, additional research helps determine which information is most accurate."
            },
            {
              question: "What is the difference between fact and opinion?",
              options: ["Facts are longer than opinions", "Facts can be verified while opinions are personal beliefs", "Opinions are always wrong", "There is no difference"],
              correctAnswer: "Facts can be verified while opinions are personal beliefs",
              explanation: "Facts are objective and verifiable, while opinions are subjective personal viewpoints."
            },
            {
              question: "Why is it important to check the publication date of online information?",
              options: ["Newer information is always better", "Information can become outdated or superseded by new findings", "Old information is always wrong", "It doesn't matter when it was published"],
              correctAnswer: "Information can become outdated or superseded by new findings",
              explanation: "Publication dates help determine if information is current and relevant to your needs."
            },
            {
              question: "What is lateral reading?",
              options: ["Reading from left to right", "Reading multiple sources to verify information", "Reading while lying down", "Reading only headlines"],
              correctAnswer: "Reading multiple sources to verify information",
              explanation: "Lateral reading involves checking multiple sources to verify and contextualize information."
            },
            {
              question: "How can you identify fake news?",
              options: ["It's always on social media", "Check for sensational headlines, lack of sources, and verify with reliable news outlets", "It has pictures", "It's written in a certain font"],
              correctAnswer: "Check for sensational headlines, lack of sources, and verify with reliable news outlets",
              explanation: "Fake news often has sensational headlines, lacks credible sources, and can't be verified by reliable outlets."
            },
            {
              question: "What is confirmation bias?",
              options: ["Confirming your password", "The tendency to search for information that confirms your existing beliefs", "A type of computer virus", "A way to organize information"],
              correctAnswer: "The tendency to search for information that confirms your existing beliefs",
              explanation: "Confirmation bias leads people to favor information that supports their preexisting opinions."
            },
            {
              question: "Why should you diversify your information sources?",
              options: ["To waste more time", "To get a more complete and balanced understanding", "To confuse yourself", "To impress others"],
              correctAnswer: "To get a more complete and balanced understanding",
              explanation: "Diverse sources provide different perspectives and help create a more comprehensive understanding."
            },
            {
              question: "What is information overload?",
              options: ["Having too much storage space", "Being overwhelmed by too much information to process effectively", "A computer error", "A type of learning disability"],
              correctAnswer: "Being overwhelmed by too much information to process effectively",
              explanation: "Information overload occurs when the amount of information exceeds our ability to process it effectively."
            },
            {
              question: "How can you organize information effectively for research?",
              options: ["Keep everything in one big file", "Use categories, tags, and systematic organization methods", "Print everything out", "Memorize all the information"],
              correctAnswer: "Use categories, tags, and systematic organization methods",
              explanation: "Systematic organization helps you find and use information more efficiently during research."
            },
            {
              question: "What is the purpose of citing sources?",
              options: ["To make your work look longer", "To give credit to original authors and allow others to verify information", "To show off how much you've read", "To fill up space"],
              correctAnswer: "To give credit to original authors and allow others to verify information",
              explanation: "Citations give proper credit and enable readers to verify and explore your sources."
            },
            {
              question: "How can you evaluate the authority of an author?",
              options: ["Check their social media followers", "Look at their credentials, expertise, and reputation in the field", "See how many books they've written", "Check their age"],
              correctAnswer: "Look at their credentials, expertise, and reputation in the field",
              explanation: "Author authority is determined by their qualifications, experience, and recognition in their field."
            },
            {
              question: "What is the difference between correlation and causation?",
              options: ["They mean the same thing", "Correlation shows relationship, causation shows one thing causes another", "Causation is stronger than correlation", "Correlation is always false"],
              correctAnswer: "Correlation shows relationship, causation shows one thing causes another",
              explanation: "Correlation indicates a relationship between variables, while causation means one directly causes the other."
            },
            {
              question: "Why is it important to understand the context of information?",
              options: ["Context doesn't matter", "Context helps you understand the full meaning and significance", "Context makes information longer", "Context is only for experts"],
              correctAnswer: "Context helps you understand the full meaning and significance",
              explanation: "Context provides the background and circumstances that give information its full meaning."
            },
            {
              question: "What should you do if you can't find reliable sources for a topic?",
              options: ["Make up the information", "Consult librarians, experts, or expand your search strategies", "Give up on the topic", "Use unreliable sources anyway"],
              correctAnswer: "Consult librarians, experts, or expand your search strategies",
              explanation: "When struggling to find sources, seek help from information professionals and try different search approaches."
            },
            {
              question: "How can you stay updated with reliable information in your areas of interest?",
              options: ["Only check information once", "Follow reputable sources, set up alerts, and regularly review trusted publications", "Rely on social media only", "Ask friends for updates"],
              correctAnswer: "Follow reputable sources, set up alerts, and regularly review trusted publications",
              explanation: "Staying informed requires actively following credible sources and using systematic approaches to track new information."
            }
          ],
          'digital-communication': [
            {
              question: "What makes digital communication effective?",
              options: ["Using lots of emojis", "Being clear and respectful", "Writing in all caps", "Using complex vocabulary"],
              correctAnswer: "Being clear and respectful",
              explanation: "Effective digital communication requires clarity, respect, and appropriate tone."
            },
            {
              question: "When is it appropriate to use informal language in digital communication?",
              options: ["In professional emails", "When talking to teachers", "With friends in casual settings", "In all situations"],
              correctAnswer: "With friends in casual settings",
              explanation: "Informal language is appropriate in casual contexts but should be avoided in formal communications."
            },
            {
              question: "What should you do before sending an important email?",
              options: ["Send it immediately", "Proofread it for clarity and tone", "Add as many recipients as possible", "Use all capital letters for emphasis"],
              correctAnswer: "Proofread it for clarity and tone",
              explanation: "Proofreading helps ensure your message is clear, professional, and conveys the right tone."
            },
            {
              question: "How can you show respect in digital communication?",
              options: ["Use proper grammar and polite language", "Write in all caps", "Ignore others' messages", "Use lots of abbreviations"],
              correctAnswer: "Use proper grammar and polite language",
              explanation: "Respectful digital communication includes proper grammar, polite language, and considerate tone."
            },
            {
              question: "What is the purpose of using subject lines in emails?",
              options: ["To make emails longer", "To clearly indicate what the email is about", "To show off your creativity", "They serve no purpose"],
              correctAnswer: "To clearly indicate what the email is about",
              explanation: "Subject lines help recipients understand the email's purpose and prioritize their responses."
            },
            {
              question: "When should you use 'Reply All' in email?",
              options: ["Always", "Only when everyone needs to see your response", "Never", "When you want to show off"],
              correctAnswer: "Only when everyone needs to see your response",
              explanation: "Reply All should only be used when your response is relevant to all recipients."
            },
            {
              question: "What is active listening in digital communication?",
              options: ["Listening to music while typing", "Carefully reading and thoughtfully responding to messages", "Responding as quickly as possible", "Ignoring parts of messages"],
              correctAnswer: "Carefully reading and thoughtfully responding to messages",
              explanation: "Active listening in digital contexts means fully understanding messages before responding thoughtfully."
            },
            {
              question: "How can you avoid misunderstandings in text-based communication?",
              options: ["Use more abbreviations", "Be clear, specific, and ask for clarification when needed", "Assume others understand you", "Use complex language"],
              correctAnswer: "Be clear, specific, and ask for clarification when needed",
              explanation: "Clear, specific communication and willingness to clarify help prevent misunderstandings."
            },
            {
              question: "What is the appropriate response time for different types of digital messages?",
              options: ["All messages need immediate responses", "Response time varies based on urgency and communication type", "Never respond to any messages", "Wait exactly 24 hours for all messages"],
              correctAnswer: "Response time varies based on urgency and communication type",
              explanation: "Different communication types have different expectations for response times based on urgency and context."
            },
            {
              question: "How should you handle disagreements in digital communication?",
              options: ["Use aggressive language", "Stay calm, be respectful, and focus on the issue not the person", "Ignore the other person", "Involve as many people as possible"],
              correctAnswer: "Stay calm, be respectful, and focus on the issue not the person",
              explanation: "Constructive disagreement focuses on issues while maintaining respect for the other person."
            },
            {
              question: "What is the difference between synchronous and asynchronous communication?",
              options: ["There is no difference", "Synchronous happens in real-time, asynchronous has delays", "Synchronous is always better", "Asynchronous is only for emails"],
              correctAnswer: "Synchronous happens in real-time, asynchronous has delays",
              explanation: "Synchronous communication occurs in real-time (like video calls), while asynchronous allows for delays (like email)."
            },
            {
              question: "How can you make your digital messages more inclusive?",
              options: ["Use technical jargon", "Use clear language and consider diverse perspectives", "Write only for people like yourself", "Assume everyone has the same background"],
              correctAnswer: "Use clear language and consider diverse perspectives",
              explanation: "Inclusive communication uses accessible language and considers the diverse backgrounds of your audience."
            },
            {
              question: "What should you consider when choosing a communication platform?",
              options: ["Only the cost", "The audience, purpose, and features needed", "What your friends use", "The newest platform available"],
              correctAnswer: "The audience, purpose, and features needed",
              explanation: "Platform choice should be based on your audience's preferences, communication purpose, and required features."
            },
            {
              question: "How can you give constructive feedback in digital communication?",
              options: ["Be as critical as possible", "Focus on specific behaviors and offer suggestions for improvement", "Only point out problems", "Give feedback publicly"],
              correctAnswer: "Focus on specific behaviors and offer suggestions for improvement",
              explanation: "Constructive feedback is specific, actionable, and aimed at helping the person improve."
            },
            {
              question: "What is digital body language?",
              options: ["Physical gestures on video calls", "The tone and style conveyed through digital text and formatting", "Dancing while typing", "Using emojis only"],
              correctAnswer: "The tone and style conveyed through digital text and formatting",
              explanation: "Digital body language refers to how tone, style, and formatting choices convey meaning in text-based communication."
            },
            {
              question: "How should you handle sensitive topics in digital communication?",
              options: ["Avoid them completely", "Approach with extra care, empathy, and consider face-to-face alternatives", "Be more direct than usual", "Use humor to lighten the mood"],
              correctAnswer: "Approach with extra care, empathy, and consider face-to-face alternatives",
              explanation: "Sensitive topics require careful consideration, empathy, and sometimes benefit from in-person discussion."
            },
            {
              question: "What is the importance of context in digital communication?",
              options: ["Context doesn't matter online", "Context helps others understand your message correctly", "Context makes messages too long", "Context is only for formal communication"],
              correctAnswer: "Context helps others understand your message correctly",
              explanation: "Providing context helps ensure your message is understood as intended and reduces confusion."
            },
            {
              question: "How can you maintain professionalism in digital communication?",
              options: ["Use casual language always", "Use appropriate tone, proper grammar, and respectful language", "Never use any informal elements", "Copy others' communication styles"],
              correctAnswer: "Use appropriate tone, proper grammar, and respectful language",
              explanation: "Professional digital communication requires appropriate tone, correct grammar, and respectful language."
            },
            {
              question: "What should you do if you realize you sent a message with an error?",
              options: ["Ignore it and hope nobody notices", "Send a correction or clarification promptly", "Delete your account", "Blame autocorrect"],
              correctAnswer: "Send a correction or clarification promptly",
              explanation: "Promptly correcting errors shows responsibility and helps prevent misunderstandings."
            },
            {
              question: "How can you build positive relationships through digital communication?",
              options: ["Only communicate when you need something", "Be consistent, reliable, and show genuine interest in others", "Send as many messages as possible", "Only use formal language"],
              correctAnswer: "Be consistent, reliable, and show genuine interest in others",
              explanation: "Positive digital relationships are built through consistent, reliable communication and genuine interest in others."
            }
          ],
          'digital-tools': [
            {
              question: "What should you consider when choosing a digital tool for a project?",
              options: ["How popular it is", "Its features and suitability for the task", "How expensive it is", "How new it is"],
              correctAnswer: "Its features and suitability for the task",
              explanation: "The best digital tool is one that matches your specific needs and project requirements."
            },
            {
              question: "Why is it important to learn multiple digital tools?",
              options: ["To impress others", "To have flexibility and choose the best tool for each task", "To use the most expensive software", "To avoid learning new things"],
              correctAnswer: "To have flexibility and choose the best tool for each task",
              explanation: "Knowing multiple tools gives you options and helps you choose the most appropriate one for each situation."
            },
            {
              question: "What is the purpose of productivity software like Microsoft Office or Google Workspace?",
              options: ["Entertainment only", "Creating and editing documents, presentations, and spreadsheets", "Playing games", "Social networking"],
              correctAnswer: "Creating and editing documents, presentations, and spreadsheets",
              explanation: "Productivity software helps users create, edit, and manage various types of documents and data."
            },
            {
              question: "How can cloud-based tools benefit students and workers?",
              options: ["They're always free", "They allow access from anywhere and enable collaboration", "They work without internet", "They're only for experts"],
              correctAnswer: "They allow access from anywhere and enable collaboration",
              explanation: "Cloud-based tools provide accessibility and collaboration features that enhance productivity."
            },
            {
              question: "What should you do before using a new digital tool?",
              options: ["Start using it immediately", "Read instructions or watch tutorials to understand its features", "Ask others to do it for you", "Avoid it completely"],
              correctAnswer: "Read instructions or watch tutorials to understand its features",
              explanation: "Learning how to use a tool properly helps you use it effectively and avoid mistakes."
            },
            {
              question: "What is version control in digital tools?",
              options: ["Controlling who can see your work", "Tracking changes and managing different versions of files", "Controlling the tool's speed", "Managing user accounts"],
              correctAnswer: "Tracking changes and managing different versions of files",
              explanation: "Version control helps track changes over time and manage different versions of documents or projects."
            },
            {
              question: "How can automation features in digital tools help users?",
              options: ["They make tools more expensive", "They save time by performing repetitive tasks automatically", "They make tools harder to use", "They're only for programmers"],
              correctAnswer: "They save time by performing repetitive tasks automatically",
              explanation: "Automation features help users work more efficiently by handling routine tasks automatically."
            },
            {
              question: "What is the difference between free and paid digital tools?",
              options: ["No difference at all", "Paid tools often offer more features, support, and capabilities", "Free tools are always better", "Paid tools are always worse"],
              correctAnswer: "Paid tools often offer more features, support, and capabilities",
              explanation: "While free tools can be excellent, paid versions typically offer additional features and professional support."
            },
            {
              question: "How should you organize your digital files and folders?",
              options: ["Put everything in one folder", "Use clear, logical naming and folder structures", "Use random names", "Don't organize them at all"],
              correctAnswer: "Use clear, logical naming and folder structures",
              explanation: "Good organization makes it easier to find and manage your files efficiently."
            },
            {
              question: "What is the importance of regular software updates?",
              options: ["They're unnecessary", "They provide security fixes, new features, and bug improvements", "They make software worse", "They're only for appearance"],
              correctAnswer: "They provide security fixes, new features, and bug improvements",
              explanation: "Regular updates ensure your software remains secure, functional, and up-to-date with new features."
            },
            {
              question: "How can keyboard shortcuts improve your efficiency with digital tools?",
              options: ["They don't help at all", "They allow faster execution of common tasks", "They make tools more complicated", "They're only for experts"],
              correctAnswer: "They allow faster execution of common tasks",
              explanation: "Keyboard shortcuts can significantly speed up your workflow by providing quick access to frequently used functions."
            },
            {
              question: "What should you consider when collaborating on digital projects?",
              options: ["Work alone always", "Communication, file sharing permissions, and version control", "Use different tools for each person", "Avoid sharing any files"],
              correctAnswer: "Communication, file sharing permissions, and version control",
              explanation: "Successful digital collaboration requires clear communication, proper permissions, and good version management."
            },
            {
              question: "How can you troubleshoot problems with digital tools?",
              options: ["Give up immediately", "Check help documentation, restart the tool, or search for solutions online", "Buy a new computer", "Blame the tool"],
              correctAnswer: "Check help documentation, restart the tool, or search for solutions online",
              explanation: "Systematic troubleshooting using available resources often resolves most digital tool issues."
            },
            {
              question: "What is the purpose of templates in digital tools?",
              options: ["To make work harder", "To provide pre-designed formats that save time and ensure consistency", "To limit creativity", "They serve no purpose"],
              correctAnswer: "To provide pre-designed formats that save time and ensure consistency",
              explanation: "Templates provide starting points that save time and help maintain consistent formatting and structure."
            },
            {
              question: "How can you ensure your work is saved and backed up when using digital tools?",
              options: ["Never save anything", "Use auto-save features and regular backups to cloud or external storage", "Save only once at the end", "Rely on memory only"],
              correctAnswer: "Use auto-save features and regular backups to cloud or external storage",
              explanation: "Regular saving and backing up protects your work from being lost due to technical problems."
            },
            {
              question: "What factors should influence your choice of digital tools for different tasks?",
              options: ["Only the price", "Task requirements, user skill level, compatibility, and available features", "What others are using", "The newest available option"],
              correctAnswer: "Task requirements, user skill level, compatibility, and available features",
              explanation: "Tool selection should be based on matching the tool's capabilities to your specific needs and context."
            },
            {
              question: "How can you learn to use new digital tools effectively?",
              options: ["Trial and error only", "Combine tutorials, practice, and exploring features systematically", "Avoid new tools", "Copy what others do exactly"],
              correctAnswer: "Combine tutorials, practice, and exploring features systematically",
              explanation: "Effective learning combines structured learning resources with hands-on practice and exploration."
            },
            {
              question: "What is the importance of data export and import features in digital tools?",
              options: ["They're not important", "They allow you to move data between tools and avoid vendor lock-in", "They make tools more expensive", "They're only for businesses"],
              correctAnswer: "They allow you to move data between tools and avoid vendor lock-in",
              explanation: "Export/import features provide flexibility and ensure you can access your data even if you change tools."
            },
            {
              question: "How should you approach learning advanced features of digital tools?",
              options: ["Learn everything at once", "Start with basics and gradually explore advanced features as needed", "Ignore advanced features completely", "Only use the most complex features"],
              correctAnswer: "Start with basics and gradually explore advanced features as needed",
              explanation: "Progressive learning from basic to advanced features helps build competence without overwhelming yourself."
            },
            {
              question: "What role do digital tools play in modern education and work?",
              options: ["They're just distractions", "They enhance productivity, collaboration, and access to information", "They replace all human skills", "They're only for entertainment"],
              correctAnswer: "They enhance productivity, collaboration, and access to information",
              explanation: "Digital tools serve as powerful aids that enhance human capabilities in learning and working environments."
            }
          ],
          'media-literacy': [
            {
              question: "What is media bias?",
              options: ["When media is expensive", "When information is presented from a particular perspective", "When media is digital", "When media is educational"],
              correctAnswer: "When information is presented from a particular perspective",
              explanation: "Media bias occurs when information is presented in a way that favors a particular viewpoint."
            },
            {
              question: "How can you identify fake news?",
              options: ["Check the publication date", "Verify sources and look for evidence", "Count the number of shares", "Look at the website design"],
              correctAnswer: "Verify sources and look for evidence",
              explanation: "Identifying fake news requires checking sources, looking for evidence, and cross-referencing information."
            },
            {
              question: "What should you do before sharing news or information online?",
              options: ["Share it immediately", "Verify its accuracy and check the source", "Add your own opinion", "Share it only with friends"],
              correctAnswer: "Verify its accuracy and check the source",
              explanation: "Responsible sharing requires verifying information accuracy and credibility before spreading it."
            },
            {
              question: "What is the difference between fact and opinion in media?",
              options: ["There is no difference", "Facts can be verified, opinions are personal beliefs or judgments", "Opinions are always wrong", "Facts are always biased"],
              correctAnswer: "Facts can be verified, opinions are personal beliefs or judgments",
              explanation: "Understanding the distinction between verifiable facts and subjective opinions is crucial for media literacy."
            },
            {
              question: "How can you evaluate the credibility of a news source?",
              options: ["Check how popular it is", "Look at author credentials, publication reputation, and source citations", "Count the advertisements", "Check the website colors"],
              correctAnswer: "Look at author credentials, publication reputation, and source citations",
              explanation: "Credible sources have qualified authors, good reputations, and cite their information sources."
            },
            {
              question: "What is clickbait and why should you be cautious of it?",
              options: ["Helpful headlines", "Sensational headlines designed to get clicks, often misleading", "Educational content", "News summaries"],
              correctAnswer: "Sensational headlines designed to get clicks, often misleading",
              explanation: "Clickbait uses sensational headlines to attract clicks but may not deliver accurate or valuable content."
            },
            {
              question: "How can you identify manipulated or edited images and videos?",
              options: ["You can't", "Look for inconsistencies, use reverse image search, check multiple sources", "Trust all images", "Only worry about obvious edits"],
              correctAnswer: "Look for inconsistencies, use reverse image search, check multiple sources",
              explanation: "Detecting manipulated media requires careful observation and verification techniques."
            },
            {
              question: "What is the purpose of media literacy education?",
              options: ["To avoid all media", "To develop critical thinking skills for analyzing and evaluating media messages", "To become a journalist", "To create more media"],
              correctAnswer: "To develop critical thinking skills for analyzing and evaluating media messages",
              explanation: "Media literacy helps people critically analyze and evaluate the media they consume."
            },
            {
              question: "How do algorithms affect what content you see on social media?",
              options: ["They show everything equally", "They personalize content based on your behavior and preferences", "They only show advertisements", "They have no effect"],
              correctAnswer: "They personalize content based on your behavior and preferences",
              explanation: "Social media algorithms create personalized feeds based on user behavior, which can create filter bubbles."
            },
            {
              question: "What is a filter bubble or echo chamber?",
              options: ["A type of water filter", "When you only see information that confirms your existing beliefs", "A photography technique", "A sound effect"],
              correctAnswer: "When you only see information that confirms your existing beliefs",
              explanation: "Filter bubbles limit exposure to diverse viewpoints by showing only information that aligns with existing beliefs."
            },
            {
              question: "How can you diversify your media consumption?",
              options: ["Stick to one trusted source", "Read from multiple sources with different perspectives", "Only read headlines", "Avoid news completely"],
              correctAnswer: "Read from multiple sources with different perspectives",
              explanation: "Consuming diverse media sources helps you get a more complete and balanced understanding of issues."
            },
            {
              question: "What questions should you ask when evaluating media content?",
              options: ["Is it entertaining?", "Who created this, why, and what evidence supports it?", "Is it popular?", "Is it recent?"],
              correctAnswer: "Who created this, why, and what evidence supports it?",
              explanation: "Critical evaluation involves questioning the source, purpose, and evidence behind media content."
            },
            {
              question: "How can you fact-check information you encounter online?",
              options: ["Trust the first source", "Use fact-checking websites and cross-reference multiple reliable sources", "Ask friends on social media", "Check if it has many likes"],
              correctAnswer: "Use fact-checking websites and cross-reference multiple reliable sources",
              explanation: "Effective fact-checking involves using dedicated fact-checking resources and verifying across multiple credible sources."
            },
            {
              question: "What is the difference between news reporting and opinion pieces?",
              options: ["No difference", "News reports facts objectively, opinion pieces express viewpoints and analysis", "Opinion pieces are always wrong", "News is always biased"],
              correctAnswer: "News reports facts objectively, opinion pieces express viewpoints and analysis",
              explanation: "Understanding the distinction helps readers know when they're reading factual reporting versus subjective analysis."
            },
            {
              question: "How can advertising influence media content?",
              options: ["It doesn't", "Advertisers may influence content to align with their interests", "It only affects entertainment", "It makes content more accurate"],
              correctAnswer: "Advertisers may influence content to align with their interests",
              explanation: "Advertising revenue can create conflicts of interest that may influence how media outlets cover certain topics."
            },
            {
              question: "What is native advertising?",
              options: ["Advertising for native people", "Advertising that looks like regular content but is actually promotional", "Advertising in native languages", "Traditional banner ads"],
              correctAnswer: "Advertising that looks like regular content but is actually promotional",
              explanation: "Native advertising is designed to blend in with regular content, making it less obvious that it's advertising."
            },
            {
              question: "How can you protect yourself from misinformation?",
              options: ["Believe everything you read", "Develop critical thinking skills and verify information before accepting it", "Avoid all media", "Only trust social media"],
              correctAnswer: "Develop critical thinking skills and verify information before accepting it",
              explanation: "Protection from misinformation requires active critical thinking and verification habits."
            },
            {
              question: "What role does emotional appeal play in media messages?",
              options: ["No role at all", "It can influence how people respond to information, sometimes bypassing critical thinking", "It only makes content boring", "It's always negative"],
              correctAnswer: "It can influence how people respond to information, sometimes bypassing critical thinking",
              explanation: "Emotional appeals can be powerful persuasion tools that may influence judgment beyond logical reasoning."
            },
            {
              question: "How can you be a responsible media consumer and sharer?",
              options: ["Share everything you find interesting", "Verify information before sharing and consider the impact of your sharing", "Never share anything", "Only share popular content"],
              correctAnswer: "Verify information before sharing and consider the impact of your sharing",
              explanation: "Responsible media consumption involves verification, critical thinking, and consideration of the consequences of sharing."
            },
            {
              question: "What is the importance of media literacy in a democratic society?",
              options: ["It's not important", "It helps citizens make informed decisions and participate effectively in democracy", "It's only for politicians", "It prevents people from voting"],
              correctAnswer: "It helps citizens make informed decisions and participate effectively in democracy",
              explanation: "Media literacy is essential for informed citizenship and effective democratic participation."
            }
          ]
        };
        
        return banks[subtopic] || banks['digital-citizenship'];
      }
      
      getTrueFalseBank(subtopic, grade) {
        const banks = {
          'digital-citizenship': [
            {
              statement: "It's okay to use someone else's work without giving them credit.",
              isTrue: false,
              explanation: "Using someone else's work without permission or credit is plagiarism and violates digital ethics."
            },
            {
              statement: "Digital citizenship only applies when using social media.",
              isTrue: false,
              explanation: "Digital citizenship applies to all online activities, not just social media."
            },
            {
              statement: "Being respectful online is as important as being respectful in person.",
              isTrue: true,
              explanation: "The same principles of respect and kindness apply both online and offline."
            }
          ],
          'online-safety': [
            {
              statement: "It's safe to meet someone in person that you only know from online.",
              isTrue: false,
              explanation: "Meeting online strangers in person can be dangerous and should be avoided."
            },
            {
              statement: "You should always tell a trusted adult about uncomfortable online interactions.",
              isTrue: true,
              explanation: "Trusted adults can help protect you from online dangers and provide guidance."
            }
          ],
          'information-literacy': [
            {
              statement: "All information found on the internet is accurate and reliable.",
              isTrue: false,
              explanation: "Not all online information is accurate; it's important to verify sources and check credibility."
            },
            {
              statement: "Wikipedia can be a good starting point for research, but should be verified with other sources.",
              isTrue: true,
              explanation: "Wikipedia provides a good overview but should always be cross-referenced with authoritative sources."
            }
          ],
          'digital-communication': [
            {
              statement: "It's appropriate to use the same communication style in all digital contexts.",
              isTrue: false,
              explanation: "Different digital contexts require different communication styles - formal vs. informal."
            },
            {
              statement: "Digital communication can sometimes be misunderstood because it lacks tone of voice.",
              isTrue: true,
              explanation: "Without vocal cues, digital messages can be misinterpreted, so clarity is important."
            }
          ],
          'digital-tools': [
            {
              statement: "The most expensive digital tool is always the best choice.",
              isTrue: false,
              explanation: "The best tool depends on your needs and requirements, not necessarily the price."
            },
            {
              statement: "Learning to use different digital tools can improve your productivity.",
              isTrue: true,
              explanation: "Different tools have different strengths, and knowing multiple options increases efficiency."
            }
          ],
          'media-literacy': [
            {
              statement: "All news sources present information in exactly the same way.",
              isTrue: false,
              explanation: "Different news sources may have different perspectives and biases in their reporting."
            },
            {
              statement: "It's important to read multiple sources when researching a topic.",
              isTrue: true,
              explanation: "Multiple sources provide a more complete and balanced understanding of a topic."
            }
          ]
        };
        
        return banks[subtopic] || banks['digital-citizenship'];
      }
      
      getFillBlankBank(subtopic, grade) {
        const banks = {
          'digital-citizenship': [
            {
              question: "A digital _____ is someone who uses technology responsibly and ethically.",
              blanks: 1,
              answers: ["citizen"],
              alternatives: [["citizen", "citizenship"]],
              explanation: "A digital citizen is someone who engages with technology in a responsible and ethical manner."
            },
            {
              question: "The _____ rule applies both online and offline: treat others as you want to be treated.",
              blanks: 1,
              answers: ["golden"],
              alternatives: [["golden", "Golden"]],
              explanation: "The golden rule is a fundamental principle that applies to all interactions, including digital ones."
            }
          ],
          'online-safety': [
            {
              question: "Never share your _____ information with strangers online.",
              blanks: 1,
              answers: ["personal"],
              alternatives: [["personal", "private"]],
              explanation: "Personal information should be kept private to protect your safety and identity."
            }
          ],
          'information-literacy': [
            {
              question: "When evaluating online sources, check the _____, credibility, and currency of the information.",
              blanks: 1,
              answers: ["accuracy"],
              alternatives: [["accuracy", "reliability"]],
              explanation: "Evaluating sources requires checking accuracy, credibility, and how current the information is."
            },
            {
              question: "_____ sources are those that have been reviewed by experts in the field.",
              blanks: 1,
              answers: ["Peer-reviewed"],
              alternatives: [["Peer-reviewed", "peer-reviewed", "Academic"]],
              explanation: "Peer-reviewed sources undergo expert review, making them more reliable for research."
            }
          ],
          'digital-communication': [
            {
              question: "In professional emails, always use a clear _____ line and appropriate greeting.",
              blanks: 1,
              answers: ["subject"],
              alternatives: [["subject", "Subject"]],
              explanation: "A clear subject line helps recipients understand the purpose of your email immediately."
            },
            {
              question: "Digital _____ refers to the rules of polite behavior in online communication.",
              blanks: 1,
              answers: ["etiquette"],
              alternatives: [["etiquette", "Etiquette"]],
              explanation: "Digital etiquette encompasses the social norms and courtesies for online interactions."
            }
          ],
          'digital-tools': [
            {
              question: "_____ software allows multiple people to work on the same document simultaneously.",
              blanks: 1,
              answers: ["Collaborative"],
              alternatives: [["Collaborative", "collaborative", "Cooperation"]],
              explanation: "Collaborative software enables real-time teamwork and document sharing."
            }
          ],
          'media-literacy': [
            {
              question: "_____ news refers to false or misleading information presented as legitimate news.",
              blanks: 1,
              answers: ["Fake"],
              alternatives: [["Fake", "fake", "False"]],
              explanation: "Fake news is deliberately false information designed to mislead readers."
            }
          ]
        };
        
        return banks[subtopic] || banks['digital-citizenship'];
      }
      
      getOrderingBank(subtopic, grade) {
        const banks = {
          'digital-citizenship': [
            {
              question: "Arrange the steps to resolve an online conflict respectfully:",
              correctOrder: ["Stay calm and don't respond immediately", "Think about the other person's perspective", "Respond politely and constructively", "Seek help from a trusted adult if needed"],
              explanation: "Resolving online conflicts requires patience, empathy, and sometimes adult guidance."
            }
          ],
          'online-safety': [
            {
              question: "Arrange the steps to take when encountering cyberbullying:",
              correctOrder: ["Don't respond to the bully", "Save evidence of the bullying", "Block the person", "Report to a trusted adult"],
              explanation: "These steps help protect you and provide evidence for authorities to take action."
            }
          ],
          'information-literacy': [
            {
              question: "Arrange the steps for evaluating online information:",
              correctOrder: ["Identify the source and author", "Check the publication date", "Look for supporting evidence", "Cross-reference with other sources"],
              explanation: "Systematic evaluation helps ensure the reliability and accuracy of online information."
            }
          ],
          'digital-communication': [
            {
              question: "Arrange the steps for writing a professional email:",
              correctOrder: ["Write a clear subject line", "Use appropriate greeting", "State your purpose clearly", "Include a polite closing"],
              explanation: "Professional emails follow a structured format to ensure clear and respectful communication."
            }
          ],
          'digital-tools': [
            {
              question: "Arrange the steps for choosing the right digital tool:",
              correctOrder: ["Identify your specific needs", "Research available options", "Compare features and costs", "Test the tool before committing"],
              explanation: "A systematic approach helps you select the most appropriate tool for your requirements."
            }
          ],
          'media-literacy': [
            {
              question: "Arrange the steps for fact-checking news articles:",
              correctOrder: ["Read the entire article carefully", "Check the source's credibility", "Look for corroborating sources", "Verify any statistics or claims"],
              explanation: "Thorough fact-checking helps identify reliable news and avoid misinformation."
            }
          ]
        };
        
        return banks[subtopic] || banks['digital-citizenship'];
      }
      
      getMatchingBank(subtopic, grade) {
        const banks = {
          'digital-citizenship': [
            {
              question: "Match digital citizenship concepts with their definitions:",
              leftColumn: ["Digital Ethics", "Digital Rights", "Digital Responsibility", "Digital Literacy"],
              rightColumn: ["Understanding how to use technology effectively", "Moral principles for technology use", "Freedoms we have in digital spaces", "Obligations we have when using technology"],
              correctPairs: {
                "Digital Ethics": "Moral principles for technology use",
                "Digital Rights": "Freedoms we have in digital spaces",
                "Digital Responsibility": "Obligations we have when using technology",
                "Digital Literacy": "Understanding how to use technology effectively"
              },
              explanation: "Each aspect of digital citizenship has a specific meaning and importance."
            }
          ],
          'online-safety': [
            {
              question: "Match online safety threats with their descriptions:",
              leftColumn: ["Phishing", "Malware", "Identity Theft", "Cyberbullying"],
              rightColumn: ["Harmful software that damages devices", "Stealing personal information to impersonate someone", "Using technology to harass or intimidate others", "Fraudulent attempts to obtain sensitive information"],
              correctPairs: {
                "Phishing": "Fraudulent attempts to obtain sensitive information",
                "Malware": "Harmful software that damages devices",
                "Identity Theft": "Stealing personal information to impersonate someone",
                "Cyberbullying": "Using technology to harass or intimidate others"
              },
              explanation: "Understanding different online threats helps you recognize and avoid them."
            }
          ],
          'information-literacy': [
            {
              question: "Match source types with their reliability levels:",
              leftColumn: ["Peer-reviewed journal", "Personal blog", "Government website", "Social media post"],
              rightColumn: ["Low reliability", "High reliability", "Very low reliability", "High reliability"],
              correctPairs: {
                "Peer-reviewed journal": "High reliability",
                "Personal blog": "Low reliability",
                "Government website": "High reliability",
                "Social media post": "Very low reliability"
              },
              explanation: "Different source types have varying levels of credibility and reliability."
            }
          ],
          'digital-communication': [
            {
              question: "Match communication contexts with appropriate styles:",
              leftColumn: ["Professional email", "Text to friend", "Social media comment", "Academic paper"],
              rightColumn: ["Casual and friendly", "Formal and structured", "Respectful and considerate", "Academic and precise"],
              correctPairs: {
                "Professional email": "Formal and structured",
                "Text to friend": "Casual and friendly",
                "Social media comment": "Respectful and considerate",
                "Academic paper": "Academic and precise"
              },
              explanation: "Different communication contexts require different styles and levels of formality."
            }
          ],
          'digital-tools': [
            {
              question: "Match digital tools with their primary purposes:",
              leftColumn: ["Spreadsheet software", "Video conferencing", "Cloud storage", "Password manager"],
              rightColumn: ["Secure file backup and sharing", "Data analysis and calculations", "Remote meetings and collaboration", "Secure password storage"],
              correctPairs: {
                "Spreadsheet software": "Data analysis and calculations",
                "Video conferencing": "Remote meetings and collaboration",
                "Cloud storage": "Secure file backup and sharing",
                "Password manager": "Secure password storage"
              },
              explanation: "Each digital tool is designed for specific purposes and use cases."
            }
          ],
          'media-literacy': [
            {
              question: "Match media bias types with their characteristics:",
              leftColumn: ["Selection bias", "Confirmation bias", "Sensationalism", "False balance"],
              rightColumn: ["Exaggerating stories for dramatic effect", "Choosing which stories to cover", "Seeking information that confirms existing beliefs", "Presenting opposing views as equally valid"],
              correctPairs: {
                "Selection bias": "Choosing which stories to cover",
                "Confirmation bias": "Seeking information that confirms existing beliefs",
                "Sensationalism": "Exaggerating stories for dramatic effect",
                "False balance": "Presenting opposing views as equally valid"
              },
              explanation: "Understanding different types of bias helps you critically evaluate media content."
            }
          ]
        };
        
        return banks[subtopic] || banks['digital-citizenship'];
      }
      
      getCodeCompletionBank(subtopic, grade) {
        const banks = {
          'digital-citizenship': [
            {
              question: "Complete the digital citizenship pledge:",
              codeSnippet: "I pledge to:\n- Treat others with _____ online\n- Protect my _____ information\n- Give _____ to others' work\n- Report _____ behavior",
              language: "text",
              blanks: ["respect", "personal", "credit", "inappropriate"],
              options: [["respect", "kindness"], ["personal", "private"], ["credit", "attribution"], ["inappropriate", "harmful"]],
              correct: [0, 0, 0, 0],
              explanation: "A digital citizenship pledge outlines our commitments to responsible online behavior."
            }
          ],
          'online-safety': [
            {
              question: "Complete the password security guidelines:",
              codeSnippet: "Password Requirements:\n- Minimum _____ characters\n- Include _____ and numbers\n- Avoid _____ information\n- Use _____ passwords for different accounts",
              language: "text",
              blanks: ["8", "letters", "personal", "unique"],
              options: [["8", "12"], ["letters", "symbols"], ["personal", "common"], ["unique", "different"]],
              correct: [0, 0, 0, 0],
              explanation: "Strong passwords follow specific guidelines to ensure maximum security."
            }
          ],
          'information-literacy': [
            {
              question: "Complete the source evaluation checklist:",
              codeSnippet: "Source Evaluation:\n1. Check the _____ credentials\n2. Verify publication _____\n3. Look for proper _____\n4. Assess potential _____",
              language: "text",
              blanks: ["author", "date", "citations", "bias"],
              options: [["author", "writer"], ["date", "time"], ["citations", "references"], ["bias", "perspective"]],
              correct: [0, 0, 0, 0],
              explanation: "Evaluating sources requires systematic checking of key credibility indicators."
            }
          ],
          'digital-communication': [
            {
              question: "Complete the professional email template:",
              codeSnippet: "Subject: _____\n\nDear _____,\n\n_____ [main message]\n\nThank you for your _____.\n\nSincerely,\n[Your name]",
              language: "text",
              blanks: ["Clear topic", "Mr./Ms. Name", "Brief and polite", "time"],
              options: [["Clear topic", "Specific subject"], ["Mr./Ms. Name", "Proper title"], ["Brief and polite", "Concise message"], ["time", "consideration"]],
              correct: [0, 0, 0, 0],
              explanation: "Professional emails follow a structured format with clear subjects and respectful language."
            }
          ],
          'digital-tools': [
            {
              question: "Complete the software selection criteria:",
              codeSnippet: "Tool Selection Process:\n1. Define your _____\n2. Research available _____\n3. Compare _____ and features\n4. Test _____ and compatibility",
              language: "text",
              blanks: ["needs", "options", "costs", "usability"],
              options: [["needs", "requirements"], ["options", "alternatives"], ["costs", "prices"], ["usability", "functionality"]],
              correct: [0, 0, 0, 0],
              explanation: "Systematic tool selection ensures you choose software that meets your specific requirements."
            }
          ],
          'media-literacy': [
            {
              question: "Complete the fact-checking process:",
              codeSnippet: "Fact-Checking Steps:\n1. Identify _____ sources\n2. Cross-reference with _____ outlets\n3. Check for supporting _____\n4. Consider potential _____",
              language: "text",
              blanks: ["original", "multiple", "evidence", "bias"],
              options: [["original", "primary"], ["multiple", "various"], ["evidence", "proof"], ["bias", "agenda"]],
              correct: [0, 0, 0, 0],
              explanation: "Effective fact-checking involves systematic verification through multiple reliable sources."
            }
          ]
        };
        
        return banks[subtopic] || banks['digital-citizenship'];
      }
      
      getScenarioBank(subtopic, grade) {
        const banks = {
          'digital-citizenship': [
            {
              scenario: "You see someone in your class group chat making fun of another student's appearance.",
              question: "What should you do?",
              options: ["Join in to fit in", "Ignore it and hope it stops", "Defend the student and report to a teacher", "Leave the group chat"],
              correctAnswer: "Defend the student and report to a teacher",
              explanation: "Standing up for others and reporting bullying helps create a safer online environment."
            }
          ],
          'online-safety': [
            {
              scenario: "You receive a friend request from someone claiming to be from your school, but you don't recognize them.",
              question: "What should you do?",
              options: ["Accept the request immediately", "Ask them personal questions first", "Check with friends and don't accept if unsure", "Accept but don't talk to them"],
              correctAnswer: "Check with friends and don't accept if unsure",
              explanation: "It's important to verify the identity of people before connecting with them online."
            }
          ],
          'information-literacy': [
            {
              scenario: "You find an article online that supports your research topic perfectly, but you notice it has no author listed and no publication date.",
              question: "What should you do?",
              options: ["Use it since it supports your argument", "Look for more credible sources with proper attribution", "Use it but mention it might not be reliable", "Ask your teacher if you can use it"],
              correctAnswer: "Look for more credible sources with proper attribution",
              explanation: "Sources without proper attribution lack credibility and should be replaced with more reliable alternatives."
            }
          ],
          'digital-communication': [
            {
              scenario: "You receive an email from your teacher that seems rude and demanding. You feel upset and want to respond immediately.",
              question: "What should you do?",
              options: ["Reply immediately with your feelings", "Wait and re-read the email, then respond professionally", "Ignore the email completely", "Complain to other students about it"],
              correctAnswer: "Wait and re-read the email, then respond professionally",
              explanation: "Taking time to process communication and responding professionally prevents misunderstandings."
            }
          ],
          'digital-tools': [
            {
              scenario: "Your group project requires collaboration, but your teammates all use different software platforms.",
              question: "What should you do?",
              options: ["Force everyone to use your preferred tool", "Research and agree on a tool that works for everyone", "Work separately and combine later", "Ask the teacher to assign new groups"],
              correctAnswer: "Research and agree on a tool that works for everyone",
              explanation: "Collaborative success requires finding tools that meet everyone's needs and capabilities."
            }
          ],
          'media-literacy': [
            {
              scenario: "You see a shocking news story shared on social media with an attention-grabbing headline, but when you read it, the content doesn't match the headline.",
              question: "What should you do?",
              options: ["Share it because the headline is interesting", "Research the story from multiple reliable sources", "Assume it's true since it's on the news", "Ignore it completely"],
              correctAnswer: "Research the story from multiple reliable sources",
              explanation: "Misleading headlines are common; always verify information through multiple credible sources."
            }
          ]
        };
        
        return banks[subtopic] || banks['digital-citizenship'];
      }
      
      getDragDropBank(subtopic, grade) {
        const banks = {
          'digital-citizenship': [
            {
              question: "Categorize these online behaviors as appropriate or inappropriate:",
              draggableItems: ["Sharing kind comments", "Copying homework answers", "Helping classmates", "Spreading rumors"],
              dropZones: ["Appropriate", "Inappropriate"],
              correctMapping: {
                "Sharing kind comments": "Appropriate",
                "Copying homework answers": "Inappropriate",
                "Helping classmates": "Appropriate",
                "Spreading rumors": "Inappropriate"
              },
              explanation: "Understanding which behaviors are appropriate helps us be better digital citizens."
            }
          ],
          'online-safety': [
            {
              question: "Categorize these as safe or unsafe online practices:",
              draggableItems: ["Using strong passwords", "Sharing personal address", "Logging out of accounts", "Meeting online strangers"],
              dropZones: ["Safe", "Unsafe"],
              correctMapping: {
                "Using strong passwords": "Safe",
                "Sharing personal address": "Unsafe",
                "Logging out of accounts": "Safe",
                "Meeting online strangers": "Unsafe"
              },
              explanation: "Recognizing safe and unsafe practices helps protect your online security and privacy."
            }
          ],
          'information-literacy': [
            {
              question: "Sort these sources by reliability level:",
              draggableItems: ["Peer-reviewed journal", "Anonymous blog post", "Government website", "Social media rumor"],
              dropZones: ["High Reliability", "Low Reliability"],
              correctMapping: {
                "Peer-reviewed journal": "High Reliability",
                "Anonymous blog post": "Low Reliability",
                "Government website": "High Reliability",
                "Social media rumor": "Low Reliability"
              },
              explanation: "Understanding source reliability helps you make informed decisions about information quality."
            }
          ],
          'digital-communication': [
            {
              question: "Categorize these communication styles as formal or informal:",
              draggableItems: ["Dear Professor Smith", "Hey buddy!", "Thank you for your time", "LOL that's crazy"],
              dropZones: ["Formal", "Informal"],
              correctMapping: {
                "Dear Professor Smith": "Formal",
                "Hey buddy!": "Informal",
                "Thank you for your time": "Formal",
                "LOL that's crazy": "Informal"
              },
              explanation: "Matching communication style to context ensures appropriate and effective messaging."
            }
          ],
          'digital-tools': [
            {
              question: "Match these tools to their primary purpose:",
              draggableItems: ["Google Docs", "Photoshop", "Zoom", "Excel"],
              dropZones: ["Document Creation", "Image Editing", "Video Conferencing", "Data Analysis"],
              correctMapping: {
                "Google Docs": "Document Creation",
                "Photoshop": "Image Editing",
                "Zoom": "Video Conferencing",
                "Excel": "Data Analysis"
              },
              explanation: "Understanding tool purposes helps you select the right software for specific tasks."
            }
          ],
          'media-literacy': [
            {
              question: "Categorize these media elements as factual or opinion-based:",
              draggableItems: ["Statistical data", "Personal testimonial", "Scientific study results", "Editorial commentary"],
              dropZones: ["Factual", "Opinion-based"],
              correctMapping: {
                "Statistical data": "Factual",
                "Personal testimonial": "Opinion-based",
                "Scientific study results": "Factual",
                "Editorial commentary": "Opinion-based"
              },
              explanation: "Distinguishing between facts and opinions helps you critically evaluate media content."
            }
          ]
        };
        
        return banks[subtopic] || banks['digital-citizenship'];
      }
      
      getHotspotBank(subtopic, grade) {
        const banks = {
          'digital-citizenship': [
            {
              question: "Click on the elements that make a respectful online profile:",
              image: "/images/profile-example.svg",
              hotspots: [
                { id: 1, x: 50, y: 50, width: 100, height: 30, label: "Appropriate profile picture" },
                { id: 2, x: 50, y: 100, width: 150, height: 20, label: "Respectful bio" },
                { id: 3, x: 50, y: 150, width: 120, height: 20, label: "Personal phone number" },
                { id: 4, x: 50, y: 200, width: 100, height: 20, label: "Positive posts" }
              ],
              correctHotspots: [1, 2, 4],
              explanation: "A respectful profile includes appropriate images, respectful language, and avoids sharing personal information."
            }
          ],
          'online-safety': [
            {
              question: "Click on the secure elements in this login screen:",
              image: "/images/login-screen.svg",
              hotspots: [
                { id: 1, x: 100, y: 80, width: 200, height: 25, label: "HTTPS lock icon" },
                { id: 2, x: 100, y: 120, width: 200, height: 30, label: "Password field with dots" },
                { id: 3, x: 100, y: 160, width: 150, height: 25, label: "Remember me checkbox" },
                { id: 4, x: 100, y: 200, width: 100, height: 30, label: "Two-factor authentication" }
              ],
              correctHotspots: [1, 2, 4],
              explanation: "Secure login elements include HTTPS encryption, hidden passwords, and two-factor authentication."
            }
          ],
          'information-literacy': [
            {
              question: "Click on the credibility indicators in this article:",
              image: "/images/article-example.svg",
              hotspots: [
                { id: 1, x: 50, y: 30, width: 150, height: 20, label: "Author name and credentials" },
                { id: 2, x: 50, y: 60, width: 100, height: 15, label: "Publication date" },
                { id: 3, x: 50, y: 300, width: 200, height: 40, label: "References and citations" },
                { id: 4, x: 250, y: 100, width: 100, height: 80, label: "Colorful advertisement" }
              ],
              correctHotspots: [1, 2, 3],
              explanation: "Credible articles show clear authorship, recent dates, and proper citations."
            }
          ],
          'digital-communication': [
            {
              question: "Click on the professional elements in this email:",
              image: "/images/email-example.svg",
              hotspots: [
                { id: 1, x: 80, y: 40, width: 200, height: 20, label: "Clear subject line" },
                { id: 2, x: 80, y: 80, width: 120, height: 20, label: "Formal greeting" },
                { id: 3, x: 80, y: 200, width: 150, height: 20, label: "Professional signature" },
                { id: 4, x: 80, y: 120, width: 180, height: 60, label: "Casual slang and emojis" }
              ],
              correctHotspots: [1, 2, 3],
              explanation: "Professional emails have clear subjects, formal greetings, and proper signatures."
            }
          ],
          'digital-tools': [
            {
              question: "Click on the productivity features in this software interface:",
              image: "/images/software-interface.svg",
              hotspots: [
                { id: 1, x: 20, y: 20, width: 60, height: 25, label: "Save button" },
                { id: 2, x: 100, y: 20, width: 80, height: 25, label: "Collaboration tools" },
                { id: 3, x: 200, y: 20, width: 70, height: 25, label: "Version history" },
                { id: 4, x: 300, y: 20, width: 60, height: 25, label: "Game feature" }
              ],
              correctHotspots: [1, 2, 3],
              explanation: "Productivity features help you save work, collaborate effectively, and track changes."
            }
          ],
          'media-literacy': [
            {
              question: "Click on the bias indicators in this news article:",
              image: "/images/news-article.svg",
              hotspots: [
                { id: 1, x: 50, y: 50, width: 200, height: 30, label: "Sensational headline" },
                { id: 2, x: 50, y: 100, width: 180, height: 20, label: "One-sided quotes only" },
                { id: 3, x: 50, y: 200, width: 150, height: 20, label: "Balanced reporting" },
                { id: 4, x: 50, y: 250, width: 160, height: 20, label: "Emotional language" }
              ],
              correctHotspots: [1, 2, 4],
              explanation: "Bias indicators include sensational headlines, one-sided reporting, and emotional language."
            }
          ]
        };
        
        return banks[subtopic] || banks['digital-citizenship'];
      }
      
      getMultiSelectBank(subtopic, grade) {
        const banks = {
          'digital-citizenship': [
            {
              question: "Which actions demonstrate responsible digital citizenship? (Select all that apply)",
              options: ["Respecting others' opinions", "Sharing personal information freely", "Giving credit for others' work", "Reporting cyberbullying", "Copying without permission", "Being kind in comments"],
              correctAnswers: ["Respecting others' opinions", "Giving credit for others' work", "Reporting cyberbullying", "Being kind in comments"],
              minSelections: 2,
              maxSelections: 6,
              explanation: "Responsible digital citizenship involves respect, honesty, kindness, and standing up for others."
            }
          ],
          'online-safety': [
            {
              question: "Which information should never be shared online? (Select all that apply)",
              options: ["Your favorite color", "Your home address", "Your phone number", "Your school name", "Your hobbies", "Your full name"],
              correctAnswers: ["Your home address", "Your phone number", "Your school name", "Your full name"],
              minSelections: 2,
              maxSelections: 6,
              explanation: "Personal identifying information should be kept private to protect your safety."
            }
          ],
          'information-literacy': [
            {
              question: "Which factors indicate a reliable online source? (Select all that apply)",
              options: ["Author credentials are listed", "Many colorful images", "Recent publication date", "Peer review process", "Lots of advertisements", "Clear citations and references"],
              correctAnswers: ["Author credentials are listed", "Recent publication date", "Peer review process", "Clear citations and references"],
              minSelections: 2,
              maxSelections: 6,
              explanation: "Reliable sources have clear authorship, current information, review processes, and proper citations."
            }
          ],
          'digital-communication': [
            {
              question: "Which elements make digital communication effective? (Select all that apply)",
              options: ["Clear and concise language", "Appropriate tone for context", "Using all capital letters", "Proper grammar and spelling", "Excessive use of emojis", "Respectful language"],
              correctAnswers: ["Clear and concise language", "Appropriate tone for context", "Proper grammar and spelling", "Respectful language"],
              minSelections: 2,
              maxSelections: 6,
              explanation: "Effective digital communication requires clarity, appropriate tone, proper language, and respect."
            }
          ],
          'digital-tools': [
            {
              question: "Which factors should you consider when selecting digital tools? (Select all that apply)",
              options: ["Cost and budget", "Brand popularity", "Features and functionality", "User interface design", "Compatibility with other tools", "Learning curve and ease of use"],
              correctAnswers: ["Cost and budget", "Features and functionality", "User interface design", "Compatibility with other tools", "Learning curve and ease of use"],
              minSelections: 3,
              maxSelections: 6,
              explanation: "Tool selection should consider practical factors like cost, features, usability, and compatibility."
            }
          ],
          'media-literacy': [
            {
              question: "Which are signs of potential media bias or misinformation? (Select all that apply)",
              options: ["Emotional or sensational language", "Multiple credible sources cited", "Lack of author information", "One-sided presentation", "Recent publication date", "Unverifiable claims"],
              correctAnswers: ["Emotional or sensational language", "Lack of author information", "One-sided presentation", "Unverifiable claims"],
              minSelections: 2,
              maxSelections: 6,
              explanation: "Biased or false information often uses emotional language, lacks proper attribution, and makes unverifiable claims."
            }
          ]
        };
        
        return banks[subtopic] || banks['digital-citizenship'];
      }
      
      // Adapt templates based on specific subtopic
      adaptTemplatesForSubtopic(templates, subtopicId) {
        // This could be expanded to customize questions based on specific subtopics
        // For now, return base templates with some modifications
        return templates;
  }

  // Adapt question text for grade level
  adaptQuestionForGrade(questionText, grade, gradeConfig) {
    // This would implement grade-appropriate language adaptation
    // For now, return the original text
    return questionText;
  }

  // Adapt explanation for grade level
  adaptExplanationForGrade(explanation, grade, gradeConfig) {
    // This would implement grade-appropriate explanation adaptation
    // For now, return the original explanation
    return explanation;
  }

  // Calculate grade-adjusted difficulty
  calculateGradeDifficulty(baseDifficulty, grade, gradeConfig) {
    const difficultyMap = {
      'easy': 1,
      'medium': 2,
      'hard': 3
    };
    
    const baseLevel = difficultyMap[baseDifficulty] || 2;
    const adjustedLevel = Math.round(baseLevel * gradeConfig.complexityWeight);
    
    const levelMap = { 1: 'easy', 2: 'medium', 3: 'hard' };
    return levelMap[Math.min(3, Math.max(1, adjustedLevel))];
  }

  // Select appropriate Bloom's taxonomy level
  selectBloomLevel(grade, gradeConfig) {
    const actualGradeConfig = gradeConfig || this.gradeDifficultyMapping[grade] || this.gradeDifficultyMapping[8];
    const availableLevels = actualGradeConfig.bloomLevels || ['understand', 'apply'];
    return availableLevels[Math.floor(Math.random() * availableLevels.length)];
  }

  // Calculate points based on grade and difficulty
  calculatePoints(grade, gradeConfig) {
    const basePoints = {
      7: 8,
      8: 10,
      9: 12
    };
    
    return basePoints[grade] || 10;
  }

  // Get random template that hasn't been used
  getRandomTemplate(templates, usedQuestions) {
    const availableTemplates = templates.filter(template => 
      !usedQuestions.has(`${template.id}`)
    );
    
    if (availableTemplates.length === 0) {
      // If all templates used, allow reuse but with different variations
      return templates[Math.floor(Math.random() * templates.length)];
    }
    
    return availableTemplates[Math.floor(Math.random() * availableTemplates.length)];
  }

  // Utility function to shuffle array
  shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  // Calculate score for different question types
  calculateQuestionScore(question, userAnswer) {
    switch (question.type) {
      case 'multiple-choice':
        return userAnswer === question.correct ? 1 : 0;
      
      case 'true-false':
        return userAnswer === question.correct ? 1 : 0;
      
      case 'fill-blank':
        if (question.blanks && question.blanks > 1) {
          // Multiple blanks - partial credit
          let correct = 0;
          for (let i = 0; i < question.answers.length; i++) {
            const userText = userAnswer[i]?.toLowerCase().trim();
            const correctAnswer = question.answers[i].toLowerCase();
            const alternatives = question.alternatives[i]?.map(alt => alt.toLowerCase()) || [];
            if (userText === correctAnswer || alternatives.includes(userText)) {
              correct++;
            }
          }
          return correct / question.answers.length;
        } else {
          // Single blank
          const userText = userAnswer?.toLowerCase().trim();
          const correctAnswer = question.answers[0].toLowerCase();
          const alternatives = question.alternatives[0]?.map(alt => alt.toLowerCase()) || [];
          return (userText === correctAnswer || alternatives.includes(userText)) ? 1 : 0;
        }
      
      case 'ordering':
        return JSON.stringify(userAnswer) === JSON.stringify(question.correct) ? 1 : 0;
      
      case 'matching':
        let correctPairs = 0;
        const totalPairs = Object.keys(question.correctPairs).length;
        for (const [left, right] of Object.entries(userAnswer || {})) {
          if (question.correctPairs[left] === right) {
            correctPairs++;
          }
        }
        return correctPairs / totalPairs;
      
      case 'multi-select':
        const correctSet = new Set(question.correctAnswers);
        const userSet = new Set(userAnswer || []);
        const intersection = new Set([...correctSet].filter(x => userSet.has(x)));
        const union = new Set([...correctSet, ...userSet]);
        return intersection.size / union.size; // Jaccard similarity
      
      case 'code-completion':
        // Score based on correct blanks filled
        if (question.blanks && Array.isArray(userAnswer)) {
          let correct = 0;
          for (let i = 0; i < question.blanks.length; i++) {
            const userText = userAnswer[i]?.toLowerCase().trim();
            const correctOptions = question.blanks[i].options.map(opt => opt.toLowerCase());
            if (correctOptions.includes(userText)) {
              correct++;
            }
          }
          return correct / question.blanks.length;
        }
        return userAnswer === question.correct ? 1 : 0;
      
      case 'scenario':
        // Scenario questions are typically multiple choice
        return userAnswer === question.correctAnswer ? 1 : 0;
      
      case 'drag-drop':
        // Score based on correct mappings
        let correctMappings = 0;
        const totalMappings = Object.keys(question.correctMappings).length;
        for (const [item, zone] of Object.entries(userAnswer || {})) {
          if (question.correctMappings[item] === zone) {
            correctMappings++;
          }
        }
        return correctMappings / totalMappings;
      
      case 'hotspot':
        // Score based on correct hotspots selected
        const correctHotspots = new Set(question.correctHotspots);
        const userHotspots = new Set(userAnswer || []);
        const correctSelections = [...correctHotspots].filter(h => userHotspots.has(h)).length;
        const incorrectSelections = [...userHotspots].filter(h => !correctHotspots.has(h)).length;
        const totalCorrect = correctHotspots.size;
        
        // Penalize incorrect selections
        const score = Math.max(0, (correctSelections - incorrectSelections) / totalCorrect);
        return Math.min(1, score);
      
      default:
        return 0;
    }
  }
}

export default QuestionGenerator;