import React, { useState } from 'react';

export default function Home() {
  const [selectedService, setSelectedService] = useState(null);

  
  return (
    <div className="bg-white min-h-screen w-full">

      <section className="relative h-[500px] sm:h-[600px] w-full overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1600&h=900&fit=crop"
            alt="Modern Salon Interior"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-amber-900/80 to-orange-900/70"></div>
        </div>
        <div className="relative h-full flex items-center justify-center px-4">
          <div className="text-center text-white max-w-3xl">
            <h2 className="text-4xl sm:text-6xl font-bold mb-4 drop-shadow-lg">
              Your Beauty, Our Priority
            </h2>
            <p className="text-xl sm:text-2xl mb-8 drop-shadow-md">
              Experience luxury treatments in a serene atmosphere
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button className="bg-white text-amber-700 font-bold py-3 px-8 rounded-full text-lg transition transform hover:scale-105 shadow-xl hover:shadow-2xl">
                View Services
              </button>
              <button className="bg-transparent border-2 border-white text-white font-bold py-3 px-8 rounded-full text-lg transition transform hover:scale-105 hover:bg-white hover:text-amber-700">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </section>


      {/* Testimonials */}
      <section className="py-16 px-4 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-4xl font-bold text-center bg-gradient-to-r from-amber-600 to-orange-700 bg-clip-text text-transparent mb-12">
            What Our Clients Say
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              { name: 'Sarah Johnson', text: 'Amazing experience! The staff is professional and the atmosphere is so relaxing.', rating: 5 },
              { name: 'Emily Davis', text: 'Best salon in town! I always leave feeling beautiful and refreshed.', rating: 5 },
              { name: 'Jessica Miller', text: 'Highly recommend! The quality of service is exceptional.', rating: 5 },
            ].map((testimonial, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl shadow-lg">
                <div className="flex gap-1 mb-3 text-2xl">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i}>⭐</span>
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">"{testimonial.text}"</p>
                <p className="font-bold text-gray-800">{testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-amber-600 to-orange-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Transform Your Look?</h3>
          <p className="text-xl mb-8">Book your appointment today and experience luxury beauty care</p>
          <div className="flex flex-wrap gap-4 justify-center items-center">
            <button className="bg-white text-amber-700 font-bold py-3 px-8 rounded-full text-lg transition transform hover:scale-105 shadow-xl">
              Schedule Appointment
            </button>
            <a href="tel:+1234567890" className="flex items-center gap-2 text-white hover:text-amber-100 transition">
              <span className="text-xl">📞</span>
              <span className="font-semibold">(123) 456-7890</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 w-full">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-2xl">💇‍♀️</span>
                BookMySalon
              </h4>
              <p className="text-gray-400">Your premier destination for beauty and wellness services.</p>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="hover:text-amber-400 cursor-pointer transition">Services</li>
                <li className="hover:text-amber-400 cursor-pointer transition">About Us</li>
                <li className="hover:text-amber-400 cursor-pointer transition">Contact</li>
                <li className="hover:text-amber-400 cursor-pointer transition">Book Online</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">Contact Info</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center gap-2">
                  <span>📍</span>
                  123 Beauty Street, City
                </li>
                <li className="flex items-center gap-2">
                  <span>📞</span>
                  (123) 456-7890
                </li>
                <li className="flex items-center gap-2">
                  <span>⏰</span>
                  Mon-Sat: 9AM-8PM
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p className="mb-2">© 2024 BookMySalon. All rights reserved.</p>
            <p className="text-sm">Bringing beauty and wellness to your life</p>
          </div>
        </div>
      </footer>
    </div>
  );
}