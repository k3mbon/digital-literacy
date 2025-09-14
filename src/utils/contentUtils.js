export const transformContentToReadable = (content) => {
  // This function will be enhanced to accurately display content with proper formatting, responsive design, and optimal loading performance.
  // It will include key elements such as titles, descriptions, media, and interactive components while maintaining visual consistency.
export const transformContentToReadable = (content) => {
  let readableContent = content;

  // 1. Handle responsive images
  readableContent = readableContent.replace(
    /<img([^>]*)src="([^"]*)"([^>]*)>/gi,
    (match, p1, src, p2) => {
      // Check if the image is already wrapped in a responsive container
      if (match.includes('class="responsive-image-container"')) {
        return match; // Already responsive, return as is
      }
      return `<div class="responsive-image-container"><img${p1}src="${src}"${p2}></div>`;
    }
  );

  // 2. Handle responsive videos (e.g., YouTube embeds, direct video files)
  readableContent = readableContent.replace(
    /<iframe([^>]*)src="(https:\/\/www\.youtube\.com\/embed\/[^"]*)"([^>]*)><\/iframe>/gi,
    (match, p1, src, p2) => {
      if (match.includes('class="responsive-video-container"')) {
        return match;
      }
      return `<div class="responsive-video-container"><iframe${p1}src="${src}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen${p2}></iframe></div>`;
    }
  );

  readableContent = readableContent.replace(
    /<video([^>]*)src="([^"]*)"([^>]*)><\/video>/gi,
    (match, p1, src, p2) => {
      if (match.includes('class="responsive-video-container"')) {
        return match;
      }
      return `<div class="responsive-video-container"><video${p1}src="${src}" controls playsinline${p2}></video></div>`;
    }
  );

  // 3. Basic HTML sanitization (optional, but good practice for dangerouslySetInnerHTML)
  // This is a very basic example; for production, consider a dedicated library like 'dompurify'
  readableContent = readableContent.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, ''); // Remove script tags
  readableContent = readableContent.replace(/on([a-z]+)="[^"]*"/gi, ''); // Remove inline event handlers

  return readableContent;
}
