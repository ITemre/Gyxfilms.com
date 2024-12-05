// components/admin/AdminSettings.js
'use client';
import { useState } from 'react';
import { Key, Save } from 'lucide-react';

export function AdminSettings() {
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validierung
    if (passwords.new !== passwords.confirm) {
      setError('Die Passwörter stimmen nicht überein');
      return;
    }

    if (passwords.new.length < 6) {
      setError('Das neue Passwort muss mindestens 6 Zeichen lang sein');
      return;
    }

    try {
      const response = await fetch('/api/admin/password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentPassword: passwords.current,
          newPassword: passwords.new
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Fehler beim Ändern des Passworts');
      }

      setSuccess('Passwort wurde erfolgreich geändert');
      setPasswords({ current: '', new: '', confirm: '' });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-bold mb-8">Admin Einstellungen</h1>

      <div className="bg-black p-6 rounded-lg border border-white/10">
        <div className="flex items-center gap-3 mb-6">
          <Key className="w-5 h-5 text-white/60" />
          <h2 className="text-xl">Passwort ändern</h2>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500 rounded text-red-500">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 bg-green-500/10 border border-green-500 rounded text-green-500">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="text-sm text-white/60 block mb-1">Aktuelles Passwort</span>
            <input
              type="password"
              value={passwords.current}
              onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
              className="w-full p-2 rounded bg-neutral-800 border border-white/10"
              required
            />
          </label>

          <label className="block">
            <span className="text-sm text-white/60 block mb-1">Neues Passwort</span>
            <input
              type="password"
              value={passwords.new}
              onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
              className="w-full p-2 rounded bg-neutral-800 border border-white/10"
              required
            />
          </label>

          <label className="block">
            <span className="text-sm text-white/60 block mb-1">Neues Passwort bestätigen</span>
            <input
              type="password"
              value={passwords.confirm}
              onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
              className="w-full p-2 rounded bg-neutral-800 border border-white/10"
              required
            />
          </label>

          <button
            type="submit"
            className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded hover:bg-white/90"
          >
            <Save size={16} />
            <span>Passwort ändern</span>
          </button>
        </form>
      </div>
    </div>
  );
}