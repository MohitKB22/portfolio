'use client';

import { Toaster } from 'sonner';
import { QueryProvider } from './query-provider';
import { SmoothScroll } from './smooth-scroll';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <SmoothScroll>{children}</SmoothScroll>
      <Toaster
        position="bottom-right"
        theme="dark"
        richColors
        closeButton
        toastOptions={{
          style: {
            background: 'rgba(16, 26, 47, 0.94)',
            border: '1px solid rgba(255,255,255,0.1)',
            color: '#f5f7fa',
            backdropFilter: 'blur(12px)',
          },
        }}
      />
    </QueryProvider>
  );
}
