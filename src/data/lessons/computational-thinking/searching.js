// Lesson 1.3: Searching - Comprehensive lesson content

export default {
  title: "Finding Things Like a Detective! 🔍",
  description: "Learn how computers find things super fast, just like being a detective looking for clues!",
  difficulty: "beginner",
  estimatedTime: "45 minutes",
  
  // Learning objectives
  objectives: [
    "Learn why finding things quickly is important",
    "Discover how to search through lists step by step",
    "Learn the super-fast way to find things in sorted lists",
    "Compare which way of searching is faster",
    "Use searching to solve fun problems"
  ],
  
  // Main lesson content
  content: `
    <div class="lesson-intro">
      <h2>What is Searching? 🕵️‍♀️</h2>
      <p><strong>Searching</strong> is like being a detective! Every time you find a friend's name in your contacts or search for a video online, you're using search algorithms.</p>
      
      <div class="key-points">
        <h3>Why Searching Matters:</h3>
        <div class="point-grid">
          <div class="point-card">⚡ <strong>Speed:</strong> Find anything in millions of items instantly</div>
          <div class="point-card">🎮 <strong>Games:</strong> Powers your favorite apps and games</div>
          <div class="point-card">💡 <strong>Smart:</strong> Saves computer energy and time</div>
          <div class="point-card">🌐 <strong>Everywhere:</strong> Used in every digital device</div>
        </div>
      </div>
    </div>
    
    <div class="search-methods">
      <h2>Two Search Strategies! 🔍</h2>
      
      <div class="method-card">
        <h3>1. Linear Search (Step-by-Step) 👣</h3>
        <p>Like checking every drawer to find your socks!</p>
        
        <div class="algorithm-steps">
          <div class="step">1️⃣ Start at the beginning</div>
          <div class="step">2️⃣ Check: "Is this it?"</div>
          <div class="step">3️⃣ If yes → Found it! 🎉</div>
          <div class="step">4️⃣ If no → Move to next</div>
          <div class="step">5️⃣ Repeat until found</div>
        </div>
      </div>
    
        <div class="code-example">
          <h4>Linear Search Code:</h4>
          <pre><code>FOR each item in list:
    IF item == target:
        RETURN "Found it!" 🎉
    ENDIF
ENDFOR
RETURN "Not found" 😔</code></pre>
        </div>
      </div>
    
      <div class="method-card">
        <h3>2. Binary Search (Super-Fast!) ⚡</h3>
        <p>Like playing a number guessing game - always guess the middle!</p>
        
        <div class="requirements">
          <strong>Requirements:</strong> List must be sorted! 📊
        </div>
        
        <div class="algorithm-steps">
          <div class="step">1️⃣ Check the middle item</div>
          <div class="step">2️⃣ Too big? → Search left half</div>
          <div class="step">3️⃣ Too small? → Search right half</div>
          <div class="step">4️⃣ Repeat until found! 🌟</div>
        </div>
    
        <div class="code-example">
          <h4>Binary Search Code:</h4>
          <pre><code>WHILE left <= right:
    middle = (left + right) / 2
    IF list[middle] == target:
        RETURN "Found!" 🎯
    ELSE IF list[middle] < target:
        left = middle + 1  // Search right ➡️
    ELSE:
        right = middle - 1  // Search left ⬅️
    ENDIF
ENDWHILE</code></pre>
        </div>
      </div>
    </div>
    
    <div class="performance-comparison">
      <h2>Speed Comparison! 🏃‍♀️💨</h2>
      
      <div class="comparison-visual">
        <div class="speed-chart">
          <h3>The Amazing Difference! 📊</h3>
          <div class="chart-row">
            <span class="size">1,000 items:</span>
            <div class="bar linear">Linear: 1,000 steps 😵</div>
            <div class="bar binary">Binary: 10 steps 🚀</div>
          </div>
          <div class="chart-row">
            <span class="size">1,000,000 items:</span>
            <div class="bar linear">Linear: 1,000,000 steps 🤯</div>
            <div class="bar binary">Binary: 20 steps ✨</div>
          </div>
        </div>
        
        <div class="usage-guide">
          <h3>When to Use Each? 🤔</h3>
          <div class="usage-card">
            <strong>Linear Search:</strong> Small lists or unsorted data
          </div>
          <div class="usage-card">
            <strong>Binary Search:</strong> Large sorted lists (like phone books!)
          </div>
        </div>
      </div>
    </div>
    
    <div class="advanced-search">
      <h2>Advanced Search Techniques! 🌟</h2>
      
      <div class="technique-grid">
        <div class="technique-card">
          <h3>🕵️‍♀️ Multi-Criteria Search</h3>
          <p>Find items matching multiple conditions!</p>
          <div class="example">Find friends who like pizza AND are in 5th grade</div>
        </div>
        
        <div class="technique-card">
          <h3>🎯 Fuzzy Search</h3>
          <p>Find "close enough" matches!</p>
          <div class="example">Search "Pokeman" → finds "Pokemon"</div>
        </div>
        
        <div class="technique-card">
          <h3>🎮 Grid Search</h3>
          <p>Search in 2D spaces like game boards!</p>
          <div class="example">Find pieces on a chess board</div>
        </div>
      </div>
    </div>
    
    <div class="real-world-applications">
      <h2>Search in the Real World! 🌍</h2>
      
      <div class="application-showcase">
        <div class="app-card">
          <h3>🔍 Google Search</h3>
          <p>Searches billions of websites in milliseconds!</p>
          <div class="fun-fact">Processes 8.5 billion searches daily</div>
        </div>
        
        <div class="app-card">
          <h3>🎮 Video Games</h3>
          <p>Find friends, items, and navigate game worlds!</p>
          <div class="fun-fact">Every inventory search uses algorithms</div>
        </div>
        
        <div class="app-card">
          <h3>🤖 AI & Robots</h3>
          <p>Smart decisions and problem-solving!</p>
          <div class="fun-fact">Chess AI evaluates millions of moves</div>
        </div>
        
        <div class="app-card">
          <h3>📱 Your Phone</h3>
          <p>Contact search, app finding, photo search!</p>
          <div class="fun-fact">Face recognition uses search algorithms</div>
        </div>
      </div>
    </div>
    
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
  // Fun Quiz Time! 🎯
  assessments: [
    {
      type: "multiple-choice",
      question: "If you're looking for your favorite toy in a messy toy box by checking every toy one by one, which method are you using?",
      options: [
        "Super-Fast Way",
        "Step-by-Step Way",
        "Magic Box Way",
        "Family Tree Way"
      ],
      correct: 1,
      explanation: "That's the Step-by-Step Way! You're checking each toy one by one until you find your favorite! 🧸"
    },
    {
      type: "multiple-choice",
      question: "What do you need before you can use the Super-Fast Way to find something?",
      options: [
        "Things must be mixed up",
        "Things must be in order",
        "You need a magic wand",
        "You need to close your eyes"
      ],
      correct: 1,
      explanation: "Great job! The Super-Fast Way only works when things are in order, like books arranged A to Z! 📚"
    },
    {
      type: "multiple-choice",
      question: "In the Super-Fast Way, if the middle item is bigger than what you're looking for, where do you search next?",
      options: [
        "Look on the right side",
        "Look on the left side",
        "Give up",
        "Start over from the beginning"
      ],
      correct: 1,
      explanation: "Smart thinking! If the middle is too big, what you want must be on the left side with the smaller things! ⬅️"
    },
    {
      type: "true-false",
      question: "The Super-Fast Way is always better than the Step-by-Step Way.",
      correct: false,
      explanation: "Not always! The Step-by-Step Way is better when things aren't in order, or when you only have a few things to look through! 🤔"
    },
    {
      type: "short-answer",
      question: "Imagine you're looking for your friend's name in your class list. The list has names in alphabetical order. Which way would you use and why?",
      sampleAnswer: "I would use the Super-Fast Way (Binary Search) because the names are in alphabetical order! I'd start in the middle and keep cutting my search in half. This is much faster than checking every name one by one! 🚀",
      rubric: [
        "Identifies that binary search should be used",
        "Explains that the list is sorted (alphabetical order)",
        "Mentions the process of starting in the middle",
        "Explains why it's faster than linear search",
        "Uses child-friendly language"
      ]
    }
  ],
  
  // Additional practice exercises
  // Fun Practice Activities! 🎮
  practiceExercises: [
    {
      title: "Pokemon Card Collection Search 🎴",
      description: "Help organize and search through a Pokemon card collection! Find cards by name, type, or power level.",
      difficulty: "easy",
      hints: ["If the cards are sorted by name, use the Super-Fast Way!", "If they're mixed up, use the Step-by-Step Way", "Think about how you'd organize your own cards"]
    },
    {
      title: "Classroom Library Detective 📚",
      description: "Be a library detective! Help find books by title, author, or reading level in your classroom library.",
      difficulty: "easy",
      hints: ["Books are usually sorted alphabetically by title or author", "Use the Super-Fast Way for sorted shelves", "What if you're looking for all books by the same author?"]
    },
    {
      title: "Video Game High Score Hunter 🏆",
      description: "Create a system to find high scores in your favorite games! Search by player name, score, or game level.",
      difficulty: "medium",
      hints: ["High scores might be sorted from highest to lowest", "Player names might be in alphabetical order", "Think about finding all scores above a certain number"]
    }
  ],
  
  // Cool Words to Learn! 📚
  vocabulary: [
    {
      term: "Algorithm",
      definition: "A set of step-by-step instructions to solve a problem, like a recipe for cookies! 🍪"
    },
    {
      term: "Step-by-Step Search (Linear Search)",
      definition: "Looking through things one by one, like checking every drawer to find your socks! 👕"
    },
    {
      term: "Super-Fast Search (Binary Search)",
      definition: "A super smart way to find things by always looking in the middle and cutting your search in half! ⚡"
    },
    {
      term: "Speed (Time Complexity)",
      definition: "How fast or slow different ways of finding things are, like comparing a bicycle to a race car! 🚗💨"
    },
    {
      term: "Sorted List",
      definition: "Things arranged in order, like books on a shelf from A to Z, or numbers from 1 to 10! 📚"
    },
    {
      term: "Position (Index)",
      definition: "Where something is located in a list, like being 3rd in line or sitting in seat number 5! 📍"
    },
    {
      term: "Comparing",
      definition: "Checking if two things are the same, bigger, or smaller - like comparing the size of two apples! 🍎🍏"
    },
    {
      term: "Detective Work",
      definition: "Using clues and smart thinking to find what you're looking for, just like a real detective! 🕵️‍♀️"
    }
  ],
  
  // What You Should Know First 🤔
  prerequisites: [
    "Know how to count and put things in order (like 1, 2, 3...)",
    "Understand 'bigger than' and 'smaller than' (like 5 > 3)",
    "Know what a list is (like a shopping list or toy list)"
  ],
  
  // What's Next on Your Learning Adventure! 🚀
  nextSteps: [
    "Learn how to organize things in order (sorting)",
    "Discover special ways to store information (like treasure chests)",
    "Understand how fast different methods work",
    "Explore how big websites find things super quickly"
  ]
};