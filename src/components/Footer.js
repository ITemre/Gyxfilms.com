'use client';
import Link from 'next/link';
import { FaInstagram, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1A1A1A] border-t border-white/5">
      <div className="container mx-auto px-4 py-8 flex flex-col items-center">
        {/* Social Media Icons */}
        <div className="flex space-x-4 mb-4">
          <a 
            href="https://instagram.com/gyxfilms" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-white hover:text-gray-400"
          >
            <FaInstagram className="w-6 h-6" />
          </a>
       
        </div>

        {/* Navigation Links */}
        <div className="flex space-x-4 mb-4">
          <Link href="/impressum" className="text-white hover:text-gray-400 text-sm">
            Impressum
          </Link>
          <Link href="/contact" className="text-white hover:text-gray-400 text-sm">
            Kontakt
          </Link>
        </div>

        {/* Copyright Section */}
        <p className="text-white/40 text-sm mb-2">
          © {currentYear} GYX Films. Alle Rechte vorbehalten.
        </p>
    
        <p className="text-white/40 text-sm">
          Programmierung & Design: <a href="https://www.emre-it.com" className="text-white hover:underline">www.emre-it.com</a>
        </p>

      </div>
    </footer>
  );
}