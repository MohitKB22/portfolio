'use client';

import { useEffect, useState } from 'react';

/** True after hydration — use to gate client-only visuals and avoid SSR mismatch. */
export function useMounted(): boolean {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}
