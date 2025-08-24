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
    <h2>What is Finding Things? 🕵️‍♀️</h2>
    <p><strong>Finding things</strong> is like being a detective! When you look for your favorite toy, a book, or a friend's name in your phone, you're doing what computers call "searching." It's one of the most important things computers do every day!</p>
    
    <p>Finding things is super important because:</p>
    <ul>
      <li>It helps us get answers really fast, even when there are millions of things to look through!</li>
      <li>Good ways of finding things make games and apps work better and more fun</li>
      <li>Smart finding saves the computer's energy so it doesn't get tired</li>
      <li>It helps us organize our stuff better</li>
      <li>Almost every app and game uses finding to work properly</li>
    </ul>
    
    <h2>Two Cool Ways to Find Things! 🔍</h2>
    
    <h3>1. The Step-by-Step Way (Linear Search) 👣</h3>
    <p>This is like looking for your sock by checking every drawer one by one! We start at the beginning and check each thing until we find what we're looking for.</p>
    
    <h4>How the Step-by-Step Way Works:</h4>
    <ol>
      <li>Start at the very first thing in your list</li>
      <li>Ask "Is this what I'm looking for?"</li>
      <li>If yes - Hooray! You found it! 🎉</li>
      <li>If no - Move to the next thing</li>
      <li>Keep going until you find it or run out of things to check</li>
    </ol>
    
    <h4>Step-by-Step Search Instructions:</h4>
    <pre><code>BEGIN Find_Something_Step_By_Step(my_list, what_im_looking_for)
    FOR position = 0 TO length(my_list) - 1
        IF my_list[position] = what_im_looking_for THEN
            RETURN position  // Found it here!
        ENDIF
    ENDFOR
    RETURN -1  // Couldn't find it anywhere
END</code></pre>
    
    <h4>Example: Finding Your Friend's Name</h4>
    <pre><code>BEGIN Find_My_Friend
    SET friend_list = ["Alice", "Bob", "Charlie", "Diana", "Eve"]
    SET looking_for = "Charlie"
    SET where_found = -1
    
    FOR position = 0 TO 4
        IF friend_list[position] = looking_for THEN
            SET where_found = position
            BREAK  // Stop looking, we found them!
        ENDIF
    ENDFOR
    
    IF where_found ≠ -1 THEN
        DISPLAY looking_for + " is at position " + where_found + "! 🎉"
    ELSE
        DISPLAY looking_for + " is not in our friend list 😔"
    ENDIF
END</code></pre>
    
    <h3>2. The Super-Fast Way (Binary Search) ⚡</h3>
    <p>This is like playing a guessing game! But first, everything needs to be in order (like books on a shelf from A to Z). Then we can find things super quickly by always guessing the middle!</p>
    
    <h4>What You Need for the Super-Fast Way:</h4>
    <ul>
      <li><strong>Everything in Order:</strong> Your list must be sorted (like 1, 2, 3, 4, 5...)</li>
      <li><strong>Quick Access:</strong> You can jump to any spot in your list instantly</li>
    </ul>
    
    <h4>How the Super-Fast Way Works:</h4>
    <ol>
      <li>Look at the thing right in the middle of your sorted list</li>
      <li>Ask "Is this what I'm looking for?"</li>
      <li>If yes - Amazing! You found it! 🌟</li>
      <li>If what you want is smaller, look in the left half</li>
      <li>If what you want is bigger, look in the right half</li>
      <li>Keep cutting your search area in half until you find it!</li>
    </ol>
    
    <h4>Super-Fast Search Instructions:</h4>
    <pre><code>BEGIN Find_Something_Super_Fast(sorted_list, what_im_looking_for)
    SET left_side = 0
    SET right_side = length(sorted_list) - 1
    
    WHILE left_side <= right_side
        SET middle = (left_side + right_side) / 2
        
        IF sorted_list[middle] = what_im_looking_for THEN
            RETURN middle  // Found it in the middle!
        ELSE IF sorted_list[middle] < what_im_looking_for THEN
            SET left_side = middle + 1  // Look on the right side
        ELSE
            SET right_side = middle - 1  // Look on the left side
        ENDIF
    ENDWHILE
    
    RETURN -1  // Couldn't find it
