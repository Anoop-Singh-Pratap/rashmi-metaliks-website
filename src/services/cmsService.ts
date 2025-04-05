/**
 * CMS Service - Integration with headless CMS for content management
 * 
 * This service provides methods to fetch content from a headless CMS like Strapi,
 * which allows non-technical users to manage website content without coding.
 */

// Add type declaration for the window.ENV property
declare global {
  interface Window {
    ENV?: {
      REACT_APP_CMS_API_URL?: string;
    };
  }
}

// Base URL for the CMS API - replace with your actual CMS endpoint when deployed
const API_URL = window.ENV?.REACT_APP_CMS_API_URL || 'http://localhost:1337';

/**
 * Fetch news articles from the CMS
 * @returns Array of news articles
 */
export async function getNews() {
  try {
    // Try to detect if we're offline first to avoid unnecessary fetch attempts
    if (!navigator.onLine) {
      throw new Error('Browser is offline');
    }

    const response = await fetch(`${API_URL}/api/news-and-updates-panel?populate=*`);
    if (!response.ok) {
      throw new Error('Failed to fetch news');
    }
    
    const data = await response.json();
    console.log('Raw Strapi response:', data);
    
    // Check if the data has the expected structure
    if (!data || !data.data || !Array.isArray(data.data)) {
      console.error('Unexpected data structure:', data);
      return [];
    }
    
    // Transform the response into the format expected by the application
    const processedData = data.data.map((item: any) => {
      // Validate item before accessing properties
      if (!item) {
        console.error('Invalid item structure:', item);
        return null;
      }
      
      // Handle both attribute-based structure and direct property structure
      const hasAttributes = item.attributes && typeof item.attributes === 'object';
      
      // Debug the image structure
      console.log('News item:', item.id, 'Image data:', hasAttributes ? item.attributes.image : item.image || item.Image);
      
      // Correctly extract image URL based on Strapi's response structure
      let imageUrl = 'https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'; // Default fallback
      
      if (hasAttributes) {
        // For Strapi API v4
        if (item.attributes.image) {
          const imageData = item.attributes.image;
          
          if (typeof imageData === 'string') {
            // Direct URL string
            imageUrl = imageData.startsWith('http') ? imageData : `${API_URL}${imageData}`;
          } else if (imageData.data) {
            // Nested data structure
            if (Array.isArray(imageData.data)) {
              // Multiple images
              if (imageData.data.length > 0) {
                const imgData = imageData.data[0];
                if (imgData.attributes && imgData.attributes.url) {
                  imageUrl = `${API_URL}${imgData.attributes.url}`;
                } else if (imgData.url) {
                  imageUrl = `${API_URL}${imgData.url}`;
                }
              }
            } else if (imageData.data && imageData.data.attributes) {
              // Single image object
              const imgAttributes = imageData.data.attributes;
              if (imgAttributes.url) {
                imageUrl = `${API_URL}${imgAttributes.url}`;
              } else if (imgAttributes.formats && imgAttributes.formats.medium && imgAttributes.formats.medium.url) {
                // Try medium format
                imageUrl = `${API_URL}${imgAttributes.formats.medium.url}`;
              } else if (imgAttributes.formats && imgAttributes.formats.small && imgAttributes.formats.small.url) {
                // Try small format
                imageUrl = `${API_URL}${imgAttributes.formats.small.url}`;
              } else if (imgAttributes.formats && imgAttributes.formats.thumbnail && imgAttributes.formats.thumbnail.url) {
                // Try thumbnail
                imageUrl = `${API_URL}${imgAttributes.formats.thumbnail.url}`;
              }
            }
          } else if (imageData.url) {
            // Direct URL in image object
            imageUrl = `${API_URL}${imageData.url}`;
          } else if (imageData.formats && imageData.formats.medium && imageData.formats.medium.url) {
            // Try to use different formats if available
            imageUrl = `${API_URL}${imageData.formats.medium.url}`;
          }
        }
      } else {
        // Direct property structure (often from Strapi API v3)
        if (item.image) {
          if (typeof item.image === 'string') {
            imageUrl = item.image.startsWith('http') ? item.image : `${API_URL}${item.image}`;
          } else if (item.image.url) {
            imageUrl = `${API_URL}${item.image.url}`;
          }
        } else if (item.Image) {
          if (typeof item.Image === 'string') {
            imageUrl = item.Image.startsWith('http') ? item.Image : `${API_URL}${item.Image}`;
          } else if (item.Image.url) {
            imageUrl = `${API_URL}${item.Image.url}`;
          }
        }
      }
      
      console.log('Final image URL for item', item.id, ':', imageUrl);
      
      // Use direct properties or attributes based on what's available
      return {
        id: item.id,
        title: hasAttributes ? (item.attributes.title || item.attributes.Heading || 'Untitled') : (item.Heading || item.title || 'Untitled'),
        date: hasAttributes ? (item.attributes.date || item.attributes.Date || new Date().toISOString()) : (item.Date || item.date || new Date().toISOString()),
        category: hasAttributes ? (item.attributes.category || item.attributes.Category || 'General') : (item.Category || item.category || 'General'),
        excerpt: hasAttributes ? (item.attributes.excerpt || item.attributes.Description || '') : (item.Description || item.excerpt || item.Content || ''),
        content: hasAttributes ? (item.attributes.content || item.attributes.Content || '') : (item.Content || item.content || item.Description || ''),
        image: imageUrl
      };
    }).filter(Boolean); // Remove any null items
    
    // Store the successfully fetched data in localStorage for offline use
    try {
      localStorage.setItem('rashmi_cached_news', JSON.stringify(processedData));
      localStorage.setItem('rashmi_cached_news_timestamp', Date.now().toString());
    } catch (e) {
      console.warn('Failed to cache news data in localStorage:', e);
    }
    
    return processedData;
  } catch (error) {
    console.error('Error fetching news:', error);
    
    // Try to retrieve cached data from localStorage
    try {
      const cachedData = localStorage.getItem('rashmi_cached_news');
      const cachedTimestamp = localStorage.getItem('rashmi_cached_news_timestamp');
      
      if (cachedData) {
        const parsedData = JSON.parse(cachedData);
        // Set a flag in localStorage indicating we're using cached data due to offline/error
        localStorage.setItem('rashmi_using_cached_news', 'true');
        console.log('Using cached news data from localStorage. Cached at:', new Date(Number(cachedTimestamp || '0')).toLocaleString());
        return parsedData;
      }
    } catch (e) {
      console.error('Error retrieving cached news data:', e);
    }
    
    // If no cached data or error occurred, return fallback data
    return [
      {
        id: 1,
        title: "Rashmi Group Achieves Record Production Targets",
        date: "2023-05-15",
        category: "Achievement",
        excerpt: "Rashmi Group has achieved record-breaking production targets in the first quarter of 2023, surpassing industry standards.",
        image: "https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc sit amet ultricies lacinia, nunc nisl aliquam nisl, eget aliquam nunc nisl sit amet nisl."
      },
      {
        id: 2,
        title: "Rashmi Metaliks Launches New Sustainability Initiative",
        date: "2023-04-10",
        category: "Sustainability",
        excerpt: "Our new sustainability program aims to reduce carbon emissions by 30% over the next five years.",
        image: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        content: "Rashmi Metaliks is proud to announce our ambitious new sustainability initiative..."
      }
    ];
  }
}

