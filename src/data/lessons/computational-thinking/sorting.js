// Lesson 1.4: Sorting - Comprehensive lesson content

export default {
  title: "Sorting",
  description: "Master fundamental sorting algorithms and understand their efficiency and applications",
  difficulty: "intermediate",
  estimatedTime: "65 minutes",
  
  // Learning objectives
  objectives: [
    "Understand the importance of sorting in computer science",
    "Learn bubble sort, selection sort, and insertion sort algorithms",
    "Compare algorithm efficiency using Big O notation",
    "Apply sorting techniques to solve real-world problems",
    "Recognize when to use different sorting algorithms"
  ],
  
  // Main lesson content
  content: `
    <h2>What is Sorting?</h2>
    <p><strong>Sorting</strong> is the process of arranging data in a specific order, typically ascending (smallest to largest) or descending (largest to smallest). It's one of the most fundamental operations in computer science and forms the foundation for many other algorithms and data processing tasks.</p>
    
    <p>Why is sorting important?</p>
    <ul>
      <li><strong>Enables efficient searching:</strong> Binary search requires sorted data</li>
      <li><strong>Data organization:</strong> Makes information easier to find and understand</li>
      <li><strong>Algorithm optimization:</strong> Many algorithms work better on sorted data</li>
      <li><strong>User experience:</strong> Sorted lists are more user-friendly</li>
      <li><strong>Database operations:</strong> Critical for database indexing and queries</li>
    </ul>
    
    <h2>Basic Sorting Algorithms</h2>
    
    <h3>1. Bubble Sort</h3>
    <p>Bubble sort is the simplest sorting algorithm that works by repeatedly stepping through the list, comparing adjacent elements and swapping them if they're in the wrong order.</p>
    
    <h4>How Bubble Sort Works:</h4>
    <ol>
      <li>Compare the first two elements</li>
      <li>If they're in the wrong order, swap them</li>
      <li>Move to the next pair and repeat</li>
      <li>Continue until the end of the list</li>
      <li>Repeat the entire process until no swaps are needed</li>
    </ol>
    
    <h4>Bubble Sort Pseudocode:</h4>
    <pre><code>BEGIN Bubble_Sort(array)
    SET n = length(array)
    
    FOR i = 0 TO n-2
        SET swapped = FALSE
        
        FOR j = 0 TO n-2-i
            IF array[j] > array[j+1] THEN
                SWAP array[j] AND array[j+1]
                SET swapped = TRUE
            ENDIF
        ENDFOR
        
        // If no swapping occurred, array is sorted
        IF NOT swapped THEN
            BREAK
        ENDIF
    ENDFOR
END</code></pre>
    
    <h4>Bubble Sort Example:</h4>
    <pre><code>Initial array: [64, 34, 25, 12, 22, 11, 90]

Pass 1: [34, 25, 12, 22, 11, 64, 90] (90 bubbles to end)
Pass 2: [25, 12, 22, 11, 34, 64, 90] (64 bubbles to position)
Pass 3: [12, 22, 11, 25, 34, 64, 90] (34 bubbles to position)
Pass 4: [12, 11, 22, 25, 34, 64, 90] (25 bubbles to position)
Pass 5: [11, 12, 22, 25, 34, 64, 90] (22 bubbles to position)
Pass 6: [11, 12, 22, 25, 34, 64, 90] (No swaps - sorted!)</code></pre>
    
    <h3>2. Selection Sort</h3>
    <p>Selection sort works by finding the minimum element from the unsorted portion and placing it at the beginning.</p>
    
    <h4>How Selection Sort Works:</h4>
    <ol>
      <li>Find the smallest element in the array</li>
      <li>Swap it with the first element</li>
      <li>Find the smallest element in the remaining unsorted portion</li>
      <li>Swap it with the second element</li>
      <li>Continue until the entire array is sorted</li>
    </ol>
    
    <h4>Selection Sort Pseudocode:</h4>
    <pre><code>BEGIN Selection_Sort(array)
    SET n = length(array)
    
    FOR i = 0 TO n-2
        SET min_index = i
        
        // Find the minimum element in remaining array
        FOR j = i+1 TO n-1
            IF array[j] < array[min_index] THEN
                SET min_index = j
            ENDIF
        ENDFOR
        
        // Swap the found minimum element with first element
        IF min_index ≠ i THEN
            SWAP array[i] AND array[min_index]
        ENDIF
    ENDFOR
END</code></pre>
    
    <h4>Selection Sort Example:</h4>
    <pre><code>Initial array: [64, 25, 12, 22, 11]

Step 1: Find min (11), swap with first: [11, 25, 12, 22, 64]
Step 2: Find min (12), swap with second: [11, 12, 25, 22, 64]
Step 3: Find min (22), swap with third: [11, 12, 22, 25, 64]
Step 4: Find min (25), already in place: [11, 12, 22, 25, 64]
Sorted: [11, 12, 22, 25, 64]</code></pre>
    
    <h3>3. Insertion Sort</h3>
    <p>Insertion sort builds the final sorted array one element at a time by inserting each element into its correct position among the previously sorted elements.</p>
    
    <h4>How Insertion Sort Works:</h4>
    <ol>
      <li>Start with the second element (assume first is sorted)</li>
      <li>Compare it with elements in the sorted portion</li>
      <li>Shift larger elements to the right</li>
      <li>Insert the current element in its correct position</li>
      <li>Repeat for all remaining elements</li>
    </ol>
    
    <h4>Insertion Sort Pseudocode:</h4>
    <pre><code>BEGIN Insertion_Sort(array)
    SET n = length(array)
    
    FOR i = 1 TO n-1
        SET key = array[i]
        SET j = i - 1
        
        // Move elements greater than key one position ahead
        WHILE j >= 0 AND array[j] > key
            SET array[j+1] = array[j]
            SET j = j - 1
        ENDWHILE
        
        // Insert key at correct position
        SET array[j+1] = key
    ENDFOR
END</code></pre>
    
    <h4>Insertion Sort Example:</h4>
    <pre><code>Initial array: [12, 11, 13, 5, 6]

Step 1: Insert 11: [11, 12, 13, 5, 6]
Step 2: Insert 13: [11, 12, 13, 5, 6] (already in place)
Step 3: Insert 5:  [5, 11, 12, 13, 6]
Step 4: Insert 6:  [5, 6, 11, 12, 13]
Sorted: [5, 6, 11, 12, 13]</code></pre>
    
    <h2>Algorithm Efficiency Comparison</h2>
    
    <table border="1" style="border-collapse: collapse; width: 100%;">
      <tr>
        <th>Algorithm</th>
        <th>Best Case</th>
        <th>Average Case</th>
        <th>Worst Case</th>
        <th>Space Complexity</th>
        <th>Stable?</th>
      </tr>
      <tr>
        <td>Bubble Sort</td>
        <td>O(n)</td>
        <td>O(n²)</td>
        <td>O(n²)</td>
        <td>O(1)</td>
        <td>Yes</td>
      </tr>
      <tr>
        <td>Selection Sort</td>
        <td>O(n²)</td>
        <td>O(n²)</td>
        <td>O(n²)</td>
        <td>O(1)</td>
        <td>No</td>
      </tr>
      <tr>
        <td>Insertion Sort</td>
        <td>O(n)</td>
        <td>O(n²)</td>
        <td>O(n²)</td>
        <td>O(1)</td>
        <td>Yes</td>
      </tr>
    </table>
    
    <h3>When to Use Each Algorithm:</h3>
    <ul>
      <li><strong>Bubble Sort:</strong> Educational purposes, very small datasets</li>
      <li><strong>Selection Sort:</strong> When memory writes are expensive</li>
      <li><strong>Insertion Sort:</strong> Small datasets, nearly sorted data, online algorithms</li>
    </ul>
    
    <h2>Advanced Sorting Concepts</h2>
    
    <h3>1. Stability in Sorting</h3>
    <p>A sorting algorithm is <strong>stable</strong> if it maintains the relative order of equal elements. This is important when sorting objects with multiple attributes.</p>
    
    <h4>Example of Stability:</h4>
    <pre><code>Original: [(Alice, 85), (Bob, 90), (Charlie, 85), (Diana, 90)]
Stable sort by grade: [(Alice, 85), (Charlie, 85), (Bob, 90), (Diana, 90)]
Unstable sort by grade: [(Charlie, 85), (Alice, 85), (Diana, 90), (Bob, 90)]</code></pre>
    
    <h3>2. In-Place vs Out-of-Place Sorting</h3>
    <ul>
      <li><strong>In-place:</strong> Uses only a constant amount of extra memory (O(1))</li>
      <li><strong>Out-of-place:</strong> Requires additional memory proportional to input size</li>
    </ul>
    
    <h3>3. Adaptive Sorting</h3>
    <p>An <strong>adaptive</strong> sorting algorithm performs better on data that is already partially sorted.</p>
    
    <h2>Real-World Applications</h2>
    
    <h3>1. Student Grade Management System</h3>
    <pre><code>BEGIN Sort_Student_Grades
    read sort_criteria  // "name", "grade", "student_id"
    read sort_order     // "ascending", "descending"
    
    IF sort_criteria = "grade" THEN
        // Use insertion sort for nearly sorted grade data
        insertion_sort(students, compare_by_grade)
    ELSE IF sort_criteria = "name" THEN
        // Use bubble sort for small class sizes
        bubble_sort(students, compare_by_name)
    ELSE IF sort_criteria = "student_id" THEN
        // Use selection sort for unique IDs
        selection_sort(students, compare_by_id)
    ENDIF
    
    IF sort_order = "descending" THEN
        reverse(students)
    ENDIF
    
    display_sorted_students(students)
END</code></pre>
    
    <h3>2. E-commerce Product Listing</h3>
    <pre><code>BEGIN Sort_Products
    read products_list
    read sort_by  // "price", "rating", "popularity", "name"
    
    SWITCH sort_by
        CASE "price":
            insertion_sort(products, compare_by_price)
        CASE "rating":
            selection_sort(products, compare_by_rating)
        CASE "popularity":
            bubble_sort(products, compare_by_popularity)
        CASE "name":
            insertion_sort(products, compare_by_name)
    ENDSWITCH
    
    display_products(products)
END</code></pre>
    
    <h3>3. File Organization System</h3>
    <pre><code>BEGIN Organize_Files
    read file_list
    read organization_type  // "size", "date", "type", "name"
    
    // Choose sorting algorithm based on file count
    IF length(file_list) < 50 THEN
        // Use insertion sort for small file lists
        insertion_sort(file_list, get_comparator(organization_type))
    ELSE IF length(file_list) < 200 THEN
        // Use selection sort for medium file lists
        selection_sort(file_list, get_comparator(organization_type))
    ELSE
        // For large file lists, recommend advanced algorithms
        display "Consider using merge sort or quick sort for better performance"
    ENDIF
    
    create_organized_folders(file_list)
END</code></pre>
    
    <h2>Sorting Optimization Techniques</h2>
    
    <h3>1. Early Termination</h3>
    <p>Stop the algorithm early if the data becomes sorted before all passes are complete (used in optimized bubble sort).</p>
    
    <h3>2. Hybrid Approaches</h3>
    <p>Use different algorithms for different data sizes or characteristics within the same program.</p>
    
    <h3>3. Preprocessing</h3>
    <p>Check if data is already sorted or nearly sorted to choose the most appropriate algorithm.</p>
    
    <pre><code>BEGIN Smart_Sort(array)
    IF is_already_sorted(array) THEN
        RETURN array  // No sorting needed
    ELSE IF is_nearly_sorted(array) THEN
        insertion_sort(array)  // Efficient for nearly sorted data
    ELSE IF length(array) < 50 THEN
        insertion_sort(array)  // Good for small arrays
    ELSE
        // Use more advanced algorithm for large arrays
        advanced_sort(array)
    ENDIF
END</code></pre>
  `,
  
  // Interactive elements and activities
  interactiveElements: [
    {
      type: "sorting-visualizer",
      title: "Sorting Algorithm Animation",
      description: "Watch how different sorting algorithms work step by step.",
      data: [64, 34, 25, 12, 22, 11, 90],
      algorithms: ["bubble", "selection", "insertion"],
      showComparisons: true,
      showSwaps: true,
      speed: "medium"
    },
    {
      type: "algorithm-race",
      title: "Sorting Speed Comparison",
      description: "Compare the performance of different sorting algorithms on various data types.",
      scenarios: [
        { name: "Random Data", data: "random" },
        { name: "Nearly Sorted", data: "nearly_sorted" },
        { name: "Reverse Sorted", data: "reverse_sorted" },
        { name: "All Same Values", data: "identical" }
      ],
      algorithms: ["bubble", "selection", "insertion"],
      metrics: ["comparisons", "swaps", "time"]
    },
    {
      type: "sorting-puzzle",
      title: "Manual Sorting Challenge",
      description: "Sort the given array using the specified algorithm step by step.",
      initialArray: [5, 2, 8, 1, 9],
      algorithm: "bubble",
      showHints: true,
      trackMistakes: true
    },
    {
      type: "code-builder",
      title: "Build Your Own Sorting Algorithm",
      description: "Drag and drop code blocks to create a working sorting algorithm.",
      codeBlocks: [
        "FOR i = 0 TO n-1",
        "FOR j = 0 TO n-2-i",
        "IF array[j] > array[j+1] THEN",
        "SWAP array[j] AND array[j+1]",
        "ENDIF",
        "ENDFOR",
        "ENDFOR"
      ],
      targetAlgorithm: "bubble_sort"
    }
  ],
  
  // Reading materials and resources
  readings: [
    {
      title: "The Evolution of Sorting Algorithms",
      content: `
        <p>Sorting algorithms have a rich history that parallels the development of computer science:</p>
        
        <h4>1940s-1950s: The Beginning</h4>
        <p>Early computers used simple sorting methods similar to how humans sort cards. Bubble sort and selection sort emerged as natural first approaches.</p>
        
        <h4>1960s: Mathematical Foundations</h4>
        <p>Computer scientists began analyzing algorithm efficiency mathematically. This led to the development of Big O notation and the understanding that O(n²) algorithms were limiting.</p>
        
        <h4>1970s: Advanced Algorithms</h4>
        <p>More sophisticated algorithms like merge sort O(n log n) and quick sort were developed, revolutionizing how large datasets could be processed.</p>
        
        <h4>1980s-1990s: Specialized Sorting</h4>
        <p>Algorithms were developed for specific scenarios: radix sort for integers, counting sort for small ranges, and hybrid algorithms that adapt to data characteristics.</p>
        
        <h4>2000s-Present: Parallel and Distributed Sorting</h4>
        <p>With multi-core processors and distributed systems, sorting algorithms evolved to take advantage of parallel processing and handle massive datasets across multiple machines.</p>
      `
    },
    {
      title: "Sorting in Different Programming Paradigms",
      content: `
        <p>Different programming approaches lead to different sorting implementations:</p>
        
        <h4>Imperative Programming</h4>
        <p>Traditional sorting algorithms with explicit loops and state changes. Most of the algorithms we've studied fall into this category.</p>
        
        <h4>Functional Programming</h4>
        <p>Sorting without modifying the original data, using recursion and immutable data structures. Merge sort is naturally functional.</p>
        
        <h4>Object-Oriented Programming</h4>
        <p>Sorting objects with custom comparison methods, using interfaces and polymorphism to handle different data types.</p>
        
        <h4>Parallel Programming</h4>
        <p>Dividing the sorting task among multiple processors or threads to achieve better performance on large datasets.</p>
        
        <p>Understanding these different approaches helps you choose the right sorting strategy for your specific programming environment and requirements.</p>
      `
    }
  ],
  
  // Assessment questions
  assessments: [
    {
      type: "multiple-choice",
      question: "Which sorting algorithm has the best performance on nearly sorted data?",
      options: [
        "Bubble Sort",
        "Selection Sort",
        "Insertion Sort",
        "All perform equally"
      ],
      correct: 2,
      explanation: "Insertion sort is adaptive and performs in O(n) time on nearly sorted data, making it the best choice among these three algorithms."
    },
    {
      type: "multiple-choice",
      question: "What is the main disadvantage of selection sort compared to bubble sort?",
      options: [
        "It's slower in the worst case",
        "It's not stable",
        "It uses more memory",
        "It's harder to implement"
      ],
      correct: 1,
      explanation: "Selection sort is not stable, meaning it doesn't preserve the relative order of equal elements, while bubble sort is stable."
    },
    {
      type: "trace-execution",
      question: "Trace through one pass of bubble sort on the array [3, 1, 4, 2]. Show the array after each comparison and swap.",
      initialArray: [3, 1, 4, 2],
      expectedSteps: [
        { comparison: "3 vs 1", swap: true, result: [1, 3, 4, 2] },
        { comparison: "3 vs 4", swap: false, result: [1, 3, 4, 2] },
        { comparison: "4 vs 2", swap: true, result: [1, 3, 2, 4] }
      ]
    },
    {
      type: "algorithm-analysis",
      question: "For an array of 100 elements, what is the maximum number of swaps that bubble sort might perform?",
      answer: 4950,
      explanation: "In the worst case (reverse sorted array), bubble sort performs n(n-1)/2 swaps. For n=100: 100×99/2 = 4950 swaps.",
      showWork: true
    },
    {
      type: "short-answer",
      question: "Explain why insertion sort is often preferred over bubble sort and selection sort for small datasets, even though they all have O(n²) complexity.",
      sampleAnswer: "Insertion sort is preferred because: 1) It's adaptive - performs well on nearly sorted data with O(n) best case, 2) It has good constant factors and fewer writes than bubble sort, 3) It's stable unlike selection sort, 4) It works well as the base case in hybrid algorithms, and 5) It has good cache performance due to its access pattern.",
      rubric: [
        "Mentions adaptive nature/performance on nearly sorted data",
        "Discusses stability compared to selection sort",
        "Notes efficiency advantages over bubble sort",
        "Explains practical considerations (cache, constants)"
      ]
    }
  ],
  
  // Additional practice exercises
  practiceExercises: [
    {
      title: "Library Book Sorting System",
      description: "Design a sorting system for a library that can sort books by title, author, publication year, or ISBN. Consider which algorithm to use for each sorting criterion.",
      difficulty: "medium",
      hints: ["Different fields might benefit from different algorithms", "Consider the typical size of book collections", "Think about stability when sorting by multiple criteria"]
    },
    {
      title: "Sports Tournament Ranking",
      description: "Create a sorting system for tournament results that ranks teams by wins, then by points scored, then by points allowed. Ensure the sorting is stable.",
      difficulty: "medium",
      hints: ["Multiple sorting criteria require careful consideration", "Stability is crucial for fair rankings", "Consider sorting in reverse order for some criteria"]
    },
    {
      title: "Adaptive Sorting Algorithm",
      description: "Design an algorithm that automatically chooses the best sorting method based on the input data characteristics (size, how sorted it already is, etc.).",
      difficulty: "hard",
      hints: ["Analyze data characteristics first", "Create decision rules for algorithm selection", "Consider preprocessing costs vs. sorting benefits"]
    }
  ],
  
  // Key terms and vocabulary
  vocabulary: [
    {
      term: "Stable Sorting",
      definition: "A sorting algorithm that maintains the relative order of equal elements"
    },
    {
      term: "In-Place Sorting",
      definition: "A sorting algorithm that uses only a constant amount of extra memory space"
    },
    {
      term: "Adaptive Algorithm",
      definition: "An algorithm that performs better on data that is already partially sorted"
    },
    {
      term: "Comparison-Based Sorting",
      definition: "Sorting algorithms that work by comparing elements to determine their relative order"
    },
    {
      term: "Time Complexity",
      definition: "A measure of how the running time of an algorithm increases with the size of the input"
    }
  ],
  
  // Prerequisites and next steps
  prerequisites: [
    "Understanding of arrays and basic data structures",
    "Knowledge of loops and conditional statements",
    "Familiarity with algorithm analysis concepts",
    "Basic understanding of Big O notation"
  ],
  
  nextSteps: [
    "Learn advanced sorting algorithms (merge sort, quick sort)",
    "Study non-comparison based sorting (radix sort, counting sort)",
    "Explore sorting in different data structures",
    "Investigate parallel and distributed sorting",
    "Learn about sorting stability and its applications"
  ]
};