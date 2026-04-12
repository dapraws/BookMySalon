import React, { useState, useEffect, useRef } from "react";
export default function CTASection() {
  return (
    <section className="py-12 lg:py-20 bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 text-white">
      <div className="max-w-4xl mx-auto text-center px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 lg:mb-6">
          Ready to Transform Your Look?
        </h2>
        <p className="text-sm sm:text-lg mb-6 lg:mb-8 text-amber-50">
          Book your appointment today and enjoy premium beauty treatments.
        </p>
        <a
          href="/booking"
          className="inline-block bg-white text-amber-900 px-8 lg:px-10 py-3 lg:py-4 rounded-full font-semibold hover:scale-105 transition shadow-lg hover:shadow-xl text-sm sm:text-base lg:text-lg"
        >
          Schedule Appointment
        </a>
      </div>
    </section>
  );
}