/**
 * Fetch brochures from the CMS
 * @returns Array of brochures
 */
export async function getBrochures() {
  try {
    // Try to detect if we're offline first to avoid unnecessary fetch attempts
    if (!navigator.onLine) {
      throw new Error('Browser is offline');
    }
    
    const response = await fetch(`${API_URL}/api/brochures?populate=*`);
    if (!response.ok) {
      throw new Error('Failed to fetch brochures');
    }
    
    const data = await response.json();
    console.log('Raw brochures response:', data);
    
    const processedData = data.data.map((item: any) => {
      // Debug the thumbnail structure
      console.log('Brochure thumbnail data:', item.attributes?.thumbnail);
      
      // Extract thumbnail URL properly from Strapi's response
      let thumbnailUrl = 'https://images.unsplash.com/photo-1586523731382-c9747d1de42b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
      let fileUrl = '#';
      
      // Handle thumbnail
      if (item.attributes?.thumbnail) {
        if (item.attributes.thumbnail.data) {
          if (Array.isArray(item.attributes.thumbnail.data)) {
            if (item.attributes.thumbnail.data.length > 0) {
              thumbnailUrl = `${API_URL}${item.attributes.thumbnail.data[0].attributes.url}`;
            }
          } else if (item.attributes.thumbnail.data?.attributes?.url) {
            thumbnailUrl = `${API_URL}${item.attributes.thumbnail.data.attributes.url}`;
          }
        } else if (item.attributes.thumbnail.url) {
          thumbnailUrl = `${API_URL}${item.attributes.thumbnail.url}`;
        }
      }
      
      // Handle file
      if (item.attributes?.file) {
        if (item.attributes.file.data) {
          if (Array.isArray(item.attributes.file.data)) {
            if (item.attributes.file.data.length > 0) {
              fileUrl = `${API_URL}${item.attributes.file.data[0].attributes.url}`;
            }
          } else if (item.attributes.file.data?.attributes?.url) {
            fileUrl = `${API_URL}${item.attributes.file.data.attributes.url}`;
          }
        } else if (item.attributes.file.url) {
          fileUrl = `${API_URL}${item.attributes.file.url}`;
        }
      }
      
      return {
        id: item.id,
        title: item.attributes.title || 'Untitled',
        category: item.attributes.category || 'General',
        format: item.attributes.format || 'PDF',
        size: item.attributes.fileSize || 'Unknown',
        lastUpdated: item.attributes.updatedAt || new Date().toISOString(),
        thumbnail: thumbnailUrl,
        downloadUrl: fileUrl
      };
    });
    
    // Store the successfully fetched data in localStorage for offline use
    try {
      localStorage.setItem('rashmi_cached_brochures', JSON.stringify(processedData));
      localStorage.setItem('rashmi_cached_brochures_timestamp', Date.now().toString());
    } catch (e) {
      console.warn('Failed to cache brochures data in localStorage:', e);
    }
    
    return processedData;
  } catch (error) {
    console.error('Error fetching brochures:', error);
    
    // Try to retrieve cached data from localStorage
    try {
      const cachedData = localStorage.getItem('rashmi_cached_brochures');
      const cachedTimestamp = localStorage.getItem('rashmi_cached_brochures_timestamp');
      
      if (cachedData) {
        const parsedData = JSON.parse(cachedData);
        // Set a flag in localStorage indicating we're using cached data due to offline/error
        localStorage.setItem('rashmi_using_cached_brochures', 'true');
        console.log('Using cached brochures data from localStorage. Cached at:', new Date(Number(cachedTimestamp || '0')).toLocaleString());
        return parsedData;
      }
    } catch (e) {
      console.error('Error retrieving cached brochures data:', e);
    }
    
    // Return fallback data if no cached data is available
    return [
      {
        id: 1,
        title: "Company Profile",
        category: "Corporate",
        format: "PDF",
        size: "2.4 MB",
        lastUpdated: new Date().toISOString(),
        thumbnail: "https://images.unsplash.com/photo-1586523731385-d9646a7cff32?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        downloadUrl: "#"
      },
      {
        id: 2,
        title: "Product Catalog",
        category: "Product",
        format: "PDF",
        size: "4.2 MB",
        lastUpdated: new Date().toISOString(),
        thumbnail: "https://images.unsplash.com/photo-1586523731410-d9646a7cff38?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        downloadUrl: "#"
      }
    ];
  }
}

