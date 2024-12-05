// components/films/ProjectCard.js
'use client';

import { useState, useEffect } from 'react';
import { Play } from 'lucide-react';
import { motion } from 'framer-motion';
import { VideoThumbnail } from '@/components/video/VideoThumbnail';

export function ProjectCard({ project, onClick, index }) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  if (!isLoaded) {
    return <div className="aspect-video rounded-xl bg-neutral-900 animate-pulse" />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.19, 1.0, 0.22, 1.0]
      }}
      whileHover={{ y: -5 }}
      className="group cursor-pointer"
      onClick={onClick}
    >
      <div className="relative aspect-video rounded-xl overflow-hidden bg-neutral-900">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/90 z-10" />

        <VideoThumbnail 
          vimeoId={project.vimeoId} 
          title={project.title}
        />

        <motion.div 
          className="absolute inset-0 z-20 flex items-center justify-center"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div 
            className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
          >
            <Play className="w-5 h-5 text-white ml-0.5" />
          </motion.div>
        </motion.div>

        <div className="absolute bottom-0 left-0 right-0 p-6 z-30">
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-[13px] tracking-wide">
              <span className="text-white/70">{project.category}</span>
              <span className="w-1 h-1 rounded-full bg-white/40" />
              <span className="text-white/50 font-light">{project.year}</span>
            </div>
            <div className="space-y-1.5">
              <h3 className="text-lg text-white font-medium tracking-wide">
                {project.title}
              </h3>
              <p className="text-[13px] leading-relaxed text-white/60 font-light line-clamp-2">
                {project.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}