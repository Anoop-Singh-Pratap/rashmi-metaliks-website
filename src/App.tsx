
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
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
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
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
