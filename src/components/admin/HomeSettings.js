// components/admin/HomeSettings.js
'use client';
import { useState } from 'react';

export function HomeSettings({ content, onSave }) {
  const [formData, setFormData] = useState(content);

  const handleHeroFeatureChange = (index, field, value) => {
    const newFeatures = [...formData.hero.features];
    newFeatures[index] = {
      ...newFeatures[index],
      [field]: value
    };
    
    setFormData({
      ...formData,
      hero: {
        ...formData.hero,
        features: newFeatures
      }
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Homepage Einstellungen</h1>
        <button
          onClick={() => onSave(formData)}
          className="bg-white text-black px-4 py-2 rounded hover:bg-white/90"
        >
          Änderungen speichern
        </button>
      </div>

      {/* Hero Section */}
      <div className="bg-black p-6 rounded-lg border border-white/10">
        <h2 className="text-xl mb-4">Hero Bereich</h2>
        
        <div className="space-y-4 mb-6">
          <div className="grid grid-cols-2 gap-4">
            <label className="block">
              <span className="text-sm text-white/60 block mb-1">Desktop Video URL</span>
              <input
                type="text"
                value={formData.hero.videoSources.desktop}
                onChange={(e) => setFormData({
                  ...formData,
                  hero: {
                    ...formData.hero,
                    videoSources: {
                      ...formData.hero.videoSources,
                      desktop: e.target.value
                    }
                  }
                })}
                className="w-full p-2 rounded bg-neutral-800 border border-white/10"
              />
            </label>
            <label className="block">
              <span className="text-sm text-white/60 block mb-1">Mobile Video URL</span>
              <input
                type="text"
                value={formData.hero.videoSources.mobile}
                onChange={(e) => setFormData({
                  ...formData,
                  hero: {
                    ...formData.hero,
                    videoSources: {
                      ...formData.hero.videoSources,
                      mobile: e.target.value
                    }
                  }
                })}
                className="w-full p-2 rounded bg-neutral-800 border border-white/10"
              />
            </label>
          </div>

          <label className="block">
            <span className="text-sm text-white/60 block mb-1">Parallax Text</span>
            <input
              type="text"
              value={formData.hero.parallaxText}
              onChange={(e) => setFormData({
                ...formData,
                hero: {
                  ...formData.hero,
                  parallaxText: e.target.value
                }
              })}
              className="w-full p-2 rounded bg-neutral-800 border border-white/10"
            />
          </label>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg mb-2">Hero Features</h3>
          {formData.hero.features.map((feature, index) => (
            <div key={index} className="grid grid-cols-3 gap-4 p-4 bg-neutral-900 rounded">
              <input
                type="text"
                value={feature.icon}
                onChange={(e) => handleHeroFeatureChange(index, 'icon', e.target.value)}
                className="p-2 rounded bg-neutral-800 border border-white/10"
                placeholder="Icon"
              />
              <input
                type="text"
                value={feature.title}
                onChange={(e) => handleHeroFeatureChange(index, 'title', e.target.value)}
                className="p-2 rounded bg-neutral-800 border border-white/10"
                placeholder="Titel"
              />
              <input
                type="text"
                value={feature.description}
                onChange={(e) => handleHeroFeatureChange(index, 'description', e.target.value)}
                className="p-2 rounded bg-neutral-800 border border-white/10"
                placeholder="Beschreibung"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Comparison Section */}
      <div className="bg-black p-6 rounded-lg border border-white/10">
        <h2 className="text-xl mb-4">Vergleichs-Bereich</h2>
        
        <div className="space-y-4">
          <label className="block">
            <span className="text-sm text-white/60 block mb-1">Titel</span>
            <input
              type="text"
              value={formData.comparison.title}
              onChange={(e) => setFormData({
                ...formData,
                comparison: {
                  ...formData.comparison,
                  title: e.target.value
                }
              })}
              className="w-full p-2 rounded bg-neutral-800 border border-white/10"
            />
          </label>

          <label className="block">
            <span className="text-sm text-white/60 block mb-1">Beschreibung</span>
            <textarea
              value={formData.comparison.description}
              onChange={(e) => setFormData({
                ...formData,
                comparison: {
                  ...formData.comparison,
                  description: e.target.value
                }
              })}
              className="w-full p-2 rounded bg-neutral-800 border border-white/10 h-32"
            />
          </label>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-sm text-white/60 block mb-1">Vorher Video ID</span>
              <input
                type="text"
                value={formData.comparison.before.vimeoId}
                onChange={(e) => setFormData({
                  ...formData,
                  comparison: {
                    ...formData.comparison,
                    before: {
                      ...formData.comparison.before,
                      vimeoId: e.target.value
                    }
                  }
                })}
                className="w-full p-2 rounded bg-neutral-800 border border-white/10"
              />
            </div>
            <div>
              <span className="text-sm text-white/60 block mb-1">Nachher Video ID</span>
              <input
                type="text"
                value={formData.comparison.after.vimeoId}
                onChange={(e) => setFormData({
                  ...formData,
                  comparison: {
                    ...formData.comparison,
                    after: {
                      ...formData.comparison.after,
                      vimeoId: e.target.value
                    }
                  }
                })}
                className="w-full p-2 rounded bg-neutral-800 border border-white/10"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Cinematic Section */}
      <div className="bg-black p-6 rounded-lg border border-white/10">
        <h2 className="text-xl mb-4">Cinematic Bereich</h2>
        
        <div className="space-y-4">
          <label className="block">
            <span className="text-sm text-white/60 block mb-1">Titel</span>
            <input
              type="text"
              value={formData.cinematic.title}
              onChange={(e) => setFormData({
                ...formData,
                cinematic: {
                  ...formData.cinematic,
                  title: e.target.value
                }
              })}
              className="w-full p-2 rounded bg-neutral-800 border border-white/10"
            />
          </label>

          <label className="block">
            <span className="text-sm text-white/60 block mb-1">Beschreibung</span>
            <textarea
              value={formData.cinematic.description}
              onChange={(e) => setFormData({
                ...formData,
                cinematic: {
                  ...formData.cinematic,
                  description: e.target.value
                }
              })}
              className="w-full p-2 rounded bg-neutral-800 border border-white/10 h-32"
            />
          </label>

          <div className="grid grid-cols-2 gap-4">
            <label className="block">
              <span className="text-sm text-white/60 block mb-1">Button Text</span>
              <input
                type="text"
                value={formData.cinematic.buttonText}
                onChange={(e) => setFormData({
                  ...formData,
                  cinematic: {
                    ...formData.cinematic,
                    buttonText: e.target.value
                  }
                })}
                className="w-full p-2 rounded bg-neutral-800 border border-white/10"
              />
            </label>
            <label className="block">
              <span className="text-sm text-white/60 block mb-1">Link</span>
              <input
                type="text"
                value={formData.cinematic.link}
                onChange={(e) => setFormData({
                  ...formData,
                  cinematic: {
                    ...formData.cinematic,
                    link: e.target.value
                  }
                })}
                className="w-full p-2 rounded bg-neutral-800 border border-white/10"
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}