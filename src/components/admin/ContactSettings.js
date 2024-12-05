// components/admin/ContactSettings.js
'use client';
import { useState } from 'react';
import { Mail, Plus, Trash2 } from 'lucide-react';

export function ContactSettings({ content, onSave }) {
  const [formData, setFormData] = useState({
    email: content.email,
    form: content.form
  });

  const addProjectType = () => {
    setFormData({
      ...formData,
      form: {
        ...formData.form,
        projectTypes: [...formData.form.projectTypes, 'Neuer Projekttyp']
      }
    });
  };

  const removeProjectType = (index) => {
    const newProjectTypes = [...formData.form.projectTypes];
    newProjectTypes.splice(index, 1);
    setFormData({
      ...formData,
      form: {
        ...formData.form,
        projectTypes: newProjectTypes
      }
    });
  };

  const updateProjectType = (index, value) => {
    const newProjectTypes = [...formData.form.projectTypes];
    newProjectTypes[index] = value;
    setFormData({
      ...formData,
      form: {
        ...formData.form,
        projectTypes: newProjectTypes
      }
    });
  };

  const updateField = (fieldIndex, field, value) => {
    const newFields = [...formData.form.fields];
    newFields[fieldIndex] = {
      ...newFields[fieldIndex],
      [field]: value
    };
    setFormData({
      ...formData,
      form: {
        ...formData.form,
        fields: newFields
      }
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Kontakt Einstellungen</h1>
        <button
          onClick={() => onSave(formData)}
          className="bg-white text-black px-4 py-2 rounded hover:bg-white/90"
        >
          Änderungen speichern
        </button>
      </div>

      {/* Email Einstellungen */}
      <div className="bg-black p-6 rounded-lg border border-white/10">
        <div className="flex items-center gap-3 mb-4">
          <Mail className="w-5 h-5 text-white/60" />
          <h2 className="text-xl">Email Einstellungen</h2>
        </div>
        
        <div className="space-y-4">
          <label className="block">
            <span className="text-sm text-white/60 block mb-1">Kontakt Email</span>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full p-2 rounded bg-neutral-800 border border-white/10"
            />
          </label>

          <label className="block">
            <span className="text-sm text-white/60 block mb-1">Formular Empfänger Email</span>
            <input
              type="email"
              value={formData.form.recipientEmail}
              onChange={(e) => setFormData({
                ...formData,
                form: { ...formData.form, recipientEmail: e.target.value }
              })}
              className="w-full p-2 rounded bg-neutral-800 border border-white/10"
            />
          </label>
        </div>
      </div>

      {/* Projekttypen */}
      <div className="bg-black p-6 rounded-lg border border-white/10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl">Projekttypen</h2>
          <button
            onClick={addProjectType}
            className="text-white/60 hover:text-white flex items-center gap-2"
          >
            <Plus size={16} />
            <span>Typ hinzufügen</span>
          </button>
        </div>

        <div className="space-y-3">
          {formData.form.projectTypes.map((type, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                type="text"
                value={type}
                onChange={(e) => updateProjectType(index, e.target.value)}
                className="flex-1 p-2 rounded bg-neutral-800 border border-white/10"
              />
              <button
                onClick={() => removeProjectType(index)}
                className="text-red-500 hover:text-red-400 p-2"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Formularfelder */}
      <div className="bg-black p-6 rounded-lg border border-white/10">
        <h2 className="text-xl mb-4">Formularfelder</h2>

        <div className="space-y-6">
          {formData.form.fields.map((field, index) => (
            <div key={index} className="p-4 bg-neutral-900 rounded-lg space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <label className="block">
                  <span className="text-sm text-white/60 block mb-1">Label</span>
                  <input
                    type="text"
                    value={field.label}
                    onChange={(e) => updateField(index, 'label', e.target.value)}
                    className="w-full p-2 rounded bg-neutral-800 border border-white/10"
                  />
                </label>
                <label className="block">
                  <span className="text-sm text-white/60 block mb-1">Typ</span>
                  <select
                    value={field.type}
                    onChange={(e) => updateField(index, 'type', e.target.value)}
                    className="w-full p-2 rounded bg-neutral-800 border border-white/10"
                  >
                    <option value="text">Text</option>
                    <option value="email">Email</option>
                    <option value="tel">Telefon</option>
                    <option value="select">Auswahl</option>
                  </select>
                </label>
              </div>
              <label className="block">
                <span className="text-sm text-white/60 block mb-1">Platzhalter</span>
                <input
                  type="text"
                  value={field.placeholder}
                  onChange={(e) => updateField(index, 'placeholder', e.target.value)}
                  className="w-full p-2 rounded bg-neutral-800 border border-white/10"
                />
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}