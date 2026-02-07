import { motion } from 'framer-motion'

/* Back layer: sky / atmosphere */
const BackLayer = ({ sceneId }) => {
  const scenes = {
    park: (
      <div className="absolute inset-0 bg-gradient-to-b from-sky-200/95 via-emerald-100/90 to-green-200/95">
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-green-300/50 rounded-t-[60%]" />
        <div className="absolute top-1/4 left-1/4 w-28 h-28 bg-green-400/30 rounded-full blur-2xl" />
        <div className="absolute top-1/3 right-1/3 w-36 h-36 bg-green-500/25 rounded-full blur-2xl" />
        <div className="absolute bottom-1/4 left-1/2 w-44 h-24 bg-green-400/40 rounded-full blur-xl" />
      </div>
    ),
    beach: (
      <div className="absolute inset-0 bg-gradient-to-b from-sky-300/95 via-amber-100/90 to-amber-200/95">
        <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-amber-300/60" />
        <div className="absolute top-1/3 left-1/4 w-44 h-36 bg-white/25 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-1/4 w-28 h-28 bg-amber-200/35 rounded-full blur-2xl" />
      </div>
    ),
    candlelight: (
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/92 via-purple-900/85 to-rose-950/92">
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-amber-900/25 to-transparent" />
        <div className="absolute top-1/2 left-1/2 w-[28rem] h-[28rem] bg-amber-500/12 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute top-1/3 left-1/3 w-36 h-36 bg-rose-500/18 rounded-full blur-2xl" />
        <div className="absolute bottom-1/3 right-1/4 w-44 h-44 bg-amber-400/12 rounded-full blur-2xl" />
      </div>
    ),
  }
  return <>{scenes[sceneId] || scenes.park}</>
}

/* Foreground decorative layer: subtle hearts/flowers for depth (no pointer events) */
const ForegroundDecor = ({ sceneId }) => {
  const decor = [
    { emoji: '🌸', x: '8%', y: '75%', size: 'text-2xl', delay: 0 },
    { emoji: '💕', x: '92%', y: '18%', size: 'text-xl', delay: 0.3 },
    { emoji: '🌹', x: '5%', y: '25%', size: 'text-xl', delay: 0.5 },
    { emoji: '❤️', x: '88%', y: '70%', size: 'text-2xl', delay: 0.2 },
    { emoji: '🌸', x: '15%', y: '55%', size: 'text-lg', delay: 0.4 },
    { emoji: '💗', x: '82%', y: '40%', size: 'text-lg', delay: 0.6 },
  ]
  const isDark = sceneId === 'candlelight'
  return (
    <div className="absolute inset-0 pointer-events-none z-[1]">
      {decor.map((d, i) => (
        <motion.span
          key={i}
          className={`absolute opacity-40 ${d.size} ${isDark ? 'opacity-30' : ''}`}
          style={{ left: d.x, top: d.y, transform: 'translate(-50%, -50%)' }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: isDark ? 0.25 : 0.4,
            scale: 1,
            y: [0, -6, 0],
          }}
          transition={{
            opacity: { duration: 0.6, delay: d.delay },
            y: { duration: 4 + i * 0.5, repeat: Infinity, ease: 'easeInOut' },
          }}
        >
          {d.emoji}
        </motion.span>
      ))}
    </div>
  )
}

export default function SceneBackground({ sceneId, photoDataUrl }) {
  if (sceneId === 'camera' && photoDataUrl) {
    return (
      <img
        src={photoDataUrl}
        alt="Your scene"
        className="absolute inset-0 w-full h-full object-cover"
      />
    )
  }
  if (sceneId === 'camera') return null
  return (
    <>
      <BackLayer sceneId={sceneId} />
      <ForegroundDecor sceneId={sceneId} />
    </>
  )
}
