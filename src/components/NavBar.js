'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { getContent } from '@/utils/contentLoader';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const content = getContent();
  const { navigation } = content.global;
  const { contact } = content.global;

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1A1A1A]/80 backdrop-blur-lg border-b border-white/5">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <Link
              href="/"
              className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-[#E2E2E2] to-[#CCCCCC]"
            >
              {navigation.logo}
            </Link>

            <div className="hidden md:flex items-center gap-8">
              {navigation.menuItems.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="text-[#999999] hover:text-white transition-colors text-sm tracking-wide"
                >
                  {item.title}
                </Link>
              ))}
            </div>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden w-10 h-10 relative flex items-center justify-center"
              aria-label="Menu"
            >
              <motion.span
                animate={isOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -8 }}
                className="absolute w-6 h-px bg-white transform origin-center transition-transform"
              />
              <motion.span
                animate={isOpen ? { opacity: 0, scale: 0 } : { opacity: 1, scale: 1 }}
                className="absolute w-6 h-px bg-white"
              />
              <motion.span
                animate={isOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 8 }}
                className="absolute w-6 h-px bg-white transform origin-center transition-transform"
              />
            </motion.button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-40 md:hidden bg-[#1A1A1A]"
          >
            <div className="h-full flex flex-col pt-24 px-4">
              {navigation.menuItems.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="block py-4 text-2xl font-medium border-b border-white/10 text-white"
                  >
                    <div className="flex items-center justify-between">
                      <span>{item.title}</span>
                      <span className="text-sm text-white/30">0{index + 1}</span>
                    </div>
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-auto pb-8"
              >
                <div className="border-t border-white/10 pt-8">
                  <p className="text-sm text-white/50 mb-4">Kontaktieren Sie uns</p>
                  <a href={"mailto:'info@gyxfilms.com"} className="text-lg text-white">
  info@gyxfilms.com
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}