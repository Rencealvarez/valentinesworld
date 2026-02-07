import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function Home() {
  return (
    <div className="relative max-w-4xl mx-auto px-4 py-8 sm:py-12 md:py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h1 className="font-script text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-valentine-600 mb-3 sm:mb-4">
          Our Valentine's World
        </h1>
        <p className="font-serif text-base sm:text-lg md:text-xl text-rose-700/90 max-w-2xl mx-auto mb-8 sm:mb-10 px-2">
          Celebrate your love story with a timeline of milestones and a shared virtual scene
          where you can leave hearts, flowers, and messages for each other.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
          <Link to="/timeline" className="w-full sm:w-auto">
            <motion.span
              className="block w-full sm:min-w-[200px] px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl bg-valentine-500 text-white font-medium shadow-soft text-center"
              whileHover={{ scale: 1.02, boxShadow: '0 10px 40px -10px rgba(236, 72, 153, 0.25)' }}
              whileTap={{ scale: 0.98 }}
            >
              💕 Love Story Timeline
            </motion.span>
          </Link>
          <Link to="/scene" className="w-full sm:w-auto">
            <motion.span
              className="block w-full sm:min-w-[200px] px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl bg-rose-400/90 text-white font-medium shadow-soft text-center"
              whileHover={{ scale: 1.02, boxShadow: '0 10px 40px -10px rgba(244, 63, 94, 0.25)' }}
              whileTap={{ scale: 0.98 }}
            >
              🌹 Virtual Scene
            </motion.span>
          </Link>
        </div>
      </motion.div>
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="mt-16 sm:mt-20 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6"
      >
        <div className="rounded-2xl sm:rounded-3xl bg-white/80 backdrop-blur-sm p-5 sm:p-6 shadow-soft border border-valentine-100/80">
          <h2 className="font-script text-xl sm:text-2xl text-valentine-600 mb-2">Love Story Timeline</h2>
          <p className="text-rose-700/80 text-sm leading-relaxed">
            Add milestones with dates, titles, messages, and photos. Customize colors and themes.
            Everything is saved locally so your story stays private.
          </p>
        </div>
        <div className="rounded-2xl sm:rounded-3xl bg-white/80 backdrop-blur-sm p-5 sm:p-6 shadow-soft border border-valentine-100/80">
          <h2 className="font-script text-xl sm:text-2xl text-valentine-600 mb-2">Virtual Valentine Scene</h2>
          <p className="text-rose-700/80 text-sm leading-relaxed">
            Pick a romantic scene and click to place hearts, flowers, and love notes. Leave
            messages for each other and optionally play soft background music.
          </p>
        </div>
      </motion.section>
    </div>
  )
}
