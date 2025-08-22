// Dynamic lesson loader for modular lesson files
// This loader imports lessons from individual files for better performance and maintainability

// Import all lesson modules
import pseudocode from './lessons/computational-thinking/pseudocode.js';
import selection from './lessons/computational-thinking/selection.js';
import searching from './lessons/computational-thinking/searching.js';
import sorting from './lessons/computational-thinking/sorting.js';
import iteration from './lessons/computational-thinking/iteration.js';
import validation from './lessons/computational-thinking/validation.js';
import testing from './lessons/computational-thinking/testing.js';
import algorithms from './lessons/computational-thinking/algorithms.js';

import modelling from './lessons/data-management/modelling.js';
import databases from './lessons/data-management/databases.js';

import networkTypes from './lessons/networks-communications/network-types.js';
import dataSecurity from './lessons/networks-communications/data-security.js';

import architecture from './lessons/computer-systems/architecture.js';
import operatingSystems from './lessons/computer-systems/operating-systems.js';
import inputOutput from './lessons/computer-systems/input-output.js';
import storage from './lessons/computer-systems/storage.js';
import performance from './lessons/computer-systems/performance.js';

// Lesson mapping object
const lessonModules = {
  // Computational Thinking (Topic 1)
  '1.1': pseudocode,
  '1.2': selection,
  '1.3': searching,
  '1.4': sorting,
  '1.5': iteration,
  '1.6': validation,
  '1.7': testing,
  '1.8': algorithms,
  
  // Data Representation (Topic 2)
  '2.1': modelling,
  '2.2': databases,
  
  // Networks & Communications (Topic 3)
  '3.1': networkTypes,
  '3.2': dataSecurity,
  
  // Computer Systems (Topic 4)
  '4.1': architecture,
  '4.2': operatingSystems,
  '4.3': inputOutput,
  '4.4': storage,
  '4.5': performance
};

/**
 * Get lesson content by lesson ID with grade-level differentiation
 * @param {string} lessonId - The lesson ID (e.g., '1.1', '2.3')
 * @param {number} grade - The grade level (7, 8, or 9)
 * @returns {Object|null} The lesson content object adapted for grade level or null if not found
 */
export const getLessonContent = (lessonId, grade = 8) => {
  const lesson = lessonModules[lessonId];
  if (!lesson) {
    console.warn(`Lesson ${lessonId} not found`);
    return null;
  }
  
  // Create grade-adapted lesson content
  return adaptLessonForGrade(lesson, grade);
};

/**
 * Adapt lesson content based on grade level
 * @param {Object} lesson - The base lesson content
 * @param {number} grade - The grade level (7, 8, or 9)
 * @returns {Object} Grade-adapted lesson content
 */
const adaptLessonForGrade = (lesson, grade) => {
  if (!lesson) return null;
  
  const adaptedLesson = JSON.parse(JSON.stringify(lesson)); // Deep clone
  
  // Grade 7: Simplified content with basic examples and easy language
  if (grade === 7) {
    adaptedLesson.title = `${lesson.title} - Getting Started (Grade 7)`;
    adaptedLesson.difficulty = 'beginner';
    if (lesson.content) {
      adaptedLesson.content = simplifyContent(lesson.content);
    }
    // Reduce estimated time and add beginner-friendly objectives
    if (lesson.estimatedTime) {
      adaptedLesson.estimatedTime = lesson.estimatedTime.replace(/\d+/, (match) => 
        Math.max(20, Math.floor(parseInt(match) * 0.75)) + ' minutes (with extra practice time)'
      );
    }
    // Simplify objectives for Grade 7
    if (lesson.objectives) {
      adaptedLesson.objectives = lesson.objectives.map(obj => 
        obj.replace(/Master|Analyze|Implement/gi, 'Learn about')
           .replace(/advanced|complex/gi, 'basic')
           .replace(/efficiency|optimization/gi, 'how it works')
      );
    }
  }
  
  // Grade 8: Balanced content with core concepts and practical applications
  else if (grade === 8) {
    adaptedLesson.title = `${lesson.title} - Core Understanding (Grade 8)`;
    adaptedLesson.difficulty = 'intermediate';
    if (lesson.content) {
      adaptedLesson.content = balanceContent(lesson.content);
    }
    // Keep standard timing with practical focus
    if (lesson.estimatedTime) {
      adaptedLesson.estimatedTime = lesson.estimatedTime.replace(/minutes/, 'minutes (includes hands-on practice)');
    }
  }
  
  // Grade 9: Enhanced content with advanced applications and deeper theory
  else if (grade === 9) {
    adaptedLesson.title = `${lesson.title} - Advanced Mastery (Grade 9)`;
    adaptedLesson.difficulty = 'advanced';
    if (lesson.content) {
      adaptedLesson.content = enhanceContent(lesson.content);
    }
    // Increase estimated time for comprehensive coverage
    if (lesson.estimatedTime) {
      adaptedLesson.estimatedTime = lesson.estimatedTime.replace(/\d+/, (match) => 
        Math.floor(parseInt(match) * 1.4) + ' minutes (includes advanced challenges)'
      );
    }
    // Enhance objectives for Grade 9
    if (lesson.objectives) {
      adaptedLesson.objectives = [...lesson.objectives, 
        'Analyze real-world applications and industry use cases',
        'Evaluate different approaches and their trade-offs',
        'Connect concepts to advanced computer science topics'
      ];
    }
  }
  
  return adaptedLesson;
};

