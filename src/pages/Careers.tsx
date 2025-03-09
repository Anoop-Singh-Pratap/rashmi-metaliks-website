
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Briefcase, MapPin, Filter, Search, Building, Heart, Award, Clock, Users, ChevronDown, ChevronUp } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RevealText from '../components/ui/RevealText';

// Sample job listings - would come from an API in a real app
const jobListings = [
  {
    id: 1,
    title: "Process Engineer",
    department: "Manufacturing",
    location: "Kharagpur, WB",
    type: "Full-time",
    description: "Optimize production processes for our state-of-the-art manufacturing facility.",
    requirements: "B.Tech in Metallurgy or related field, 3+ years experience in steel manufacturing. Knowledge of DI pipe production is a plus.",
    responsibilities: [
      "Monitor and optimize manufacturing processes",
      "Implement quality control procedures",
      "Identify opportunities for process improvement",
      "Work with cross-functional teams to increase efficiency"
    ]
  },
  {
    id: 2,
    title: "Quality Control Manager",
    department: "Quality",
    location: "Jhargram, WB",
    type: "Full-time",
    description: "Ensure our products meet the highest quality standards through rigorous testing and inspection.",
    requirements: "B.Tech in Metallurgy/Materials Science with 5+ years in QA/QC role in steel industry. Knowledge of international standards required.",
    responsibilities: [
      "Oversee quality testing of raw materials and finished products",
      "Maintain documentation of quality testing results",
      "Train staff on quality control procedures",
      "Implement improvements to quality management systems"
    ]
  },
  {
    id: 3,
    title: "Sales Executive",
    department: "Sales",
    location: "Kolkata, WB",
    type: "Full-time",
    description: "Drive business development and expand our customer base across domestic and international markets.",
    requirements: "Bachelor's degree with 3+ years in B2B sales, preferably in industrial products. Excellent communication and negotiation skills.",
    responsibilities: [
      "Identify and approach potential clients",
      "Maintain relationships with existing customers",
      "Prepare and present product demonstrations",
      "Meet or exceed sales targets"
    ]
  },
  {
    id: 4,
    title: "IT Systems Analyst",
    department: "IT",
    location: "Kolkata, WB",
    type: "Full-time",
    description: "Support and improve our IT infrastructure and enterprise systems to ensure smooth business operations.",
    requirements: "Bachelor's in Computer Science or IT with 2+ years experience. Knowledge of ERP systems and industrial automation a plus.",
    responsibilities: [
      "Maintain and troubleshoot IT systems",
      "Implement new technologies to improve efficiency",
      "Provide technical support to employees",
      "Ensure data security and integrity"
    ]
  }
];

