import RouteMeta from '../components/RouteMeta';
import { SITE_EMAIL } from '../data/content';
import { privacyPath } from '../utils/routes';

const copy = {
  es: {
    title: 'Privacidad',
    updated: 'Última actualización: septiembre de 2026',
    intro: 'Este sitio recoge la mínima información posible y solo la que tú envías de forma voluntaria.',
    sections: [
      ['Responsable', `Alejandro Ruiz Gasch. Puedes contactar en ${SITE_EMAIL}.`],
      ['Contacto por email', 'Este sitio no tiene formularios. Si me escribes a la dirección de contacto, tu mensaje y tu dirección de correo se usan únicamente para responderte. No se ceden a terceros con fines comerciales ni se usan para publicidad.'],
      ['Analítica y cookies', 'El sitio no utiliza cookies de seguimiento, perfiles publicitarios ni analítica de terceros. Los enlaces de correo, LinkedIn y GitHub abren servicios externos sujetos a sus propias políticas.'],
      ['Alojamiento', 'El sitio se publica mediante Netlify. Como proveedor técnico, puede procesar datos básicos de conexión necesarios para servir y proteger la web.'],
      ['Conservación', 'Los mensajes recibidos se conservan mientras dure la conversación y su seguimiento razonable. Después se eliminan.'],
      ['Tus derechos', `Puedes solicitar acceso, rectificación o supresión de cualquier dato que hayas enviado escribiendo a ${SITE_EMAIL}.`],
    ],
  },
  en: {
    title: 'Privacy',
    updated: 'Last updated: September 2026',
    intro: 'This site collects as little information as possible, and only what you send voluntarily.',
    sections: [
      ['Controller', `Alejandro Ruiz Gasch. You can get in touch at ${SITE_EMAIL}.`],
      ['Contact by email', 'This site has no forms. If you write to the contact address, your message and your email address are used only to reply to you. They are not sold or passed to third parties for commercial purposes, and they are not used for advertising.'],
      ['Analytics and cookies', 'The site uses no tracking cookies, advertising profiles or third-party analytics. Email, LinkedIn and GitHub links open external services governed by their own policies.'],
      ['Hosting', 'The site is published through Netlify. As a technical provider, it may process basic connection data required to serve and protect the website.'],
      ['Retention', 'Messages are kept for as long as the conversation and its reasonable follow-up last. After that they are deleted.'],
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
