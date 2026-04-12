import React, { useState, useRef } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { gsap } from "gsap";
import LogoWebP from "../assets/Logo.webp"; // pastikan file WebP sudah ada

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const mobileMenuRef = useRef(null);
  const menuItemsRef = useRef([]);
  const tlRef = useRef(null);
  const location = useLocation();

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/services", label: "Services" },
    { path: "/booking", label: "Booking" },
  ];

  // toggle menu tanpa forced reflow: scaleY
  const toggleMenu = () => {
    if (!tlRef.current) {
      const tl = gsap.timeline({ paused: true });
      tl.to(mobileMenuRef.current, {
        scaleY: 1,
        opacity: 1,
        transformOrigin: "top",
        duration: 0.4,
        ease: "power3.out",
      }).to(
        menuItemsRef.current,
        {
          y: 0,
          opacity: 1,
          stagger: 0.06,
          duration: 0.3,
        },
        "-=0.2"
      );
      tlRef.current = tl;
    }
    isOpen ? tlRef.current.reverse() : tlRef.current.play(0);
    setIsOpen(!isOpen);
  };

  // close menu saat route berubah
  React.useEffect(() => {
    if (isOpen && tlRef.current) {
      tlRef.current.reverse();
      setIsOpen(false);
    }
  }, [location.pathname]);

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 shadow-lg border-b border-amber-200 font-['Playfair_Display']">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 h-14 sm:h-16 md:h-20 lg:h-24 flex items-center justify-between">
        <Link to="/" className="flex items-center z-10">
          <img
            src={LogoWebP}
            srcSet={`${LogoWebP} 1x, ${LogoWebP} 2x`}
            alt="Book My Salon"
            className="h-10 sm:h-12 md:h-16 lg:h-20 object-contain hover:scale-105 transition"
          />
        </Link>

        <div className="hidden lg:flex gap-1 xl:gap-2 absolute left-1/2 -translate-x-1/2">
          {navLinks.map(link => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `px-3 xl:px-5 py-2 rounded-full font-semibold transition transform hover:scale-105 font-['Space_Grotesk'] text-xs xl:text-base
                ${isActive ? "bg-gradient-to-r from-amber-600 to-orange-700 text-white shadow-lg" : "text-amber-900 hover:bg-amber-200"}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <Link
          to="/booking"
          className="hidden lg:flex bg-gradient-to-r from-amber-600 to-orange-700 text-white px-4 xl:px-6 py-2 rounded-full font-bold shadow-lg hover:scale-105 transition font-['Space_Grotesk'] text-xs xl:text-base whitespace-nowrap"
        >
          Book Now
        </Link>

        <button onClick={toggleMenu} className="lg:hidden p-2 z-10 focus:outline-none">
          <div className="w-5 sm:w-6 h-4 flex flex-col justify-between">
            <span className={`h-0.5 bg-amber-900 transition-all duration-300 ${isOpen && "rotate-45 translate-y-[7px] sm:translate-y-[8px]"}`} />
            <span className={`h-0.5 bg-amber-900 transition-all duration-300 ${isOpen && "-rotate-45 -translate-y-[7px] sm:-translate-y-[8px]"}`} />
          </div>
        </button>
      </div>

      <div
        ref={mobileMenuRef}
        className="lg:hidden overflow-hidden scale-y-0 opacity-0 transform origin-top"
        style={{ transformOrigin: "top" }}
      >
        <div className="px-3 sm:px-4 pb-3 pt-1">
          {navLinks.map((link, i) => (
            <NavLink
              key={link.path}
              to={link.path}
              ref={el => (menuItemsRef.current[i] = el)}
              className={({ isActive }) =>
                `block px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg mb-1.5 sm:mb-2 font-semibold font-['Space_Grotesk'] text-xs sm:text-sm
                ${isActive ? "bg-gradient-to-r from-amber-600 to-orange-700 text-white shadow-md" : "text-amber-900 hover:bg-amber-200"}`
              }
            >
              {link.label}
            </NavLink>
          ))}

          <Link
            to="/booking"
            ref={el => (menuItemsRef.current[navLinks.length] = el)}
            className="block text-center bg-gradient-to-r from-amber-600 to-orange-700 text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg font-bold font-['Space_Grotesk'] shadow-md text-xs sm:text-sm"
          >
            Book Appointment
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;