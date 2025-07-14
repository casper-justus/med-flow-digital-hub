
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import React, { Suspense } from "react";
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const Inventory = React.lazy(() => import("./pages/Inventory"));
const Scheduling = React.lazy(() => import("./pages/Scheduling"));
const Radiology = React.lazy(() => import("./pages/Radiology"));
const Laboratory = React.lazy(() => import("./pages/Laboratory"));
const Billing = React.lazy(() => import("./pages/Billing"));
const Queue = React.lazy(() => import("./pages/Queue"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
const Triage = React.lazy(() => import("./pages/Triage"));
const Doctor = React.lazy(() => import("./pages/Doctor"));
const Pharmacy = React.lazy(() => import("./pages/Pharmacy"));
const Reception = React.lazy(() => import("./pages/Reception"));
const Surgery = React.lazy(() => import("./pages/Surgery"));
const Admission = React.lazy(() => import("./pages/Admission"));
const Emergency = React.lazy(() => import("./pages/Emergency"));
const Index = React.lazy(() => import("./pages/Index"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
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
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
