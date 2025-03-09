
/**
 * CMS Service - Integration with headless CMS for content management
 * 
 * This service provides methods to fetch content from a headless CMS like Strapi,
 * which allows non-technical users to manage website content without coding.
 */

// Base URL for the CMS API - replace with your actual CMS endpoint when deployed
const API_URL = process.env.REACT_APP_CMS_API_URL || 'http://localhost:1337';

/**
 * Fetch news articles from the CMS
 * @returns Array of news articles
 */
export async function getNews() {
  try {
    const response = await fetch(`${API_URL}/api/news-articles?populate=*`);
    if (!response.ok) {
      throw new Error('Failed to fetch news');
    }
    
    const data = await response.json();
    
    // Transform the response into the format expected by the application
    return data.data.map((item: any) => ({
      id: item.id,
      title: item.attributes.title,
      date: item.attributes.date,
      category: item.attributes.category,
      excerpt: item.attributes.excerpt,
      content: item.attributes.content,
      image: item.attributes.image?.data?.attributes?.url 
        ? `${API_URL}${item.attributes.image.data.attributes.url}` 
        : 'https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    }));
  } catch (error) {
    console.error('Error fetching news:', error);
    // Return empty array or throw error based on your error handling strategy
    throw error;
  }
}

/**
 * Fetch brochures from the CMS
 * @returns Array of brochures
 */
export async function getBrochures() {
  try {
    const response = await fetch(`${API_URL}/api/brochures?populate=*`);
    if (!response.ok) {
      throw new Error('Failed to fetch brochures');
    }
    
    const data = await response.json();
    
    return data.data.map((item: any) => ({
      id: item.id,
      title: item.attributes.title,
      category: item.attributes.category,
      format: item.attributes.format,
      size: item.attributes.fileSize,
      lastUpdated: item.attributes.updatedAt,
      thumbnail: item.attributes.thumbnail?.data?.attributes?.url 
        ? `${API_URL}${item.attributes.thumbnail.data.attributes.url}` 
        : 'https://images.unsplash.com/photo-1586523731382-c9747d1de42b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      downloadUrl: item.attributes.file?.data?.attributes?.url 
        ? `${API_URL}${item.attributes.file.data.attributes.url}` 
        : '#'
    }));
  } catch (error) {
    console.error('Error fetching brochures:', error);
    throw error;
  }
}

/**
 * Fetch certificates from the CMS
 * @returns Array of certificates
 */
export async function getCertificates() {
  try {
    const response = await fetch(`${API_URL}/api/certificates?populate=*`);
    if (!response.ok) {
      throw new Error('Failed to fetch certificates');
    }
    
    const data = await response.json();
    
    return data.data.map((item: any) => ({
      id: item.id,
      title: item.attributes.title,
      issuer: item.attributes.issuer,
      issueDate: item.attributes.issueDate,
      expiryDate: item.attributes.expiryDate,
      description: item.attributes.description,
      image: item.attributes.image?.data?.attributes?.url 
        ? `${API_URL}${item.attributes.image.data.attributes.url}` 
        : null,
      file: item.attributes.file?.data?.attributes?.url 
        ? `${API_URL}${item.attributes.file.data.attributes.url}` 
        : null
    }));
  } catch (error) {
    console.error('Error fetching certificates:', error);
    throw error;
  }
}
