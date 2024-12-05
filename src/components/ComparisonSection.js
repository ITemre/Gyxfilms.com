'use client'

import { motion } from 'framer-motion';
import React, { useState, useRef } from 'react';

const ComparisonSlider = ({ beforeContent, afterContent }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef(null);

  const handleMove = (event) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const percentage = (x / rect.width) * 100;

    setSliderPosition(Math.min(Math.max(percentage, 0), 100));
  };

  const handleTouchMove = (event) => {
    if (!containerRef.current || !event.touches[0]) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = event.touches[0].clientX - rect.left;
    const percentage = (x / rect.width) * 100;

    setSliderPosition(Math.min(Math.max(percentage, 0), 100));
  };

  return (
    <div
      ref={containerRef}
      className="relative aspect-video rounded-xl overflow-hidden bg-neutral-900 cursor-col-resize w-full max-w-[1400px] mx-auto"
      onMouseMove={handleMove}
      onTouchMove={handleTouchMove}
    >
      {/* After Content (Rechts/Nachher) */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/90 z-10" />
        <iframe
          src={`https://player.vimeo.com/video/${afterContent.vimeoId}?background=1&autoplay=1&loop=1&byline=0&title=0&muted=1`}
          className="absolute inset-0 w-full h-full"
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        />
        <div className="absolute bottom-0 right-0 p-6 z-30">
          <span className="text-white/70 text-sm">Nachher</span>
        </div>
      </div>

      {/* Before Content (Links/Vorher - mit Grayscale) */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/90 z-10" />
        <iframe
          src={`https://player.vimeo.com/video/${beforeContent.vimeoId}?background=1&autoplay=1&loop=1&byline=0&title=0&muted=1`}
          className="absolute inset-0 w-full h-full filter grayscale"
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        />
        <div className="absolute bottom-0 left-0 p-6 z-30">
          <span className="text-white/70 text-sm">Vorher</span>
        </div>
      </div>

      {/* Slider Handle */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-white cursor-col-resize z-40"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center">
          <div className="w-4 h-4 border-t-2 border-l-2 border-black -rotate-45" />
          <div className="w-4 h-4 border-t-2 border-r-2 border-black rotate-45" />
        </div>
      </div>
    </div>
  );
};

const AnimatedText = ({ children }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="text-white"
    >
      {children}
    </motion.div>
  );
};
const ComparisonSection = () => {
  const comparison = {
    title: "Cinematische Perfektion durch professionelles Colorgrading",
    before: {
      vimeoId: "1034620769",
      type: "Raw Footage"
    },
    after: {
      vimeoId: "1034620769",
      type: "Final Grade"
    },
    description: "Rohmaterial aus der Kamera ist wie ein ungeschliffener Diamant - voller Potential, aber noch nicht optimal. Durch präzises Colorgrading erwecken wir die Emotionen Ihrer Geschichte zum Leben. Wir optimieren Kontraste, harmonisieren Farben und schaffen eine kinoreife Atmosphäre, die Ihr Publikum in den Bann zieht. Jede Nuance wird sorgfältig abgestimmt, um genau die Stimmung zu erzeugen, die Ihre Message optimal transportiert. Von warmen, einladenden Tönen bis hin zu dramatischen Kontrasten - wir verwandeln Ihr Footage in ein visuelles Meisterwerk."
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="container mx-auto px-4"
    >
      <div className="space-y-8 max-w-4xl mx-auto mb-12">
        <div className="space-y-4 text-center">
          <h3 className="text-3xl text-white font-medium">{comparison.title}</h3>
          <p className="text-white/60 text-lg max-w-3xl mx-auto">{comparison.description}</p>
        </div>
      </div>

      <div className="w-full">
        <ComparisonSlider
          beforeContent={comparison.before}
          afterContent={comparison.after}
        />
      </div>
    </motion.div>
  );
};

export default ComparisonSection;