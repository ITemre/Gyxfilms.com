  'use client'
  
  import React, { useState, useEffect, useRef } from 'react';
  import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
  import { ChevronDown, Camera, Film, Play, Award, Users } from 'lucide-react';

  const VideoBackground = () => {
    const [isMobile, setIsMobile] = useState(false);
    const videoRef = useRef(null);

    useEffect(() => {
      const checkMobile = () => {
        setIsMobile(window.innerWidth <= 768);
      };
      checkMobile();
      window.addEventListener('resize', checkMobile);
      return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const videoSource = isMobile ? '/9zu16.mp4' : '/16zu9.mp4';

    return (
      <div className="absolute inset-0 bg-black z-0">
        <div className="absolute inset-0 overflow-hidden">
          <video
            key={videoSource}
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            className="absolute w-full h-full object-cover"
          >
            <source src={videoSource} type="video/mp4" />
          </video>
        </div>
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px]" />
      </div>
    );
  };

  const LogoAnimation = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
      target: ref,
      offset: ["start start", "end start"]
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
            opacity: opacityValue
          }}
        >
          <motion.img
            src="/gyxicon.png"
            alt="GYX Logo"
            className="w-32 h-32 md:w-48 md:h-48 object-contain"
            initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
            animate={{
              opacity: 1,
              scale: 1,
              rotate: 0
            }}
            style={{
              filter: "brightness(0) invert(1)",
              rotate: rotateValue
            }}
            transition={{
              duration: 2,
              ease: "easeOut",
              delay: 0.5
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

  const FeatureCard = ({ icon: Icon, title, description, index }) => {
    const cardRef = useRef(null);
    const { scrollYProgress } = useScroll({
      target: cardRef,
      offset: ["start end", "center center"]
    });

    const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
    const x = useTransform(scrollYProgress, [0, 1], [100, 0]);

    return (
      <motion.div
        ref={cardRef}
        className="bg-black/40 backdrop-blur-lg p-6 rounded-lg border border-white/10"
        style={{ opacity, x }}
      >
        <Icon className="w-8 h-8 mb-4 text-white" />
        <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
        <p className="text-gray-300">{description}</p>
      </motion.div>
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
          repeatType: "reverse",
          repeatDelay: 1
        }}
      >
        <ChevronDown className="w-8 h-8 animate-bounce" />
        <span className="sr-only">Scroll down</span>
      </motion.div>
    );
  };

  const ParallaxText = () => {
    const textRef = useRef(null);
    const { scrollYProgress } = useScroll({
      target: textRef,
      offset: ["start end", "end start"]
    });

    const x = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);

    return (
      <motion.div
        ref={textRef}
        className="flex items-center justify-center overflow-hidden whitespace-nowrap py-8 text-4xl md:text-6xl font-bold text-white/80"
        style={{ x, opacity }}
      >
        Deine Geschichte in einem Film
      </motion.div>
    );
    
  };

  const HeroSection = () => {
    const features = [
      {
        icon: Camera,
        title: "Hochwertige Produktion",
        description: "Modernste Ausrüstung für beste Bildqualität"
      },
      {
        icon: Film,
        title: "Kreative Visionen",
        description: "Einzigartige Perspektiven und innovative Konzepte"
      },
      {
        icon: Play,
        title: "Dynamische Inhalte",
        description: "Fesselnde Geschichten, die bewegen"
      },
      {
        icon: Award,
        title: "Ausgezeichnete Qualität",
        description: "Höchste Standards in jedem Projekt"
      }
    ];

    return (
      <>
        <section className="relative min-h-[200vh] w-full overflow-hidden bg-black text-white">
          <VideoBackground />
          <LogoAnimation />
          <ScrollIndicator />
          
          <div className="relative pt-screen">
            <ParallaxText />
            
            <div className="container mx-auto px-4 py-16">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
                {features.map((feature, index) => (
                  <FeatureCard key={index} {...feature} index={index} />
                ))}
              </div>
            </div>
          </div>
        </section>
      </>
    );
  };

  export default HeroSection;