import { Link } from 'react-router-dom';

export default function AnalyticsConsentBanner({ onAccept, onReject }) {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-[160] px-3 pb-3 sm:px-4 sm:pb-4"
      role="dialog"
      aria-labelledby="analytics-consent-title"
      aria-describedby="analytics-consent-description"
      aria-modal="false"
    >
      <div className="mx-auto max-w-5xl rounded-[28px] border border-border-light/70 bg-bg/92 p-5 shadow-[0_18px_48px_rgba(5,10,24,0.28)] backdrop-blur-xl sm:p-6">
        <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <p className="eyebrow">Analítica avanzada</p>
            <h2 id="analytics-consent-title" className="mt-3 font-display text-2xl leading-tight text-text sm:text-3xl">
              ¿Quieres activar mapas de calor y grabaciones anónimas?
            </h2>
            <p id="analytics-consent-description" className="mt-3 max-w-3xl text-sm leading-7 text-text-muted sm:text-base">
              El tráfico básico se mide con Plausible. Si aceptas esta opción adicional, también se activará
              Microsoft Clarity para ver recorridos, clics y mapas de calor sin exponer formularios ni datos
              sensibles. Puedes leer más en{' '}
              <Link to="/privacy" className="text-text underline decoration-border-light underline-offset-4 hover:text-accent">
                privacidad y analítica
              </Link>.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-end">
            <button type="button" onClick={onReject} className="button-secondary min-h-11 w-full sm:w-auto">
              Ahora no
            </button>
            <button type="button" onClick={onAccept} className="button-primary min-h-11 w-full sm:w-auto">
              Activar Clarity
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
