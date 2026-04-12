
import React, { useState, useEffect, useRef } from "react";


export default function WhyChooseUsSection() {
  const features = [
    { icon: "✨", title: "Professional Team", text: "Experienced beauticians with international certifications" },
    { icon: "🏆", title: "Premium Products", text: "Only the best quality products for your treatments" },
    { icon: "💎", title: "Luxury Experience", text: "Elegant ambiance designed for your comfort and relaxation" },
  ];

  return (
    <section className="py-12 lg:py-20 bg-gradient-to-br from-amber-50 via-orange-50 to-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-8 lg:mb-12 text-amber-900">
          Why Choose Us
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8">
          {features.map((item, i) => (
            <div key={i} className="bg-white p-6 lg:p-8 rounded-2xl shadow-md hover:shadow-xl transition hover:-translate-y-1 border border-amber-100">
              <div className="text-4xl lg:text-5xl mb-4">{item.icon}</div>
              <h3 className="text-xl lg:text-2xl font-bold mb-2 text-amber-900">{item.title}</h3>
              <p className="text-sm lg:text-base text-stone-600">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}