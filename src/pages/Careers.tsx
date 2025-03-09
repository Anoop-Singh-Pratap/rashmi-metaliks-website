
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RevealText from '@/components/ui/RevealText';
import { motion } from 'framer-motion';
import { Briefcase, MapPin, Filter, Search, ArrowRight, Award, Heart, BookOpen, Clock, Users, Coffee } from 'lucide-react';
import { Link } from 'react-router-dom';

const Careers = () => {
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock job listings
  const jobListings = [
    {
      id: 1,
      title: 'Process Engineer',
      department: 'Manufacturing',
      location: 'Kharagpur, WB',
      description: 'Looking for an experienced process engineer to optimize production processes for our DI pipe manufacturing line. The ideal candidate will have strong problem-solving skills and experience with lean manufacturing principles.',
      requirements: 'B.Tech in Metallurgy or related field, 3+ years experience in steel manufacturing, knowledge of quality control systems, and excellent analytical skills.',
      postedDate: '2023-10-15'
    },
    {
      id: 2,
      title: 'Quality Control Specialist',
      department: 'Quality Assurance',
      location: 'Kharagpur, WB',
      description: 'Join our quality assurance team to ensure that all products meet our rigorous standards. Responsibilities include conducting tests, maintaining documentation, and implementing quality improvement initiatives.',
      requirements: 'Degree in Engineering or related field, 2+ years of QA experience preferably in metal manufacturing, familiarity with ISO 9001 standards, and attention to detail.',
      postedDate: '2023-10-10'
    },
    {
      id: 3,
      title: 'Marketing Manager',
      department: 'Marketing',
      location: 'Kolkata, WB',
      description: 'Lead our marketing efforts to promote Rashmi Metaliks products across domestic and international markets. Develop comprehensive marketing strategies to increase brand awareness and market share.',
      requirements: 'MBA in Marketing, 5+ years of experience in B2B marketing preferably in industrial/manufacturing sector, excellent communication skills, and experience in digital marketing.',
      postedDate: '2023-10-05'
    },
    {
      id: 4,
      title: 'Maintenance Technician',
      department: 'Operations',
      location: 'Jhargram, WB',
      description: 'Ensure the optimal functioning of our manufacturing equipment through regular maintenance and prompt repairs. Help implement preventive maintenance programs to minimize downtime.',
      requirements: 'Diploma/ITI in Mechanical or Electrical, 2+ years of experience in industrial maintenance, knowledge of hydraulic and pneumatic systems, and problem-solving ability.',
      postedDate: '2023-09-28'
    },
    {
      id: 5,
      title: 'HR Executive',
      department: 'Human Resources',
      location: 'Kolkata, WB',
      description: 'Support our HR department in recruitment, employee relations, and policy implementation. Help create a positive work environment and ensure compliance with labor laws.',
      requirements: 'MBA/PG in HR, 2+ years of HR experience preferably in manufacturing industry, knowledge of labor laws, and strong interpersonal skills.',
      postedDate: '2023-09-25'
    }
  ];
  
  // Generate unique departments and locations for filters
  const departments = ['All', ...Array.from(new Set(jobListings.map(job => job.department)))];
  const locations = ['All', ...Array.from(new Set(jobListings.map(job => job.location)))];
  
  // Filter jobs based on selections
  const filteredJobs = jobListings.filter(job => 
    (selectedDepartment === 'All' || job.department === selectedDepartment) &&
    (selectedLocation === 'All' || job.location === selectedLocation) &&
    (job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
     job.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  // Format date function
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  // Benefits data
  const benefits = [
    { icon: <Award size={24} />, title: "Professional Growth", description: "Continuous learning and development opportunities" },
    { icon: <Heart size={24} />, title: "Health Benefits", description: "Comprehensive medical coverage for you and your family" },
    { icon: <Coffee size={24} />, title: "Work-Life Balance", description: "Flexible scheduling and generous leave policies" },
    { icon: <Users size={24} />, title: "Collaborative Culture", description: "Team-oriented environment fostering innovation" },
    { icon: <BookOpen size={24} />, title: "Education Support", description: "Tuition assistance for continued education" },
    { icon: <Clock size={24} />, title: "Career Advancement", description: "Clear pathways for growth and promotion" }
  ];
  
  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Careers at Rashmi Metaliks | Join Our Team</title>
        <meta name="description" content="Explore exciting career opportunities at Rashmi Metaliks, a global leader in steel manufacturing with a focus on growth and innovation." />
      </Helmet>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-24 bg-gradient-to-b from-rashmi-dark to-background relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="grid grid-cols-10 grid-rows-10 h-full w-full">
              {Array.from({ length: 100 }).map((_, index) => (
                <div key={index} className="border border-rashmi-red/5"></div>
              ))}
            </div>
          </div>
          
          <div className="container mx-auto px-4 relative">
            <div className="text-center max-w-3xl mx-auto">
              <RevealText
                text="Build Your Career With Us"
                as="h1"
                className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 text-foreground"
              />
              <p className="text-xl text-muted-foreground mb-8">
                Join a team that values innovation, growth, and excellence in everything we do
              </p>
              <Link
                to="#job-openings"
                className="inline-flex items-center px-6 py-3 bg-rashmi-red text-white rounded-md hover:bg-rashmi-red/90 transition-colors"
              >
                View Open Positions <ArrowRight size={18} className="ml-2" />
              </Link>
            </div>
          </div>
        </section>

        {/* Company Culture Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="text-rashmi-red font-medium mb-3">
                  <RevealText text="Our Culture" />
                </div>
                <RevealText
                  text="Where Innovation Meets Excellence"
                  as="h2"
                  className="text-3xl md:text-4xl font-display font-bold mb-6 text-foreground"
                />
                
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    At Rashmi Metaliks, we believe that our people are our greatest asset. We foster a culture 
                    of continuous improvement, teamwork, and respect where every employee has the opportunity to 
                    grow both personally and professionally.
                  </p>
                  <p>
                    As one of the world's leading manufacturers of ductile iron pipes and steel products, we offer 
                    unique challenges and growth opportunities. Our team members gain exposure to cutting-edge 
                    technologies and processes in a supportive and collaborative environment.
                  </p>
                  <p>
                    We are committed to maintaining a diverse and inclusive workplace where innovative ideas thrive 
                    and everyone has a voice in our shared success.
                  </p>
                </div>
              </div>
              
              {/* Image Side */}
              <div className="relative">
                <div className="relative rounded-2xl overflow-hidden group h-[400px]">
                  <div className="absolute inset-0 bg-gradient-to-br from-rashmi-red/20 to-rashmi-dark/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                  <img 
                    src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&q=80" 
                    alt="Team collaboration at Rashmi Metaliks" 
                    className="w-full h-full object-cover rounded-2xl transform transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                
                {/* Testimonial overlay */}
                <div className="absolute bottom-8 right-8 max-w-sm bg-card/90 backdrop-blur-sm p-6 rounded-xl border border-border shadow-lg">
                  <div className="mb-3">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg key={star} className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <p className="text-sm italic text-muted-foreground mb-4">
                    "Working at Rashmi has been rewarding both professionally and personally. The company truly invests in its people and provides real growth opportunities."
                  </p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-rashmi-red/20 rounded-full flex items-center justify-center text-rashmi-red font-bold">RP</div>
                    <div className="ml-3">
                      <p className="text-sm font-semibold">Rahul Patel</p>
                      <p className="text-xs text-muted-foreground">Process Engineer, 5 years</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Benefits Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="text-rashmi-red font-medium mb-3">
                <RevealText text="Why Join Us" />
              </div>
              <RevealText
                text="Employee Benefits & Perks"
                as="h2"
                className="text-3xl md:text-4xl font-display font-bold mb-6 text-foreground"
              />
              <p className="text-muted-foreground">
                We offer competitive compensation and comprehensive benefits to support your well-being and professional growth.
              </p>
            </div>
            
            {/* Benefits Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-card rounded-xl p-6 border border-border/40 hover:border-rashmi-red/30 transition-colors"
                >
                  <div className="w-12 h-12 rounded-full bg-rashmi-red/10 flex items-center justify-center text-rashmi-red mb-4">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Job Listings Section */}
        <section id="job-openings" className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-8">
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
                  <div className="relative">
                    <select 
                      className="w-full p-2 pl-10 rounded-md border border-border bg-background appearance-none"
                      value={selectedDepartment}
                      onChange={(e) => setSelectedDepartment(e.target.value)}
                    >
                      {departments.map(dept => (
                        <option key={dept} value={dept}>{dept}</option>
                      ))}
                    </select>
                    <Filter className="absolute left-3 top-2.5 text-muted-foreground w-4 h-4" />
                  </div>
                </div>
                
                {/* Location Filter */}
                <div>
                  <label className="block text-sm font-medium mb-2">Location</label>
                  <div className="relative">
                    <select 
                      className="w-full p-2 pl-10 rounded-md border border-border bg-background appearance-none"
                      value={selectedLocation}
                      onChange={(e) => setSelectedLocation(e.target.value)}
                    >
                      {locations.map(loc => (
                        <option key={loc} value={loc}>{loc}</option>
                      ))}
                    </select>
                    <MapPin className="absolute left-3 top-2.5 text-muted-foreground w-4 h-4" />
                  </div>
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
                <JobListing key={job.id} job={job} formatDate={formatDate} />
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
        
        {/* Application Process */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="text-rashmi-red font-medium mb-3">
                <RevealText text="How To Apply" />
              </div>
              <RevealText
                text="Our Hiring Process"
                as="h2"
                className="text-3xl md:text-4xl font-display font-bold mb-6 text-foreground"
              />
              <p className="text-muted-foreground">
                We've designed a transparent and efficient hiring process to help you find your perfect role at Rashmi Metaliks.
              </p>
            </div>
            
            {/* Process Timeline */}
            <div className="relative max-w-4xl mx-auto">
              {/* Timeline Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-border"></div>
              
              {/* Timeline Steps */}
              <div className="space-y-16">
                <TimelineStep 
                  title="Application Submission" 
                  description="Submit your application through our online portal with your updated resume and cover letter."
                  number={1}
                  position="left"
                />
                
                <TimelineStep 
                  title="Initial Screening" 
                  description="Our HR team reviews your application and conducts a preliminary phone interview."
                  number={2}
                  position="right"
                />
                
                <TimelineStep 
                  title="Technical Assessment" 
                  description="Depending on the role, you may be asked to complete a technical assessment or case study."
                  number={3}
                  position="left"
                />
                
                <TimelineStep 
                  title="In-Person Interviews" 
                  description="Meet with the hiring manager and team members to discuss your experience and fit."
                  number={4}
                  position="right"
                />
                
                <TimelineStep 
                  title="Final Decision & Offer" 
                  description="Successful candidates receive an offer detailing compensation and benefits."
                  number={5}
                  position="left"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="bg-gradient-to-r from-rashmi-dark/90 to-rashmi-dark rounded-2xl p-8 md:p-12 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full opacity-20">
                <div className="absolute top-0 right-0 w-96 h-96 bg-rashmi-red/30 rounded-full filter blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full filter blur-3xl"></div>
              </div>
              
              <div className="relative z-10 max-w-3xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6">
                  Ready to Grow Your Career With Us?
                </h2>
                <p className="text-white/80 mb-8">
                  Even if you don't see a perfect match in our current openings, we'd love to hear from you. Send us your resume and we'll keep you in mind for future opportunities.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <a 
                    href="mailto:careers@rashmigroup.com" 
                    className="px-8 py-3 bg-rashmi-red text-white rounded-md hover:bg-rashmi-red/90 transition-colors"
                  >
                    Email Your Resume
                  </a>
                  <Link 
                    to="/contact-us" 
                    className="px-8 py-3 bg-transparent border border-white/30 text-white rounded-md hover:bg-white/10 transition-colors"
                  >
                    Contact HR Team
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

// Job Listing Component
const JobListing = ({ job, formatDate }) => {
  const [expanded, setExpanded] = useState(false);
  
  return (
    <motion.div 
      className="bg-card rounded-xl border border-border/40 overflow-hidden shadow-sm"
      initial={false}
      animate={{ height: expanded ? 'auto' : 'initial' }}
      transition={{ duration: 0.3 }}
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
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="w-4 h-4 mr-1" />
                <span>Posted {formatDate(job.postedDate)}</span>
              </div>
            </div>
          </div>
          <button
            onClick={() => setExpanded(!expanded)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              expanded 
                ? 'bg-muted hover:bg-muted/80 text-foreground' 
                : 'bg-rashmi-red hover:bg-rashmi-red/90 text-white'
            }`}
          >
            {expanded ? 'View Less' : 'View Details'}
          </button>
        </div>
      </div>
      
      {/* Expanded Content */}
      {expanded && (
        <div className="px-6 pb-6 pt-2 border-t border-border/40">
          <div className="prose prose-sm max-w-none">
            <div className="mb-4">
              <h4 className="text-base font-semibold mb-2">Description</h4>
              <p className="text-muted-foreground">{job.description}</p>
            </div>
            <div className="mb-6">
              <h4 className="text-base font-semibold mb-2">Requirements</h4>
              <p className="text-muted-foreground">{job.requirements}</p>
            </div>
            <div className="text-right">
              <a
                href={`mailto:careers@rashmigroup.com?subject=Application for ${job.title} position&body=Dear HR Team, %0D%0A%0D%0AI am interested in applying for the ${job.title} position at Rashmi Metaliks. Please find my attached resume for your consideration.%0D%0A%0D%0AThank you,%0D%0A[Your Name]`}
                className="inline-block px-6 py-3 bg-rashmi-red hover:bg-rashmi-red/90 text-white rounded-md transition-colors"
              >
                Apply Now
              </a>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

// Timeline Step Component
interface TimelineStepProps {
  title: string;
  description: string;
  number: number;
  position: "left" | "right";
}

const TimelineStep: React.FC<TimelineStepProps> = ({ title, description, number, position }) => {
  return (
    <div className="relative">
      {/* Step Number */}
      <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-rashmi-red flex items-center justify-center z-10">
        <div className="text-white font-bold">{number}</div>
      </div>
      
      {/* Content box */}
      <motion.div 
        className={`w-5/12 ${position === "left" ? "mr-auto pr-8" : "ml-auto pl-8"}`}
        initial={{ opacity: 0, x: position === "left" ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-card p-6 rounded-xl border border-border/40 shadow-sm">
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p className="text-muted-foreground text-sm">{description}</p>
        </div>
      </motion.div>
    </div>
  );
};

export default Careers;
