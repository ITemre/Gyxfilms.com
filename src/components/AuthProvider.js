'use client'
import { SessionProvider } from 'next-auth/react';
import { useEffect } from 'react';

export function AuthProvider({ children }) {
  useEffect(() => {
    // Prevent bounce effect and pull-to-refresh on iOS
    document.body.style.overscrollBehavior = 'none';
    document.documentElement.style.overscrollBehavior = 'none';

    return () => {
      document.body.style.overscrollBehavior = '';
      document.documentElement.style.overscrollBehavior = '';
    };
  }, []);

  return <SessionProvider>{children}</SessionProvider>;
}