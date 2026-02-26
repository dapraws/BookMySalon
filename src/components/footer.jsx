import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Phone, Clock } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-stone-900 via-amber-900 to-stone-900 text-amber-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 mb-8 sm:mb-12">

          <div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4 font-['Space_Grotesk']">
              BookMySalon
            </h3>
            <p className="text-sm sm:text-base text-amber-100 leading-relaxed">
              Destinasi terpercaya untuk perawatan kecantikan & relaksasi.
              Nikmati layanan profesional dengan kualitas terbaik.
            </p>
          </div>

          <div>
            <h4 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <Link to="/" className="text-sm sm:text-base text-amber-100 hover:text-amber-300 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-sm sm:text-base text-amber-100 hover:text-amber-300 transition">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/booking" className="text-sm sm:text-base text-amber-100 hover:text-amber-300 transition">
                  Booking
                </Link>
              </li>
              <li>
                <Link to="/summary" className="text-sm sm:text-base text-amber-100 hover:text-amber-300 transition">
                  Summary
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">
              Contact Us
            </h4>
            <ul className="space-y-2 sm:space-y-3 text-amber-100">
              <li className="flex items-start gap-2 sm:gap-3 text-sm sm:text-base">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 mt-0.5 flex-shrink-0 text-amber-400" />
                <span>123 Beauty Street, City</span>
              </li>
              <li className="flex items-start gap-2 sm:gap-3 text-sm sm:text-base">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 mt-0.5 flex-shrink-0 text-amber-400" />
                <a href="tel:+6281234567890" className="hover:text-amber-300 transition">
                  +62 812-3456-7890
                </a>
              </li>
              <li className="flex items-start gap-2 sm:gap-3 text-sm sm:text-base">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 mt-0.5 flex-shrink-0 text-amber-400" />
                <span>Mon - Sat : 09.00 - 20.00</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-amber-800 pt-6 sm:pt-8 text-center">
          <p className="text-xs sm:text-sm text-amber-200">
            © {new Date().getFullYear()} BookMySalon. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;