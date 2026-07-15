import { Link } from 'react-router-dom';
import RouteMeta from '../components/RouteMeta';

export default function NotFound() {
  return (
    <>
      <RouteMeta title="404 — Alejandro Ruiz" description="Página no encontrada" path="/404" />
      <main id="main" className="not-found shell">
        <p className="kicker"><span aria-hidden="true">ERR</span>Señal perdida</p>
        <p className="not-found__code" aria-hidden="true">404</p>
        <h1>Esta ruta no lleva a ninguna parte.</h1>
        <Link className="button button--ink" to="/">Volver al inicio <span aria-hidden="true">→</span></Link>
      </main>
    </>
  );
}