const Careers = () => {
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedJob, setExpandedJob] = useState<number | null>(null);
  
  // Extract unique departments and locations for filters
  const departments = ['All', ...Array.from(new Set(jobListings.map(job => job.department)))];
  const locations = ['All', ...Array.from(new Set(jobListings.map(job => job.location)))];
  
  // Filter jobs based on selections
  const filteredJobs = jobListings.filter(job => 
    (selectedDepartment === 'All' || job.department === selectedDepartment) &&
    (selectedLocation === 'All' || job.location === selectedLocation) &&
    (job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
     job.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  const toggleJob = (id: number) => {
    setExpandedJob(expandedJob === id ? null : id);
  };
  
  // Benefits data
  const benefits = [
    {
      title: "Career Growth",
      description: "Continuous learning and career advancement opportunities",
      icon: Award
    },
    {
      title: "Work-Life Balance",
      description: "Flexible schedules and supportive work environment",
      icon: Clock
    },
    {
      title: "Health Benefits",
      description: "Comprehensive health insurance and wellness programs",
      icon: Heart
    },
    {
      title: "Collaborative Culture",
      description: "A diverse, inclusive, and supportive team environment",
      icon: Users
    }
  ];
  
  // Application steps
  const applicationSteps = [
    {
      title: "Apply Online",
      description: "Submit your application through our careers portal"
    },
    {
      title: "Initial Screening",
      description: "Our HR team reviews your application and qualifications"
    },
    {
      title: "Interview Process",
      description: "Multiple rounds to assess your skills and fit"
    },
    {
      title: "Offer & Onboarding",
      description: "Welcome to the Rashmi team!"
    }
  ];
  
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Careers at Rashmi Group | Join Our Team</title>
        <meta name="description" content="Explore exciting career opportunities at Rashmi Group, a global leader in steel manufacturing. Join our team and be part of our growth story." />
        <meta name="keywords" content="Rashmi Group careers, steel industry jobs, manufacturing jobs, Rashmi Metaliks careers" />
        <link rel="canonical" href="https://www.rashmi.com/careers" />
      </Helmet>
      
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-rashmi-dark to-background/80">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&q=80')] bg-fixed bg-center bg-cover opacity-10"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <RevealText
              text="Join Our Team"
              as="h1"
              className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4"
              staggerDelay={0.08}
            />
            <RevealText
              text="Build Your Career with Rashmi Group"
              as="h2"
              className="text-2xl md:text-3xl font-display text-muted-foreground mb-6"
              staggerDelay={0.05}
              initialDelay={0.5}
            />
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto mb-8 animate-fade-in" style={{ animationDelay: '1s' }}>
              Join one of the fastest growing Business Conglomerates in the eastern region of India. 
              We offer exciting opportunities across various departments and locations.
            </p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <a 
                href="#openings" 
                className="inline-flex items-center px-6 py-3 bg-rashmi-red text-white font-medium rounded-lg transition-colors hover:bg-rashmi-red/90"
              >
                View Open Positions
                <ChevronDown size={18} className="ml-2" />
              </a>
            </motion.div>
          </motion.div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-5xl pointer-events-none z-[-1]"
        >
          <div className="bg-rashmi-red/20 rounded-full w-[600px] h-[600px] blur-[150px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
        </motion.div>
      </section>
      
      {/* Company Culture Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="text-rashmi-red font-medium mb-3">
                <RevealText text="Our Culture" />
              </div>
              <RevealText
                text="Why Work With Us"
                as="h2"
                className="text-3xl md:text-4xl font-display font-bold mb-6 text-foreground"
              />
              <p className="text-muted-foreground mb-6">
                At Rashmi Group, we believe our people are our greatest asset. We foster a culture of innovation, 
                continuous learning, and teamwork. We are committed to creating a diverse and inclusive workplace 
                where everyone can thrive and contribute to our shared success.
              </p>
              <p className="text-muted-foreground mb-6">
                As one of the fastest growing business conglomerates in the eastern region of India, 
                we offer exciting opportunities for growth and development across various functions and locations.
              </p>
              
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="flex items-center px-4 py-3 bg-card border border-border rounded-lg mb-4"
              >
                <Building className="text-rashmi-red mr-3 flex-shrink-0" size={24} />
                <div>
                  <h3 className="font-medium">Industry Leader</h3>
                  <p className="text-sm text-muted-foreground">Work with cutting-edge technology and industry experts</p>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="flex items-center px-4 py-3 bg-card border border-border rounded-lg"
              >
                <Users className="text-rashmi-red mr-3 flex-shrink-0" size={24} />
                <div>
                  <h3 className="font-medium">Diverse Teams</h3>
                  <p className="text-sm text-muted-foreground">Collaborate with talented professionals from various backgrounds</p>
                </div>
              </motion.div>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-xl overflow-hidden h-[400px] relative group"
            >
              <img 
                src="https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?ixlib=rb-4.0.3&auto=format&fit=crop&q=80" 
                alt="Rashmi Group Team" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-rashmi-dark/80 to-transparent flex items-end">
                <div className="p-6">
                  <h3 className="text-white text-xl font-bold">Our Global Team</h3>
                  <p className="text-white/80">Talented professionals working together to achieve excellence</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="text-rashmi-red font-medium mb-3">
              <RevealText text="Employee Benefits" />
            </div>
            <RevealText
              text="What We Offer"
              as="h2"
              className="text-3xl md:text-4xl font-display font-bold mb-6 text-foreground"
            />
            <p className="text-muted-foreground">
              We provide a comprehensive benefits package to support your professional growth and personal wellbeing.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-300"
              >
                <div className="bg-rashmi-red/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  {React.createElement(benefit.icon, { className: "text-rashmi-red", size: 32 })}
                </div>
                <h3 className="text-lg font-bold mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Job Listings Section */}
      <section id="openings" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="text-rashmi-red font-medium mb-3">
              <RevealText text="Open Positions" />
            </div>
            <RevealText
              text="Current Opportunities"
              as="h2"
              className="text-3xl md:text-4xl font-display font-bold mb-6 text-foreground"
            />
            <p className="text-muted-foreground">
              Join our team of talented professionals and be part of our journey toward excellence in the steel industry.
            </p>
          </div>
          
          {/* Filters */}
          <div className="bg-card p-6 rounded-xl border border-border/40 shadow-sm mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Department Filter */}
              <div>
                <label className="block text-sm font-medium mb-2">Department</label>
                <select 
                  className="w-full p-2 rounded-md border border-border bg-background"
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                >
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>
              
              {/* Location Filter */}
              <div>
                <label className="block text-sm font-medium mb-2">Location</label>
                <select 
                  className="w-full p-2 rounded-md border border-border bg-background"
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                >
                  {locations.map(loc => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>
              
              {/* Search */}
              <div>
                <label className="block text-sm font-medium mb-2">Search</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search positions..."
                    className="w-full p-2 pl-10 rounded-md border border-border bg-background"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Search className="absolute left-3 top-2.5 text-muted-foreground w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Job Listings */}
          <div className="space-y-4">
            {filteredJobs.map(job => (
              <motion.div 
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-card rounded-xl border border-border/40 overflow-hidden shadow-sm"
              >
                {/* Job Header - always visible */}
                <div className="p-6">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-bold">{job.title}</h3>
                      <div className="flex flex-wrap items-center mt-2 gap-3">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Briefcase className="w-4 h-4 mr-1" />
                          <span>{job.department}</span>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <MapPin className="w-4 h-4 mr-1" />
                          <span>{job.location}</span>
                        </div>
                        <div className="px-2 py-0.5 bg-rashmi-red/10 text-rashmi-red text-xs rounded-full">
                          {job.type}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleJob(job.id)}
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center ${
                        expandedJob === job.id 
                          ? 'bg-muted hover:bg-muted/80 text-foreground' 
                          : 'bg-rashmi-red hover:bg-rashmi-red/90 text-white'
                      }`}
                    >
                      {expandedJob === job.id ? 'View Less' : 'View Details'}
                      {expandedJob === job.id ? <ChevronUp className="ml-1 w-4 h-4" /> : <ChevronDown className="ml-1 w-4 h-4" />}
                    </button>
                  </div>
                </div>
                
                {/* Expanded Content */}
                {expandedJob === job.id && (
                  <div className="px-6 pb-6 pt-2 border-t border-border/40">
                    <div className="prose prose-sm max-w-none">
                      <div className="mb-4">
                        <h4 className="text-base font-semibold mb-2">Description</h4>
                        <p className="text-muted-foreground">{job.description}</p>
                      </div>
                      
                      <div className="mb-4">
                        <h4 className="text-base font-semibold mb-2">Requirements</h4>
                        <p className="text-muted-foreground">{job.requirements}</p>
                      </div>
                      
                      <div className="mb-6">
                        <h4 className="text-base font-semibold mb-2">Responsibilities</h4>
                        <ul className="list-disc pl-5 text-muted-foreground">
                          {job.responsibilities.map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="text-right">
                        <a
                          href={`/careers/apply/${job.id}`}
                          className="inline-block px-6 py-3 bg-rashmi-red hover:bg-rashmi-red/90 text-white rounded-md transition-colors"
                        >
                          Apply Now
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
            
            {filteredJobs.length === 0 && (
              <div className="text-center py-12 bg-card rounded-xl border border-border/40">
                <Briefcase className="mx-auto text-muted-foreground w-12 h-12 mb-4" />
                <h3 className="text-lg font-medium mb-2">No positions found</h3>
                <p className="text-sm text-muted-foreground">
                  Try adjusting your filters or check back later for new opportunities.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
      
      {/* Application Process Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="text-rashmi-red font-medium mb-3">
              <RevealText text="How to Join" />
            </div>
            <RevealText
              text="Application Process"
              as="h2"
              className="text-3xl md:text-4xl font-display font-bold mb-6 text-foreground"
            />
            <p className="text-muted-foreground">
              Our recruitment process is designed to find the best talent while providing you with a smooth candidate experience.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border transform md:-translate-x-1/2"></div>
              
              {/* Steps */}
              {applicationSteps.map((step, index) => (
                <div key={index} className="relative z-10 mb-12">
                  <div className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center`}>
                    <div className="md:w-1/2 flex justify-center md:justify-end md:pr-8">
                      <div className={`bg-card border border-border p-6 rounded-xl ${index % 2 === 0 ? 'md:text-right' : ''}`}>
                        <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                        <p className="text-muted-foreground">{step.description}</p>
                      </div>
                    </div>
                    
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-rashmi-red flex items-center justify-center z-20 my-4 md:my-0">
                      <span className="text-white font-bold text-sm">{index + 1}</span>
                    </div>
                    
                    <div className="md:w-1/2 md:pl-8">
                      {/* Empty space for layout purposes */}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-5xl mx-auto text-center bg-card border border-border p-10 md:p-16 rounded-2xl relative"
          >
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-2xl z-0">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-2xl">
                <div className="bg-rashmi-red/5 rounded-full w-[600px] h-[600px] blur-[150px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
              </div>
            </div>
            
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                Ready to <span className="text-rashmi-red">Join Our Team?</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-10 max-w-2xl mx-auto">
                Don't see a position that fits your skills? Submit your resume for future opportunities.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  href="#openings"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  className="inline-flex items-center px-6 py-3 bg-rashmi-red text-white font-medium rounded-lg transition-colors hover:bg-rashmi-red/90"
                >
                  Browse Open Positions
                  <ChevronDown className="ml-2" size={18} />
                </motion.a>
                <motion.a
                  href="/contact-us"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  className="inline-flex items-center px-6 py-3 bg-card border border-border text-foreground font-medium rounded-lg transition-colors hover:bg-muted"
                >
                  Contact HR Team
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Careers;
