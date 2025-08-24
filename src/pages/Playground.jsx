import React, { useState, useEffect, Suspense } from 'react';
import { ArrowLeft, Play, RotateCcw, BookOpen, TestTube, ChevronRight, Code, Zap, CheckCircle, Monitor, Cpu, GraduationCap } from 'lucide-react';
import { grades, topics } from '../data/topics';
import '../styles/Playground.css';
import '../styles/PlaygroundSelection.css';

// Lazy load components for better performance
const ArduinoPlayground = React.lazy(() => import('../components/ArduinoPlayground'));
const ProfessionalIDE = React.lazy(() => import('../components/ProfessionalIDE'));
const ArduinoSimulator = React.lazy(() => import('../components/ArduinoSimulator'));

const Playground = ({ onNavigate, gradeLevel, topicId, subtopicId }) => {
  const grade = grades[gradeLevel];
  const topic = topics[topicId];
  const subtopic = topic?.subtopics[subtopicId];
  
  // All useState hooks must be at the top before any conditional logic
  const [currentMode, setCurrentMode] = useState('selection'); // 'selection', 'ide', 'arduino', 'content'
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [activeTab, setActiveTab] = useState('editor');
  const [playgroundState, setPlaygroundState] = useState({ type: 'challenges' });
  
  const handleIDEClick = () => {
    setCurrentMode('ide');
  };

  const handleArduinoClick = () => {
    setCurrentMode('arduino');
  };

  const handleBackToSelection = () => {
    setCurrentMode('selection');
  };

  const handleContentMode = () => {
    setCurrentMode('content');
  };

  // Full-screen IDE mode
  if (currentMode === 'ide') {
    return (
      <div className="fullscreen-mode">
        <div style={{ position: 'fixed', top: '20px', left: '20px', zIndex: 1000, display: 'flex', gap: '10px' }}>
          <button 
            className="back-button"
            onClick={handleBackToSelection}
            title="Back to Playground"
            style={{
              background: 'rgba(0, 0, 0, 0.7)',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
              transition: 'all 0.3s ease',
              backdropFilter: 'blur(10px)'
            }}
          >
            ← Back to Playground
          </button>
          <button 
            className="home-button"
            onClick={() => onNavigate('landing')}
            title="Back to Home"
            style={{
              background: 'rgba(0, 0, 0, 0.7)',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
              transition: 'all 0.3s ease',
              backdropFilter: 'blur(10px)'
            }}
          >
            🏠 Home
          </button>
        </div>
        <Suspense fallback={<div className="loading-spinner">Loading IDE...</div>}>
          <ProfessionalIDE />
        </Suspense>
      </div>
    );
  }

  // Full-screen Arduino mode
  if (currentMode === 'arduino') {
    return (
      <div className="fullscreen-mode">
        <div style={{ position: 'fixed', top: '20px', left: '20px', zIndex: 1000, display: 'flex', gap: '10px' }}>
          <button 
            className="back-button"
            onClick={handleBackToSelection}
            title="Back to Playground"
            style={{
              background: 'rgba(0, 0, 0, 0.7)',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
              transition: 'all 0.3s ease',
              backdropFilter: 'blur(10px)'
            }}
          >
            ← Back to Playground
          </button>
          <button 
            className="home-button"
            onClick={() => onNavigate('landing')}
            title="Back to Home"
            style={{
              background: 'rgba(0, 0, 0, 0.7)',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
              transition: 'all 0.3s ease',
              backdropFilter: 'blur(10px)'
            }}
          >
            🏠 Home
          </button>
        </div>
        <Suspense fallback={<div className="loading-spinner">Loading Arduino Simulator...</div>}>
          <ArduinoSimulator />
        </Suspense>
      </div>
    );
  }

  // Show selection screen if no specific content or user wants to choose mode
  if (currentMode === 'selection' || !gradeLevel || !topicId || !subtopicId) {
    return (
      <div className="playground-selection">
        <div className="floating-elements">
          <div className="floating-element"></div>
          <div className="floating-element"></div>
          <div className="floating-element"></div>
        </div>
        
        <div className="selection-container">
          <div className="selection-header">
            <h1 className="selection-title">Digital Literacy Playground</h1>
            <p className="selection-subtitle">
              Choose your learning adventure and dive into professional development tools
            </p>
          </div>
          
          <div className="cards-container">
            <div className="selection-card" onClick={handleIDEClick}>
              <div className="card-icon ide">
                <Monitor size={40} />
              </div>
              <h2 className="card-title">Professional IDE</h2>
              <p className="card-description">
                Experience a full-featured development environment with modern tools and beautiful interface
              </p>
              <ul className="card-features">
                <li>File Management System</li>
                <li>Advanced Code Editor</li>
                <li>Integrated Terminal</li>
                <li>Problem Diagnostics</li>
                <li>Git Integration</li>
              </ul>
              <div className="card-action">Launch IDE</div>
            </div>
            
            <div className="selection-card" onClick={handleArduinoClick}>
              <div className="card-icon arduino">
                <Cpu size={40} />
              </div>
              <h2 className="card-title">Arduino Simulator</h2>
              <p className="card-description">
                Build and simulate electronic circuits with realistic components and multiple board support
              </p>
              <ul className="card-features">
                <li>Multiple Board Types</li>
                <li>Rich Component Library</li>
                <li>Real-time Simulation</li>
                <li>Arduino Code Editor</li>
                <li>Serial Monitor</li>
              </ul>
              <div className="card-action">Start Simulation</div>
            </div>
            
            {gradeLevel && topicId && subtopicId && (
              <div className="selection-card" onClick={() => onNavigate('topic', { gradeLevel, topicId })}>
                <div className="card-icon" style={{background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'}}>
                  <GraduationCap size={40} />
                </div>
                <h2 className="card-title">Learning Content</h2>
                <p className="card-description">
                  Continue with your structured learning path and interactive exercises
                </p>
                <ul className="card-features">
                  <li>Interactive Challenges</li>
                  <li>Step-by-step Guidance</li>
                  <li>Progress Tracking</li>
                  <li>Instant Feedback</li>
                </ul>
                <div className="card-action">Continue Learning</div>
              </div>
            )}
          </div>
          
          <div className="selection-footer">
            <p>
              <button 
                className="back-btn" 
                onClick={() => onNavigate('landing')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'rgba(255, 255, 255, 0.8)',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                  fontSize: '0.9rem'
                }}
              >
                ← Back to Home
              </button>
            </p>
          </div>
        </div>
      </div>
    );
  }
  
  // Sample playground content based on subtopic
  const getPlaygroundContent = (subtopicId) => {
    const playgroundMap = {
      '1.8': {
        title: "Arduino Simulator",
        description: "Interactive Arduino playground with drag-and-drop components",
        type: "arduino",
        language: "arduino",
        initialCode: `// Arduino Physical Computing Playground\nvoid setup() {\n  // Initialize your components here\n  // Example: pinMode(13, OUTPUT);\n}\n\nvoid loop() {\n  // Main program loop\n  // Example: digitalWrite(13, HIGH);\n  // delay(1000);\n  // digitalWrite(13, LOW);\n  // delay(1000);\n}`,
        challenges: [
          {
            title: "Blink LED",
            description: "Create a simple LED blinking program using digital pin 13",
            hint: "Use pinMode() in setup() and digitalWrite() with delay() in loop()",
            starterCode: `// Blink LED Challenge\nvoid setup() {\n  // Set pin 13 as output\n  pinMode(13, OUTPUT);\n}\n\nvoid loop() {\n  // Turn LED on\n  digitalWrite(13, HIGH);\n  delay(1000);  // Wait 1 second\n  \n  // Turn LED off\n  digitalWrite(13, LOW);\n  delay(1000);  // Wait 1 second\n}`,
            detailedHints: [
              "Use pinMode(13, OUTPUT) to set pin 13 as an output pin",
              "Use digitalWrite(13, HIGH) to turn the LED on",
              "Use digitalWrite(13, LOW) to turn the LED off",
              "Use delay(1000) to wait for 1 second (1000 milliseconds)",
              "Put the blinking logic in the loop() function so it repeats"
            ],
            expectedStructure: "setup() → pinMode() → loop() → digitalWrite(HIGH) → delay() → digitalWrite(LOW) → delay()"
          },
          {
            title: "Read Sensor Data",
            description: "Read data from an analog sensor and display it on the serial monitor",
            hint: "Use analogRead() to read sensor values and Serial.println() to display them",
            starterCode: `// Read Sensor Challenge\nvoid setup() {\n  // Initialize serial communication\n  Serial.begin(9600);\n}\n\nvoid loop() {\n  // Read analog sensor on pin A0\n  int sensorValue = analogRead(A0);\n  \n  // Print the value to serial monitor\n  Serial.print(\"Sensor Value: \");\n  Serial.println(sensorValue);\n  \n  delay(500);  // Wait half a second\n}`,
            detailedHints: [
              "Use Serial.begin(9600) in setup() to initialize serial communication",
              "Use analogRead(A0) to read from analog pin A0",
              "Store the sensor reading in an integer variable",
              "Use Serial.print() and Serial.println() to display values",
              "Add a delay to avoid flooding the serial monitor"
            ],
            expectedStructure: "setup() → Serial.begin() → loop() → analogRead() → Serial.println() → delay()"
          },
          {
            title: "Control Servo Motor",
            description: "Control a servo motor to sweep back and forth",
            hint: "Use the Servo library and write() function to control servo position",
            starterCode: `// Servo Control Challenge\n#include <Servo.h>\n\nServo myServo;  // Create servo object\n\nvoid setup() {\n  // Attach servo to pin 9\n  myServo.attach(9);\n}\n\nvoid loop() {\n  // Sweep from 0 to 180 degrees\n  for (int pos = 0; pos <= 180; pos += 1) {\n    myServo.write(pos);\n    delay(15);\n  }\n  \n  // Sweep from 180 to 0 degrees\n  for (int pos = 180; pos >= 0; pos -= 1) {\n    myServo.write(pos);\n    delay(15);\n  }\n}`,
            detailedHints: [
              "Include the Servo library with #include <Servo.h>",
              "Create a Servo object to control the motor",
              "Use myServo.attach(9) to connect servo to pin 9",
              "Use myServo.write(angle) to set servo position",
              "Use for loops to create smooth sweeping motion"
            ],
            expectedStructure: "#include → Servo object → setup() → attach() → loop() → for loops → write() → delay()"
          }
        ]
      },
      '1.1': {
        title: "Pseudocode Practice",
        description: "Practice writing pseudocode for common algorithms",
        language: "pseudocode",
        initialCode: `// Write pseudocode to find the largest number in a list\n// Example:\nBEGIN\n  INPUT list_of_numbers\n  SET largest = first_number_in_list\n  FOR each number in list_of_numbers\n    IF number > largest THEN\n      SET largest = number\n    END IF\n  END FOR\n  OUTPUT largest\nEND`,
        challenges: [
          {
            title: "Find Maximum",
            description: "Write pseudocode to find the largest number in a list",
            hint: "Start by setting the first number as your maximum. Then compare each remaining number with your current maximum, updating it when you find a larger value.",
            starterCode: `// Find Maximum Challenge\nBEGIN\n  INPUT list_of_numbers\n  SET largest = first_number_in_list\n  \n  // Write your FOR loop here\n  // Compare each number with largest\n  // Update largest when you find a bigger number\n  \n  OUTPUT largest\nEND`,
            detailedHints: [
              "Initialize a variable 'largest' with the first number in the list",
              "Use a FOR loop to iterate through the remaining numbers",
              "Inside the loop, use an IF statement to compare each number with 'largest'",
              "Update 'largest' when you find a bigger number",
              "Don't forget to OUTPUT the final result"
            ],
            expectedStructure: "BEGIN → INPUT → SET → FOR loop → IF statement → OUTPUT → END"
          },
          {
            title: "Count Even Numbers",
            description: "Write pseudocode to count even numbers in a list",
            hint: "Initialize a counter to 0, then check each number using the modulo operator (%). If number % 2 equals 0, increment your counter.",
            starterCode: `// Count Even Numbers Challenge\nBEGIN\n  INPUT list_of_numbers\n  SET even_count = 0\n  \n  // Write your FOR loop here\n  // Check if each number % 2 = 0\n  // Increment even_count for even numbers\n  \n  OUTPUT even_count\nEND`,
            detailedHints: [
              "Create a counter variable and set it to 0",
              "Use a FOR loop to examine each number in the list",
              "Use the modulo operator (%) to check if a number is divisible by 2",
              "If number % 2 = 0, then the number is even",
              "Increment your counter each time you find an even number"
            ],
            expectedStructure: "BEGIN → INPUT → SET counter = 0 → FOR loop → IF (number % 2 = 0) → INCREMENT counter → OUTPUT → END"
          },
          {
            title: "Simple Calculator",
            description: "Write pseudocode for a basic calculator that performs addition, subtraction, multiplication, and division",
            hint: "Use nested IF-ELIF statements to handle different operations. Don't forget to handle division by zero!",
            starterCode: `// Simple Calculator Challenge\nBEGIN\n  INPUT first_number\n  INPUT operation  // +, -, *, /\n  INPUT second_number\n  \n  // Write your IF-ELIF-ELSE structure here\n  // Handle +, -, *, / operations\n  // Remember to check for division by zero!\n  \n  OUTPUT result\nEND`,
            detailedHints: [
              "INPUT two numbers and an operation symbol (+, -, *, /)",
              "Use IF-ELIF-ELSE structure to handle each operation",
              "For division, check if the second number is not zero before dividing",
              "Calculate the result based on the chosen operation",
              "OUTPUT the result with a meaningful message"
            ],
            expectedStructure: "BEGIN → INPUT numbers and operation → IF-ELIF-ELSE chain → Calculate result → OUTPUT → END"
          }
        ]
      },
      '1.2': {
        title: "Selection Structures",
        description: "Practice with IF-ELSE statements and conditional logic",
        language: "pseudocode",
        initialCode: `// Grade Calculator
BEGIN
  INPUT score
  IF score >= 90 THEN
    OUTPUT "Grade: A"
  ELIF score >= 80 THEN
    OUTPUT "Grade: B"
  ELIF score >= 70 THEN
    OUTPUT "Grade: C"
  ELIF score >= 60 THEN
    OUTPUT "Grade: D"
  ELSE
    OUTPUT "Grade: F"
  END IF
END`,
        challenges: [
          {
            title: "Age Classifier",
            description: "Create a program that classifies people into age groups: Child (0-12), Teen (13-19), Adult (20-64), Senior (65+)",
            hint: "Use multiple IF-ELIF statements with logical operators. Consider the order of your conditions - start with the most specific ranges.",
            starterCode: `// Age Classifier Challenge\nBEGIN\n  INPUT age\n  // Write your IF-ELIF-ELSE structure here\n  // Check for: Senior (65+), Adult (20-64), Teen (13-19), Child (0-12)\n  \n  OUTPUT age_group\nEND`,
            detailedHints: [
              "INPUT the person's age",
              "Use IF-ELIF-ELSE structure to check age ranges",
              "Start with age >= 65 for seniors, then >= 20 for adults, etc.",
              "Make sure your conditions don't overlap",
              "Include validation for negative ages or unrealistic values",
              "OUTPUT the appropriate age group classification"
            ],
            expectedStructure: "BEGIN → INPUT age → IF-ELIF-ELSE chain → OUTPUT classification → END",
            commonMistakes: ["Overlapping conditions", "Wrong order of conditions", "Missing edge cases"]
          },
          {
            title: "Temperature Converter",
            description: "Convert between Celsius and Fahrenheit based on user choice",
            hint: "First ask the user for conversion type (C to F or F to C), then use the appropriate formula. Remember: F = C × 9/5 + 32 and C = (F - 32) × 5/9",
            starterCode: `// Temperature Converter Challenge\nBEGIN\n  OUTPUT "Choose conversion: 1 for C→F, 2 for F→C"\n  INPUT conversion_type\n  OUTPUT "Enter temperature value:"\n  INPUT temperature\n  \n  // Write your IF-ELSE structure here\n  // Use formulas: F = C × 9/5 + 32 and C = (F - 32) × 5/9\n  \n  OUTPUT result\nEND`,
            detailedHints: [
              "INPUT the conversion type (1 for C→F, 2 for F→C)",
              "INPUT the temperature value to convert",
              "Use IF-ELSE to determine which formula to apply",
              "For C→F: multiply by 9/5 and add 32",
              "For F→C: subtract 32 and multiply by 5/9",
              "OUTPUT the converted temperature with units"
            ],
            expectedStructure: "BEGIN → INPUT conversion type → INPUT temperature → IF-ELSE → Calculate → OUTPUT → END",
            formulas: ["Celsius to Fahrenheit: F = C × 9/5 + 32", "Fahrenheit to Celsius: C = (F - 32) × 5/9"]
          },
          {
            title: "Password Strength Checker",
            description: "Check if a password meets security requirements (length, uppercase, lowercase, numbers)",
            hint: "Use multiple IF statements to check each requirement separately. A strong password needs at least 8 characters, uppercase, lowercase, and numbers.",
            starterCode: `// Password Strength Checker Challenge\nBEGIN\n  INPUT password\n  SET strength_score = 0\n  \n  // Check length (at least 8 characters)\n  IF length(password) >= 8 THEN\n    SET strength_score = strength_score + 1\n  END IF\n  \n  // Add more checks for uppercase, lowercase, and numbers\n  // Increment strength_score for each requirement met\n  \n  // Determine final strength based on score\n  // 4 = Strong, 2-3 = Medium, 0-1 = Weak\n  \n  OUTPUT strength_level\nEND`,
            detailedHints: [
              "INPUT the password to check",
              "Check if length is at least 8 characters",
              "Check for at least one uppercase letter",
              "Check for at least one lowercase letter",
              "Check for at least one number",
              "Use nested IF statements or combine conditions with AND",
              "OUTPUT strength level: Weak, Medium, or Strong"
            ],
            expectedStructure: "BEGIN → INPUT password → Multiple IF checks → Determine strength → OUTPUT → END",
            requirements: ["Minimum 8 characters", "At least 1 uppercase", "At least 1 lowercase", "At least 1 number"]
          }
        ]
      },
      '2.1': {
        title: "Python Programming Basics",
        description: "Learn Python syntax and basic programming concepts",
        language: "python",
        initialCode: `# Python Variables and Data Types
# Try modifying these examples

name = "Digital Literacy Student"
age = 16
height = 5.6
is_student = True

print(f"Hello, {name}!")
print(f"You are {age} years old")
print(f"Height: {height} feet")
print(f"Student status: {is_student}")

# Try creating your own variables below`,
        challenges: [
          {
            title: "Personal Information Display",
            description: "Create a program that stores and displays personal information using different data types",
            hint: "Use string variables for names, integer for age, float for measurements, and boolean for yes/no questions. Use f-strings for formatted output.",
            detailedHints: [
              "Create variables for name (string), age (int), height (float), and student status (bool)",
              "Use descriptive variable names like 'first_name', 'student_age'",
              "Use f-string formatting: f'Hello, {name}!' for clean output",
              "Try using input() to get user data: name = input('Enter your name: ')",
              "Remember to convert input to appropriate types: age = int(input('Age: '))"
            ],
            expectedOutput: "Formatted personal information display",
            pythonConcepts: ["Variables", "Data types (str, int, float, bool)", "f-strings", "input() function"]
          },
          {
            title: "Simple Calculator",
            description: "Build a calculator that performs basic arithmetic operations",
            hint: "Get two numbers from user input, ask for operation type, then use if-elif statements to perform the calculation. Don't forget to handle division by zero!",
            detailedHints: [
              "Use input() to get two numbers: num1 = float(input('First number: '))",
              "Get operation choice: op = input('Operation (+, -, *, /): ')",
              "Use if-elif-else to handle different operations",
              "For division, check if second number != 0 before dividing",
              "Use f-strings to display the result clearly",
              "Consider adding error handling for invalid inputs"
            ],
            expectedOutput: "Interactive calculator with error handling",
            pythonConcepts: ["input() and type conversion", "if-elif-else statements", "Arithmetic operators", "Error handling"]
          }
        ]
      },
      'default': {
        title: "Interactive Learning",
        description: "Explore concepts through hands-on practice",
        initialCode: `// Welcome to the ${subtopic.title} playground!\n// This is where you can experiment and practice\n\n// Try writing some code or pseudocode here\n// Click 'Run' to see the results\n\nBEGIN\n  OUTPUT "Hello, Digital Literacy Student!"\n  OUTPUT "Ready to learn ${subtopic.title}?"\nEND`,
        challenges: [
          {
            title: "Basic Concepts",
            description: "Practice the fundamental concepts",
            hint: "Start with simple examples"
          },
          {
            title: "Applied Learning",
            description: "Apply concepts to real scenarios",
            hint: "Think about practical applications"
          }
        ]
      }
    };
    
    return playgroundMap[subtopicId] || playgroundMap['default'];
  };

  const playgroundContent = getPlaygroundContent(subtopicId);
  
  // Update code when playground content changes
  useEffect(() => {
    if (playgroundContent.initialCode && !code) {
      setCode(playgroundContent.initialCode);
    }
  }, [playgroundContent.initialCode, code]);
  
  // Reset code function
  const resetCode = () => {
    setCode(playgroundContent.initialCode || '');
    setOutput('');
  };
  
  if (!grade || !topic || !subtopic) {
    return <div>Playground not found</div>;
  }

  const runCode = () => {
    setIsRunning(true);
    setOutput('Running...');
    
    // Simulate code execution
    setTimeout(() => {
      const lines = code.split('\n');
      const outputLines = [];
      
      lines.forEach(line => {
        const trimmed = line.trim();
        if (trimmed.startsWith('OUTPUT')) {
          const match = trimmed.match(/OUTPUT\s+["'](.*)["']/);
          if (match) {
            outputLines.push(match[1]);
          }
        }
      });
      
      if (outputLines.length > 0) {
        setOutput(outputLines.join('\n'));
      } else {
        setOutput('Code executed successfully!\n(No output statements found)');
      }
      
      setIsRunning(false);
    }, 1000);
  };

  // Render selection screen
  if (currentMode === 'selection') {
    return (
      <div className="playground-selection">
        <div className="selection-header">
          <button onClick={() => onNavigate('topic', { gradeLevel, topicId })} className="back-button">
            <ArrowLeft size={20} />
            <span>Back to {topic.title}</span>
          </button>
          
          <div className="selection-info">
            <h1>Choose Your Development Environment</h1>
            <p>Select the type of coding environment you want to work with</p>
          </div>
        </div>
        
        <div className="selection-cards">
          <div className="environment-card ide-card" onClick={() => setCurrentMode('ide')}>
            <div className="card-icon">
              <Code size={48} />
            </div>
            <h3>Professional IDE</h3>
            <p>Full-featured development environment with file management, code editor, terminal, and debugging tools</p>
            <div className="card-features">
              <span>📁 File Explorer</span>
              <span>💻 Code Editor</span>
              <span>🖥️ Terminal</span>
              <span>🐛 Debugger</span>
            </div>
            <button className="card-button">Launch IDE</button>
          </div>
          
          <div className="environment-card arduino-card" onClick={() => setCurrentMode('arduino')}>
            <div className="card-icon">
              <Zap size={48} />
            </div>
            <h3>Arduino Simulator</h3>
            <p>Interactive circuit builder with multiple microcontroller boards and electronic components</p>
            <div className="card-features">
              <span>🔧 Arduino Uno</span>
              <span>📡 ESP32</span>
              <span>🎛️ STM32</span>
              <span>🥧 Pi Pico</span>
            </div>
            <button className="card-button">Start Simulation</button>
          </div>
        </div>
      </div>
    );
  }
  
  // Render IDE mode
  if (currentMode === 'ide') {
    return (
      <div className="playground-fullscreen">
        <Suspense fallback={
          <div className="loading-screen">
            <div className="loading-spinner"></div>
            <p>Loading Professional IDE...</p>
          </div>
        }>
          <ProfessionalIDE onBack={() => setCurrentMode('selection')} />
        </Suspense>
      </div>
    );
  }
  
  // Render Arduino mode
  if (currentMode === 'arduino') {
    return (
      <div className="playground-fullscreen">
        <Suspense fallback={
          <div className="loading-screen">
            <div className="loading-spinner"></div>
            <p>Loading Arduino Simulator...</p>
          </div>
        }>
          <ArduinoSimulator onBack={() => setCurrentMode('selection')} />
        </Suspense>
      </div>
    );
  }
  
  return (
    <div className="playground">
      {/* Header */}
      <div className="playground-header">
        <div className="header-background">
          <div className="code-pattern"></div>
        </div>
        
        <div className="header-content">
          <button onClick={() => onNavigate('topic', { gradeLevel, topicId })} className="back-button">
            <ArrowLeft size={20} />
            <span>Back to {topic.title}</span>
          </button>
          
          <div className="playground-info">
            <div className="playground-badge">
              <Code size={16} />
              <span>Interactive Playground</span>
            </div>
            <h1>{playgroundContent.title}</h1>
            <p>{playgroundContent.description}</p>
            
            <div className="playground-meta">
              <div className="meta-item">
                <span className="meta-label">Subtopic:</span>
                <span className="meta-value">{subtopic.title}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Difficulty:</span>
                <span className="meta-value">{subtopic.difficulty}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="playground-content">
        <div className="content-container">
          {/* Arduino Simulator or Code Editor Section */}
          {playgroundContent.type === 'arduino' ? (
            <div className="arduino-section">
              <Suspense fallback={
                <div className="loading-arduino">
                  <div className="loading-spinner"></div>
                  <p>Loading Arduino Simulator...</p>
                </div>
              }>
                <ArduinoPlayground onComplete={() => console.log('Arduino challenge completed')} />
              </Suspense>
            </div>
          ) : (
          <div className="editor-section">
            <div className="editor-tabs">
              <button 
                className={`tab ${activeTab === 'editor' ? 'active' : ''}`}
                onClick={() => setActiveTab('editor')}
              >
                <Code size={16} />
                <span>Code Editor</span>
              </button>
              <button 
                className={`tab ${activeTab === 'output' ? 'active' : ''}`}
                onClick={() => setActiveTab('output')}
              >
                <Zap size={16} />
                <span>Output</span>
              </button>
            </div>
            
            <div className="editor-content">
              {activeTab === 'editor' ? (
                <div className="code-editor">
                  <div className="editor-toolbar">
                    <div className="toolbar-left">
                      <span className="file-name">playground.pseudo</span>
                    </div>
                    <div className="toolbar-right">
                      <button className="toolbar-btn" onClick={resetCode}>
                        <RotateCcw size={16} />
                        <span>Reset</span>
                      </button>
                      <button 
                        className="toolbar-btn primary" 
                        onClick={runCode}
                        disabled={isRunning}
                      >
                        <Play size={16} />
                        <span>{isRunning ? 'Running...' : 'Run Code'}</span>
                      </button>
                    </div>
                  </div>
                  
                  <textarea
                    className="code-textarea"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="Write your pseudocode here..."
                    spellCheck={false}
                  />
                </div>
              ) : (
                <div className="output-panel">
                  <div className="output-header">
                    <h3>Output</h3>
                    {output && (
                      <div className="output-status">
                        <CheckCircle size={16} />
                        <span>Executed</span>
                      </div>
                    )}
                  </div>
                  <div className="output-content">
                    {output ? (
                      <pre>{output}</pre>
                    ) : (
                      <div className="output-placeholder">
                        <Zap size={24} />
                        <p>Run your code to see the output here</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
          )}
          
          {/* Challenges Section */}
          <div className="challenges-section">
            <div className="section-header">
              <h3>Practice Challenges</h3>
              <p>Test your skills with these exercises</p>
            </div>
            
            <div className="challenges-list">
              {playgroundContent.challenges.map((challenge, index) => (
                <div key={index} className="challenge-card">
                  <div className="challenge-header">
                    <div className="challenge-number">{index + 1}</div>
                    <h4>{challenge.title}</h4>
                  </div>
                  <p>{challenge.description}</p>
                  
                  <div className="challenge-hint">
                    <span className="hint-label">💡 Quick Hint:</span>
                    <span className="hint-text">{challenge.hint}</span>
                  </div>
                  
                  {challenge.detailedHints && (
                    <div className="detailed-hints">
                      <span className="hint-label">📋 Step-by-step:</span>
                      <ul className="hint-steps">
                        {challenge.detailedHints.map((hint, hintIndex) => (
                          <li key={hintIndex}>{hint}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {challenge.expectedStructure && (
                    <div className="expected-structure">
                      <span className="hint-label">🏗️ Structure:</span>
                      <span className="structure-text">{challenge.expectedStructure}</span>
                    </div>
                  )}
                  
                  {challenge.pythonConcepts && (
                    <div className="language-concepts">
                      <span className="hint-label">🐍 Python Concepts:</span>
                      <div className="concept-tags">
                        {challenge.pythonConcepts.map((concept, conceptIndex) => (
                          <span key={conceptIndex} className="concept-tag">{concept}</span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {challenge.formulas && (
                    <div className="formulas">
                      <span className="hint-label">📐 Formulas:</span>
                      <ul className="formula-list">
                        {challenge.formulas.map((formula, formulaIndex) => (
                          <li key={formulaIndex} className="formula-item">{formula}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {challenge.commonMistakes && (
                    <div className="common-mistakes">
                      <span className="hint-label">⚠️ Watch out for:</span>
                      <div className="mistake-tags">
                        {challenge.commonMistakes.map((mistake, mistakeIndex) => (
                          <span key={mistakeIndex} className="mistake-tag">{mistake}</span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <button 
                    className="challenge-btn"
                    onClick={() => {
                      // Set the challenge as the active code in the editor
                      setCode(challenge.starterCode || `// Challenge: ${challenge.title}\n// ${challenge.description}\n\n// Write your solution here:\n`);
                      setActiveTab('editor');
                      setOutput('');
                    }}
                  >
                    <span>Try This Challenge</span>
                    <ChevronRight size={16} />
                  </button>
                </div>
              ))}
            </div>
            
            {/* Quick Actions */}
            <div className="quick-actions">
              <h4>Continue Learning</h4>
              <div className="action-buttons">
                <button 
                  onClick={() => onNavigate('notes', { gradeLevel, topicId, subtopicId })}
                  className="action-btn notes"
                >
                  <BookOpen size={16} />
                  <span>Review Notes</span>
                </button>
                
                <button 
                  onClick={() => onNavigate('assessment', { gradeLevel, topicId, subtopicId })}
                  className="action-btn assessment"
                >
                  <TestTube size={16} />
                  <span>Take Test</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tips Section */}
      <div className="tips-section">
        <div className="tips-container">
          <h3>💡 Playground Tips</h3>
          <div className="tips-grid">
            <div className="tip-card">
              <div className="tip-icon">🚀</div>
              <h4>Experiment Freely</h4>
              <p>Don't be afraid to try different approaches and make mistakes - that's how you learn!</p>
            </div>
            <div className="tip-card">
              <div className="tip-icon">🔍</div>
              <h4>Test Your Logic</h4>
              <p>Run your code frequently to see if it works as expected and debug any issues.</p>
            </div>
            <div className="tip-card">
              <div className="tip-icon">📝</div>
              <h4>Comment Your Code</h4>
              <p>Add comments to explain your thinking - it helps you and others understand your logic.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Playground;