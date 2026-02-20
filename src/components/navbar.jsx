import React, { useState, useLayoutEffect, useRef } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { gsap } from "gsap";
import Logo from "../assets/Logo.png"; 

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
    { path: "/summary", label: "Summary" },
  ];

  const calculateHeight = () => {
    if (!mobileMenuRef.current) return 0;
    mobileMenuRef.current.style.height = "auto";
    const height = mobileMenuRef.current.scrollHeight;
    mobileMenuRef.current.style.height = "0px";
    return height;
  };

  useLayoutEffect(() => {
    const menu = mobileMenuRef.current;
    if (!menu) return;

    gsap.set(menu, { height: 0, opacity: 0 });
    gsap.set(menuItemsRef.current, { y: 20, opacity: 0 });

    const tl = gsap.timeline({ paused: true });

    tl.to(menu, {
      height: calculateHeight,
      opacity: 1,
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
    return () => tl.kill();
  }, []);

  useLayoutEffect(() => {
    if (isOpen) {
      tlRef.current.reverse();
      setIsOpen(false);
    }
  }, [location.pathname]);

  const toggleMenu = () => {
    if (!tlRef.current) return;
    isOpen ? tlRef.current.reverse() : tlRef.current.play(0);
    setIsOpen(!isOpen);
  };

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 shadow-lg border-b border-amber-200 font-['Playfair_Display']">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 h-14 sm:h-16 md:h-20 lg:h-24 flex items-center justify-between">

        <Link to="/" className="flex items-center z-10">
          <img
            src={Logo}
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
                ${
                  isActive
                    ? "bg-gradient-to-r from-amber-600 to-orange-700 text-white shadow-lg"
                    : "text-amber-900 hover:bg-amber-200"
                }`
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

        <button
          onClick={toggleMenu}
          className="lg:hidden p-2 z-10 focus:outline-none"
          aria-label="Toggle Menu"
        >
          <div className="w-5 sm:w-6 h-4 flex flex-col justify-between">
            <span className={`h-0.5 bg-amber-900 transition-all duration-300 ${isOpen && "rotate-45 translate-y-[7px] sm:translate-y-[8px]"}`} />
            <span className={`h-0.5 bg-amber-900 transition-all duration-300 ${isOpen && "-rotate-45 -translate-y-[7px] sm:-translate-y-[8px]"}`} />
          </div>
        </button>
      </div>

      <div ref={mobileMenuRef} className="lg:hidden overflow-hidden">
        <div className="px-3 sm:px-4 pb-3 pt-1 max-h-[calc(100vh-3.5rem)] sm:max-h-[calc(100vh-4rem)] overflow-y-auto">
          {navLinks.map((link, i) => (
            <NavLink
              key={link.path}
              to={link.path}
              ref={el => (menuItemsRef.current[i] = el)}
              className={({ isActive }) =>
                `block px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg mb-1.5 sm:mb-2 font-semibold font-['Space_Grotesk'] text-xs sm:text-sm
                ${
                  isActive
                    ? "bg-gradient-to-r from-amber-600 to-orange-700 text-white shadow-md"
                    : "text-amber-900 hover:bg-amber-200"
                }`
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