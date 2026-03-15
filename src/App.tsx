import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { StoreHeader } from "@/components/StoreHeader";
import { Footer } from "@/components/Footer";
import { useCartSync } from "@/hooks/useCartSync";
import { lazy, Suspense } from "react";
import { Loader2 } from "lucide-react";

const Index = lazy(() => import("./pages/Index.tsx"));
const ProductDetail = lazy(() => import("./pages/ProductDetail.tsx"));
const About = lazy(() => import("./pages/About.tsx"));
const Contact = lazy(() => import("./pages/Contact.tsx"));
const FAQ = lazy(() => import("./pages/FAQ.tsx"));
const Shipping = lazy(() => import("./pages/Shipping.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));

const queryClient = new QueryClient();

const Loading = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <Loader2 className="h-5 w-5 animate-spin text-primary" />
  </div>
);

const AppContent = () => {
  useCartSync();
  return (
    <div className="scanline flex flex-col min-h-screen">
      <AnnouncementBar />
      <StoreHeader />
      <main className="flex-1">
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/product/:handle" element={<ProductDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/shipping" element={<Shipping />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
