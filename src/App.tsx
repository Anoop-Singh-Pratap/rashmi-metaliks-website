
import { Helmet } from "react-helmet";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/context/ThemeContext";
import Index from "./pages/Index";
import DiPipes from "./pages/DiPipes";
import DiFittings from "./pages/DiFittings";
import TmtBar from "./pages/TmtBar";
import SpongeIron from "./pages/SpongeIron";
import PigIron from "./pages/PigIron";
import IronOrePellet from "./pages/IronOrePellet";
import Sinter from "./pages/Sinter";
import Certifications from "./pages/Certifications";
import WhyRashmiDiPipes from "./pages/WhyRashmiDiPipes";
import AboutRashmi from "./pages/AboutRashmi";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <Helmet>
        <title>Rashmi Metaliks - Premium Steel Products & Solutions</title>
        <meta name="description" content="Rashmi Metaliks - Leading manufacturer of high-quality steel products including DI Pipes, TMT Bars, Pig Iron, and more with industry-leading quality standards." />
        <meta name="keywords" content="Rashmi Metaliks, Steel Products, DI Pipes, TMT Bars, Sponge Iron, Pig Iron" />
        <meta name="author" content="Rashmi Metaliks" />
        <meta property="og:title" content="Rashmi Metaliks - Premium Steel Products" />
        <meta property="og:description" content="Leading manufacturer of high-quality steel products with industry-leading quality standards." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.rashmi.com" />
        <meta property="og:image" content="https://www.rashmi.com/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Rashmi Metaliks - Premium Steel Products" />
        <meta name="twitter:description" content="Leading manufacturer of high-quality steel products with industry-leading quality standards." />
        <meta name="twitter:image" content="https://www.rashmi.com/og-image.png" />
      </Helmet>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/di-pipes" element={<DiPipes />} />
            <Route path="/di-fittings" element={<DiFittings />} />
            <Route path="/tmt-bar" element={<TmtBar />} />
            <Route path="/sponge-iron" element={<SpongeIron />} />
            <Route path="/pig-iron" element={<PigIron />} />
            <Route path="/iron-ore-pellet" element={<IronOrePellet />} />
            <Route path="/sinter" element={<Sinter />} />
            <Route path="/certifications" element={<Certifications />} />
            <Route path="/why-rashmi-di-pipes" element={<WhyRashmiDiPipes />} />
            <Route path="/about-rashmi" element={<AboutRashmi />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
