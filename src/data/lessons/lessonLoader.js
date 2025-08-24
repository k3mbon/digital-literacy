// Lesson Loader - Dynamic import system for modular lesson content
// This system improves performance by loading lessons on-demand

const lessonCache = new Map();

/**
 * Dynamically loads lesson content for a specific subtopic
 * @param {string} subtopicId - The subtopic ID (e.g., '1.1', '2.2')
 * @returns {Promise<Object>} The lesson content object
 */
export const loadLesson = async (subtopicId) => {
  // Check cache first
  if (lessonCache.has(subtopicId)) {
    return lessonCache.get(subtopicId);
  }

  try {
    let lessonModule;
    
    // Map subtopic IDs to their respective module paths
    const topicMap = {
      // Computational Thinking and Programming
      '1.1': () => import('./computational-thinking/pseudocode.js'),
      '1.2': () => import('./computational-thinking/selection.js'),
      '1.3': () => import('./computational-thinking/searching.js'),
      '1.4': () => import('./computational-thinking/conditional-statements.js'),
      '1.5': () => import('./computational-thinking/data-in-text-based-program.js'),
      '1.6': () => import('./computational-thinking/library-program.js'),
      '1.7': () => import('./computational-thinking/software-development.js'),
      '1.8': () => import('./computational-thinking/physical-computing.js'),
      
      // Managing Data
      '2.1': () => import('./data-management/modelling.js'),
      '2.2': () => import('./data-management/databases.js'),
      
      // Networks and Digital Communications
      '3.1': () => import('./networks-communications/network-types.js'),
      '3.2': () => import('./networks-communications/data-security.js'),
      
      // Computer Systems
      '4.1': () => import('./computer-systems/architecture.js'),
      '4.2': () => import('./computer-systems/operating-systems.js'),
      '4.3': () => import('./computer-systems/input-output.js'),
      '4.4': () => import('./computer-systems/storage.js'),
      '4.5': () => import('./computer-systems/performance.js')
    };

    const loader = topicMap[subtopicId];
    if (!loader) {
      throw new Error(`No lesson found for subtopic: ${subtopicId}`);
    }

    lessonModule = await loader();
    const lessonContent = lessonModule.default || lessonModule;
    
    // Cache the loaded lesson
    lessonCache.set(subtopicId, lessonContent);
    
    return lessonContent;
  } catch (error) {
    console.error(`Failed to load lesson for subtopic ${subtopicId}:`, error);
    
    // Fallback to basic lesson structure
    const fallbackLesson = {
      title: `Lesson ${subtopicId}`,
      content: `<p>Lesson content for ${subtopicId} is currently being developed.</p>`,
      interactiveElements: [],
      assessments: []
    };
    
    lessonCache.set(subtopicId, fallbackLesson);
    return fallbackLesson;
  }
};

/**
 * Preloads multiple lessons for better performance
 * @param {string[]} subtopicIds - Array of subtopic IDs to preload
 * @returns {Promise<void>}
 */
export const preloadLessons = async (subtopicIds) => {
  const loadPromises = subtopicIds.map(id => loadLesson(id));
  await Promise.all(loadPromises);
};

/**
 * Clears the lesson cache
 */
export const clearLessonCache = () => {
  lessonCache.clear();
};

/**
 * Gets all cached lesson IDs
 * @returns {string[]} Array of cached subtopic IDs
 */
export const getCachedLessonIds = () => {
  return Array.from(lessonCache.keys());
};

/**
 * Checks if a lesson is cached
 * @param {string} subtopicId - The subtopic ID to check
 * @returns {boolean} True if lesson is cached
 */
export const isLessonCached = (subtopicId) => {
  return lessonCache.has(subtopicId);
};