import { motion } from 'framer-motion'

const hearts = ['💕', '❤️', '💗', '🌸']
const positions = [
  { left: '2%', top: '5%', delay: 0, duration: 4 },
  { left: '92%', top: '12%', delay: 0.8, duration: 5 },
  { left: '8%', top: '88%', delay: 1.2, duration: 4.5 },
  { left: '88%', top: '85%', delay: 0.3, duration: 5.2 },
  { left: '50%', top: '3%', delay: 1.5, duration: 4.2 },
  { left: '95%', top: '50%', delay: 0.5, duration: 5 },
  { left: '5%', top: '45%', delay: 1, duration: 4.8 },
]

export default function FloatingHeartsScene() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl sm:rounded-3xl z-0" aria-hidden>
      {positions.map((pos, i) => (
        <motion.span
          key={i}
          className="absolute text-base sm:text-xl opacity-40 sm:opacity-30"
          style={{ left: pos.left, top: pos.top }}
          animate={{
            y: [0, -8, -16, -8, 0],
            opacity: [0.35, 0.5, 0.4, 0.45, 0.35],
          }}
          transition={{
            duration: pos.duration,
            delay: pos.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {hearts[i % hearts.length]}
        </motion.span>
      ))}
    </div>
  )
}
