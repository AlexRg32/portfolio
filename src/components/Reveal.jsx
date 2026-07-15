import { useEffect, useRef } from 'react';

export default function Reveal({ as: Tag = 'div', className = '', children }) {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || !('IntersectionObserver' in window)) return undefined;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        node.dataset.visible = 'true';
        observer.unobserve(node);
      }
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return <Tag ref={ref} className={`reveal ${className}`}>{children}</Tag>;
}
