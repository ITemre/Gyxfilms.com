'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Send, Instagram, Mail, MapPin } from 'lucide-react';

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

export default function Contact() {
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
    <main className="min-h-screen bg-black text-white py-16 px-4 mt-10">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto"
      >
        <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-center">Kontaktiere uns</h1>
        <p className="text-lg text-white/70 text-center mb-12">
          Lass uns gemeinsam dein nächstes Videoprojekt zum Leben erwecken
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Formular Sektion */}
          <motion.form 
            onSubmit={handleSubmit}
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div className="space-y-6">
              {formFields.map((field) => (
                <motion.div 
                  key={field.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <label className="block text-sm font-medium mb-2">
                    {field.label}
                  </label>
                  {field.type === 'select' ? (
                    <select
                      name={field.id}
                      value={formState[field.id]}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg bg-black/90 border border-white/20 
                               focus:border-white/40 focus:ring-2 focus:ring-white/20 transition-colors
                               text-white"
                      required={!field.label.includes('optional')}
                    >
                      <option value="" className="bg-black text-white">Bitte wählen</option>
                      {field.options.map((option) => (
                        <option key={option} value={option} className="bg-black text-white">
                          {option}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={field.type}
                      name={field.id}
                      placeholder={field.placeholder}
                      value={formState[field.id]}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 
                               focus:border-white/40 focus:ring-2 focus:ring-white/20 transition-colors"
                      required={!field.label.includes('optional')}
                    />
                  )}
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <label className="block text-sm font-medium mb-2">
                Deine Nachricht
              </label>
              <textarea
                name="message"
                rows={4}
                value={formState.message}
                onChange={handleChange}
                placeholder="Beschreibe kurz deine Projektidee..."
                className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 
                         focus:border-white/40 focus:ring-2 focus:ring-white/20 transition-colors"
                required
              />
            </motion.div>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              className={`w-full px-8 py-3 rounded-lg bg-white text-black font-medium 
                flex items-center justify-center space-x-2 hover:bg-white/90 transition-colors
                ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Send className="w-4 h-4" />
              <span>{isSubmitting ? 'Wird gesendet...' : 'Nachricht senden'}</span>
            </motion.button>

            {status && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 rounded-lg ${
                  status === 'success' 
                    ? 'bg-green-500/20 border border-green-500/40' 
                    : 'bg-red-500/20 border border-red-500/40'
                }`}
              >
                <p className="text-sm">
                  {status === 'success'
                    ? 'Deine Nachricht wurde erfolgreich gesendet! Wir melden uns in Kürze bei dir.'
                    : 'Es gab einen Fehler beim Senden. Bitte versuche es erneut oder kontaktiere uns direkt per Email.'}
                </p>
              </motion.div>
            )}
          </motion.form>

          {/* Info Karte */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="bg-white/5 rounded-2xl p-8 space-y-8 h-fit"
          >
            <div>
              <h2 className="text-2xl font-semibold mb-4">Kontaktinformationen</h2>
              <div className="space-y-4">
                <a 
                  href="mailto:info@gyxfilms.com"
                  className="flex items-center space-x-3 text-white/70 hover:text-white transition-colors"
                >
                  <Mail className="w-5 h-5" />
                  <span>info@gyxfilms.com</span>
                </a>
                <a 
                  href="https://www.instagram.com/gyxfilms"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 text-white/70 hover:text-white transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                  <span>@gyxfilms</span>
                </a>
                <div className="flex items-center space-x-3 text-white/70">
                  <MapPin className="w-5 h-5" />
                  <span>Esslingen am Neckar</span>
                </div>
              </div>
            </div>

            {/* Google Maps Embed */}
            <div className="w-full h-64 rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d42281.589224589736!2d9.295216615869136!3d48.74121224999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4799c0d259ee4ccb%3A0x41ffd3c8d092980!2sEsslingen%20am%20Neckar!5e0!3m2!1sde!2sde!4v1701630222744!5m2!1sde!2sde"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">Über uns</h3>
              <p className="text-white/70 leading-relaxed">
                GYX Films ist dein Partner für professionelle Videoproduktionen in Esslingen und Umgebung. 
                Wir spezialisieren uns auf Imagefilme, Recruitingvideos und Musikvideos, 
                immer mit dem Ziel, deine Vision perfekt umzusetzen.
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </main>
  );
}