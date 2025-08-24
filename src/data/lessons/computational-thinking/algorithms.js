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
    <div className="algorithm-example">
      <div className="algorithm-description">
        <p>Merge Sort is a classic divide-and-conquer algorithm that efficiently sorts arrays by recursively dividing them into smaller subarrays and then merging them back in sorted order.</p>
      </div>
      
      <div className="algorithm-steps">
        <h5>Algorithm Steps:</h5>
        <div className="merge-sort-function">
          <h6>Merge Sort Function:</h6>
          <ol>
            <li><strong>Base Case:</strong> If array has 0 or 1 element, return it (already sorted)</li>
            <li><strong>Divide:</strong> Split array into two halves at the midpoint</li>
            <li><strong>Conquer:</strong> Recursively sort both halves</li>
            <li><strong>Combine:</strong> Merge the sorted halves back together</li>
          </ol>
        </div>
        
        <div className="merge-function">
          <h6>Merge Function:</h6>
          <ol>
            <li>Initialize empty result array and two pointers (i=0, j=0)</li>
            <li>Compare elements from both arrays and add smaller one to result</li>
            <li>Move the corresponding pointer forward</li>
            <li>Add any remaining elements from both arrays</li>
            <li>Return the merged result</li>
          </ol>
        </div>
      </div>
      
      <div className="algorithm-trace">
        <h5>Step-by-Step Execution Example:</h5>
        <div className="trace-step">
          <p><strong>Original array:</strong> [38, 27, 43, 3, 9, 82, 10]</p>
        </div>
        
        <div className="trace-step">
          <h6>Step 1: Initial Division</h6>
          <p>Divide [38, 27, 43, 3, 9, 82, 10]</p>
          <ul>
            <li><strong>Left half:</strong> [38, 27, 43]</li>
            <li><strong>Right half:</strong> [3, 9, 82, 10]</li>
          </ul>
        </div>
        
        <div className="trace-step">
          <h6>Step 2: Recursive Division (Left Half)</h6>
          <p>Divide [38, 27, 43]</p>
          <ul>
            <li><strong>Left:</strong> [38]</li>
            <li><strong>Right:</strong> [27, 43]</li>
          </ul>
          <p>Further divide [27, 43]</p>
          <ul>
            <li><strong>Left:</strong> [27]</li>
            <li><strong>Right:</strong> [43]</li>
          </ul>
        </div>
        
        <div className="trace-step">
          <h6>Step 3: Merging Back Up</h6>
          <ul>
            <li>Merge [27] and [43] → [27, 43]</li>
            <li>Merge [38] and [27, 43] → [27, 38, 43]</li>
          </ul>
        </div>
        
        <div className="trace-step">
          <h6>Step 4: Process Right Half</h6>
          <p>Divide [3, 9, 82, 10]</p>
          <ul>
            <li><strong>Left:</strong> [3, 9] → sorted: [3, 9]</li>
            <li><strong>Right:</strong> [82, 10] → sorted: [10, 82]</li>
            <li><strong>Merge:</strong> [3, 9, 10, 82]</li>
          </ul>
        </div>
        
        <div className="trace-step">
          <h6>Step 5: Final Merge</h6>
          <p>Merge [27, 38, 43] and [3, 9, 10, 82]</p>
          <p><strong>Final Result:</strong> [3, 9, 10, 27, 38, 43, 82]</p>
        </div>
      </div>
      
      <div className="algorithm-complexity">
        <h5>Time Complexity Analysis:</h5>
        <ul>
          <li><strong>Best Case:</strong> O(n log n)</li>
          <li><strong>Average Case:</strong> O(n log n)</li>
          <li><strong>Worst Case:</strong> O(n log n)</li>
          <li><strong>Space Complexity:</strong> O(n)</li>
        </ul>
      </div>
    </div>
    
    <h3>2. Greedy Algorithms</h3>
    <p>Make locally optimal choices at each step, hoping to find a global optimum.</p>
    
    <h4>Example: Activity Selection Problem</h4>
    <div className="algorithm-example">
      <div className="problem-description">
        <p><strong>Problem:</strong> Select the maximum number of non-overlapping activities from a given set of activities, each with a start and end time.</p>
        <p><strong>Greedy Strategy:</strong> Always choose the activity that ends earliest among the remaining activities.</p>
      </div>
      
      <div className="algorithm-steps">
        <h5>Algorithm Steps:</h5>
        <ol>
          <li><strong>Sort activities by end time</strong> (this is the greedy choice)</li>
          <li><strong>Initialize:</strong> Empty selection list and last_end_time = -1</li>
          <li><strong>For each activity in sorted order:</strong>
            <ul>
              <li>If activity's start time ≥ last_end_time, select it</li>
              <li>Update last_end_time to this activity's end time</li>
              <li>Otherwise, skip the activity (it conflicts)</li>
            </ul>
          </li>
        </ol>
      </div>
      
      <div className="example-execution">
        <h5>Example Execution:</h5>
        <div className="input-data">
          <h6>Input Activities:</h6>
          <ul>
            <li>Meeting A: 1-4</li>
            <li>Meeting B: 3-5</li>
            <li>Meeting C: 0-6</li>
            <li>Meeting D: 5-7</li>
            <li>Meeting E: 8-9</li>
            <li>Meeting F: 5-9</li>
            <li>Meeting G: 6-10</li>
            <li>Meeting H: 8-11</li>
            <li>Meeting I: 11-12</li>
            <li>Meeting J: 2-14</li>
          </ul>
        </div>
        
        <div className="sorting-step">
          <h6>Step 1: Sort by End Time</h6>
          <ol>
            <li>Meeting A: 1-4 (ends at 4)</li>
            <li>Meeting B: 3-5 (ends at 5)</li>
            <li>Meeting C: 0-6 (ends at 6)</li>
            <li>Meeting D: 5-7 (ends at 7)</li>
            <li>Meeting E: 8-9 (ends at 9)</li>
            <li>Meeting F: 5-9 (ends at 9)</li>
            <li>Meeting G: 6-10 (ends at 10)</li>
            <li>Meeting H: 8-11 (ends at 11)</li>
            <li>Meeting I: 11-12 (ends at 12)</li>
            <li>Meeting J: 2-14 (ends at 14)</li>
          </ol>
        </div>
        
        <div className="selection-process">
          <h6>Step 2: Greedy Selection Process</h6>
          <ul>
            <li>✓ <strong>Selected:</strong> Meeting A (1-4) - first activity</li>
            <li>✗ <strong>Skipped:</strong> Meeting B (3-5) - conflicts with A</li>
            <li>✗ <strong>Skipped:</strong> Meeting C (0-6) - conflicts with A</li>
            <li>✓ <strong>Selected:</strong> Meeting D (5-7) - starts after A ends</li>
            <li>✓ <strong>Selected:</strong> Meeting E (8-9) - starts after D ends</li>
            <li>✗ <strong>Skipped:</strong> Meeting F (5-9) - conflicts with D</li>
            <li>✗ <strong>Skipped:</strong> Meeting G (6-10) - conflicts with D</li>
            <li>✗ <strong>Skipped:</strong> Meeting H (8-11) - conflicts with E</li>
            <li>✓ <strong>Selected:</strong> Meeting I (11-12) - starts after E ends</li>
            <li>✗ <strong>Skipped:</strong> Meeting J (2-14) - conflicts with multiple</li>
          </ul>
        </div>
        
        <div className="optimal-solution">
          <h6>Optimal Solution (4 activities):</h6>
          <ul>
            <li>Meeting A: 1-4</li>
            <li>Meeting D: 5-7</li>
            <li>Meeting E: 8-9</li>
            <li>Meeting I: 11-12</li>
          </ul>
        </div>
      </div>
      
      <div className="optimality-proof">
        <h5>Why This Greedy Choice Works:</h5>
        <ul>
          <li><strong>Greedy Choice Property:</strong> By always choosing the activity that ends earliest, we leave the most room for future activities</li>
          <li><strong>Optimal Substructure:</strong> After selecting an activity, the remaining problem is independent</li>
          <li><strong>No Better Choice:</strong> Any other choice would end later, potentially blocking more future activities</li>
        </ul>
        
        <div className="complexity-analysis">
          <h6>Complexity Analysis:</h6>
          <ul>
            <li><strong>Time Complexity:</strong> O(n log n) - dominated by sorting</li>
            <li><strong>Space Complexity:</strong> O(1) - only constant extra space needed</li>
          </ul>
        </div>
      </div>
    </div>
    
    <h3>3. Dynamic Programming</h3>
    <p>Solve complex problems by breaking them down into simpler subproblems and storing results to avoid redundant calculations.</p>
    
    <h4>Example: Fibonacci Sequence with Memoization</h4>
    <div className="algorithm-example">
      <div className="problem-description">
        <p><strong>Problem:</strong> Compute the nth Fibonacci number efficiently using dynamic programming techniques.</p>
        <p><strong>Key Insight:</strong> The naive recursive approach recalculates the same values multiple times, leading to exponential time complexity.</p>
      </div>
      
      <div className="approach-comparison">
        <h5>Approach Comparison:</h5>
        
        <div className="naive-approach">
          <h6>1. Naive Recursive Approach (Inefficient)</h6>
          <div className="algorithm-description">
            <p><strong>Algorithm:</strong></p>
            <ul>
              <li>Base case: If n ≤ 1, return n</li>
              <li>Recursive case: Return Fibonacci(n-1) + Fibonacci(n-2)</li>
            </ul>
            <p><strong>Problem:</strong> Recalculates the same values repeatedly</p>
            <p><strong>Time Complexity:</strong> O(2^n) - exponential!</p>
            <p><strong>Example:</strong> For F(10), makes ~1024 function calls</p>
          </div>
        </div>
        
        <div className="memoized-approach">
          <h6>2. Memoized Approach (Top-Down DP)</h6>
          <div className="algorithm-description">
            <p><strong>Algorithm:</strong></p>
            <ul>
              <li>Use a cache (hash table) to store computed results</li>
              <li>Before computing, check if result is already cached</li>
              <li>If cached, return the stored result (cache hit)</li>
              <li>If not cached, compute recursively and store result</li>
            </ul>
            <p><strong>Time Complexity:</strong> O(n) - each value computed once</p>
            <p><strong>Space Complexity:</strong> O(n) - for cache and recursion stack</p>
          </div>
          
          <div className="execution-trace">
            <h6>Execution Trace for F(5):</h6>
            <ol>
              <li>F(5): Not cached, compute F(4) + F(3)</li>
              <li>F(4): Not cached, compute F(3) + F(2)</li>
              <li>F(3): Not cached, compute F(2) + F(1)</li>
              <li>F(2): Not cached, compute F(1) + F(0)</li>
              <li>F(1): Base case = 1, cache it</li>
              <li>F(0): Base case = 0, cache it</li>
              <li>F(2): 1 + 0 = 1, cache it</li>
              <li>F(3): 1 + 1 = 2, cache it</li>
              <li>F(4): 2 + 1 = 3, cache it (F(2) from cache)</li>
              <li>F(5): 3 + 2 = 5, cache it (F(3) from cache)</li>
            </ol>
          </div>
        </div>
        
        <div className="bottom-up-approach">
          <h6>3. Bottom-Up Approach (Tabulation)</h6>
          <div className="algorithm-description">
            <p><strong>Algorithm:</strong></p>
            <ul>
              <li>Create a table to store results from F(0) to F(n)</li>
              <li>Initialize base cases: F(0) = 0, F(1) = 1</li>
              <li>Fill table iteratively: F(i) = F(i-1) + F(i-2)</li>
              <li>Return F(n) from the table</li>
            </ul>
            <p><strong>Time Complexity:</strong> O(n)</p>
            <p><strong>Space Complexity:</strong> O(n) - for the table</p>
          </div>
          
          <div className="execution-trace">
            <h6>Bottom-Up Computation for F(6):</h6>
            <ol>
              <li>Initialize: F(0) = 0, F(1) = 1</li>
              <li>F(2) = F(1) + F(0) = 1 + 0 = 1</li>
              <li>F(3) = F(2) + F(1) = 1 + 1 = 2</li>
              <li>F(4) = F(3) + F(2) = 2 + 1 = 3</li>
              <li>F(5) = F(4) + F(3) = 3 + 2 = 5</li>
              <li>F(6) = F(5) + F(4) = 5 + 3 = 8</li>
            </ol>
          </div>
        </div>
        
        <div className="space-optimized-approach">
          <h6>4. Space-Optimized Approach</h6>
          <div className="algorithm-description">
            <p><strong>Algorithm:</strong></p>
            <ul>
              <li>Only keep track of the last two values (a, b)</li>
              <li>Iteratively update: temp = a + b, a = b, b = temp</li>
              <li>No need for a full table</li>
            </ul>
            <p><strong>Time Complexity:</strong> O(n)</p>
            <p><strong>Space Complexity:</strong> O(1) - constant space!</p>
          </div>
        </div>
      </div>
      
      <div className="performance-comparison">
        <h5>Performance Comparison for F(10):</h5>
        <div className="comparison-table">
          <div className="approach-row">
            <h6>1. Naive Recursive:</h6>
            <ul>
              <li><strong>Time Complexity:</strong> O(2^n) - exponential</li>
              <li><strong>Function Calls:</strong> ~1024 calls</li>
              <li><strong>Result:</strong> 55</li>
              <li><strong>Efficiency:</strong> Very poor for large n</li>
            </ul>
          </div>
          
          <div className="approach-row">
            <h6>2. Memoized (Top-Down):</h6>
            <ul>
              <li><strong>Time Complexity:</strong> O(n) - linear</li>
              <li><strong>Function Calls:</strong> 11 calls (each F(i) computed once)</li>
              <li><strong>Result:</strong> 55</li>
              <li><strong>Efficiency:</strong> Excellent, but uses recursion stack</li>
            </ul>
          </div>
          
          <div className="approach-row">
            <h6>3. Bottom-Up (Tabulation):</h6>
            <ul>
              <li><strong>Time Complexity:</strong> O(n) - linear</li>
              <li><strong>Space Complexity:</strong> O(n) - for table</li>
              <li><strong>Result:</strong> 55</li>
              <li><strong>Efficiency:</strong> Excellent, no recursion overhead</li>
            </ul>
          </div>
          
          <div className="approach-row">
            <h6>4. Space-Optimized:</h6>
            <ul>
              <li><strong>Time Complexity:</strong> O(n) - linear</li>
              <li><strong>Space Complexity:</strong> O(1) - constant</li>
              <li><strong>Result:</strong> 55</li>
              <li><strong>Efficiency:</strong> Most efficient overall!</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="dp-principles">
        <h5>Dynamic Programming Key Principles:</h5>
        <ul>
          <li><strong>Optimal Substructure:</strong> Solution can be constructed from optimal solutions of subproblems</li>
          <li><strong>Overlapping Subproblems:</strong> Same subproblems are solved multiple times</li>
          <li><strong>Memoization:</strong> Store results to avoid recomputation</li>
          <li><strong>Tabulation:</strong> Build solution bottom-up using a table</li>
        </ul>
      </div>
    </div>
    
    <h2>Algorithm Analysis</h2>
    
    <h3>Time Complexity (Big O Notation)</h3>
    <p>Time complexity describes how the runtime of an algorithm grows with input size.</p>
    
    <div className="complexity-analysis">
      <h4>Time Complexity Categories</h4>
      
      <div className="complexity-category">
        <h5>O(1) - Constant Time</h5>
        <div className="complexity-description">
          <p><strong>Definition:</strong> Algorithm takes the same amount of time regardless of input size.</p>
          <p><strong>Examples:</strong></p>
          <ul>
            <li>Array element access: array[index]</li>
            <li>Hash table lookup (average case)</li>
            <li>Stack push/pop operations</li>
            <li>Simple arithmetic operations</li>
          </ul>
          <p><strong>Performance:</strong> Best possible - always fast!</p>
        </div>
      </div>
      
      <div className="complexity-category">
        <h5>O(log n) - Logarithmic Time</h5>
        <div className="complexity-description">
          <p><strong>Definition:</strong> Algorithm's runtime grows logarithmically with input size.</p>
          <p><strong>Key Insight:</strong> Each step eliminates half of the remaining possibilities.</p>
          
          <div className="binary-search-example">
            <h6>Example: Binary Search</h6>
            <div className="algorithm-steps">
              <p><strong>Algorithm:</strong></p>
              <ol>
                <li>Start with left = 0, right = array.length - 1</li>
                <li>While left ≤ right:</li>
                <li>Calculate mid = (left + right) / 2</li>
                <li>If array[mid] equals target, return mid</li>
                <li>If array[mid] < target, search right half (left = mid + 1)</li>
                <li>If array[mid] > target, search left half (right = mid - 1)</li>
              </ol>
            </div>
            
            <div className="search-trace">
              <h6>Search Trace for target=7 in [1,3,5,7,9,11,13,15]:</h6>
              <ol>
                <li><strong>Step 1:</strong> left=0, right=7, mid=3, array[3]=7 → Found in 1 comparison!</li>
              </ol>
              <p><strong>Worst case:</strong> For array of size 8, maximum 3 comparisons needed</p>
            </div>
          </div>
          
          <p><strong>Other Examples:</strong> Balanced tree operations, divide-and-conquer algorithms</p>
        </div>
      </div>
      
      <div className="complexity-category">
        <h5>O(n) - Linear Time</h5>
        <div className="complexity-description">
          <p><strong>Definition:</strong> Algorithm's runtime grows linearly with input size.</p>
          <p><strong>Key Insight:</strong> Must examine each element once.</p>
          
          <div className="linear-search-example">
            <h6>Example: Linear Search</h6>
            <p><strong>Algorithm:</strong> Check each element sequentially until target is found or end is reached.</p>
            <p><strong>Best Case:</strong> O(1) - target is first element</p>
            <p><strong>Average Case:</strong> O(n/2) ≈ O(n) - target is in middle</p>
            <p><strong>Worst Case:</strong> O(n) - target is last element or not found</p>
          </div>
          
          <p><strong>Other Examples:</strong> Single loop through data, finding min/max, array traversal</p>
        </div>
      </div>
      
      <div className="complexity-category">
        <h5>O(n log n) - Linearithmic Time</h5>
        <div className="complexity-description">
          <p><strong>Definition:</strong> Combination of linear and logarithmic growth.</p>
          <p><strong>Key Insight:</strong> Often involves dividing problem and processing each part.</p>
          <p><strong>Examples:</strong></p>
          <ul>
            <li>Merge Sort - divides array (log n levels) and merges (n operations per level)</li>
            <li>Heap Sort - builds heap and extracts elements</li>
            <li>Efficient comparison-based sorting algorithms</li>
          </ul>
          <p><strong>Performance:</strong> Optimal for comparison-based sorting</p>
        </div>
      </div>
      
      <div className="complexity-category">
        <h5>O(n²) - Quadratic Time</h5>
        <div className="complexity-description">
          <p><strong>Definition:</strong> Algorithm's runtime grows quadratically with input size.</p>
          <p><strong>Key Insight:</strong> Usually involves nested loops over the data.</p>
          
          <div className="bubble-sort-example">
            <h6>Example: Bubble Sort Analysis</h6>
            <div className="algorithm-analysis">
              <p><strong>Algorithm:</strong> Repeatedly compare adjacent elements and swap if needed.</p>
              <p><strong>Nested Loop Structure:</strong></p>
              <ul>
                <li>Outer loop: n-1 iterations</li>
                <li>Inner loop: decreasing from n-1 to 1</li>
                <li>Total comparisons: (n-1) + (n-2) + ... + 1 = n(n-1)/2 ≈ n²/2</li>
              </ul>
              
              <div className="complexity-calculation">
                <h6>For array of size n=5:</h6>
                <ul>
                  <li><strong>Comparisons:</strong> 4 + 3 + 2 + 1 = 10 = 5×4/2</li>
                  <li><strong>Time Complexity:</strong> O(5²) = O(25)</li>
                  <li><strong>Growth:</strong> Doubles input → 4× runtime</li>
                </ul>
              </div>
            </div>
          </div>
          
          <p><strong>Other Examples:</strong> Selection sort, insertion sort, nested loops</p>
        </div>
      </div>
      
      <div className="complexity-category">
        <h5>O(2^n) - Exponential Time</h5>
        <div className="complexity-description">
          <p><strong>Definition:</strong> Algorithm's runtime doubles with each additional input element.</p>
          <p><strong>Key Insight:</strong> Usually involves exploring all possible combinations.</p>
          
          <div className="exponential-example">
            <h6>Example: Counting All Subsets</h6>
            <p><strong>Problem:</strong> For each element, we have 2 choices (include or exclude)</p>
            <p><strong>Total subsets:</strong> 2^n</p>
            <ul>
              <li>Set {A}: subsets = {}, {A} → 2¹ = 2</li>
              <li>Set {A,B}: subsets = {}, {A}, {B}, {A,B} → 2² = 4</li>
              <li>Set {A,B,C}: 8 subsets → 2³ = 8</li>
            </ul>
          </div>
          
          <p><strong>Performance:</strong> Becomes impractical very quickly!</p>
          <p><strong>Other Examples:</strong> Naive recursive Fibonacci, brute force algorithms</p>
        </div>
      </div>
      
      <div className="complexity-comparison">
        <h5>Complexity Growth Comparison</h5>
        <div className="comparison-table">
          <h6>Operations Required for Different Input Sizes:</h6>
          
          <div className="size-comparison">
            <div className="size-row">
              <h6>n = 10:</h6>
              <ul>
                <li>O(1): 1 operation</li>
                <li>O(log n): ~3 operations</li>
                <li>O(n): 10 operations</li>
                <li>O(n log n): ~33 operations</li>
                <li>O(n²): 100 operations</li>
                <li>O(2^n): 1,024 operations</li>
              </ul>
            </div>
            
            <div className="size-row">
              <h6>n = 100:</h6>
              <ul>
                <li>O(1): 1 operation</li>
                <li>O(log n): ~7 operations</li>
                <li>O(n): 100 operations</li>
                <li>O(n log n): ~664 operations</li>
                <li>O(n²): 10,000 operations</li>
                <li>O(2^n): 2^100 operations (impractical!)</li>
              </ul>
            </div>
            
            <div className="size-row">
              <h6>n = 1,000:</h6>
              <ul>
                <li>O(1): 1 operation</li>
                <li>O(log n): ~10 operations</li>
                <li>O(n): 1,000 operations</li>
                <li>O(n log n): ~9,966 operations</li>
                <li>O(n²): 1,000,000 operations</li>
                <li>O(2^n): Impossible to compute!</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <h3>Space Complexity</h3>
    <p>Space complexity describes how much memory an algorithm uses relative to input size.</p>
    
    <div className="space-complexity-analysis">
      <h4>Space Complexity Categories</h4>
      
      <div className="space-category">
        <h5>O(1) - Constant Space</h5>
        <div className="space-description">
          <p><strong>Definition:</strong> Algorithm uses a fixed amount of memory regardless of input size.</p>
          
          <div className="constant-space-example">
            <h6>Example: Finding Maximum Element</h6>
            <div className="algorithm-description">
              <p><strong>Algorithm:</strong></p>
              <ol>
                <li>Initialize max = first element</li>
                <li>Loop through remaining elements</li>
                <li>Update max if current element is larger</li>
                <li>Return max</li>
              </ol>
              <p><strong>Memory Usage:</strong> Only one extra variable (max) regardless of array size</p>
              <p><strong>Space Complexity:</strong> O(1) - constant space</p>
            </div>
          </div>
          
          <p><strong>Other Examples:</strong> Simple calculations, in-place sorting, iterative algorithms</p>
        </div>
      </div>
      
      <div className="space-category">
        <h5>O(n) - Linear Space</h5>
        <div className="space-description">
          <p><strong>Definition:</strong> Memory usage grows linearly with input size.</p>
          
          <div className="linear-space-example">
            <h6>Example: Array Reversal (Creating New Array)</h6>
            <div className="algorithm-description">
              <p><strong>Algorithm:</strong></p>
              <ol>
                <li>Create new array of same size as input</li>
                <li>Copy elements in reverse order</li>
                <li>Return new array</li>
              </ol>
              <p><strong>Memory Usage:</strong> New array of size n</p>
              <p><strong>Space Complexity:</strong> O(n) - linear space</p>
            </div>
          </div>
          
          <p><strong>Other Examples:</strong> Hash tables, dynamic arrays, storing intermediate results</p>
        </div>
      </div>
      
      <div className="space-category">
        <h5>O(log n) - Logarithmic Space</h5>
        <div className="space-description">
          <p><strong>Definition:</strong> Memory usage grows logarithmically with input size.</p>
          
          <div className="logarithmic-space-example">
            <h6>Example: Recursive Binary Search</h6>
            <div className="algorithm-description">
              <p><strong>Algorithm:</strong> Each recursive call adds a frame to the call stack</p>
              <p><strong>Call Stack Depth:</strong> Maximum log₂(n) recursive calls</p>
              <p><strong>Memory Usage:</strong> Each call frame stores a few variables (left, right, mid)</p>
              <p><strong>Space Complexity:</strong> O(log n) - logarithmic space</p>
            </div>
            
            <div className="recursion-trace">
              <h6>Call Stack for Binary Search (array size 8):</h6>
              <ol>
                <li>Call 1: search(0, 7) → max depth = 3 calls</li>
                <li>Call 2: search(0, 3) or search(4, 7)</li>
                <li>Call 3: search(0, 1) or search(2, 3) etc.</li>
              </ol>
              <p><strong>Maximum stack depth:</strong> ⌈log₂(8)⌉ = 3</p>
            </div>
          </div>
          
          <p><strong>Other Examples:</strong> Recursive divide-and-conquer algorithms, balanced tree traversal</p>
        </div>
      </div>
      
      <div className="space-time-tradeoffs">
        <h5>Space-Time Tradeoffs</h5>
        <div className="tradeoff-description">
          <p><strong>Key Concept:</strong> Often we can trade space for time or vice versa.</p>
          
          <div className="fibonacci-comparison">
            <h6>Example: Fibonacci Space-Time Tradeoffs</h6>
            
            <div className="approach-comparison">
              <div className="space-optimized">
                <h6>Space-Optimized Approach:</h6>
                <ul>
                  <li><strong>Time Complexity:</strong> O(n)</li>
                  <li><strong>Space Complexity:</strong> O(1)</li>
                  <li><strong>Memory Usage:</strong> Only 3 variables (prev2, prev1, current)</li>
                  <li><strong>Trade-off:</strong> Minimal memory, but can't access all intermediate values</li>
                </ul>
              </div>
              
              <div className="space-intensive">
                <h6>Space-Intensive Approach (Tabulation):</h6>
                <ul>
                  <li><strong>Time Complexity:</strong> O(n)</li>
                  <li><strong>Space Complexity:</strong> O(n)</li>
                  <li><strong>Memory Usage:</strong> Array of size n+1 to store all values</li>
                  <li><strong>Trade-off:</strong> More memory, but all intermediate results available</li>
                </ul>
              </div>
            </div>
            
            <div className="when-to-use">
              <h6>When to Use Each Approach:</h6>
              <ul>
                <li><strong>O(1) Space:</strong> When memory is limited and only final result needed</li>
                <li><strong>O(n) Space:</strong> When you need to access intermediate results or when memory is abundant</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-optimization-tips">
        <h5>Space Optimization Strategies</h5>
        <ul>
          <li><strong>In-place algorithms:</strong> Modify input data structure instead of creating new ones</li>
          <li><strong>Iterative vs Recursive:</strong> Replace recursion with iteration to avoid call stack overhead</li>
          <li><strong>Rolling arrays:</strong> Use circular buffers when only recent values are needed</li>
          <li><strong>Bit manipulation:</strong> Use bits instead of boolean arrays for space efficiency</li>
          <li><strong>Lazy evaluation:</strong> Compute values only when needed</li>
        </ul>
      </div>
    </div>
    
    <h2>Algorithm Optimization Strategies</h2>
    
    <div className="optimization-strategies">
      <h3>1. Early Termination</h3>
      <div className="optimization-technique">
        <p><strong>Concept:</strong> Stop algorithm execution as soon as the desired result is found or when it's impossible to find a better solution.</p>
        
        <div className="early-termination-example">
          <h4>Example: Optimized Linear Search</h4>
          <div className="algorithm-description">
            <p><strong>Standard Linear Search:</strong> Always checks all elements even after finding target</p>
            <p><strong>Optimized Version:</strong> Stops immediately when target is found</p>
            
            <div className="optimization-steps">
              <h5>Algorithm Steps:</h5>
              <ol>
                <li>Iterate through array elements</li>
                <li><strong>Early Termination 1:</strong> Return index immediately when target found</li>
                <li><strong>Early Termination 2:</strong> For sorted arrays, stop if current element > target</li>
                <li>Return -1 if target not found</li>
              </ol>
            </div>
            
            <div className="performance-improvement">
              <h5>Performance Improvement:</h5>
              <ul>
                <li><strong>Best Case:</strong> O(1) instead of O(n) when target is first element</li>
                <li><strong>Average Case:</strong> O(n/2) instead of O(n) for random data</li>
                <li><strong>Sorted Arrays:</strong> Can terminate early when target cannot exist</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="other-examples">
          <h5>Other Early Termination Examples:</h5>
          <ul>
            <li><strong>Sorting:</strong> Stop bubble sort early if no swaps occur in a pass</li>
            <li><strong>Graph Search:</strong> Stop BFS/DFS when target node is found</li>
            <li><strong>Optimization:</strong> Stop when solution is "good enough" (approximation algorithms)</li>
          </ul>
        </div>
      </div>
      
      <h3>2. Caching and Memoization</h3>
      <div className="optimization-technique">
        <p><strong>Concept:</strong> Store results of expensive computations to avoid recalculating them.</p>
        
        <div className="memoization-example">
          <h4>Example: Expensive Computation with Cache</h4>
          <div className="algorithm-description">
            <div className="caching-steps">
              <h5>Algorithm Steps:</h5>
              <ol>
                <li><strong>Check Cache:</strong> Look up input in cache first</li>
                <li><strong>Cache Hit:</strong> Return cached result immediately</li>
                <li><strong>Cache Miss:</strong> Perform expensive computation</li>
                <li><strong>Store Result:</strong> Save result in cache for future use</li>
                <li>Return computed result</li>
              </ol>
            </div>
            
            <div className="cache-benefits">
              <h5>Benefits:</h5>
              <ul>
                <li><strong>Time Savings:</strong> O(1) lookup vs O(expensive) computation</li>
                <li><strong>Repeated Calls:</strong> Dramatic speedup for recurring inputs</li>
                <li><strong>Space-Time Tradeoff:</strong> Use memory to save computation time</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="memoization-applications">
          <h5>Common Applications:</h5>
          <ul>
            <li><strong>Dynamic Programming:</strong> Fibonacci, longest common subsequence</li>
            <li><strong>Web Applications:</strong> Database query results, API responses</li>
            <li><strong>Mathematical Functions:</strong> Factorial, prime checking</li>
            <li><strong>Recursive Algorithms:</strong> Tree traversals with repeated subtrees</li>
          </ul>
        </div>
      </div>
      
      <h3>3. Loop Optimization</h3>
      <div className="optimization-technique">
        <p><strong>Concept:</strong> Improve loop performance through better memory access patterns and reduced overhead.</p>
        
        <div className="loop-optimization-example">
          <h4>Example: Matrix Multiplication Optimization</h4>
          
          <div className="unoptimized-approach">
            <h5>Unoptimized Approach (i-j-k order):</h5>
            <div className="algorithm-analysis">
              <p><strong>Loop Order:</strong> i → j → k</p>
              <p><strong>Memory Access Pattern:</strong> Poor cache locality for matrix B</p>
              <p><strong>Cache Misses:</strong> High due to non-sequential access to B[k][j]</p>
            </div>
          </div>
          
          <div className="optimized-approach">
            <h5>Optimized Approach (i-k-j order):</h5>
            <div className="algorithm-analysis">
              <p><strong>Loop Order:</strong> i → k → j</p>
              <p><strong>Memory Access Pattern:</strong> Better cache locality</p>
              <p><strong>Benefits:</strong></p>
              <ul>
                <li>Sequential access to result[i][j] in innermost loop</li>
                <li>Better cache utilization for matrix A and result</li>
                <li>Reduced cache misses and memory stalls</li>
              </ul>
              <p><strong>Performance Gain:</strong> 2-3x speedup for large matrices</p>
            </div>
          </div>
        </div>
        
        <div className="loop-optimization-techniques">
          <h5>Other Loop Optimization Techniques:</h5>
          <ul>
            <li><strong>Loop Unrolling:</strong> Reduce loop overhead by processing multiple elements per iteration</li>
            <li><strong>Loop Fusion:</strong> Combine multiple loops that iterate over same data</li>
            <li><strong>Loop Tiling:</strong> Break large loops into smaller blocks for better cache usage</li>
            <li><strong>Strength Reduction:</strong> Replace expensive operations with cheaper ones</li>
            <li><strong>Loop Invariant Motion:</strong> Move calculations outside loops when possible</li>
          </ul>
        </div>
      </div>
      
      <div className="optimization-principles">
        <h4>General Optimization Principles</h4>
        <ul>
          <li><strong>Measure First:</strong> Profile code to identify actual bottlenecks</li>
          <li><strong>Algorithmic Improvements:</strong> Often more impactful than micro-optimizations</li>
          <li><strong>Memory Hierarchy:</strong> Optimize for cache-friendly access patterns</li>
          <li><strong>Trade-offs:</strong> Balance time, space, and code complexity</li>
          <li><strong>Premature Optimization:</strong> Avoid optimizing before identifying real performance issues</li>
        </ul>
      </div>
    </div>
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