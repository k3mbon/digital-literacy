// Lesson 1.5: Iteration - Comprehensive lesson content

export default {
  title: "Iteration",
  description: "Master loops and repetitive structures for efficient programming solutions",
  difficulty: "beginner",
  estimatedTime: "55 minutes",
  
  // Learning objectives
  objectives: [
    "Understand the concept of iteration in programming",
    "Learn different types of loops: FOR, WHILE, and DO-WHILE",
    "Master loop control structures and nested loops",
    "Apply iteration to solve repetitive tasks efficiently",
    "Recognize and avoid infinite loops and common pitfalls"
  ],
  
  // Main lesson content
  content: `
    <h2>What is Iteration?</h2>
    <p><strong>Iteration</strong> is the process of repeating a set of instructions until a specific condition is met. It's one of the fundamental control structures in programming, allowing us to perform repetitive tasks efficiently without writing the same code multiple times.</p>
    
    <p>Iteration is essential because:</p>
    <ul>
      <li><strong>Eliminates code repetition:</strong> Write once, execute many times</li>
      <li><strong>Handles unknown quantities:</strong> Process data of varying sizes</li>
      <li><strong>Enables automation:</strong> Perform repetitive tasks automatically</li>
      <li><strong>Improves efficiency:</strong> Reduces code length and maintenance</li>
      <li><strong>Enables data processing:</strong> Work with collections and datasets</li>
    </ul>
    
    <h2>Types of Loops</h2>
    
    <h3>1. FOR Loop</h3>
    <p>A FOR loop is used when you know in advance how many times you want to repeat a block of code. It's perfect for counting and iterating through collections.</p>
    
    <h4>FOR Loop Structure:</h4>
    <pre><code>FOR variable = start_value TO end_value STEP increment
    // Code to repeat
ENDFOR</code></pre>
    
    <h4>Basic FOR Loop Examples:</h4>
    <pre><code>// Count from 1 to 10
FOR i = 1 TO 10
    DISPLAY i
ENDFOR

// Count backwards from 10 to 1
FOR i = 10 TO 1 STEP -1
    DISPLAY i
ENDFOR

// Count by 2s from 0 to 20
FOR i = 0 TO 20 STEP 2
    DISPLAY i
ENDFOR</code></pre>
    
    <h4>FOR Loop with Arrays:</h4>
    <pre><code>BEGIN Process_Array
    SET numbers = [10, 20, 30, 40, 50]
    SET sum = 0
    
    FOR i = 0 TO 4
        SET sum = sum + numbers[i]
        DISPLAY "Adding " + numbers[i] + ", sum is now " + sum
    ENDFOR
    
    DISPLAY "Total sum: " + sum
END</code></pre>
    
    <h3>2. WHILE Loop</h3>
    <p>A WHILE loop repeats a block of code as long as a specified condition remains true. It's used when you don't know exactly how many iterations you'll need.</p>
    
    <h4>WHILE Loop Structure:</h4>
    <pre><code>WHILE condition IS TRUE
    // Code to repeat
    // Must include something that changes the condition
ENDWHILE</code></pre>
    
    <h4>WHILE Loop Examples:</h4>
    <pre><code>// Count from 1 to 10 using WHILE
SET counter = 1
WHILE counter <= 10
    DISPLAY counter
    SET counter = counter + 1
ENDWHILE

// Input validation
SET password = ""
WHILE password ≠ "secret123"
    DISPLAY "Enter password: "
    READ password
    IF password ≠ "secret123" THEN
        DISPLAY "Incorrect password, try again"
    ENDIF
ENDWHILE
DISPLAY "Access granted!"</code></pre>
    
    <h4>WHILE Loop for Unknown Data Size:</h4>
    <pre><code>BEGIN Calculate_Average
    SET sum = 0
    SET count = 0
    SET number = 0
    
    DISPLAY "Enter numbers (enter -1 to stop):"
    read number
    
    WHILE number ≠ -1
        SET sum = sum + number
        SET count = count + 1
        read number
    ENDWHILE
    
    IF count > 0 THEN
        SET average = sum / count
        DISPLAY "Average: " + average
    ELSE
        DISPLAY "No numbers entered"
    ENDIF
END</code></pre>
    
    <h3>3. DO-WHILE Loop</h3>
    <p>A DO-WHILE loop is similar to a WHILE loop, but it checks the condition after executing the code block, guaranteeing at least one execution.</p>
    
    <h4>DO-WHILE Loop Structure:</h4>
    <pre><code>DO
    // Code to repeat
WHILE condition IS TRUE</code></pre>
    
    <h4>DO-WHILE Loop Example:</h4>
    <pre><code>// Menu system that runs at least once
SET choice = 0
DO
    DISPLAY "=== MENU ==="
    DISPLAY "1. View Profile"
    DISPLAY "2. Edit Settings"
    DISPLAY "3. Exit"
    DISPLAY "Enter choice: "
    read choice
    
    IF choice = 1 THEN
        DISPLAY "Viewing profile..."
    ELSE IF choice = 2 THEN
        DISPLAY "Editing settings..."
    ELSE IF choice ≠ 3 THEN
        DISPLAY "Invalid choice, please try again"
    ENDIF
WHILE choice ≠ 3

DISPLAY "Goodbye!"</code></pre>
    
    <h2>Loop Control Statements</h2>
    
    <h3>1. BREAK Statement</h3>
    <p>BREAK immediately exits the current loop, regardless of the loop condition.</p>
    
    <pre><code>// Find first even number in array
SET numbers = [1, 3, 7, 8, 9, 12, 15]
SET found_even = FALSE

FOR i = 0 TO 6
    IF numbers[i] MOD 2 = 0 THEN
        DISPLAY "First even number: " + numbers[i]
        SET found_even = TRUE
        BREAK  // Exit loop immediately
    ENDIF
ENDFOR

IF NOT found_even THEN
    DISPLAY "No even numbers found"
ENDIF</code></pre>
    
    <h3>2. CONTINUE Statement</h3>
    <p>CONTINUE skips the rest of the current iteration and moves to the next iteration.</p>
    
    <pre><code>// Print only positive numbers
SET numbers = [-2, 5, -1, 8, 0, 3, -4]

FOR i = 0 TO 6
    IF numbers[i] <= 0 THEN
        CONTINUE  // Skip negative and zero
    ENDIF
    DISPLAY "Positive number: " + numbers[i]
ENDFOR</code></pre>
    
    <h2>Nested Loops</h2>
    <p>Loops can be placed inside other loops to handle multi-dimensional problems or complex iterations.</p>
    
    <h3>Multiplication Table Example:</h3>
    <pre><code>BEGIN Multiplication_Table
    DISPLAY "Multiplication Table (1-10):"
    
    FOR row = 1 TO 10
        FOR col = 1 TO 10
            SET product = row * col
            DISPLAY product + "\t"  // Tab for formatting
        ENDFOR
        DISPLAY "\n"  // New line after each row
    ENDFOR
END</code></pre>
    
    <h3>2D Array Processing:</h3>
    <pre><code>BEGIN Process_Matrix
    SET matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
    SET sum = 0
    
    FOR row = 0 TO 2
        FOR col = 0 TO 2
            SET sum = sum + matrix[row][col]
            DISPLAY "Element at [" + row + "][" + col + "] = " + matrix[row][col]
        ENDFOR
    ENDFOR
    
    DISPLAY "Sum of all elements: " + sum
END</code></pre>
    
    <h2>Common Loop Patterns</h2>
    
    <h3>1. Accumulator Pattern</h3>
    <p>Building up a result by processing each item in a collection.</p>
    
    <pre><code>// Calculate factorial
BEGIN Calculate_Factorial
    read n
    SET factorial = 1
    
    FOR i = 1 TO n
        SET factorial = factorial * i
    ENDFOR
    
    DISPLAY n + "! = " + factorial
END</code></pre>
    
    <h3>2. Counter Pattern</h3>
    <p>Counting items that meet specific criteria.</p>
    
    <pre><code>// Count vowels in a string
BEGIN Count_Vowels
    read text
    SET vowel_count = 0
    SET vowels = "aeiouAEIOU"
    
    FOR i = 0 TO length(text) - 1
        IF vowels CONTAINS text[i] THEN
            SET vowel_count = vowel_count + 1
        ENDIF
    ENDFOR
    
    DISPLAY "Number of vowels: " + vowel_count
END</code></pre>
    
    <h3>3. Search Pattern</h3>
    <p>Looking for specific items in a collection.</p>
    
    <pre><code>// Find student by ID
BEGIN Find_Student
    SET students = ["Alice", "Bob", "Charlie", "Diana"]
    SET student_ids = [101, 102, 103, 104]
    read target_id
    SET found = FALSE
    
    FOR i = 0 TO 3
        IF student_ids[i] = target_id THEN
            DISPLAY "Student found: " + students[i]
            SET found = TRUE
            BREAK
        ENDIF
    ENDFOR
    
    IF NOT found THEN
        DISPLAY "Student not found"
    ENDIF
END</code></pre>
    
    <h2>Loop Optimization and Best Practices</h2>
    
    <h3>1. Avoid Infinite Loops</h3>
    <p>Always ensure your loop condition will eventually become false.</p>
    
    <pre><code>// BAD - Infinite loop
SET i = 1
WHILE i > 0
    DISPLAY i
    SET i = i + 1  // i will never be <= 0
ENDWHILE

// GOOD - Proper termination
SET i = 1
WHILE i <= 10
    DISPLAY i
    SET i = i + 1  // i will eventually be > 10
ENDWHILE</code></pre>
    
    <h3>2. Minimize Work Inside Loops</h3>
    <p>Move calculations that don't change outside the loop.</p>
    
    <pre><code>// INEFFICIENT
FOR i = 0 TO 999
    SET expensive_calculation = complex_function()  // Calculated 1000 times
    DISPLAY i * expensive_calculation
ENDFOR

// EFFICIENT
SET expensive_calculation = complex_function()  // Calculated once
FOR i = 0 TO 999
    DISPLAY i * expensive_calculation
ENDFOR</code></pre>
    
    <h3>3. Use Appropriate Loop Type</h3>
    <ul>
      <li><strong>FOR:</strong> When you know the number of iterations</li>
      <li><strong>WHILE:</strong> When the condition might be false from the start</li>
      <li><strong>DO-WHILE:</strong> When you need at least one execution</li>
    </ul>
    
    <h2>Real-World Applications</h2>
    
    <h3>1. Data Processing System</h3>
    <pre><code>BEGIN Process_Sales_Data
    SET sales_file = open("daily_sales.txt")
    SET total_sales = 0
    SET transaction_count = 0
    SET max_sale = 0
    
    WHILE NOT end_of_file(sales_file)
        read sale_amount FROM sales_file
        
        IF sale_amount > 0 THEN
            SET total_sales = total_sales + sale_amount
            SET transaction_count = transaction_count + 1
            
            IF sale_amount > max_sale THEN
                SET max_sale = sale_amount
            ENDIF
        ENDIF
    ENDWHILE
    
    close(sales_file)
    
    IF transaction_count > 0 THEN
        SET average_sale = total_sales / transaction_count
        DISPLAY "Total Sales: $" + total_sales
        DISPLAY "Average Sale: $" + average_sale
        DISPLAY "Largest Sale: $" + max_sale
        DISPLAY "Number of Transactions: " + transaction_count
    ELSE
        DISPLAY "No valid sales data found"
    ENDIF
END</code></pre>
    
    <h3>2. Game Development - Animation Loop</h3>
    <pre><code>BEGIN Game_Animation_Loop
    SET game_running = TRUE
    SET frame_count = 0
    SET player_x = 100
    SET player_y = 200
    
    WHILE game_running
        // Handle input
        IF key_pressed("LEFT") THEN
            SET player_x = player_x - 5
        ELSE IF key_pressed("RIGHT") THEN
            SET player_x = player_x + 5
        ELSE IF key_pressed("ESC") THEN
            SET game_running = FALSE
        ENDIF
        
        // Update game objects
        FOR each enemy IN enemy_list
            update_enemy_position(enemy)
            IF collision(player, enemy) THEN
                handle_collision()
            ENDIF
        ENDFOR
        
        // Render frame
        clear_screen()
        draw_player(player_x, player_y)
        draw_enemies(enemy_list)
        display_frame()
        
        SET frame_count = frame_count + 1
        wait(16)  // ~60 FPS
    ENDWHILE
    
    DISPLAY "Game ended after " + frame_count + " frames"
END</code></pre>
  `,
  
  // Interactive elements and activities
  interactiveElements: [
    {
      type: "loop-builder",
      title: "Build the Perfect Loop",
      description: "Choose the right loop type and structure for different scenarios.",
      scenarios: [
        {
          problem: "Print numbers 1 to 100",
          options: ["FOR", "WHILE", "DO-WHILE"],
          correct: "FOR",
          explanation: "FOR loop is best when you know exactly how many iterations you need."
        },
        {
          problem: "Keep asking for password until correct",
          options: ["FOR", "WHILE", "DO-WHILE"],
          correct: "DO-WHILE",
          explanation: "DO-WHILE ensures the password prompt appears at least once."
        },
        {
          problem: "Process file until end of file",
          options: ["FOR", "WHILE", "DO-WHILE"],
          correct: "WHILE",
          explanation: "WHILE is perfect when you don't know how many iterations you'll need."
        }
      ]
    },
    {
      type: "loop-tracer",
      title: "Trace the Loop Execution",
      description: "Follow the execution of nested loops step by step.",
      code: `FOR i = 1 TO 3
    FOR j = 1 TO 2
        DISPLAY i + ", " + j
    ENDFOR
ENDFOR`,
      expectedOutput: ["1, 1", "1, 2", "2, 1", "2, 2", "3, 1", "3, 2"],
      showVariables: true
    },
    {
      type: "infinite-loop-detector",
      title: "Spot the Infinite Loop",
      description: "Identify which loops will run forever and fix them.",
      codeExamples: [
        {
          code: `SET i = 0
WHILE i < 10
    DISPLAY i
    SET i = i - 1
ENDWHILE`,
          isInfinite: true,
          fix: "Change 'i = i - 1' to 'i = i + 1'"
        },
        {
          code: `FOR i = 1 TO 5
    DISPLAY i
ENDFOR`,
          isInfinite: false,
          fix: "No fix needed - this loop terminates correctly"
        }
      ]
    },
    {
      type: "pattern-matching",
      title: "Loop Pattern Recognition",
      description: "Identify common loop patterns in code examples.",
      patterns: [
        { name: "Accumulator", description: "Building up a result" },
        { name: "Counter", description: "Counting items" },
        { name: "Search", description: "Finding specific items" },
        { name: "Filter", description: "Selecting items that meet criteria" }
      ],
      examples: [
        {
          code: `SET sum = 0
FOR i = 1 TO 10
    SET sum = sum + i
ENDFOR`,
          pattern: "Accumulator"
        },
        {
          code: `SET count = 0
FOR each item IN list
    IF item > 50 THEN
        SET count = count + 1
    ENDIF
ENDFOR`,
          pattern: "Counter"
        }
      ]
    }
  ],
  
  // Reading materials and resources
  readings: [
    {
      title: "The Psychology of Repetition in Programming",
      content: `
        <p>Understanding how humans naturally think about repetition can help us write better loops:</p>
        
        <h4>Cognitive Load and Loop Complexity</h4>
        <p>Research shows that humans can effectively track about 3-4 nested levels before cognitive overload occurs. This is why deeply nested loops become hard to understand and debug.</p>
        
        <h4>Pattern Recognition</h4>
        <p>Humans excel at recognizing patterns, which is why common loop patterns (accumulator, counter, search) are so intuitive once learned. These patterns become mental templates for solving similar problems.</p>
        
        <h4>Off-by-One Errors</h4>
        <p>The famous "off-by-one" error occurs because humans naturally count from 1, while computers often start from 0. Understanding this difference is crucial for writing correct loops.</p>
        
        <h4>Mental Models</h4>
        <p>Successful programmers develop mental models for different loop types: FOR loops as "counting machines," WHILE loops as "condition checkers," and DO-WHILE loops as "at-least-once executors."</p>
      `
    },
    {
      title: "Loop Optimization in Modern Computing",
      content: `
        <p>Modern computers and compilers have sophisticated ways of optimizing loops:</p>
        
        <h4>Loop Unrolling</h4>
        <p>Compilers sometimes "unroll" loops by duplicating the loop body multiple times to reduce the overhead of loop control instructions.</p>
        
        <h4>Vectorization</h4>
        <p>Modern processors can perform the same operation on multiple data elements simultaneously (SIMD - Single Instruction, Multiple Data), making certain loops much faster.</p>
        
        <h4>Cache Optimization</h4>
        <p>The order in which loops access memory can dramatically affect performance due to CPU cache behavior. Accessing data in sequential order is much faster than random access.</p>
        
        <h4>Parallel Processing</h4>
        <p>Some loops can be parallelized, where different iterations run simultaneously on multiple CPU cores, dramatically improving performance for large datasets.</p>
        
        <p>Understanding these concepts helps you write loops that not only work correctly but also perform efficiently.</p>
      `
    }
  ],
  
  // Assessment questions
  assessments: [
    {
      type: "multiple-choice",
      question: "Which loop type is most appropriate when you need to execute code at least once, regardless of the initial condition?",
      options: ["FOR loop", "WHILE loop", "DO-WHILE loop", "All are equivalent"],
      correct: 2,
      explanation: "DO-WHILE loop executes the code block first, then checks the condition, guaranteeing at least one execution."
    },
    {
      type: "code-analysis",
      question: "What will be the value of 'sum' after this loop completes?\n\nSET sum = 0\nFOR i = 2 TO 8 STEP 2\n    SET sum = sum + i\nENDFOR",
      options: ["12", "20", "30", "16"],
      correct: 1,
      explanation: "The loop adds 2 + 4 + 6 + 8 = 20. The loop runs with i = 2, 4, 6, 8."
    },
    {
      type: "debugging",
      question: "Fix this infinite loop:\n\nSET count = 10\nWHILE count > 0\n    DISPLAY count\n    SET count = count + 1\nENDWHILE",
      correctFix: "Change 'count = count + 1' to 'count = count - 1'",
      explanation: "The loop increments count instead of decrementing it, so count will never reach 0 or below."
    },
    {
      type: "trace-execution",
      question: "Trace through this nested loop and list all output:\n\nFOR x = 1 TO 2\n    FOR y = 3 TO 4\n        DISPLAY x + y\n    ENDFOR\nENDFOR",
      expectedOutput: ["4", "5", "5", "6"],
      explanation: "Outer loop: x=1,2. Inner loop: y=3,4. Output: 1+3=4, 1+4=5, 2+3=5, 2+4=6"
    },
    {
      type: "short-answer",
      question: "Write pseudocode for a loop that finds and displays the largest number in an array called 'numbers'.",
      sampleAnswer: `SET largest = numbers[0]
FOR i = 1 TO length(numbers) - 1
    IF numbers[i] > largest THEN
        SET largest = numbers[i]
    ENDIF
ENDFOR
DISPLAY "Largest number: " + largest`,
      rubric: [
        "Initializes largest with first element or appropriate value",
        "Uses correct loop bounds",
        "Compares each element with current largest",
        "Updates largest when a bigger number is found",
        "Displays the result"
      ]
    }
  ],
  
  // Additional practice exercises
  practiceExercises: [
    {
      title: "Password Strength Checker",
      description: "Create a program that repeatedly asks for a password until it meets strength requirements (length, uppercase, lowercase, numbers).",
      difficulty: "medium",
      hints: ["Use a WHILE or DO-WHILE loop", "Check each requirement separately", "Provide feedback on what's missing"]
    },
    {
      title: "Prime Number Generator",
      description: "Write pseudocode that finds and displays all prime numbers between 1 and 100 using nested loops.",
      difficulty: "medium",
      hints: ["Outer loop for each number to test", "Inner loop to check for divisors", "A number is prime if it has no divisors except 1 and itself"]
    },
    {
      title: "Text Analysis Tool",
      description: "Create a program that analyzes text input and counts words, sentences, paragraphs, and character frequency using various loop patterns.",
      difficulty: "hard",
      hints: ["Use different loop types for different counting tasks", "Consider using nested loops for character frequency", "Think about how to identify word and sentence boundaries"]
    }
  ],
  
  // Key terms and vocabulary
  vocabulary: [
    {
      term: "Iteration",
      definition: "The process of repeating a set of instructions until a specific condition is met"
    },
    {
      term: "Loop Control Variable",
      definition: "A variable that controls how many times a loop executes, typically incremented or decremented each iteration"
    },
    {
      term: "Infinite Loop",
      definition: "A loop that never terminates because its exit condition is never met"
    },
    {
      term: "Nested Loop",
      definition: "A loop that is placed inside another loop, creating multiple levels of iteration"
    },
    {
      term: "Loop Invariant",
      definition: "A condition that remains true throughout all iterations of a loop"
    }
  ],
  
  // Prerequisites and next steps
  prerequisites: [
    "Understanding of variables and data types",
    "Knowledge of conditional statements (IF-ELSE)",
    "Basic understanding of arrays and collections",
    "Familiarity with comparison and logical operators"
  ],
  
  nextSteps: [
    "Learn about functions and procedures",
    "Explore recursion as an alternative to iteration",
    "Study algorithm efficiency and loop optimization",
    "Practice with more complex nested loop problems",
    "Learn about iterators and advanced loop constructs"
  ]
};