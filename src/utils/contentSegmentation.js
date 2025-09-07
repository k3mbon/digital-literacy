// Content Segmentation Utility for Topics Page
// Breaks down complex lesson content into digestible cards

import { getLessonContent } from '../data/lessonLoader';

/**
 * Analyzes content and determines appropriate segmentation
 * @param {string} content - HTML content string
 * @returns {Array} Array of content segments
 */
export const analyzeContentComplexity = (content) => {
  if (!content) return [];
  
  // Parse HTML content to identify sections
  const parser = new DOMParser();
  const doc = parser.parseFromString(content, 'text/html');
  
  const segments = [];
  let currentSegment = null;
  
  // Define content complexity thresholds
  const COMPLEXITY_THRESHOLDS = {
    SIMPLE: 200,    // Less than 200 characters
    MEDIUM: 500,    // 200-500 characters
    COMPLEX: 1000   // 500-1000 characters
  };
  
  // Identify major sections
  const majorSections = doc.querySelectorAll('div[class*="lesson-"], div[class*="search-"], div[class*="method-"], div[class*="performance-"], div[class*="advanced-"], div[class*="real-world-"], div[class*="application-"]');
  
  majorSections.forEach((section, index) => {
    const sectionContent = section.innerHTML;
    const textLength = section.textContent.length;
    const hasCodeBlocks = section.querySelectorAll('pre, code').length > 0;
    const hasInteractiveElements = section.querySelectorAll('.point-grid, .algorithm-steps, .chart-row').length > 0;
    
    // Determine segment type and complexity
    let segmentType = 'content';
    let complexity = 'simple';
    
    if (section.className.includes('lesson-intro')) {
      segmentType = 'introduction';
    } else if (section.className.includes('method-card') || hasCodeBlocks) {
      segmentType = 'algorithm';
      complexity = 'medium';
    } else if (section.className.includes('performance-') || section.className.includes('comparison')) {
      segmentType = 'comparison';
      complexity = 'medium';
    } else if (section.className.includes('advanced-') || section.className.includes('real-world-')) {
      segmentType = 'application';
      complexity = 'complex';
    }
    
    // Adjust complexity based on content length
    if (textLength > COMPLEXITY_THRESHOLDS.COMPLEX) {
      complexity = 'complex';
    } else if (textLength > COMPLEXITY_THRESHOLDS.MEDIUM) {
      complexity = complexity === 'simple' ? 'medium' : complexity;
    }
    
    // Create segment
    const segment = {
      id: `segment-${index}`,
      type: segmentType,
      complexity,
      title: extractTitle(section),
      content: sectionContent,
      textLength,
      hasCodeBlocks,
      hasInteractiveElements,
      estimatedReadTime: Math.ceil(textLength / 200), // ~200 chars per minute
      order: index
    };
    
    segments.push(segment);
  });
  
  return segments;
};

/**
 * Extracts title from a content section
 * @param {Element} section - DOM element
 * @returns {string} Extracted title
 */
const extractTitle = (section) => {
  const titleElement = section.querySelector('h1, h2, h3, h4');
  if (titleElement) {
    return titleElement.textContent.trim();
  }
  
  // Fallback: use class name or first few words
  const className = section.className;
  if (className.includes('lesson-intro')) return 'Introduction';
  if (className.includes('method-card')) return 'Algorithm Method';
  if (className.includes('performance-')) return 'Performance Analysis';
  if (className.includes('advanced-')) return 'Advanced Concepts';
  if (className.includes('real-world-')) return 'Real-World Applications';
  
  // Extract first few words as title
  const text = section.textContent.trim();
  const words = text.split(' ').slice(0, 5).join(' ');
  return words.length > 30 ? words.substring(0, 30) + '...' : words;
};

/**
 * Segments lesson content for a specific subtopic
 * @param {string} subtopicId - The subtopic ID
 * @param {number} grade - Grade level
 * @returns {Array} Array of content cards
 */
export const segmentLessonContent = (subtopicId, grade = 8) => {
  const lessonData = getLessonContent(subtopicId, grade);
  if (!lessonData || !lessonData.content) {
    return [];
  }
  
  const segments = analyzeContentComplexity(lessonData.content);
  
  // Transform segments into cards
  const cards = segments.map((segment, index) => {
    const card = {
      id: `card-${subtopicId}-${index}`,
      subtopicId,
      title: segment.title,
      content: segment.content,
      type: segment.type,
      complexity: segment.complexity,
      estimatedTime: segment.estimatedReadTime,
      hasCode: segment.hasCodeBlocks,
      hasInteractive: segment.hasInteractiveElements,
      order: segment.order,
      icon: getCardIcon(segment.type),
      color: getComplexityColor(segment.complexity)
    };
    
    return card;
  });
  
  // Add additional cards for interactive elements and assessments
  if (lessonData.interactiveElements && lessonData.interactiveElements.length > 0) {
    cards.push({
      id: `card-${subtopicId}-interactive`,
      subtopicId,
      title: 'Interactive Activities',
      content: 'Hands-on exercises and visualizations',
      type: 'interactive',
      complexity: 'medium',
      estimatedTime: 10,
      hasCode: false,
      hasInteractive: true,
      order: cards.length,
      icon: '🎮',
      color: '#8b5cf6',
      interactiveElements: lessonData.interactiveElements
    });
  }
  
  if (lessonData.assessments && lessonData.assessments.length > 0) {
    cards.push({
      id: `card-${subtopicId}-assessment`,
      subtopicId,
      title: 'Knowledge Check',
      content: 'Test your understanding with quiz questions',
      type: 'assessment',
      complexity: 'simple',
      estimatedTime: 5,
      hasCode: false,
      hasInteractive: true,
      order: cards.length,
      icon: '🎯',
      color: '#10b981',
      assessments: lessonData.assessments
    });
  }
  
  return cards;
};

/**
 * Gets appropriate icon for card type
 * @param {string} type - Card type
 * @returns {string} Icon emoji
 */
const getCardIcon = (type) => {
  const iconMap = {
    introduction: '📚',
    algorithm: '⚡',
    comparison: '📊',
    application: '🌍',
    interactive: '🎮',
    assessment: '🎯',
    content: '📖'
  };
  return iconMap[type] || '📄';
};

/**
 * Gets color based on complexity level
 * @param {string} complexity - Complexity level
 * @returns {string} Hex color code
 */
const getComplexityColor = (complexity) => {
  const colorMap = {
    simple: '#10b981',    // Green
    medium: '#f59e0b',    // Orange
    complex: '#ef4444'    // Red
  };
  return colorMap[complexity] || '#6b7280';
};

/**
 * Calculates total estimated time for all cards
 * @param {Array} cards - Array of content cards
 * @returns {number} Total time in minutes
 */
export const calculateTotalTime = (cards) => {
  return cards.reduce((total, card) => total + card.estimatedTime, 0);
};

/**
 * Groups cards by complexity for progressive learning
 * @param {Array} cards - Array of content cards
 * @returns {Object} Grouped cards by complexity
 */
export const groupCardsByComplexity = (cards) => {
  return cards.reduce((groups, card) => {
    const complexity = card.complexity;
    if (!groups[complexity]) {
      groups[complexity] = [];
    }
    groups[complexity].push(card);
    return groups;
  }, {});
};

/**
 * Filters cards by type
 * @param {Array} cards - Array of content cards
 * @param {string} type - Card type to filter by
 * @returns {Array} Filtered cards
 */
export const filterCardsByType = (cards, type) => {
  return cards.filter(card => card.type === type);
};