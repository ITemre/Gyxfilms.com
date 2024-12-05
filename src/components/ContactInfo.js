// components/contact/ContactInfo.jsx
'use client';

import { motion } from 'framer-motion';
import { Instagram, Mail, MapPin } from 'lucide-react';

export function ContactInfo() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.4, duration: 0.6 }}
      className="bg-white/5 rounded-2xl p-8 space-y-8 h-fit"
    >
      {/* Info card content */}
      {/* ... Rest des Info-Karten-Codes ... */}
    </motion.div>
  );
}