import React, { useState, useCallback, useEffect, ChangeEvent, DragEvent, FormEvent } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence, useAnimation, Variants } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Upload, Check, FileText, Building, User, Phone, Mail, Briefcase, CheckCircle, Globe, X, AlertCircle, Loader2, ChevronRight, ArrowRight, TrendingUp, Handshake, ShieldCheck, Award
} from 'lucide-react'; // Added more icons for variety
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import Header from '@/components/Header'; // Assuming Header component exists
import Footer from '@/components/Footer'; // Assuming Footer component exists
import RevealText from '@/components/ui/RevealText'; // Assuming RevealText component exists
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

// --- Constants and Types (Unchanged) ---

interface VendorFormData {
  name: string;
  designation: string;
  companyName: string;
  firmType: string;
  address: string;
  website?: string;
  contactNo: string;
  email: string;
  category: string;
  productDescription: string;
  majorClients?: string;
  terms: boolean;
}

const firmTypes = [
  { id: 'manufacturer', label: 'Manufacturer/OEM' },
  { id: 'distributor', label: 'Distributor/Dealer/Trader' },
  { id: 'service', label: 'Service/Consultant/Agency' },
];

const categories = [
  { id: 'raw-materials', label: 'Raw Materials' },
  { id: 'machinery', label: 'Machinery & Equipment' },
  { id: 'consumables', label: 'Consumables' },
  { id: 'spare-parts', label: 'Spare Parts' },
  { id: 'services', label: 'Services' },
  { id: 'it-hardware', label: 'IT Hardware & Software' },
  { id: 'logistics', label: 'Logistics & Transportation' },
  { id: 'maintenance', label: 'Maintenance & Repair' },
  { id: 'others', label: 'Others' },
];

const ALLOWED_FILE_TYPES = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/jpeg', 'image/png'];
const MAX_FILE_SIZE_MB = 10;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

// --- Enhanced Helper Components ---

interface FormFieldProps {
  id: keyof VendorFormData | string;
  label: string;
  required?: boolean;
  children: React.ReactNode;
  error?: string;
  className?: string; // Allow passing additional classes
}

// Enhanced FormField with optional className
const FormField: React.FC<FormFieldProps> = ({ id, label, required, children, error, className }) => (
  <div className={cn("space-y-2", className)}>
    <Label htmlFor={id as string} className="text-sm font-medium text-muted-foreground/90">
      {label} {required && <span className="text-rashmi-red">*</span>}
    </Label>
    {children}
    {error && <p className="text-xs text-destructive flex items-center gap-1 pt-1"><AlertCircle size={13} /> {error}</p>}
  </div>
);

interface SectionHeaderProps {
  icon: React.ElementType;
  title: string;
  description?: string; // Optional description
}

// Enhanced SectionHeader with optional description and refined styling
const SectionHeader: React.FC<SectionHeaderProps> = ({ icon: Icon, title, description }) => (
  <div className="mb-6">
    <div className="flex items-center mb-2">
       <span className="p-2 bg-rashmi-red/10 rounded-full mr-3">
         <Icon className="h-5 w-5 text-rashmi-red" />
       </span>
       <h3 className="text-xl font-semibold text-foreground tracking-tight">
        {title}
      </h3>
    </div>
    {description && <p className="text-sm text-muted-foreground ml-12 -mt-1">{description}</p>}
    <div className="mt-3 ml-12 h-[1px] bg-gradient-to-r from-rashmi-red/30 via-border to-transparent w-2/3"></div>
  </div>
);

// --- Animation Variants ---
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const shimmerVariants: Variants = {
    initial: { backgroundPosition: '200% 0' },
    animate: {
        backgroundPosition: '-200% 0',
        transition: {
            duration: 1.5, // Faster shimmer
            repeat: Infinity,
            ease: "linear"
        }
    }
}

// --- Main Component ---

