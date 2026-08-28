import { useEffect, useRef, useState } from 'react';
import { prefersReducedMotion } from '../motion/config';

function supportsWebGL() {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'));
  } catch {
    return false;
  }
}

function isCapableDevice() {
  // The lattice belongs to the desktop composition. Everywhere else keeps the
  // static version, which costs nothing.
  if (!window.matchMedia('(min-width: 1025px) and (hover: hover) and (pointer: fine)').matches) return false;
  if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) return false;
  if (navigator.deviceMemory && navigator.deviceMemory < 4) return false;
  const connection = navigator.connection;
  if (connection?.saveData) return false;
  return true;
}

/**
 * The one WebGL moment on the site: the AR lattice behind the headline.
 * It is lazy-loaded, mounted only near the viewport, paused when hidden and
 * fully disposed on unmount. No essential text lives inside the canvas — the
 * static lattice underneath is the real, always-present layer.
 */
export default function HeroLattice() {
  const hostRef = useRef(null);
  const canvasRef = useRef(null);
  const [live, setLive] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion() || !isCapableDevice() || !supportsWebGL()) return undefined;

    const host = hostRef.current;
    if (!host) return undefined;

    let lattice = null;
    let cancelled = false;
    let observer = null;
    let resizeObserver = null;

    const teardown = () => {
      window.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('visibilitychange', onVisibility);
      resizeObserver?.disconnect();
      lattice?.dispose();
      lattice = null;
    };

    function onPointerMove(event) {
      if (!lattice) return;
      const rect = host.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = 1 - (event.clientY - rect.top) / rect.height;
      if (x < -0.3 || x > 1.3 || y < -0.3 || y > 1.3) {
        lattice.releasePointer();
        return;
      }
      lattice.setPointer(x, y);
    }

    function onVisibility() {
      if (!lattice) return;
      if (document.hidden) lattice.stop();
      else lattice.start();
    }

    async function boot() {
      const { createLattice } = await import('./lattice/createLattice');
      if (cancelled || !canvasRef.current) return;
      lattice = createLattice(canvasRef.current);
      setLive(true);
      lattice.start();

      resizeObserver = new ResizeObserver(() => lattice?.resize());
      resizeObserver.observe(host);
      window.addEventListener('pointermove', onPointerMove, { passive: true });
      document.addEventListener('visibilitychange', onVisibility);
    }

    observer = new IntersectionObserver(
      ([entry]) => {
        if (!lattice) {
          if (entry.isIntersecting) boot();
          return;
        }
        if (entry.isIntersecting && !document.hidden) lattice.start();
        else lattice.stop();
      },
      { rootMargin: '160px' },
    );
    observer.observe(host);

    return () => {
      cancelled = true;
      observer?.disconnect();
      teardown();
    };
  }, []);

  return (
    <div className={`lattice${live ? ' is-live' : ''}`} ref={hostRef} aria-hidden="true">
      <div className="lattice__static" />
      <canvas className="lattice__canvas" ref={canvasRef} />
    </div>
  );
}
