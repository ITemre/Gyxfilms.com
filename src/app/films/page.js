'use client';

import { useState, useEffect, memo } from 'react';
import { Play } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import EndCard from '@/components/EndCard';


// Memoized VideoThumbnail Component
const VideoThumbnail = memo(({ vimeoId, title }) => {
  return (
    <div className="relative w-full h-full">
      <img
        src={`https://vumbnail.com/${vimeoId}.jpg`}
        className="absolute inset-0 w-full h-full rounded-xl object-cover"
        alt={title}
        loading="lazy"
      />
    </div>
  );
});

VideoThumbnail.displayName = 'VideoThumbnail';


const VideoModal = memo(({ isOpen, onClose, vimeoId, title }) => {
  const [isLoading, setIsLoading] = useState(true);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
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
          className="relative w-full max-w-7xl mt-10"
        >
          <div className="absolute top-0 left-0 right-0 h-16 flex items-center justify-between px-8 border-b border-white/10 bg-black">
            <h3 className="text-white/90 font-medium tracking-wide">{title}</h3>
            <button
              onClick={onClose}
              className="text-sm text-white/60 hover:text-white"
            >
              Schließen
            </button>
          </div>
          <div className="w-full aspect-video mt-16 relative">
            {/* Ladeindikator */}
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-10">
                {/* Hier können Sie Ihren eigenen Ladeindikator oder Spinner einfügen */}
                <div className="text-white">Lädt...</div>
              </div>
            )}
            <iframe
              src={`https://player.vimeo.com/video/${vimeoId}?badge=0&autopause=0&player_id=0&app_id=58479`}
              className="w-full h-full"
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              title={title}
              onLoad={() => setIsLoading(false)}
            />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
});

VideoModal.displayName = 'VideoModal';

// Memoized ProjectCard Component
const ProjectCard = memo(({ project, onClick, index }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Server-side und initiales Client Rendering
  if (!isMounted) {
    return (
      <div className="aspect-video rounded-xl bg-neutral-900">
        <VideoThumbnail 
          vimeoId={project.vimeoId} 
          title={project.title}
        />
      </div>
    );
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

        {/* Play Button */}
        <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="w-16 h-16 rounded-full border-2 border-white/30 bg-black/30 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
            <Play className="w-6 h-6 text-white ml-1" />
          </div>
        </div>

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
});

ProjectCard.displayName = 'ProjectCard';

// Memoized CategoryFilter Component
const CategoryFilter = memo(({ activeCategory, onCategoryChange, categories }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

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
});

CategoryFilter.displayName = 'CategoryFilter';

// Main Component
const FilmsPage = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [activeCategory, setActiveCategory] = useState('Alle');
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState(['Alle']);
  const [isMounted, setIsMounted] = useState(false);

  // Beispiel-Projekte
  const projectsData = [
    // Imagefilme
    {
      title: "Sindelfinger Tor",
      category: "Imagefilme",
      year: "2024",
      vimeoId: "946496568",
      description: "Imagefilm für das Sindelfinger Tor"
    },
    {
      title: "Social Natives",
      category: "Imagefilme",
      year: "2024",
      vimeoId: "1035389971",
      description: "Imagefilm für Social Natives"
    },
    {
      title: "Blood Diamond",
      category: "Imagefilme",
      year: "2024",
      vimeoId: "1035378255",
      description: "Imagefilm für Blood Diamond"
    },
    {
      title: "Franziska Schaschko",
      category: "Imagefilme",
      year: "2024",
      vimeoId: "1035392635",
      description: "Imagefilm für Franziska Schaschko"
    },
    // Recruiting Filme
    {
      title: "Netze BW",
      category: "Recruiting Videos",
      year: "2024",
      vimeoId: "1035387374",
      description: "Recruiting Film für Netze BW"
    },
    {
      title: "Sikotec",
      category: "Recruiting Videos",
      year: "2024",
      vimeoId: "929568264",
      description: "Recruiting Film für Sikotec"
    },
    {
      title: "Serways",
      category: "Recruiting Videos",
      year: "2024",
      vimeoId: "929551817",
      description: "Recruiting Film für Serways"
    },
    {
      title: "Stadt Münster",
      category: "Recruiting Videos",
      year: "2024",
      vimeoId: "929563691",
      description: "Recruiting Film für die Stadt Münster"
    },
    // Musikvideos
    {
      title: "Lux Et Umbra ft. Zheka333 - Lock",
      category: "Musikvideos",
      year: "2024",
      vimeoId: "946504363",
      description: "Offizielles Musikvideo für Lux Et Umbra ft. Zheka333"
    },
    {
      title: "Embo - Ring Ring Ring",
      category: "Musikvideos",
      year: "2024",
      vimeoId: "946501098",
      description: "Offizielles Musikvideo für Embo"
    },
    {
      title: "Lux et Umbra - Weg des Kriegers",
      category: "Musikvideos",
      year: "2024",
      vimeoId: "946506663",
      description: "Offizielles Musikvideo für Lux et Umbra"
    },
    {
      title: "Embo - Tabanca",
      category: "Musikvideos",
      year: "2024",
      vimeoId: "946508775",
      description: "Offizielles Musikvideo für Embo"
    }
  ];

  useEffect(() => {
    const loadProjects = () => {
      setProjects(projectsData);
      const uniqueCategories = ['Alle', ...new Set(projectsData.map(p => p.category))];
      setCategories(uniqueCategories);
      setIsMounted(true);
    };

    loadProjects();
  }, []);

  const filteredProjects = projects.filter(
    project => activeCategory === 'Alle' || project.category === activeCategory
  );

  // Server-side und initiales Client Rendering
  if (!isMounted) {
    return (
      <div className="min-h-screen bg-neutral-900 pt-20">
        <div className="w-full px-4 sm:px-8 pt-6 pb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="aspect-video rounded-xl bg-neutral-800 animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-neutral-900 pt-20"
    >
      <div className="sticky top-0 bg-neutral-900/80 backdrop-blur-sm border-b border-white/5">
        <div className="w-full px-4 sm:px-8 pt-8 pb-3">
          <div className="flex justify-center">
            <CategoryFilter
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
              categories={categories}
            />
          </div>
        </div>
      </div>

      <div className="w-full px-4 sm:px-8 pt-6 pb-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.vimeoId}
                project={project}
                onClick={() => setSelectedVideo(project)}
                index={index}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      <VideoModal
        isOpen={!!selectedVideo}
        onClose={() => setSelectedVideo(null)}
        vimeoId={selectedVideo?.vimeoId}
        title={selectedVideo?.title}
      />

      <EndCard 
        title="Kontaktieren Sie uns"
        description="Haben Sie Fragen oder benötigen Sie weitere Informationen? Kontaktieren Sie uns."
        link="/contact"
        buttonText="Jetzt kontaktieren"
      />
    </motion.main>
  );
};

export default FilmsPage;