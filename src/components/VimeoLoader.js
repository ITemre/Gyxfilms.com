// components/VimeoLoader.js
'use client';

import { useEffect } from 'react';

export function useVimeoLoader() {
  useEffect(() => {
    // Preload Vimeo script
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'script';
    link.href = 'https://player.vimeo.com/api/player.js';
    document.head.appendChild(link);

    const script = document.createElement('script');
    script.src = 'https://player.vimeo.com/api/player.js';
    script.async = false;
    document.head.appendChild(script);
    
    // Disable overscroll
    document.body.style.overscrollBehavior = 'none';
    document.documentElement.style.overscrollBehavior = 'none';

    return () => {
      document.body.style.overscrollBehavior = '';
      document.documentElement.style.overscrollBehavior = '';
    };
  }, []);
}