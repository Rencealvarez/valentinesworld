import { motion } from 'framer-motion'

const hearts = ['❤️', '💕', '💗', '💖', '💝', '❤️', '💕']

export default function HeartCelebration() {
  return (
    <div className="fixed inset-0 pointer-events-none flex items-center justify-center z-50 overflow-hidden">
      {hearts.map((emoji, i) => (
        <motion.span
          key={i}
          className="absolute text-3xl sm:text-4xl md:text-5xl drop-shadow-lg"
          initial={{
            scale: 0,
            opacity: 1,
            x: (i - 3) * 28,
            y: 0,
            rotate: -15 + i * 8,
          }}
          animate={{
            scale: [0, 1.15, 1],
            opacity: [1, 1, 0],
            y: [0, -60 - i * 12, -140 - i * 20],
            x: (i - 3) * 28 + (i % 2 === 0 ? 15 : -15),
            rotate: [-15 + i * 8, 5 + i * 5, 10],
          }}
          transition={{
            duration: 2,
            delay: i * 0.06,
            ease: [0.2, 0.8, 0.3, 1],
          }}
        >
          {emoji}
        </motion.span>
      ))}
    </div>
  )
}
