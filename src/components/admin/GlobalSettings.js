// components/admin/GlobalSettings.js
'use client';
import { useState } from 'react';

export function GlobalSettings({ content, onSave }) {
  const [formData, setFormData] = useState(content);

  const handleNavigationChange = (index, field, value) => {
    const newMenuItems = [...formData.navigation.menuItems];
    newMenuItems[index] = {
      ...newMenuItems[index],
      [field]: value
    };
    
    setFormData({
      ...formData,
      navigation: {
        ...formData.navigation,
        menuItems: newMenuItems
      }
    });
  };

  const handleSocialChange = (platform, value) => {
    setFormData({
      ...formData,
      footer: {
        ...formData.footer,
        social: {
          ...formData.footer.social,
          [platform]: value
        }
      }
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Globale Einstellungen</h1>
        <button
          onClick={() => onSave(formData)}
          className="bg-white text-black px-4 py-2 rounded hover:bg-white/90"
        >
          Änderungen speichern
        </button>
      </div>

      {/* Navigation Settings */}
      <div className="bg-black p-6 rounded-lg border border-white/10">
        <h2 className="text-xl mb-4">Navigation</h2>
        
        <div className="space-y-4 mb-6">
          <label className="block">
            <span className="text-sm text-white/60 block mb-1">Logo Text</span>
            <input
              type="text"
              value={formData.navigation.logo}
              onChange={(e) => setFormData({
                ...formData,
                navigation: {
                  ...formData.navigation,
                  logo: e.target.value
                }
              })}
              className="w-full p-2 rounded bg-neutral-800 border border-white/10"
            />
          </label>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg mb-2">Menü-Einträge</h3>
          {formData.navigation.menuItems.map((item, index) => (
            <div key={index} className="flex gap-4">
              <input
                type="text"
                value={item.title}
                onChange={(e) => handleNavigationChange(index, 'title', e.target.value)}
                className="flex-1 p-2 rounded bg-neutral-800 border border-white/10"
                placeholder="Titel"
              />
              <input
                type="text"
                value={item.href}
                onChange={(e) => handleNavigationChange(index, 'href', e.target.value)}
                className="flex-1 p-2 rounded bg-neutral-800 border border-white/10"
                placeholder="Link (z.B. /about)"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Footer Settings */}
      <div className="bg-black p-6 rounded-lg border border-white/10">
        <h2 className="text-xl mb-4">Footer</h2>
        
        <div className="space-y-4 mb-6">
          <h3 className="text-lg mb-2">Social Media Links</h3>
          <div className="grid grid-cols-2 gap-4">
            <label className="block">
              <span className="text-sm text-white/60 block mb-1">Instagram</span>
              <input
                type="text"
                value={formData.footer.social.instagram}
                onChange={(e) => handleSocialChange('instagram', e.target.value)}
                className="w-full p-2 rounded bg-neutral-800 border border-white/10"
              />
            </label>
            <label className="block">
              <span className="text-sm text-white/60 block mb-1">LinkedIn</span>
              <input
                type="text"
                value={formData.footer.social.linkedin}
                onChange={(e) => handleSocialChange('linkedin', e.target.value)}
                className="w-full p-2 rounded bg-neutral-800 border border-white/10"
              />
            </label>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg mb-2">Credits</h3>
          <div className="grid gap-4">
            <label className="block">
              <span className="text-sm text-white/60 block mb-1">Copyright Text</span>
              <input
                type="text"
                value={formData.footer.copyright}
                onChange={(e) => setFormData({
                  ...formData,
                  footer: {
                    ...formData.footer,
                    copyright: e.target.value
                  }
                })}
                className="w-full p-2 rounded bg-neutral-800 border border-white/10"
              />
            </label>
            <label className="block">
              <span className="text-sm text-white/60 block mb-1">Credits Text</span>
              <input
                type="text"
                value={formData.footer.credits.text}
                onChange={(e) => setFormData({
                  ...formData,
                  footer: {
                    ...formData.footer,
                    credits: {
                      ...formData.footer.credits,
                      text: e.target.value
                    }
                  }
                })}
                className="w-full p-2 rounded bg-neutral-800 border border-white/10"
              />
            </label>
            <label className="block">
              <span className="text-sm text-white/60 block mb-1">Credits Link</span>
              <input
                type="text"
                value={formData.footer.credits.link}
                onChange={(e) => setFormData({
                  ...formData,
                  footer: {
                    ...formData.footer,
                    credits: {
                      ...formData.footer.credits,
                      link: e.target.value
                    }
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