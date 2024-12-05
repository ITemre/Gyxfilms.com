// components/video/VideoModal.js
'use client';

import { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const VideoModal = memo(({ isOpen, onClose, vimeoId, title }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-8 bg-black/98 mt-10"
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-7xl"
          >
            <div className="absolute top-0 left-0 right-0 h-16 flex items-center justify-between px-8 border-b border-white/10">
              <h3 className="text-white/90 font-medium tracking-wide">{title}</h3>
              <button
                onClick={onClose}
                className="text-sm text-white/60 hover:text-white"
              >
                Schließen
              </button>
            </div>
            <div className="w-full aspect-video mt-16">
              <iframe
                src={`https://player.vimeo.com/video/${vimeoId}?badge=0&autopause=0&player_id=0&app_id=58479`}
                className="w-full h-full rounded-xl"
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                title={title}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

VideoModal.displayName = 'VideoModal';