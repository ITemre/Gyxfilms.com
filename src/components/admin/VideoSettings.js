// components/admin/VideoSettings.js
'use client';
import { useState } from 'react';
import { PlusCircle, Trash2 } from 'lucide-react';

export function VideoSettings({ content, onSave }) {
  const [projects, setProjects] = useState(content.projects || []);
  const [categories, setCategories] = useState(['Imagefilme', 'Recruiting Videos', 'Musikvideos']);

  const addProject = (category) => {
    setProjects([
      ...projects,
      {
        title: "Neues Projekt",
        category: category,
        year: new Date().getFullYear().toString(),
        vimeoId: "",
        description: "Projektbeschreibung"
      }
    ]);
  };

  const removeProject = (index) => {
    setProjects(projects.filter((_, i) => i !== index));
  };

  const updateProject = (index, field, value) => {
    const newProjects = [...projects];
    newProjects[index] = {
      ...newProjects[index],
      [field]: value
    };
    setProjects(newProjects);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Video Verwaltung</h1>
        <button
          onClick={() => onSave({ projects })}
          className="bg-white text-black px-4 py-2 rounded hover:bg-white/90"
        >
          Alle Änderungen speichern
        </button>
      </div>

      {/* Kategorien */}
      {categories.map((category) => (
        <div key={category} className="bg-black p-6 rounded-lg border border-white/10">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl">{category}</h2>
            <button
              onClick={() => addProject(category)}
              className="text-white/60 hover:text-white flex items-center gap-2"
            >
              <PlusCircle size={20} />
              <span>Video hinzufügen</span>
            </button>
          </div>

          {/* Projekte in dieser Kategorie */}
          <div className="space-y-6">
            {projects
              .filter(project => project.category === category)
              .map((project, index) => (
                <div 
                  key={index} 
                  className="p-4 bg-neutral-900 rounded-lg border border-white/5 space-y-4"
                >
                  <div className="flex justify-between">
                    <h3 className="text-lg font-medium">{project.title}</h3>
                    <button
                      onClick={() => removeProject(index)}
                      className="text-red-500 hover:text-red-400"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-white/60 mb-1">Titel</label>
                      <input
                        type="text"
                        value={project.title}
                        onChange={(e) => updateProject(index, 'title', e.target.value)}
                        className="w-full p-2 rounded bg-neutral-800 border border-white/10"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-white/60 mb-1">Jahr</label>
                      <input
                        type="text"
                        value={project.year}
                        onChange={(e) => updateProject(index, 'year', e.target.value)}
                        className="w-full p-2 rounded bg-neutral-800 border border-white/10"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-white/60 mb-1">Vimeo ID</label>
                    <input
                      type="text"
                      value={project.vimeoId}
                      onChange={(e) => updateProject(index, 'vimeoId', e.target.value)}
                      className="w-full p-2 rounded bg-neutral-800 border border-white/10"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-white/60 mb-1">Beschreibung</label>
                    <textarea
                      value={project.description}
                      onChange={(e) => updateProject(index, 'description', e.target.value)}
                      className="w-full p-2 rounded bg-neutral-800 border border-white/10 h-24"
                    />
                  </div>

                  {/* Video Vorschau */}
                  {project.vimeoId && (
                    <div>
                      <label className="block text-sm text-white/60 mb-1">Vorschau</label>
                      <div className="aspect-video rounded-lg overflow-hidden bg-neutral-800">
                        <img
                          src={`https://vumbnail.com/${project.vimeoId}.jpg`}
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  )}
                </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}