/**
 * Fetch certificates from the CMS
 * @returns Array of certificates
 */
export async function getCertificates() {
  try {
    // Try to detect if we're offline first to avoid unnecessary fetch attempts
    if (!navigator.onLine) {
      throw new Error('Browser is offline');
    }
    
    const response = await fetch(`${API_URL}/api/certificates?populate=*`);
    if (!response.ok) {
      throw new Error('Failed to fetch certificates');
    }
    
    const data = await response.json();
    console.log('Raw certificates response:', data);
    
    const processedData = data.data.map((item: any) => {
      // Extract image URL properly from Strapi's response
      let imageUrl = null;
      let fileUrl = null;
      
      // Handle image
      if (item.attributes?.image) {
        if (item.attributes.image.data) {
          if (Array.isArray(item.attributes.image.data)) {
            if (item.attributes.image.data.length > 0) {
              imageUrl = `${API_URL}${item.attributes.image.data[0].attributes.url}`;
            }
          } else if (item.attributes.image.data?.attributes?.url) {
            imageUrl = `${API_URL}${item.attributes.image.data.attributes.url}`;
          }
        } else if (item.attributes.image.url) {
          imageUrl = `${API_URL}${item.attributes.image.url}`;
        }
      }
      
      // Handle file
      if (item.attributes?.file) {
        if (item.attributes.file.data) {
          if (Array.isArray(item.attributes.file.data)) {
            if (item.attributes.file.data.length > 0) {
              fileUrl = `${API_URL}${item.attributes.file.data[0].attributes.url}`;
            }
          } else if (item.attributes.file.data?.attributes?.url) {
            fileUrl = `${API_URL}${item.attributes.file.data.attributes.url}`;
          }
        } else if (item.attributes.file.url) {
          fileUrl = `${API_URL}${item.attributes.file.url}`;
        }
      }
      
      return {
        id: item.id,
        title: item.attributes.title || 'Untitled',
        issuer: item.attributes.issuer || 'Unknown',
        issueDate: item.attributes.issueDate || '',
        expiryDate: item.attributes.expiryDate || '',
        description: item.attributes.description || '',
        image: imageUrl,
        file: fileUrl
      };
    });
    
    // Store the successfully fetched data in localStorage for offline use
    try {
      localStorage.setItem('rashmi_cached_certificates', JSON.stringify(processedData));
      localStorage.setItem('rashmi_cached_certificates_timestamp', Date.now().toString());
    } catch (e) {
      console.warn('Failed to cache certificates data in localStorage:', e);
    }
    
    return processedData;
  } catch (error) {
    console.error('Error fetching certificates:', error);
    
    // Try to retrieve cached data from localStorage
    try {
      const cachedData = localStorage.getItem('rashmi_cached_certificates');
      const cachedTimestamp = localStorage.getItem('rashmi_cached_certificates_timestamp');
      
      if (cachedData) {
        const parsedData = JSON.parse(cachedData);
        // Set a flag in localStorage indicating we're using cached data due to offline/error
        localStorage.setItem('rashmi_using_cached_certificates', 'true');
        console.log('Using cached certificates data from localStorage. Cached at:', new Date(Number(cachedTimestamp || '0')).toLocaleString());
        return parsedData;
      }
    } catch (e) {
      console.error('Error retrieving cached certificates data:', e);
    }
    
    // Return fallback data if no cached data is available
    return [
      {
        id: 1,
        title: "ISO 9001:2015",
        issuer: "International Organization for Standardization",
        issueDate: "2022-01-15",
        expiryDate: "2025-01-14",
        description: "Quality Management System Certification",
        image: "https://images.unsplash.com/photo-1568633762547-c6c00210ddf5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        file: null
      },
      {
        id: 2,
        title: "ISO 14001:2015",
        issuer: "International Organization for Standardization",
        issueDate: "2021-06-22",
        expiryDate: "2024-06-21",
        description: "Environmental Management System Certification",
        image: "https://images.unsplash.com/photo-1547489401-fcada4966052?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        file: null
      }
    ];
  }
}

