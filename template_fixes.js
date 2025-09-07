// Fixed template methods with correct structure

getLibraryProgramTemplates(grade, gradeConfig); {
  const baseQuestions = {
    A: [
      {
        prompt: 'What is a programming library?',
        options: ['A building for books', 'Pre-written code for reuse', 'A type of variable', 'A programming language'],
        correctAnswer: 1
      }
    ],
    B: [
      {
        prompt: 'Libraries help programmers avoid writing code from scratch.',
        correctAnswer: true
      }
    ],
    C: [
      {
        prompt: 'Libraries contain pre-written _____ that can be reused.',
        correctAnswer: 'functions'
      }
    ],
    D: [
      {
        prompt: 'Match the library type with its use:',
        pairs: [['Math Library', 'Mathematical calculations'], ['Graphics Library', 'Drawing and images']]
      }
    ],
    E: [
      {
        prompt: 'Order these steps in using a library:',
        items: ['Import library', 'Call library function', 'Use returned result', 'Continue program']
      }
    ]
  };
  
  return this.generateQuestionsFromBase(baseQuestions, 'library-program', grade, gradeConfig);
}

getSoftwareDevelopmentTemplates(grade, gradeConfig); {
  const baseQuestions = {
    A: [
      {
        prompt: 'What is software development?',
        options: ['Building hardware', 'Creating computer programs', 'Fixing computers', 'Installing software'],
        correctAnswer: 1
      }
    ],
    B: [
      {
        prompt: 'Testing is an important part of software development.',
        correctAnswer: true
      }
    ],
    C: [
      {
        prompt: 'The process of finding and fixing errors in code is called _____.',
        correctAnswer: 'debugging'
      }
    ],
    D: [
      {
        prompt: 'Match the development phase with its purpose:',
        pairs: [['Planning', 'Define requirements'], ['Testing', 'Find bugs']]
      }
    ],
    E: [
      {
        prompt: 'Order these software development phases:',
        items: ['Planning', 'Design', 'Coding', 'Testing', 'Deployment']
      }
    ]
  };
  
  return this.generateQuestionsFromBase(baseQuestions, 'software-development', grade, gradeConfig);
}

getPhysicalComputingTemplates(grade, gradeConfig); {
  const baseQuestions = {
    A: [
      {
        prompt: 'What is physical computing?',
        options: ['Only software', 'Connecting software to physical world', 'Hardware only', 'Internet connections'],
        correctAnswer: 1
      }
    ],
    B: [
      {
        prompt: 'Sensors can provide input to physical computing systems.',
        correctAnswer: true
      }
    ],
    C: [
      {
        prompt: 'An _____ is a device that converts physical signals to digital data.',
        correctAnswer: 'sensor'
      }
    ],
    D: [
      {
        prompt: 'Match the component with its function:',
        pairs: [['Sensor', 'Input from environment'], ['Actuator', 'Output to environment']]
      }
    ],
    E: [
      {
        prompt: 'Order these steps in physical computing:',
        items: ['Sense environment', 'Process data', 'Make decision', 'Control output']
      }
    ]
  };
  
  return this.generateQuestionsFromBase(baseQuestions, 'physical-computing', grade, gradeConfig);
}

getModellingTemplates(grade, gradeConfig); {
  const baseQuestions = {
    A: [
      {
        prompt: 'What is computational modeling?',
        options: ['Drawing pictures', 'Using computers to simulate real systems', 'Building physical models', 'Writing stories'],
        correctAnswer: 1
      }
    ],
    B: [
      {
        prompt: 'Models help us understand complex systems.',
        correctAnswer: true
      }
    ],
    C: [
      {
        prompt: 'A _____ is a simplified representation of a real-world system.',
        correctAnswer: 'model'
      }
    ],
    D: [
      {
        prompt: 'Match the model type with its use:',
        pairs: [['Weather Model', 'Predict weather'], ['Traffic Model', 'Optimize traffic flow']]
      }
    ],
    E: [
      {
        prompt: 'Order these modeling steps:',
        items: ['Identify problem', 'Create model', 'Run simulation', 'Analyze results']
      }
    ]
  };
  
  return this.generateQuestionsFromBase(baseQuestions, 'modelling', grade, gradeConfig);
}

