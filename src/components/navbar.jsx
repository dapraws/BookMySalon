import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    const isActive = (path) => {
        return location.pathname === path;
    };

    const navLinks = [
        { path: '/', label: 'Home' },
        { path: '/services', label: 'Services'},
        { path: '/booking', label: 'Booking' },
        { path: '/summary', label: 'Summary'},
    ];

    return (
        <nav className="bg-gradient-to-r from-amber-100 via-orange-100 to-amber-100 shadow-lg sticky top-0 z-50">
            <div className="container mx-4 px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-35">
                    <Link to="/" className="flex items-center space-x-3 group">
                        <div>
                            <img
                                src="src/assets/Logo.png"
                                alt="Book My Salon Logo"
                                className="h-24 sm:h-36 object-contain"
                            />
                        </div>
                    </Link>

                    <div className="hidden md:flex items-center space-x-2">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`flex items-center space-x-2 px-5 py-2.5 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                                    isActive(link.path)
                                        ? 'bg-gradient-to-r from-amber-600 to-orange-700 text-white shadow-lg'
                                        : 'text-amber-800 hover:bg-amber-200 hover:text-amber-900'
                                }`}
                            >
                                <span className="text-3xl">{link.icon}</span>
                                <span className="text-2xl">{link.label}</span>
                            </Link>
                        ))}
                    </div>

                    <div className="hidden md:block">
                        <Link
                            to="/booking"
                            className="bg-gradient-to-r from-amber-600 to-orange-700 text-white px-6 py-3 rounded-full font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-2"
                        >

                            <span className="text-2xl">Book Now</span>
                        </Link>
                    </div>

                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden text-amber-800 hover:text-amber-900 focus:outline-none p-2"
                    >
                        <svg
                            className="w-7 h-7"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            {isMobileMenuOpen ? (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            ) : (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu */}
                <div
                    className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
                        isMobileMenuOpen ? 'max-h-96 pb-4' : 'max-h-0'
                    }`}
                >
                    <div className="flex flex-col space-y-2 pt-2">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={`flex items-center space-x-3 px-4 py-3 rounded-lg font-semibold transition-all duration-300 ${
                                    isActive(link.path)
                                        ? 'bg-gradient-to-r from-amber-600 to-orange-700 text-white shadow-md'
                                        : 'text-amber-800 hover:bg-amber-200'
                                }`}
                            >
                                <span className="text-xl">{link.icon}</span>
                                <span className="text-lg">{link.label}</span>
                            </Link>
                        ))}
                        
                        <Link
                            to="/booking"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="bg-gradient-to-r from-amber-600 to-orange-700 text-white px-4 py-3 rounded-lg font-bold shadow-md flex items-center justify-center space-x-2 mt-2"
                        >
                            <span className="text-lg">Book Appointment</span>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;