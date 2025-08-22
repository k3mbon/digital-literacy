// Lesson 1.3: Searching - Comprehensive lesson content

export default {
  title: "Searching",
  description: "Learn fundamental searching algorithms and techniques for finding data efficiently",
  difficulty: "intermediate",
  estimatedTime: "60 minutes",
  
  // Learning objectives
  objectives: [
    "Understand the importance of searching in computer science",
    "Learn linear search algorithm and its applications",
    "Master binary search and its requirements",
    "Compare different searching algorithms' efficiency",
    "Apply searching techniques to solve real-world problems"
  ],
  
  // Main lesson content
  content: `
    <h2>What is Searching?</h2>
    <p><strong>Searching</strong> is the process of finding a specific item or piece of information within a collection of data. It's one of the most fundamental operations in computer science and is used in countless applications, from finding a contact in your phone to searching for information on the internet.</p>
    
    <p>Searching is essential because:</p>
    <ul>
      <li>Data retrieval is a core function of most software systems</li>
      <li>Efficient searching saves time and computational resources</li>
      <li>It enables quick access to information in large datasets</li>
      <li>Forms the basis for more complex algorithms</li>
      <li>Critical for database operations and information systems</li>
    </ul>
    
    <h2>Types of Searching</h2>
    
    <h3>1. Linear Search (Sequential Search)</h3>
    <p>Linear search is the simplest searching algorithm that checks each element in a list one by one until the target item is found or the end of the list is reached.</p>
    
    <h4>How Linear Search Works:</h4>
    <ol>
      <li>Start at the first element of the list</li>
      <li>Compare the current element with the target value</li>
      <li>If they match, return the position (found!)</li>
      <li>If they don't match, move to the next element</li>
      <li>Repeat until found or end of list is reached</li>
    </ol>
    
    <h4>Linear Search Pseudocode:</h4>
    <pre><code>BEGIN Linear_Search(list, target)
    FOR i = 0 TO length(list) - 1
        IF list[i] = target THEN
            RETURN i  // Found at position i
        ENDIF
    ENDFOR
    RETURN -1  // Not found
END</code></pre>
    
    <h4>Example: Finding a Name in a List</h4>
    <pre><code>BEGIN Find_Student
    SET student_list = ["Alice", "Bob", "Charlie", "Diana", "Eve"]
    SET target_name = "Charlie"
    SET position = -1
    
    FOR i = 0 TO 4
        IF student_list[i] = target_name THEN
            SET position = i
            BREAK  // Exit loop when found
        ENDIF
    ENDFOR
    
    IF position ≠ -1 THEN
        DISPLAY target_name + " found at position " + position
    ELSE
        DISPLAY target_name + " not found in the list"
    ENDIF
END</code></pre>
    
    <h3>2. Binary Search</h3>
    <p>Binary search is a much more efficient algorithm that works on sorted lists by repeatedly dividing the search space in half.</p>
    
    <h4>Prerequisites for Binary Search:</h4>
    <ul>
      <li><strong>Sorted Data:</strong> The list must be arranged in ascending or descending order</li>
      <li><strong>Random Access:</strong> Ability to access any element directly by its index</li>
    </ul>
    
    <h4>How Binary Search Works:</h4>
    <ol>
      <li>Find the middle element of the sorted list</li>
      <li>Compare the middle element with the target value</li>
      <li>If they match, return the position (found!)</li>
      <li>If target is smaller, search the left half</li>
      <li>If target is larger, search the right half</li>
      <li>Repeat until found or search space is empty</li>
    </ol>
    
    <h4>Binary Search Pseudocode:</h4>
    <pre><code>BEGIN Binary_Search(sorted_list, target)
    SET left = 0
    SET right = length(sorted_list) - 1
    
    WHILE left <= right
        SET middle = (left + right) / 2
        
        IF sorted_list[middle] = target THEN
            RETURN middle  // Found at position middle
        ELSE IF sorted_list[middle] < target THEN
            SET left = middle + 1  // Search right half
        ELSE
            SET right = middle - 1  // Search left half
        ENDIF
    ENDWHILE
    
    RETURN -1  // Not found
END</code></pre>
    
    <h4>Example: Finding a Number in a Sorted Array</h4>
    <pre><code>BEGIN Binary_Search_Example
    SET numbers = [2, 5, 8, 12, 16, 23, 38, 45, 67, 78]
    SET target = 23
    SET left = 0
    SET right = 9
    SET found = FALSE
    
    WHILE left <= right AND NOT found
        SET middle = (left + right) / 2
        DISPLAY "Checking position " + middle + ": " + numbers[middle]
        
        IF numbers[middle] = target THEN
            DISPLAY "Found " + target + " at position " + middle
            SET found = TRUE
        ELSE IF numbers[middle] < target THEN
            DISPLAY target + " is larger, searching right half"
            SET left = middle + 1
        ELSE
            DISPLAY target + " is smaller, searching left half"
            SET right = middle - 1
        ENDIF
    ENDWHILE
    
    IF NOT found THEN
        DISPLAY target + " not found in the list"
    ENDIF
END</code></pre>
    
    <h2>Algorithm Efficiency Comparison</h2>
    
    <h3>Time Complexity</h3>
    <table border="1" style="border-collapse: collapse; width: 100%;">
      <tr>
        <th>Algorithm</th>
        <th>Best Case</th>
        <th>Average Case</th>
        <th>Worst Case</th>
        <th>When to Use</th>
      </tr>
      <tr>
        <td>Linear Search</td>
        <td>O(1)</td>
        <td>O(n)</td>
        <td>O(n)</td>
        <td>Small lists, unsorted data</td>
      </tr>
      <tr>
        <td>Binary Search</td>
        <td>O(1)</td>
        <td>O(log n)</td>
        <td>O(log n)</td>
        <td>Large sorted lists</td>
      </tr>
    </table>
    
    <h3>Performance Example</h3>
    <p>For a list of 1,000,000 items:</p>
    <ul>
      <li><strong>Linear Search:</strong> May need to check up to 1,000,000 items</li>
      <li><strong>Binary Search:</strong> Will find any item in at most 20 comparisons!</li>
    </ul>
    
    <h2>Advanced Searching Concepts</h2>
    
    <h3>1. Search with Multiple Criteria</h3>
    <pre><code>BEGIN Multi_Criteria_Search
    // Search for students by grade AND age
    FOR each student IN student_database
        IF student.grade = target_grade AND student.age >= min_age THEN
            ADD student TO results
        ENDIF
    ENDFOR
    RETURN results
END</code></pre>
    
    <h3>2. Fuzzy Search (Approximate Matching)</h3>
    <pre><code>BEGIN Fuzzy_Search(list, target, tolerance)
    SET results = []
    FOR each item IN list
        SET similarity = calculate_similarity(item, target)
        IF similarity >= tolerance THEN
            ADD item TO results
        ENDIF
    ENDFOR
    RETURN results
END</code></pre>
    
    <h3>3. Search in 2D Arrays</h3>
    <pre><code>BEGIN Search_2D_Array(matrix, target)
    FOR row = 0 TO number_of_rows - 1
        FOR col = 0 TO number_of_columns - 1
            IF matrix[row][col] = target THEN
                RETURN [row, col]  // Return coordinates
            ENDIF
        ENDFOR
    ENDFOR
    RETURN [-1, -1]  // Not found
END</code></pre>
    
    <h2>Real-World Applications</h2>
    
    <h3>1. Library Management System</h3>
    <pre><code>BEGIN Library_Search
    READ search_type  // "title", "author", "isbn"
    read search_term
    
    IF search_type = "isbn" THEN
        // Use binary search on sorted ISBN list
        result = binary_search(isbn_list, search_term)
    ELSE IF search_type = "title" OR search_type = "author" THEN
        // Use linear search with partial matching
        result = fuzzy_search(book_database, search_term)
    ENDIF
    
    display_search_results(result)
END</code></pre>
    
    <h3>2. E-commerce Product Search</h3>
    <pre><code>BEGIN Product_Search
    read search_query
    read price_range
    read category
    read sort_by  // "price", "rating", "popularity"
    
    SET filtered_products = []
    
    // First filter by category and price
    FOR each product IN product_database
        IF product.category = category AND 
           product.price >= price_range.min AND 
           product.price <= price_range.max THEN
            
            // Check if product matches search query
            IF product.name CONTAINS search_query OR 
               product.description CONTAINS search_query THEN
                ADD product TO filtered_products
            ENDIF
        ENDIF
    ENDFOR
    
    // Sort results
    sort(filtered_products, sort_by)
    
    display_products(filtered_products)
END</code></pre>
    
    <h2>Optimization Techniques</h2>
    
    <h3>1. Early Termination</h3>
    <p>Stop searching as soon as the target is found, especially in linear search.</p>
    
    <h3>2. Indexing</h3>
    <p>Create indexes (like hash tables) for frequently searched fields to speed up lookups.</p>
    
    <h3>3. Caching</h3>
    <p>Store recent search results to avoid repeating expensive searches.</p>
    
    <h3>4. Parallel Search</h3>
    <p>Divide the search space among multiple processors for faster results.</p>
  `,
  
  // Interactive elements and activities
  interactiveElements: [
    {
      type: "algorithm-visualizer",
      title: "Linear vs Binary Search Visualization",
      description: "Watch how linear and binary search algorithms work step by step.",
      data: [2, 5, 8, 12, 16, 23, 38, 45, 67, 78],
      target: 23,
      algorithms: ["linear", "binary"],
      showComparisons: true,
      showSteps: true
    },
    {
      type: "search-simulator",
      title: "Search Algorithm Race",
      description: "Compare the performance of different search algorithms on various data sizes.",
      dataSizes: [10, 100, 1000, 10000],
      algorithms: [
        { name: "Linear Search", complexity: "O(n)" },
        { name: "Binary Search", complexity: "O(log n)" }
      ],
      showGraph: true
    },
    {
      type: "code-trace",
      title: "Trace the Binary Search",
      description: "Follow the execution of binary search step by step.",
      code: `left = 0, right = 9, target = 16
array = [2, 5, 8, 12, 16, 23, 38, 45, 67, 78]

Step 1: middle = (0 + 9) / 2 = 4
        array[4] = 16 = target ✓ FOUND!`,
      steps: [
        { line: 1, variables: { left: 0, right: 9, middle: "?", target: 16 } },
        { line: 2, variables: { left: 0, right: 9, middle: 4, target: 16 } },
        { line: 3, variables: { left: 0, right: 9, middle: 4, target: 16, found: true } }
      ]
    },
    {
      type: "search-challenge",
      title: "Find the Hidden Number",
      description: "Use binary search strategy to find a hidden number between 1 and 100 in the fewest guesses.",
      minNumber: 1,
      maxNumber: 100,
      maxGuesses: 7,
      hints: [
        "Start with the middle number (50)",
        "Use the feedback to eliminate half the possibilities",
        "Always guess the middle of the remaining range"
      ]
    }
  ],
  
  // Reading materials and resources
  readings: [
    {
      title: "The History of Search Algorithms",
      content: `
        <p>Search algorithms have evolved alongside computer science itself. Here's a brief timeline of major developments:</p>
        
        <h4>1940s-1950s: Early Computing</h4>
        <p>Linear search was the natural first approach, as early computers had limited memory and simple data structures.</p>
        
        <h4>1960s: Binary Search</h4>
        <p>As computers became more powerful and data sets larger, the need for efficient searching led to the development of binary search. The algorithm was first published by John Mauchly in 1946, but wasn't widely implemented until the 1960s.</p>
        
        <h4>1970s-1980s: Advanced Data Structures</h4>
        <p>The development of hash tables, B-trees, and other advanced data structures revolutionized searching, enabling near-constant time lookups.</p>
        
        <h4>1990s-2000s: Internet Search</h4>
        <p>The explosion of the internet created new challenges in searching vast amounts of unstructured data, leading to innovations like Google's PageRank algorithm.</p>
        
        <h4>2010s-Present: Machine Learning</h4>
        <p>Modern search incorporates machine learning to understand user intent, provide relevant results, and even predict what users are looking for.</p>
      `
    },
    {
      title: "Search in Different Data Structures",
      content: `
        <p>The efficiency of search operations depends heavily on how data is organized:</p>
        
        <h4>Arrays and Lists</h4>
        <p>Linear search: O(n), Binary search (if sorted): O(log n)</p>
        
        <h4>Hash Tables</h4>
        <p>Average case: O(1), Worst case: O(n). Excellent for exact matches.</p>
        
        <h4>Binary Search Trees</h4>
        <p>Average case: O(log n), Worst case: O(n). Good for range queries.</p>
        
        <h4>B-Trees</h4>
        <p>O(log n) with better performance for disk-based storage. Used in databases.</p>
        
        <h4>Tries</h4>
        <p>O(m) where m is the length of the search key. Excellent for prefix matching.</p>
        
        <p>Understanding these trade-offs helps you choose the right data structure for your specific search requirements.</p>
      `
    }
  ],
  
  // Assessment questions
  assessments: [
    {
      type: "multiple-choice",
      question: "What is the main advantage of binary search over linear search?",
      options: [
        "It works on unsorted data",
        "It's easier to implement",
        "It's much faster for large datasets",
        "It uses less memory"
      ],
      correct: 2,
      explanation: "Binary search has O(log n) time complexity compared to linear search's O(n), making it much faster for large datasets."
    },
    {
      type: "multiple-choice",
      question: "What is required for binary search to work correctly?",
      options: [
        "The data must be stored in a linked list",
        "The data must be sorted",
        "The data must contain only numbers",
        "The data must be stored in memory"
      ],
      correct: 1,
      explanation: "Binary search requires the data to be sorted so it can eliminate half of the remaining possibilities with each comparison."
    },
    {
      type: "calculation",
      question: "In a sorted array of 1000 elements, what is the maximum number of comparisons needed for binary search to find an element (or determine it's not there)?",
      answer: 10,
      explanation: "Binary search has O(log₂ n) complexity. For 1000 elements: log₂(1000) ≈ 9.97, so maximum 10 comparisons are needed.",
      tolerance: 1
    },
    {
      type: "code-analysis",
      question: "What will this pseudocode return when searching for 15 in the array [10, 15, 20, 25, 30]?\n\nBEGIN Linear_Search\n    SET arr = [10, 15, 20, 25, 30]\n    SET target = 15\n    FOR i = 0 TO 4\n        IF arr[i] = target THEN\n            RETURN i\n        ENDIF\n    ENDFOR\n    RETURN -1\nEND",
      options: ["0", "1", "15", "-1"],
      correct: 1,
      explanation: "The element 15 is found at index 1 (second position) in the array, so the function returns 1."
    },
    {
      type: "short-answer",
      question: "Write pseudocode for a function that searches for a specific word in a list of sentences and returns all sentences containing that word.",
      sampleAnswer: `BEGIN Search_Sentences(sentences, target_word)
    SET results = []
    FOR each sentence IN sentences
        IF sentence CONTAINS target_word THEN
            ADD sentence TO results
        ENDIF
    ENDFOR
    RETURN results
END`,
      rubric: [
        "Iterates through all sentences",
        "Checks if each sentence contains the target word",
        "Collects matching sentences in a result list",
        "Returns the list of matching sentences",
        "Uses proper pseudocode syntax"
      ]
    }
  ],
  
  // Additional practice exercises
  practiceExercises: [
    {
      title: "Phone Book Search",
      description: "Design a search system for a phone book that can find contacts by name, phone number, or partial matches.",
      difficulty: "medium",
      hints: ["Consider different search strategies for different fields", "Think about how to handle partial matches", "What if the data is sorted vs unsorted?"]
    },
    {
      title: "Inventory Management Search",
      description: "Create a search system for a warehouse inventory that can find items by ID, name, category, or location.",
      difficulty: "medium",
      hints: ["Multiple search criteria might be used together", "Consider search performance for large inventories", "Think about real-time updates"]
    },
    {
      title: "Student Record Search",
      description: "Design a comprehensive search system for student records that supports searching by student ID, name, grade, class, and GPA range.",
      difficulty: "hard",
      hints: ["Some fields might be sorted, others not", "Range searches (GPA between X and Y)", "Combine multiple search criteria"]
    }
  ],
  
  // Key terms and vocabulary
  vocabulary: [
    {
      term: "Linear Search",
      definition: "A search algorithm that checks each element in a list sequentially until the target is found"
    },
    {
      term: "Binary Search",
      definition: "An efficient search algorithm that works on sorted data by repeatedly dividing the search space in half"
    },
    {
      term: "Time Complexity",
      definition: "A measure of how the running time of an algorithm increases with the size of the input"
    },
    {
      term: "Big O Notation",
      definition: "Mathematical notation used to describe the upper bound of an algorithm's time or space complexity"
    },
    {
      term: "Search Space",
      definition: "The collection of all possible locations where the target item might be found"
    }
  ],
  
  // Prerequisites and next steps
  prerequisites: [
    "Understanding of arrays and lists",
    "Basic knowledge of loops and conditionals",
    "Familiarity with pseudocode",
    "Understanding of sorting concepts"
  ],
  
  nextSteps: [
    "Learn about sorting algorithms",
    "Explore hash tables and hash functions",
    "Study tree data structures",
    "Investigate advanced search techniques",
    "Learn about database indexing"
  ]
};