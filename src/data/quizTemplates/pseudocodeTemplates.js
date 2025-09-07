/**
 * Comprehensive Quiz Templates for Subtopic 1.1 - Pseudocode
 * 
 * This file contains 10 question types × 20 questions each = 200 base templates
 * These will be adapted for grades 7, 8, and 9 (total 600 questions for this subtopic)
 */

export const pseudocodeQuizTemplates = {
  // TYPE A: Multiple Choice Questions (20 questions)
  multipleChoice: [
    {
      id: "MC_001",
      question: "What is pseudocode?",
      options: [
        "A programming language",
        "A way to plan algorithms using plain language", 
        "A type of computer",
        "A debugging tool"
      ],
      correct: 1,
      explanation: "Pseudocode is a way to plan and describe algorithms using plain, human-readable language before writing actual code.",
      difficulty: "basic",
      bloomLevel: "remember"
    },
    {
      id: "MC_002", 
      question: "Which keyword is commonly used to start pseudocode?",
      options: ["START", "INIT", "RUN", "GO"],
      correct: 0,
      explanation: "START is the standard keyword used to begin pseudocode algorithms.",
      difficulty: "basic",
      bloomLevel: "remember"
    },
    {
      id: "MC_003",
      question: "What does the DISPLAY command do in pseudocode?",
      options: [
        "Shows the computer screen",
        "Outputs information to the user",
        "Displays the code", 
        "Shows errors"
      ],
      correct: 1,
      explanation: "DISPLAY is used in pseudocode to output information or results to the user.",
      difficulty: "basic",
      bloomLevel: "understand"
    },
    {
      id: "MC_004",
      question: "Which of these is a valid pseudocode structure for getting input?",
      options: [
        "GET user_input",
        "INPUT user_data",
        "READ user_value", 
        "All of the above"
      ],
      correct: 3,
      explanation: "All of these are valid ways to represent input in pseudocode - the key is clarity and readability.",
      difficulty: "intermediate",
      bloomLevel: "understand"
    },
    {
      id: "MC_005",
      question: "What is the purpose of indentation in pseudocode?",
      options: [
        "To make it look pretty",
        "To show the structure and logic flow",
        "It's not necessary",
        "To count lines"
      ],
      correct: 1,
      explanation: "Indentation in pseudocode helps show the logical structure and flow of the algorithm, especially in loops and conditionals.",
      difficulty: "intermediate",
      bloomLevel: "understand"
    },
    {
      id: "MC_006",
      question: "Which pseudocode keyword is used to end an algorithm?",
      options: ["STOP", "END", "FINISH", "CLOSE"],
      correct: 1,
      explanation: "END is the standard keyword used to terminate pseudocode algorithms.",
      difficulty: "basic",
      bloomLevel: "remember"
    },
    {
      id: "MC_007",
      question: "What should you do before writing pseudocode?",
      options: [
        "Start coding immediately",
        "Understand the problem thoroughly",
        "Choose a programming language",
        "Buy a new computer"
      ],
      correct: 1,
      explanation: "Understanding the problem thoroughly is essential before writing pseudocode or any algorithm.",
      difficulty: "intermediate",
      bloomLevel: "apply"
    },
    {
      id: "MC_008",
      question: "Which of these is NOT a benefit of using pseudocode?",
      options: [
        "Language-independent planning",
        "Easy to understand logic",
        "Runs faster than real code",
        "Helps identify logic errors early"
      ],
      correct: 2,
      explanation: "Pseudocode doesn't run at all - it's a planning tool, not executable code.",
      difficulty: "intermediate",
      bloomLevel: "analyze"
    },
    {
      id: "MC_009",
      question: "In pseudocode, variables are typically represented as:",
      options: [
        "Complex data types only",
        "Simple, descriptive names",
        "Numbers only",
        "Single letters only"
      ],
      correct: 1,
      explanation: "Variables in pseudocode should have simple, descriptive names that clearly indicate their purpose.",
      difficulty: "basic",
      bloomLevel: "understand"
    },
    {
      id: "MC_010",
      question: "What makes good pseudocode?",
      options: [
        "Complex technical terms",
        "Clear, logical, step-by-step instructions",
        "As few lines as possible",
        "Exact programming syntax"
      ],
      correct: 1,
      explanation: "Good pseudocode is clear, logical, and provides step-by-step instructions that anyone can follow.",
      difficulty: "intermediate",
      bloomLevel: "evaluate"
    },
    {
      id: "MC_011",
      question: "When should comments be added to pseudocode?",
      options: [
        "Never - pseudocode is self-explanatory",
        "Only at the end",
        "When complex logic needs clarification",
        "Every single line"
      ],
      correct: 2,
      explanation: "Comments should be added when complex logic needs clarification or when the purpose isn't immediately clear.",
      difficulty: "intermediate",
      bloomLevel: "apply"
    },
    {
      id: "MC_012",
      question: "Which pseudocode structure represents repetition?",
      options: [
        "IF-THEN-ELSE",
        "WHILE or FOR loops",
        "INPUT-OUTPUT",
        "START-END"
      ],
      correct: 1,
      explanation: "WHILE and FOR loops are used in pseudocode to represent repetitive actions or iterations.",
      difficulty: "intermediate",
      bloomLevel: "understand"
    },
    {
      id: "MC_013",
      question: "What happens after writing pseudocode?",
      options: [
        "The program is complete",
        "Convert it to actual programming code",
        "Test it directly",
        "Submit it as final work"
      ],
      correct: 1,
      explanation: "After writing pseudocode, the next step is to convert it into actual programming code in your chosen language.",
      difficulty: "basic",
      bloomLevel: "understand"
    },
    {
      id: "MC_014",
      question: "How detailed should pseudocode be?",
      options: [
        "Extremely detailed with every step",
        "Very vague and general",
        "Detailed enough to understand logic, not implementation",
        "Only major steps"
      ],
      correct: 2,
      explanation: "Pseudocode should be detailed enough to understand the logic and flow, but not get bogged down in implementation details.",
      difficulty: "advanced",
      bloomLevel: "evaluate"
    },
    {
      id: "MC_015",
      question: "Can pseudocode include mathematical operations?",
      options: [
        "No, never",
        "Only basic addition",
        "Yes, mathematical operations are common",
        "Only if using a calculator"
      ],
      correct: 2,
      explanation: "Pseudocode commonly includes mathematical operations like +, -, *, / and can include more complex mathematical concepts.",
      difficulty: "basic",
      bloomLevel: "understand"
    },
    {
      id: "MC_016",
      question: "What's the difference between pseudocode and flowcharts?",
      options: [
        "They're exactly the same",
        "Pseudocode uses text, flowcharts use visual symbols",
        "Flowcharts are always better",
        "Pseudocode is only for beginners"
      ],
      correct: 1,
      explanation: "Pseudocode uses text-based descriptions while flowcharts use visual symbols and shapes to represent logic flow.",
      difficulty: "intermediate",
      bloomLevel: "analyze"
    },
    {
      id: "MC_017",
      question: "In team projects, pseudocode helps with:",
      options: [
        "Nothing - it's individual work only",
        "Communication and shared understanding",
        "Making the project longer",
        "Avoiding actual coding"
      ],
      correct: 1,
      explanation: "Pseudocode helps team members communicate ideas and ensures shared understanding of the algorithm before implementation.",
      difficulty: "advanced",
      bloomLevel: "apply"
    },
    {
      id: "MC_018",
      question: "Which industries commonly use pseudocode?",
      options: [
        "Only education",
        "Software development and engineering",
        "Only gaming companies",
        "None - it's outdated"
      ],
      correct: 1,
      explanation: "Pseudocode is widely used in software development, engineering, and many technical fields for planning and documentation.",
      difficulty: "intermediate",
      bloomLevel: "understand"
    },
    {
      id: "MC_019",
      question: "Can pseudocode be wrong?",
      options: [
        "No, there's no right or wrong",
        "Yes, if the logic is flawed",
        "Only if it has spelling errors",
        "Wrong question - pseudocode can't be checked"
      ],
      correct: 1,
      explanation: "Yes, pseudocode can be wrong if the logic is flawed, incomplete, or doesn't solve the intended problem correctly.",
      difficulty: "advanced",
      bloomLevel: "evaluate"
    },
    {
      id: "MC_020",
      question: "What's the relationship between pseudocode and algorithms?",
      options: [
        "They're completely unrelated",
        "Pseudocode is a way to express algorithms",
        "Algorithms are better than pseudocode",
        "They're the same thing"
      ],
      correct: 1,
      explanation: "Pseudocode is a tool used to express and describe algorithms in a human-readable format before implementation.",
      difficulty: "intermediate",
      bloomLevel: "understand"
    }
  ],

  // TYPE B: True/False Questions (20 questions)
  trueFalse: [
    {
      id: "TF_001",
      question: "Pseudocode must follow exact syntax rules like programming languages.",
      correct: false,
      explanation: "False. Pseudocode is meant to be flexible and readable, focusing on logic rather than strict syntax.",
      difficulty: "basic",
      bloomLevel: "understand"
    },
    {
      id: "TF_002", 
      question: "INPUT is a valid pseudocode command for getting user data.",
      correct: true,
      explanation: "True. INPUT is commonly used in pseudocode to represent getting data from the user.",
      difficulty: "basic",
      bloomLevel: "remember"
    },
    {
      id: "TF_003",
      question: "Pseudocode can only be written in English.",
      correct: false,
      explanation: "False. Pseudocode can be written in any natural language, as long as it's clear and understandable.",
      difficulty: "intermediate",
      bloomLevel: "understand"
    },
    {
      id: "TF_004",
      question: "Good pseudocode should be understandable by non-programmers.",
      correct: true,
      explanation: "True. One of the main purposes of pseudocode is to make algorithms understandable to anyone, regardless of programming experience.",
      difficulty: "intermediate",
      bloomLevel: "understand"
    },
    {
      id: "TF_005",
      question: "Pseudocode is only useful for simple problems.",
      correct: false,
      explanation: "False. Pseudocode is valuable for problems of any complexity and is especially useful for complex problems to break them down.",
      difficulty: "intermediate",
      bloomLevel: "analyze"
    },
    {
      id: "TF_006",
      question: "You should write pseudocode after coding the program.",
      correct: false,
      explanation: "False. Pseudocode should be written before coding to plan the logic and structure of the program.",
      difficulty: "basic",
      bloomLevel: "understand"
    },
    {
      id: "TF_007",
      question: "Pseudocode helps identify logic errors before implementation.",
      correct: true,
      explanation: "True. By thinking through the logic in pseudocode first, you can catch and fix logical errors before writing actual code.",
      difficulty: "intermediate",
      bloomLevel: "apply"
    },
    {
      id: "TF_008",
      question: "There is only one correct way to write pseudocode for any problem.",
      correct: false,
      explanation: "False. There can be multiple valid ways to write pseudocode for the same problem, as long as the logic is correct and clear.",
      difficulty: "advanced",
      bloomLevel: "evaluate"
    },
    {
      id: "TF_009",
      question: "Pseudocode should include specific variable declarations.",
      correct: false,
      explanation: "False. Pseudocode focuses on logic flow rather than specific implementation details like variable declarations.",
      difficulty: "intermediate",
      bloomLevel: "understand"
    },
    {
      id: "TF_010",
      question: "Pseudocode can be directly executed by a computer.",
      correct: false,
      explanation: "False. Pseudocode is a human-readable planning tool and cannot be directly executed by computers.",
      difficulty: "basic",
      bloomLevel: "understand"
    },
    {
      id: "TF_011",
      question: "Using consistent terminology in pseudocode is important.",
      correct: true,
      explanation: "True. Consistent terminology helps avoid confusion and makes the pseudocode clearer and more professional.",
      difficulty: "intermediate",
      bloomLevel: "apply"
    },
    {
      id: "TF_012",
      question: "Pseudocode should include error handling procedures.",
      correct: true,
      explanation: "True. Good pseudocode should consider and include basic error handling and edge cases.",
      difficulty: "advanced",
      bloomLevel: "apply"
    },
    {
      id: "TF_013",
      question: "Pseudocode is a modern invention from the computer age.",
      correct: false,
      explanation: "False. The concept of step-by-step algorithmic thinking predates computers and has been used in mathematics and logic for centuries.",
      difficulty: "advanced",
      bloomLevel: "understand"
    },
    {
      id: "TF_014",
      question: "Pseudocode can help in debugging actual program code.",
      correct: true,
      explanation: "True. Comparing actual code behavior to the pseudocode logic can help identify where bugs might be occurring.",
      difficulty: "intermediate",
      bloomLevel: "apply"
    },
    {
      id: "TF_015",
      question: "Professional programmers never use pseudocode.",
      correct: false,
      explanation: "False. Many professional programmers use pseudocode for planning complex algorithms and communicating with team members.",
      difficulty: "intermediate",
      bloomLevel: "understand"
    },
    {
      id: "TF_016",
      question: "Pseudocode should avoid using real programming language keywords.",
      correct: false,
      explanation: "False. It's acceptable to use familiar programming keywords in pseudocode if they make the logic clearer.",
      difficulty: "advanced",
      bloomLevel: "evaluate"
    },
    {
      id: "TF_017",
      question: "The main goal of pseudocode is to look impressive.",
      correct: false,
      explanation: "False. The main goal of pseudocode is to clearly communicate the logic and structure of an algorithm.",
      difficulty: "basic",
      bloomLevel: "understand"
    },
    {
      id: "TF_018",
      question: "Pseudocode can include calls to external functions or procedures.",
      correct: true,
      explanation: "True. Pseudocode can reference external functions or procedures when they're part of the overall algorithm design.",
      difficulty: "advanced",
      bloomLevel: "apply"
    },
    {
      id: "TF_019",
      question: "Time spent writing pseudocode is time wasted from actual coding.",
      correct: false,
      explanation: "False. Time spent on pseudocode often saves much more time during implementation and debugging phases.",
      difficulty: "intermediate",
      bloomLevel: "evaluate"
    },
    {
      id: "TF_020",
      question: "Pseudocode should be updated if the actual implementation changes significantly.",
      correct: true,
      explanation: "True. Keeping pseudocode updated helps maintain accurate documentation and helps future maintenance.",
      difficulty: "advanced",
      bloomLevel: "apply"
    }
  ],

  // TYPE C: Fill in the Blank Questions (20 questions)
  fillBlank: [
    {
      id: "FB_001",
      question: "Pseudocode helps programmers _____ their logic before writing actual code.",
      answer: "plan",
      alternatives: ["organize", "structure", "design", "outline"],
      explanation: "Pseudocode helps programmers plan their logic and algorithm structure before implementing in a specific programming language.",
      difficulty: "basic",
      bloomLevel: "understand"
    },
    {
      id: "FB_002",
      question: "The keyword _____ is commonly used to begin a pseudocode algorithm.",
      answer: "START",
      alternatives: ["BEGIN", "INIT"],
      explanation: "START (or BEGIN) is the standard keyword used to mark the beginning of a pseudocode algorithm.",
      difficulty: "basic",
      bloomLevel: "remember"
    },
    {
      id: "FB_003",
      question: "To get information from the user in pseudocode, we use the _____ command.",
      answer: "INPUT",
      alternatives: ["GET", "READ", "RECEIVE"],
      explanation: "INPUT is the standard pseudocode command for receiving data from the user.",
      difficulty: "basic",
      bloomLevel: "remember"
    },
    {
      id: "FB_004",
      question: "To show results to the user in pseudocode, we use the _____ command.",
      answer: "DISPLAY",
      alternatives: ["OUTPUT", "PRINT", "SHOW"],
      explanation: "DISPLAY (or OUTPUT) is used in pseudocode to show information or results to the user.",
      difficulty: "basic",
      bloomLevel: "remember"
    },
    {
      id: "FB_005",
      question: "Good pseudocode should be _____ and easy to understand.",
      answer: "clear",
      alternatives: ["logical", "simple", "readable"],
      explanation: "Clear communication is the primary goal of pseudocode - it should be easily understood by anyone reading it.",
      difficulty: "basic",
      bloomLevel: "understand"
    },
    {
      id: "FB_006",
      question: "In pseudocode, _____ is used to show the logical structure of nested operations.",
      answer: "indentation",
      alternatives: ["spacing", "formatting"],
      explanation: "Indentation helps visualize the logical structure and hierarchy of operations in pseudocode.",
      difficulty: "intermediate",
      bloomLevel: "understand"
    },
    {
      id: "FB_007",
      question: "The process of converting pseudocode to actual programming language is called _____.",
      answer: "implementation",
      alternatives: ["coding", "translation", "conversion"],
      explanation: "Implementation is the process of converting pseudocode logic into actual programming language syntax.",
      difficulty: "intermediate",
      bloomLevel: "apply"
    },
    {
      id: "FB_008",
      question: "Pseudocode is _____ independent, meaning it doesn't favor any specific programming language.",
      answer: "language",
      alternatives: ["platform", "syntax"],
      explanation: "Language independence means pseudocode can be implemented in any programming language.",
      difficulty: "intermediate",
      bloomLevel: "understand"
    },
    {
      id: "FB_009",
      question: "Before writing pseudocode, you should thoroughly _____ the problem.",
      answer: "understand",
      alternatives: ["analyze", "study", "examine"],
      explanation: "Understanding the problem completely is essential before attempting to write any algorithm or pseudocode.",
      difficulty: "intermediate",
      bloomLevel: "apply"
    },
    {
      id: "FB_010",
      question: "Pseudocode should focus on the _____ of the solution rather than implementation details.",
      answer: "logic",
      alternatives: ["algorithm", "process", "flow"],
      explanation: "Pseudocode emphasizes the logical flow and decision-making process rather than specific coding syntax.",
      difficulty: "intermediate",
      bloomLevel: "understand"
    },
    {
      id: "FB_011",
      question: "A well-written pseudocode serves as excellent _____ for the actual program.",
      answer: "documentation",
      alternatives: ["reference", "guide"],
      explanation: "Pseudocode serves as valuable documentation that explains how the program logic works.",
      difficulty: "intermediate",
      bloomLevel: "apply"
    },
    {
      id: "FB_012",
      question: "In team development, pseudocode facilitates _____ among team members.",
      answer: "communication",
      alternatives: ["collaboration", "understanding"],
      explanation: "Pseudocode helps team members communicate ideas and ensures everyone understands the proposed solution.",
      difficulty: "advanced",
      bloomLevel: "apply"
    },
    {
      id: "FB_013",
      question: "Pseudocode can help identify _____ errors before implementation begins.",
      answer: "logic",
      alternatives: ["logical", "design"],
      explanation: "By thinking through the algorithm in pseudocode, you can catch logical errors early in the development process.",
      difficulty: "intermediate",
      bloomLevel: "analyze"
    },
    {
      id: "FB_014",
      question: "The level of _____ in pseudocode should be appropriate for the intended audience.",
      answer: "detail",
      alternatives: ["complexity", "specificity"],
      explanation: "The amount of detail in pseudocode should match what the intended readers need to understand the algorithm.",
      difficulty: "advanced",
      bloomLevel: "evaluate"
    },
    {
      id: "FB_015",
      question: "Pseudocode uses _____ language rather than programming syntax.",
      answer: "natural",
      alternatives: ["plain", "everyday", "human"],
      explanation: "Pseudocode uses natural, human language to describe algorithms rather than specific programming syntax.",
      difficulty: "basic",
      bloomLevel: "understand"
    },
    {
      id: "FB_016",
      question: "Good pseudocode includes handling of _____ cases and potential errors.",
      answer: "edge",
      alternatives: ["special", "exception", "boundary"],
      explanation: "Comprehensive pseudocode should consider edge cases and how the algorithm handles unusual or error conditions.",
      difficulty: "advanced",
      bloomLevel: "apply"
    },
    {
      id: "FB_017",
      question: "The pseudocode keyword _____ is used to terminate an algorithm.",
      answer: "END",
      alternatives: ["STOP", "FINISH"],
      explanation: "END is the standard keyword used to mark the conclusion of a pseudocode algorithm.",
      difficulty: "basic",
      bloomLevel: "remember"
    },
    {
      id: "FB_018",
      question: "Pseudocode can include _____ operations like addition, subtraction, and multiplication.",
      answer: "mathematical",
      alternatives: ["arithmetic", "numeric"],
      explanation: "Mathematical and arithmetic operations are commonly included in pseudocode to describe calculations.",
      difficulty: "basic",
      bloomLevel: "understand"
    },
    {
      id: "FB_019",
      question: "When debugging, comparing actual code behavior to _____ can help locate errors.",
      answer: "pseudocode",
      alternatives: ["design", "plan"],
      explanation: "The original pseudocode serves as a reference to check if the actual implementation matches the intended logic.",
      difficulty: "intermediate",
      bloomLevel: "analyze"
    },
    {
      id: "FB_020",
      question: "The primary benefit of pseudocode is improved _____ and reduced development time.",
      answer: "planning",
      alternatives: ["preparation", "design"],
      explanation: "Better planning through pseudocode leads to clearer implementations and often significantly reduces overall development time.",
      difficulty: "advanced",
      bloomLevel: "evaluate"
    }
  ]

  // Continue with TYPE_D through TYPE_J...
  // This would continue with:
  // - ordering: 20 sequencing/ordering questions
  // - matching: 20 matching questions  
  // - codeCompletion: 20 code completion questions
  // - scenario: 20 scenario-based questions
  // - dragDrop: 20 drag and drop questions
  // - hotspot: 20 hotspot/click questions
  // - multiSelect: 20 multi-select questions
};

export default pseudocodeQuizTemplates;
