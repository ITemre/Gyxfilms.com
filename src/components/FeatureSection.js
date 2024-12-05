'use client';

import { Star, Play } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import { VideoThumbnail } from './VideoThumbnail';
import { VideoModal } from './VideoModal';
import { getContent } from '@/utils/contentLoader';

// Icon Mapping
const IconMap = {
  Star: Star,
  Play: Play,
  // Hier weitere Icons hinzufügen wie benötigt
};

export function FeatureSection({ featureId, index }) {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const content = getContent();
  
  // Finde das Feature anhand der ID
  const feature = content.features.find(f => f.id === featureId);
  
  if (!feature) return null;
  
  // Dynamisches Icon-Rendering
  const IconComponent = IconMap[feature.icon] || Star;

  return (
    <section 
      className={`snap-start relative overflow-hidden py-16 bg-black/20 ${index === 0 ? 'mt-10' : ''}`}
    >
      <div className="container mx-auto px-4 relative z-20 max-w-5xl">
        {/* Header with Icon */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
              <IconComponent className="w-8 h-8 text-white" />
            </div>
          </div>
          
          <h2 className="text-4xl font-bold text-white mb-4">
            {feature.title}
          </h2>
          
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            {feature.description}
          </p>
        </div>

        {/* Video Thumbnail Section */}
        <div 
          className="mb-12 cursor-pointer group relative aspect-video bg-black/20 rounded-xl overflow-hidden"
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
        </div>

        {/* Features Grid */}
        {feature.features && feature.features.length > 0 && (
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {feature.features.map((item, idx) => (
              <div
                key={idx}
                className="flex items-start gap-4 backdrop-blur-sm bg-white/5 p-6 rounded-xl"
              >
                <Star className="w-6 h-6 text-white/40 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-medium text-white mb-2">{item.title}</h3>
                  <p className="text-white/60">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* USPs Grid */}
        {feature.usps && feature.usps.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-12">
            {feature.usps.map((usp, idx) => (
              <div
                key={idx}
                className="backdrop-blur-sm bg-white/5 p-4 rounded-xl text-center"
              >
                <div className="text-lg font-medium text-white mb-2">{usp.title}</div>
                <div className="text-sm text-white/60">{usp.description}</div>
              </div>
            ))}
          </div>
        )}

        {/* CTA Button */}
        {feature.cta && (
          <div className="flex justify-center">
            <Link href={feature.cta.link || "/films"}>
              <button className="px-6 py-3 bg-white text-black rounded-full hover:bg-white/90 transition-colors flex items-center gap-2">
                <Play className="w-5 h-5" />
                <span>{feature.cta.text || "Projekte ansehen"}</span>
              </button>
            </Link>
          </div>
        )}
      </div>

      <VideoModal
        isOpen={!!selectedVideo}
        onClose={() => setSelectedVideo(null)}
        vimeoId={selectedVideo?.vimeoId}
        title={selectedVideo?.title}
      />
    </section>
  );
}