// src/app/api/auth/[...nextauth]/route.js
"use client";


import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Hier später die Authentifizierung implementieren
        if (credentials.username === process.env.ADMIN_USERNAME && 
            credentials.password === process.env.ADMIN_PASSWORD) {
          return { id: 1, name: 'Admin' };
        }
        return null;
      }
    })
  ],
  pages: {
    signIn: '/admin/login',
  },
});

export { handler as GET, handler as POST };

// src/app/lib/mongodb.js
import { MongoClient } from 'mongodb';

if (!process.env.MONGODB_URI) {
  throw new Error('Bitte MONGODB_URI in .env definieren');
}

const uri = process.env.MONGODB_URI;
const options = {};

let client;
let clientPromise;

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;

// src/app/models/Content.js
const contentSchema = {
  type: {
    type: String,
    enum: ['video', 'text'],
    required: true
  },
  pageId: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  vimeoId: String,
  updatedAt: {
    type: Date,
    default: Date.now
  }
};

// src/app/api/content/route.js
import { getServerSession } from 'next-auth/next';
import clientPromise from '@/app/lib/mongodb';

export async function GET(request) {
  const client = await clientPromise;
  const db = client.db("portfolio-cms");
  const contents = await db.collection("contents").find({}).toArray();
  return new Response(JSON.stringify(contents), {
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function POST(request) {
  const session = await getServerSession();
  if (!session) {
    return new Response('Unauthorized', { status: 401 });
  }

  const client = await clientPromise;
  const db = client.db("portfolio-cms");
  const data = await request.json();
  
  const result = await db.collection("contents").insertOne({
    ...data,
    updatedAt: new Date()
  });

  return new Response(JSON.stringify(result), {
    headers: { 'Content-Type': 'application/json' },
  });
}

// src/app/admin/components/ContentEditor.js
'use client';
import { useState } from 'react';

export default function ContentEditor({ content, onSave }) {
  const [editedContent, setEditedContent] = useState(content);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSave(editedContent);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Typ
        </label>
        <select
          value={editedContent.type}
          onChange={(e) => setEditedContent({...editedContent, type: e.target.value})}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        >
          <option value="text">Text</option>
          <option value="video">Video</option>
        </select>
      </div>

      {editedContent.type === 'video' && (
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Vimeo ID
          </label>
          <input
            type="text"
            value={editedContent.vimeoId || ''}
            onChange={(e) => setEditedContent({...editedContent, vimeoId: e.target.value})}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Inhalt
        </label>
        <textarea
          value={editedContent.content}
          onChange={(e) => setEditedContent({...editedContent, content: e.target.value})}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          rows={4}
        />
      </div>

      <button
        type="submit"
        className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700"
      >
        Speichern
      </button>
    </form>
  );
}

// .env.local (erstellen Sie diese Datei im Root-Verzeichnis)
MONGODB_URI=ihre_mongodb_uri_hier
NEXTAUTH_SECRET=ihr_geheimer_schluessel_hier
ADMIN_USERNAME=admin
ADMIN_PASSWORD=ihr_sicheres_passwort_hier