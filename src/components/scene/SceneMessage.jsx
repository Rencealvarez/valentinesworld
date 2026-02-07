import { motion } from 'framer-motion'

export default function SceneMessage({ message, onRemove }) {
  return (
    <motion.div
      className="absolute max-w-[160px] sm:max-w-[200px] rounded-2xl bg-white/95 shadow-soft border border-valentine-200/80 p-3 cursor-pointer z-10 backdrop-blur-sm"
      style={{
        left: `${message.x}%`,
        top: `${message.y}%`,
        transform: 'translate(-50%, -50%)',
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      whileHover={{
        scale: 1.05,
        boxShadow: '0 10px 40px -10px rgba(236, 72, 153, 0.2)',
      }}
      whileTap={{ scale: 0.98 }}
      onClick={(e) => {
        e.stopPropagation()
        onRemove?.(message.id)
      }}
    >
      <p className="text-xs sm:text-sm text-rose-800 font-serif leading-snug">{message.text}</p>
      {message.author && (
        <p className="text-xs text-valentine-500 mt-1">— {message.author}</p>
      )}
    </motion.div>
  )
}
