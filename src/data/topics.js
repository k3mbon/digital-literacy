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
        title: "Sorting",
        description: "Master fundamental sorting algorithms and their applications",
        difficulty: "intermediate",
        icon: "/src/assets/icons/subtopic-1-4-sorting.svg"
      },
      "1.5": {
        id: "1.5",
        title: "Iteration",
        description: "Learn loops and repetitive structures in programming",
        difficulty: "beginner",
        icon: "/src/assets/icons/subtopic-1-5-iteration.svg"
      },
      "1.6": {
        id: "1.6",
        title: "Conditional statements in text-based programming",
        description: "Implement conditional logic in real programming languages",
        difficulty: "intermediate",
        icon: "/src/assets/icons/subtopic-1-6-conditional.svg"
      },
      "1.7": {
        id: "1.7",
        title: "Data in text-based program",
        description: "Working with data types and structures in programming",
        difficulty: "intermediate",
        icon: "/src/assets/icons/subtopic-1-7-data.svg"
      },
      "1.8": {
        id: "1.8",
        title: "Algorithms",
        description: "Master algorithm design, analysis, and optimization",
        difficulty: "advanced",
        icon: "/src/assets/icons/subtopic-1-8-algorithms.svg"
      },
      "1.9": {
        id: "1.9",
        title: "Library program",
        description: "Understanding and using programming libraries",
        difficulty: "advanced",
        icon: "/src/assets/icons/subtopic-1-9-library.svg"
      },
      "1.10": {
        id: "1.10",
        title: "Software Development",
        description: "Learn the software development lifecycle and methodologies",
        difficulty: "advanced",
        icon: "/src/assets/icons/subtopic-1-10-software-dev.svg"
      },
      "1.11": {
        id: "1.11",
        title: "Physical Computing",
        description: "Connecting software with hardware and sensors",
        difficulty: "advanced",
        icon: "/src/assets/icons/subtopic-1-11-physical-computing.svg"
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
    availableTopics: [1, 2, 3, 4],
    focusSubtopics: {
      1: ["1.1", "1.2", "1.5"], // Basic pseudocode, selection, iteration
      2: ["2.1"], // Basic modelling
      3: ["3.1"], // Basic network types
      4: ["4.3"] // Input/Output devices
    }
  },
  8: {
    level: 8,
    title: "Grade 8",
    description: "Intermediate Digital Skills",
    color: "#3B82F6",
    availableTopics: [1, 2, 3, 4],
    focusSubtopics: {
      1: ["1.1", "1.2", "1.3", "1.4", "1.5", "1.6", "1.7"], // Core programming concepts
      2: ["2.1", "2.2"], // Data management and databases
      3: ["3.1", "3.2"], // Networks and security
      4: ["4.1", "4.2", "4.3", "4.4"] // Computer systems
    }
  },
  9: {
    level: 9,
    title: "Grade 9",
    description: "Advanced Digital Concepts",
    color: "#10B981",
    availableTopics: [1, 2, 3, 4],
    focusSubtopics: {
      1: ["1.3", "1.4", "1.6", "1.7", "1.8", "1.9", "1.10", "1.11"], // Advanced algorithms and development
      2: ["2.2"], // Advanced databases
      3: ["3.2"], // Advanced security
      4: ["4.1", "4.2", "4.4", "4.5"] // Advanced systems and performance
    }
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

/**
 * Get subtopics appropriate for a specific grade level
 * @param {number} topicId - The topic ID
 * @param {number} grade - The grade level (7, 8, or 9)
 * @returns {Object} Filtered subtopics object for the grade level
 */
export const getGradeAppropriateSubtopics = (topicId, grade) => {
  const topic = topics[topicId];
  const gradeInfo = grades[grade];
  
  if (!topic || !gradeInfo || !gradeInfo.focusSubtopics[topicId]) {
    return topic?.subtopics || {};
  }
  
  const allowedSubtopics = gradeInfo.focusSubtopics[topicId];
  const filteredSubtopics = {};
  
  allowedSubtopics.forEach(subtopicId => {
    if (topic.subtopics[subtopicId]) {
      filteredSubtopics[subtopicId] = topic.subtopics[subtopicId];
    }
  });
  
  return filteredSubtopics;
};

/**
 * Check if a subtopic is appropriate for a grade level
 * @param {number} topicId - The topic ID
 * @param {string} subtopicId - The subtopic ID
 * @param {number} grade - The grade level
 * @returns {boolean} True if appropriate for the grade level
 */
export const isSubtopicAppropriateForGrade = (topicId, subtopicId, grade) => {
  const gradeInfo = grades[grade];
  
  if (!gradeInfo || !gradeInfo.focusSubtopics[topicId]) {
    return true; // Show all if no restrictions defined
  }
  
  return gradeInfo.focusSubtopics[topicId].includes(subtopicId);
};

// Consolidated default export (helps some bundlers / HMR edge cases)
export default {
  topics,
  grades,
  getDifficultyColor,
  getGradeAppropriateSubtopics,
  isSubtopicAppropriateForGrade
};