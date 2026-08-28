import RouteMeta from '../components/RouteMeta';
import { SITE_EMAIL } from '../data/content';
import { privacyPath } from '../utils/routes';

const copy = {
  es: {
    title: 'Privacidad',
    updated: 'Última actualización: agosto de 2026',
    intro: 'Este sitio recoge la mínima información posible y solo la que tú envías de forma voluntaria.',
    sections: [
      ['Responsable', `Alejandro Ruiz Gasch. Puedes contactar en ${SITE_EMAIL}.`],
      ['Formulario de briefing', 'Si envías el formulario de contacto, los datos (nombre, empresa, email, tipo de proyecto, plazo, inversión y mensaje) se procesan mediante Netlify Forms y se usan únicamente para responderte. No se ceden a terceros con fines comerciales ni se usan para publicidad.'],
      ['Analítica y cookies', 'El sitio no utiliza cookies de seguimiento, perfiles publicitarios ni analítica de terceros. Los enlaces de correo, LinkedIn y GitHub abren servicios externos sujetos a sus propias políticas.'],
      ['Alojamiento', 'El sitio se publica mediante Netlify. Como proveedor técnico, puede procesar datos básicos de conexión necesarios para servir y proteger la web.'],
      ['Conservación', 'Los mensajes recibidos se conservan mientras dure la conversación comercial y su seguimiento razonable. Después se eliminan.'],
      ['Tus derechos', `Puedes solicitar acceso, rectificación o supresión de cualquier dato que hayas enviado escribiendo a ${SITE_EMAIL}.`],
    ],
  },
  en: {
    title: 'Privacy',
    updated: 'Last updated: August 2026',
    intro: 'This site collects as little information as possible, and only what you send voluntarily.',
    sections: [
      ['Controller', `Alejandro Ruiz Gasch. You can get in touch at ${SITE_EMAIL}.`],
      ['Brief form', 'If you send the contact form, the data (name, company, email, project type, timing, investment and message) is processed through Netlify Forms and used only to reply to you. It is not sold or passed to third parties for commercial purposes, and it is not used for advertising.'],
      ['Analytics and cookies', 'The site uses no tracking cookies, advertising profiles or third-party analytics. Email, LinkedIn and GitHub links open external services governed by their own policies.'],
      ['Hosting', 'The site is published through Netlify. As a technical provider, it may process basic connection data required to serve and protect the website.'],
      ['Retention', 'Messages are kept for as long as the commercial conversation and its reasonable follow-up last. After that they are deleted.'],
      ['Your rights', `You may request access, correction or deletion of any data you sent by writing to ${SITE_EMAIL}.`],
    ],
  },
};

function withEmailLink(body) {
  const [before, after] = body.split(SITE_EMAIL);
  if (after === undefined) return body;
  return (
    <>
      {before}
      <a className="legal__email" href={`mailto:${SITE_EMAIL}`}>{SITE_EMAIL}</a>
      {after}
    </>
  );
}

export default function Privacy({ lang = 'es' }) {
  const text = copy[lang];

  return (
    <>
      <RouteMeta
        lang={lang}
        title={`${text.title} — Alejandro Ruiz`}
        description={text.intro}
        path={privacyPath(lang)}
      />
      <main id="main" className="legal">
        <div className="shell legal__inner">
          <p className="mono index-mark">alexrg.es</p>
          <h1 className="legal__title display">{text.title}</h1>
          <p className="mono legal__updated">{text.updated}</p>
          <p className="lede legal__intro">{text.intro}</p>

          <div className="legal__sections">
            {text.sections.map(([title, body], index) => (
              <section key={title}>
                <p className="mono legal__n">{String(index + 1).padStart(2, '0')}</p>
                <div>
                  <h2 className="legal__heading">{title}</h2>
                  <p className="legal__body">{withEmailLink(body)}</p>
                </div>
              </section>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
