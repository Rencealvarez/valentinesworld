import { useMemo } from 'react'
import { motion } from 'framer-motion'

const HEARTS = ['❤️', '💕', '💗', '💖', '💝']
const COUNT = 12

function randomBetween(min, max) {
  return min + Math.random() * (max - min)
}

export default function FloatingHeartsBackground() {
  const hearts = useMemo(
    () => Array.from({ length: COUNT }, (_, i) => ({
    id: i,
    emoji: HEARTS[i % HEARTS.length],
    left: randomBetween(2, 94),
    delay: randomBetween(0, 6),
    duration: randomBetween(6, 11),
    size: randomBetween(0.7, 1.4),
    opacity: randomBetween(0.08, 0.2),
  })),
  [])

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden
    >
      {hearts.map((heart) => (
        <motion.span
          key={heart.id}
          className="absolute text-2xl sm:text-3xl select-none"
          style={{
            left: `${heart.left}%`,
            top: '110%',
            fontSize: `${heart.size * 1.5}rem`,
            opacity: heart.opacity,
          }}
          animate={{
            y: ['0vh', '-120vh'],
            x: [0, 20, -15, 10, 0],
            rotate: [0, 8, -5, 10, 0],
          }}
          transition={{
            y: {
              duration: heart.duration,
              repeat: Infinity,
              delay: heart.delay,
              ease: 'linear',
            },
            x: {
              duration: heart.duration * 0.5,
              repeat: Infinity,
              delay: heart.delay,
              ease: 'easeInOut',
            },
            rotate: {
              duration: heart.duration * 0.6,
              repeat: Infinity,
              delay: heart.delay,
              ease: 'easeInOut',
            },
          }}
        >
          {heart.emoji}
        </motion.span>
      ))}
    </div>
  )
}