/**
 * Simplify content for Grade 7 (basic level)
 * @param {string} content - Original content
 * @returns {string} Simplified content for Grade 7
 */
const simplifyContent = (content) => {
  if (!content) return content;
  
  return content
    // Replace complex terms with simpler ones
    .replace(/algorithm/gi, 'step-by-step process')
    .replace(/implementation/gi, 'way to do it')
    .replace(/optimization/gi, 'making it better')
    .replace(/computational/gi, 'computer-based')
    .replace(/sophisticated|intricate/gi, 'detailed')
    .replace(/efficiency/gi, 'how fast it works')
    .replace(/complexity/gi, 'how difficult it is')
    .replace(/methodology/gi, 'method')
    .replace(/paradigm/gi, 'approach')
    .replace(/architecture/gi, 'structure')
    
    // Simplify technical explanations
    .replace(/<h3>Advanced Applications<\/h3>[\s\S]*?(?=<h[23]|$)/gi, '')
    .replace(/This concept is widely used in professional software development[^.]*\./gi, 'This is used in many computer programs.')
    
    // Add Grade 7 specific introductory content
    .replace(/<h2>What is ([^<]+)\?<\/h2>/gi, '<h2>What is $1? (Grade 7 Introduction)</h2>\n<p><strong>Let\'s start simple!</strong> We\'ll learn about $1 step by step, using easy examples you can understand.</p>');
};

/**
 * Enhance content for Grade 9 (advanced level)
 * @param {string} content - Original content
 * @returns {string} Enhanced content for Grade 9
 */
const enhanceContent = (content) => {
  if (!content) return content;
  
  // Add advanced terminology and deeper explanations
  let enhancedContent = content
    // Add more technical terms
    .replace(/step-by-step process/gi, 'algorithm')
    .replace(/way to do it/gi, 'implementation strategy')
    .replace(/making it better/gi, 'optimization technique')
    
    // Add Grade 9 specific advanced content
    .replace(/<h2>What is ([^<]+)\?<\/h2>/gi, '<h2>What is $1? (Grade 9 Advanced)</h2>\n<p><strong>Advanced Understanding:</strong> $1 represents a fundamental concept in computer science with wide-ranging applications in modern technology.</p>');
  
  // Add comprehensive advanced applications section
  enhancedContent += `

<h3>🚀 Advanced Applications & Real-World Impact</h3>
<div class="advanced-content">
<p>This concept is extensively used in:</p>
<ul>
  <li><strong>Professional Software Development:</strong> Industry-standard practices and enterprise applications</li>
  <li><strong>Data Science & Analytics:</strong> Processing large datasets and machine learning algorithms</li>
  <li><strong>Computer Engineering:</strong> System design, performance optimization, and scalable architectures</li>
  <li><strong>Artificial Intelligence:</strong> Algorithm design for intelligent systems and automation</li>
  <li><strong>Cybersecurity:</strong> Secure coding practices and system protection mechanisms</li>
</ul>

<h4>Industry Connections</h4>
<p>Understanding these fundamentals prepares you for advanced topics in:</p>
<ul>
  <li>Advanced algorithms and data structures</li>
  <li>System design and architecture patterns</li>
  <li>Performance analysis and computational complexity</li>
  <li>Distributed systems and cloud computing</li>
  <li>Software engineering best practices</li>
</ul>

<h4>Critical Thinking Challenge</h4>
<p>Consider how this concept might evolve with emerging technologies like quantum computing, edge computing, or advanced AI systems. What new applications or optimizations might become possible?</p>
</div>`;
  
  return enhancedContent;
};

