import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import WhatIsDecisionTree from "./pages/WhatIsDecisionTree";
import EntropyInformationGain from "./pages/EntropyInformationGain";
import HowItWorks from "./pages/HowItWorks";
import CodeExamples from "./pages/CodeExamples";
import TryItYourself from "./pages/TryItYourself";
import Quiz from "./pages/Quiz";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/what-is-decision-tree" element={<WhatIsDecisionTree />} />
          <Route path="/entropy-information-gain" element={<EntropyInformationGain />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/code-examples" element={<CodeExamples />} />
          <Route path="/try-it-yourself" element={<TryItYourself />} />
          <Route path="/quiz" element={<Quiz />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
