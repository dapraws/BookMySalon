import React from "react";
import { LazyImage } from "../components/Lazy";

export default function HeroSection() {
  const imageUrl = "https://images.unsplash.com/photo-1560066984-138dadb4c035";

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0">
        <LazyImage
          src={`${imageUrl}?w=1600&h=900&fit=crop&auto=format&quality=75`}
          alt="Modern Salon Interior"
          eager={true}
          wrapperClassName="w-full h-full"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/60 via-orange-900/50 to-stone-900/60" />
      </div>
      <div className="relative h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl text-white">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold mb-4 lg:mb-6 leading-tight">
              Your Beauty,<br/>Our Priority
            </h1>
            <p className="text-sm sm:text-lg lg:text-xl mb-6 lg:mb-8 text-amber-50">
              Experience luxury treatments in a serene and elegant atmosphere.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 lg:gap-4">
              <a href="/services" className="bg-gradient-to-r from-amber-600 to-orange-700 hover:from-amber-700 hover:to-orange-800 transition px-6 lg:px-8 py-2.5 lg:py-3 rounded-full font-semibold text-center shadow-lg hover:shadow-xl text-sm sm:text-base">
                View Services
              </a>
              <a href="tel:+6281234567890" className="border-2 border-white hover:bg-white hover:text-amber-900 transition px-6 lg:px-8 py-2.5 lg:py-3 rounded-full font-semibold text-center text-sm sm:text-base">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}