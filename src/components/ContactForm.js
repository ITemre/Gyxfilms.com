// components/contact/ContactForm.jsx
'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Send } from 'lucide-react';

const formFields = [
  { id: 'name', label: 'Name', type: 'text', placeholder: 'Dein Name' },
  { id: 'email', label: 'Email', type: 'email', placeholder: 'deine@email.com' },
  { id: 'phone', label: 'Telefon (optional)', type: 'tel', placeholder: '+49' },
  { id: 'projectType', label: 'Projektart', type: 'select', options: [
    'Imagefilm',
    'Recruitingvideo',
    'Musikvideo'
  ]},
];

export function ContactForm() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    message: '',
  });
  const [status, setStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formState,
          to: 'info@gyxfilms.com'
        }),
      });

      if (!response.ok) throw new Error('Fehler beim Senden');

      setStatus('success');
      setFormState({
        name: '',
        email: '',
        phone: '',
        projectType: '',
        message: '',
      });
    } catch (error) {
      console.error('Fehler:', error);
      setStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  return (
    <motion.form 
      onSubmit={handleSubmit}
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.6 }}
    >
      {/* Form fields */}
      {/* ... Rest des Formularcodes ... */}
    </motion.form>
  );
}
