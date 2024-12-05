'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef } from 'react';
import EndCard from '@/components/EndCard';

const Timeline = () => {
  const timelineData = [
    { year: '2018', title: 'Gründung', description: 'Start unserer kreativen Reise' },
    { year: '2019', title: 'Erste Großprojekte', description: 'Durchbruch mit namhaften Kunden' },
    { year: '2020', title: 'Digitale Evolution', description: 'Anpassung an neue Herausforderungen' },
    { year: '2021', title: 'Team Expansion', description: 'Wachstum unseres kreativen Teams' },
    { year: '2023', title: 'Innovation Hub', description: 'Entwicklung neuer Videotechnologien' }
  ];

  return (
    <div className="relative w-full py-20">
      <div className="absolute left-1/2 top-0 h-full w-1 bg-white/20 transform -translate-x-1/2" />
      {timelineData.map((item, index) => (
        <motion.div
          key={item.year}
          initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
          className="relative flex w-full mb-16"
        >
          {index % 2 === 0 ? (
            // Linke Seite
            <div className="ml-auto mr-[calc(50%+2rem)] w-5/12 text-right">
              <h3 className="text-white text-2xl font-bold mb-2">{item.year}</h3>
              <h4 className="text-white/90 text-xl mb-1">{item.title}</h4>
              <p className="text-white/70">{item.description}</p>
            </div>
          ) : (
            // Rechte Seite
            <div className="ml-[calc(50%+2rem)] w-5/12 text-left">
              <h3 className="text-white text-2xl font-bold mb-2">{item.year}</h3>
              <h4 className="text-white/90 text-xl mb-1">{item.title}</h4>
              <p className="text-white/70">{item.description}</p>
            </div>
          )}
          <div className="absolute left-1/2 w-4 h-4 bg-white rounded-full transform -translate-x-1/2 top-2" />
        </motion.div>
      ))}
    </div>
  );
};

function AboutUs() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const profileScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);
  const profileOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.3]);

  useEffect(() => {
    const preloadVimeoScript = () => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'script';
      link.href = 'https://player.vimeo.com/api/player.js';
      document.head.appendChild(link);

      const script = document.createElement('script');
      script.src = 'https://player.vimeo.com/api/player.js';
      script.async = false;
      document.head.appendChild(script);
    };

    preloadVimeoScript();
    
    document.body.style.overscrollBehavior = 'none';
    document.documentElement.style.overscrollBehavior = 'none';

    return () => {
      document.body.style.overscrollBehavior = '';
      document.documentElement.style.overscrollBehavior = '';
    };
  }, []);

  return (
    <main className="bg-black" ref={containerRef}>
      <div className="relative w-full">
        <motion.section 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="min-h-screen flex flex-col items-center justify-center py-16 px-4"
        >
          <motion.div 
            style={{ scale: profileScale, opacity: profileOpacity }}
            className="relative mb-8 mt-10"
          >
            <div className="w-64 h-64 rounded-full overflow-hidden border-4 border-white/20">
              <img 
                src="/gyx.webp" 
                alt="Team GYX" 
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="max-w-3xl text-center"
          >
            <h1 className="text-4xl sm:text-5xl text-white font-bold mb-6">
              Kreativität trifft Innovation
            </h1>
            <p className="text-xl sm:text-2xl text-white/70 mb-8 leading-relaxed">
              Als leidenschaftliche Geschichtenerzähler durch visuelle Medien schaffen wir unvergessliche Momente, die Ihre Botschaft zum Leben erwecken.
            </p>
          </motion.div>
          <p className="text-white/50 text-sm">Scroll für mehr</p>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="mt-2"
            >
              ↓
            </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="absolute bottom-10 w-full text-center"
          >
         
          </motion.div>
        </motion.section>

        <section className="py-16 sm:py-32 w-full">
          <div className="w-full px-4 sm:px-8">
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-7xl mx-auto"
            >
              <h2 className="text-3xl sm:text-4xl text-white mb-16 text-center">Unsere Geschichte</h2>
              <Timeline />
            </motion.div>
          </div>
        </section>

        <EndCard 
          title="Unsere Leistungen"
          description="Entdecken Sie unsere umfassenden Dienstleistungen im Bereich Videoproduktion."
          link="/services"
          buttonText="Leistungen entdecken"
        />
      </div>
    </main>
  );
}

export default AboutUs;