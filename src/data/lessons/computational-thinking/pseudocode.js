// Lesson 1.1: Pseudocode - Comprehensive lesson content

export default {
  title: "Writing Computer Instructions Like a Recipe! 📝",
  description: "Learn how to write step-by-step instructions for computers, just like writing a recipe for cookies!",
  difficulty: "beginner",
  estimatedTime: "30 minutes",
  
  // Learning objectives
  objectives: [
    "Learn what computer instructions are and why they're helpful",
    "Discover how to write simple step-by-step instructions",
    "Practice writing instructions for everyday activities",
    "Turn our instructions into fun pictures and drawings",
    "Use instructions to solve cool problems"
  ],
  
  // Main lesson content
  content: `
    <h2>What are Computer Instructions? 🤖</h2>
    <p><strong>Computer instructions</strong> are like writing a recipe for your favorite cookies! Just like a recipe tells you step-by-step how to make cookies, computer instructions tell the computer step-by-step what to do. We call these special instructions "pseudocode" - it's like writing in a language that both people and computers can understand!</p>
    
    <h3>Why Computer Instructions are Super Cool! ✨</h3>
    <ul>
      <li><strong>Easy to Understand:</strong> Anyone can read them, just like reading a story!</li>
      <li><strong>Simple Words:</strong> We use everyday words that make sense</li>
      <li><strong>Well Organized:</strong> Everything is in the right order, like steps in a recipe</li>
      <li><strong>Just Right:</strong> Not too simple, not too complicated - just perfect!</li>
      <li><strong>No Strict Rules:</strong> We can be creative with how we write them</li>
    </ul>
    
    <h2>Why Writing Instructions is Awesome! 🌟</h2>
    
    <h3>1. Planning Your Ideas 🎯</h3>
    <p>Writing instructions helps us think about what we want to do before we start. It's like making a plan for building the coolest LEGO castle - we think about it first, then build it!</p>
    
    <h3>2. Sharing with Friends 👫</h3>
    <p>When we write clear instructions, we can share our ideas with friends and family. They can understand exactly what we're thinking!</p>
    
    <h3>3. Remembering Later 🧠</h3>
    <p>Instructions help us remember how we solved a problem. It's like keeping a diary of all our smart ideas!</p>
    
    <h3>4. Using Anywhere 🌍</h3>
    <p>Once we write good instructions, we can use them to solve similar problems anywhere - at home, at school, or even in games!</p>
    
    <h2>How to Write Fun Instructions! 📝</h2>
    
    <h3>1. Step-by-Step Instructions 👣</h3>
    
    <h4>Simple Steps (One After Another):</h4>
    <pre><code>START
    ASK "What's your favorite number?"
    GET the number from you
    MULTIPLY the number by 2
    SHOW the answer
FINISH</code></pre>
    
    <h4>Making Choices (If This, Then That):</h4>
    <pre><code>IF it's sunny outside THEN
    go to the playground
OTHERWISE
    play inside
END IF

// Fun Example:
IF you have 10 or more stickers THEN
    SHOW "Wow! You're a sticker collector!"
OTHERWISE
    SHOW "Keep collecting more stickers!"
END IF</code></pre>
    
    <h4>Doing Things Over and Over (Loops):</h4>
    <pre><code>// Counting Loop
COUNT from 1 to 10
    SAY the number out loud
END COUNT

// Keep Going Loop
WHILE you haven't found your toy
    look in another room
END WHILE

// Fun Example:
WHILE the password is wrong
    ASK "What's the secret word?"
    IF you tried 3 times THEN
        SAY "Too many tries! Ask a grown-up for help"
        STOP
    END IF
END WHILE</code></pre>
    
    <h3>2. Storing and Using Information 📦</h3>
    
    <h4>Remembering Things (Like Writing on a Sticky Note):</h4>
    <pre><code>REMEMBER my_favorite_color = "blue"
REMEMBER how_many_pets = 2
REMEMBER my_name = "Alex"
REMEMBER is_sunny = YES</code></pre>
    
    <h4>Getting Information and Showing Results:</h4>
    <pre><code>ASK "What's your name?"
GET the_name
SHOW "Hello there!"
TELL "Your name is: " + the_name

// Fun Examples:
ASK "How old are you?"
GET your_age
SHOW "Welcome to our fun game!"
TELL "You are " + your_age + " years old!"</code></pre>
    
    <h2>Cool Examples You Can Try! 🎮</h2>
    
    <h3>Example 1: Magic Math Helper 🧮</h3>
    <pre><code>START Magic_Math_Helper
    SHOW "Welcome to the Magic Math Helper!"
    ASK "Give me your first number:"
    GET first_number
    ASK "What do you want to do? (+, -, *, /)"
    GET math_operation
    ASK "Give me your second number:"
    GET second_number
    
    IF math_operation = "+" THEN
        answer = first_number + second_number
    OTHERWISE IF math_operation = "-" THEN
        answer = first_number - second_number
    OTHERWISE IF math_operation = "*" THEN
        answer = first_number * second_number
    OTHERWISE IF math_operation = "/" THEN
        IF second_number is not 0 THEN
            answer = first_number / second_number
        OTHERWISE
            SHOW "Oops! We can't divide by zero!"
            STOP
        END IF
    OTHERWISE
        SHOW "Hmm, I don't know that operation!"
        STOP
    END IF
    
    SHOW "The magic answer is: " + answer
FINISH</code></pre>
    
    <h3>Example 2: Super Star Report Card 🌟</h3>
    <pre><code>START Super_Star_Report
    ASK "What's your test score?"
    GET your_score
    
    IF your_score >= 90 THEN
        star_level = "Super Star! ⭐⭐⭐"
    OTHERWISE IF your_score >= 80 THEN
        star_level = "Great Job! ⭐⭐"
    OTHERWISE IF your_score >= 70 THEN
        star_level = "Good Work! ⭐"
    OTHERWISE IF your_score >= 60 THEN
        star_level = "Keep Trying! 💪"
    OTHERWISE
        star_level = "Practice More! 📚"
    END IF
    
    SHOW "Your result: " + star_level
FINISH</code></pre>
  `,
  
  // Interactive elements and activities
  interactiveElements: [
    {
      type: "drag-drop",
      title: "Pseudocode Structure Matching",
      description: "Match the pseudocode elements with their descriptions",
      items: [
        { id: "if-then", content: "IF condition THEN", category: "conditional" },
        { id: "while", content: "WHILE condition", category: "loop" },
        { id: "read", content: "READ variable", category: "input" },
        { id: "display", content: "DISPLAY message", category: "output" },
        { id: "set", content: "SET variable = value", category: "assignment" }
      ],
      categories: [
        { id: "conditional", name: "Conditional Logic" },
        { id: "loop", name: "Repetition" },
        { id: "input", name: "Data Input" },
        { id: "output", name: "Data Output" },
        { id: "assignment", name: "Variable Assignment" }
      ]
    },
    {
      type: "code-editor",
      title: "Write Your First Pseudocode",
      description: "Write pseudocode for a program that asks for a user's name and age, then displays a personalized greeting.",
      initialCode: "// Write your pseudocode here\nBEGIN\n    // Your code goes here\nEND",
      solution: `BEGIN
    DISPLAY "What is your name?"
    READ user_name
    DISPLAY "What is your age?"
    READ user_age
    DISPLAY "Hello " + user_name + "! You are " + user_age + " years old."
END`,
      hints: [
        "Start with BEGIN and end with END",
        "Use READ to get input from the user",
        "Use DISPLAY to show messages",
        "You can combine text and variables with +"
      ]
    },
    {
      type: "ordering",
      title: "Pseudocode Sequence",
      description: "Put these pseudocode lines in the correct order to create a program that finds the largest of three numbers.",
      items: [
        { id: "1", content: "BEGIN", order: 1 },
        { id: "2", content: "READ first_number", order: 2 },
        { id: "3", content: "READ second_number", order: 3 },
        { id: "4", content: "READ third_number", order: 4 },
        { id: "5", content: "IF first_number > second_number AND first_number > third_number THEN", order: 5 },
        { id: "6", content: "    largest = first_number", order: 6 },
        { id: "7", content: "ELSE IF second_number > third_number THEN", order: 7 },
        { id: "8", content: "    largest = second_number", order: 8 },
        { id: "9", content: "ELSE", order: 9 },
        { id: "10", content: "    largest = third_number", order: 10 },
        { id: "11", content: "ENDIF", order: 11 },
        { id: "12", content: "DISPLAY 'The largest number is: ' + largest", order: 12 },
        { id: "13", content: "END", order: 13 }
      ]
    }
  ],
  
  // Reading materials and resources
  readings: [
    {
      title: "The History of Pseudocode",
      content: `
        <p>Pseudocode has been used since the early days of computing as a way to plan and communicate algorithms. The concept emerged in the 1950s and 1960s as programmers needed a way to design programs before implementing them in machine-specific languages.</p>
        
        <p>Early computer scientists like John von Neumann and others recognized the need for a human-readable way to express computational logic. This led to the development of various pseudocode conventions that are still used today.</p>
        
        <p>Modern pseudocode has evolved to include structured programming concepts and is now an essential tool in computer science education and professional software development.</p>
      `
    },
    {
      title: "Pseudocode vs. Flowcharts",
      content: `
        <p>While both pseudocode and flowcharts are used to plan algorithms, they have different strengths:</p>
        
        <h4>Pseudocode Advantages:</h4>
        <ul>
          <li>Faster to write and modify</li>
          <li>More detailed than flowcharts</li>
          <li>Easier to convert to actual code</li>
          <li>Better for complex logic</li>
        </ul>
        
        <h4>Flowchart Advantages:</h4>
        <ul>
          <li>Visual representation of logic flow</li>
          <li>Easier to understand for non-programmers</li>
          <li>Good for showing decision points</li>
          <li>Helpful for debugging logic errors</li>
        </ul>
        
        <p>Many programmers use both tools together, starting with flowcharts for overall design and then writing detailed pseudocode for implementation.</p>
      `
    }
  ],
  
  // Assessment questions
  assessments: [
    {
      type: "multiple-choice",
      question: "What is the main purpose of pseudocode?",
      options: [
        "To replace actual programming languages",
        "To plan and communicate algorithms before coding",
        "To make programs run faster",
        "To debug existing code"
      ],
      correct: 1,
      explanation: "Pseudocode is primarily used to plan and communicate algorithms in a human-readable format before implementing them in a specific programming language."
    },
    {
      type: "multiple-choice",
      question: "Which of the following is NOT a characteristic of pseudocode?",
      options: [
        "Language independent",
        "Uses strict syntax rules",
        "Easy to read",
        "Structured format"
      ],
      correct: 1,
      explanation: "Pseudocode is flexible and does not require strict syntax rules, unlike actual programming languages."
    },
    {
      type: "short-answer",
      question: "Write pseudocode for a program that calculates the area of a rectangle.",
      sampleAnswer: `BEGIN
    DISPLAY "Enter the length of the rectangle:"
    READ length
    DISPLAY "Enter the width of the rectangle:"
    READ width
    SET area = length * width
    DISPLAY "The area is: " + area
END`,
      rubric: [
        "Uses BEGIN and END keywords",
        "Includes input statements (READ)",
        "Includes output statements (DISPLAY)",
        "Correctly calculates area (length * width)",
        "Uses proper variable names"
      ]
    },
    {
      type: "true-false",
      question: "Pseudocode must follow the exact syntax of a programming language.",
      correct: false,
      explanation: "Pseudocode is language-independent and uses natural language constructs rather than strict programming syntax."
    }
  ],
  
  // Additional practice exercises
  // Fun Practice Activities! 🎮
  practiceExercises: [
    {
      title: "Hot or Cold Weather Helper 🌡️",
      description: "Write instructions to help decide what to wear based on the temperature outside!",
      difficulty: "easy",
      hints: ["Ask what the temperature is", "If it's hot (above 75), suggest shorts and t-shirt", "If it's cold (below 50), suggest jacket and pants"]
    },
    {
      title: "Magical Number Guessing Game 🎯",
      description: "Write instructions for a fun guessing game where you think of a number and a friend tries to guess it!",
      difficulty: "easy",
      hints: ["Think of a secret number between 1 and 10", "Let your friend guess", "Tell them if their guess is too high, too low, or just right!"]
    },
    {
      title: "Super Student Sticker Chart 🌟",
      description: "Write instructions to count up stickers and give out special rewards!",
      difficulty: "medium",
      hints: ["Count how many stickers someone has", "If they have 10 or more, they get a special prize", "If they have 5-9, they get a good job sticker"]
    }
  ],
  
  // Key terms and vocabulary
  // Cool Words to Learn! 📚
  vocabulary: [
    {
      term: "Instructions (Algorithm)",
      definition: "A list of steps that tells you exactly how to do something, like a recipe for cookies!"
    },
    {
      term: "Computer Instructions (Pseudocode)",
      definition: "Special instructions written in words that both people and computers can understand"
    },
    {
      term: "Making Choices (Control Structure)",
      definition: "Parts of instructions that help decide what to do next, like choosing which game to play"
    },
    {
      term: "Memory Box (Variable)",
      definition: "A special box where we can store information, like your name or favorite number"
    },
    {
      term: "If-Then Choices (Conditional Statement)",
      definition: "Instructions that say 'if this happens, then do that' - like 'if it rains, then take an umbrella'"
    }
  ],
  
  // Prerequisites and next steps
  // What You Should Know First 🤔
  prerequisites: [
    "Know how to follow step-by-step directions (like a recipe or game rules)",
    "Understand simple 'if-then' thinking (like 'if it's raining, then I need an umbrella')"
  ],
  
  // What's Next on Your Learning Adventure! 🚀
  nextSteps: [
    "Learn more about making smart choices in your instructions",
    "Discover different ways to repeat actions (like counting or searching)",
    "Try turning your instructions into real computer programs"
  ]
};