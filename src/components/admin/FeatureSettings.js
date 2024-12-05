// components/admin/FeatureSettings.js
'use client';
import { useState } from 'react';
import { PlusCircle, Trash2 } from 'lucide-react';

export function FeatureSettings({ features, onSave }) {
  const [formData, setFormData] = useState(features);

  const handleFeatureChange = (index, field, value) => {
    const newFeatures = [...formData];
    newFeatures[index] = {
      ...newFeatures[index],
      [field]: value
    };
    setFormData(newFeatures);
  };

  const handleFeaturePointChange = (featureIndex, pointIndex, field, value) => {
    const newFeatures = [...formData];
    newFeatures[featureIndex].features[pointIndex] = {
      ...newFeatures[featureIndex].features[pointIndex],
      [field]: value
    };
    setFormData(newFeatures);
  };

  const handleUspChange = (featureIndex, uspIndex, field, value) => {
    const newFeatures = [...formData];
    newFeatures[featureIndex].usps[uspIndex] = {
      ...newFeatures[featureIndex].usps[uspIndex],
      [field]: value
    };
    setFormData(newFeatures);
  };

  const addFeature = () => {
    setFormData([
      ...formData,
      {
        id: `feature${formData.length + 1}`,
        icon: 'Star',
        title: 'Neues Feature',
        description: 'Feature Beschreibung',
        videoId: '',
        features: [],
        usps: []
      }
    ]);
  };

  const addFeaturePoint = (featureIndex) => {
    const newFeatures = [...formData];
    if (!newFeatures[featureIndex].features) {
      newFeatures[featureIndex].features = [];
    }
    newFeatures[featureIndex].features.push({
      title: 'Neuer Punkt',
      description: 'Punkt Beschreibung'
    });
    setFormData(newFeatures);
  };

  const addUsp = (featureIndex) => {
    const newFeatures = [...formData];
    if (!newFeatures[featureIndex].usps) {
      newFeatures[featureIndex].usps = [];
    }
    newFeatures[featureIndex].usps.push({
      title: 'Neuer USP',
      description: 'USP Beschreibung'
    });
    setFormData(newFeatures);
  };

  const removeFeature = (index) => {
    setFormData(formData.filter((_, i) => i !== index));
  };

  const removeFeaturePoint = (featureIndex, pointIndex) => {
    const newFeatures = [...formData];
    newFeatures[featureIndex].features.splice(pointIndex, 1);
    setFormData(newFeatures);
  };

  const removeUsp = (featureIndex, uspIndex) => {
    const newFeatures = [...formData];
    newFeatures[featureIndex].usps.splice(uspIndex, 1);
    setFormData(newFeatures);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Features Verwaltung</h1>
        <div className="space-x-4">
          <button
            onClick={addFeature}
            className="bg-white/10 text-white px-4 py-2 rounded hover:bg-white/20 flex items-center gap-2"
          >
            <PlusCircle size={20} />
            <span>Feature hinzufügen</span>
          </button>
          <button
            onClick={() => onSave(formData)}
            className="bg-white text-black px-4 py-2 rounded hover:bg-white/90"
          >
            Änderungen speichern
          </button>
        </div>
      </div>

      <div className="space-y-8">
        {formData.map((feature, featureIndex) => (
          <div key={feature.id} className="bg-black p-6 rounded-lg border border-white/10">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl">Feature #{featureIndex + 1}</h2>
              <button
                onClick={() => removeFeature(featureIndex)}
                className="text-red-500 hover:text-red-400"
              >
                <Trash2 size={20} />
              </button>
            </div>

            {/* Haupteinstellungen */}
            <div className="space-y-4 mb-8">
              <div className="grid grid-cols-2 gap-4">
                <label className="block">
                  <span className="text-sm text-white/60 block mb-1">Icon</span>
                  <input
                    type="text"
                    value={feature.icon}
                    onChange={(e) => handleFeatureChange(featureIndex, 'icon', e.target.value)}
                    className="w-full p-2 rounded bg-neutral-800 border border-white/10"
                  />
                </label>
                <label className="block">
                  <span className="text-sm text-white/60 block mb-1">Vimeo Video ID</span>
                  <input
                    type="text"
                    value={feature.videoId}
                    onChange={(e) => handleFeatureChange(featureIndex, 'videoId', e.target.value)}
                    className="w-full p-2 rounded bg-neutral-800 border border-white/10"
                  />
                </label>
              </div>
              <label className="block">
                <span className="text-sm text-white/60 block mb-1">Titel</span>
                <input
                  type="text"
                  value={feature.title}
                  onChange={(e) => handleFeatureChange(featureIndex, 'title', e.target.value)}
                  className="w-full p-2 rounded bg-neutral-800 border border-white/10"
                />
              </label>
              <label className="block">
                <span className="text-sm text-white/60 block mb-1">Beschreibung</span>
                <textarea
                  value={feature.description}
                  onChange={(e) => handleFeatureChange(featureIndex, 'description', e.target.value)}
                  className="w-full p-2 rounded bg-neutral-800 border border-white/10 h-24"
                />
              </label>
            </div>

            {/* Feature Points */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg">Feature Points</h3>
                <button
                  onClick={() => addFeaturePoint(featureIndex)}
                  className="text-white/60 hover:text-white flex items-center gap-2"
                >
                  <PlusCircle size={16} />
                  <span>Punkt hinzufügen</span>
                </button>
              </div>
              <div className="space-y-4">
                {feature.features?.map((point, pointIndex) => (
                  <div key={pointIndex} className="grid grid-cols-[1fr,1fr,auto] gap-4 items-start">
                    <input
                      type="text"
                      value={point.title}
                      onChange={(e) => handleFeaturePointChange(featureIndex, pointIndex, 'title', e.target.value)}
                      className="p-2 rounded bg-neutral-800 border border-white/10"
                      placeholder="Titel"
                    />
                    <input
                      type="text"
                      value={point.description}
                      onChange={(e) => handleFeaturePointChange(featureIndex, pointIndex, 'description', e.target.value)}
                      className="p-2 rounded bg-neutral-800 border border-white/10"
                      placeholder="Beschreibung"
                    />
                    <button
                      onClick={() => removeFeaturePoint(featureIndex, pointIndex)}
                      className="text-red-500 hover:text-red-400 p-2"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* USPs */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg">USPs</h3>
                <button
                  onClick={() => addUsp(featureIndex)}
                  className="text-white/60 hover:text-white flex items-center gap-2"
                >
                  <PlusCircle size={16} />
                  <span>USP hinzufügen</span>
                </button>
              </div>
              <div className="space-y-4">
                {feature.usps?.map((usp, uspIndex) => (
                  <div key={uspIndex} className="grid grid-cols-[1fr,1fr,auto] gap-4 items-start">
                    <input
                      type="text"
                      value={usp.title}
                      onChange={(e) => handleUspChange(featureIndex, uspIndex, 'title', e.target.value)}
                      className="p-2 rounded bg-neutral-800 border border-white/10"
                      placeholder="Titel"
                    />
                    <input
                      type="text"
                      value={usp.description}
                      onChange={(e) => handleUspChange(featureIndex, uspIndex, 'description', e.target.value)}
                      className="p-2 rounded bg-neutral-800 border border-white/10"
                      placeholder="Beschreibung"
                    />
                    <button
                      onClick={() => removeUsp(featureIndex, uspIndex)}
                      className="text-red-500 hover:text-red-400 p-2"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}