import content from '@/data/content.json';

export function getContent(section) {
  try {    
    if (section) {
      return content[section];
    }
    return content;
  } catch (error) {
    console.error('Error loading content:', error);
    return null;
  }
}