END</code></pre>
    
    <h4>Example: Finding a Number in Order</h4>
    <pre><code>BEGIN Super_Fast_Number_Hunt
    SET ordered_numbers = [2, 5, 8, 12, 16, 23, 38, 45, 67, 78]
    SET target = 23
    SET left_side = 0
    SET right_side = 9
    SET found = FALSE
    
    WHILE left_side <= right_side AND NOT found
        SET middle = (left_side + right_side) / 2
        DISPLAY "Looking at position " + middle + ": " + ordered_numbers[middle]
        
        IF ordered_numbers[middle] = target THEN
            DISPLAY "Found " + target + " at position " + middle + "! 🎯"
            SET found = TRUE
        ELSE IF ordered_numbers[middle] < target THEN
            DISPLAY target + " is bigger, searching right side! ➡️"
            SET left_side = middle + 1
        ELSE
            DISPLAY target + " is smaller, searching left side! ⬅️"
            SET right_side = middle - 1
        ENDIF
    ENDWHILE
    
    IF NOT found THEN
        DISPLAY target + " is not in our list 😔"
    ENDIF
END</code></pre>
    
    <h2>Which Way is Faster? 🏃‍♀️💨</h2>
    
    <h3>Let's Compare Our Two Ways! 📊</h3>
    <p>Just like racing cars, we can see which way of finding things is faster! Let's find out which method wins the race.</p>
    
    <h4>Step-by-Step Way Speed:</h4>
    <ul>
      <li><strong>Super Lucky:</strong> 1 try - What you want is the very first thing! 🍀</li>
      <li><strong>Pretty Good:</strong> Half the list - What you want is somewhere in the middle</li>
      <li><strong>Oh No!:</strong> All the way - What you want is the very last thing or not there at all 😅</li>
    </ul>
    
    <h4>Super-Fast Way Speed:</h4>
    <ul>
      <li><strong>Super Lucky:</strong> 1 try - What you want is right in the middle! 🎯</li>
      <li><strong>Pretty Good:</strong> Just a few tries - We keep cutting the list in half</li>
      <li><strong>Even When Unlucky:</strong> Still just a few tries - Amazing! ⚡</li>
    </ul>
    
    <h4>Speed Race Results! 🏁</h4>
    <table border="1" style="border-collapse: collapse; width: 100%;">
      <tr>
        <th>How Many Things</th>
        <th>Step-by-Step Way (Worst Case)</th>
        <th>Super-Fast Way (Worst Case)</th>
        <th>Winner</th>
      </tr>
      <tr>
        <td>10 things</td>
        <td>10 tries 😓</td>
        <td>4 tries 😊</td>
        <td>Super-Fast! 🥇</td>
      </tr>
      <tr>
        <td>100 things</td>
        <td>100 tries 😰</td>
        <td>7 tries 😄</td>
        <td>Super-Fast! 🥇</td>
      </tr>
      <tr>
        <td>1,000 things</td>
        <td>1,000 tries 😵</td>
        <td>10 tries 🤩</td>
        <td>Super-Fast! 🥇</td>
      </tr>
      <tr>
        <td>1,000,000 things</td>
        <td>1,000,000 tries 🤯</td>
        <td>20 tries 🚀</td>
        <td>Super-Fast! 🥇</td>
      </tr>
    </table>
    
    <h4>When Should You Use Each Way? 🤔</h4>
    <ul>
      <li><strong>Step-by-Step Way:</strong> When you have just a few things, or when things aren't in order</li>
      <li><strong>Super-Fast Way:</strong> When you have lots of things AND they're already in order (like alphabetical!)</li>
    </ul>
    
    <h3>Amazing Example! 🌟</h3>
    <p>Imagine you have 1,000,000 Pokemon cards to search through:</p>
    <ul>
      <li><strong>Step-by-Step Way:</strong> You might have to look at ALL 1,000,000 cards! That would take forever! 😴</li>
      <li><strong>Super-Fast Way:</strong> You'll find any card in just 20 looks! That's like magic! ✨</li>
    </ul>
    
    <h2>Even Cooler Ways to Find Things! 🌟</h2>
    
    <h3>1. Finding Things with Multiple Clues 🕵️‍♀️</h3>
    <p>Sometimes you want to find something that matches MORE than one thing! Like finding all your friends who are in 5th grade AND like pizza!</p>
    <pre><code>BEGIN Find_Friends_With_Multiple_Clues
    // Find friends who are in 5th grade AND like pizza
    FOR each friend IN my_friend_list
        IF friend.grade = "5th grade" AND friend.likes_pizza = TRUE THEN
            ADD friend TO awesome_friends
        ENDIF
    ENDFOR
    RETURN awesome_friends
