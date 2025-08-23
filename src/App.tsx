import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';

// Pages
import Index from '@/pages/Index';
import Dashboard from '@/pages/Dashboard';
import RealTimeBot from '@/pages/RealTimeBot';
import BiasEngine from '@/pages/BiasEngine';
import Integrations from '@/pages/Integrations';
import Reports from '@/pages/Reports';
import About from '@/pages/About';
import Settings from '@/pages/Settings';
import NotFound from '@/pages/NotFound';
import UploadPage from "@/pages/UploadPage";


const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Router>
          <div className="App">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/try-live-demo" element={<RealTimeBot />} />
              <Route path="/bias-engine" element={<BiasEngine />} />
              <Route path="/integrations" element={<Integrations />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/about" element={<About />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/upload" element={<UploadPage />} />


            </Routes>
            <Toaster />
            <Sonner />
          </div>
        </Router>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
