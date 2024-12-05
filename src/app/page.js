// src/app/page.js
import { getContent } from '@/utils/contentLoader';
import ComparisonSection from '@/components/ComparisonSection';
import HeroSection from '@/components/HeroSection';
import CinematicSection from '@/components/EndCard';

export default function Home() {
  const content = getContent('home');
  
  return (
    <main className="bg-black">
      <div className="relative w-full">
        <HeroSection 
          videoSources={content.hero.videoSources}
          logo={content.hero.logo}
          title={content.hero.title}
          parallaxText={content.hero.parallaxText}
          features={content.hero.features}
        />

        <section id="comparisons" className="py-16 sm:py-32 w-full">
          <div className="w-full px-4 sm:px-8">
            <div className="max-w-7xl mx-auto">
              <ComparisonSection 
                title={content.comparison.title}
                description={content.comparison.description}
                before={content.comparison.before}
                after={content.comparison.after}
              />
            </div>
          </div>
        </section>

        <CinematicSection 
          title={content.cinematic.title}
          description={content.cinematic.description}
          link={content.cinematic.link}
          buttonText={content.cinematic.buttonText}
        />
      </div>
    </main>
  );
}