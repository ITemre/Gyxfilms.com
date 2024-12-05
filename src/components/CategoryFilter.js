// components/films/CategoryFilter.js
'use client';

import { motion } from 'framer-motion';

export function CategoryFilter({ activeCategory, onCategoryChange, categories }) {
  return (
    <div className="overflow-x-auto touch-pan-x pb-4 -mb-4">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.19, 1.0, 0.22, 1.0] }}
        className="flex items-center gap-1 p-1 rounded-full bg-neutral-900/50 backdrop-blur-sm w-fit min-w-max"
      >
        {categories.map((category) => (
          <motion.button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`px-6 py-2 rounded-full text-sm whitespace-nowrap tracking-wide transition-colors ${
              activeCategory === category
                ? 'bg-white text-black font-medium'
                : 'text-white/70 hover:text-white'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {category}
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
}