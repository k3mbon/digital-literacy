// Test script to verify lesson loading
import { getLessonContent } from './src/data/lessonLoader.js';

// Test loading a specific lesson
console.log('Testing lesson 1.1...');
const lesson = getLessonContent('1.1', 8);
console.log('Lesson data:', lesson);

if (lesson) {
  console.log('✅ Lesson loaded successfully');
  console.log('Title:', lesson.title);
  console.log('Description:', lesson.description);
  console.log('Content length:', lesson.content ? lesson.content.length : 'No content');
} else {
  console.log('❌ Failed to load lesson');
}
