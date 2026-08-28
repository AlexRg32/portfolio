/**
 * Real facts only, set as a slow editorial ticker. No invented client logos.
 * The marquee pauses on hover and on focus, and holds still under reduced motion.
 */
export default function Credibility({ copy }) {
  const line = (
    <span className="ticker__line">
      {copy.items.map((item) => (
        <span className="ticker__item" key={item}>
          <span className="ticker__mark" aria-hidden="true">✳</span>
          {item}
        </span>
      ))}
    </span>
  );

  return (
    <section className="ticker" aria-label={copy.label}>
      <div className="ticker__track">
        {line}
        <span aria-hidden="true">{line}</span>
      </div>
    </section>
  );
}
