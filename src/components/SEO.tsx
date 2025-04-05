import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonicalUrl?: string;
  ogType?: string;
  ogImage?: string;
  schema?: any | any[]; // Updated to allow array of schemas
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    tags?: string[];
  };
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords,
  canonicalUrl,
  ogType = 'website',
  ogImage = '/lovable-uploads/Rashmi-logo-light.png',
  schema,
  article
}) => {
  const siteUrl = 'https://www.rashmimetaliks.com'; // Updated to correct domain
  const fullCanonicalUrl = canonicalUrl ? 
    (canonicalUrl.startsWith('http') ? canonicalUrl : `${siteUrl}${canonicalUrl.startsWith('/') ? canonicalUrl : `/${canonicalUrl}`}`) 
    : siteUrl;
  
  // Handle rendering multiple schemas
  const renderSchemas = () => {
    if (!schema) return null;
    
    if (Array.isArray(schema)) {
      return schema.map((schemaItem, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schemaItem)}
        </script>
      ));
    }
    
    return (
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    );
  };
  
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={fullCanonicalUrl} />
      
      {/* Open Graph / Social Media */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={fullCanonicalUrl} />
      <meta property="og:image" content={ogImage.startsWith('http') ? ogImage : `${siteUrl}${ogImage.startsWith('/') ? ogImage : `/${ogImage}`}`} />
      <meta property="og:site_name" content="Rashmi Metaliks" />
      
      {/* Article specific tags */}
      {article && article.publishedTime && (
        <meta property="article:published_time" content={article.publishedTime} />
      )}
      {article && article.modifiedTime && (
        <meta property="article:modified_time" content={article.modifiedTime} />
      )}
      {article && article.tags && article.tags.map((tag, index) => (
        <meta key={index} property="article:tag" content={tag} />
      ))}
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage.startsWith('http') ? ogImage : `${siteUrl}${ogImage.startsWith('/') ? ogImage : `/${ogImage}`}`} />
      
      {/* Schema.org JSON-LD */}
      {renderSchemas()}
    </Helmet>
  );
};

export default SEO; 