const VendorRegistration = () => {
  // State and Hooks (Unchanged logic, potentially refined initial values if needed)
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState('');
  const [fileError, setFileError] = useState<string | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const { register, handleSubmit, control, formState: { errors, isSubmitting }, reset } = useForm<VendorFormData>({
    mode: 'onBlur', // Validate on blur for better UX
    defaultValues: {
      name: '',
      designation: '',
      companyName: '',
      firmType: '',
      address: '',
      website: '',
      contactNo: '',
      email: '',
      category: '',
      productDescription: '',
      majorClients: '',
      terms: false,
    }
  });

  const heroControls = useAnimation();
  const formControls = useAnimation(); // Controls for the overall form section entry

  // Trigger animations when component mounts
  useEffect(() => {
    heroControls.start("visible");
    formControls.start("visible"); // Start form section animation
  }, [heroControls, formControls]);

  // File Handling Functions (Unchanged logic, minor refinements possible)
  const clearFile = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setFile(null);
    setFileName('');
    setFilePreview(null);
    setFileError(null);
    const fileInput = document.getElementById('file-upload') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  };

  const handleFileValidation = (selectedFile: File): boolean => {
    setFileError(null);
    if (!ALLOWED_FILE_TYPES.includes(selectedFile.type)) {
      setFileError(`Invalid type. Allowed: PDF, DOC(X), JPG, PNG.`);
      return false;
    }
    if (selectedFile.size > MAX_FILE_SIZE_BYTES) {
      setFileError(`File too large (Max ${MAX_FILE_SIZE_MB}MB).`);
      return false;
    }
    return true;
  };

  const processFile = (selectedFile: File) => {
    if (handleFileValidation(selectedFile)) {
        setFile(selectedFile);
        setFileName(selectedFile.name);
        if (selectedFile.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onloadend = () => setFilePreview(reader.result as string);
          reader.readAsDataURL(selectedFile);
        } else {
          setFilePreview(null);
        }
    } else {
        clearFile(); // Clear if validation fails after selection/drop
        // Keep the error message set by handleFileValidation
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const handleFileDrop = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleDragOver = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  // Form Submission (Unchanged logic)
  const onSubmit: SubmitHandler<VendorFormData> = async (data) => {
    setUploadProgress(0);
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
        if(typeof value === 'boolean') {
             formData.append(key, String(value));
        } else if(value !== undefined && value !== null && value !== '') { // Avoid sending empty optional fields
            formData.append(key, value);
        }
    });
    if (file) {
      formData.append('supportingDocument', file);
    }

    console.log('Form Data Prepared for Submission:');
    for (let pair of formData.entries()) {
      console.log(pair[0]+ ': '+ pair[1]);
    }

    // Simulate API request
    try {
      const totalSteps = 10;
      for (let step = 1; step <= totalSteps; step++) {
        await new Promise(resolve => setTimeout(resolve, 150));
        setUploadProgress(Math.floor((step / totalSteps) * 100));
      }
      setIsSubmitted(true);
      reset();
      clearFile();
      window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top on success
    } catch (error) {
      console.error('Error submitting form:', error);
      setFileError('Submission failed. Please check your connection and try again.');
    } finally {
      setUploadProgress(0);
    }
  };

  // Parallax Effect (Unchanged logic)
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const parallaxElements = document.querySelectorAll('.parallax-bg');
      parallaxElements.forEach((element) => {
        const el = element as HTMLElement;
        const speed = parseFloat(el.dataset.speed || '0.3');
        el.style.transform = `translateY(${scrollPosition * speed}px)`;
      });
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- Render ---
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-gray-50 to-blue-50/30 dark:from-neutral-950 dark:via-neutral-900 dark:to-blue-950/30 overflow-hidden">
      <Helmet>
        <title>Vendor Registration - Partner with Rashmi Metaliks</title>
        <meta name="description" content="Become a trusted partner. Register your vendor details with Rashmi Metaliks to explore exciting business opportunities in the steel industry supply chain." />
        <meta name="keywords" content="vendor registration, supplier portal, Rashmi Metaliks partnership, steel supply chain, procurement" />
      </Helmet>

      <Header />

      {/* ==========================
          Enhanced Hero Section
      ========================== */}
      <motion.section
        className="pt-48 pb-32 relative isolate overflow-hidden"
        initial="hidden"
        animate={heroControls}
        variants={staggerContainer}
      >
        {/* Background Elements */}
        <div className="absolute inset-0 z-[-10] opacity-50">
           {/* Subtle Grid Pattern */}
           <svg className="absolute inset-0 h-full w-full stroke-gray-300/30 dark:stroke-neutral-700/30 [mask-image:radial-gradient(100%_100%_at_top_center,white,transparent)]" aria-hidden="true">
            <defs>
                <pattern id="hero-pattern" width="80" height="80" x="50%" y="-1" patternUnits="userSpaceOnUse">
                <path d="M.5 200V.5H200" fill="none"/>
                </pattern>
            </defs>
            <rect width="100%" height="100%" strokeWidth="0" fill="url(#hero-pattern)"/>
           </svg>
           {/* Gradient Shapes */}
           <div className="absolute -right-[15%] top-[5%] w-[50%] h-[50%] rounded-full bg-gradient-to-br from-rashmi-red/15 via-rashmi-red/5 to-transparent blur-3xl opacity-70 parallax-bg" data-speed="-0.2"></div>
           <div className="absolute -left-[10%] bottom-[10%] w-[40%] h-[40%] rounded-full bg-gradient-to-tr from-blue-500/15 via-blue-500/5 to-transparent blur-3xl opacity-60 parallax-bg" data-speed="0.15"></div>
           {/* Main Gradient Overlay */}
           <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/95 to-background z-[-5]"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
             {/* Enhanced Breadcrumb */}
            <motion.div
              variants={fadeInUp}
              className="flex items-center text-sm text-muted-foreground/80 mb-6 self-start w-full"
            >
              <Link to="/" className="hover:text-rashmi-red transition-colors duration-200 group flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-home text-muted-foreground/60 group-hover:text-rashmi-red transition-colors"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                Home
              </Link>
              <ChevronRight className="mx-1.5 h-4 w-4 text-muted-foreground/40" />
              <span className="font-medium text-foreground">Vendor Registration</span>
            </motion.div>

            {/* Main Title with Animated Reveal */}
            <div className="mb-6 overflow-hidden">
              <motion.h1
                className="text-5xl md:text-6xl lg:text-7xl font-display font-extrabold tracking-tighter text-foreground leading-tight"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }} // Smoother ease
              >
                Build the Future, <br className="hidden md:block" /> Partner with <span className="text-rashmi-red relative inline-block px-2">
                    Rashmi
                    {/* Underline Effect */}
                    <motion.span
                       initial={{ scaleX: 0 }}
                       animate={{ scaleX: 1 }}
                       transition={{ duration: 0.7, delay: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
                       className="absolute -bottom-2 left-0 w-full h-1.5 bg-rashmi-red/80 rounded-full origin-left"
                    ></motion.span>
                 </span> Metaliks.
              </motion.h1>
            </div>

            {/* Enhanced Description */}
            <motion.p
              variants={fadeInUp}
              className="text-lg md:text-xl text-muted-foreground max-w-3xl mb-10 leading-relaxed"
            >
              Join our network of innovators and suppliers. Register today to unlock collaboration opportunities and contribute to excellence in the steel industry.
            </motion.p>

            {/* Enhanced CTA Button */}
            <motion.div variants={fadeInUp}>
              <a
                href="#registration-form"
                className="group inline-flex items-center justify-center gap-2.5 py-3.5 px-8 bg-gradient-to-r from-rashmi-red to-red-700 text-white rounded-full font-semibold text-lg hover:shadow-xl hover:shadow-rashmi-red/30 focus:outline-none focus:ring-4 focus:ring-rashmi-red/40 transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden"
              >
                 {/* Shimmer Effect */}
                 <motion.span
                    className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/0 via-white/20 to-white/0"
                    style={{ backgroundSize: '200% 100%' }}
                    variants={shimmerVariants}
                    initial="initial"
                    animate="animate"
                 ></motion.span>
                 <span className="relative z-10">Start Registration</span>
                 <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1.5 relative z-10" />
              </a>
            </motion.div>
          </div>
        </div>
      </motion.section>

     {/* ==============================
          Enhanced Registration Form
     ============================== */}
      <motion.section
        id="registration-form"
        className="py-24 relative isolate"
        initial="hidden"
        animate={formControls} // Use overall controls
        variants={fadeInUp} // Simple fade-in for the whole section container
      >
        {/* Background Elements */}
        <div className="absolute inset-0 z-[-1] pointer-events-none">
          <div className="absolute -left-[20%] top-[15%] w-[40%] h-[50%] rounded-full bg-gradient-to-br from-blue-500/10 via-blue-500/5 to-transparent blur-3xl opacity-60 parallax-bg" data-speed="0.2"></div>
          <div className="absolute -right-[10%] bottom-[5%] w-[35%] h-[40%] rounded-full bg-gradient-to-tl from-rashmi-red/10 via-rashmi-red/5 to-transparent blur-3xl opacity-50 parallax-bg" data-speed="-0.1"></div>
        </div>

        <div className="container mx-auto px-4 relative">
          <AnimatePresence mode="wait">
            {isSubmitted ? (
              // --- Enhanced Success State ---
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -30, scale: 0.95 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="max-w-2xl mx-auto text-center p-10 md:p-16 bg-gradient-to-br from-green-50 via-white to-green-50 dark:from-green-950/30 dark:via-neutral-900 dark:to-green-950/30 rounded-3xl border border-green-300/50 dark:border-green-700/30 shadow-2xl shadow-green-200/30 dark:shadow-green-900/30 relative overflow-hidden"
              >
                 {/* Subtle Background Pattern */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                    {/* Example: Dashed lines pattern */}
                    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <pattern id="dashed-pattern" width="20" height="20" patternUnits="userSpaceOnUse">
                                <path d="M 0 10 L 10 10 M 10 0 L 10 10" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#dashed-pattern)" className="text-green-500 dark:text-green-400"/>
                    </svg>
                </div>

                 {/* Animated Checkmark */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
                  className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg shadow-green-500/30"
                >
                  <Check className="w-10 h-10 text-white stroke-[3]" />
                </motion.div>

                {/* Success Message */}
                <motion.h2
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                  className="text-3xl md:text-4xl font-bold mb-4 text-emerald-800 dark:text-emerald-200 tracking-tight"
                >
                  Registration Submitted!
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                  className="text-muted-foreground dark:text-neutral-300 mb-10 leading-relaxed text-lg"
                >
                  Thank you for your interest! We've received your details and our team will review your application. We'll be in touch soon regarding the next steps.
                </motion.p>

                {/* Button to Reset */}
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                  <Button
                     variant="outline"
                     size="lg"
                     onClick={() => setIsSubmitted(false)}
                     className="rounded-full px-8 py-3 border-emerald-300 dark:border-emerald-700 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/50 hover:border-emerald-400 dark:hover:border-emerald-600 focus:ring-emerald-500/30 transition-all duration-300 group flex items-center gap-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-refresh-ccw opacity-70 group-hover:rotate-[-90deg] transition-transform"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M3 21v-5h5"/></svg>
                    Register Another Vendor
                  </Button>
                </motion.div>

                {/* Confetti (Kept simple CSS version for performance) */}
                <div className="success-confetti">
                  {[...Array(25)].map((_, i) => ( <div key={i} className={`confetti-item confetti-item-${i % 5}`}></div> ))}
                </div>
              </motion.div>
            ) : (
              // --- Enhanced Form ---
              <motion.div key="form">
                <Card className="max-w-4xl mx-auto overflow-hidden shadow-xl dark:shadow-blue-950/10 border border-border/40 dark:border-neutral-800/60 rounded-2xl bg-card/80 dark:bg-neutral-900/80 backdrop-blur-lg">
                   {/* Gradient Top Border */}
                  <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-rashmi-red/80 via-blue-500/70 to-rashmi-red/80"></div>

                  <CardHeader className="bg-muted/30 dark:bg-neutral-800/30 border-b border-border/30 dark:border-neutral-800/50 p-8">
                    <CardTitle className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground">Become a Registered Vendor</CardTitle>
                    <CardDescription className="text-base text-muted-foreground/90 mt-1">
                      Fill in your details to join our supply network. Fields marked <span className="text-rashmi-red font-medium">*</span> are required.
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="p-8 md:p-10">
                    <form className="space-y-12" onSubmit={handleSubmit(onSubmit)} noValidate>
                       {/* Using staggerContainer for form sections */}
                      <motion.div variants={staggerContainer} initial="hidden" animate="visible">

                        {/* === Contact Person Details === */}
                        <motion.div variants={fadeInUp} className="space-y-6">
                          <SectionHeader icon={User} title="Contact Person Details" description="Primary contact for communication." />
                          <div className="grid md:grid-cols-2 gap-x-6 gap-y-5">
                            <FormField label="Full Name" required id="name" error={errors.name?.message}>
                              <Input
                                id="name"
                                placeholder="e.g., Priya Sharma"
                                className="bg-background/70 dark:bg-neutral-800/50 focus:ring-offset-0 focus:ring-rashmi-red/50 focus:border-rashmi-red/80"
                                {...register("name", { required: "Full name is required" })}
                                aria-invalid={errors.name ? "true" : "false"}
                              />
                            </FormField>
                            <FormField label="Designation" required id="designation" error={errors.designation?.message}>
                               <Input
                                id="designation"
                                placeholder="e.g., Procurement Head"
                                className="bg-background/70 dark:bg-neutral-800/50 focus:ring-offset-0 focus:ring-rashmi-red/50 focus:border-rashmi-red/80"
                                {...register("designation", { required: "Designation is required" })}
                                 aria-invalid={errors.designation ? "true" : "false"}
                              />
                            </FormField>
                          </div>
                        </motion.div>

                        {/* === Company Information === */}
                         <motion.div variants={fadeInUp} className="space-y-6 pt-8">
                           <SectionHeader icon={Building} title="Company Information" description="Official details about your business." />
                            <FormField label="Company/Firm Name" required id="companyName" error={errors.companyName?.message}>
                                <Input
                                  id="companyName"
                                  placeholder="Your company's registered name"
                                  className="bg-background/70 dark:bg-neutral-800/50 focus:ring-offset-0 focus:ring-rashmi-red/50 focus:border-rashmi-red/80"
                                  {...register("companyName", { required: "Company name is required" })}
                                  aria-invalid={errors.companyName ? "true" : "false"}
                                />
                            </FormField>

                             <div className="grid md:grid-cols-2 gap-x-6 gap-y-5">
                                <FormField label="Type of Firm" required id="firmType" error={errors.firmType?.message}>
                                   <Controller
                                      name="firmType"
                                      control={control}
                                      rules={{ required: "Please select a firm type" }}
                                      render={({ field }) => (
                                      <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                                        <SelectTrigger
                                          id="firmType"
                                          aria-invalid={errors.firmType ? "true" : "false"}
                                          className="bg-background/70 dark:bg-neutral-800/50 focus:ring-offset-0 focus:ring-rashmi-red/50 focus:border-rashmi-red/80 data-[placeholder]:text-muted-foreground/70"
                                        >
                                          <SelectValue placeholder="Select firm type..." />
                                        </SelectTrigger>
                                        <SelectContent className="bg-card backdrop-blur-md border-border/80 dark:bg-neutral-800 dark:border-neutral-700">
                                          {firmTypes.map(type => (
                                            <SelectItem
                                              key={type.id}
                                              value={type.id}
                                              className="focus:bg-rashmi-red/10 focus:text-rashmi-red dark:focus:bg-rashmi-red/20"
                                            >
                                              {type.label}
                                            </SelectItem>
                                          ))}
                                        </SelectContent>
                                      </Select>
                                      )}
                                    />
                                </FormField>
                                <FormField label="Company Website" id="website" error={errors.website?.message}>
                                   <div className="flex group items-center rounded-md border border-input dark:border-neutral-700 focus-within:ring-2 focus-within:ring-rashmi-red/50 focus-within:border-rashmi-red/80 dark:focus-within:border-rashmi-red/80 bg-background/70 dark:bg-neutral-800/50 transition-all duration-200">
                                     <span className="pl-3 pr-2 text-muted-foreground/60">
                                       <Globe className="h-4 w-4" />
                                     </span>
                                     <Input
                                      id="website"
                                      type="url"
                                      placeholder="https://yourcompany.com"
                                      className="border-0 focus:ring-0 flex-1 pl-0 bg-transparent h-9" // Adjusted for group styling
                                      {...register("website", {
                                         pattern: {
                                           value: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
                                           message: "Please enter a valid URL (e.g., https://example.com)"
                                         }
                                       })}
                                      aria-invalid={errors.website ? "true" : "false"}
                                     />
                                   </div>
                                </FormField>
                             </div>

                             <FormField label="Complete Address" required id="address" error={errors.address?.message}>
                               <Textarea
                                  id="address"
                                  rows={3}
                                  placeholder="Street Address, City, State, Postal Code, Country"
                                  className="bg-background/70 dark:bg-neutral-800/50 focus:ring-offset-0 focus:ring-rashmi-red/50 focus:border-rashmi-red/80 resize-none"
                                  {...register("address", { required: "Address is required" })}
                                  aria-invalid={errors.address ? "true" : "false"}
                                />
                             </FormField>
                         </motion.div>

                        {/* === Contact Details === */}
                         <motion.div variants={fadeInUp} className="space-y-6 pt-8">
                             <SectionHeader icon={Phone} title="Contact Details" description="How we can reach you." />
                           <div className="grid md:grid-cols-2 gap-x-6 gap-y-5">
                            <FormField label="Contact Number" required id="contactNo" error={errors.contactNo?.message}>
                                 <Input
                                  id="contactNo"
                                  type="tel"
                                  placeholder="+91 XXXXX XXXXX"
                                  className="bg-background/70 dark:bg-neutral-800/50 focus:ring-offset-0 focus:ring-rashmi-red/50 focus:border-rashmi-red/80"
                                  {...register("contactNo", {
                                      required: "Contact number is required",
                                      // Add a pattern for basic phone number format if desired
                                      // pattern: { value: /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/, message: "Invalid phone number format" }
                                  })}
                                  aria-invalid={errors.contactNo ? "true" : "false"}
                                />
                             </FormField>
                            <FormField label="Email Address" required id="email" error={errors.email?.message}>
                                <Input
                                  id="email"
                                  type="email"
                                  placeholder="contact@yourcompany.com"
                                  className="bg-background/70 dark:bg-neutral-800/50 focus:ring-offset-0 focus:ring-rashmi-red/50 focus:border-rashmi-red/80"
                                  {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                      message: "Invalid email address format"
                                    }
                                  })}
                                  aria-invalid={errors.email ? "true" : "false"}
                                />
                              </FormField>
                           </div>
                         </motion.div>

                         {/* === Product/Service Information === */}
                         <motion.div variants={fadeInUp} className="space-y-6 pt-8">
                             <SectionHeader icon={Briefcase} title="Product/Service Information" description="Details about what you offer." />
                             <FormField label="Primary Category" required id="category" error={errors.category?.message}>
                                <Controller
                                  name="category"
                                  control={control}
                                  rules={{ required: "Please select a category" }}
                                  render={({ field }) => (
                                    <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                                      <SelectTrigger
                                        id="category"
                                        aria-invalid={errors.category ? "true" : "false"}
                                        className="bg-background/70 dark:bg-neutral-800/50 focus:ring-offset-0 focus:ring-rashmi-red/50 focus:border-rashmi-red/80 data-[placeholder]:text-muted-foreground/70"
                                      >
                                        <SelectValue placeholder="Select primary category..." />
                                      </SelectTrigger>
                                      <SelectContent className="bg-card backdrop-blur-md border-border/80 dark:bg-neutral-800 dark:border-neutral-700">
                                        {categories.map(cat => (
                                          <SelectItem
                                            key={cat.id}
                                            value={cat.id}
                                            className="focus:bg-rashmi-red/10 focus:text-rashmi-red dark:focus:bg-rashmi-red/20"
                                          >
                                            {cat.label}
                                          </SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
                                  )}
                                />
                             </FormField>
                             <FormField label="Product/Service Description" required id="productDescription" error={errors.productDescription?.message}>
                                <Textarea
                                  id="productDescription"
                                  rows={4}
                                  placeholder="Describe your core offerings, key features, and capabilities."
                                  className="bg-background/70 dark:bg-neutral-800/50 focus:ring-offset-0 focus:ring-rashmi-red/50 focus:border-rashmi-red/80 resize-y"
                                  {...register("productDescription", { required: "Description is required", minLength: { value: 20, message: "Please provide a more detailed description (min 20 chars)." }})}
                                  aria-invalid={errors.productDescription ? "true" : "false"}
                                />
                             </FormField>
                              <FormField label="Major Clients or Projects (Optional)" id="majorClients">
                                 <Textarea
                                  id="majorClients"
                                  rows={3}
                                  placeholder="List key clients, projects, or industries you serve (e.g., Client A, Client B - Automotive Sector)."
                                  className="bg-background/70 dark:bg-neutral-800/50 focus:ring-offset-0 focus:ring-rashmi-red/50 focus:border-rashmi-red/80 resize-y"
                                  {...register("majorClients")}
                                />
                               </FormField>
                         </motion.div>

                        {/* === File Upload === */}
                        <motion.div variants={fadeInUp} className="space-y-3 pt-8">
                            <Label htmlFor="file-upload" className="flex items-center text-lg font-semibold text-foreground tracking-tight">
                               <Upload className="mr-2 h-5 w-5 text-rashmi-red" />
                              Supporting Documents (Optional)
                            </Label>
                             <p className="text-sm text-muted-foreground/90 mb-3">Upload company profile, brochures, certifications, etc. (Max {MAX_FILE_SIZE_MB}MB)</p>
                            <div
                               className={cn(
                                  "relative flex flex-col items-center justify-center w-full min-h-[16rem] border-2 border-dashed rounded-xl cursor-pointer transition-all duration-300 ease-in-out group",
                                  isDragging ? "border-rashmi-red bg-rashmi-red/10 scale-[1.02] shadow-lg shadow-rashmi-red/10 ring-2 ring-rashmi-red/50" : "border-border/60 dark:border-neutral-700 hover:border-rashmi-red/50 dark:hover:border-rashmi-red/60 hover:bg-muted/30 dark:hover:bg-neutral-800/40 bg-muted/20 dark:bg-neutral-800/20",
                                  fileError ? "border-destructive bg-destructive/10 dark:border-destructive/70 dark:bg-destructive/20" : "",
                                  file || isSubmitting ? "border-solid" : "" // Make border solid when file is present or submitting
                               )}
                              onDrop={handleFileDrop}
                              onDragOver={handleDragOver}
                              onDragLeave={handleDragLeave}
                               onClick={() => !file && document.getElementById('file-upload')?.click()} // Only allow click if no file
                            >
                               <input
                                id="file-upload"
                                name="file-upload"
                                type="file"
                                className="sr-only"
                                onChange={handleFileChange}
                                accept={ALLOWED_FILE_TYPES.join(',')}
                                disabled={!!file || isSubmitting} // Disable if file exists or submitting
                              />
                               <AnimatePresence>
                                 {/* File Preview State */}
                                 {file && (
                                   <motion.div
                                      key="file-present"
                                      initial={{ opacity: 0, scale: 0.9 }}
                                      animate={{ opacity: 1, scale: 1 }}
                                      exit={{ opacity: 0, scale: 0.9 }}
                                      className="absolute inset-0 p-4 flex flex-col items-center justify-center bg-card/90 dark:bg-neutral-800/90 backdrop-blur-sm rounded-xl text-center"
                                    >
                                      {filePreview ? (
                                          <img src={filePreview} alt="Preview" className="max-h-32 w-auto object-contain rounded-md shadow-md mb-3 border dark:border-neutral-700" />
                                      ) : (
                                          <FileText className="h-16 w-16 text-rashmi-red/80 mb-3" />
                                      )}
                                      <p className="text-sm font-medium text-foreground dark:text-neutral-200 truncate max-w-[90%] px-2">{fileName}</p>
                                      <p className="text-xs text-muted-foreground dark:text-neutral-400 mt-1">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                                      <Button
                                          type="button" variant="ghost" size="sm"
                                          className="mt-4 text-destructive hover:bg-destructive/10 h-8 px-3 rounded-md"
                                          onClick={clearFile} aria-label="Remove file"
                                          disabled={isSubmitting}
                                      >
                                          <X size={16} className="mr-1"/> Remove
                                     </Button>
                                   </motion.div>
                                 )}

                                  {/* Initial / Dragging State */}
                                  {!file && (
                                    <motion.div
                                      key="initial-state"
                                      initial={{ opacity: 0, scale: 0.95 }}
                                      animate={{ opacity: 1, scale: 1 }}
                                      exit={{ opacity: 0, scale: 0.95 }}
                                      className="text-center p-6 flex flex-col items-center justify-center transition-colors duration-300"
                                    >
                                       <motion.div
                                         animate={{ y: isDragging ? -8 : 0 }}
                                         transition={{ type: 'spring', stiffness: 300, damping: 10 }}
                                       >
                                          <Upload className={cn("h-14 w-14 mb-4 transition-colors", isDragging ? "text-rashmi-red" : "text-muted-foreground/60 dark:text-neutral-500")} />
                                       </motion.div>
                                       <p className="font-semibold text-lg text-foreground dark:text-neutral-200">
                                         {isDragging ? "Drop file here!" : <> <span className="text-rashmi-red">Click to upload</span> or drag & drop</>}
                                       </p>
                                       <p className="text-xs text-muted-foreground dark:text-neutral-400 mt-1.5">
                                         PDF, DOC(X), JPG, PNG (Max {MAX_FILE_SIZE_MB}MB)
                                       </p>
                                     </motion.div>
                                  )}
                               </AnimatePresence>

                               {/* Upload Progress Overlay */}
                              <AnimatePresence>
                                {isSubmitting && uploadProgress > 0 && (
                                   <motion.div
                                      key="progress-bar"
                                      initial={{ opacity: 0 }}
                                      animate={{ opacity: 1 }}
                                      exit={{ opacity: 0 }}
                                      className="absolute inset-0 bg-background/70 dark:bg-neutral-900/70 backdrop-blur-sm flex items-center justify-center rounded-xl p-4"
                                    >
                                       <div className="w-full max-w-xs text-center">
                                           <Loader2 className="h-8 w-8 text-rashmi-red animate-spin mx-auto mb-3" />
                                           <p className="text-sm font-medium text-foreground mb-2">Uploading...</p>
                                           <Progress value={uploadProgress} className="h-2 [&>div]:bg-gradient-to-r [&>div]:from-rashmi-red [&>div]:to-red-700" />
                                           <p className="text-xs text-muted-foreground mt-1">{uploadProgress}%</p>
                                       </div>
                                    </motion.div>
                                )}
                               </AnimatePresence>
                             </div>
                           {/* File Error Display */}
                            {fileError && (
                               <motion.p
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mt-2 text-sm text-destructive flex items-center gap-1"
                              >
                                <AlertCircle size={14} /> {fileError}
                               </motion.p>
                             )}
                         </motion.div>

                        {/* === Terms and Submit === */}
                         <motion.div variants={fadeInUp} className="pt-10 space-y-8">
                            {/* Terms Checkbox */}
                            <div className="flex items-start space-x-3 rounded-lg border border-border/50 dark:border-neutral-700/50 p-4 bg-muted/20 dark:bg-neutral-800/20">
                              <Controller
                                  name="terms"
                                  control={control}
                                  rules={{ required: "You must agree to the terms and conditions" }}
                                  render={({ field }) => (
                                      <Checkbox
                                          id="terms"
                                          checked={field.value}
                                          onCheckedChange={field.onChange}
                                          aria-invalid={errors.terms ? "true" : "false"}
                                          className={cn(
                                            "mt-0.5 data-[state=checked]:bg-rashmi-red data-[state=checked]:border-rashmi-red border-muted-foreground/50 dark:border-neutral-600",
                                            errors.terms ? "border-destructive" : ""
                                          )}
                                      />
                                  )}
                              />
                              <div className="grid gap-1.5 leading-none flex-1">
                                <Label htmlFor="terms" className="text-sm font-medium text-foreground/90 dark:text-neutral-200 cursor-pointer">
                                  I confirm all information is accurate and agree to the
                                  <Link to="/terms-and-conditions" target="_blank" rel="noopener noreferrer" className="text-rashmi-red hover:underline font-medium px-1 transition-colors">Terms & Conditions</Link>
                                  and
                                  <Link to="/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-rashmi-red hover:underline font-medium pl-1 transition-colors">Privacy Policy</Link>.
                                  <span className="text-destructive">*</span>
                                </Label>
                                {errors.terms && <p className="text-xs text-destructive flex items-center gap-1"><AlertCircle size={13} /> {errors.terms.message}</p>}
                              </div>
                            </div>

                             {/* Submit Button */}
                             <Button
                              type="submit"
                              className="w-full bg-gradient-to-r from-rashmi-red to-red-700 hover:from-rashmi-red/90 hover:to-red-700/90 text-white py-4 text-lg font-semibold rounded-xl group relative overflow-hidden shadow-lg shadow-rashmi-red/20 hover:shadow-xl hover:shadow-rashmi-red/30 focus:outline-none focus:ring-4 focus:ring-rashmi-red/40 transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
                              disabled={isSubmitting}
                              aria-live="polite" // Announce changes for screen readers
                            >
                              {/* Animated Background Shimmer */}
                              <motion.span
                                className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/0 via-white/20 to-white/0"
                                style={{ backgroundSize: '200% 100%' }}
                                variants={shimmerVariants}
                                initial="initial"
                                animate={!isSubmitting ? "animate" : ""} // Only animate when not submitting
                              ></motion.span>

                              <span className="relative z-10 flex items-center justify-center">
                              {isSubmitting ? (
                                <>
                                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                  Processing Registration...
                                </>
                              ) : (
                                <>
                                  Submit Registration
                                  <Check className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                                </>
                              )}
                              </span>
                            </Button>
                         </motion.div>
                      </motion.div> {/* End of stagger container */}
                    </form>
                  </CardContent>
                 </Card>
              </motion.div>
            )}
           </AnimatePresence>
         </div>
       </motion.section>

      {/* ============================
          Enhanced Benefits Section
      ============================ */}
      <section className="py-24 relative bg-gradient-to-b from-blue-50/20 to-background dark:from-blue-950/20 dark:to-neutral-950 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-60">
          <div className="absolute -right-[5%] top-[10%] w-1/3 h-1/2 bg-rashmi-red/5 dark:bg-rashmi-red/10 rounded-full blur-3xl opacity-50 parallax-bg" data-speed="0.1"></div>
          <div className="absolute -left-[10%] bottom-[5%] w-1/2 h-1/2 bg-blue-500/5 dark:bg-blue-900/10 rounded-full blur-3xl opacity-40 parallax-bg" data-speed="-0.15"></div>
           {/* Grid Pattern */}
           <svg className="absolute inset-0 h-full w-full stroke-gray-300/20 dark:stroke-neutral-700/20 [mask-image:radial-gradient(100%_100%_at_center_center,white,transparent)]" aria-hidden="true">
            <defs>
                <pattern id="benefits-pattern" width="60" height="60" x="50%" y="-1" patternUnits="userSpaceOnUse">
                <path d="M.5 60 V.5 H60" fill="none"/>
                </pattern>
            </defs>
            <rect width="100%" height="100%" strokeWidth="0" fill="url(#benefits-pattern)"/>
           </svg>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Section Header */}
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="mb-3">
              <span className="inline-block bg-rashmi-red/10 text-rashmi-red px-3 py-1 rounded-full text-sm font-medium tracking-wide">
                Partnership Advantages
              </span>
            </motion.div>
            <motion.h2
              variants={fadeInUp}
              className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-5 text-foreground"
            >
              Why Partner with Rashmi Metaliks?
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-lg text-muted-foreground/90 dark:text-neutral-300 leading-relaxed">
              Elevate your business by joining our esteemed network. Benefit from strategic collaboration, streamlined processes, and growth opportunities with an industry leader.
            </motion.p>
          </motion.div>

          {/* Benefits Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { title: "Expand Your Reach", description: "Access new markets and large-scale projects through our extensive network and ongoing tenders.", icon: TrendingUp, color: "from-blue-500/10 to-blue-600/5 dark:from-blue-800/20 dark:to-blue-900/10" },
              { title: "Streamlined Procurement", description: "Experience efficient digital processes, clear communication, and a dedicated vendor portal.", icon: Handshake, color: "from-rashmi-red/10 to-red-600/5 dark:from-rashmi-red/20 dark:to-red-900/10" },
              { title: "Reliable & Timely Payments", description: "Benefit from structured payment cycles and financial predictability, fostering a stable partnership.", icon: ShieldCheck, color: "from-emerald-500/10 to-green-600/5 dark:from-emerald-800/20 dark:to-green-900/10" },
              { title: "Long-Term Growth", description: "Become a preferred partner and scale your business alongside our expanding operations and projects.", icon: Award, color: "from-amber-500/10 to-yellow-600/5 dark:from-amber-800/20 dark:to-yellow-900/10" },
              { title: "Innovation Synergy", description: "Collaborate on new solutions, gain early access to requirements, and contribute to industry advancements.", icon: Upload, color: "from-indigo-500/10 to-purple-600/5 dark:from-indigo-800/20 dark:to-purple-900/10" },
              { title: "Sustainable Partnership", description: "Align with our commitment to responsible sourcing, ethical practices, and environmental stewardship.", icon: CheckCircle, color: "from-teal-500/10 to-cyan-600/5 dark:from-teal-800/20 dark:to-cyan-900/10" }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
                whileHover={{ y: -8, scale: 1.03, transition: { duration: 0.2 } }}
                className="bg-card/90 dark:bg-neutral-800/90 backdrop-blur-sm border border-border/30 dark:border-neutral-700/50 rounded-2xl overflow-hidden flex flex-col shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                 {/* Colored Gradient Blur Effect */}
                <div className={`absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl ${benefit.color} rounded-full blur-3xl -z-10 opacity-70 group-hover:opacity-90 transition-opacity duration-300`}></div>

                <div className="p-6 pb-8 flex-grow relative z-10 flex flex-col">
                   {/* Enhanced Icon */}
                  <div className="mb-5 inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-background to-muted/60 dark:from-neutral-700 dark:to-neutral-800/50 shadow-md border border-border/20 dark:border-neutral-600/50">
                    <benefit.icon className="h-7 w-7 text-rashmi-red" />
                  </div>
                   {/* Text Content */}
                  <h3 className="text-xl font-semibold mb-2.5 text-foreground dark:text-neutral-100">{benefit.title}</h3>
                  <p className="text-muted-foreground dark:text-neutral-300 text-sm leading-relaxed flex-grow">{benefit.description}</p>
                   {/* Bottom Line - subtle */}
                   <div className="mt-6 h-[1px] w-full bg-gradient-to-r from-rashmi-red/40 via-border/50 to-transparent"></div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Call-to-action to Scroll back to Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-center mt-20"
          >
            <a
              href="#registration-form"
              className="inline-flex items-center justify-center gap-2 py-3 px-7 bg-background/80 dark:bg-neutral-800/80 text-foreground border border-border/50 dark:border-neutral-700 rounded-full hover:border-rashmi-red/60 hover:text-rashmi-red dark:hover:border-rashmi-red/70 dark:hover:text-rashmi-red backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300"
            >
              Ready to Partner? Register Now
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* =========================
          Additional CSS Styles
      ========================= */}
      <style>{`
        /* Use a more modern display font if available */
        /* @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Lexend:wght@600;700;800&display=swap'); */
        .font-display {
          font-family: 'Lexend', sans-serif; /* Example: Use Lexend or your brand's display font */
        }
        /* Fallback */
        :root {
          --font-display: 'Lexend', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
          --font-sans: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }
        body {
           font-family: var(--font-sans);
        }
        h1, h2, h3, .font-display {
           font-family: var(--font-display);
        }

        /* Enhanced Shimmer Effect (moved from inline style for reuse) */
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        .animate-shimmer {
            /* Applied via framer-motion variants now for better control */
        }

        /* Enhanced Confetti Animation */
        .success-confetti {
          position: absolute;
          top: 0; left: 0; width: 100%; height: 100%;
          pointer-events: none; overflow: hidden; z-index: 20;
        }
        .confetti-item {
          position: absolute;
          width: 8px; height: 12px; /* Rectangular confetti */
          border-radius: 2px;
          opacity: 0;
          animation: confetti-fall 3.5s ease-in-out forwards;
          transform-origin: center;
        }
        @keyframes confetti-fall {
          0% {
            transform: translateY(-150px) rotate(0deg) scale(1);
            opacity: 1;
          }
          100% {
            transform: translateY(calc(100% + 150px)) rotate(720deg) scale(0.5); /* Fade out and shrink */
            opacity: 0;
          }
        }
        /* Diverse Colors and Delays */
        .confetti-item-0 { left: 10%; background-color: #EF4444; /* Red */ animation-delay: 0.1s; animation-duration: 3s; }
        .confetti-item-1 { left: 25%; background-color: #3B82F6; /* Blue */ animation-delay: 0.4s; animation-duration: 3.8s; }
        .confetti-item-2 { left: 45%; background-color: #10B981; /* Emerald */ animation-delay: 0.2s; animation-duration: 3.2s; }
        .confetti-item-3 { left: 65%; background-color: #F59E0B; /* Amber */ animation-delay: 0.6s; animation-duration: 4s; }
        .confetti-item-4 { left: 85%; background-color: #8B5CF6; /* Violet */ animation-delay: 0.3s; animation-duration: 3.5s; }
        /* Add more variations for better effect */
         .confetti-item:nth-child(5n+1) { left: 15%; animation-delay: 0.5s; background-color: #EC4899; }
         .confetti-item:nth-child(5n+2) { left: 35%; animation-delay: 0.7s; background-color: #6366F1; }
         .confetti-item:nth-child(5n+3) { left: 55%; animation-delay: 0.9s; background-color: #22C55E; }
         .confetti-item:nth-child(5n+4) { left: 75%; animation-delay: 0.15s; background-color: #F97316; }
         .confetti-item:nth-child(5n+5) { left: 95%; animation-delay: 0.55s; background-color: #0EA5E9; }

        /* Smooth Scrolling */
        html {
          scroll-behavior: smooth;
        }

        /* Custom Scrollbar (Optional, subtle) */
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: transparent;
        }
        ::-webkit-scrollbar-thumb {
          background-color: hsl(var(--border) / 0.5);
          border-radius: 10px;
          border: 2px solid transparent;
          background-clip: content-box;
        }
        ::-webkit-scrollbar-thumb:hover {
          background-color: hsl(var(--border));
        }

         /* Ensure shadcn SelectContent appears above other elements */
        [data-radix-select-content] {
            z-index: 50; /* Or higher if needed */
        }

      `}</style>

      <Footer />
    </div>
  );
};

export default VendorRegistration;