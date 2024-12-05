'use client'



import { motion, useInView } from 'framer-motion';
import { Film, Camera, Mic, Star, Play } from 'lucide-react';
import { useRef, useState, memo } from 'react';
import Link from 'next/link';
import EndCard from '@/components/EndCard';

// Memoized VideoThumbnail Component
const VideoThumbnail = memo(({ vimeoId }) => {
  return (
    <div className="relative w-full h-full">
      <img
        src={`https://vumbnail.com/${vimeoId}.jpg`}
        className="absolute inset-0 w-full h-full rounded-xl object-cover"
        alt="Video thumbnail"
        loading="lazy"
      />
    </div>
  );
});

VideoThumbnail.displayName = 'VideoThumbnail';

// Memoized Modal Component
const VideoModal = memo(({ isOpen, onClose, vimeoId, title }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-8 bg-black/98"
      onClick={(e) => e.target === e.currentTarget && onClose()}
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
      <div className="w-full max-w-7xl aspect-video">
        <iframe
          src={`https://player.vimeo.com/video/${vimeoId}?badge=0&autopause=0&player_id=0&app_id=58479`}
          className="w-full h-full rounded-xl"
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          title={title}
        />
      </div>
    </div>
  );
});

VideoModal.displayName = 'VideoModal';

const FeatureSection = ({ feature, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.3 });
  const [selectedVideo, setSelectedVideo] = useState(null);

  return (
    <section 
      ref={ref} 
      className={`snap-start relative overflow-hidden py-16 bg-black/20 ${index === 0 ? 'mt-10' : ''}`}
    >
      <div className="container mx-auto px-4 relative z-20 max-w-5xl">
        {/* Header with Icon */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
              {feature.icon}
            </div>
          </div>
          
          <h2 className="text-4xl font-bold text-white mb-4">
            {feature.title}
          </h2>
          
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            {feature.description}
          </p>
        </motion.div>

        {/* Video Thumbnail Section */}
        <motion.div 
          className="mb-12 cursor-pointer group relative aspect-video bg-black/20 rounded-xl overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          onClick={() => setSelectedVideo({ vimeoId: feature.videoId, title: feature.title })}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/90 z-10 rounded-xl" />
          <div className="absolute inset-0 aspect-video">
            <div className="group-hover:hidden h-full">
              <VideoThumbnail vimeoId={feature.videoId} />
            </div>
            <div className="hidden group-hover:block h-full">
              <iframe
                src={`https://player.vimeo.com/video/${feature.videoId}?autoplay=1&loop=1&background=1&muted=1`}
                className="w-full h-full rounded-xl"
                frameBorder="0"
                allow="autoplay; fullscreen"
              />
            </div>
          </div>
          
          <div className="absolute inset-0 z-20 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full border-2 border-white/30 flex items-center justify-center bg-black/30 backdrop-blur-sm group-hover:scale-110 transition-transform">
              <Play className="w-6 h-6 text-white ml-1" />
            </div>
          </div>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {feature.features.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.4, delay: 0.3 + idx * 0.1 }}
              className="flex items-start gap-4 backdrop-blur-sm bg-white/5 p-6 rounded-xl"
            >
              <Star className="w-6 h-6 text-white/40 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-medium text-white mb-2">{item.title}</h3>
                <p className="text-white/60">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* USPs Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-12">
          {feature.usps.map((usp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.4, delay: 0.6 + idx * 0.1 }}
              className="backdrop-blur-sm bg-white/5 p-4 rounded-xl text-center"
            >
              <div className="text-lg font-medium text-white mb-2">{usp.title}</div>
              <div className="text-sm text-white/60">{usp.description}</div>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <motion.div 
          className="flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.4, delay: 0.7 }}
        >
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-3 bg-white text-black rounded-full hover:bg-white/90 transition-colors flex items-center gap-2"
          >
            <Play className="w-5 h-5" />
            <Link href="/films">
              <span>Projekte ansehen</span>
            </Link>
          </motion.button>
        </motion.div>
      </div>

      <VideoModal
        isOpen={!!selectedVideo}
        onClose={() => setSelectedVideo(null)}
        vimeoId={selectedVideo?.vimeoId}
        title={selectedVideo?.title}
      />
    </section>
  );
};