END</code></pre>
    
    <h3>2. Finding Things That Are "Close Enough" 🎯</h3>
    <p>Sometimes you can't remember exactly how to spell something, but you remember it's "close enough"! This is like when you search for "Pokeman" and it finds "Pokemon"!</p>
    <pre><code>BEGIN Find_Close_Enough_Match(my_list, what_im_looking_for, how_close)
    SET close_matches = []
    FOR each item IN my_list
        SET how_similar = check_how_similar(item, what_im_looking_for)
        IF how_similar >= how_close THEN
            ADD item TO close_matches
        ENDIF
    ENDFOR
    RETURN close_matches
END</code></pre>
    
    <h3>3. Finding Things in a Grid (Like Tic-Tac-Toe!) 🎮</h3>
    <p>Sometimes your things are arranged in rows and columns, like a tic-tac-toe board or a checkerboard!</p>
    <pre><code>BEGIN Find_In_Grid(game_board, what_im_looking_for)
    FOR row = 0 TO number_of_rows - 1
        FOR col = 0 TO number_of_columns - 1
            IF game_board[row][col] = what_im_looking_for THEN
                RETURN [row, col]  // Found it at this spot!
            ENDIF
        ENDFOR
    ENDFOR
    RETURN [-1, -1]  // Couldn't find it anywhere
END</code></pre>
    
    <h2>Cool Places Where Finding Things is Used! 🌍</h2>
    
    <h3>Internet Search (Like Google!) 🔍</h3>
    <p>When you search for "funny cat videos" on Google, it has to look through BILLIONS of websites super fast! It's like having the world's biggest library and finding exactly the book you want in seconds!</p>
    
    <h4>How Internet Search Works:</h4>
    <ol>
      <li><strong>Web Crawlers:</strong> Special robots visit every website (like digital explorers!)</li>
      <li><strong>Making Lists:</strong> They make huge lists of what's on each website</li>
      <li><strong>Ranking:</strong> They figure out which websites are most helpful for you</li>
      <li><strong>Finding Results:</strong> When you search, they instantly find the best matches!</li>
    </ol>
    
    <h3>Video Games and Apps 🎮</h3>
    <p>Your favorite games and apps use finding algorithms all the time! When you search for friends, look for items in your inventory, or when game characters find their way around!</p>
    
    <h4>Cool Game Examples:</h4>
    <ul>
      <li><strong>Finding Friends:</strong> When you search for your friend's username</li>
      <li><strong>Inventory Search:</strong> Finding that special sword in your huge collection</li>
      <li><strong>Smart Characters:</strong> When game characters find the best path to walk</li>
    </ul>
    
    <h3>Smart Robots and AI 🤖</h3>
    <p>Robots and smart computers use finding algorithms to make decisions and solve problems, just like how you might figure out the best way to clean your room!</p>
    
    <h4>Robot Examples:</h4>
    <ul>
      <li><strong>Game Playing:</strong> Chess computers finding the best moves</li>
      <li><strong>Robot Navigation:</strong> Robots finding their way around without bumping into things</li>
      <li><strong>Smart Learning:</strong> AI figuring out patterns in lots of information</li>
    </ul>
    
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