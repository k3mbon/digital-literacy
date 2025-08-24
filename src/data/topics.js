export const topics = {
  1: {
    id: 1,
    title: "Computational Thinking and Programming",
    icon: "/src/assets/icons/computational-thinking.svg",

    color: "#3B82F6",
    subtopics: {
      "1.1": {
        id: "1.1",
        title: "Pseudocode",
        description: "Learn the fundamentals of pseudocode and algorithmic thinking",
        difficulty: "beginner",
        icon: "/src/assets/icons/subtopic-1-1-pseudocode.svg"
      },
      "1.2": {
        id: "1.2",
        title: "Selection",
        description: "Understanding conditional logic in pseudocode",
        difficulty: "beginner",
        icon: "/src/assets/icons/subtopic-1-2-selection.svg"
      },
      "1.3": {
        id: "1.3",
        title: "Searching",
        description: "Explore different searching techniques and algorithms",
        difficulty: "intermediate",
        icon: "/src/assets/icons/subtopic-1-3-searching.svg"
      },
      "1.4": {
        id: "1.4",
        title: "Conditional statements in text-based programming",
        description: "Implement conditional logic in real programming languages",
        difficulty: "intermediate",
        icon: "/src/assets/icons/subtopic-1-4-conditional.svg"
      },
      "1.5": {
        id: "1.5",
        title: "Data in text-based program",
        description: "Working with data types and structures in programming",
        difficulty: "intermediate",
        icon: "/src/assets/icons/subtopic-1-5-data.svg"
      },
      "1.6": {
        id: "1.6",
        title: "Library program",
        description: "Understanding and using programming libraries",
        difficulty: "advanced",
        icon: "/src/assets/icons/subtopic-1-6-library.svg"
      },
      "1.7": {
        id: "1.7",
        title: "Software Development",
        description: "Learn the software development lifecycle and methodologies",
        difficulty: "advanced",
        icon: "/src/assets/icons/subtopic-1-7-software-dev.svg"
      },
      "1.8": {
        id: "1.8",
        title: "Physical Computing",
        description: "Connecting software with hardware and sensors",
        difficulty: "advanced",
        icon: "/src/assets/icons/subtopic-1-8-physical-computing.svg"
      }
    }
  },
  2: {
    id: 2,
    title: "Managing Data",
    icon: "/src/assets/icons/managing-data.svg",
    color: "#10B981",
    subtopics: {
      "2.1": {
        id: "2.1",
        title: "Modelling",
        description: "Learn data modeling concepts and techniques",
        difficulty: "intermediate",
        icon: "/src/assets/icons/subtopic-2-1-modelling.svg"
      },
      "2.2": {
        id: "2.2",
        title: "Data and Databases",
        description: "Understanding databases and data management systems",
        difficulty: "intermediate",
        icon: "/src/assets/icons/subtopic-2-2-databases.svg"
      }
    }
  },
  3: {
    id: 3,
    title: "Networks and Digital Communications",
    icon: "/src/assets/icons/topic-3-networks.svg",
    color: "#8B5CF6",
    subtopics: {
      "3.1": {
        id: "3.1",
        title: "Types of network",
        description: "Explore different network topologies and architectures",
        difficulty: "beginner",
        icon: "/src/assets/icons/networks-communication.svg"
      },
      "3.2": {
        id: "3.2",
        title: "Data transmission and security",
        description: "Understanding how data travels and security protocols",
        difficulty: "intermediate",
        icon: "/src/assets/icons/subtopic-3-2-data-security.svg"
      }
    }
  },
  4: {
    id: 4,
    title: "Computer System",
    icon: "/src/assets/icons/topic-4-computer-systems.svg",
    color: "#F59E0B",
    subtopics: {
      "4.1": {
        id: "4.1",
        title: "Computer Architecture",
        description: "Learn about computer hardware and system architecture",
        difficulty: "intermediate",
        icon: "/src/assets/icons/subtopic-4-1-architecture.svg"
      },
      "4.2": {
        id: "4.2",
        title: "Operating Systems",
        description: "Understanding operating systems and their functions",
        difficulty: "intermediate",
        icon: "/src/assets/icons/computer-system.svg"
      },
      "4.3": {
        id: "4.3",
        title: "Input and Output Devices",
        description: "Explore various input and output devices and interfaces",
        difficulty: "beginner",
        icon: "/src/assets/icons/subtopic-4-3-input-output.svg"
      },
      "4.4": {
        id: "4.4",
        title: "Storage Devices",
        description: "Understanding different types of storage media and technologies",
        difficulty: "intermediate",
        icon: "/src/assets/icons/subtopic-4-4-storage.svg"
      },
      "4.5": {
        id: "4.5",
        title: "System Performance",
        description: "Learn about system optimization and performance monitoring",
        difficulty: "advanced",
        icon: "/src/assets/icons/subtopic-4-5-performance.svg"
      }
    }
  }
};

export const grades = {
  7: {
    level: 7,
    title: "Grade 7",
    description: "Introduction to Digital Literacy",
    color: "#EF4444",
    availableTopics: [1, 2, 3, 4]
  },
  8: {
    level: 8,
    title: "Grade 8",
    description: "Intermediate Digital Skills",
    color: "#3B82F6",
    availableTopics: [1, 2, 3, 4]
  },
  9: {
    level: 9,
    title: "Grade 9",
    description: "Advanced Digital Concepts",
    color: "#10B981",
    availableTopics: [1, 2, 3, 4]
  }
};

export const getDifficultyColor = (difficulty) => {
  switch (difficulty) {
    case 'beginner': return '#10B981';
    case 'intermediate': return '#F59E0B';
    case 'advanced': return '#EF4444';
    default: return '#6B7280';
  }
};