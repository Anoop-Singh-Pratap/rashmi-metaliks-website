import React, { useState, FormEvent } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Upload, Check, FileText, Building, User, Phone, Mail, Briefcase, CheckCircle, Globe, X } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RevealText from '@/components/ui/RevealText';

// Firm type options
const firmTypes = [
  { id: 'manufacturer', label: 'Manufacturer/OEM' },
  { id: 'distributor', label: 'Distributor/Dealer/Trader' },
  { id: 'service', label: 'Service/Consultant/Agency' }
];

// Sample categories for dropdown
const categories = [
  { id: 'raw-materials', label: 'Raw Materials' },
  { id: 'machinery', label: 'Machinery & Equipment' },
  { id: 'consumables', label: 'Consumables' },
  { id: 'spare-parts', label: 'Spare Parts' },
  { id: 'services', label: 'Services' },
  { id: 'it-hardware', label: 'IT Hardware & Software' },
  { id: 'logistics', label: 'Logistics & Transportation' },
  { id: 'maintenance', label: 'Maintenance & Repair' },
  { id: 'others', label: 'Others' }
];

const VendorRegistration = () => {
  // Form state
  const [name, setName] = useState('');
  const [designation, setDesignation] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [firmType, setFirmType] = useState('');
  const [address, setAddress] = useState('');
  const [website, setWebsite] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [majorClients, setMajorClients] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState('');
  const [fileError, setFileError] = useState<string | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Allowed file types and max size (10MB)
  const allowedFileTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/jpeg', 'image/png'];
  const maxFileSize = 10 * 1024 * 1024; // 10MB in bytes
  
  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError(null);
    setFilePreview(null);
    
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      
      // Validate file type
      if (!allowedFileTypes.includes(selectedFile.type)) {
        setFileError('Invalid file type. Please upload PDF, DOC, DOCX, JPG or PNG files.');
        return;
      }
      
      // Validate file size
      if (selectedFile.size > maxFileSize) {
        setFileError('File is too large. Maximum size is 10MB.');
        return;
      }
      
      setFile(selectedFile);
      setFileName(selectedFile.name);
      
      // Create preview for images
      if (selectedFile.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (event) => {
          setFilePreview(event.target?.result as string);
        };
        reader.readAsDataURL(selectedFile);
      }
    }
  };
  
  // Handle file drop
  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    setFileError(null);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      
      // Validate file type
      if (!allowedFileTypes.includes(droppedFile.type)) {
        setFileError('Invalid file type. Please upload PDF, DOC, DOCX, JPG or PNG files.');
        return;
      }
      
      // Validate file size
      if (droppedFile.size > maxFileSize) {
        setFileError('File is too large. Maximum size is 10MB.');
        return;
      }
      
      setFile(droppedFile);
      setFileName(droppedFile.name);
      
      // Create preview for images
      if (droppedFile.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (event) => {
          setFilePreview(event.target?.result as string);
        };
        reader.readAsDataURL(droppedFile);
      }
    }
  };
  
  // Prevent default behavior for drag events
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };
  
  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setUploadProgress(0);
    
    // In a real application, you would send this data to a server
    // Simulate API request with upload progress
    try {
      // Simulate uploading with progress
      const totalSteps = 10;
      for (let step = 1; step <= totalSteps; step++) {
        await new Promise(resolve => setTimeout(resolve, 150));
        setUploadProgress(Math.floor((step / totalSteps) * 100));
      }
      
      console.log({
        name,
        designation,
        companyName,
        firmType,
        address,
        website,
        contactNo,
        email,
        category,
        productDescription,
        majorClients,
        fileName
      });
      
      // On successful submission
      setIsSubmitted(true);
      resetForm();
    } catch (error) {
      console.error('Error submitting form:', error);
      setFileError('Failed to upload file. Please try again.');
    } finally {
      setIsSubmitting(false);
      setUploadProgress(0);
    }
  };
  
  // Reset form fields after submission
  const resetForm = () => {
    setName('');
    setDesignation('');
    setCompanyName('');
    setFirmType('');
    setAddress('');
    setWebsite('');
    setContactNo('');
    setEmail('');
    setCategory('');
    setProductDescription('');
    setMajorClients('');
    setFile(null);
    setFileName('');
    setFilePreview(null);
    setFileError(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Vendor Registration - Rashmi Metaliks</title>
        <meta name="description" content="Register as a vendor with Rashmi Metaliks and explore business opportunities. Fill out our vendor registration form to join our supply chain network." />
        <meta name="keywords" content="vendor registration, supplier registration, Rashmi Metaliks vendors, business opportunities" />
      </Helmet>
      
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-background to-background/80"></div>
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1604328698692-f76ea9498e76?ixlib=rb-4.0.3&auto=format&fit=crop&q=80')] bg-fixed bg-center bg-cover opacity-10"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col items-center text-center">
            {/* Breadcrumb */}
            <div className="flex items-center text-sm text-muted-foreground mb-6 self-start">
              <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
              <span className="mx-2">/</span>
              <span>Vendor Registration</span>
            </div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-display font-bold mb-6"
            >
              Vendor <span className="text-rashmi-red">Registration</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-muted-foreground text-lg max-w-2xl mb-10"
            >
              Join our network of trusted vendors and suppliers. Register your business to explore partnership opportunities with Rashmi Metaliks.
            </motion.p>
          </div>
        </div>
      </section>
      
      {/* Registration Form Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-card rounded-xl border border-border/40 shadow-md overflow-hidden">
            {isSubmitted ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-8 text-center"
              >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold mb-4">Registration Successful!</h2>
                <p className="text-muted-foreground mb-6">
                  Thank you for registering as a vendor. We will review your application and contact you shortly.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-5 py-2.5 bg-rashmi-red text-white rounded-md hover:bg-rashmi-red/90 transition-colors"
                >
                  Register Another Vendor
                </button>
              </motion.div>
            ) : (
              <div className="p-6 md:p-8">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-2">Vendor Registration Form</h2>
                  <p className="text-muted-foreground">
                    Please fill out the form below with your business details. All fields marked with an asterisk (*) are required.
                  </p>
                </div>
                
                <form className="space-y-6" onSubmit={handleSubmit}>
                  {/* Personal Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold flex items-center">
                      <User className="mr-2 h-5 w-5 text-rashmi-red" />
                      Personal Information
                    </h3>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-1">Name *</label>
                        <input 
                          type="text" 
                          id="name" 
                          placeholder="Your full name" 
                          className="w-full px-4 py-2.5 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-rashmi-red/50"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="designation" className="block text-sm font-medium mb-1">Designation *</label>
                        <input 
                          type="text" 
                          id="designation" 
                          placeholder="Your position in the company" 
                          className="w-full px-4 py-2.5 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-rashmi-red/50"
                          value={designation}
                          onChange={(e) => setDesignation(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Company Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold flex items-center">
                      <Building className="mr-2 h-5 w-5 text-rashmi-red" />
                      Company Information
                    </h3>
                    
                    <div>
                      <label htmlFor="companyName" className="block text-sm font-medium mb-1">Company/Firm Name *</label>
                      <input 
                        type="text" 
                        id="companyName" 
                        placeholder="Legal name of your company" 
                        className="w-full px-4 py-2.5 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-rashmi-red/50"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="firmType" className="block text-sm font-medium mb-1">Firm Type *</label>
                      <select 
                        id="firmType" 
                        className="w-full px-4 py-2.5 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-rashmi-red/50"
                        value={firmType}
                        onChange={(e) => setFirmType(e.target.value)}
                        required
                      >
                        <option value="" disabled>Select firm type</option>
                        {firmTypes.map(type => (
                          <option key={type.id} value={type.id}>{type.label}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="address" className="block text-sm font-medium mb-1">Address *</label>
                      <textarea 
                        id="address" 
                        rows={3} 
                        placeholder="Complete address" 
                        className="w-full px-4 py-2.5 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-rashmi-red/50"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="website" className="block text-sm font-medium mb-1">Website (Optional)</label>
                      <div className="flex">
                        <div className="bg-muted rounded-l-md border border-r-0 border-border px-3 flex items-center">
                          <Globe className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <input 
                          type="url" 
                          id="website" 
                          placeholder="https://example.com" 
                          className="w-full px-4 py-2.5 rounded-r-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-rashmi-red/50"
                          value={website}
                          onChange={(e) => setWebsite(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Contact Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold flex items-center">
                      <Phone className="mr-2 h-5 w-5 text-rashmi-red" />
                      Contact Information
                    </h3>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="contactNo" className="block text-sm font-medium mb-1">Contact No. *</label>
                        <input 
                          type="tel" 
                          id="contactNo" 
                          placeholder="Phone number" 
                          className="w-full px-4 py-2.5 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-rashmi-red/50"
                          value={contactNo}
                          onChange={(e) => setContactNo(e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-1">Email *</label>
                        <input 
                          type="email" 
                          id="email" 
                          placeholder="Email address" 
                          className="w-full px-4 py-2.5 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-rashmi-red/50"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Product Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold flex items-center">
                      <Briefcase className="mr-2 h-5 w-5 text-rashmi-red" />
                      Product/Service Information
                    </h3>
                    
                    <div>
                      <label htmlFor="category" className="block text-sm font-medium mb-1">Category *</label>
                      <select 
                        id="category" 
                        className="w-full px-4 py-2.5 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-rashmi-red/50"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                      >
                        <option value="" disabled>Select category</option>
                        {categories.map(cat => (
                          <option key={cat.id} value={cat.id}>{cat.label}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="productDescription" className="block text-sm font-medium mb-1">Product Description *</label>
                      <textarea 
                        id="productDescription" 
                        rows={4} 
                        placeholder="Detailed description of your products or services" 
                        className="w-full px-4 py-2.5 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-rashmi-red/50"
                        value={productDescription}
                        onChange={(e) => setProductDescription(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="majorClients" className="block text-sm font-medium mb-1">Major Clients (If Any)</label>
                      <textarea 
                        id="majorClients" 
                        rows={3} 
                        placeholder="List your major clients or references" 
                        className="w-full px-4 py-2.5 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-rashmi-red/50"
                        value={majorClients}
                        onChange={(e) => setMajorClients(e.target.value)}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="file" className="block text-sm font-medium mb-1">Upload Supporting Documents</label>
                      <div 
                        className={`mt-1 relative border-2 ${fileError ? 'border-red-400' : 'border-dashed border-border'} rounded-md bg-background/50 hover:bg-background transition-colors cursor-pointer overflow-hidden`}
                        onDrop={handleFileDrop}
                        onDragOver={handleDragOver}
                        onClick={() => document.getElementById('file-upload')?.click()}
                      >
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                          onChange={handleFileChange}
                          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                        />
                        
                        {/* Image Preview */}
                        {filePreview ? (
                          <div className="p-2 flex flex-col items-center">
                            <div className="relative w-full max-w-xs mx-auto">
                              <img 
                                src={filePreview} 
                                alt="Document preview" 
                                className="max-h-48 mx-auto rounded shadow-sm object-contain" 
                              />
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setFile(null);
                                  setFileName('');
                                  setFilePreview(null);
                                }}
                                className="absolute -top-2 -right-2 bg-rashmi-red text-white p-1 rounded-full hover:bg-rashmi-red/90"
                                aria-label="Remove file"
                              >
                                <X size={14} />
                              </button>
                            </div>
                            <span className="text-sm text-muted-foreground mt-2">{fileName}</span>
                          </div>
                        ) : fileName ? (
                          /* File selected but no preview */
                          <div className="p-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                            <div className="flex items-center flex-shrink-0">
                              <FileText className="h-8 w-8 text-rashmi-red" />
                              <span className="ml-2 text-sm font-medium">{fileName}</span>
                            </div>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setFile(null);
                                setFileName('');
                              }}
                              className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                              aria-label="Remove file"
                            >
                              Remove
                            </button>
                          </div>
                        ) : (
                          /* No file selected */
                          <div className="px-4 py-6 md:py-8 flex flex-col items-center justify-center text-center">
                            <Upload className="mx-auto h-10 w-10 sm:h-12 sm:w-12 text-muted-foreground" />
                            <div className="mt-3 text-sm">
                              <span className="font-medium text-rashmi-red">Click to upload</span>
                              <span className="text-muted-foreground"> or drag and drop</span>
                            </div>
                            <p className="mt-1 text-xs text-muted-foreground">
                              PDF, DOC, DOCX, JPG, PNG (Max 10MB)
                            </p>
                          </div>
                        )}
                        
                        {/* Upload Progress */}
                        {isSubmitting && uploadProgress > 0 && (
                          <div className="absolute bottom-0 left-0 w-full">
                            <div 
                              className="h-1 bg-rashmi-red transition-all duration-300 ease-in-out" 
                              style={{ width: `${uploadProgress}%` }}
                            ></div>
                          </div>
                        )}
                      </div>
                      
                      {/* Error message */}
                      {fileError && (
                        <p className="mt-2 text-sm text-red-500 flex items-center">
                          <span className="inline-block mr-1">⚠️</span> {fileError}
                        </p>
                      )}
                      
                      {/* Help text */}
                      <p className="mt-2 text-xs text-muted-foreground">
                        Upload documents like company profile, brochures, or certifications to support your registration.
                      </p>
                    </div>
                  </div>
                  
                  {/* Terms and Submit */}
                  <div className="pt-4">
                    <div className="flex items-start mb-6">
                      <div className="flex items-center h-5">
                        <input
                          id="terms"
                          type="checkbox"
                          className="w-4 h-4 bg-background border border-border rounded focus:ring-2 focus:ring-rashmi-red/50"
                          required
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="terms" className="text-muted-foreground">
                          I agree to the <Link to="/terms-and-conditions" className="text-rashmi-red hover:underline">Terms and Conditions</Link> and <Link to="/privacy-policy" className="text-rashmi-red hover:underline">Privacy Policy</Link>
                        </label>
                      </div>
                    </div>
                    
                    <motion.button
                      type="submit"
                      className="w-full flex items-center justify-center py-3 px-4 bg-rashmi-red text-white rounded-md hover:bg-rashmi-red/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </>
                      ) : (
                        <>
                          Submit Registration
                          <Check className="ml-2 h-5 w-5" />
                        </>
                      )}
                    </motion.button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </section>
      
      {/* Why Register Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="mb-3">
              <RevealText text="Benefits" className="text-rashmi-red font-medium" />
            </div>
            <RevealText
              text="Why Register as a Vendor?"
              as="h2"
              className="text-3xl md:text-4xl font-display font-bold mb-6"
            />
            <p className="text-muted-foreground">
              Joining our vendor network opens up numerous opportunities for your business to grow and collaborate with a leading steel manufacturer.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              {
                title: "Business Opportunities",
                description: "Access to regular business opportunities and long-term contracts with a leading steel manufacturer.",
                icon: Briefcase
              },
              {
                title: "Simplified Process",
                description: "Streamlined procurement process with digital collaboration and clear communication channels.",
                icon: CheckCircle
              },
              {
                title: "Timely Payments",
                description: "Benefit from our structured payment systems ensuring timely and accurate payments.",
                icon: Check
              }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card border border-border/40 rounded-xl p-6 hover:border-rashmi-red/30 hover:shadow-md transition-all duration-300"
              >
                <div className="bg-rashmi-red/10 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                  <benefit.icon className="h-7 w-7 text-rashmi-red" />
                </div>
                <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default VendorRegistration; 