/**
 * Add Grade 8 balanced content (standard level)
 * @param {string} content - Original content
 * @returns {string} Balanced content for Grade 8
 */
const balanceContent = (content) => {
  if (!content) return content;
  
  return content
    // Add Grade 8 specific balanced introduction
    .replace(/<h2>What is ([^<]+)\?<\/h2>/gi, '<h2>What is $1? (Grade 8 Core Concepts)</h2>\n<p><strong>Building Understanding:</strong> Now that you have some experience, let\'s explore $1 with more detail and practical examples.</p>')
    
    // Add practical applications section for Grade 8
    + `\n\n<h3>💡 Practical Applications</h3>
<div class="grade8-content">
<p>You can see this concept in action in:</p>
<ul>
  <li><strong>Everyday Technology:</strong> Apps on your phone, websites you visit, and games you play</li>
  <li><strong>Problem Solving:</strong> Breaking down complex problems into manageable steps</li>
  <li><strong>School Projects:</strong> Organizing information and creating efficient solutions</li>
  <li><strong>Future Learning:</strong> Foundation for more advanced computer science topics</li>
</ul>

<h4>Think About It</h4>
<p>How might you use these concepts in your own projects or to solve problems you encounter in daily life?</p>
</div>`;
};

/**
 * Get advanced content for higher grade levels
 * @param {string} lessonId - The lesson ID
 * @param {string} sectionTitle - The section title
 * @returns {Array} Additional advanced content items
 */
const getAdvancedContent = (lessonId, sectionTitle) => {
  const advancedContent = {
    '1.1': [{
      type: 'text',
      content: 'Advanced pseudocode techniques include modular design patterns, recursive algorithms, and optimization strategies used in professional software development.'
    }],
    '1.2': [{
      type: 'text', 
      content: 'Complex selection structures can implement decision trees, state machines, and multi-criteria decision analysis commonly used in AI and expert systems.'
    }],
    '1.3': [{
      type: 'text',
      content: 'Advanced searching algorithms like A* pathfinding, binary search trees, and hash-based lookups are fundamental to modern database systems and search engines.'
    }]
  };
  
  return advancedContent[lessonId] || [];
};

/**
 * Get all available lesson IDs
 * @returns {string[]} Array of lesson IDs
 */
export const getAvailableLessons = () => {
  return Object.keys(lessonModules);
};

/**
 * Check if a lesson exists
 * @param {string} lessonId - The lesson ID to check
 * @returns {boolean} True if lesson exists, false otherwise
 */
export const lessonExists = (lessonId) => {
  return lessonId in lessonModules;
};

/**
 * Get lessons by topic
 * @param {string} topicId - The topic ID (e.g., '1', '2', '3', '4')
 * @returns {Object} Object containing lesson IDs and their content for the topic
 */
export const getLessonsByTopic = (topicId) => {
  const topicLessons = {};
  
  Object.keys(lessonModules).forEach(lessonId => {
    if (lessonId.startsWith(topicId + '.')) {
      topicLessons[lessonId] = lessonModules[lessonId];
    }
  });
  
  return topicLessons;
};

/**
 * Get lesson metadata (title, description, difficulty, etc.) without full content
 * @param {string} lessonId - The lesson ID
 * @returns {Object|null} Lesson metadata or null if not found
 */
export const getLessonMetadata = (lessonId) => {
  const lesson = lessonModules[lessonId];
  if (!lesson) {
    return null;
  }
  
  return {
    title: lesson.title,
    description: lesson.description,
    difficulty: lesson.difficulty,
    estimatedTime: lesson.estimatedTime,
    objectives: lesson.objectives,
    prerequisites: lesson.prerequisites
  };
};

/**
 * Get all lesson metadata for quick overview
 * @returns {Object} Object with lesson IDs as keys and metadata as values
 */
export const getAllLessonMetadata = () => {
  const metadata = {};
  
  Object.keys(lessonModules).forEach(lessonId => {
    metadata[lessonId] = getLessonMetadata(lessonId);
  });
  
  return metadata;
};

/**
 * Legacy compatibility: Export lesson content in the old format
 * This maintains backward compatibility with existing code
 */
const legacyLessonContent = {};
Object.keys(lessonModules).forEach(lessonId => {
  legacyLessonContent[lessonId] = lessonModules[lessonId];
});

// Default export for backward compatibility
export default legacyLessonContent;

// Named exports for new modular approach
export {
  lessonModules
};