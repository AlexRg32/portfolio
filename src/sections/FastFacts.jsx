import { motion } from 'framer-motion';

const facts = [
  { label: 'Rol', value: 'Full Stack Developer' },
  { label: 'Experiencia', value: '+1 Año' },
  { label: 'IA Mastery', value: 'Claude · Gemini · Agents' },
  { label: 'Stack', value: 'React · Laravel · SQL' },
];

export default function FastFacts() {
  return (
    <section className="border-t border-border bg-black py-16 sm:py-24">
      <div className="container-wide">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-4">
          {facts.map((fact, index) => (
            <motion.div
              key={fact.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex flex-col gap-2 border-l border-border pl-6"
            >
              <dt className="text-xs font-mono uppercase tracking-widest text-text-muted">
                {fact.label}
              </dt>
              <dd className="text-xl font-medium tracking-tight text-white sm:text-2xl">
                {fact.value}
              </dd>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
