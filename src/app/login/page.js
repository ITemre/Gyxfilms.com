
// src/app/admin/login/page.js
'use client';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const result = await signIn('credentials', {
      username: formData.get('username'),
      password: formData.get('password'),
      redirect: false,
    });

    if (result?.error) {
      setError('Ungültige Anmeldedaten');
    } else {
      router.push('/admin');
    }
  };

  return (
    <div className="min-h-screen bg-neutral-900 flex items-center justify-center">
      <div className="max-w-md w-full p-8 bg-black rounded-lg">
        <h1 className="text-2xl text-white font-bold mb-6">Admin Login</h1>
        
        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500 rounded text-red-500">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-white/60 mb-1">Username</label>
            <input
              name="username"
              type="text"
              className="w-full p-2 rounded bg-neutral-800 border border-white/10 text-white"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm text-white/60 mb-1">Password</label>
            <input
              name="password"
              type="password"
              className="w-full p-2 rounded bg-neutral-800 border border-white/10 text-white"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-white text-black rounded hover:bg-white/90 transition-colors"
          >
            Einloggen
          </button>
        </form>
      </div>
    </div>
  );
}