export default function Services() {
  const services = [
    {
      title: "Imagefilme",
      description: "Professionelle Unternehmensvideos, die Ihre Marke authentisch präsentieren und Ihre Unternehmenswerte gezielt kommunizieren.",
      icon: <Film className="w-8 h-8 text-white" />,
      videoId: "946496568",
      features: [
        {
          title: "Storytelling & Konzeption",
          description: "Entwicklung einer maßgeschneiderten visuellen Strategie, die Ihre Unternehmenswerte perfekt transportiert."
        },
        {
          title: "Hochwertige Produktion",
          description: "Cinematische Bildsprache mit modernster Kameratechnik und professioneller Beleuchtung."
        },
        {
          title: "Mitarbeiter & Experten",
          description: "Authentische Interviews und professionelle Sprecherführung für glaubwürdige Botschaften."
        },
        {
          title: "Location & Styling",
          description: "Sorgfältige Auswahl der Drehorte und perfekte Inszenierung Ihrer Räumlichkeiten."
        }
      ],
      usps: [
        {
          title: "Full-Service",
          description: "Von der Konzeption bis zur finalen Auslieferung"
        },
        {
          title: "Festpreisgarantie",
          description: "Transparente Kosten ohne versteckte Extras"
        },
        {
          title: "Schnelle Umsetzung",
          description: "Fertigstellung innerhalb von 3-4 Wochen"
        }
      ]
    },
    {
      title: "Recruiting Videos",
      description: "Authentische Einblicke in Ihr Unternehmen, die potenzielle Mitarbeiter begeistern und Ihre Arbeitgebermarke stärken.",
      icon: <Camera className="w-8 h-8 text-white" />,
      videoId: "1035387374",
      features: [
        {
          title: "Authentische Einblicke",
          description: "Echte Mitarbeiter, echte Geschichten und authentische Momente aus dem Arbeitsalltag."
        },
        {
          title: "Employer Branding",
          description: "Strategische Positionierung Ihrer Arbeitgebermarke für maximale Attraktivität."
        },
        {
          title: "Social Media Optimierung",
          description: "Formatgerechte Aufbereitung für alle relevanten Plattformen und Kanäle."
        },
        {
          title: "Kandidatenansprache",
          description: "Zielgruppengerechte Ansprache und emotionale Aktivierung potenzieller Bewerber."
        }
      ],
      usps: [
        {
          title: "Kandidatengerecht",
          description: "Zielgruppenspezifische Ansprache für maximalen Erfolg"
        },
        {
          title: "Social Media Ready",
          description: "Optimiert für alle wichtigen Plattformen"
        },
        {
          title: "Employer Branding",
          description: "Stärkung Ihrer Arbeitgebermarke"
        }
      ]
    },
    {
      title: "Musikvideos",
      description: "Kreative und innovative Musikvideos, die Ihre musikalische Vision mit einzigartigen visuellen Konzepten zum Leben erwecken.",
      icon: <Mic className="w-8 h-8 text-white" />,
      videoId: "946501098",
      features: [
        {
          title: "Kreative Konzeption",
          description: "Entwicklung einzigartiger visueller Konzepte, die Ihre Musik perfekt in Szene setzen."
        },
        {
          title: "Performance Shots",
          description: "Dynamische Aufnahmen mit mehreren Kameras für maximale visuelle Impact."
        },
        {
          title: "Visual Effects",
          description: "Kreative Nachbearbeitung mit modernsten VFX und Animation nach Bedarf."
        },
        {
          title: "Farbkorrektur",
          description: "Professionelles Color Grading für einen cinematischen Look."
        }
      ],
      usps: [
        {
          title: "Kreative Freiheit",
          description: "Innovative Konzepte und künstlerische Umsetzung"
        },
        {
          title: "Technische Perfektion",
          description: "Modernste Kamera- und Produktionstechnik"
        },
        {
          title: "Komplettpaket",
          description: "Von der Idee bis zum fertigen Video"
        }
      ]
    }
  ];

  return (
    <main className="min-h-screen bg-black">
      {services.map((service, index) => (
        <FeatureSection 
          key={index} 
          feature={service} 
          index={index}
        />
      ))}
      
      <EndCard 
        title="Unsere Filme"
        description="Sehen Sie sich unser Portfolio an beeindruckenden Filmen und Projekten an."
        link="/films"
        buttonText="Filme ansehen"
      />
    </main>
  );
}