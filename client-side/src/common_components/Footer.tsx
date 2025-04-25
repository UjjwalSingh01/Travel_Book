import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto px-6 lg:px-20 w-full">
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 justify-between">
          {/* Company Info */}
          <div>
            <h2 className="text-2xl font-semibold">Travel Book</h2>
            <p className="mt-2 text-gray-400">
              Create and share your travel experiences with a beautifully curated digital book.
            </p>
          </div>

          <div className="flex flex-col justify-between gap-4 md:flex-row">
            {/* Navigation Links - Group 1 */}
            <div>
              <h3 className="text-xl font-medium">Quick Links</h3>
              <ul className="mt-3 space-y-2">
                <li><a href="/about" className="hover:text-gray-300">About Us</a></li>
                <li><a href="/services" className="hover:text-gray-300">Services</a></li>
                <li><a href="/contact" className="hover:text-gray-300">Contact</a></li>
              </ul>
            </div>

            {/* Navigation Links - Group 2 */}
            <div>
              <h3 className="text-xl font-medium">Policies</h3>
              <ul className="mt-3 space-y-2">
                <li><a href="/privacy-policy" className="hover:text-gray-300">Privacy Policy</a></li>
                <li><a href="/cookie-policy" className="hover:text-gray-300">Cookie Policy</a></li>
                <li><a href="/terms-of-agreement" className="hover:text-gray-300">Terms of Agreement</a></li>
              </ul>
            </div>
          </div>

          {/* Social Media Links */}
          <div className="flex flex-col items-center">
            <h3 className="text-xl font-medium">Follow Us</h3>
            <div className="mt-3 flex space-x-4">
              <a href="#" className="hover:text-gray-300 text-xl">
                <FaFacebookF />
              </a>
              <a href="#" className="hover:text-gray-300 text-xl">
                <FaTwitter />
              </a>
              <a href="#" className="hover:text-gray-300 text-xl">
                <FaInstagram />
              </a>
              <a href="#" className="hover:text-gray-300 text-xl">
                <FaLinkedinIn />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-8 border-t border-gray-700 pt-4 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Travel Book. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;