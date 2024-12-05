// src/app/api/content/route.js
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    // Pfad zur content.json im src/data Ordner
    const filePath = path.join(process.cwd(), 'src', 'data', 'content.json');
    
    // Überprüfen ob die Datei existiert
    if (!fs.existsSync(filePath)) {
      console.error('Content file not found:', filePath);
      return NextResponse.json(
        { error: 'Content file not found' },
        { status: 404 }
      );
    }

    // Datei einlesen
    const rawData = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(rawData);
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in content API:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}