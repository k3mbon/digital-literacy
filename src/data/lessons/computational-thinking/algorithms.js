// Lesson 1.8: Algorithms - Comprehensive lesson content

export default {
  title: "Algorithms",
  description: "Master algorithm design, analysis, and optimization for efficient problem-solving",
  difficulty: "intermediate",
  estimatedTime: "75 minutes",
  
  // Learning objectives
  objectives: [
    "Understand what algorithms are and their fundamental properties",
    "Learn algorithm design techniques: divide and conquer, greedy, dynamic programming",
    "Master algorithm analysis including time and space complexity",
    "Apply optimization strategies to improve algorithm efficiency",
    "Compare different algorithms and choose appropriate solutions for specific problems"
  ],
  
  // Main lesson content
  content: `
    <h2>What is an Algorithm?</h2>
    <p>An <strong>algorithm</strong> is a step-by-step procedure or set of rules designed to solve a specific problem or perform a particular task. Algorithms are the foundation of computer science and programming.</p>
    
    <p>Key characteristics of algorithms:</p>
    <ul>
      <li><strong>Finite:</strong> Must terminate after a finite number of steps</li>
      <li><strong>Definite:</strong> Each step must be clearly and unambiguously defined</li>
      <li><strong>Input:</strong> Takes zero or more inputs</li>
      <li><strong>Output:</strong> Produces one or more outputs</li>
      <li><strong>Effective:</strong> Steps must be basic enough to be carried out</li>
    </ul>
    
    <h2>Algorithm Design Techniques</h2>
    
    <h3>1. Divide and Conquer</h3>
    <p>Break a problem into smaller subproblems, solve them recursively, then combine the solutions.</p>
    
    <h4>Example: Merge Sort Algorithm</h4>
    <pre><code>FUNCTION Merge_Sort(array)
    // Base case: arrays with 0 or 1 element are already sorted
    IF length(array) <= 1 THEN
        RETURN array
    ENDIF
    
    // Divide: Split array into two halves
    SET mid = length(array) / 2
    SET left_half = array[0 to mid-1]
    SET right_half = array[mid to end]
    
    // Conquer: Recursively sort both halves
    SET sorted_left = Merge_Sort(left_half)
    SET sorted_right = Merge_Sort(right_half)
    
    // Combine: Merge the sorted halves
    RETURN Merge(sorted_left, sorted_right)
END FUNCTION

FUNCTION Merge(left, right)
    SET result = []
    SET i = 0, j = 0
    
    // Compare elements and merge in sorted order
    WHILE i < length(left) AND j < length(right)
        IF left[i] <= right[j] THEN
            add_to_array(result, left[i])
            SET i = i + 1
        ELSE
            add_to_array(result, right[j])
            SET j = j + 1
        ENDIF
    ENDWHILE
    
    // Add remaining elements
    WHILE i < length(left)
        add_to_array(result, left[i])
        SET i = i + 1
    ENDWHILE
    
    WHILE j < length(right)
        add_to_array(result, right[j])
        SET j = j + 1
    ENDWHILE
    
    RETURN result
END FUNCTION

// Example usage with step-by-step trace
BEGIN Merge_Sort_Example
    SET original_array = [38, 27, 43, 3, 9, 82, 10]
    DISPLAY "Original array: " + array_to_string(original_array)
    
    DISPLAY "\nMerge Sort Process:"
    DISPLAY "Step 1: Divide [38, 27, 43, 3, 9, 82, 10]"
    DISPLAY "  Left: [38, 27, 43]    Right: [3, 9, 82, 10]"
    
    DISPLAY "\nStep 2: Further divide left half [38, 27, 43]"
    DISPLAY "  Left: [38]    Right: [27, 43]"
    DISPLAY "  Divide [27, 43]: Left: [27]    Right: [43]"
    
    DISPLAY "\nStep 3: Merge back up"
    DISPLAY "  Merge [27] and [43] → [27, 43]"
    DISPLAY "  Merge [38] and [27, 43] → [27, 38, 43]"
    
    DISPLAY "\nStep 4: Process right half [3, 9, 82, 10]"
    DISPLAY "  Left: [3, 9]    Right: [82, 10]"
    DISPLAY "  After recursive sorting: [3, 9] and [10, 82]"
    DISPLAY "  Merge → [3, 9, 10, 82]"
    
    DISPLAY "\nStep 5: Final merge"
    DISPLAY "  Merge [27, 38, 43] and [3, 9, 10, 82]"
    DISPLAY "  Result: [3, 9, 10, 27, 38, 43, 82]"
    
    SET sorted_array = Merge_Sort(original_array)
    DISPLAY "\nFinal sorted array: " + array_to_string(sorted_array)
END</code></pre>
    
    <h3>2. Greedy Algorithms</h3>
    <p>Make locally optimal choices at each step, hoping to find a global optimum.</p>
    
    <h4>Example: Activity Selection Problem</h4>
    <pre><code>// Problem: Select maximum number of non-overlapping activities
FUNCTION Activity_Selection_Greedy(activities)
    // activities = [{start: time, end: time, name: string}]
    
    // Step 1: Sort activities by end time (greedy choice)
    SET sorted_activities = Sort_By_End_Time(activities)
    
    DISPLAY "Activities sorted by end time:"
    FOR each activity IN sorted_activities
        DISPLAY "  " + activity["name"] + ": " + activity["start"] + "-" + activity["end"]
    ENDFOR
    
    // Step 2: Select activities greedily
    SET selected = []
    SET last_end_time = -1
    
    DISPLAY "\nGreedy selection process:"
    FOR each activity IN sorted_activities
        IF activity["start"] >= last_end_time THEN
            add_to_array(selected, activity)
            SET last_end_time = activity["end"]
            DISPLAY "  ✓ Selected: " + activity["name"] + " (" + activity["start"] + "-" + activity["end"] + ")"
        ELSE
            DISPLAY "  ✗ Skipped: " + activity["name"] + " (conflicts with previous selection)"
        ENDIF
    ENDFOR
    
    RETURN selected
END FUNCTION

// Example usage
BEGIN Activity_Selection_Example
    SET activities = [
        {name: "Meeting A", start: 1, end: 4},
        {name: "Meeting B", start: 3, end: 5},
        {name: "Meeting C", start: 0, end: 6},
        {name: "Meeting D", start: 5, end: 7},
        {name: "Meeting E", start: 8, end: 9},
        {name: "Meeting F", start: 5, end: 9},
        {name: "Meeting G", start: 6, end: 10},
        {name: "Meeting H", start: 8, end: 11},
        {name: "Meeting I", start: 11, end: 12},
        {name: "Meeting J", start: 2, end: 14}
    ]
    
    DISPLAY "Activity Selection Problem:"
    DISPLAY "Goal: Select maximum number of non-overlapping meetings"
    
    SET optimal_selection = Activity_Selection_Greedy(activities)
    
    DISPLAY "\nOptimal selection (" + length(optimal_selection) + " activities):"
    FOR each activity IN optimal_selection
        DISPLAY "  " + activity["name"] + ": " + activity["start"] + "-" + activity["end"]
    ENDFOR
    
    // Verify optimality
    DISPLAY "\nWhy this is optimal:"
    DISPLAY "- By always choosing the activity that ends earliest,"
    DISPLAY "- We leave the most room for future activities"
    DISPLAY "- This greedy choice leads to the global optimum"
END</code></pre>
    
    <h3>3. Dynamic Programming</h3>
    <p>Solve complex problems by breaking them down into simpler subproblems and storing results to avoid redundant calculations.</p>
    
    <h4>Example: Fibonacci Sequence with Memoization</h4>
    <pre><code>// Naive recursive approach (inefficient)
FUNCTION Fibonacci_Naive(n)
    IF n <= 1 THEN
        RETURN n
    ENDIF
    
    RETURN Fibonacci_Naive(n-1) + Fibonacci_Naive(n-2)
END FUNCTION

// Dynamic programming approach with memoization
SET fibonacci_cache = {}  // Global cache for memoization

FUNCTION Fibonacci_Memoized(n)
    // Check if result is already cached
    IF has_key(fibonacci_cache, n) THEN
        DISPLAY "  Cache hit for F(" + n + ") = " + fibonacci_cache[n]
        RETURN fibonacci_cache[n]
    ENDIF
    
    // Base cases
    IF n <= 1 THEN
        SET fibonacci_cache[n] = n
        DISPLAY "  Base case: F(" + n + ") = " + n
        RETURN n
    ENDIF
    
    // Recursive case with memoization
    DISPLAY "  Computing F(" + n + ")..."
    SET result = Fibonacci_Memoized(n-1) + Fibonacci_Memoized(n-2)
    SET fibonacci_cache[n] = result
    DISPLAY "  Cached: F(" + n + ") = " + result
    
    RETURN result
END FUNCTION

// Bottom-up dynamic programming approach
FUNCTION Fibonacci_Bottom_Up(n)
    IF n <= 1 THEN
        RETURN n
    ENDIF
    
    // Create table to store results
    SET dp = array_of_size(n + 1)
    SET dp[0] = 0
    SET dp[1] = 1
    
    DISPLAY "Bottom-up computation:"
    DISPLAY "  F(0) = 0"
    DISPLAY "  F(1) = 1"
    
    // Fill table from bottom up
    FOR i = 2 TO n
        SET dp[i] = dp[i-1] + dp[i-2]
        DISPLAY "  F(" + i + ") = F(" + (i-1) + ") + F(" + (i-2) + ") = " + dp[i-1] + " + " + dp[i-2] + " = " + dp[i]
    ENDFOR
    
    RETURN dp[n]
END FUNCTION

// Comparison of approaches
BEGIN Fibonacci_Comparison
    SET n = 10
    DISPLAY "Computing Fibonacci(" + n + ") using different approaches:\n"
    
    // Naive approach (show complexity)
    DISPLAY "1. Naive Recursive Approach:"
    DISPLAY "   Time Complexity: O(2^n) - exponential!"
    DISPLAY "   For F(10), this makes ~1024 function calls"
    SET start_time = get_current_time()
    SET result1 = Fibonacci_Naive(n)
    SET end_time = get_current_time()
    DISPLAY "   Result: " + result1 + " (Time: " + (end_time - start_time) + "ms)\n"
    
    // Memoized approach
    DISPLAY "2. Memoized Approach:"
    DISPLAY "   Time Complexity: O(n) - linear!"
    SET fibonacci_cache = {}  // Reset cache
    SET start_time = get_current_time()
    SET result2 = Fibonacci_Memoized(n)
    SET end_time = get_current_time()
    DISPLAY "   Result: " + result2 + " (Time: " + (end_time - start_time) + "ms)\n"
    
    // Bottom-up approach
    DISPLAY "3. Bottom-up Dynamic Programming:"
    DISPLAY "   Time Complexity: O(n), Space Complexity: O(n)"
    SET start_time = get_current_time()
    SET result3 = Fibonacci_Bottom_Up(n)
    SET end_time = get_current_time()
    DISPLAY "   Result: " + result3 + " (Time: " + (end_time - start_time) + "ms)\n"
    
    // Space-optimized approach
    DISPLAY "4. Space-Optimized Approach:"
    DISPLAY "   Time Complexity: O(n), Space Complexity: O(1)"
    SET a = 0, b = 1
    FOR i = 2 TO n
        SET temp = a + b
        SET a = b
        SET b = temp
    ENDFOR
    DISPLAY "   Result: " + b + " (Most efficient!)\n"
END</code></pre>
    
    <h2>Algorithm Analysis</h2>
    
    <h3>Time Complexity (Big O Notation)</h3>
    <p>Time complexity describes how the runtime of an algorithm grows with input size.</p>
    
    <pre><code>BEGIN Algorithm_Complexity_Analysis
    DISPLAY "=== TIME COMPLEXITY ANALYSIS ==="
    
    // O(1) - Constant Time
    FUNCTION Access_Array_Element(array, index)
        RETURN array[index]  // Always takes same time regardless of array size
    END FUNCTION
    DISPLAY "O(1) - Constant: Array access, hash table lookup"
    
    // O(log n) - Logarithmic Time
    FUNCTION Binary_Search(sorted_array, target)
        SET left = 0
        SET right = length(sorted_array) - 1
        SET comparisons = 0
        
        WHILE left <= right
            SET comparisons = comparisons + 1
            SET mid = (left + right) / 2
            
            IF sorted_array[mid] = target THEN
                DISPLAY "Found " + target + " in " + comparisons + " comparisons"
                RETURN mid
            ELSE IF sorted_array[mid] < target THEN
                SET left = mid + 1
            ELSE
                SET right = mid - 1
            ENDIF
        ENDWHILE
        
        DISPLAY "Not found after " + comparisons + " comparisons"
        RETURN -1
    END FUNCTION
    DISPLAY "O(log n) - Logarithmic: Binary search, balanced tree operations"
    
    // O(n) - Linear Time
    FUNCTION Linear_Search(array, target)
        SET comparisons = 0
        FOR i = 0 TO length(array) - 1
            SET comparisons = comparisons + 1
            IF array[i] = target THEN
                DISPLAY "Found " + target + " in " + comparisons + " comparisons"
                RETURN i
            ENDIF
        ENDFOR
        DISPLAY "Not found after " + comparisons + " comparisons"
        RETURN -1
    END FUNCTION
    DISPLAY "O(n) - Linear: Linear search, single loop through data"
    
    // O(n log n) - Linearithmic Time
    DISPLAY "O(n log n) - Linearithmic: Merge sort, heap sort, efficient sorting"
    
    // O(n²) - Quadratic Time
    FUNCTION Bubble_Sort_With_Analysis(array)
        SET n = length(array)
        SET comparisons = 0
        SET swaps = 0
        
        FOR i = 0 TO n - 2
            FOR j = 0 TO n - i - 2
                SET comparisons = comparisons + 1
                IF array[j] > array[j + 1] THEN
                    // Swap elements
                    SET temp = array[j]
                    SET array[j] = array[j + 1]
                    SET array[j + 1] = temp
                    SET swaps = swaps + 1
                ENDIF
            ENDFOR
        ENDFOR
        
        DISPLAY "Bubble sort completed:"
        DISPLAY "  Comparisons: " + comparisons
        DISPLAY "  Swaps: " + swaps
        DISPLAY "  Time complexity: O(n²) = O(" + n + "²) = O(" + (n * n) + ")"
        
        RETURN array
    END FUNCTION
    DISPLAY "O(n²) - Quadratic: Bubble sort, nested loops"
    
    // O(2^n) - Exponential Time
    FUNCTION Count_Subsets(set, index)
        IF index = length(set) THEN
            RETURN 1  // Empty subset
        ENDIF
        
        // Two choices: include current element or exclude it
        SET include = Count_Subsets(set, index + 1)
        SET exclude = Count_Subsets(set, index + 1)
        
        RETURN include + exclude
    END FUNCTION
    DISPLAY "O(2^n) - Exponential: Naive recursive algorithms, brute force"
    
    // Complexity comparison with examples
    DISPLAY "\n=== COMPLEXITY COMPARISON ==="
    SET input_sizes = [10, 100, 1000, 10000]
    
    FOR each n IN input_sizes
        DISPLAY "\nFor input size n = " + n + ":"
        DISPLAY "  O(1):      1 operation"
        DISPLAY "  O(log n):  " + ceiling(log2(n)) + " operations"
        DISPLAY "  O(n):      " + n + " operations"
        DISPLAY "  O(n log n): " + (n * ceiling(log2(n))) + " operations"
        DISPLAY "  O(n²):     " + (n * n) + " operations"
        IF n <= 20 THEN
            DISPLAY "  O(2^n):    " + power(2, n) + " operations"
        ELSE
            DISPLAY "  O(2^n):    " + power(2, n) + " operations (impractical!)"
        ENDIF
    ENDFOR
END</code></pre>
    
    <h3>Space Complexity</h3>
    <p>Space complexity describes how much memory an algorithm uses relative to input size.</p>
    
    <pre><code>BEGIN Space_Complexity_Analysis
    DISPLAY "=== SPACE COMPLEXITY ANALYSIS ==="
    
    // O(1) - Constant Space
    FUNCTION Find_Maximum_Constant_Space(array)
        SET max = array[0]  // Only one extra variable
        FOR i = 1 TO length(array) - 1
            IF array[i] > max THEN
                SET max = array[i]
            ENDIF
        ENDFOR
        RETURN max
    END FUNCTION
    DISPLAY "O(1) Space: Uses fixed amount of memory regardless of input size"
    
    // O(n) - Linear Space
    FUNCTION Reverse_Array_Linear_Space(array)
        SET reversed = array_of_size(length(array))  // New array of same size
        FOR i = 0 TO length(array) - 1
            SET reversed[i] = array[length(array) - 1 - i]
        ENDFOR
        RETURN reversed
    END FUNCTION
    DISPLAY "O(n) Space: Memory usage grows linearly with input size"
    
    // O(log n) - Logarithmic Space (recursive call stack)
    FUNCTION Binary_Search_Recursive(array, target, left, right)
        IF left > right THEN
            RETURN -1
        ENDIF
        
        SET mid = (left + right) / 2
        
        IF array[mid] = target THEN
            RETURN mid
        ELSE IF array[mid] < target THEN
            RETURN Binary_Search_Recursive(array, target, mid + 1, right)
        ELSE
            RETURN Binary_Search_Recursive(array, target, left, mid - 1)
        ENDIF
    END FUNCTION
    DISPLAY "O(log n) Space: Recursive call stack depth is logarithmic"
    
    // Space-Time Tradeoffs
    DISPLAY "\n=== SPACE-TIME TRADEOFFS ==="
    
    // Example: Fibonacci with different space complexities
    FUNCTION Fibonacci_O1_Space(n)  // O(1) space, O(n) time
        IF n <= 1 THEN RETURN n ENDIF
        
        SET prev2 = 0
        SET prev1 = 1
        
        FOR i = 2 TO n
            SET current = prev1 + prev2
            SET prev2 = prev1
            SET prev1 = current
        ENDFOR
        
        RETURN prev1
    END FUNCTION
    
    FUNCTION Fibonacci_On_Space(n)  // O(n) space, O(n) time
        SET dp = array_of_size(n + 1)
        SET dp[0] = 0
        SET dp[1] = 1
        
        FOR i = 2 TO n
            SET dp[i] = dp[i-1] + dp[i-2]
        ENDFOR
        
        RETURN dp[n]
    END FUNCTION
    
    DISPLAY "Fibonacci O(1) space: Uses only 3 variables"
    DISPLAY "Fibonacci O(n) space: Stores all intermediate results"
    DISPLAY "Both have O(n) time complexity, but different space usage"
END</code></pre>
    
    <h2>Algorithm Optimization Strategies</h2>
    
    <h3>1. Early Termination</h3>
    <pre><code>// Optimized search with early termination
FUNCTION Optimized_Linear_Search(array, target)
    FOR i = 0 TO length(array) - 1
        IF array[i] = target THEN
            RETURN i  // Early termination - found target
        ENDIF
        
        // Early termination for sorted arrays
        IF array[i] > target AND Is_Sorted(array) THEN
            RETURN -1  // Target cannot exist beyond this point
        ENDIF
    ENDFOR
    RETURN -1
END FUNCTION</code></pre>
    
    <h3>2. Caching and Memoization</h3>
    <pre><code>// Expensive computation with caching
SET computation_cache = {}

FUNCTION Expensive_Computation(input)
    // Check cache first
    IF has_key(computation_cache, input) THEN
        RETURN computation_cache[input]
    ENDIF
    
    // Perform expensive computation
    SET result = Complex_Calculation(input)
    
    // Cache the result
    SET computation_cache[input] = result
    
    RETURN result
END FUNCTION</code></pre>
    
    <h3>3. Loop Optimization</h3>
    <pre><code>// Unoptimized nested loops
FUNCTION Matrix_Multiply_Unoptimized(A, B)
    SET n = rows(A)
    SET result = create_matrix(n, n)
    
    FOR i = 0 TO n - 1
        FOR j = 0 TO n - 1
            SET sum = 0
            FOR k = 0 TO n - 1
                SET sum = sum + A[i][k] * B[k][j]
            ENDFOR
            SET result[i][j] = sum
        ENDFOR
    ENDFOR
    
    RETURN result
END FUNCTION

// Optimized with loop reordering for better cache performance
FUNCTION Matrix_Multiply_Optimized(A, B)
    SET n = rows(A)
    SET result = create_matrix(n, n, 0)  // Initialize with zeros
    
    // Reorder loops for better cache locality
    FOR i = 0 TO n - 1
        FOR k = 0 TO n - 1
            FOR j = 0 TO n - 1
                SET result[i][j] = result[i][j] + A[i][k] * B[k][j]
            ENDFOR
        ENDFOR
    ENDFOR
    
    RETURN result
END FUNCTION</code></pre>
  `,
  
  // Interactive elements and activities
  interactiveElements: [
    {
      type: "algorithm-designer",
      title: "Design Your Own Algorithm",
      description: "Create algorithms for common problems and analyze their complexity.",
      challenges: [
        {
          problem: "Find the kth largest element in an unsorted array",
          constraints: "Array size: 1-10000, k: 1 to array size",
          userTask: "Design an efficient algorithm and analyze its time/space complexity"
        },
        {
          problem: "Detect if a linked list has a cycle",
          constraints: "List can have 0-1000 nodes",
          userTask: "Create an algorithm that uses O(1) space complexity"
        }
      ]
    },
    {
      type: "complexity-analyzer",
      title: "Algorithm Complexity Analysis",
      description: "Analyze the time and space complexity of given algorithms.",
      algorithms: [
        {
          code: `FOR i = 0 TO n-1
    FOR j = i+1 TO n-1
        IF array[i] > array[j] THEN
            swap(array[i], array[j])
        ENDIF
    ENDFOR
ENDFOR`,
          correctComplexity: "O(n²) time, O(1) space",
          explanation: "Nested loops with decreasing inner loop size still results in O(n²)"
        }
      ]
    },
    {
      type: "optimization-challenge",
      title: "Algorithm Optimization",
      description: "Optimize given algorithms for better performance.",
      scenarios: [
        {
          problem: "Naive string matching algorithm",
          inefficientCode: "Check every position in text for pattern match",
          optimizationHints: ["Use KMP algorithm", "Implement Boyer-Moore", "Consider rolling hash"]
        }
      ]
    },
    {
      type: "algorithm-race",
      title: "Algorithm Performance Race",
      description: "Compare different algorithms solving the same problem.",
      problem: "Sort an array of 1000 random integers",
      algorithms: ["Bubble Sort", "Quick Sort", "Merge Sort", "Heap Sort"],
      metrics: ["Time taken", "Number of comparisons", "Number of swaps", "Memory used"]
    }
  ],
  
  // Reading materials and resources
  readings: [
    {
      title: "The Art of Algorithm Design",
      content: `
        <p>Algorithm design is both a science and an art, requiring creativity, mathematical rigor, and practical considerations:</p>
        
        <h4>Design Principles</h4>
        <ul>
          <li><strong>Correctness:</strong> The algorithm must solve the problem correctly for all valid inputs</li>
          <li><strong>Efficiency:</strong> Consider both time and space complexity</li>
          <li><strong>Simplicity:</strong> Simpler algorithms are easier to understand, implement, and debug</li>
          <li><strong>Generality:</strong> Design for the general case, not just specific instances</li>
        </ul>
        
        <h4>Problem-Solving Strategies</h4>
        <p>When faced with a new problem:</p>
        <ol>
          <li>Understand the problem completely</li>
          <li>Consider similar problems you've solved</li>
          <li>Start with a brute force solution</li>
          <li>Identify bottlenecks and optimize</li>
          <li>Consider different data structures</li>
          <li>Apply known algorithmic techniques</li>
        </ol>
        
        <h4>Common Pitfalls</h4>
        <p>Avoid these common mistakes in algorithm design:</p>
        <ul>
          <li>Premature optimization without understanding the problem</li>
          <li>Ignoring edge cases and boundary conditions</li>
          <li>Choosing complex solutions when simple ones suffice</li>
          <li>Not considering the actual data characteristics</li>
        </ul>
      `
    },
    {
      title: "Algorithms in the Real World",
      content: `
        <p>Algorithms power the modern digital world, from search engines to social media feeds:</p>
        
        <h4>Search Engines</h4>
        <p>Google's PageRank algorithm revolutionized web search by ranking pages based on their link structure. Modern search involves hundreds of ranking factors and machine learning algorithms.</p>
        
        <h4>Social Media</h4>
        <p>News feed algorithms determine what content billions of users see daily. These algorithms balance relevance, recency, and engagement while considering user preferences and social connections.</p>
        
        <h4>Transportation</h4>
        <p>GPS navigation uses shortest path algorithms like Dijkstra's algorithm, while ride-sharing apps use matching algorithms to pair drivers with passengers efficiently.</p>
        
        <h4>E-commerce</h4>
        <p>Recommendation systems use collaborative filtering and machine learning algorithms to suggest products, while inventory management relies on optimization algorithms.</p>
        
        <h4>Financial Systems</h4>
        <p>High-frequency trading uses algorithms that can execute thousands of trades per second, while fraud detection systems use pattern recognition algorithms to identify suspicious transactions.</p>
      `
    }
  ],
  
  // Assessment questions
  assessments: [
    {
      type: "complexity-analysis",
      question: "What is the time complexity of this algorithm?\n\nFOR i = 1 TO n\n    FOR j = 1 TO i\n        DISPLAY i * j\n    ENDFOR\nENDFOR",
      options: ["O(n)", "O(n log n)", "O(n²)", "O(2^n)"],
      correct: 2,
      explanation: "The outer loop runs n times, and the inner loop runs 1, 2, 3, ..., n times respectively. Total operations: 1+2+3+...+n = n(n+1)/2 = O(n²)"
    },
    {
      type: "algorithm-design",
      question: "Design an algorithm to find the two numbers in a sorted array that sum to a target value. Optimize for time complexity.",
      sampleAnswer: "Use two pointers: start from beginning and end of array. If sum equals target, return indices. If sum is less than target, move left pointer right. If sum is greater, move right pointer left. Time: O(n), Space: O(1)",
      rubric: [
        "Recognizes that array is sorted",
        "Uses two-pointer technique",
        "Correctly handles pointer movement logic",
        "Achieves O(n) time complexity",
        "Uses O(1) space complexity"
      ]
    },
    {
      type: "optimization-challenge",
      question: "This recursive function calculates the nth Fibonacci number but is very slow for large n. How would you optimize it?\n\nFUNCTION fib(n)\n    IF n <= 1 THEN RETURN n\n    RETURN fib(n-1) + fib(n-2)\nEND FUNCTION",
      correctOptimizations: ["Memoization", "Bottom-up dynamic programming", "Iterative approach with O(1) space"],
      explanation: "The naive recursive approach has O(2^n) time complexity due to repeated calculations. Memoization reduces this to O(n) by caching results."
    },
    {
      type: "algorithm-comparison",
      question: "Compare merge sort and quick sort in terms of time complexity, space complexity, and stability. When would you choose one over the other?",
      rubric: [
        "Correctly states time complexities (both O(n log n) average, quick sort O(n²) worst case)",
        "Correctly states space complexities (merge sort O(n), quick sort O(log n))",
        "Understands stability (merge sort stable, quick sort unstable)",
        "Provides appropriate use cases for each algorithm",
        "Considers practical factors like cache performance and implementation complexity"
      ]
    }
  ],
  
  // Additional practice exercises
  practiceExercises: [
    {
      title: "Implement Advanced Sorting Algorithms",
      description: "Implement heap sort, radix sort, and counting sort. Compare their performance on different types of data.",
      difficulty: "hard",
      hints: ["Understand the heap data structure", "Consider the range of input values", "Analyze when each algorithm is most effective"]
    },
    {
      title: "Design a Cache Replacement Algorithm",
      description: "Implement LRU (Least Recently Used) cache with O(1) get and put operations.",
      difficulty: "medium",
      hints: ["Use hash map for O(1) access", "Use doubly linked list for O(1) insertion/deletion", "Combine both data structures effectively"]
    },
    {
      title: "Graph Algorithm Implementation",
      description: "Implement Dijkstra's shortest path algorithm and analyze its time complexity with different data structures.",
      difficulty: "hard",
      hints: ["Use priority queue for efficiency", "Consider different graph representations", "Handle edge cases like disconnected graphs"]
    }
  ],
  
  // Key terms and vocabulary
  vocabulary: [
    {
      term: "Algorithm",
      definition: "A step-by-step procedure for solving a problem or completing a task"
    },
    {
      term: "Time Complexity",
      definition: "A measure of how the runtime of an algorithm grows with the size of the input"
    },
    {
      term: "Space Complexity",
      definition: "A measure of how much memory an algorithm uses relative to the input size"
    },
    {
      term: "Big O Notation",
      definition: "Mathematical notation used to describe the upper bound of an algorithm's complexity"
    },
    {
      term: "Divide and Conquer",
      definition: "Algorithm design technique that breaks problems into smaller subproblems"
    },
    {
      term: "Dynamic Programming",
      definition: "Method for solving complex problems by breaking them down and storing intermediate results"
    },
    {
      term: "Greedy Algorithm",
      definition: "Algorithm that makes locally optimal choices at each step"
    },
    {
      term: "Memoization",
      definition: "Optimization technique that stores results of expensive function calls"
    }
  ],
  
  // Prerequisites and next steps
  prerequisites: [
    "Understanding of functions and recursion",
    "Knowledge of basic data structures (arrays, lists)",
    "Familiarity with mathematical concepts (logarithms, exponentials)",
    "Basic problem-solving skills"
  ],
  
  nextSteps: [
    "Study advanced data structures (trees, graphs, heaps)",
    "Learn specific algorithm families (graph algorithms, string algorithms)",
    "Practice algorithm design and analysis",
    "Explore machine learning algorithms",
    "Study parallel and distributed algorithms"
  ]
};