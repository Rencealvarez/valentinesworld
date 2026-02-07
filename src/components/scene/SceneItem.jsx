import { motion } from 'framer-motion'

const itemConfig = {
  heart: { emoji: '❤️', label: 'Heart' },
  flower: { emoji: '🌸', label: 'Flower' },
  rose: { emoji: '🌹', label: 'Rose' },
  note: { emoji: '💌', label: 'Love note' },
  custom: { emoji: '✨', label: 'Your emoji' },
}

export default function SceneItem({ item, onRemove }) {
  const config = itemConfig[item.type] || itemConfig.heart
  return (
    <div
      className="absolute cursor-pointer select-none touch-none flex items-center justify-center z-10"
      style={{
        left: `${item.x}%`,
        top: `${item.y}%`,
        transform: 'translate(-50%, -50%)',
      }}
    >
      <motion.span
        className="inline-flex items-center justify-center text-2xl sm:text-3xl md:text-4xl drop-shadow-lg"
        initial={{ scale: 0, rotate: -25 }}
        animate={{
          scale: 1,
          rotate: 0,
          y: [0, -5, 0],
        }}
        transition={{
          scale: { type: 'spring', stiffness: 280, damping: 22 },
          rotate: { type: 'spring', stiffness: 200, damping: 20 },
          y: {
            duration: 2.8,
            repeat: Infinity,
            ease: 'easeInOut',
          },
        }}
        whileHover={{
          scale: 1.2,
          rotate: [0, -6, 6, 0],
          transition: { rotate: { duration: 0.45 } },
        }}
        whileTap={{ scale: 0.92 }}
        onClick={(e) => {
          e.stopPropagation()
          onRemove?.(item.id)
        }}
        title={item.type === 'custom' ? 'Click to remove' : `${config.label} – click to remove`}
      >
        {item.emoji || config.emoji}
      </motion.span>
    </div>
  )
}

export { itemConfig }
