// src/app/layout.js
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/NavBar';
import Footer from '@/components/Footer';


const inter = Inter({ subsets: ['latin'] })

// Diese Komponente handhabt Client-Side Funktionalität
function ClientLayout({ children }) {
  return (
    <div className="min-h-screen overflow-x-hidden touch-pan-y">
      {children}
    </div>
  );
}

// Haupt-Layout bleibt Server-Component
export default function RootLayout({ children }) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <body className={`${inter.className} bg-[#1A1A1A] text-white overflow-x-hidden touch-pan-y overscroll-none`}>
     
          <Navbar />
          <ClientLayout>{children}</ClientLayout>
          <Footer />
 
      </body>
    </html>
  );
}