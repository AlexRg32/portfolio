import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section id="home" className="relative flex min-h-screen flex-col items-center justify-center px-6">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/5 to-transparent blur-3xl -z-10" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center"
      >
        <span className="mb-4 block text-sm font-mono tracking-widest text-text-muted">
          DISPONIBLE PARA TRABAJAR
        </span>
        <h1 className="text-display mb-6 text-6xl tracking-tighter sm:text-8xl md:text-9xl font-bold bg-gradient-to-br from-white to-neutral-500 bg-clip-text text-transparent pb-4">
          Alejandro.
        </h1>
        <h2 className="mb-10 text-xl md:text-3xl font-light tracking-tight text-text-dim max-w-2xl mx-auto">
          Ingeniero de Software Full Stack.
          <br /> Construyendo productos digitales sólidos y escalables.
        </h2>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <a
            href="#contact"
            className="group inline-flex items-center gap-4 rounded-full border border-white/20 bg-white/5 px-8 py-4 text-sm font-medium transition-all hover:bg-white hover:text-black"
          >
            <span>Contactar</span>
            <svg
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
