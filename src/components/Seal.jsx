import { useId } from 'react';

/**
 * A circular stamp: type running around a ring, with something small at its
 * centre. Purely typographic — no icon set, no illustration. The ring turns
 * slowly, and holds still under reduced motion.
 */
export default function Seal({ text, className = '', children }) {
  const id = `seal-${useId().replace(/:/g, '')}`;

  return (
    <span className={`seal-wrap ${className}`}>
      <svg className="seal" viewBox="0 0 200 200" aria-hidden="true" focusable="false">
        <defs>
          <path id={id} fill="none" d="M100 100 m-78 0 a78 78 0 1 1 156 0 a78 78 0 1 1 -156 0" />
        </defs>
        <g className="seal__spin">
          <text className="seal__text">
            <textPath href={`#${id}`} startOffset="0">{text}</textPath>
          </text>
        </g>
      </svg>
      <span className="seal__core" aria-hidden="true">{children}</span>
    </span>
  );
}
