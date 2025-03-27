import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Sparkles } from "lucide-react";
import { useAuth } from "../AuthContext";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
    setIsOpen(false);
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <Sparkles className="h-8 w-8 text-purple-600" />
            <span className="ml-2 text-xl font-bold text-gray-800">EventSphere</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-600 hover:text-purple-600">Home</Link>
            <Link to="/events" className="text-gray-600 hover:text-purple-600">Events</Link>
            <Link to="/bookings" className="text-gray-600 hover:text-purple-600">Bookings</Link>
            <Link to="/book" className="text-gray-600 hover:text-purple-600">Book Event</Link>

            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700"
              >
                Logout
              </button>
            ) : (
              <>
                <Link to="/login" className="text-gray-600 hover:text-purple-600">Login</Link>
                <Link
                  to="/register"
                  className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-gray-600 hover:text-purple-600">
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="block px-3 py-2 text-gray-600 hover:text-purple-600" onClick={() => setIsOpen(false)}>Home</Link>
            <Link to="/events" className="block px-3 py-2 text-gray-600 hover:text-purple-600" onClick={() => setIsOpen(false)}>Events</Link>
            <Link to="/bookings" className="block px-3 py-2 text-gray-600 hover:text-purple-600" onClick={() => setIsOpen(false)}>Bookings</Link>
            <Link to="/book" className="block px-3 py-2 text-gray-600 hover:text-purple-600" onClick={() => setIsOpen(false)}>Book Event</Link>

            {isAuthenticated ? (
              <button onClick={handleLogout} className="block w-full text-left px-3 py-2 bg-red-600 text-white rounded-md">
                Logout
              </button>
            ) : (
              <>
                <Link to="/login" className="block px-3 py-2 text-gray-600 hover:text-purple-600" onClick={() => setIsOpen(false)}>Login</Link>
                <Link to="/register" className="block px-3 py-2 bg-purple-600 text-white rounded-md" onClick={() => setIsOpen(false)}>Register</Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
