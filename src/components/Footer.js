'use client';
import Link from 'next/link';
import { FaInstagram, FaLinkedin } from 'react-icons/fa';
import { getContent } from '@/utils/contentLoader';

export default function Footer() {
  const content = getContent();
  const { footer } = content.global;
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1A1A1A] border-t border-white/5">
      <div className="container mx-auto px-4 py-8 flex flex-col items-center">
        {/* Social Media Icons */}
        <div className="flex space-x-4 mb-4">
          <a href={footer.social.instagram} target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400">
            <FaInstagram className="w-6 h-6" />
          </a>
          <a href={footer.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400">
            <FaLinkedin className="w-6 h-6" />
          </a>
        </div>

        {/* Navigation Links */}
        <div className="flex space-x-4 mb-4">
          {footer.links.map((link) => (
            <Link 
              key={link.title}
              href={link.href} 
              className="text-white hover:text-gray-400 text-sm"
            >
              {link.title}
            </Link>
          ))}
        </div>

        {/* Copyright Section */}
        <p className="text-white/40 text-sm mb-2">
          {footer.copyright.replace('{year}', currentYear)}
        </p>
    
        <p className="text-white/40 text-sm">
          {footer.credits.text} <a href={footer.credits.link} className="text-white hover:underline">{footer.credits.linkText}</a>
        </p>

        <Link href="/login" className="text-white hover:text-gray-400 text-sm">
 
        </Link>
      </div>
    </footer>
  );
}