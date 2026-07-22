import { Link } from 'react-router-dom';
import RouteMeta from '../components/RouteMeta';

const copy = {
  es: {
    signal: 'Señal perdida',
    title: 'Esta ruta no lleva a ninguna parte.',
    action: 'Volver al inicio',
    description: 'Página no encontrada',
  },
  en: {
    signal: 'Signal lost',
    title: 'This route leads nowhere.',
    action: 'Back to home',
    description: 'Page not found',
  },
};

export default function NotFound({ lang = 'es' }) {
  const text = copy[lang];
  const home = lang === 'en' ? '/en' : '/';

  return (
    <>
      <RouteMeta lang={lang} title="404 — Alejandro Ruiz" description={text.description} path="/404" noIndex />
      <main id="main" className="not-found shell">
        <p className="kicker"><span aria-hidden="true">ERR / </span>{text.signal}</p>
        <p className="not-found__code" aria-hidden="true">404</p>
        <h1>{text.title}</h1>
        <Link className="button button--ink" to={home}>{text.action} <span aria-hidden="true">→</span></Link>
      </main>
    </>
  );
}
