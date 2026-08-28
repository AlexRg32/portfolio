import { Link } from 'react-router-dom';
import RouteMeta from '../components/RouteMeta';
import Monogram from '../components/Monogram';
import { content } from '../data/content';
import { homePath, sectionHref, SECTION_IDS } from '../utils/routes';

export default function NotFound({ lang = 'es' }) {
  const copy = content[lang].notFound;
  const ids = SECTION_IDS[lang];

  return (
    <>
      <RouteMeta lang={lang} title={`404 — Alejandro Ruiz`} description={copy.title} path="/404" noIndex />
      <main id="main" className="not-found">
        <div className="shell not-found__inner">
          <p className="mono index-mark">{copy.signal}</p>
          <p className="not-found__code display" aria-hidden="true">{copy.code}</p>
          <h1 className="title-xl">{copy.title}</h1>
          <p className="body">{copy.body}</p>
          <p className="not-found__actions">
            <Link className="cta" to={homePath(lang)}>
              <span>{copy.action}</span>
              <span className="cta__arrow" aria-hidden="true">→</span>
            </Link>
            <Link className="link" to={sectionHref(lang, ids.work)}>
              {copy.work}<span className="link__arrow" aria-hidden="true">↗</span>
            </Link>
          </p>
          <Monogram className="not-found__monogram" strokeWidth={1.2} />
        </div>
      </main>
    </>
  );
}
