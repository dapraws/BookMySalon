import React, { useState, useEffect, useRef } from "react";
export default function TestimonialsSection() {
  const reviews = [
    {
      name: "Sarah Johnson",
      text: "Amazing experience! The staff is professional and the atmosphere is so relaxing.",
    },
    {
      name: "Emily Davis",
      text: "Best salon in town! I always leave feeling beautiful and refreshed.",
    },
    {
      name: "Jessica Miller",
      text: "Highly recommend! The quality of service is exceptional.",
    },
  ];

  return (
    <section className="py-12 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-8 lg:mb-16 text-amber-900">
          What Our Clients Say
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-10">
          {reviews.map((item, i) => (
            <div
              key={i}
              className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 lg:p-8 rounded-2xl shadow-md hover:shadow-xl transition border border-amber-200"
            >
              <div className="mb-4 text-amber-500 text-lg">★★★★★</div>
              <p className="text-sm lg:text-base text-stone-700 mb-4 lg:mb-6 italic leading-relaxed">
                "{item.text}"
              </p>
              <p className="font-semibold text-amber-900 text-sm sm:text-base">
                {item.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}