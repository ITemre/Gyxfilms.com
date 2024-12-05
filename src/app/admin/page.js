'use client'

import { useState, useEffect } from 'react';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('global');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch('/api/settings');
      const jsonData = await res.json();
      setData(jsonData);
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) return <div>Lädt...</div>;

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-800 text-white p-4">
        <ul>
          <li onClick={() => setActiveTab('global')}>Global Settings</li>
          <li onClick={() => setActiveTab('hero')}>Hero Section</li>
          <li onClick={() => setActiveTab('videos')}>Videos</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {activeTab === 'global' && (
          <GlobalSettings 
            data={data.global} 
            onSave={(updatedData) => handleSave('global', updatedData)} 
          />
        )}
        {activeTab === 'hero' && (
          <HeroSettings 
            data={data.home.hero} 
            onSave={(updatedData) => handleSave('home.hero', updatedData)} 
          />
        )}
      </div>
    </div>
  );

  async function handleSave(section, updatedData) {
    const newData = { ...data, [section]: updatedData };
    setData(newData);
    await fetch('/api/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newData),
    });
  }
}
