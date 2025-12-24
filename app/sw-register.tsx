'use client';

import { useEffect } from 'react';

export default function SWRegister() {
  useEffect(() => {
    if ('serviceWorker' in navigator && typeof window !== 'undefined') {
      // HTTPSまたはlocalhostでのみService Workerを登録
      if (location.protocol === 'https:' || location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
        navigator.serviceWorker
          .register('/sw.js')
          .then((registration) => {
            console.log('Service Worker registered:', registration);
          })
          .catch((error) => {
            console.log('Service Worker registration failed:', error);
          });
      }
    }
  }, []);

  return null;
}

