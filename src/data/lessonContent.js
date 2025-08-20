// Comprehensive lesson content differentiated by grade levels (7, 8, 9)
// Each subtopic contains grade-specific content with interactive elements

export const lessonContent = {
  '1.1': {
    title: 'Pseudocode',
    grades: {
      7: {
        level: 'Beginner',
        duration: '45 minutes',
        objectives: [
          'Understand what pseudocode is',
          'Write simple pseudocode for everyday tasks',
          'Identify the benefits of using pseudocode'
        ],
        sections: [
          {
            id: 'intro',
            title: '🎯 What is Pseudocode?',
            type: 'story',
            content: {
              story: "Imagine you're teaching your little brother how to make a sandwich. You wouldn't use complicated cooking terms - you'd use simple, clear steps like 'Get two slices of bread' and 'Put peanut butter on one slice.' That's exactly what pseudocode does for computers!",
              definition: "Pseudocode is like writing instructions in plain English that both humans and programmers can understand easily.",
              analogy: {
                title: "🥪 The Sandwich Recipe Analogy",
                description: "Just like a recipe breaks down cooking into simple steps, pseudocode breaks down computer programs into simple, understandable instructions."
              }
            }
          },
  '1.4': {
    title: 'Conditional statements in text-based programming',
    grades: {
      7: {
        objectives: [
          'Understand what conditional statements are',
          'Learn basic IF-THEN logic',
          'Practice simple decision-making in programs'
        ],
        sections: [
          {
            type: 'story',
            title: 'The Smart Traffic Light',
            content: 'Imagine a traffic light that can think! It looks at the traffic and decides: "IF there are many cars waiting, THEN turn green. IF there are no cars, THEN stay red." This is how conditional statements work in programming!'
          },
          {
            type: 'interactive_list',
            title: 'Everyday Conditionals',
            items: [
              {
                name: 'Weather App',
                description: 'IF it\'s raining, THEN show umbrella icon',
                example: 'Your phone shows different weather symbols'
              },
              {
                name: 'Game Rules',
                description: 'IF score > 100, THEN player wins',
                example: 'Video games decide when you complete a level'
              },
              {
                name: 'Smart Home',
                description: 'IF temperature < 20°C, THEN turn on heater',
                example: 'Automatic temperature control systems'
              }
            ]
          },
          {
            type: 'interactive_example',
            title: 'Simple Password Checker',
            content: 'Let\'s create a simple program that checks if a password is correct:',
            code_example: 'IF password = "secret123" THEN\n    DISPLAY "Welcome!"\nELSE\n    DISPLAY "Wrong password!"\nEND IF'
          }
        ],
        assessment: {
          type: 'multiple_choice',
          question: 'What happens in this code: IF age >= 18 THEN DISPLAY "You can vote"?',
          options: [
            'Everyone can vote',
            'Only people 18 or older can vote',
            'Only people exactly 18 can vote',
            'No one can vote'
          ],
          correct: 1,
          explanation: 'The >= symbol means "greater than or equal to", so anyone 18 or older will see the voting message.'
        }
      },
      8: {
        objectives: [
          'Write complex conditional statements',
          'Use logical operators (AND, OR, NOT)',
          'Implement nested conditions and multiple branches'
        ],
        sections: [
          {
            type: 'concept',
            title: 'Advanced Conditional Logic',
            content: 'Real programs need to make complex decisions using multiple conditions combined with AND, OR, and NOT operators.'
          },
          {
            type: 'code_examples',
            title: 'Logical Operators in Action',
            examples: [
              {
                operator: 'AND',
                code: 'IF age >= 16 AND has_license = true THEN\n    DISPLAY "You can drive"',
                explanation: 'Both conditions must be true'
              },
              {
                operator: 'OR',
                code: 'IF day = "Saturday" OR day = "Sunday" THEN\n    DISPLAY "It\'s weekend!"',
                explanation: 'At least one condition must be true'
              },
              {
                operator: 'NOT',
                code: 'IF NOT raining THEN\n    DISPLAY "Good day for a picnic"',
                explanation: 'The condition must be false'
              }
            ]
          },
          {
            type: 'interactive_challenge',
            title: 'Student Grade Calculator',
            content: 'Create a program that assigns letter grades based on scores:',
            requirements: [
              'A: 90-100 points',
              'B: 80-89 points',
              'C: 70-79 points',
              'D: 60-69 points',
              'F: Below 60 points'
            ],
            solution_hint: 'Use IF-ELSE IF-ELSE structure with range conditions'
          }
        ],
        project: {
          title: 'Smart Alarm System',
          description: 'Design an alarm system that makes intelligent decisions based on multiple factors.',
          requirements: [
            'Check time of day (work hours vs night)',
            'Consider day of week (weekday vs weekend)',
            'Account for user preferences (sound level, snooze options)',
            'Handle special cases (holidays, sick days)'
          ],
          solution_approach: 'Use nested IF statements and logical operators to create a decision tree that handles all scenarios.'
        }
      },
      9: {
        objectives: [
          'Optimize conditional statement performance',
          'Implement advanced control structures',
          'Design efficient decision-making algorithms'
        ],
        sections: [
          {
            type: 'advanced_concept',
            title: 'Conditional Statement Optimization',
            content: 'In real applications, the order and structure of conditions can significantly impact performance. Learn about short-circuit evaluation and condition ordering.'
          },
          {
            type: 'performance_analysis',
            title: 'Efficient Condition Ordering',
            scenarios: [
              {
                situation: 'Most Common First',
                example: 'Put the most likely condition first to reduce unnecessary checks',
                impact: 'Can improve performance by 30-50% in high-frequency operations'
              },
              {
                situation: 'Cheapest Operations First',
                example: 'Check simple variables before calling expensive functions',
                impact: 'Prevents costly operations when not needed'
              }
            ]
          },
          {
            type: 'advanced_patterns',
            title: 'Professional Conditional Patterns',
            patterns: [
              {
                name: 'Guard Clauses',
                description: 'Early return statements to handle edge cases',
                use_case: 'Input validation and error handling'
              },
              {
                name: 'State Machines',
                description: 'Complex decision logic based on current state',
                use_case: 'Game AI, workflow systems'
              },
              {
                name: 'Strategy Pattern',
                description: 'Dynamic behavior selection based on conditions',
                use_case: 'Payment processing, algorithm selection'
              }
            ]
          }
        ],
        challenge: {
          title: 'Intelligent Recommendation Engine',
          description: 'Build a system that makes personalized recommendations based on complex user data.',
          requirements: [
            'Analyze user behavior patterns',
            'Consider time-based preferences',
            'Account for social influences',
            'Handle cold start problems (new users)',
            'Optimize for real-time performance'
          ],
          master_solution: 'Implement a multi-layered decision system using weighted conditions, machine learning integration for pattern recognition, and efficient caching strategies for real-time performance. Use guard clauses for edge cases and implement fallback strategies for insufficient data scenarios.'
        }
      }
    }
  },
  '1.5': {
    title: 'Data in text-based program',
    grades: {
      7: {
        objectives: [
          'Understand what data means in programming',
          'Learn about different types of data',
          'Practice storing and using simple data'
        ],
        sections: [
          {
            type: 'story',
            title: 'The Digital Filing Cabinet',
            content: 'Think of a computer program like a smart filing cabinet. It can store different types of information: numbers (like your age), words (like your name), and yes/no answers (like whether you like pizza). Each piece of information is called "data"!'
          },
          {
            type: 'interactive_list',
            title: 'Types of Data Around Us',
            items: [
              {
                name: 'Numbers (Integers)',
                description: 'Whole numbers like age, score, or count',
                example: '15, 100, -5'
              },
              {
                name: 'Text (Strings)',
                description: 'Words, sentences, or any text',
                example: '"Hello", "Your Name", "Welcome!"'
              },
              {
                name: 'True/False (Boolean)',
                description: 'Yes or no, on or off, true or false',
                example: 'true, false'
              }
            ]
          },
          {
            type: 'interactive_example',
            title: 'Student Information Card',
            content: 'Let\'s create a digital student card with different types of data:',
            code_example: 'student_name = "Alex"\nstudent_age = 13\nis_present = true\nfavorite_subject = "Math"'
          }
        ],
        assessment: {
          type: 'multiple_choice',
          question: 'What type of data is the value 25 in a program?',
          options: [
            'Text (String)',
            'Number (Integer)',
            'True/False (Boolean)',
            'Color'
          ],
          correct: 1,
          explanation: '25 is a whole number, so it\'s an Integer data type. Numbers are used for calculations and counting.'
        }
      },
      8: {
        objectives: [
          'Work with arrays and lists of data',
          'Understand data manipulation operations',
          'Implement data validation and processing'
        ],
        sections: [
          {
            type: 'concept',
            title: 'Collections of Data',
            content: 'Real programs often work with groups of related data. Arrays and lists let us store multiple values together, like a shopping list or class roster.'
          },
          {
            type: 'data_structures',
            title: 'Working with Arrays',
            examples: [
              {
                type: 'Number Array',
                code: 'test_scores = [85, 92, 78, 96, 88]',
                operations: ['Find average', 'Find highest score', 'Count passing grades']
              },
              {
                type: 'String Array',
                code: 'student_names = ["Alice", "Bob", "Charlie", "Diana"]',
                operations: ['Sort alphabetically', 'Search for name', 'Count students']
              },
              {
                type: 'Mixed Data',
                code: 'student_record = ["John", 16, true, 3.8]',
                operations: ['Access by position', 'Update values', 'Validate data']
              }
            ]
          },
          {
            type: 'interactive_challenge',
            title: 'Grade Book Manager',
            content: 'Create a system to manage student grades:',
            requirements: [
              'Store grades for multiple students',
              'Calculate class average',
              'Find highest and lowest scores',
              'Identify students who need help (below 70%)'
            ],
            solution_hint: 'Use arrays to store data and loops to process multiple values'
          }
        ],
        project: {
          title: 'School Library System',
          description: 'Design a data system for tracking books, students, and borrowing records.',
          requirements: [
            'Store book information (title, author, ISBN, availability)',
            'Manage student records (name, ID, borrowed books)',
            'Track borrowing history and due dates',
            'Generate reports (overdue books, popular titles)'
          ],
          solution_approach: 'Use structured data with arrays and objects to organize information. Implement search and filter functions for data retrieval.'
        }
      },
      9: {
        objectives: [
          'Design complex data structures',
          'Implement data persistence and storage',
          'Optimize data processing for performance'
        ],
        sections: [
          {
            type: 'advanced_concept',
            title: 'Advanced Data Structures',
            content: 'Professional applications use sophisticated data structures like hash tables, trees, and graphs to organize and access data efficiently.'
          },
          {
            type: 'data_modeling',
            title: 'Real-World Data Design',
            scenarios: [
              {
                application: 'Social Media Platform',
                data_needs: 'User profiles, posts, comments, likes, friendships',
                structure: 'Graph database with nodes (users) and edges (relationships)'
              },
              {
                application: 'E-commerce System',
                data_needs: 'Products, customers, orders, inventory, payments',
                structure: 'Relational database with normalized tables and indexes'
              },
              {
                application: 'Gaming Platform',
                data_needs: 'Player stats, game states, leaderboards, achievements',
                structure: 'NoSQL database with flexible document storage'
              }
            ]
          },
          {
            type: 'performance_optimization',
            title: 'Data Processing Efficiency',
            techniques: [
              {
                name: 'Indexing',
                description: 'Create fast lookup tables for frequently accessed data',
                use_case: 'Database queries, search operations'
              },
              {
                name: 'Caching',
                description: 'Store frequently used data in fast memory',
                use_case: 'Web applications, API responses'
              },
              {
                name: 'Data Compression',
                description: 'Reduce storage space and transfer time',
                use_case: 'File storage, network communication'
              }
            ]
          }
        ],
        challenge: {
          title: 'Smart City Data Platform',
          description: 'Design a comprehensive data system for managing city-wide information and services.',
          requirements: [
            'Handle real-time data from IoT sensors (traffic, weather, pollution)',
            'Manage citizen services (utilities, permits, complaints)',
            'Process large-scale analytics for city planning',
            'Ensure data privacy and security compliance',
            'Provide APIs for third-party developers'
          ],
          master_solution: 'Implement a microservices architecture with specialized databases for different data types. Use time-series databases for sensor data, graph databases for relationships, and document stores for flexible schemas. Implement data lakes for analytics and edge computing for real-time processing.'
        }
      }
    }
  },
  '1.6': {
    title: 'Library program',
    grades: {
      7: {
        objectives: [
          'Understand what programming libraries are',
          'Learn how libraries help programmers',
          'Practice using simple library functions'
        ],
        sections: [
          {
            type: 'story',
            title: 'The Magic Toolbox',
            content: 'Imagine you\'re building a treehouse. Instead of making every screw and nail yourself, you go to a hardware store and get ready-made tools. Programming libraries are like that hardware store - they contain ready-made code tools that programmers can use!'
          },
          {
            type: 'interactive_list',
            title: 'Libraries in Everyday Apps',
            items: [
              {
                name: 'Math Library',
                description: 'Ready-made functions for calculations',
                example: 'Square root, trigonometry, random numbers'
              },
              {
                name: 'Graphics Library',
                description: 'Tools for drawing and displaying images',
                example: 'Drawing shapes, loading pictures, animations'
              },
              {
                name: 'Sound Library',
                description: 'Functions for playing and recording audio',
                example: 'Play music, sound effects, voice recording'
              }
            ]
          }
        ],
        assessment: {
          type: 'multiple_choice',
          question: 'Why do programmers use libraries?',
          options: [
            'To make programs slower',
            'To save time by using ready-made code',
            'To make programs more complicated',
            'Libraries are not useful'
          ],
          correct: 1,
          explanation: 'Libraries save time because programmers don\'t have to write everything from scratch. They can use tested, reliable code that others have already created.'
        }
      },
      8: {
        objectives: [
          'Import and use external libraries',
          'Understand library documentation',
          'Create simple custom functions'
        ],
        sections: [
          {
            type: 'concept',
            title: 'Working with Libraries',
            content: 'Modern programming relies heavily on libraries. Learning to find, import, and use libraries effectively is a crucial skill for any programmer.'
          },
          {
            type: 'code_examples',
            title: 'Using Popular Libraries',
            examples: [
              {
                library: 'Math Library',
                code: 'import math\nresult = math.sqrt(25)  # Returns 5',
                explanation: 'Import the math library to use mathematical functions'
              },
              {
                library: 'Random Library',
                code: 'import random\nnumber = random.randint(1, 10)',
                explanation: 'Generate random numbers for games and simulations'
              }
            ]
          }
        ],
        project: {
          title: 'Game Development with Libraries',
          description: 'Create a simple game using multiple libraries for graphics, sound, and input handling.',
          requirements: [
            'Use graphics library for visual elements',
            'Implement sound effects with audio library',
            'Handle user input with input library',
            'Use math library for game calculations'
          ]
        }
      },
      9: {
        objectives: [
          'Evaluate and select appropriate libraries',
          'Understand library architecture and design patterns',
          'Create and publish custom libraries'
        ],
        sections: [
          {
            type: 'advanced_concept',
            title: 'Library Selection Criteria',
            content: 'Professional developers must evaluate libraries based on performance, security, maintenance, community support, and licensing before integration.'
          },
          {
            type: 'library_analysis',
            title: 'Evaluating Libraries',
            criteria: [
              {
                factor: 'Performance',
                description: 'Speed, memory usage, and efficiency',
                evaluation: 'Benchmark tests, profiling tools'
              },
              {
                factor: 'Security',
                description: 'Vulnerability history, security practices',
                evaluation: 'Security audits, CVE databases'
              },
              {
                factor: 'Maintenance',
                description: 'Update frequency, bug fixes, active development',
                evaluation: 'GitHub activity, release history'
              }
            ]
          }
        ],
        challenge: {
          title: 'Custom Library Development',
          description: 'Design and implement a reusable library for a specific domain (e.g., data visualization, machine learning utilities).',
          requirements: [
            'Define clear API with comprehensive documentation',
            'Implement error handling and input validation',
            'Create unit tests and examples',
            'Consider performance optimization',
            'Plan for backward compatibility'
          ]
        }
      }
    }
  },
  '1.7': {
    title: 'Software Development',
    grades: {
      7: {
        objectives: ['Understand the software development process', 'Learn about planning and testing software', 'Practice basic project organization'],
        sections: [
          {
            type: 'story',
            title: 'Building a Digital House',
            content: 'Creating software is like building a house. You need a plan (design), materials (code), workers (programmers), and inspectors (testers) to make sure everything works properly!'
          },
          {
            type: 'interactive_list',
            title: 'Steps in Software Development',
            items: [
              {name: 'Planning', description: 'Decide what the software should do', example: 'Make a to-do list app'},
              {name: 'Designing', description: 'Draw how it will look and work', example: 'Sketch the app screens'},
              {name: 'Coding', description: 'Write the actual program', example: 'Type the instructions'},
              {name: 'Testing', description: 'Check if everything works correctly', example: 'Try all the buttons'}
            ]
          }
        ],
        assessment: {
          type: 'multiple_choice',
          question: 'What should you do BEFORE writing code for a new app?',
          options: ['Start coding immediately', 'Plan what the app should do', 'Test the app', 'Publish the app'],
          correct: 1,
          explanation: 'Planning comes first! You need to know what you want to build before you start building it.'
        }
      },
      8: {
        objectives: ['Apply software development methodologies', 'Understand version control and collaboration', 'Implement testing strategies'],
        sections: [
          {
            type: 'concept',
            title: 'Development Methodologies',
            content: 'Professional teams use structured approaches like Agile and Waterfall to manage complex software projects efficiently.'
          },
          {
            type: 'methodology_comparison',
            title: 'Agile vs Waterfall',
            methods: [
              {name: 'Waterfall', approach: 'Complete each phase before moving to next', best_for: 'Well-defined projects with clear requirements'},
              {name: 'Agile', approach: 'Work in short cycles with frequent feedback', best_for: 'Projects that may change during development'}
            ]
          }
        ],
        project: {
          title: 'Team Project Management',
          description: 'Organize a software project using Agile methodology with proper version control.',
          requirements: ['Use Git for version control', 'Plan sprints and user stories', 'Implement code reviews', 'Create automated tests']
        }
      },
      9: {
        objectives: ['Design scalable software architecture', 'Implement DevOps practices', 'Lead development teams'],
        sections: [
          {
            type: 'advanced_concept',
            title: 'Software Architecture Patterns',
            content: 'Enterprise applications use architectural patterns like microservices, MVC, and event-driven architecture for scalability and maintainability.'
          },
          {
            type: 'devops_practices',
            title: 'Modern Development Practices',
            practices: [
              {name: 'Continuous Integration', description: 'Automatically test code changes', benefit: 'Catch bugs early'},
              {name: 'Continuous Deployment', description: 'Automatically deploy tested code', benefit: 'Faster releases'},
              {name: 'Infrastructure as Code', description: 'Manage servers with code', benefit: 'Consistent environments'}
            ]
          }
        ],
        challenge: {
          title: 'Enterprise Software Architecture',
          description: 'Design a scalable, maintainable system for a large organization.',
          requirements: ['Handle 10,000+ concurrent users', 'Ensure 99.9% uptime', 'Support multiple platforms', 'Implement security best practices', 'Plan for future growth']
        }
      }
    }
  },
  '1.8': {
    title: 'Physical Computing',
    grades: {
      7: {
        objectives: ['Understand how software controls hardware', 'Learn about sensors and actuators', 'Practice simple physical computing projects'],
        sections: [
          {
            type: 'story',
            title: 'The Smart Robot Pet',
            content: 'Imagine a robot dog that can see, hear, and move around. It uses sensors (like eyes and ears) to understand the world, and actuators (like motors) to move. The software is like the brain that controls everything!'
          },
          {
            type: 'interactive_list',
            title: 'Physical Computing Components',
            items: [
              {name: 'Sensors', description: 'Devices that detect the environment', example: 'Temperature sensor, light sensor, motion detector'},
              {name: 'Actuators', description: 'Devices that cause movement or action', example: 'Motors, LEDs, speakers'},
              {name: 'Microcontroller', description: 'Small computer that runs the program', example: 'Arduino, Raspberry Pi'}
            ]
          }
        ],
        assessment: {
          type: 'multiple_choice',
          question: 'What does a sensor do in physical computing?',
          options: ['Makes things move', 'Detects information from environment', 'Stores data', 'Displays information'],
          correct: 1,
          explanation: 'Sensors detect or measure things in the environment, like temperature, light, or movement, and send this information to the computer.'
        }
      },
      8: {
        objectives: ['Program microcontrollers', 'Integrate multiple sensors and actuators', 'Build interactive physical systems'],
        sections: [
          {
            type: 'concept',
            title: 'Microcontroller Programming',
            content: 'Microcontrollers like Arduino use simplified programming languages to control hardware components and respond to sensor inputs in real-time.'
          },
          {
            type: 'project_examples',
            title: 'Physical Computing Projects',
            projects: [
              {name: 'Smart Garden', components: 'Soil moisture sensor, water pump, Arduino', function: 'Automatically water plants when soil is dry'},
              {name: 'Security System', components: 'Motion sensor, camera, buzzer, LED', function: 'Detect intruders and sound alarm'},
              {name: 'Weather Station', components: 'Temperature, humidity, pressure sensors, display', function: 'Monitor and display weather conditions'}
            ]
          }
        ],
        project: {
          title: 'Smart Home Automation',
          description: 'Create an automated system that responds to environmental conditions and user preferences.',
          requirements: ['Use multiple sensors for environmental monitoring', 'Control lights, temperature, and security', 'Provide user interface for manual control', 'Log data for analysis']
        }
      },
      9: {
        objectives: ['Design IoT systems', 'Implement wireless communication', 'Develop edge computing solutions'],
        sections: [
          {
            type: 'advanced_concept',
            title: 'Internet of Things (IoT)',
            content: 'Modern physical computing involves networked devices that communicate wirelessly, process data at the edge, and integrate with cloud services for advanced analytics.'
          },
          {
            type: 'iot_architecture',
            title: 'IoT System Components',
            layers: [
              {name: 'Device Layer', description: 'Sensors, actuators, microcontrollers', example: 'Smart sensors with WiFi capability'},
              {name: 'Connectivity Layer', description: 'Communication protocols and networks', example: 'WiFi, Bluetooth, LoRaWAN, 5G'},
              {name: 'Data Processing Layer', description: 'Edge computing and cloud analytics', example: 'Real-time processing, machine learning'},
              {name: 'Application Layer', description: 'User interfaces and business logic', example: 'Mobile apps, web dashboards, APIs'}
            ]
          }
        ],
        challenge: {
          title: 'Smart City Infrastructure',
          description: 'Design an IoT system for monitoring and managing city-wide infrastructure.',
          requirements: ['Deploy thousands of sensors across the city', 'Handle real-time data processing', 'Ensure reliable communication in urban environment', 'Implement predictive maintenance', 'Provide citizen-facing applications']
        }
      }
    }
  },
  '2.1': {
    title: 'Modelling',
    grades: {
      7: {
        objectives: ['Understand what data modeling means', 'Learn to organize information logically', 'Practice creating simple data models'],
        sections: [
          {
            type: 'story',
            title: 'The School Organizer',
            content: 'Imagine organizing your school\'s information: students, teachers, classes, and grades. How would you arrange this so it makes sense and is easy to find? This is what data modeling does - it organizes information in a logical way!'
          },
          {
            type: 'interactive_list',
            title: 'Real-World Data Models',
            items: [
              {name: 'Family Tree', description: 'Shows relationships between family members', example: 'Parents, children, grandparents connections'},
              {name: 'School Schedule', description: 'Organizes classes, times, and rooms', example: 'Math at 9 AM in Room 101'},
              {name: 'Library System', description: 'Tracks books, authors, and borrowers', example: 'Who borrowed which book when'}
            ]
          }
        ],
        assessment: {
          type: 'multiple_choice',
          question: 'What is the main purpose of data modeling?',
          options: ['To make data look pretty', 'To organize information logically', 'To delete unnecessary data', 'To make data harder to understand'],
          correct: 1,
          explanation: 'Data modeling organizes information in a logical, structured way that makes it easy to understand, store, and retrieve.'
        }
      },
      8: {
        objectives: ['Create entity-relationship diagrams', 'Understand data relationships and constraints', 'Design normalized data structures'],
        sections: [
          {
            type: 'concept',
            title: 'Entity-Relationship Modeling',
            content: 'Professional data modeling uses entities (things), attributes (properties), and relationships (connections) to represent real-world information systems.'
          },
          {
            type: 'modeling_components',
            title: 'Data Model Components',
            components: [
              {name: 'Entities', description: 'Things or objects we want to store information about', example: 'Student, Course, Teacher'},
              {name: 'Attributes', description: 'Properties or characteristics of entities', example: 'Student Name, Age, Grade Level'},
              {name: 'Relationships', description: 'How entities connect to each other', example: 'Students enroll in Courses'}
            ]
          }
        ],
        project: {
          title: 'School Management System Model',
          description: 'Design a comprehensive data model for managing all aspects of school operations.',
          requirements: ['Model students, teachers, courses, and grades', 'Define relationships between entities', 'Include constraints and business rules', 'Create visual diagrams']
        }
      },
      9: {
        objectives: ['Design complex data architectures', 'Implement data governance strategies', 'Optimize models for performance and scalability'],
        sections: [
          {
            type: 'advanced_concept',
            title: 'Enterprise Data Architecture',
            content: 'Large organizations require sophisticated data models that handle multiple systems, ensure data quality, and support business intelligence and analytics.'
          },
          {
            type: 'architecture_patterns',
            title: 'Data Architecture Patterns',
            patterns: [
              {name: 'Data Warehouse', description: 'Centralized repository for analytical data', use_case: 'Business intelligence and reporting'},
              {name: 'Data Lake', description: 'Storage for raw, unstructured data', use_case: 'Big data analytics and machine learning'},
              {name: 'Data Mesh', description: 'Decentralized data ownership model', use_case: 'Large organizations with diverse data needs'}
            ]
          }
        ],
        challenge: {
          title: 'Multi-National Corporation Data Strategy',
          description: 'Design a global data architecture for a company operating in multiple countries with different regulations.',
          requirements: ['Handle multi-language and multi-currency data', 'Ensure compliance with various privacy laws', 'Support real-time analytics across time zones', 'Implement data governance and quality controls']
        }
      }
    }
  },
  '2.2': {
    title: 'Data and Databases',
    grades: {
      7: {
        objectives: ['Understand what databases are', 'Learn basic database concepts', 'Practice simple data storage and retrieval'],
        sections: [
          {
            type: 'story',
            title: 'The Digital Library',
            content: 'A database is like a super-organized digital library. Instead of books on shelves, it stores information in tables. Each table is like a category of books, and each row is like a specific book with all its details!'
          },
          {
            type: 'interactive_list',
            title: 'Database Examples in Daily Life',
            items: [
              {name: 'Contact List', description: 'Your phone stores names and numbers', example: 'Name, phone number, email address'},
              {name: 'Online Store', description: 'Websites track products and customers', example: 'Product name, price, customer orders'},
              {name: 'School Records', description: 'Schools store student information', example: 'Student name, grades, attendance'}
            ]
          }
        ],
        assessment: {
          type: 'multiple_choice',
          question: 'What is a database table most similar to?',
          options: ['A single book', 'A spreadsheet with rows and columns', 'A filing cabinet', 'A computer program'],
          correct: 1,
          explanation: 'A database table is like a spreadsheet - it has columns for different types of information and rows for individual records.'
        }
      },
      8: {
        objectives: ['Write basic SQL queries', 'Understand database design principles', 'Implement data integrity and security'],
        sections: [
          {
            type: 'concept',
            title: 'Structured Query Language (SQL)',
            content: 'SQL is the standard language for communicating with databases. It allows you to create, read, update, and delete data using simple, English-like commands.'
          },
          {
            type: 'sql_examples',
            title: 'Basic SQL Operations',
            operations: [
              {command: 'SELECT', purpose: 'Retrieve data from database', example: 'SELECT name, age FROM students WHERE grade = 8'},
              {command: 'INSERT', purpose: 'Add new data to database', example: 'INSERT INTO students (name, age, grade) VALUES ("Alice", 14, 8)'},
              {command: 'UPDATE', purpose: 'Modify existing data', example: 'UPDATE students SET age = 15 WHERE name = "Alice"'},
              {command: 'DELETE', purpose: 'Remove data from database', example: 'DELETE FROM students WHERE graduated = true'}
            ]
          }
        ],
        project: {
          title: 'Student Information System Database',
          description: 'Create a complete database system for managing student records with proper relationships and queries.',
          requirements: ['Design tables for students, courses, and enrollments', 'Write SQL queries for common operations', 'Implement data validation rules', 'Create reports using database queries']
        }
      },
      9: {
        objectives: ['Design high-performance database systems', 'Implement advanced database features', 'Manage database security and backup strategies'],
        sections: [
          {
            type: 'advanced_concept',
            title: 'Database Performance Optimization',
            content: 'Enterprise databases require careful optimization through indexing, query optimization, partitioning, and caching to handle millions of records efficiently.'
          },
          {
            type: 'database_types',
            title: 'Modern Database Technologies',
            types: [
              {name: 'Relational (SQL)', description: 'Traditional structured databases', best_for: 'Transactional systems, financial data'},
              {name: 'NoSQL Document', description: 'Flexible document-based storage', best_for: 'Content management, user profiles'},
              {name: 'Graph Databases', description: 'Optimized for relationship data', best_for: 'Social networks, recommendation engines'},
              {name: 'Time Series', description: 'Specialized for time-stamped data', best_for: 'IoT sensors, financial trading'}
            ]
          }
        ],
        challenge: {
          title: 'Global E-commerce Database Architecture',
          description: 'Design a database system that can handle millions of users and transactions across multiple regions.',
          requirements: ['Support 100,000+ concurrent users', 'Ensure ACID compliance for transactions', 'Implement geographic data distribution', 'Provide real-time analytics capabilities', 'Maintain 99.99% uptime with disaster recovery']
        }
      }
    }
  },
  '3.1': {
    title: 'Networks',
    grades: {
      7: {
        objectives: ['Understand what computer networks are', 'Learn about different types of networks', 'Explore how devices connect and communicate'],
        sections: [
          {
            type: 'story',
            title: 'The School Communication System',
            content: 'Think of your school as a giant network! Students talk to each other, teachers share information, and the office communicates with everyone. Computer networks work similarly - they connect devices so they can share information and resources.'
          },
          {
            type: 'interactive_list',
            title: 'Types of Networks',
            items: [
              {name: 'Personal Area Network (PAN)', description: 'Very small network around one person', example: 'Bluetooth connecting your phone to headphones'},
              {name: 'Local Area Network (LAN)', description: 'Network within a building or campus', example: 'School computer lab or home WiFi'},
              {name: 'Wide Area Network (WAN)', description: 'Network covering large geographical areas', example: 'The Internet connecting countries'}
            ]
          }
        ],
        assessment: {
          type: 'multiple_choice',
          question: 'What type of network would connect all computers in your school?',
          options: ['PAN (Personal Area Network)', 'LAN (Local Area Network)', 'WAN (Wide Area Network)', 'Internet'],
          correct: 1,
          explanation: 'A LAN (Local Area Network) connects devices within a limited area like a school building or campus.'
        }
      },
      8: {
        objectives: ['Understand network protocols and standards', 'Learn about network security and data transmission', 'Explore network troubleshooting basics'],
        sections: [
          {
            type: 'concept',
            title: 'How Networks Communicate',
            content: 'Networks use protocols - sets of rules that define how devices communicate. Just like people need to speak the same language to understand each other, computers need protocols to exchange data.'
          },
          {
            type: 'protocol_examples',
            title: 'Common Network Protocols',
            protocols: [
              {name: 'HTTP/HTTPS', purpose: 'Web browsing and data transfer', example: 'Loading websites in your browser'},
              {name: 'TCP/IP', purpose: 'Reliable data transmission', example: 'Ensuring emails arrive complete and in order'},
              {name: 'WiFi (802.11)', purpose: 'Wireless local networking', example: 'Connecting laptops to school WiFi'},
              {name: 'Ethernet', purpose: 'Wired local networking', example: 'Cable connections in computer labs'}
            ]
          }
        ],
        project: {
          title: 'School Network Design',
          description: 'Design a comprehensive network infrastructure for a modern school with multiple buildings.',
          requirements: ['Plan network topology for classrooms and offices', 'Include security measures and access controls', 'Design for scalability and future expansion', 'Consider both wired and wireless connectivity']
        }
      },
      9: {
        objectives: ['Design enterprise network architectures', 'Implement advanced security and monitoring', 'Optimize network performance and reliability'],
        sections: [
          {
            type: 'advanced_concept',
            title: 'Enterprise Network Architecture',
            content: 'Large organizations require sophisticated network designs with redundancy, load balancing, security zones, and performance optimization to support thousands of users and critical business operations.'
          },
          {
            type: 'network_components',
            title: 'Advanced Network Infrastructure',
            components: [
              {name: 'Load Balancers', purpose: 'Distribute traffic across multiple servers', benefit: 'Prevents overload and ensures availability'},
              {name: 'Firewalls', purpose: 'Control and monitor network traffic', benefit: 'Protects against unauthorized access'},
              {name: 'VPN Gateways', purpose: 'Secure remote connections', benefit: 'Enables safe remote work'},
              {name: 'Network Monitoring', purpose: 'Track performance and detect issues', benefit: 'Proactive problem resolution'}
            ]
          }
        ],
        challenge: {
          title: 'Global Corporation Network Infrastructure',
          description: 'Design a secure, high-performance network for a multinational company with offices worldwide.',
          requirements: ['Support 50,000+ users across multiple continents', 'Ensure 99.9% uptime with disaster recovery', 'Implement zero-trust security architecture', 'Optimize for cloud services and remote work', 'Comply with international data protection regulations']
        }
      }
    }
  },
  '3.2': {
    title: 'Digital Communication',
    grades: {
      7: {
        objectives: ['Understand different forms of digital communication', 'Learn about digital citizenship and online safety', 'Practice effective digital communication skills'],
        sections: [
          {
            type: 'story',
            title: 'The Digital Conversation',
            content: 'Digital communication is like having conversations, but through technology! Whether you\'re sending a text, email, or video call, you\'re using digital tools to share thoughts and ideas with others around the world.'
          },
          {
            type: 'interactive_list',
            title: 'Types of Digital Communication',
            items: [
              {name: 'Text-based', description: 'Written messages and documents', example: 'Email, text messages, instant messaging'},
              {name: 'Voice Communication', description: 'Audio calls and messages', example: 'Phone calls, voice messages, podcasts'},
              {name: 'Video Communication', description: 'Visual and audio together', example: 'Video calls, live streaming, video messages'},
              {name: 'Social Media', description: 'Sharing content with networks', example: 'Posts, stories, comments, likes'}
            ]
          }
        ],
        assessment: {
          type: 'multiple_choice',
          question: 'Which is the most important rule for safe digital communication?',
          options: ['Always use capital letters', 'Never share personal information with strangers', 'Only communicate during daytime', 'Use as many emojis as possible'],
          correct: 1,
          explanation: 'Protecting personal information is crucial for online safety. Never share details like your address, phone number, or school with people you don\'t know.'
        }
      },
      8: {
        objectives: ['Analyze digital communication effectiveness', 'Understand privacy and security in digital communications', 'Create professional digital content'],
        sections: [
          {
            type: 'concept',
            title: 'Digital Communication Ethics',
            content: 'Effective digital communication requires understanding your audience, choosing appropriate platforms, maintaining privacy, and communicating respectfully across cultural and technological boundaries.'
          },
          {
            type: 'communication_principles',
            title: 'Professional Digital Communication',
            principles: [
              {name: 'Clarity', description: 'Make your message clear and easy to understand', example: 'Use simple language and organize thoughts logically'},
              {name: 'Respect', description: 'Treat others with courtesy and consideration', example: 'Use appropriate tone and avoid offensive language'},
              {name: 'Privacy', description: 'Protect sensitive information', example: 'Use secure channels for confidential communications'},
              {name: 'Authenticity', description: 'Be genuine and honest in your communications', example: 'Represent yourself and information accurately'}
            ]
          }
        ],
        project: {
          title: 'Digital Communication Campaign',
          description: 'Create a multi-platform digital communication strategy for a school event or cause.',
          requirements: ['Design content for different platforms (email, social media, website)', 'Consider audience and messaging for each platform', 'Include privacy and safety considerations', 'Measure effectiveness and engagement']
        }
      },
      9: {
        objectives: ['Design comprehensive digital communication strategies', 'Implement advanced security and privacy measures', 'Analyze communication data and optimize engagement'],
        sections: [
          {
            type: 'advanced_concept',
            title: 'Strategic Digital Communication',
            content: 'Modern organizations use sophisticated digital communication strategies that integrate multiple channels, leverage data analytics, and adapt to changing technologies and user behaviors.'
          },
          {
            type: 'communication_technologies',
            title: 'Emerging Communication Technologies',
            technologies: [
              {name: 'AI-Powered Chatbots', purpose: 'Automated customer service and support', impact: 'Provides 24/7 assistance and handles routine inquiries'},
              {name: 'Augmented Reality (AR)', purpose: 'Enhanced visual communication', impact: 'Creates immersive experiences for marketing and education'},
              {name: 'Blockchain Messaging', purpose: 'Secure, decentralized communication', impact: 'Ensures message integrity and prevents tampering'},
              {name: 'Voice Assistants', purpose: 'Hands-free interaction', impact: 'Enables natural language communication with devices'}
            ]
          }
        ],
        challenge: {
          title: 'Global Digital Communication Platform',
          description: 'Design a comprehensive digital communication platform for a multinational organization.',
          requirements: ['Support real-time communication across time zones', 'Implement end-to-end encryption for security', 'Provide multi-language support and cultural adaptation', 'Include analytics and performance monitoring', 'Ensure accessibility for users with disabilities']
        }
      }
    }
  },
               {
                 id: 'characteristics',
            title: '✨ What Makes Pseudocode Special?',
            type: 'interactive_list',
            content: {
              items: [
                {
                  icon: '🗣️',
                  title: 'Uses Plain English',
                  description: 'No complicated programming symbols - just words you already know!',
                  example: 'DISPLAY "Hello World"'
                },
                {
                  icon: '🌍',
                  title: 'Works for Any Language',
                  description: 'Like a universal translator for programming ideas',
                  example: 'Can be converted to Python, Java, or any programming language'
                },
                {
                  icon: '🧠',
                  title: 'Focuses on Logic',
                  description: 'Helps you think about WHAT to do before HOW to do it',
                  example: 'Plan the steps before writing actual code'
                }
              ]
            }
          },
          {
            id: 'first_example',
            title: '🎮 Your First Pseudocode Adventure',
            type: 'interactive_example',
            content: {
              scenario: "Let's help a character in a video game decide if they can enter a special area!",
              problem: "A player needs to be level 10 or higher to enter the Dragon's Cave.",
              pseudocode: [
                "BEGIN Dragon Cave Check",
                "  GET player_level from user",
                "  IF player_level >= 10 THEN",
                "    DISPLAY 'Welcome to Dragon Cave!'",
                "    ALLOW entry",
                "  ELSE",
                "    DISPLAY 'You need to be level 10 or higher'",
                "    DENY entry",
                "  END IF",
                "END"
              ],
              interactive_elements: {
                type: 'drag_and_drop',
                description: 'Drag the pseudocode lines into the correct order!',
                scrambled_lines: [
                  "DISPLAY 'Welcome to Dragon Cave!'",
                  "BEGIN Dragon Cave Check",
                  "IF player_level >= 10 THEN",
                  "GET player_level from user",
                  "END"
                ]
              }
            }
          },
          {
            id: 'practice',
            title: '🏃‍♂️ Practice Time: Daily Life Pseudocode',
            type: 'guided_practice',
            content: {
              instruction: "Let's write pseudocode for something you do every day - getting ready for school!",
              template: [
                "BEGIN Getting Ready for School",
                "  // Fill in the steps below",
                "  ",
                "  ",
                "  ",
                "END"
              ],
              hints: [
                "Think about what you do first when you wake up",
                "Don't forget about breakfast!",
                "What do you need to bring to school?"
              ],
              sample_solution: [
                "BEGIN Getting Ready for School",
                "  WAKE UP and get out of bed",
                "  BRUSH teeth and wash face",
                "  GET DRESSED in school clothes",
                "  EAT breakfast",
                "  PACK school bag with books",
                "  LEAVE for school",
                "END"
              ]
            }
          }
        ],
        assessment: {
          type: 'fun_quiz',
          questions: [
            {
              type: 'multiple_choice',
              question: "What's the best way to think about pseudocode?",
              options: [
                "Like writing a recipe with simple steps",
                "Like writing in a secret code",
                "Like drawing pictures",
                "Like solving math problems"
              ],
              correct: 0,
              explanation: "Pseudocode is like a recipe - it breaks down complex tasks into simple, easy-to-follow steps!"
            }
          ]
        }
      },
      8: {
        level: 'Intermediate',
        duration: '50 minutes',
        objectives: [
          'Write structured pseudocode with proper syntax',
          'Use variables and basic operations in pseudocode',
          'Convert pseudocode to simple programming constructs'
        ],
        sections: [
          {
            id: 'advanced_intro',
            title: '🚀 Leveling Up Your Pseudocode Skills',
            type: 'concept_building',
            content: {
              introduction: "Now that you understand the basics, let's make your pseudocode more powerful and precise. Think of this as upgrading from a bicycle to a motorcycle!",
              key_concepts: [
                {
                  name: 'Variables',
                  description: 'Containers that store information',
                  example: 'SET score = 0',
                  analogy: 'Like labeled boxes where you store different items'
                },
                {
                  name: 'Input/Output',
                  description: 'Getting information from users and showing results',
                  example: 'INPUT username, OUTPUT "Hello " + username',
                  analogy: 'Like having a conversation - you listen and respond'
                },
                {
                  name: 'Conditions',
                  description: 'Making decisions based on different situations',
                  example: 'IF temperature > 30 THEN wear_shorts = true',
                  analogy: 'Like choosing what to wear based on the weather'
                }
              ]
            }
          },
          {
            id: 'structure_patterns',
            title: '🏗️ Building Better Structure',
            type: 'pattern_learning',
            content: {
              patterns: [
                {
                  name: 'Sequence Pattern',
                  description: 'Steps that happen one after another',
                  template: [
                    "BEGIN program_name",
                    "  DECLARE variables",
                    "  INPUT data",
                    "  PROCESS data",
                    "  OUTPUT results",
                    "END"
                  ],
                  example: 'Calculator program that adds two numbers'
                },
                {
                  name: 'Selection Pattern',
                  description: 'Making choices based on conditions',
                  template: [
                    "IF condition THEN",
                    "  action_1",
                    "ELSE IF another_condition THEN",
                    "  action_2",
                    "ELSE",
                    "  default_action",
                    "END IF"
                  ],
                  example: 'Grade calculator that assigns letter grades'
                }
              ]
            }
          },
          {
            id: 'real_world_challenge',
            title: '🎯 Real-World Challenge: Student Grade System',
            type: 'project_based',
            content: {
              scenario: "You're helping your teacher create a system to calculate final grades. The system needs to handle different types of assignments with different weights.",
              requirements: [
                "Accept test scores (worth 60% of grade)",
                "Accept homework average (worth 30% of grade)",
                "Accept participation score (worth 10% of grade)",
                "Calculate final percentage",
                "Assign letter grade (A: 90+, B: 80-89, C: 70-79, D: 60-69, F: <60)"
              ],
              guided_solution: {
                step1: "First, let's declare our variables and get input",
                step2: "Then, we'll calculate the weighted average",
                step3: "Finally, we'll determine the letter grade",
                complete_pseudocode: [
                  "BEGIN Grade Calculator",
                  "  DECLARE test_score, homework_avg, participation",
                  "  DECLARE final_percentage, letter_grade",
                  "  ",
                  "  INPUT test_score",
                  "  INPUT homework_avg",
                  "  INPUT participation",
                  "  ",
                  "  SET final_percentage = (test_score * 0.6) + (homework_avg * 0.3) + (participation * 0.1)",
                  "  ",
                  "  IF final_percentage >= 90 THEN",
                  "    SET letter_grade = 'A'",
                  "  ELSE IF final_percentage >= 80 THEN",
                  "    SET letter_grade = 'B'",
                  "  ELSE IF final_percentage >= 70 THEN",
                  "    SET letter_grade = 'C'",
                  "  ELSE IF final_percentage >= 60 THEN",
                  "    SET letter_grade = 'D'",
                  "  ELSE",
                  "    SET letter_grade = 'F'",
                  "  END IF",
                  "  ",
                  "  OUTPUT 'Final Grade: ' + final_percentage + '% (' + letter_grade + ')'",
                  "END"
                ]
              }
            }
          }
        ]
      },
      9: {
        level: 'Advanced',
        duration: '60 minutes',
        objectives: [
          'Design complex algorithms using pseudocode',
          'Implement loops and nested structures',
          'Optimize pseudocode for efficiency and readability'
        ],
        sections: [
          {
            id: 'advanced_concepts',
            title: '🎓 Mastering Advanced Pseudocode',
            type: 'deep_dive',
            content: {
              introduction: "Welcome to the advanced level! Here, we'll explore complex problem-solving techniques and learn to design elegant, efficient algorithms.",
              advanced_structures: [
                {
                  name: 'Nested Loops',
                  purpose: 'Handle multi-dimensional problems',
                  example: 'Creating a multiplication table',
                  complexity: 'High - requires careful planning'
                },
                {
                  name: 'Functions/Procedures',
                  purpose: 'Break complex problems into smaller, reusable parts',
                  example: 'Calculating compound interest',
                  complexity: 'Medium - promotes code reusability'
                },
                {
                  name: 'Error Handling',
                  purpose: 'Make programs robust and user-friendly',
                  example: 'Validating user input',
                  complexity: 'Medium - prevents program crashes'
                }
              ]
            }
          },
          {
            id: 'algorithm_design',
            title: '🧩 Algorithm Design Challenge',
            type: 'problem_solving_journey',
            content: {
              challenge: "Design a Smart Study Scheduler",
              description: "Create an algorithm that helps students optimize their study schedule based on upcoming exams, subject difficulty, and available time.",
              journey_steps: [
                {
                  step: 1,
                  title: "Understanding the Problem",
                  tasks: [
                    "Identify all input requirements",
                    "Define the desired output",
                    "Consider edge cases and constraints"
                  ]
                },
                {
                  step: 2,
                  title: "Breaking Down the Solution",
                  tasks: [
                    "List all subjects and exam dates",
                    "Calculate days remaining for each subject",
                    "Assign priority based on difficulty and time"
                  ]
                },
                {
                  step: 3,
                  title: "Designing the Algorithm",
                  tasks: [
                    "Create the main program structure",
                    "Design helper functions",
                    "Plan the scheduling logic"
                  ]
                }
              ],
              master_solution: [
                "BEGIN Smart Study Scheduler",
                "  FUNCTION calculate_priority(difficulty, days_remaining, importance)",
                "    RETURN (difficulty * importance) / days_remaining",
                "  END FUNCTION",
                "  ",
                "  FUNCTION create_schedule(subjects_list, available_hours)",
                "    FOR each subject IN subjects_list",
                "      SET priority = calculate_priority(subject.difficulty, subject.days_left, subject.importance)",
                "      ADD priority to subject",
                "    END FOR",
                "    ",
                "    SORT subjects_list BY priority (highest first)",
                "    ",
                "    SET total_hours = 0",
                "    FOR each subject IN sorted_subjects_list",
                "      IF total_hours + subject.study_time <= available_hours THEN",
                "        ADD subject to final_schedule",
                "        SET total_hours = total_hours + subject.study_time",
                "      END IF",
                "    END FOR",
                "    ",
                "    RETURN final_schedule",
                "  END FUNCTION",
                "  ",
                "  // Main Program",
                "  INPUT number_of_subjects",
                "  INPUT available_study_hours",
                "  ",
                "  FOR i = 1 TO number_of_subjects",
                "    INPUT subject_name, difficulty_level, days_until_exam, importance_level, required_study_time",
                "    ADD subject to subjects_list",
                "  END FOR",
                "  ",
                "  SET optimized_schedule = create_schedule(subjects_list, available_study_hours)",
                "  ",
                "  OUTPUT 'Your Optimized Study Schedule:'",
                "  FOR each subject IN optimized_schedule",
                "    OUTPUT subject.name + ': ' + subject.study_time + ' hours'",
                "  END FOR",
                "END"
              ]
            }
          }
        ]
      }
    }
  },
  
  '1.2': {
    title: 'Selection Structures',
    grades: {
      7: {
        level: 'Beginner',
        duration: '40 minutes',
        objectives: [
          'Understand what selection means in programming',
          'Use simple IF-THEN-ELSE statements',
          'Make decisions in everyday scenarios using logic'
        ],
        sections: [
          {
            id: 'intro',
            title: '🤔 Making Decisions Like a Computer',
            type: 'story',
            content: {
              story: "Every day, you make hundreds of decisions: 'If it's raining, I'll take an umbrella.' 'If I'm hungry, I'll eat a snack.' Computers need to make decisions too, and they use something called selection structures!",
              analogy: {
                title: "🚦 The Traffic Light Analogy",
                description: "Just like traffic lights help cars decide when to go, stop, or slow down, selection structures help computers decide what to do in different situations.",
                examples: [
                  "🔴 Red Light → STOP",
                  "🟡 Yellow Light → SLOW DOWN",
                  "🟢 Green Light → GO"
                ]
              }
            }
          },
          {
            id: 'basic_if',
            title: '🎯 Your First IF Statement',
            type: 'interactive_learning',
            content: {
              concept: "The IF statement is like asking a yes/no question. If the answer is yes, do something. If no, do something else (or nothing).",
              structure: [
                "IF (condition is true) THEN",
                "  do this action",
                "ELSE",
                "  do this other action",
                "END IF"
              ],
              fun_example: {
                scenario: "🍕 Pizza Party Decision Maker",
                problem: "You want to order pizza, but only if you have enough money!",
                pseudocode: [
                  "IF money >= 15 THEN",
                  "  ORDER pizza",
                  "  DISPLAY 'Pizza time!'",
                  "ELSE",
                  "  MAKE sandwich at home",
                  "  DISPLAY 'Sandwich it is!'",
                  "END IF"
                ]
              }
            }
          }
        ]
      },
      8: {
        level: 'Intermediate',
        duration: '45 minutes',
        objectives: [
          'Use nested IF statements effectively',
          'Implement multiple conditions with ELSE IF',
          'Apply logical operators (AND, OR, NOT)'
        ],
        sections: [
          {
            id: 'multiple_conditions',
            title: '🎭 Handling Multiple Scenarios',
            type: 'concept_expansion',
            content: {
              introduction: "Real life isn't just yes or no - there are many possibilities! Let's learn how to handle multiple conditions like a pro.",
              structures: [
                {
                  name: 'ELSE IF Chain',
                  purpose: 'Handle multiple distinct conditions',
                  example: 'Grade assignment based on score ranges'
                },
                {
                  name: 'Nested IF',
                  purpose: 'Check conditions within conditions',
                  example: 'Movie recommendation based on age AND genre preference'
                },
                {
                  name: 'Logical Operators',
                  purpose: 'Combine multiple conditions',
                  example: 'Check if student qualifies for honor roll (good grades AND good attendance)'
                }
              ]
            }
          }
        ]
      },
      9: {
        level: 'Advanced',
        duration: '55 minutes',
        objectives: [
          'Design complex decision trees',
          'Optimize selection structures for performance',
          'Implement switch/case alternatives'
        ],
        sections: [
          {
            id: 'advanced_selection',
            title: '🏆 Mastering Complex Decision Making',
            type: 'advanced_concepts',
            content: {
              introduction: "Advanced selection structures allow you to create sophisticated decision-making systems that can handle complex real-world scenarios.",
              techniques: [
                {
                  name: 'Decision Trees',
                  description: 'Systematic approach to complex decisions',
                  use_case: 'AI game character behavior'
                },
                {
                  name: 'Switch Statements',
                  description: 'Efficient alternative to long IF-ELSE chains',
                  use_case: 'Menu selection systems'
                },
                {
                  name: 'Guard Clauses',
                  description: 'Early exit conditions for cleaner code',
                  use_case: 'Input validation systems'
                }
              ]
            }
          }
        ]
      }
    }
  }
  
  '1.3': {
    title: 'Searching',
    grades: {
      7: {
        objectives: [
          'Understand what searching means in computing',
          'Learn basic search techniques',
          'Practice simple search scenarios'
        ],
        sections: [
          {
            type: 'story',
            title: 'The Library Detective',
            content: 'Imagine you\'re a detective in a huge library. You need to find a specific book among thousands. How would you do it? This is exactly what computers do when they search for information!'
          },
          {
            type: 'interactive_list',
            title: 'Real-World Searching',
            items: [
              {
                name: 'Finding a Contact',
                description: 'Looking for a friend\'s number in your phone',
                example: 'Type the first few letters of their name'
              },
              {
                name: 'Web Search',
                description: 'Using Google to find information',
                example: 'Enter keywords about what you want to know'
              },
              {
                name: 'File Search',
                description: 'Finding a document on your computer',
                example: 'Search by filename or content'
              }
            ]
          },
          {
            type: 'interactive_example',
            title: 'Simple Search Game',
            content: 'Let\'s play a number guessing game! I\'m thinking of a number between 1 and 10. How would you find it?',
            steps: [
              'Start with a guess (maybe 5?)',
              'If too high, try a lower number',
              'If too low, try a higher number',
              'Keep going until you find it!'
            ]
          }
        ],
        assessment: {
          type: 'multiple_choice',
          question: 'Which is the best way to search for a book in a library?',
          options: [
            'Look at every book one by one',
            'Use the library catalog system',
            'Ask everyone in the library',
            'Wait for someone to return the book'
          ],
          correct: 1,
          explanation: 'Using the catalog system is efficient because it\'s organized and helps you find exactly what you need quickly.'
        }
      },
      8: {
        objectives: [
          'Compare linear and binary search methods',
          'Understand search efficiency concepts',
          'Apply search algorithms to solve problems'
        ],
        sections: [
          {
            type: 'concept',
            title: 'Two Ways to Search',
            content: 'There are two main ways computers search for information: Linear Search (checking everything one by one) and Binary Search (smart elimination method).'
          },
          {
            type: 'comparison',
            title: 'Linear vs Binary Search',
            items: [
              {
                method: 'Linear Search',
                description: 'Check each item one by one from start to finish',
                example: 'Looking through a messy drawer item by item',
                efficiency: 'Slow for large amounts of data'
              },
              {
                method: 'Binary Search',
                description: 'Divide the search space in half each time',
                example: 'Finding a word in a dictionary by opening to the middle',
                efficiency: 'Very fast, even for huge amounts of data'
              }
            ]
          },
          {
            type: 'interactive_algorithm',
            title: 'Binary Search Simulation',
            content: 'Let\'s find the number 47 in this sorted list: [12, 23, 34, 47, 56, 67, 78, 89]',
            steps: [
              'Start with middle element (47 or 56?)',
              'Compare: Is 47 equal to middle element?',
              'If not, eliminate half of the remaining elements',
              'Repeat until found!'
            ]
          }
        ],
        project: {
          title: 'Student Directory Search',
          description: 'Design a search system for finding students in your school directory.',
          requirements: [
            'Handle 500+ student records',
            'Search by name, grade, or student ID',
            'Show results in under 2 seconds'
          ],
          solution_approach: 'Use binary search for sorted data (like student IDs) and linear search for unsorted data (like searching within names).'
        }
      },
      9: {
        objectives: [
          'Analyze search algorithm complexity',
          'Implement advanced search techniques',
          'Optimize search performance for real applications'
        ],
        sections: [
          {
            type: 'advanced_concept',
            title: 'Search Algorithm Complexity',
            content: 'Understanding Big O notation: Linear search is O(n), Binary search is O(log n). This means binary search gets exponentially better as data grows.'
          },
          {
            type: 'algorithm_analysis',
            title: 'Performance Comparison',
            scenarios: [
              {
                data_size: '100 items',
                linear_steps: '50 steps average',
                binary_steps: '7 steps maximum'
              },
              {
                data_size: '1,000,000 items',
                linear_steps: '500,000 steps average',
                binary_steps: '20 steps maximum'
              }
            ]
          },
          {
            type: 'advanced_techniques',
            title: 'Modern Search Methods',
            methods: [
              {
                name: 'Hash Table Search',
                description: 'Instant lookup using hash functions',
                use_case: 'Database indexing, caching systems'
              },
              {
                name: 'Interpolation Search',
                description: 'Smart guessing based on data distribution',
                use_case: 'Searching in uniformly distributed data'
              },
              {
                name: 'Fuzzy Search',
                description: 'Finding approximate matches',
                use_case: 'Search engines, spell checkers'
              }
            ]
          }
        ],
        challenge: {
          title: 'Smart Search Engine',
          description: 'Design a search system that can handle multiple types of queries efficiently.',
          requirements: [
            'Support exact match, partial match, and fuzzy search',
            'Handle 10,000+ documents',
            'Provide search suggestions',
            'Rank results by relevance'
          ],
          master_solution: 'Combine hash tables for exact matches, trie structures for prefix matching, and similarity algorithms for fuzzy search. Use inverted indexes for document searching and implement ranking algorithms based on term frequency and document relevance.'
        }
      }
    }
  },
};

// Helper function to get content for specific grade and subtopic
export const getLessonContent = (subtopicId, gradeLevel) => {
  const subtopic = lessonContent[subtopicId];
  if (!subtopic || !subtopic.grades[gradeLevel]) {
    return null;
  }
  
  return {
    title: subtopic.title,
    ...subtopic.grades[gradeLevel]
  };
};

// Helper function to get all available subtopics
export const getAvailableSubtopics = () => {
  return Object.keys(lessonContent);
};

// Helper function to check if content exists for a specific combination
export const hasContent = (subtopicId, gradeLevel) => {
  return lessonContent[subtopicId] && lessonContent[subtopicId].grades[gradeLevel];
};