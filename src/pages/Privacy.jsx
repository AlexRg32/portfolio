import RouteMeta from '../components/RouteMeta';

const copy = {
  es: {
    title: 'Privacidad', updated: 'Última actualización: julio de 2026',
    intro: 'Este portfolio está diseñado para recopilar la menor cantidad de información posible.',
    sections: [
      ['Responsable', 'Alejandro Ruiz Gasch. Puedes contactar en alexrg32@icloud.com.'],
      ['Datos y analítica', 'El sitio no utiliza formularios, perfiles publicitarios ni cookies de seguimiento. Los enlaces de correo, LinkedIn y GitHub abren servicios externos sujetos a sus propias políticas.'],
      ['Alojamiento', 'El sitio se publica mediante Netlify. Como proveedor técnico, puede procesar datos básicos de conexión necesarios para servir y proteger la web.'],
      ['Tus derechos', 'Puedes solicitar acceso, rectificación o supresión de cualquier dato que hayas enviado voluntariamente por correo electrónico.'],
    ],
  },
  en: {
    title: 'Privacy', updated: 'Last updated: July 2026',
    intro: 'This portfolio is designed to collect as little information as possible.',
    sections: [
      ['Controller', 'Alejandro Ruiz Gasch. You can get in touch at alexrg32@icloud.com.'],
      ['Data and analytics', 'The site does not use forms, advertising profiles or tracking cookies. Email, LinkedIn and GitHub links open external services governed by their own policies.'],
      ['Hosting', 'The site is published through Netlify. As a technical provider, it may process basic connection data required to serve and protect the website.'],
      ['Your rights', 'You may request access, correction or deletion of any data you voluntarily sent by email.'],
    ],
  },
};

export default function Privacy({ lang = 'es' }) {
  const text = copy[lang];
  return (
    <>
      <RouteMeta lang={lang} title={`${text.title} — Alejandro Ruiz`} description={text.intro} path={lang === 'es' ? '/privacidad' : '/en/privacy'} />
      <main id="main" className="legal shell">
        <p className="kicker">alexrg.es</p>
        <h1>{text.title}</h1>
        <p className="legal__updated">{text.updated}</p>
        <p className="legal__intro">{text.intro}</p>
        <div className="legal__sections">
          {text.sections.map(([title, body]) => <section key={title}><span aria-hidden="true" /><div><h2>{title}</h2><p>{body}</p></div></section>)}
        </div>
      </main>
    </>
  );
}
