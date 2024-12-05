'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { FaPlay } from 'react-icons/fa'; // Importiere das Play-Icon von react-icons

const EndCard = ({ title, description, link, buttonText }) => {
  return (
    <section className="py-16 sm:py-32 bg-neutral-900 w-full">
      <div className="w-full px-4 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto select-none"
        >
          <h2 className="text-xl sm:text-2xl text-white mb-6 tracking-wide">
            {title}
          </h2>
          <p className="text-base sm:text-lg text-white/60 mb-12 leading-relaxed">
            {description}
          </p>
          <div className="flex justify-center">
            <a 
              href={link}
              className="group inline-flex items-center gap-3 px-6 sm:px-8 py-4 bg-white text-black 
                       rounded-full hover:bg-white/90 transition-colors touch-none"
            >
              <span className="font-medium tracking-wide select-none">{buttonText}</span> {/* Dynamischer Button-Text */}
              <FaPlay className="w-5 h-5" /> {/* Verwende hier das Play-Icon */}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EndCard;