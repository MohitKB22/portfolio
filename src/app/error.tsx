'use client';

import { useEffect } from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('[app] unhandled error', error);
  }, [error]);

  return (
    <div className="container-page flex min-h-[70svh] flex-col items-center justify-center py-32 text-center">
      <span className="grid size-16 place-items-center rounded-2xl border border-rose/30 bg-rose/10 text-rose">
        <AlertTriangle className="size-7" aria-hidden />
      </span>
      <h1 className="mt-8 text-3xl font-semibold sm:text-4xl">Something went wrong</h1>
      <p className="mt-4 max-w-md text-[0.9375rem] text-muted">
        An unexpected error occurred while rendering this page. Retrying usually fixes it.
      </p>
      {error.digest ? (
        <p className="mt-3 font-mono text-xs text-subtle">Reference: {error.digest}</p>
      ) : null}
      <Button onClick={reset} className="mt-8">
        <RotateCcw className="size-4" /> Try again
      </Button>
    </div>
  );
}
