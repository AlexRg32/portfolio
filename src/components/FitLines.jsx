/**
 * Display lines broken by hand and sized to fill their frame.
 *
 * Each line sits in its own clipping box so the motion system can slide it up
 * from behind its own edge. Without JavaScript the lines are simply at rest at
 * the size the stylesheet gives them, and fully readable.
 */
export default function FitLines({
  as: Tag = 'span',
  lines,
  className = '',
  fitHeight = false,
  reveal = false,
  ...rest
}) {
  return (
    <Tag
      className={`fit-lines ${className}`}
      data-fit-box
      data-fit-height={fitHeight ? 'frame' : undefined}
      data-reveal={reveal ? 'lines' : undefined}
      {...rest}
    >
      {lines.map((line, index) => (
        <span className="fit-line" key={`${index}-${line}`}>
          <span className="fit-line__inner" data-line-inner data-fit-inner>
            {line}
          </span>
        </span>
      ))}
    </Tag>
  );
}
