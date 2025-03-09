
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Calendar, ArrowRight, Eye, Clock } from 'lucide-react';

// Example news data
const mockNewsData = [
  {
    id: 1,
    title: "Rashmi Group Achieves Record Production",
    date: "2023-10-15",
    excerpt: "Rashmi Metaliks sets new industry benchmarks with record DI pipe production volume this quarter.",
    image: "https://images.unsplash.com/photo-1611486212557-88be5ff6f941?ixlib=rb-4.0.3&auto=format&fit=crop&q=80",
    category: "Achievement",
    slug: "record-production-2023"
  },
  {
    id: 2,
    title: "New Sustainability Initiative Launched",
    date: "2023-09-22",
    excerpt: "Rashmi Group introduces comprehensive sustainability program to reduce carbon footprint by 30% by 2025.",
    image: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?ixlib=rb-4.0.3&auto=format&fit=crop&q=80",
    category: "Sustainability",
    slug: "sustainability-initiative-2023"
  },
  {
    id: 3,
    title: "Expansion of Manufacturing Capacity",
    date: "2023-08-10",
    excerpt: "Rashmi Metaliks announces significant capacity expansion at Kharagpur facility to meet growing demand.",
    image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?ixlib=rb-4.0.3&auto=format&fit=crop&q=80",
    category: "Growth",
    slug: "capacity-expansion-2023"
  },
  {
    id: 4,
    title: "Excellence in Quality Award 2023",
    date: "2023-07-05",
    excerpt: "Rashmi Metaliks receives prestigious industry recognition for exceptional product quality standards.",
    image: "https://images.unsplash.com/photo-1603202662731-9a854e6a73a5?ixlib=rb-4.0.3&auto=format&fit=crop&q=80",
    category: "Award",
    slug: "quality-award-2023"
  },
  {
    id: 5,
    title: "New International Partnership Announced",
    date: "2023-06-18",
    excerpt: "Rashmi Group forms strategic alliance with European infrastructure development consortium.",
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&auto=format&fit=crop&q=80",
    category: "Partnership",
    slug: "international-partnership-2023"
  },
  {
    id: 6,
    title: "Community Development Initiative",
    date: "2023-05-30",
    excerpt: "Rashmi Group launches education and healthcare program for communities near manufacturing facilities.",
    image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-4.0.3&auto=format&fit=crop&q=80",
    category: "CSR",
    slug: "community-initiative-2023"
  }
];

const Media = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [filteredNews, setFilteredNews] = useState(mockNewsData);
  
  // Categories derived from news data
  const categories = ['All', ...Array.from(new Set(mockNewsData.map(item => item.category)))];
  
  // Filter news based on search term and active category
  useEffect(() => {
    let filtered = mockNewsData;
    
    if (searchTerm) {
      filtered = filtered.filter(item => 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        item.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (activeCategory !== 'All') {
      filtered = filtered.filter(item => item.category === activeCategory);
    }
    
    setFilteredNews(filtered);
  }, [searchTerm, activeCategory]);

  // Format date function
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Media & News | Rashmi Metaliks</title>
        <meta name="description" content="Stay updated with the latest news, events, and announcements from Rashmi Metaliks, a global leader in steel manufacturing." />
      </Helmet>
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-rashmi-dark to-background"></div>
        
        {/* Grid overlay pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="grid grid-cols-10 grid-rows-10 h-full w-full">
            {Array.from({ length: 100 }).map((_, index) => (
              <div key={index} className="border border-rashmi-red/5"></div>
            ))}
          </div>
        </div>
        
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-display font-bold mb-6"
            >
              Media & <span className="text-rashmi-red">Updates</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-muted-foreground text-lg mb-8"
            >
              Stay updated with the latest news, events, and announcements from Rashmi Metaliks
            </motion.p>
            
            {/* Search Box */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="max-w-md mx-auto relative"
            >
              <input
                type="text"
                placeholder="Search news..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-5 py-3 pl-12 rounded-full border border-border bg-card/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-rashmi-red/30"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Category Filters */}
      <section className="py-8 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === category
                    ? 'bg-rashmi-red text-white'
                    : 'bg-card hover:bg-muted border border-border'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          
          {/* News Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredNews.length > 0 ? (
              filteredNews.map(news => (
                <NewsCard key={news.id} news={news} formatDate={formatDate} />
              ))
            ) : (
              <div className="col-span-full text-center py-20">
                <h3 className="text-2xl font-bold mb-3">No results found</h3>
                <p className="text-muted-foreground mb-6">Try adjusting your search or filter criteria</p>
                <button 
                  onClick={() => {
                    setSearchTerm('');
                    setActiveCategory('All');
                  }}
                  className="px-6 py-2 bg-rashmi-red text-white rounded-md hover:bg-rashmi-red/90 transition-colors"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

// News Card Component
const NewsCard = ({ news, formatDate }) => {
  return (
    <motion.article 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-card border border-border/40 rounded-xl overflow-hidden group hover:border-rashmi-red/30 transition-colors"
    >
      <div className="relative overflow-hidden h-48">
        <img 
          src={news.image} 
          alt={news.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-rashmi-dark/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-end">
          <Link 
            to={`/media/${news.slug}`}
            className="m-4 p-2 bg-rashmi-red rounded-full hover:bg-rashmi-red/90 transition-colors"
          >
            <Eye className="w-5 h-5 text-white" />
          </Link>
        </div>
        <div className="absolute top-4 left-4 px-3 py-1 bg-background/80 backdrop-blur-sm rounded-full text-xs font-medium">
          {news.category}
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center text-sm text-muted-foreground mb-3">
          <Calendar className="w-4 h-4 mr-2" />
          {formatDate(news.date)}
        </div>
        <h3 className="text-xl font-bold mb-3 leading-tight group-hover:text-rashmi-red transition-colors">
          {news.title}
        </h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
          {news.excerpt}
        </p>
        <Link 
          to={`/media/${news.slug}`}
          className="inline-flex items-center text-sm font-medium text-rashmi-red hover:text-rashmi-red/80 transition-colors"
        >
          Read More <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </motion.article>
  );
};

export default Media;
