import { useState, useEffect, useCallback } from 'react';
import { ArrowLeft, Clock, CheckCircle, XCircle, RotateCcw, Trophy, BookOpen, Code } from 'lucide-react';
import { grades, topics } from '../data/topics';
import OrderingQuestion from '../components/OrderingQuestion';
import '../styles/Assessment.css';

const Assessment = ({ onNavigate, gradeLevel, topicId, subtopicId }) => {
  const grade = grades[gradeLevel];
  const topic = topics[topicId];
  const subtopic = topic?.subtopics[subtopicId];
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
  const [isActive, setIsActive] = useState(true);
  
  const handleSubmit = useCallback(() => {
    setIsActive(false);
    setShowResults(true);
  }, []);
  
  // Timer effect - must be before early return
  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0 && !showResults) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft => timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      // Only call handleSubmit if component is properly initialized
      if (grade && topic && subtopic) {
        handleSubmit();
      }
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, showResults, grade, topic, subtopic, handleSubmit]);
  
  if (!grade || !topic || !subtopic) {
    return <div>Assessment not found</div>;
  }

  // Sample questions based on subtopic
  const getQuestions = (subtopicId) => {
    const questionBank = {
      '1.1': [
        {
          id: 1,
          question: "What is pseudocode?",
          type: "multiple-choice",
          options: [
            "A programming language used by professionals",
            "A way to write algorithms using plain English-like statements",
            "A type of computer hardware",
            "A debugging tool for programmers"
          ],
          correct: 1,
          explanation: "Pseudocode is a way to write algorithms using plain English-like statements that can be easily understood and later converted to actual code."
        },
        {
          id: 2,
          question: "Which of the following is a correct pseudocode structure?",
          type: "multiple-choice",
          options: [
            "START... FINISH",
            "BEGIN... END",
            "OPEN... CLOSE",
            "INIT... TERM"
          ],
          correct: 1,
          explanation: "BEGIN and END are the standard keywords used to mark the start and finish of pseudocode algorithms."
        },
        {
          id: 3,
          question: "What keyword is used to get user input in pseudocode?",
          type: "multiple-choice",
          options: [
            "GET",
            "read()",
            "INPUT",
            "SCAN"
          ],
          correct: 2,
          explanation: "INPUT is the standard keyword used in pseudocode to represent getting data from the user."
        },
        {
          id: 4,
          question: "Arrange the following pseudocode steps in the correct order to find the maximum number in a list:",
          type: "ordering",
          items: [
            "INPUT list_of_numbers",
            "SET max = first_number",
            "FOR each number in list",
            "IF number > max THEN SET max = number",
            "OUTPUT max"
          ],
          correct: [0, 1, 2, 3, 4],
          explanation: "The correct order follows the logical flow: input data, initialize maximum, iterate through list, compare and update, output result."
        },
        {
          id: 5,
          question: "True or False: Pseudocode must follow exact syntax rules like programming languages.",
          type: "true-false",
          correct: false,
          explanation: "False. Pseudocode is meant to be flexible and readable, focusing on logic rather than strict syntax rules."
        }
      ],
      '1.2': [
        {
          id: 1,
          question: "What is the purpose of selection statements in programming?",
          type: "multiple-choice",
          options: [
            "To repeat code multiple times",
            "To make decisions based on conditions",
            "To store data in variables",
            "To display output to users"
          ],
          correct: 1,
          explanation: "Selection statements (like IF-ELSE) are used to make decisions in programs based on whether certain conditions are true or false."
        },
        {
          id: 2,
          question: "Which pseudocode structure represents a two-way selection?",
          type: "multiple-choice",
          options: [
            "IF... END IF",
            "IF... ELSE... END IF",
            "WHILE... END WHILE",
            "FOR... END FOR"
          ],
          correct: 1,
          explanation: "IF... ELSE... END IF provides two paths: one when the condition is true, another when it's false."
        },
        {
          id: 3,
          question: "What will this pseudocode output if score = 85?\n\nIF score >= 90 THEN\n  OUTPUT 'A'\nELIF score >= 80 THEN\n  OUTPUT 'B'\nELSE\n  OUTPUT 'C'\nEND IF",
          type: "multiple-choice",
          options: [
            "A",
            "B",
            "C",
            "No output"
          ],
          correct: 1,
          explanation: "Since 85 is not >= 90 but is >= 80, the second condition is true and 'B' is output."
        },
        {
          id: 4,
          question: "True or False: You can have multiple ELIF statements in a selection structure.",
          type: "true-false",
          correct: true,
          explanation: "True. You can chain multiple ELIF (else if) statements to test multiple conditions in sequence."
        },
        {
          id: 5,
          question: "Complete the pseudocode: To check if a number is positive, negative, or zero, you would use _____ selection.",
          type: "fill-blank",
          answer: "multi-way",
          alternatives: ["multiple", "three-way", "nested"],
          explanation: "Multi-way selection allows you to test multiple conditions (positive, negative, zero) in a single structure."
        }
      ],
      '1.3': [
        {
          id: 1,
          question: "What is the main difference between linear search and binary search?",
          type: "multiple-choice",
          options: [
            "Linear search is faster than binary search",
            "Binary search requires sorted data, linear search doesn't",
            "Linear search uses more memory than binary search",
            "Binary search only works with numbers"
          ],
          correct: 1,
          explanation: "Binary search requires the data to be sorted beforehand, while linear search can work on unsorted data."
        },
        {
          id: 2,
          question: "In binary search, what happens when the target is found?",
          type: "multiple-choice",
          options: [
            "Continue searching to find duplicates",
            "Return the position and stop searching",
            "Search the entire remaining list",
            "Start over from the beginning"
          ],
          correct: 1,
          explanation: "When the target is found in binary search, the algorithm returns the position and stops searching."
        },
        {
          id: 3,
          question: "What is the time complexity of linear search in the worst case?",
          type: "multiple-choice",
          options: [
            "O(1)",
            "O(log n)",
            "O(n)",
            "O(n²)"
          ],
          correct: 2,
          explanation: "Linear search has O(n) time complexity in the worst case because it may need to check every element."
        },
        {
          id: 4,
          question: "True or False: Binary search is always better than linear search.",
          type: "true-false",
          correct: false,
          explanation: "False. Binary search is only better when data is sorted. For unsorted data or very small datasets, linear search might be more practical."
        },
        {
          id: 5,
          question: "Complete the statement: Binary search works by repeatedly _____ the search space.",
          type: "fill-blank",
          answer: "halving",
          alternatives: ["dividing", "splitting", "cutting"],
          explanation: "Binary search works by repeatedly halving the search space by comparing with the middle element."
        }
      ],
      '1.4': [
        {
          id: 1,
          question: "Which of the following is a correct if statement in Python?",
          type: "multiple-choice",
          options: [
            "if (x > 5) { print('greater') }",
            "if x > 5: print('greater')",
            "if x > 5 then print('greater')",
            "if x > 5 do print('greater')"
          ],
          correct: 1,
          explanation: "Python uses 'if condition:' syntax with a colon and indentation for the code block."
        },
        {
          id: 2,
          question: "What is the purpose of the 'elif' statement?",
          type: "multiple-choice",
          options: [
            "To end an if statement",
            "To check additional conditions when the first if is false",
            "To repeat a condition",
            "To create a loop"
          ],
          correct: 1,
          explanation: "'elif' (else if) allows you to check additional conditions when the previous if/elif conditions are false."
        },
        {
          id: 3,
          question: "What will this code output?\n\nx = 10\nif x > 15:\n    print('A')\nelif x > 5:\n    print('B')\nelse:\n    print('C')",
          type: "multiple-choice",
          options: [
            "A",
            "B",
            "C",
            "Nothing"
          ],
          correct: 1,
          explanation: "Since x=10 is not > 15 but is > 5, the elif condition is true and 'B' is printed."
        },
        {
          id: 4,
          question: "True or False: In Python, indentation is required for conditional statements.",
          type: "true-false",
          correct: true,
          explanation: "True. Python uses indentation to define code blocks, making it mandatory for conditional statements."
        },
        {
          id: 5,
          question: "What operator is used for 'not equal to' in most programming languages?",
          type: "fill-blank",
          answer: "!=",
          alternatives: ["<>", "~="],
          explanation: "The != operator is used for 'not equal to' comparison in most programming languages."
        }
      ],
      '1.5': [
        {
          id: 1,
          question: "Which of the following is NOT a basic data type in most programming languages?",
          type: "multiple-choice",
          options: [
            "Integer",
            "String",
            "Boolean",
            "Algorithm"
          ],
          correct: 3,
          explanation: "Algorithm is not a data type; it's a set of instructions. Integer, String, and Boolean are basic data types."
        },
        {
          id: 2,
          question: "What is the difference between a list and a string?",
          type: "multiple-choice",
          options: [
            "Lists can only store numbers, strings can only store text",
            "Lists can store multiple items of different types, strings store sequences of characters",
            "There is no difference",
            "Lists are faster than strings"
          ],
          correct: 1,
          explanation: "Lists can store multiple items of various data types, while strings specifically store sequences of characters."
        },
        {
          id: 3,
          question: "What does 'variable scope' refer to?",
          type: "multiple-choice",
          options: [
            "The size of a variable",
            "The type of data a variable can hold",
            "Where in the program a variable can be accessed",
            "How fast a variable can be processed"
          ],
          correct: 2,
          explanation: "Variable scope refers to the region of the program where a variable can be accessed and used."
        },
        {
          id: 4,
          question: "True or False: In most programming languages, you must declare a variable's type before using it.",
          type: "true-false",
          correct: false,
          explanation: "False. Many modern languages like Python are dynamically typed and don't require explicit type declaration."
        },
        {
          id: 5,
          question: "What is the term for converting one data type to another?",
          type: "fill-blank",
          answer: "casting",
          alternatives: ["conversion", "transformation", "type conversion"],
          explanation: "Type casting (or conversion) is the process of converting one data type to another."
        }
      ],
      '1.6': [
        {
          id: 1,
          question: "What is a programming library?",
          type: "multiple-choice",
          options: [
            "A place where programmers work",
            "A collection of pre-written code that can be reused",
            "A type of programming language",
            "A debugging tool"
          ],
          correct: 1,
          explanation: "A programming library is a collection of pre-written code, functions, and modules that can be reused in programs."
        },
        {
          id: 2,
          question: "What is the main advantage of using libraries?",
          type: "multiple-choice",
          options: [
            "They make programs run slower",
            "They save time and reduce code duplication",
            "They make programs harder to understand",
            "They are only for advanced programmers"
          ],
          correct: 1,
          explanation: "Libraries save development time and reduce code duplication by providing tested, reusable functionality."
        },
        {
          id: 3,
          question: "Which statement about importing libraries is correct?",
          type: "multiple-choice",
          options: [
            "You must import the entire library every time",
            "You can import specific functions or the entire library",
            "Libraries cannot be imported in most languages",
            "Importing libraries slows down your program significantly"
          ],
          correct: 1,
          explanation: "Most programming languages allow you to import specific functions or modules from a library, or import the entire library."
        },
        {
          id: 4,
          question: "True or False: Popular libraries are usually well-tested and reliable.",
          type: "true-false",
          correct: true,
          explanation: "True. Popular libraries are typically well-tested by many developers and maintained by experienced teams."
        },
        {
          id: 5,
          question: "What is the Python keyword used to import libraries?",
          type: "fill-blank",
          answer: "import",
          alternatives: ["include", "require", "use"],
          explanation: "Python uses the 'import' keyword to include libraries and modules in your program."
        }
      ],
      '1.7': [
        {
          id: 1,
          question: "What does SDLC stand for?",
          type: "multiple-choice",
          options: [
            "Software Design Life Cycle",
            "Software Development Life Cycle",
            "System Development Life Cycle",
            "Software Debugging Life Cycle"
          ],
          correct: 1,
          explanation: "SDLC stands for Software Development Life Cycle, which is the process of developing software applications."
        },
        {
          id: 2,
          question: "Which phase comes first in the software development process?",
          type: "multiple-choice",
          options: [
            "Coding",
            "Testing",
            "Planning and Requirements",
            "Deployment"
          ],
          correct: 2,
          explanation: "Planning and Requirements gathering is the first phase, where you understand what needs to be built."
        },
        {
          id: 3,
          question: "What is the purpose of version control systems like Git?",
          type: "multiple-choice",
          options: [
            "To make programs run faster",
            "To track changes and collaborate on code",
            "To compile programs",
            "To test software automatically"
          ],
          correct: 1,
          explanation: "Version control systems track changes to code over time and enable multiple developers to collaborate effectively."
        },
        {
          id: 4,
          question: "True or False: Testing should only be done after all coding is complete.",
          type: "true-false",
          correct: false,
          explanation: "False. Modern software development practices emphasize testing throughout the development process, not just at the end."
        },
        {
          id: 5,
          question: "What methodology emphasizes iterative development and customer collaboration?",
          type: "fill-blank",
          answer: "Agile",
          alternatives: ["Scrum", "iterative"],
          explanation: "Agile methodology emphasizes iterative development, customer collaboration, and responding to change."
        }
      ],
      '1.8': [
        {
          id: 1,
          question: "What is physical computing?",
          type: "multiple-choice",
          options: [
            "Computing with physical exercise",
            "Building and interacting with physical systems using software and hardware",
            "Using only desktop computers",
            "Computing without electricity"
          ],
          correct: 1,
          explanation: "Physical computing involves building interactive physical systems by using software and hardware that can sense and respond to the physical world."
        },
        {
          id: 2,
          question: "Which of the following is commonly used in physical computing projects?",
          type: "multiple-choice",
          options: [
            "Arduino",
            "Microsoft Word",
            "Photoshop",
            "Web browsers"
          ],
          correct: 0,
          explanation: "Arduino is a popular microcontroller platform used in physical computing projects to control sensors, motors, and other hardware."
        },
        {
          id: 3,
          question: "What is a sensor in physical computing?",
          type: "multiple-choice",
          options: [
            "A type of computer screen",
            "A device that detects and measures physical properties",
            "A programming language",
            "A type of software"
          ],
          correct: 1,
          explanation: "A sensor is a device that detects and measures physical properties like temperature, light, motion, or sound."
        },
        {
          id: 4,
          question: "True or False: Physical computing projects can only work with digital inputs.",
          type: "true-false",
          correct: false,
          explanation: "False. Physical computing projects work with both analog inputs (like temperature, light levels) and digital inputs (like button presses)."
        },
        {
          id: 5,
          question: "What type of device converts digital signals to physical actions?",
          type: "fill-blank",
          answer: "actuator",
          alternatives: ["motor", "servo", "output device"],
          explanation: "An actuator is a device that converts digital signals into physical actions, such as motors, servos, or LEDs."
        }
      ],
      '2.1': [
        {
          id: 1,
          question: "What is a database?",
          type: "multiple-choice",
          options: [
            "A collection of unorganized files",
            "A structured collection of data that can be easily accessed and managed",
            "A type of computer hardware",
            "A programming language"
          ],
          correct: 1,
          explanation: "A database is a structured collection of data that is organized and stored in a way that allows for efficient access, management, and retrieval."
        },
        {
          id: 2,
          question: "What does SQL stand for?",
          type: "multiple-choice",
          options: [
            "Simple Query Language",
            "Structured Query Language",
            "Standard Query Language",
            "System Query Language"
          ],
          correct: 1,
          explanation: "SQL stands for Structured Query Language, which is used to communicate with and manipulate databases."
        },
        {
          id: 3,
          question: "What is the primary key in a database table?",
          type: "multiple-choice",
          options: [
            "The most important data in the table",
            "A unique identifier for each record in the table",
            "The first column in the table",
            "The password to access the table"
          ],
          correct: 1,
          explanation: "A primary key is a unique identifier for each record (row) in a database table, ensuring no duplicate records exist."
        },
        {
          id: 4,
          question: "True or False: Data in a database can be sorted and filtered.",
          type: "true-false",
          correct: true,
          explanation: "True. Databases provide powerful capabilities to sort, filter, and query data based on various criteria."
        },
        {
          id: 5,
          question: "What is the term for retrieving specific data from a database?",
          type: "fill-blank",
          answer: "query",
          alternatives: ["search", "select", "retrieval"],
          explanation: "A query is a request for specific data from a database, typically written in SQL or another database language."
        }
      ],
      '2.2': [
        {
          id: 1,
          question: "What is data validation?",
          type: "multiple-choice",
          options: [
            "Making data look prettier",
            "Checking that data meets certain criteria before it's processed or stored",
            "Deleting unnecessary data",
            "Converting data to different formats"
          ],
          correct: 1,
          explanation: "Data validation is the process of checking that data meets certain criteria, rules, or constraints before it's processed or stored."
        },
        {
          id: 2,
          question: "Which of the following is an example of data validation?",
          type: "multiple-choice",
          options: [
            "Checking that an email address contains an @ symbol",
            "Making text bold",
            "Changing font colors",
            "Adding more data to a file"
          ],
          correct: 0,
          explanation: "Checking that an email address contains an @ symbol is a form of format validation to ensure the data follows expected patterns."
        },
        {
          id: 3,
          question: "What is data verification?",
          type: "multiple-choice",
          options: [
            "Making data faster to process",
            "Confirming that data has been accurately entered or transferred",
            "Encrypting data for security",
            "Compressing data to save space"
          ],
          correct: 1,
          explanation: "Data verification is the process of confirming that data has been accurately entered, transferred, or processed without errors."
        },
        {
          id: 4,
          question: "True or False: Data validation should only be done once when data is first entered.",
          type: "true-false",
          correct: false,
          explanation: "False. Data validation should be performed at multiple stages - during input, processing, and storage to ensure data integrity throughout its lifecycle."
        },
        {
          id: 5,
          question: "What type of validation checks if a number falls within an acceptable range?",
          type: "fill-blank",
          answer: "range",
          alternatives: ["boundary", "limit", "constraint"],
          explanation: "Range validation (or range checking) ensures that numerical data falls within specified minimum and maximum values."
        }
      ],
      '3.1': [
        {
          id: 1,
          question: "What is a computer network?",
          type: "multiple-choice",
          options: [
            "A single computer with multiple programs",
            "A group of interconnected computers that can communicate and share resources",
            "A type of computer hardware",
            "A programming language for computers"
          ],
          correct: 1,
          explanation: "A computer network is a group of interconnected computers that can communicate with each other and share resources like files, printers, and internet connections."
        },
        {
          id: 2,
          question: "What does LAN stand for?",
          type: "multiple-choice",
          options: [
            "Large Area Network",
            "Local Area Network",
            "Long Access Network",
            "Limited Area Network"
          ],
          correct: 1,
          explanation: "LAN stands for Local Area Network, which connects computers within a limited geographical area like a home, office, or school."
        },
        {
          id: 3,
          question: "What is the main difference between LAN and WAN?",
          type: "multiple-choice",
          options: [
            "LAN is faster than WAN",
            "LAN covers a smaller geographical area than WAN",
            "LAN is more secure than WAN",
            "All of the above"
          ],
          correct: 3,
          explanation: "All statements are generally true: LANs typically cover smaller areas, are faster due to shorter distances, and are more secure due to physical control."
        },
        {
          id: 4,
          question: "True or False: The Internet is an example of a WAN (Wide Area Network).",
          type: "true-false",
          correct: true,
          explanation: "True. The Internet is the largest example of a WAN, connecting networks and computers across the globe."
        },
        {
          id: 5,
          question: "What device is commonly used to connect multiple devices in a local network?",
          type: "fill-blank",
          answer: "router",
          alternatives: ["switch", "hub", "gateway"],
          explanation: "A router is commonly used to connect multiple devices in a local network and provide internet access."
        }
      ],
      '3.2': [
        {
          id: 1,
          question: "What does HTTP stand for?",
          type: "multiple-choice",
          options: [
            "HyperText Transfer Protocol",
            "High Transfer Text Protocol",
            "HyperText Transmission Protocol",
            "Home Transfer Text Protocol"
          ],
          correct: 0,
          explanation: "HTTP stands for HyperText Transfer Protocol, which is used for transferring web pages and data over the internet."
        },
        {
          id: 2,
          question: "What is the difference between HTTP and HTTPS?",
          type: "multiple-choice",
          options: [
            "HTTPS is faster than HTTP",
            "HTTPS is encrypted and more secure than HTTP",
            "HTTPS only works with certain browsers",
            "There is no difference"
          ],
          correct: 1,
          explanation: "HTTPS (HTTP Secure) uses encryption to protect data transmission, making it more secure than regular HTTP."
        },
        {
          id: 3,
          question: "What is a URL?",
          type: "multiple-choice",
          options: [
            "A type of computer virus",
            "A web address that specifies the location of a resource on the internet",
            "A programming language",
            "A type of network cable"
          ],
          correct: 1,
          explanation: "URL (Uniform Resource Locator) is a web address that specifies the location of a resource on the internet."
        },
        {
          id: 4,
          question: "True or False: Digital communication protocols ensure that data is transmitted reliably between devices.",
          type: "true-false",
          correct: true,
          explanation: "True. Communication protocols like TCP/IP, HTTP, and others provide rules and standards for reliable data transmission."
        },
        {
          id: 5,
          question: "What protocol is commonly used for sending emails?",
          type: "fill-blank",
          answer: "SMTP",
          alternatives: ["POP3", "IMAP", "email protocol"],
          explanation: "SMTP (Simple Mail Transfer Protocol) is the standard protocol used for sending emails across the internet."
        }
      ],
      '4.1': [
        {
          id: 1,
          question: "What is the CPU in a computer system?",
          type: "multiple-choice",
          options: [
            "Central Processing Unit - the brain of the computer that executes instructions",
            "Computer Power Unit - provides electricity to the computer",
            "Central Program Unit - stores all the programs",
            "Computer Printing Unit - handles all printing tasks"
          ],
          correct: 0,
          explanation: "CPU stands for Central Processing Unit, which is often called the 'brain' of the computer as it executes instructions and performs calculations."
        },
        {
          id: 2,
          question: "What is the main function of RAM in a computer?",
          type: "multiple-choice",
          options: [
            "Permanent storage of files",
            "Temporary storage of data and programs currently being used",
            "Processing mathematical calculations",
            "Connecting to the internet"
          ],
          correct: 1,
          explanation: "RAM (Random Access Memory) provides temporary storage for data and programs that are currently being used by the CPU."
        },
        {
          id: 3,
          question: "What happens to data in RAM when the computer is turned off?",
          type: "multiple-choice",
          options: [
            "It remains permanently stored",
            "It is automatically backed up",
            "It is lost because RAM is volatile memory",
            "It is transferred to the hard drive"
          ],
          correct: 2,
          explanation: "RAM is volatile memory, meaning all data stored in it is lost when the computer loses power or is turned off."
        },
        {
          id: 4,
          question: "True or False: The motherboard connects all the major components of a computer together.",
          type: "true-false",
          correct: true,
          explanation: "True. The motherboard is the main circuit board that connects and allows communication between all major computer components."
        },
        {
          id: 5,
          question: "What component is responsible for rendering graphics and images on your screen?",
          type: "fill-blank",
          answer: "GPU",
          alternatives: ["graphics card", "video card", "graphics processor"],
          explanation: "The GPU (Graphics Processing Unit) or graphics card is responsible for rendering graphics, images, and video output."
        }
      ],
      '4.2': [
        {
          id: 1,
          question: "What is an operating system?",
          type: "multiple-choice",
          options: [
            "A type of computer hardware",
            "Software that manages computer hardware and provides services for other programs",
            "A programming language",
            "A type of computer virus"
          ],
          correct: 1,
          explanation: "An operating system is system software that manages computer hardware resources and provides common services for other programs."
        },
        {
          id: 2,
          question: "Which of the following is NOT a common operating system?",
          type: "multiple-choice",
          options: [
            "Windows",
            "macOS",
            "Linux",
            "Microsoft Word"
          ],
          correct: 3,
          explanation: "Microsoft Word is an application software (word processor), not an operating system. Windows, macOS, and Linux are all operating systems."
        },
        {
          id: 3,
          question: "What is multitasking in an operating system?",
          type: "multiple-choice",
          options: [
            "Using multiple computers at once",
            "The ability to run multiple programs simultaneously",
            "Having multiple users on one computer",
            "Using multiple monitors"
          ],
          correct: 1,
          explanation: "Multitasking is the operating system's ability to run multiple programs or processes simultaneously by rapidly switching between them."
        },
        {
          id: 4,
          question: "True or False: The operating system manages memory allocation for running programs.",
          type: "true-false",
          correct: true,
          explanation: "True. One of the key functions of an operating system is to manage memory allocation, ensuring programs get the memory they need."
        },
        {
          id: 5,
          question: "What is the term for the operating system's interface that users interact with?",
          type: "fill-blank",
          answer: "GUI",
          alternatives: ["user interface", "desktop", "shell"],
          explanation: "GUI (Graphical User Interface) is the visual interface that allows users to interact with the operating system using windows, icons, and menus."
        }
      ],
      '4.3': [
        {
          id: 1,
          question: "Which of the following is an input device?",
          type: "multiple-choice",
          options: [
            "Monitor",
            "Printer",
            "Keyboard",
            "Speakers"
          ],
          correct: 2,
          explanation: "A keyboard is an input device that allows users to enter text and commands into the computer."
        },
        {
          id: 2,
          question: "What is the primary function of output devices?",
          type: "multiple-choice",
          options: [
            "To send data to the computer",
            "To process data within the computer",
            "To display or present information from the computer to users",
            "To store data permanently"
          ],
          correct: 2,
          explanation: "Output devices display or present information from the computer to users, such as monitors showing images or speakers producing sound."
        },
        {
          id: 3,
          question: "Which device can function as both input and output?",
          type: "multiple-choice",
          options: [
            "Monitor",
            "Touchscreen",
            "Printer",
            "Speakers"
          ],
          correct: 1,
          explanation: "A touchscreen can display information (output) and receive touch input from users, making it both an input and output device."
        },
        {
          id: 4,
          question: "True or False: A webcam is considered an input device.",
          type: "true-false",
          correct: true,
          explanation: "True. A webcam captures video and audio input from the environment and sends it to the computer for processing."
        },
        {
          id: 5,
          question: "What type of device is a microphone?",
          type: "fill-blank",
          answer: "input",
          alternatives: ["audio input", "sound input"],
          explanation: "A microphone is an input device that captures sound and converts it into digital signals for the computer to process."
        }
      ],
      '4.4': [
        {
          id: 1,
          question: "What is the main difference between primary and secondary storage?",
          type: "multiple-choice",
          options: [
            "Primary storage is larger than secondary storage",
            "Primary storage is temporary and fast, secondary storage is permanent and slower",
            "Primary storage is more expensive than secondary storage",
            "There is no difference"
          ],
          correct: 1,
          explanation: "Primary storage (like RAM) is temporary and fast, used for active data. Secondary storage (like hard drives) is permanent and slower, used for long-term data storage."
        },
        {
          id: 2,
          question: "Which of the following is an example of secondary storage?",
          type: "multiple-choice",
          options: [
            "RAM",
            "Cache memory",
            "Hard disk drive (HDD)",
            "CPU registers"
          ],
          correct: 2,
          explanation: "A hard disk drive (HDD) is secondary storage that provides permanent storage for data and programs even when the computer is turned off."
        },
        {
          id: 3,
          question: "What does SSD stand for?",
          type: "multiple-choice",
          options: [
            "Super Speed Drive",
            "Solid State Drive",
            "Secondary Storage Device",
            "System Storage Drive"
          ],
          correct: 1,
          explanation: "SSD stands for Solid State Drive, which is a type of storage device that uses flash memory and has no moving parts."
        },
        {
          id: 4,
          question: "True or False: SSDs are generally faster than traditional hard disk drives (HDDs).",
          type: "true-false",
          correct: true,
          explanation: "True. SSDs are generally much faster than HDDs because they use flash memory with no moving parts, allowing for quicker data access."
        },
        {
          id: 5,
          question: "What unit is commonly used to measure storage capacity?",
          type: "fill-blank",
          answer: "bytes",
          alternatives: ["gigabytes", "GB", "terabytes"],
          explanation: "Storage capacity is measured in bytes and its multiples (kilobytes, megabytes, gigabytes, terabytes)."
        }
      ],
      '4.5': [
        {
          id: 1,
          question: "What factors affect a computer system's performance?",
          type: "multiple-choice",
          options: [
            "Only the CPU speed",
            "CPU speed, RAM amount, storage type, and software efficiency",
            "Only the amount of storage space",
            "Only the operating system"
          ],
          correct: 1,
          explanation: "Computer performance is affected by multiple factors including CPU speed, RAM amount, storage type (SSD vs HDD), and software efficiency."
        },
        {
          id: 2,
          question: "What happens when a computer runs out of available RAM?",
          type: "multiple-choice",
          options: [
            "The computer shuts down immediately",
            "The computer uses virtual memory (hard drive space) which slows performance",
            "The computer automatically buys more RAM",
            "Nothing happens"
          ],
          correct: 1,
          explanation: "When RAM is full, the operating system uses virtual memory (hard drive space) as temporary RAM, which significantly slows performance."
        },
        {
          id: 3,
          question: "Which upgrade would most likely improve a computer's boot time?",
          type: "multiple-choice",
          options: [
            "Adding more RAM",
            "Upgrading from HDD to SSD",
            "Getting a faster internet connection",
            "Installing more software"
          ],
          correct: 1,
          explanation: "Upgrading from HDD to SSD would most improve boot time because SSDs can read the operating system files much faster than traditional hard drives."
        },
        {
          id: 4,
          question: "True or False: Having too many programs running simultaneously can slow down computer performance.",
          type: "true-false",
          correct: true,
          explanation: "True. Running many programs simultaneously uses more RAM and CPU resources, which can slow down overall system performance."
        },
        {
          id: 5,
          question: "What is the term for temporary files and data that can slow down a computer over time?",
          type: "fill-blank",
          answer: "cache",
          alternatives: ["junk files", "temporary files", "clutter"],
          explanation: "Cache and temporary files can accumulate over time and slow down computer performance if not regularly cleaned."
        }
      ],
      'default': [
        {
          id: 1,
          question: `What is the main concept covered in ${subtopic.title}?`,
          type: "multiple-choice",
          options: [
            "Basic programming concepts",
            "Advanced algorithms",
            "Database management",
            "Network security"
          ],
          correct: 0,
          explanation: "This subtopic focuses on fundamental concepts in digital literacy and computational thinking."
        },
        {
          id: 2,
          question: "True or False: Understanding this concept is important for digital literacy.",
          type: "true-false",
          correct: true,
          explanation: "True. All concepts in this course contribute to building strong digital literacy skills."
        },
        {
          id: 3,
          question: "How would you apply this concept in real-world scenarios?",
          type: "multiple-choice",
          options: [
            "Problem-solving and logical thinking",
            "Only in computer programming",
            "Only in academic settings",
            "It has no real-world applications"
          ],
          correct: 0,
          explanation: "Digital literacy concepts have broad applications in problem-solving and logical thinking across many fields."
        }
      ]
    };
    
    return questionBank[subtopicId] || questionBank['default'];
  };

  const questions = getQuestions(subtopicId);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (questionId, answer) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach(question => {
      const userAnswer = selectedAnswers[question.id];
      if (question.type === 'multiple-choice' || question.type === 'true-false') {
        if (userAnswer === question.correct) correct++;
      } else if (question.type === 'fill-blank') {
        const userText = userAnswer?.toLowerCase().trim();
        const correctAnswer = question.answer.toLowerCase();
        const alternatives = question.alternatives?.map(alt => alt.toLowerCase()) || [];
        if (userText === correctAnswer || alternatives.includes(userText)) correct++;
      } else if (question.type === 'ordering') {
        if (JSON.stringify(userAnswer) === JSON.stringify(question.correct)) correct++;
      }
    });
    return { correct, total: questions.length, percentage: Math.round((correct / questions.length) * 100) };
  };

  const resetAssessment = () => {
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setShowResults(false);
    setTimeLeft(600);
    setIsActive(true);
  };

  const score = showResults ? calculateScore() : null;

  if (showResults) {
    return (
      <div className="assessment">
        <div className="results-container">
          <div className="results-header">
            <div className="results-icon">
              {score.percentage >= 70 ? (
                <Trophy size={48} className="trophy-icon" />
              ) : (
                <XCircle size={48} className="fail-icon" />
              )}
            </div>
            <h1>Assessment Complete!</h1>
            <div className="score-display">
              <div className="score-circle">
                <span className="score-number">{score.percentage}%</span>
              </div>
              <p>{score.correct} out of {score.total} questions correct</p>
            </div>
            
            <div className="grade-message">
              {score.percentage >= 90 && (
                <div className="grade excellent">
                  <h3>🌟 Excellent Work!</h3>
                  <p>You have mastered this topic. Great job!</p>
                </div>
              )}
              {score.percentage >= 70 && score.percentage < 90 && (
                <div className="grade good">
                  <h3>✅ Well Done!</h3>
                  <p>You have a good understanding. Review the missed questions to improve.</p>
                </div>
              )}
              {score.percentage >= 50 && score.percentage < 70 && (
                <div className="grade average">
                  <h3>📚 Keep Learning!</h3>
                  <p>You're on the right track. Review the course notes and try again.</p>
                </div>
              )}
              {score.percentage < 50 && (
                <div className="grade needs-work">
                  <h3>💪 Don't Give Up!</h3>
                  <p>Review the course material and practice more. You can do this!</p>
                </div>
              )}
            </div>
          </div>
          
          <div className="results-details">
            <h3>Question Review</h3>
            <div className="questions-review">
              {questions.map((question, index) => {
                const userAnswer = selectedAnswers[question.id];
                const isCorrect = question.type === 'multiple-choice' || question.type === 'true-false' 
                  ? userAnswer === question.correct
                  : question.type === 'fill-blank'
                  ? userAnswer?.toLowerCase().trim() === question.answer.toLowerCase() ||
                    question.alternatives?.some(alt => alt.toLowerCase() === userAnswer?.toLowerCase().trim())
                  : JSON.stringify(userAnswer) === JSON.stringify(question.correct);
                
                return (
                  <div key={question.id} className={`question-result ${isCorrect ? 'correct' : 'incorrect'}`}>
                    <div className="question-header">
                      <div className="question-number">{index + 1}</div>
                      <div className="result-icon">
                        {isCorrect ? <CheckCircle size={20} /> : <XCircle size={20} />}
                      </div>
                    </div>
                    <div className="question-content">
                      <p className="question-text">{question.question}</p>
                      <div className="answer-info">
                        <p><strong>Your answer:</strong> {userAnswer !== undefined ? 
                          (question.type === 'multiple-choice' ? question.options[userAnswer] :
                           question.type === 'true-false' ? (userAnswer ? 'True' : 'False') :
                           userAnswer) : 'Not answered'}
                        </p>
                        {!isCorrect && (
                          <p><strong>Correct answer:</strong> {
                            question.type === 'multiple-choice' ? question.options[question.correct] :
                            question.type === 'true-false' ? (question.correct ? 'True' : 'False') :
                            question.type === 'fill-blank' ? question.answer :
                            'See explanation'
                          }</p>
                        )}
                      </div>
                      <div className="explanation">
                        <strong>Explanation:</strong> {question.explanation}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          <div className="results-actions">
            <button className="action-btn retry" onClick={resetAssessment}>
              <RotateCcw size={16} />
              <span>Try Again</span>
            </button>
            
            <button 
              onClick={() => onNavigate('notes', { gradeLevel, topicId, subtopicId })}
              className="action-btn review"
            >
              <BookOpen size={16} />
              <span>Review Notes</span>
            </button>
            
            <button 
              onClick={() => onNavigate('playground', { gradeLevel, topicId, subtopicId })}
              className="action-btn practice"
            >
              <Code size={16} />
              <span>Practice More</span>
            </button>
            
            <button 
              onClick={() => onNavigate('topic', { gradeLevel, topicId })}
              className="action-btn continue"
            >
              <span>Continue Learning</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];

  return (
    <div className="assessment">
      {/* Header */}
      <div className="assessment-header">
        <div className="header-background">
          <div className="test-pattern"></div>
        </div>
        
        <div className="header-content">
          <button onClick={() => onNavigate('topic', { gradeLevel, topicId })} className="back-button">
            <ArrowLeft size={20} />
            <span>Back to {topic.title}</span>
          </button>
          
          <div className="assessment-info">
            <div className="assessment-badge">
              <Trophy size={16} />
              <span>Assessment</span>
            </div>
            <h1>{subtopic.title} Test</h1>
            <p>Test your knowledge and understanding</p>
            
            <div className="test-meta">
              <div className="meta-item">
                <Clock size={16} />
                <span className={`timer ${timeLeft < 60 ? 'warning' : ''}`}>
                  {formatTime(timeLeft)}
                </span>
              </div>
              <div className="meta-item">
                <span>Question {currentQuestion + 1} of {questions.length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="progress-container">
        <div className="progress-bar">
          <div 
            className="progress-fill"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Question */}
      <div className="question-container">
        <div className="question-content">
          <div className="question-header">
            <div className="question-number">
              Question {currentQuestion + 1}
            </div>
            <div className="question-type">
              {currentQ.type.replace('-', ' ').toUpperCase()}
            </div>
          </div>
          
          <div className="question-text">
            <h2>{currentQ.question}</h2>
          </div>
          
          <div className="answer-section">
            {currentQ.type === 'multiple-choice' && (
              <div className="options-list">
                {currentQ.options.map((option, index) => (
                  <button
                    key={index}
                    className={`option-btn ${
                      selectedAnswers[currentQ.id] === index ? 'selected' : ''
                    }`}
                    onClick={() => handleAnswerSelect(currentQ.id, index)}
                  >
                    <div className="option-letter">{String.fromCharCode(65 + index)}</div>
                    <span>{option}</span>
                  </button>
                ))}
              </div>
            )}
            
            {currentQ.type === 'true-false' && (
              <div className="true-false-options">
                <button
                  className={`tf-btn ${
                    selectedAnswers[currentQ.id] === true ? 'selected' : ''
                  }`}
                  onClick={() => handleAnswerSelect(currentQ.id, true)}
                >
                  <CheckCircle size={20} />
                  <span>True</span>
                </button>
                <button
                  className={`tf-btn ${
                    selectedAnswers[currentQ.id] === false ? 'selected' : ''
                  }`}
                  onClick={() => handleAnswerSelect(currentQ.id, false)}
                >
                  <XCircle size={20} />
                  <span>False</span>
                </button>
              </div>
            )}
            
            {currentQ.type === 'fill-blank' && (
              <div className="fill-blank">
                <input
                  type="text"
                  className="blank-input"
                  placeholder="Type your answer here..."
                  value={selectedAnswers[currentQ.id] || ''}
                  onChange={(e) => handleAnswerSelect(currentQ.id, e.target.value)}
                />
              </div>
            )}
            
            {currentQ.type === 'ordering' && (
              <OrderingQuestion
                items={currentQ.items}
                selectedOrder={selectedAnswers[currentQ.id]}
                onOrderChange={(newOrder) => handleAnswerSelect(currentQ.id, newOrder)}
              />
            )}
          </div>
        </div>
        
        {/* Navigation */}
        <div className="question-navigation">
          <button
            className="nav-btn prev"
            onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
            disabled={currentQuestion === 0}
          >
            Previous
          </button>
          
          {currentQuestion < questions.length - 1 ? (
            <button
              className="nav-btn next"
              onClick={() => setCurrentQuestion(currentQuestion + 1)}
              disabled={selectedAnswers[currentQ.id] === undefined}
            >
              Next
            </button>
          ) : (
            <button
              className="nav-btn submit"
              onClick={handleSubmit}
              disabled={Object.keys(selectedAnswers).length < questions.length}
            >
              Submit Test
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Assessment;