/**
 * Update a news article in the CMS
 * @param id - The ID of the news article to update
 * @param data - The updated news data with Strapi field names
 * @returns Updated news article
 */
export async function updateNews(id: number, data: {
  Heading?: string;
  Date?: string;
  Category?: string;
  Description?: string;
  Content?: string;
  image?: File;
}) {
  try {
    // First, handle image upload if provided
    let imageId = null;
    if (data.image) {
      const formData = new FormData();
      formData.append('files', data.image);
      
      const uploadResponse = await fetch(`${API_URL}/api/upload`, {
        method: 'POST',
        body: formData,
      });
      
      if (!uploadResponse.ok) {
        throw new Error('Failed to upload image');
      }
      
      const uploadResult = await uploadResponse.json();
      console.log('Image upload response:', uploadResult);
      
      if (Array.isArray(uploadResult) && uploadResult.length > 0) {
        imageId = uploadResult[0].id;
      }
    }
    
    // Prepare the update data
    const updateData = {
      data: {
        ...data,
        ...(imageId && { image: imageId }),
      }
    };
    
    // Update the news article
    const response = await fetch(`${API_URL}/api/news-and-updates-panel/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    });
    
    if (!response.ok) {
      throw new Error('Failed to update news');
    }
    
    const result = await response.json();
    console.log('Update response:', result);
    
    // Extract the image URL from the response
    let imageUrl = null;
    
    // Try various image paths based on Strapi's response structure
    if (result.data && result.data.attributes) {
      const attrs = result.data.attributes;
      
      if (attrs.image) {
        const imageData = attrs.image;
        
        if (typeof imageData === 'string') {
          // Direct URL string
          imageUrl = imageData.startsWith('http') ? imageData : `${API_URL}${imageData}`;
        } else if (imageData.data) {
          // Nested data structure
          if (Array.isArray(imageData.data)) {
            // Multiple images
            if (imageData.data.length > 0) {
              const imgData = imageData.data[0];
              if (imgData.attributes && imgData.attributes.url) {
                imageUrl = `${API_URL}${imgData.attributes.url}`;
              } else if (imgData.url) {
                imageUrl = `${API_URL}${imgData.url}`;
              }
            }
          } else if (imageData.data && imageData.data.attributes) {
            // Single image object
            const imgAttributes = imageData.data.attributes;
            if (imgAttributes.url) {
              imageUrl = `${API_URL}${imgAttributes.url}`;
            } else if (imgAttributes.formats && imgAttributes.formats.medium) {
              // Try medium format
              imageUrl = `${API_URL}${imgAttributes.formats.medium.url}`;
            } else if (imgAttributes.formats && imgAttributes.formats.small) {
              // Try small format
              imageUrl = `${API_URL}${imgAttributes.formats.small.url}`;
            } else if (imgAttributes.formats && imgAttributes.formats.thumbnail) {
              // Try thumbnail
              imageUrl = `${API_URL}${imgAttributes.formats.thumbnail.url}`;
            }
          }
        } else if (imageData.url) {
          // Direct URL in image object
          imageUrl = `${API_URL}${imageData.url}`;
        }
      }
    }
    
    console.log('Final image URL from update:', imageUrl);
    
    // Create a fallback image URL if none is found in the response
    const fallbackImageUrl = data.image ? URL.createObjectURL(data.image) : null;
    
    // Transform the response to match your application's format
    return {
      id: result.data?.id || id,
      title: result.data?.attributes?.Heading || 'Untitled',
      date: result.data?.attributes?.Date || new Date().toISOString(),
      category: result.data?.attributes?.Category || 'General',
      excerpt: result.data?.attributes?.Description || '',
      content: result.data?.attributes?.Content || '',
      image: imageUrl || fallbackImageUrl
    };
  } catch (error) {
    console.error('Error updating news:', error);
    throw error;
  }
}

/**
 * Create a new news article in the CMS
 * @param data - The news data to create with Strapi field names
 * @returns Created news article
 */
export async function createNews(data: {
  Heading: string;
  Date: string;
  Category: string;
  Description: string;
  Content: string;
  image?: File;
}) {
  try {
    // First, handle image upload if provided
    let imageId = null;
    if (data.image) {
      const formData = new FormData();
      formData.append('files', data.image);
      
      const uploadResponse = await fetch(`${API_URL}/api/upload`, {
        method: 'POST',
        body: formData,
      });
      
      if (!uploadResponse.ok) {
        throw new Error('Failed to upload image');
      }
      
      const uploadResult = await uploadResponse.json();
      console.log('Image upload response:', uploadResult);
      
      if (Array.isArray(uploadResult) && uploadResult.length > 0) {
        imageId = uploadResult[0].id;
      }
    }
    
    // Prepare the create data
    const createData = {
      data: {
        ...data,
        ...(imageId && { image: imageId }),
      }
    };
    
    // Create the news article
    const response = await fetch(`${API_URL}/api/news-and-updates-panel`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(createData),
    });
    
    if (!response.ok) {
      throw new Error('Failed to create news');
    }
    
    const result = await response.json();
    console.log('Create response:', result);
    
    // Extract the image URL from the response
    let imageUrl = null;
    
    // Try various image paths based on Strapi's response structure
    if (result.data && result.data.attributes) {
      const attrs = result.data.attributes;
      
      if (attrs.image) {
        const imageData = attrs.image;
        
        if (typeof imageData === 'string') {
          // Direct URL string
          imageUrl = imageData.startsWith('http') ? imageData : `${API_URL}${imageData}`;
        } else if (imageData.data) {
          // Nested data structure
          if (Array.isArray(imageData.data)) {
            // Multiple images
            if (imageData.data.length > 0) {
              const imgData = imageData.data[0];
              if (imgData.attributes && imgData.attributes.url) {
                imageUrl = `${API_URL}${imgData.attributes.url}`;
              } else if (imgData.url) {
                imageUrl = `${API_URL}${imgData.url}`;
              }
            }
          } else if (imageData.data && imageData.data.attributes) {
            // Single image object
            const imgAttributes = imageData.data.attributes;
            if (imgAttributes.url) {
              imageUrl = `${API_URL}${imgAttributes.url}`;
            } else if (imgAttributes.formats && imgAttributes.formats.medium) {
              // Try medium format
              imageUrl = `${API_URL}${imgAttributes.formats.medium.url}`;
            } else if (imgAttributes.formats && imgAttributes.formats.small) {
              // Try small format
              imageUrl = `${API_URL}${imgAttributes.formats.small.url}`;
            } else if (imgAttributes.formats && imgAttributes.formats.thumbnail) {
              // Try thumbnail
              imageUrl = `${API_URL}${imgAttributes.formats.thumbnail.url}`;
            }
          }
        } else if (imageData.url) {
          // Direct URL in image object
          imageUrl = `${API_URL}${imageData.url}`;
        }
      }
    }
    
    console.log('Final image URL from create:', imageUrl);
    
    // Create a fallback image URL if none is found in the response
    const fallbackImageUrl = data.image ? URL.createObjectURL(data.image) : null;
    
    // Transform the response to match your application's format
    return {
      id: result.data?.id || Date.now(),
      title: result.data?.attributes?.Heading || 'Untitled',
      date: result.data?.attributes?.Date || new Date().toISOString(),
      category: result.data?.attributes?.Category || 'General',
      excerpt: result.data?.attributes?.Description || '',
      content: result.data?.attributes?.Content || '',
      image: imageUrl || fallbackImageUrl
    };
  } catch (error) {
    console.error('Error creating news:', error);
    throw error;
  }
}
