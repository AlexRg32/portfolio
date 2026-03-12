import { useEffect, useRef, useState } from 'react';
import { useMousePosition } from '../../hooks/useMousePosition';

export default function CustomCursor() {
  const { x, y } = useMousePosition();
  const cursorRef = useRef(null);
  const cursorOuterRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const posRef = useRef({ x: 0, y: 0 });
  const outerPosRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef(null);

  // Check for touch device
  const [isTouch, setIsTouch] = useState(false);
  useEffect(() => {
    setIsTouch(window.matchMedia('(hover: none) and (pointer: coarse)').matches);
  }, []);

  // Lerp animation loop
  useEffect(() => {
    if (isTouch) return;

    const animate = () => {
      // Inner cursor — fast follow
      posRef.current.x += (x - posRef.current.x) * 0.35;
      posRef.current.y += (y - posRef.current.y) * 0.35;

      // Outer cursor — slower follow
      outerPosRef.current.x += (x - outerPosRef.current.x) * 0.12;
      outerPosRef.current.y += (y - outerPosRef.current.y) * 0.12;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${posRef.current.x}px, ${posRef.current.y}px, 0)`;
      }
      if (cursorOuterRef.current) {
        cursorOuterRef.current.style.transform = `translate3d(${outerPosRef.current.x}px, ${outerPosRef.current.y}px, 0)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [x, y, isTouch]);

  // Detect hoverable elements
  useEffect(() => {
    if (isTouch) return;

    const handleMouseOver = (e) => {
      const target = e.target.closest('a, button, [data-cursor="hover"]');
      setIsHovering(!!target);
    };

    const handleMouseLeave = () => setIsHidden(true);
    const handleMouseEnter = () => setIsHidden(false);

    document.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isTouch]);

  if (isTouch) return null;

  return (
    <>
      {/* Inner dot */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[10000] mix-blend-difference"
        style={{
          opacity: isHidden ? 0 : 1,
          transition: 'opacity 0.3s ease, width 0.4s cubic-bezier(0.16, 1, 0.3, 1), height 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          width: isHovering ? 48 : 8,
          height: isHovering ? 48 : 8,
          marginLeft: isHovering ? -24 : -4,
          marginTop: isHovering ? -24 : -4,
          borderRadius: '50%',
          backgroundColor: '#fafafa',
        }}
      />
      {/* Outer ring */}
      <div
        ref={cursorOuterRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          opacity: isHidden || isHovering ? 0 : 0.3,
          transition: 'opacity 0.4s ease',
          width: 32,
          height: 32,
          marginLeft: -16,
          marginTop: -16,
          borderRadius: '50%',
          border: '1px solid rgba(250, 250, 250, 0.4)',
        }}
      />
    </>
  );
}
