export default {
  id: 'conditional-statements',
  title: 'Conditional Statements in Text-Based Programming',
  description: 'Master the art of decision-making in programming with if-else statements, switch cases, and logical operators.',
  grade: '7-9',
  subject: 'Computational Thinking',
  duration: '45 minutes',
  
  objectives: [
    "Understand what conditional statements are and why they're important",
    "Learn to write if, else if, and else statements",
    "Master switch statements for multiple conditions",
    "Use logical operators (&&, ||, !) effectively",
    "Apply conditional logic to solve real-world programming problems"
  ],
  
  // Main lesson content
  content: `
    <h2>What are Conditional Statements? 🚦</h2>
    <p><strong>Conditional statements</strong> are like traffic lights for your code - they help your program decide which path to take based on different situations! Just like you make decisions every day ("If it's raining, I'll take an umbrella"), programs use conditional statements to make smart choices automatically.</p>
    
    <p>Think of conditional statements as the "brain" of your program that allows it to:</p>
    <ul>
      <li>🎯 <strong>Make Decisions:</strong> Choose different actions based on conditions</li>
      <li>🔀 <strong>Control Flow:</strong> Direct your program down different paths</li>
      <li>🛡️ <strong>Handle Errors:</strong> Check for problems and respond appropriately</li>
      <li>🎮 <strong>Create Interactivity:</strong> Respond to user input and choices</li>
    </ul>

    <h2>The Basic If Statement 📝</h2>
    <p>The <code>if</code> statement is the foundation of conditional logic. It says: "If this condition is true, then do this action."</p>
    
    <h3>JavaScript If Statement Example</h3>
    <pre><code>let temperature = 25;

if (temperature > 20) {
    console.log("It's a warm day! Perfect for outdoor activities.");
}</code></pre>
    
    <h3>Python If Statement Example 🐍</h3>
    <pre><code># Python uses indentation instead of curly braces
temperature = 25

if temperature > 20:
    print("It's a warm day! Perfect for outdoor activities!")</code></pre>

    <h2>If-Else Statements ⚖️</h2>
    <p>Sometimes you want to do one thing if a condition is true, and something different if it's false. That's where <code>else</code> comes in!</p>
    
    <h3>JavaScript If-Else Example</h3>
    <pre><code>let age = 16;

if (age >= 18) {
    console.log("You can vote!");
} else {
    console.log("You're not old enough to vote yet.");
}</code></pre>
    
    <h3>Python If-Else Example 🐍</h3>
    <pre><code>age = 16

if age >= 18:
    print("You can vote!")
else:
    print("You're not old enough to vote yet.")</code></pre>

    <h2>Multiple Conditions with Else If 🎭</h2>
    <p>When you have more than two possibilities, you can chain conditions together using <code>else if</code> (or <code>elif</code> in Python).</p>
    
    <pre><code>let score = 85;

if (score >= 90) {
    console.log("Excellent! You got an A!");
} else if (score >= 80) {
    console.log("Great job! You got a B!");
} else if (score >= 70) {
    console.log("Good work! You got a C!");
} else if (score >= 60) {
    console.log("You passed with a D.");
} else {
    console.log("You need to study more. Try again!");
}</code></pre>

    <h2>Logical Operators 🧠</h2>
    <p>Logical operators help you combine multiple conditions to make more complex decisions:</p>
    
    <ul>
      <li><code>&&</code> (AND): Both conditions must be true</li>
      <li><code>||</code> (OR): At least one condition must be true</li>
      <li><code>!</code> (NOT): Reverses the condition</li>
    </ul>
    
    <pre><code>let age = 16;
let hasPermission = true;

// AND operator - both conditions must be true
if (age >= 16 && hasPermission) {
    console.log("You can drive!");
}

// OR operator - at least one condition must be true
if (age >= 18 || hasPermission) {
    console.log("You have some driving privileges!");
}

// NOT operator - reverses the condition
if (!hasPermission) {
    console.log("You need permission first!");
}</code></pre>

    <h2>Switch Statements 🎛️</h2>
    <p>When you have many possible values to check against, a <code>switch</code> statement can be cleaner than multiple <code>if-else</code> statements.</p>
    
    <pre><code>let day = "Monday";
let activity;

switch (day) {
    case "Monday":
        activity = "Math class";
        break;
    case "Tuesday":
        activity = "Science lab";
        break;
    case "Wednesday":
        activity = "Art project";
        break;
    case "Thursday":
        activity = "PE class";
        break;
    case "Friday":
        activity = "Quiz day";
        break;
    case "Saturday":
    case "Sunday":
        activity = "Weekend fun!";
        break;
    default:
        activity = "Unknown day";
}

console.log(\`Today's activity: \$\{activity\}\`);
</code></pre>
    
    <h3>Python Alternative (Dictionary Approach) 🐍</h3>
    <pre><code># Python doesn't have switch, but dictionaries work great!
day = "Monday"

activities = {
    "Monday": "Math class",
    "Tuesday": "Science lab",
    "Wednesday": "Art project",
    "Thursday": "PE class",
    "Friday": "Quiz day",
    "Saturday": "Weekend fun!",
    "Sunday": "Weekend fun!"
}

activity = activities.get(day, "Unknown day")
print(f"Today's activity: {activity}")</code></pre>

    <h2>Common Patterns and Best Practices 🎨</h2>
    
    <h3>Input Validation 🛡️</h3>
    <pre><code>function validateAge(age) {
    if (age < 0) {
        return "Age cannot be negative!";
    } else if (age > 150) {
        return "That seems too old to be realistic!";
    } else {
        return "Valid age!";
    }
}</code></pre>
    
    <h3>Nested Conditions 🪆</h3>
    <pre><code>let weather = "sunny";
let temperature = 25;

if (weather === "sunny") {
    if (temperature > 20) {
        console.log("Perfect day for a picnic!");
    } else {
        console.log("Sunny but a bit chilly.");
    }
} else if (weather === "rainy") {
    console.log("Better stay inside today.");
}</code></pre>
    
    <h3>Best Practices Tips 💡</h3>
    <ul>
      <li><strong>Keep It Simple:</strong> Don't nest conditions too deeply</li>
      <li><strong>Use Clear Comparisons:</strong> Be explicit about what you're checking</li>
      <li><strong>Consider Alternatives:</strong> Sometimes functions or lookup tables are clearer</li>
      <li><strong>Test Thoroughly:</strong> Check all possible paths through your conditions</li>
      <li><strong>Use Meaningful Names:</strong> Make your conditions self-documenting</li>
      <li><strong>Avoid Redundant Checks:</strong> Don't test the same condition multiple times</li>
      <li><strong>Consider Lookup Tables:</strong> For many conditions, dictionaries might be faster</li>
    </ul>
  `,
  
  // Interactive examples and activities
  examples: [
    {
      title: "Grade Calculator",
      description: "Create a program that converts numerical scores to letter grades",
      code: `function calculateGrade(score) {
  if (score >= 90) {
    return 'A';
  } else if (score >= 80) {
    return 'B';
  } else if (score >= 70) {
    return 'C';
  } else if (score >= 60) {
    return 'D';
  } else {
    return 'F';
  }
}

console.log(calculateGrade(85)); // Output: B`,
      explanation: "This function uses multiple if-else statements to determine letter grades based on numerical scores."
    },
    {
      title: "Weather Advisor",
      description: "A program that gives clothing advice based on weather conditions",
      code: `function clothingAdvice(temperature, isRaining) {
  let advice = "Wear ";
  
  if (temperature < 10) {
    advice += "a heavy coat";
  } else if (temperature < 20) {
    advice += "a light jacket";
  } else {
    advice += "a t-shirt";
  }
  
  if (isRaining) {
    advice += " and bring an umbrella";
  }
  
  return advice + "!";
}

console.log(clothingAdvice(15, true)); 
// Output: Wear a light jacket and bring an umbrella!`,
      explanation: "This example combines temperature and rain conditions to provide personalized clothing advice."
    },
    {
      title: "Simple Calculator with Validation",
      description: "A calculator that handles different operations and validates input",
      code: `function calculator(num1, num2, operation) {
  // Input validation
  if (typeof num1 !== 'number' || typeof num2 !== 'number') {
    return "Error: Please provide valid numbers";
  }
  
  switch (operation) {
    case '+':
      return num1 + num2;
    case '-':
      return num1 - num2;
    case '*':
      return num1 * num2;
    case '/':
      if (num2 === 0) {
        return "Error: Cannot divide by zero";
      }
      return num1 / num2;
    default:
      return "Error: Unknown operation";
  }
}

console.log(calculator(10, 5, '+')); // Output: 15
console.log(calculator(10, 0, '/')); // Output: Error: Cannot divide by zero`,
      explanation: "This calculator uses both if statements for validation and a switch statement for operations."
    }
  ],
  
  // Practice activities
  activities: [
    {
      title: "Age Group Classifier",
      description: "Write a function that classifies people into age groups: Child (0-12), Teen (13-19), Adult (20-64), Senior (65+)",
      difficulty: "Beginner",
      hints: [
        "Use if-else if statements to check age ranges",
        "Make sure to handle edge cases like negative ages",
        "Test with different age values"
      ]
    },
    {
      title: "Traffic Light Simulator",
      description: "Create a program that simulates traffic light behavior based on current color and time elapsed",
      difficulty: "Intermediate",
      hints: [
        "Use switch statements for different light colors",
        "Consider time as a factor in your conditions",
        "Think about the sequence: Red → Green → Yellow → Red"
      ]
    },
    {
      title: "Smart Home Controller",
      description: "Build a system that controls home devices based on time, occupancy, and user preferences",
      difficulty: "Advanced",
      hints: [
        "Combine multiple conditions with logical operators",
        "Consider nested conditions for complex scenarios",
        "Think about energy efficiency and user comfort"
      ]
    }
  ],
  
  // Assessment questions
  quiz: [
    {
      question: "What will this code output?\n\nlet x = 5;\nif (x > 3 && x < 10) {\n  console.log('A');\n} else {\n  console.log('B');\n}",
      options: ["A", "B", "Nothing", "Error"],
      correct: 0,
      explanation: "Since x (5) is greater than 3 AND less than 10, the condition is true, so 'A' is printed."
    },
    {
      question: "Which logical operator means 'OR' in JavaScript?",
      options: ["&&", "||", "!", "&"],
      correct: 1,
      explanation: "The || operator represents logical OR in JavaScript."
    },
    {
      question: "What's the main advantage of using a switch statement over multiple if-else statements?",
      options: [
        "It's always faster",
        "It's cleaner and more readable for multiple exact value comparisons",
        "It can handle ranges better",
        "It uses less memory"
      ],
      correct: 1,
      explanation: "Switch statements are cleaner and more readable when comparing a variable against multiple exact values."
    }
  ],
  
  // Additional resources
  resources: [
    {
      title: "MDN Web Docs - if...else",
      url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else",
      type: "documentation"
    },
    {
      title: "JavaScript Logical Operators",
      url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_Operators",
      type: "documentation"
    },
    {
      title: "Python Conditional Statements",
      url: "https://docs.python.org/3/tutorial/controlflow.html#if-statements",
      type: "documentation"
    }
  ]
};