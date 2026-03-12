import { motion } from 'framer-motion';
import { staggerContainer, wordReveal, viewportConfig } from '../../utils/animations';

export default function TextReveal({ children, className = '', as: Tag = 'p' }) {
  // Split text into words
  const words = typeof children === 'string' ? children.split(' ') : [children];

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
    >
      <Tag className={className}>
        {words.map((word, i) => (
          <span key={i} className="inline-block overflow-hidden mr-[0.3em]">
            <motion.span
              className="inline-block"
              variants={wordReveal}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </Tag>
    </motion.div>
  );
}
