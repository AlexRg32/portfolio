/**
 * The AR monogram, drawn as strokes so it can be built line by line.
 * It is the studio signature: intro, cursor, footer and case transitions
 * all reuse this one geometry.
 */
import { AR_PATHS } from '../data/monogram';

export default function Monogram({
  title,
  strokeWidth = 6,
  className = '',
  pathClassName = 'monogram__stroke',
  ...rest
}) {
  return (
    <svg
      className={`monogram ${className}`}
      viewBox="0 0 120 100"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="square"
      strokeLinejoin="miter"
      role={title ? 'img' : 'presentation'}
      aria-hidden={title ? undefined : 'true'}
      aria-label={title}
      focusable="false"
      {...rest}
    >
      {AR_PATHS.map((d, i) => (
        <path key={d} d={d} className={pathClassName} data-stroke={i} />
      ))}
    </svg>
  );
}
