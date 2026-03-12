import { useState, useEffect } from 'react';
import { useMediaQuery } from './useMediaQuery';

export function useMousePosition() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const isTouch = useMediaQuery('(hover: none) and (pointer: coarse)');

  useEffect(() => {
    if (isTouch) return;

    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isTouch]);

  return position;
}