getDataDatabasesTemplates(grade, gradeConfig); {
  const baseQuestions = {
    A: [
      {
        prompt: 'What is a database?',
        options: ['A single file', 'An organized collection of data', 'A programming language', 'A computer game'],
        correctAnswer: 1
      }
    ],
    B: [
      {
        prompt: 'Databases can store large amounts of structured data.',
        correctAnswer: true
      }
    ],
    C: [
      {
        prompt: 'A _____ is a collection of related data organized in rows and columns.',
        correctAnswer: 'table'
      }
    ],
    D: [
      {
        prompt: 'Match the database term with its meaning:',
        pairs: [['Record', 'A row of data'], ['Field', 'A column of data']]
      }
    ],
    E: [
      {
        prompt: 'Order these database operations:',
        items: ['Create table', 'Insert data', 'Query data', 'Update records']
      }
    ]
  };
  
  return this.generateQuestionsFromBase(baseQuestions, 'data-databases', grade, gradeConfig);
}

getNetworkTypesTemplates(grade, gradeConfig); {
  const baseQuestions = {
    A: [
      {
        prompt: 'What is a computer network?',
        options: ['A single computer', 'Connected computers that share resources', 'Internet only', 'Software programs'],
        correctAnswer: 1
      }
    ],
    B: [
      {
        prompt: 'LANs cover smaller areas than WANs.',
        correctAnswer: true
      }
    ],
    C: [
      {
        prompt: 'A _____ connects devices within a small area like a home or office.',
        correctAnswer: 'LAN'
      }
    ],
    D: [
      {
        prompt: 'Match the network type with its coverage:',
        pairs: [['LAN', 'Local area'], ['WAN', 'Wide area']]
      }
    ],
    E: [
      {
        prompt: 'Order these network sizes from smallest to largest:',
        items: ['PAN', 'LAN', 'MAN', 'WAN']
      }
    ]
  };
  
  return this.generateQuestionsFromBase(baseQuestions, 'network-types', grade, gradeConfig);
}

getDataTransmissionSecurityTemplates(grade, gradeConfig); {
  const baseQuestions = {
    A: [
      {
        prompt: 'What is data encryption?',
        options: ['Deleting data', 'Converting data to secret code', 'Copying data', 'Storing data'],
        correctAnswer: 1
      }
    ],
    B: [
      {
        prompt: 'HTTPS is more secure than HTTP.',
        correctAnswer: true
      }
    ],
    C: [
      {
        prompt: 'A _____ protects networks from unauthorized access.',
        correctAnswer: 'firewall'
      }
    ],
    D: [
      {
        prompt: 'Match the security measure with its purpose:',
        pairs: [['Encryption', 'Protect data'], ['Firewall', 'Block threats']]
      }
    ],
    E: [
      {
        prompt: 'Order these security steps:',
        items: ['Identify threat', 'Implement protection', 'Monitor system', 'Respond to incidents']
      }
    ]
  };
  
  return this.generateQuestionsFromBase(baseQuestions, 'data-transmission-security', grade, gradeConfig);
}

getComputerArchitectureTemplates(grade, gradeConfig); {
  const baseQuestions = {
    A: [
      {
        prompt: 'What is computer architecture?',
        options: ['Building design', 'How computer components work together', 'Software installation', 'Internet connections'],
        correctAnswer: 1
      }
    ],
    B: [
      {
        prompt: 'The CPU is the brain of the computer.',
        correctAnswer: true
      }
    ],
    C: [
      {
        prompt: 'The _____ processes instructions and performs calculations.',
        correctAnswer: 'CPU'
      }
    ],
    D: [
      {
        prompt: 'Match the component with its function:',
        pairs: [['CPU', 'Process instructions'], ['RAM', 'Store temporary data']]
      }
    ],
    E: [
      {
        prompt: 'Order these steps in instruction processing:',
        items: ['Fetch instruction', 'Decode instruction', 'Execute instruction', 'Store result']
      }
    ]
  };
  
  return this.generateQuestionsFromBase(baseQuestions, 'computer-architecture', grade, gradeConfig);
}

