// src/app/api/content/route.js
import { readFileSync } from 'fs';
import { join } from 'path';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Pfad zur content.json
    const filePath = join(process.cwd(), 'src', 'data', 'content.json');
    
    // Datei einlesen
    const fileContent = readFileSync(filePath, 'utf8');
    const data = JSON.parse(fileContent);
    
    // Erfolgreiche Antwort zurückgeben
    return NextResponse.json(data);
  } catch (error) {
    // Fehlerbehandlung
    console.error('Error loading content:', error);
    return NextResponse.json(
      { error: 'Failed to load content' },
      { status: 500 }
    );
  }
}