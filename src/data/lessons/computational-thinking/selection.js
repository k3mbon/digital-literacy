// Lesson 1.2: Selection - Comprehensive lesson content

export default {
  title: "Selection",
  description: "Master conditional logic and decision-making in programming",
  difficulty: "beginner",
  estimatedTime: "50 minutes",
  
  // Learning objectives
  objectives: [
    "Understand the concept of selection in programming",
    "Learn different types of conditional statements",
    "Master boolean logic and comparison operators",
    "Apply nested conditions and complex logic",
    "Solve real-world problems using selection structures"
  ],
  
  // Main lesson content
  content: `
    <h2>What is Selection?</h2>
    <p><strong>Selection</strong> is a fundamental programming concept that allows programs to make decisions and execute different code paths based on specific conditions. It's like a fork in the road where the program chooses which direction to take based on the current situation.</p>
    
    <p>Selection statements enable programs to:</p>
    <ul>
      <li>Respond to user input</li>
      <li>Handle different scenarios</li>
      <li>Validate data</li>
      <li>Control program flow</li>
      <li>Make intelligent decisions</li>
    </ul>
    
    <h2>Types of Selection Statements</h2>
    
    <h3>1. Simple IF Statement</h3>
    <p>The most basic form of selection that executes code only when a condition is true.</p>
    
    <pre><code>IF condition THEN
    // Code to execute when condition is true
ENDIF

// Example:
IF temperature > 30 THEN
    DISPLAY "It's hot today!"
ENDIF</code></pre>
    
    <h3>2. IF-ELSE Statement</h3>
    <p>Provides an alternative path when the condition is false.</p>
    
    <pre><code>IF condition THEN
    // Code when condition is true
ELSE
    // Code when condition is false
ENDIF

// Example:
IF age >= 18 THEN
    DISPLAY "You are eligible to vote"
ELSE
    DISPLAY "You are not old enough to vote"
ENDIF</code></pre>
    
    <h3>3. IF-ELSE IF-ELSE Statement</h3>
    <p>Allows multiple conditions to be tested in sequence.</p>
    
    <pre><code>IF condition1 THEN
    // Code for condition1
ELSE IF condition2 THEN
    // Code for condition2
ELSE IF condition3 THEN
    // Code for condition3
ELSE
    // Default code
ENDIF

// Example:
IF score >= 90 THEN
    grade = "A"
ELSE IF score >= 80 THEN
    grade = "B"
ELSE IF score >= 70 THEN
    grade = "C"
ELSE IF score >= 60 THEN
    grade = "D"
ELSE
    grade = "F"
ENDIF</code></pre>
    
    <h2>Boolean Logic and Operators</h2>
    
    <h3>Comparison Operators</h3>
    <table border="1" style="border-collapse: collapse; width: 100%;">
      <tr>
        <th>Operator</th>
        <th>Meaning</th>
        <th>Example</th>
      </tr>
      <tr>
        <td>=</td>
        <td>Equal to</td>
        <td>age = 18</td>
      </tr>
      <tr>
        <td>≠ or !=</td>
        <td>Not equal to</td>
        <td>name ≠ "John"</td>
      </tr>
      <tr>
        <td>&gt;</td>
        <td>Greater than</td>
        <td>score &gt; 85</td>
      </tr>
      <tr>
        <td>&lt;</td>
        <td>Less than</td>
        <td>temperature &lt; 0</td>
      </tr>
      <tr>
        <td>&gt;=</td>
        <td>Greater than or equal</td>
        <td>height &gt;= 150</td>
      </tr>
      <tr>
        <td>&lt;=</td>
        <td>Less than or equal</td>
        <td>weight &lt;= 70</td>
      </tr>
    </table>
    
    <h3>Logical Operators</h3>
    <table border="1" style="border-collapse: collapse; width: 100%;">
      <tr>
        <th>Operator</th>
        <th>Meaning</th>
        <th>Example</th>
        <th>Result</th>
      </tr>
      <tr>
        <td>AND</td>
        <td>Both conditions must be true</td>
        <td>age >= 18 AND has_license = true</td>
        <td>True only if both are true</td>
      </tr>
      <tr>
        <td>OR</td>
        <td>At least one condition must be true</td>
        <td>day = "Saturday" OR day = "Sunday"</td>
        <td>True if either is true</td>
      </tr>
      <tr>
        <td>NOT</td>
        <td>Reverses the condition</td>
        <td>NOT is_raining</td>
        <td>True if is_raining is false</td>
      </tr>
    </table>
    
    <h2>Nested Selection</h2>
    <p>Selection statements can be placed inside other selection statements to create more complex decision-making logic.</p>
    
    <pre><code>IF weather = "sunny" THEN
    IF temperature > 25 THEN
        DISPLAY "Perfect day for swimming!"
    ELSE
        DISPLAY "Nice day for a walk"
    ENDIF
ELSE IF weather = "rainy" THEN
    IF temperature < 10 THEN
        DISPLAY "Stay inside, it's cold and wet"
    ELSE
        DISPLAY "Good day for indoor activities"
    ENDIF
ELSE
    DISPLAY "Check the weather forecast"
ENDIF</code></pre>
    
    <h2>Real-World Examples</h2>
    
    <h3>Example 1: ATM Withdrawal System</h3>
    <pre><code>BEGIN ATM_Withdrawal
    READ account_balance
    READ withdrawal_amount
    READ pin_entered
    
    IF pin_entered = correct_pin THEN
        IF withdrawal_amount <= account_balance THEN
            IF withdrawal_amount <= daily_limit THEN
                new_balance = account_balance - withdrawal_amount
                DISPLAY "Transaction successful"
                DISPLAY "New balance: " + new_balance
                DISPENSE cash
            ELSE
                DISPLAY "Exceeds daily withdrawal limit"
            ENDIF
        ELSE
            DISPLAY "Insufficient funds"
        ENDIF
    ELSE
        DISPLAY "Incorrect PIN"
        INCREMENT failed_attempts
        IF failed_attempts >= 3 THEN
            DISPLAY "Card blocked for security"
            BLOCK card
        ENDIF
    ENDIF
END</code></pre>
    
    <h3>Example 2: Student Admission System</h3>
    <pre><code>BEGIN Student_Admission
    READ gpa
    read sat_score
    read extracurricular_activities
    read essay_score
    
    IF gpa >= 3.8 AND sat_score >= 1400 THEN
        admission_status = "Accepted"
        IF gpa >= 3.9 AND sat_score >= 1500 THEN
            scholarship = "Full Scholarship"
        ELSE IF gpa >= 3.85 OR sat_score >= 1450 THEN
            scholarship = "Partial Scholarship"
        ELSE
            scholarship = "No Scholarship"
        ENDIF
    ELSE IF gpa >= 3.5 AND sat_score >= 1200 THEN
        IF extracurricular_activities >= 3 AND essay_score >= 8 THEN
            admission_status = "Accepted"
            scholarship = "Merit Scholarship"
        ELSE
            admission_status = "Waitlisted"
            scholarship = "None"
        ENDIF
    ELSE
        admission_status = "Rejected"
        scholarship = "None"
    ENDIF
    
    DISPLAY "Admission Status: " + admission_status
    DISPLAY "Scholarship: " + scholarship
END</code></pre>
    
    <h2>Common Mistakes and Best Practices</h2>
    
    <h3>Common Mistakes:</h3>
    <ul>
      <li><strong>Missing ENDIF:</strong> Always close your IF statements</li>
      <li><strong>Incorrect operator precedence:</strong> Use parentheses for clarity</li>
      <li><strong>Confusing = and ==:</strong> Remember = is assignment, == is comparison</li>
      <li><strong>Unreachable code:</strong> Ensure all conditions can be met</li>
      <li><strong>Too many nested levels:</strong> Keep nesting reasonable for readability</li>
    </ul>
    
    <h3>Best Practices:</h3>
    <ul>
      <li><strong>Use meaningful variable names:</strong> is_valid instead of x</li>
      <li><strong>Keep conditions simple:</strong> Break complex conditions into smaller parts</li>
      <li><strong>Use proper indentation:</strong> Makes code structure clear</li>
      <li><strong>Consider all cases:</strong> Include ELSE for unexpected situations</li>
      <li><strong>Test edge cases:</strong> What happens with boundary values?</li>
    </ul>
  `,
  
  // Interactive elements and activities
  interactiveElements: [
    {
      type: "flowchart-builder",
      title: "Build a Decision Flowchart",
      description: "Create a flowchart for determining if a student passes a course based on their grades.",
      scenario: "A student passes if their average is >= 60 AND they have no more than 3 absences.",
      elements: [
        { type: "start", text: "Start" },
        { type: "input", text: "Get average grade" },
        { type: "input", text: "Get number of absences" },
        { type: "decision", text: "Average >= 60?" },
        { type: "decision", text: "Absences <= 3?" },
        { type: "process", text: "Student passes" },
        { type: "process", text: "Student fails" },
        { type: "end", text: "End" }
      ]
    },
    {
      type: "code-completion",
      title: "Complete the Selection Logic",
      description: "Fill in the missing parts of this pseudocode for a simple calculator.",
      code: `BEGIN Calculator
    READ first_number
    READ operator
    READ second_number
    
    IF operator = "+" THEN
        result = ___________
    ELSE IF operator = "-" THEN
        result = ___________
    ELSE IF operator = "*" THEN
        result = ___________
    ELSE IF operator = "/" THEN
        IF ___________ THEN
            result = first_number / second_number
        ELSE
            DISPLAY "___________"
        ENDIF
    ELSE
        DISPLAY "___________"
    ENDIF
    
    DISPLAY "Result: " + result
END`,
      blanks: [
        { id: 1, answer: "first_number + second_number" },
        { id: 2, answer: "first_number - second_number" },
        { id: 3, answer: "first_number * second_number" },
        { id: 4, answer: "second_number ≠ 0" },
        { id: 5, answer: "Error: Division by zero" },
        { id: 6, answer: "Error: Invalid operator" }
      ]
    },
    {
      type: "logic-puzzle",
      title: "Boolean Logic Challenge",
      description: "Determine the output of these boolean expressions.",
      problems: [
        {
          expression: "(5 > 3) AND (2 < 4)",
          options: ["True", "False"],
          correct: "True",
          explanation: "Both conditions are true: 5 > 3 is true, 2 < 4 is true, so True AND True = True"
        },
        {
          expression: "(10 = 10) OR (7 > 8)",
          options: ["True", "False"],
          correct: "True",
          explanation: "First condition is true: 10 = 10 is true, 7 > 8 is false, so True OR False = True"
        },
        {
          expression: "NOT (3 < 2)",
          options: ["True", "False"],
          correct: "True",
          explanation: "3 < 2 is false, so NOT False = True"
        },
        {
          expression: "(age >= 18) AND (has_license = true) where age = 20, has_license = false",
          options: ["True", "False"],
          correct: "False",
          explanation: "First condition is true (20 >= 18), second is false, so True AND False = False"
        }
      ]
    }
  ],
  
  // Reading materials and resources
  readings: [
    {
      title: "The Psychology of Decision Making in Programming",
      content: `
        <p>Understanding how humans make decisions can help us write better conditional logic in our programs. Cognitive scientists have identified several patterns in human decision-making that we can apply to programming:</p>
        
        <h4>1. Decision Trees</h4>
        <p>Humans naturally think in terms of decision trees - a series of yes/no questions that lead to conclusions. This maps perfectly to IF-ELSE structures in programming.</p>
        
        <h4>2. Heuristics</h4>
        <p>People use mental shortcuts (heuristics) to make quick decisions. In programming, we can implement similar shortcuts using early returns or guard clauses.</p>
        
        <h4>3. Cognitive Load</h4>
        <p>Too many nested conditions can overwhelm both programmers and users. Research suggests keeping decision structures as simple as possible - ideally no more than 3-4 levels deep.</p>
        
        <h4>4. Default Behaviors</h4>
        <p>Having sensible defaults (ELSE clauses) reduces cognitive burden and makes programs more robust, just as humans rely on default behaviors in uncertain situations.</p>
      `
    },
    {
      title: "Selection in Different Programming Paradigms",
      content: `
        <p>While we focus on procedural selection statements, different programming paradigms handle decision-making in various ways:</p>
        
        <h4>Functional Programming</h4>
        <p>Uses pattern matching and guard clauses instead of traditional IF statements. This approach can be more expressive and less error-prone.</p>
        
        <h4>Object-Oriented Programming</h4>
        <p>Often uses polymorphism to replace complex conditional logic. Instead of checking object types, different objects respond to the same message differently.</p>
        
        <h4>Logic Programming</h4>
        <p>Uses rules and facts to make decisions automatically. The system determines which conditions apply based on the current state.</p>
        
        <p>Understanding these different approaches helps you choose the right tool for each situation and write more maintainable code.</p>
      `
    }
  ],
  
  // Assessment questions
  assessments: [
    {
      type: "multiple-choice",
      question: "What will be displayed if x = 5 and y = 10 in this pseudocode?\n\nIF x > y THEN\n    DISPLAY 'A'\nELSE IF x < y THEN\n    DISPLAY 'B'\nELSE\n    DISPLAY 'C'\nENDIF",
      options: ["A", "B", "C", "Nothing"],
      correct: 1,
      explanation: "Since x (5) is less than y (10), the condition x < y is true, so 'B' will be displayed."
    },
    {
      type: "multiple-choice",
      question: "Which logical operator would you use to check if a number is between 10 and 20 (inclusive)?",
      options: [
        "number > 10 OR number < 20",
        "number >= 10 AND number <= 20",
        "number = 10 OR number = 20",
        "NOT (number < 10 OR number > 20)"
      ],
      correct: 1,
      explanation: "To check if a number is between 10 and 20 inclusive, both conditions must be true: the number must be greater than or equal to 10 AND less than or equal to 20."
    },
    {
      type: "code-analysis",
      question: "Analyze this pseudocode and identify what's wrong:\n\nIF temperature > 30 THEN\n    DISPLAY 'Hot'\nIF temperature > 20 THEN\n    DISPLAY 'Warm'\nIF temperature > 10 THEN\n    DISPLAY 'Cool'\nELSE\n    DISPLAY 'Cold'\nENDIF",
      options: [
        "Nothing is wrong",
        "Missing ENDIF statements",
        "Should use ELSE IF instead of separate IF statements",
        "Temperature comparisons are incorrect"
      ],
      correct: 2,
      explanation: "The code will display multiple messages for high temperatures. It should use ELSE IF to ensure only one message is displayed based on the temperature range."
    },
    {
      type: "short-answer",
      question: "Write pseudocode that determines if a year is a leap year. (A leap year is divisible by 4, except for years divisible by 100, unless they're also divisible by 400.)",
      sampleAnswer: `IF year MOD 400 = 0 THEN
    DISPLAY "Leap year"
ELSE IF year MOD 100 = 0 THEN
    DISPLAY "Not a leap year"
ELSE IF year MOD 4 = 0 THEN
    DISPLAY "Leap year"
ELSE
    DISPLAY "Not a leap year"
ENDIF`,
      rubric: [
        "Checks divisibility by 400 first",
        "Handles century years (divisible by 100)",
        "Checks divisibility by 4",
        "Uses proper IF-ELSE IF structure",
        "Provides output for all cases"
      ]
    }
  ],
  
  // Additional practice exercises
  practiceExercises: [
    {
      title: "Traffic Light Controller",
      description: "Write pseudocode for a traffic light system that changes lights based on time and traffic sensors.",
      difficulty: "medium",
      hints: ["Consider different scenarios: rush hour, late night, emergency vehicles", "Use nested conditions for complex logic", "Think about safety - what's the default behavior?"]
    },
    {
      title: "Online Shopping Discount Calculator",
      description: "Create pseudocode that calculates discounts based on: customer type (regular/premium), order amount, and current promotions.",
      difficulty: "medium",
      hints: ["Premium customers get 10% extra discount", "Orders over $100 get free shipping", "Stack multiple discounts appropriately"]
    },
    {
      title: "Password Strength Validator",
      description: "Write pseudocode that checks password strength based on length, character types, and common patterns.",
      difficulty: "hard",
      hints: ["Check for uppercase, lowercase, numbers, symbols", "Minimum length requirements", "Avoid common passwords or patterns"]
    }
  ],
  
  // Key terms and vocabulary
  vocabulary: [
    {
      term: "Boolean Expression",
      definition: "An expression that evaluates to either true or false"
    },
    {
      term: "Conditional Statement",
      definition: "A programming construct that executes different code based on whether a condition is true or false"
    },
    {
      term: "Logical Operator",
      definition: "Operators (AND, OR, NOT) used to combine or modify boolean expressions"
    },
    {
      term: "Nested Selection",
      definition: "Placing one selection statement inside another to create more complex decision logic"
    },
    {
      term: "Guard Clause",
      definition: "A conditional statement that handles special cases early to simplify the main logic"
    }
  ],
  
  // Prerequisites and next steps
  prerequisites: [
    "Understanding of pseudocode basics",
    "Familiarity with variables and data types",
    "Basic mathematical comparison concepts"
  ],
  
  nextSteps: [
    "Learn about iteration and loops",
    "Explore switch/case statements",
    "Study algorithm design patterns",
    "Practice with complex nested conditions"
  ]
};