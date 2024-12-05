// src/app/page.js
import ComparisonSection from '@/components/ComparisonSection';
import HeroSection from '@/components/HeroSection';
import EndCard from '@/components/EndCard';

export default function Home() {
  const heroData = {
    videoSources: {
      mobile: "/9zu16.mp4",
      desktop: "/16zu9.mp4"
    },
    logo: {
      src: "/logo.png",
      alt: "GYX Logo"
    },
    title: "GYX FILMS",
    parallaxText: "Deine Geschichte in einem Film",
    features: [
      {
        icon: "Camera",
        title: "Hochwertige Produktion",
        description: "Modernste Ausrüstung für beste Bildqualität"
      },
      {
        icon: "Film",
        title: "Kreative Visionen",
        description: "Einzigartige Perspektiven und innovative Konzepte"
      },
      {
        icon: "Play",
        title: "Dynamische Inhalte",
        description: "Fesselnde Geschichten, die bewegen"
      },
      {
        icon: "Award",
        title: "Ausgezeichnete Qualität",
        description: "Höchste Standards in jedem Projekt"
      }
    ]
  };

  const comparisonData = {
    title: "Cineastische Perfektion durch professionelles Colorgrading",
    description: "Rohmaterial aus der Kamera ist wie ein ungeschliffener Diamant - voller Potential, aber noch nicht optimal. Durch präzises Colorgrading erwecken wir die Emotionen Ihrer Geschichte zum Leben.",
    before: {
      vimeoId: "1034620769",
      type: "Raw Footage"
    },
    after: {
      vimeoId: "1034620769",
      type: "Final Grade"
    }
  };

  const cinematicData = {
    title: "Über mich",
    description: "Erfahren Sie mehr über meine Vision, Leidenschaft und Erfahrung in der Videoproduktion.",
    link: "/about",
    buttonText: "Mehr erfahren"
  };

  return (
    <main className="bg-black">
      <div className="relative w-full">
        <HeroSection 
          videoSources={heroData.videoSources}
          logo={heroData.logo}
          title={heroData.title}
          parallaxText={heroData.parallaxText}
          features={heroData.features}
        />

        <section id="comparisons" className="py-16 sm:py-32 w-full">
          <div className="w-full px-4 sm:px-8">
            <div className="max-w-7xl mx-auto">
              <ComparisonSection 
                title={comparisonData.title}
                description={comparisonData.description}
                before={comparisonData.before}
                after={comparisonData.after}
              />
            </div>
          </div>
        </section>

        <EndCard 
          title={cinematicData.title}
          description={cinematicData.description}
          link={cinematicData.link}
          buttonText={cinematicData.buttonText}
        />
      </div>
    </main>
  );
}