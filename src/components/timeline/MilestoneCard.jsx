import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTimelineTheme } from '../../context/TimelineThemeContext'

export default function MilestoneCard({ milestone, onEdit, onDelete }) {
  const [showConfirm, setShowConfirm] = useState(false)
  const { theme } = useTimelineTheme()

  const accentStyle = { color: theme.accentColor }
  const borderStyle = { borderColor: theme.accentColor + '35' }

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 300, damping: 28 }}
      className="rounded-2xl sm:rounded-3xl bg-white shadow-soft border overflow-hidden text-center sm:text-left transition-shadow duration-300 hover:shadow-card-hover hover:-translate-y-0.5"
      style={borderStyle}
    >
      <div className="p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
          <div className="min-w-0 flex-1 mx-auto sm:mx-0 max-w-lg">
            <p className="text-xs sm:text-sm font-medium opacity-80" style={accentStyle}>
              {milestone.date}
            </p>
            <h3 className="font-serif text-lg sm:text-xl font-semibold mt-1" style={accentStyle}>
              {milestone.title}
            </h3>
            {milestone.message && (
              <p className="mt-2 text-rose-800/90 text-sm leading-relaxed">
                {milestone.message}
              </p>
            )}
          </div>
          <div className="flex justify-center sm:justify-end gap-2 shrink-0">
            <motion.button
              type="button"
              onClick={() => onEdit(milestone)}
              className="p-2 rounded-xl hover:bg-valentine-100 transition-colors"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Edit milestone"
            >
              ✏️
            </motion.button>
            {!showConfirm ? (
              <motion.button
                type="button"
                onClick={() => setShowConfirm(true)}
                className="p-2 rounded-xl hover:bg-rose-100 transition-colors"
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Delete milestone"
              >
                🗑️
              </motion.button>
            ) : (
              <div className="flex gap-1.5">
                <button
                  type="button"
                  onClick={() => onDelete(milestone.id)}
                  className="px-2.5 py-1 text-xs rounded-lg bg-rose-500 text-white hover:bg-rose-600 transition"
                >
                  Yes
                </button>
                <button
                  type="button"
                  onClick={() => setShowConfirm(false)}
                  className="px-2.5 py-1 text-xs rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
                >
                  No
                </button>
              </div>
            )}
          </div>
        </div>
        {milestone.photo && (
          <div className="mt-4 rounded-xl overflow-hidden border border-valentine-100/80 shadow-sm">
            <img
              src={milestone.photo}
              alt=""
              className="w-full h-40 sm:h-48 object-cover"
            />
          </div>
        )}
      </div>
    </motion.article>
  )
}
