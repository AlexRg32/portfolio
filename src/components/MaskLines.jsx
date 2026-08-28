/**
 * Renders text lines each inside its own clipping box so the motion system
 * can slide them up from behind their own edge. Without JS the inner span is
 * simply at rest and fully readable.
 */
export default function MaskLines({ as: Tag = 'span', lines, className = '' }) {
  return (
    <Tag className={className} data-reveal="lines">
      {lines.map((line, index) => (
        <span className="mask-line" key={`${index}-${typeof line === 'string' ? line : index}`}>
          <span className="mask-line__inner" data-line-inner>
            {typeof line === 'string'
              ? line
              : line.map((part, partIndex) => (
                  <span key={`${part.t}-${partIndex}`} className={part.tone === 'mono' ? 'tone-mono' : undefined}>
                    {partIndex > 0 ? ' ' : ''}
                    {part.t}
                  </span>
                ))}
          </span>
        </span>
      ))}
    </Tag>
  );
}
