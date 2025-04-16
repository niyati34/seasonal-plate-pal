
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DietPlanProvider } from "./context/DietPlanContext";
import Index from "./pages/Index";
import CreatePlan from "./pages/CreatePlan";
import MyPlan from "./pages/MyPlan";
import Recipes from "./pages/Recipes";
import Ingredients from "./pages/Ingredients";
import MothersSpecial from "./pages/MothersSpecial";
import NotFound from "./pages/NotFound";

// Create QueryClient instance
const queryClient = new QueryClient();

// Refactored as a proper function component
const App = () => {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <DietPlanProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/create-plan" element={<CreatePlan />} />
                <Route path="/plan" element={<MyPlan />} />
                <Route path="/recipes" element={<Recipes />} />
                <Route path="/ingredients" element={<Ingredients />} />
                <Route path="/mothers-special" element={<MothersSpecial />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </DietPlanProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;
