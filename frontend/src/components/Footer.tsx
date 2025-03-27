import React from 'react';
import { MapPin, Phone, Mail, Instagram, Facebook, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">EventSphere</h3>
            <p className="text-gray-400">
              Making your special moments unforgettable across India.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <div className="space-y-2">
              <p className="flex items-center"><MapPin className="h-5 w-5 mr-2" /> Nadiad, Gujarat, India</p>
              <p className="flex items-center"><Phone className="h-5 w-5 mr-2" /> +91 98765 43210</p>
              <p className="flex items-center"><Mail className="h-5 w-5 mr-2" /> contact@eventsphere.in</p>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-purple-400">About Us</a></li>
              <li><a href="#" className="hover:text-purple-400">Services</a></li>
              <li><a href="#" className="hover:text-purple-400">Portfolio</a></li>
              <li><a href="#" className="hover:text-purple-400">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-purple-400"><Instagram className="h-6 w-6" /></a>
              <a href="#" className="hover:text-purple-400"><Facebook className="h-6 w-6" /></a>
              <a href="#" className="hover:text-purple-400"><Twitter className="h-6 w-6" /></a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">© 2025 EventSphere. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}