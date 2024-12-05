'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown, Camera, Film, Play, Award } from 'lucide-react';

const BackgroundImage = () => {
  return (
    <div
      className="absolute inset-0 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: 'url(/bg.jpg)' }}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px]" />
    </div>
  );
};

const LogoAnimation = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const rotateValue = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const scaleValue = useTransform(scrollYProgress, [0, 0.5], [1, 0.5]);
  const yValue = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacityValue = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div ref={ref} className="relative h-screen flex flex-col items-center justify-center">
      <motion.div
        className="flex flex-col items-center gap-6"
        style={{
          scale: scaleValue,
          y: yValue,
          opacity: opacityValue,
        }}
      >
        <motion.img
          src="/logo.webp"
          alt="GYX Logo"
          className="w-32 h-32 md:w-48 md:h-48 object-contain"
          initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
          animate={{
            opacity: 1,
            scale: 1,
            rotate: 0,
          }}
          style={{
            filter: 'brightness(0) invert(1)',
            rotate: rotateValue,
          }}
          transition={{
            duration: 2,
            ease: 'easeOut',
            delay: 0.5,
          }}
        />
        <motion.span
          className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-400"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          GYX FILMS
        </motion.span>
      </motion.div>
    </div>
  );
};

const ScrollIndicator = () => {
  return (
    <motion.div
      className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/70"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 1,
        delay: 2,
        repeat: Infinity,
        repeatType: 'reverse',
        repeatDelay: 1,
      }}
    >
      <ChevronDown className="w-8 h-8 animate-bounce" />
      <span className="sr-only">Scroll down</span>
    </motion.div>
  );
};

const HeroSection = () => {
  const features = [
    {
      icon: Camera,
      title: 'Hochwertige Produktion',
      description: 'Modernste Ausrüstung für beste Bildqualität',
    },
    {
      icon: Film,
      title: 'Kreative Visionen',
      description: 'Einzigartige Perspektiven und innovative Konzepte',
    },
    {
      icon: Play,
      title: 'Dynamische Inhalte',
      description: 'Fesselnde Geschichten, die bewegen',
    },
    {
      icon: Award,
      title: 'Ausgezeichnete Qualität',
      description: 'Höchste Standards in jedem Projekt',
    },
  ];

  return (
    <>
      <section className="relative min-h-screen w-full overflow-hidden bg-black text-white">
        <BackgroundImage />
        <LogoAnimation />
        <ScrollIndicator />
      </section>
      <section className="relative bg-black text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
            {features.map((feature, index) => (
              <div key={index} className="flex flex-col gap-4">
                <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold">{feature.title}</h3>
                <p className="text-white/70">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