getOperatingSystemsTemplates(grade, gradeConfig); {
  const baseQuestions = {
    A: [
      {
        prompt: 'What is an operating system?',
        options: ['A computer game', 'Software that manages computer resources', 'A web browser', 'A programming language'],
        correctAnswer: 1
      }
    ],
    B: [
      {
        prompt: 'Operating systems manage both hardware and software resources.',
        correctAnswer: true
      }
    ],
    C: [
      {
        prompt: 'The _____ is the core part of an operating system.',
        correctAnswer: 'kernel'
      }
    ],
    D: [
      {
        prompt: 'Match the OS function with its purpose:',
        pairs: [['File Management', 'Organize files'], ['Process Management', 'Run programs']]
      }
    ],
    E: [
      {
        prompt: 'Order these OS startup steps:',
        items: ['Power on', 'Load bootloader', 'Start kernel', 'Load user interface']
      }
    ]
  };
  
  return this.generateQuestionsFromBase(baseQuestions, 'operating-systems', grade, gradeConfig);
}

getInputOutputDevicesTemplates(grade, gradeConfig); {
  const baseQuestions = {
    A: [
      {
        prompt: 'What are input devices?',
        options: ['Devices that display information', 'Devices that send data to computer', 'Storage devices', 'Network devices'],
        correctAnswer: 1
      }
    ],
    B: [
      {
        prompt: 'A monitor is an output device.',
        correctAnswer: true
      }
    ],
    C: [
      {
        prompt: 'A _____ allows users to point and click on screen elements.',
        correctAnswer: 'mouse'
      }
    ],
    D: [
      {
        prompt: 'Match the device with its type:',
        pairs: [['Keyboard', 'Input device'], ['Printer', 'Output device']]
      }
    ],
    E: [
      {
        prompt: 'Order these steps in data flow:',
        items: ['User input', 'Computer processing', 'Generate output', 'Display result']
      }
    ]
  };
  
  return this.generateQuestionsFromBase(baseQuestions, 'input-output-devices', grade, gradeConfig);
}

getStorageDevicesTemplates(grade, gradeConfig); {
  const baseQuestions = {
    A: [
      {
        prompt: 'What is the purpose of storage devices?',
        options: ['Process data', 'Store data permanently', 'Display information', 'Connect to internet'],
        correctAnswer: 1
      }
    ],
    B: [
      {
        prompt: 'SSDs are faster than traditional hard drives.',
        correctAnswer: true
      }
    ],
    C: [
      {
        prompt: 'A _____ is a portable storage device that connects via USB.',
        correctAnswer: 'flash drive'
      }
    ],
    D: [
      {
        prompt: 'Match the storage type with its characteristic:',
        pairs: [['HDD', 'Uses spinning disks'], ['SSD', 'Uses flash memory']]
      }
    ],
    E: [
      {
        prompt: 'Order these storage capacities from smallest to largest:',
        items: ['KB', 'MB', 'GB', 'TB']
      }
    ]
  };
  
  return this.generateQuestionsFromBase(baseQuestions, 'storage-devices', grade, gradeConfig);
}

getSystemPerformanceTemplates(grade, gradeConfig); {
  const baseQuestions = {
    A: [
      {
        prompt: 'What affects computer performance?',
        options: ['Only software', 'Both hardware and software', 'Only the internet', 'Only the monitor'],
        correctAnswer: 1
      }
    ],
    B: [
      {
        prompt: 'More RAM generally improves computer performance.',
        correctAnswer: true
      }
    ],
    C: [
      {
        prompt: 'The _____ speed affects how fast a computer can process instructions.',
        correctAnswer: 'CPU'
      }
    ],
    D: [
      {
        prompt: 'Match the component with its performance impact:',
        pairs: [['RAM', 'Multitasking ability'], ['CPU', 'Processing speed']]
      }
    ],
    E: [
      {
        prompt: 'Order these steps to improve performance:',
        items: ['Identify bottleneck', 'Upgrade component', 'Test performance', 'Monitor results']
      }
    ]
  };
  
  return this.generateQuestionsFromBase(baseQuestions, 'system-performance', grade, gradeConfig);
}