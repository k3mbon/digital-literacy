// Lesson 1.1: Pseudocode - Comprehensive lesson content

export default {
  title: "Pseudocode",
  description: "Learn the fundamentals of pseudocode and algorithmic thinking",
  difficulty: "beginner",
  estimatedTime: "45 minutes",
  
  // Learning objectives
  objectives: [
    "Understand what pseudocode is and its purpose",
    "Learn common pseudocode conventions and structures",
    "Write basic pseudocode for simple algorithms",
    "Translate pseudocode into flowcharts and vice versa",
    "Apply pseudocode to solve real-world problems"
  ],
  
  // Main lesson content
  content: `
    <h2>What is Pseudocode?</h2>
    <p><strong>Pseudocode</strong> is a high-level description of a computer program's logic that uses natural language mixed with programming concepts. It serves as a bridge between human thinking and actual code implementation, making it easier to plan and communicate algorithms before writing them in a specific programming language.</p>
    
    <h3>Key Characteristics of Pseudocode:</h3>
    <ul>
      <li><strong>Language Independent:</strong> Not tied to any specific programming language</li>
      <li><strong>Easy to Read:</strong> Uses natural language constructs</li>
      <li><strong>Structured:</strong> Follows logical programming structures</li>
      <li><strong>Detailed:</strong> More detailed than flowcharts but less detailed than actual code</li>
      <li><strong>Flexible:</strong> No strict syntax rules to follow</li>
    </ul>
    
    <h2>Benefits of Using Pseudocode</h2>
    
    <h3>1. Planning and Design</h3>
    <p>Pseudocode helps programmers think through the logic of their programs before diving into actual coding. This planning phase can save significant time and reduce errors in the final implementation.</p>
    
    <h3>2. Communication</h3>
    <p>It serves as an excellent communication tool between team members, allowing developers to discuss algorithms and logic without getting bogged down in syntax details.</p>
    
    <h3>3. Documentation</h3>
    <p>Pseudocode can serve as documentation for complex algorithms, making it easier for others (or yourself in the future) to understand the program's logic.</p>
    
    <h3>4. Language Translation</h3>
    <p>Once you have pseudocode, it's easier to translate it into any programming language, making your algorithms more portable.</p>
    
    <h2>Common Pseudocode Conventions</h2>
    
    <h3>1. Control Structures</h3>
    
    <h4>Sequential Operations:</h4>
    <pre><code>BEGIN
    READ user_input
    calculate result = user_input * 2
    display result
END</code></pre>
    
    <h4>Conditional Statements:</h4>
    <pre><code>IF condition THEN
    statement1
ELSE
    statement2
ENDIF

// Example:
IF age >= 18 THEN
    display "You can vote"
ELSE
    display "You cannot vote yet"
ENDIF</code></pre>
    
    <h4>Loops:</h4>
    <pre><code>// For Loop
FOR counter = 1 TO 10
    display counter
ENDFOR

// While Loop
WHILE condition IS TRUE
    statement
ENDWHILE

// Example
WHILE password IS NOT CORRECT
    read password
    IF attempts > 3 THEN
        display "Account locked"
        exit
    ENDIF
ENDWHILE</code></pre>
    
    <h3>2. Data Operations</h3>
    
    <h4>Variable Assignment:</h4>
    <pre><code>SET variable_name = value
SET total = 0
SET name = "John Doe"
SET is_valid = TRUE</code></pre>
    
    <h4>Input and Output:</h4>
    <pre><code>READ variable_name
DISPLAY message
PRINT result

// Examples
READ user_age
DISPLAY "Welcome to our program"
PRINT "Your age is: " + user_age</code></pre>
    
    <h2>Real-World Examples</h2>
    
    <h3>Example 1: Simple Calculator</h3>
    <pre><code>BEGIN Calculator
    DISPLAY "Simple Calculator"
    READ first_number
    read operation (+, -, *, /)
    read second_number
    
    IF operation = "+" THEN
        result = first_number + second_number
    ELSE IF operation = "-" THEN
        result = first_number - second_number
    ELSE IF operation = "*" THEN
        result = first_number * second_number
    ELSE IF operation = "/" THEN
        IF second_number ≠ 0 THEN
            result = first_number / second_number
        ELSE
            display "Error: Division by zero"
            exit
        ENDIF
    ELSE
        display "Error: Invalid operation"
        exit
    ENDIF
    
    display "Result: " + result
END</code></pre>
    
    <h3>Example 2: Grade Classification</h3>
    <pre><code>BEGIN Grade_Classifier
    read student_score
    
    IF student_score >= 90 THEN
        grade = "A"
    ELSE IF student_score >= 80 THEN
        grade = "B"
    ELSE IF student_score >= 70 THEN
        grade = "C"
    ELSE IF student_score >= 60 THEN
        grade = "D"
    ELSE
        grade = "F"
    ENDIF
    
    display "Your grade is: " + grade
END</code></pre>
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
  practiceExercises: [
    {
      title: "Temperature Converter",
      description: "Write pseudocode for a program that converts Celsius to Fahrenheit.",
      difficulty: "easy",
      hints: ["Formula: F = (C * 9/5) + 32", "Don't forget to get input from the user", "Display the result clearly"]
    },
    {
      title: "Number Guessing Game",
      description: "Write pseudocode for a simple number guessing game where the computer picks a random number and the user tries to guess it.",
      difficulty: "medium",
      hints: ["Use a loop for multiple guesses", "Provide feedback (too high/too low)", "Count the number of attempts"]
    },
    {
      title: "Student Grade Average",
      description: "Write pseudocode that calculates the average of multiple test scores and determines the letter grade.",
      difficulty: "medium",
      hints: ["Use a loop to input multiple scores", "Calculate average = total / count", "Use conditional statements for grade assignment"]
    }
  ],
  
  // Key terms and vocabulary
  vocabulary: [
    {
      term: "Algorithm",
      definition: "A step-by-step procedure for solving a problem or completing a task"
    },
    {
      term: "Pseudocode",
      definition: "A high-level description of a program's logic using natural language and programming concepts"
    },
    {
      term: "Control Structure",
      definition: "Programming constructs that control the flow of execution (if-then, loops, etc.)"
    },
    {
      term: "Variable",
      definition: "A named storage location that holds data that can change during program execution"
    },
    {
      term: "Conditional Statement",
      definition: "A programming construct that performs different actions based on whether a condition is true or false"
    }
  ],
  
  // Prerequisites and next steps
  prerequisites: [
    "Basic understanding of problem-solving",
    "Familiarity with logical thinking"
  ],
  
  nextSteps: [
    "Learn about selection statements (IF-THEN-ELSE)",
    "Explore different types of loops",
    "Practice converting pseudocode to actual programming languages"
  ]
};