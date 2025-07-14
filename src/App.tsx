
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/Inventory";
import Scheduling from "./pages/Scheduling";
import Radiology from "./pages/Radiology";
import Laboratory from "./pages/Laboratory";
import Billing from "./pages/Billing";
import Queue from "./pages/Queue";
import NotFound from "./pages/NotFound";
import Triage from "./pages/Triage";
import Doctor from "./pages/Doctor";
import Pharmacy from "./pages/Pharmacy";
import Reception from "./pages/Reception";
import Surgery from "./pages/Surgery";
import Admission from "./pages/Admission";
import Emergency from "./pages/Emergency";

const queryClient = new QueryClient();

import Index from "./pages/Index";

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/scheduling" element={<Scheduling />} />
          <Route path="/radiology" element={<Radiology />} />
          <Route path="/laboratory" element={<Laboratory />} />
          <Route path="/billing" element={<Billing />} />
          <Route path="/queue" element={<Queue />} />
          <Route path="/triage" element={<Triage />} />
          <Route path="/doctor" element={<Doctor />} />
          <Route path="/pharmacy" element={<Pharmacy />} />
          <Route path="/reception" element={<Reception />} />
          <Route path="/surgery" element={<Surgery />} />
          <Route path="/admission" element={<Admission />} />
          <Route path="/emergency" element={<Emergency />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
