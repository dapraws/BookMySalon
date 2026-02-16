import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="bg-white min-h-screen w-full">

      {/* HERO - Adjusted for small windows */}
      <section className="relative h-[calc(100vh-3.5rem)] sm:h-[calc(100vh-4rem)] md:h-[calc(100vh-5rem)] lg:h-screen w-full overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1600&h=900&fit=crop"
            alt="Modern Salon Interior"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-amber-900/60 via-orange-900/50 to-stone-900/60" />
        </div>

        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-2xl text-white">

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 lg:mb-6 leading-tight">
                Your Beauty,
                <br />
                Our Priority
              </h1>

              <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-4 sm:mb-6 lg:mb-8 text-amber-50">
                Experience luxury treatments in a serene and elegant atmosphere.
                Professional care tailored just for you.
              </p>

              <div className="flex flex-col xs:flex-row gap-2 sm:gap-3 lg:gap-4">
                <Link
                  to="/services"
                  className="bg-gradient-to-r from-amber-600 to-orange-700 hover:from-amber-700 hover:to-orange-800 transition px-5 sm:px-6 lg:px-8 py-2 sm:py-2.5 lg:py-3 rounded-full font-semibold text-center shadow-lg hover:shadow-xl text-sm sm:text-base"
                >
                  View Services
                </Link>

                <a
                  href="tel:+6281234567890"
                  className="border-2 border-white hover:bg-white hover:text-amber-900 transition px-5 sm:px-6 lg:px-8 py-2 sm:py-2.5 lg:py-3 rounded-full font-semibold text-center text-sm sm:text-base"
                >
                  Contact Us
                </a>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-8 sm:py-12 lg:py-16 xl:py-20 bg-gradient-to-br from-amber-50 via-orange-50 to-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-6 sm:mb-8 lg:mb-12 text-amber-900">
            Why Choose Us
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {[
              {
                icon: "✨",
                title: "Professional Team",
                text: "Experienced beauticians with international certifications"
              },
              {
                icon: "🏆",
                title: "Premium Products",
                text: "Only the best quality products for your treatments"
              },
              {
                icon: "💎",
                title: "Luxury Experience",
                text: "Elegant ambiance designed for your comfort and relaxation"
              }
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white p-4 sm:p-6 lg:p-8 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 border border-amber-100"
              >
                <div className="text-3xl sm:text-4xl lg:text-5xl mb-3 sm:mb-4">{item.icon}</div>
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2 sm:mb-3 text-amber-900">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm lg:text-base text-stone-600">
                  {item.text}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-8 sm:py-12 lg:py-16 xl:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-6 sm:mb-8 lg:mb-16 text-amber-900">
            What Our Clients Say
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 xl:gap-10">
            {[
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
            ].map((item, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-amber-50 to-orange-50 p-4 sm:p-6 lg:p-8 rounded-2xl shadow-md hover:shadow-xl transition border border-amber-200"
              >
                <div className="mb-3 sm:mb-4 text-amber-500 text-base sm:text-lg lg:text-xl">★★★★★</div>
                <p className="text-xs sm:text-sm lg:text-base text-stone-700 mb-3 sm:mb-4 lg:mb-6 italic leading-relaxed">
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


      {/* CTA */}
      <section className="py-8 sm:py-12 lg:py-16 xl:py-20 bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6">

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 lg:mb-6">
            Ready to Transform Your Look?
          </h2>

          <p className="text-sm sm:text-base lg:text-lg mb-4 sm:mb-6 lg:mb-8 text-amber-50">
            Book your appointment today and enjoy premium beauty treatments.
          </p>

          <Link
            to="/booking"
            className="inline-block bg-white text-amber-900 px-6 sm:px-8 lg:px-10 py-2.5 sm:py-3 lg:py-4 rounded-full font-semibold hover:scale-105 transition shadow-lg hover:shadow-xl text-sm sm:text-base lg:text-lg"
          >
            Schedule Appointment
          </Link>

        </div>
      </section>

    </div>
  );
}