import { useCallback, useRef, useSyncExternalStore } from 'react';

const TIME_ZONE = 'Europe/Madrid';

function readTime(locale) {
  try {
    return new Intl.DateTimeFormat(locale, {
      timeZone: TIME_ZONE,
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).format(new Date());
  } catch {
    return '';
  }
}

function subscribe(onChange) {
  const id = window.setInterval(onChange, 20_000);
  return () => window.clearInterval(id);
}

/**
 * Real local time in Alicante. The prerendered snapshot is empty so the static
 * HTML never ships a stale clock, and hydration stays clean. The cached string
 * keeps the snapshot referentially stable between ticks.
 */
export default function LocalTime({ locale = 'es-ES' }) {
  const cache = useRef('');

  const getSnapshot = useCallback(() => {
    const next = readTime(locale);
    if (next !== cache.current) cache.current = next;
    return cache.current;
  }, [locale]);

  const time = useSyncExternalStore(subscribe, getSnapshot, () => '');

  if (!time) return null;
  return <time dateTime={time}>{time} CET</time>;
}
