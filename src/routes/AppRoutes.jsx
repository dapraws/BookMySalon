import React from "react";
import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

// Lazy-loaded pages
const Home = lazy(() => import("../pages/Home/Home"));
const Services = lazy(() => import("../pages/Services/Services"));
const ServiceDetail = lazy(() => import("../pages/ServiceDetail/ServiceDetail"));
const Booking = lazy(() => import("../pages/Booking/Booking"));
const Summary = lazy(() => import("../pages/Summary/Summary"));
const Footer = lazy(() => import("../components/Footer"));
const Navbar = lazy(() => import("../components/Navbar"));

// Beautiful loading component with brown theme
const LoadingFallback = () => (
  <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-amber-50 via-orange-50 to-stone-50">
    <div className="text-center">
      {/* Spinner */}
      <div className="relative w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6">
        <div className="absolute inset-0 border-4 border-amber-200 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-amber-700 rounded-full border-t-transparent animate-spin"></div>
      </div>
      
      {/* Text */}
      <p className="text-lg sm:text-xl font-semibold text-amber-900 font-['Space_Grotesk']">
        Loading...
      </p>
      <p className="text-xs sm:text-sm text-amber-700 mt-2 font-['Space_Grotesk']">
        Preparing your beauty experience
      </p>
    </div>
  </div>
);

export default function AppRoutes() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:id" element={<ServiceDetail />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/summary" element={<Summary />} />
      </Routes>
      <Footer />
    </Suspense>
  );
}