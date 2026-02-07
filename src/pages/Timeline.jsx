import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getMilestones, saveMilestones } from '../utils/storage'
import { useTimelineTheme } from '../context/TimelineThemeContext'
import MilestoneCard from '../components/timeline/MilestoneCard'
import MilestoneForm from '../components/timeline/MilestoneForm'
import TimelineThemeCustomizer from '../components/timeline/TimelineThemeCustomizer'
import HeartCelebration from '../components/timeline/HeartCelebration'

const bgClasses = {
  'gradient-rose': 'from-rose-50/75 via-valentine-50/75 to-pink-50/75',
  'gradient-pink': 'from-valentine-100/75 via-pink-50/75 to-rose-50/75',
  'gradient-lavender': 'from-violet-50/75 via-valentine-50/75 to-pink-50/75',
  'solid-cream': 'bg-amber-50/70',
}

export default function Timeline() {
  const [milestones, setMilestones] = useState([])
  const [editing, setEditing] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [showHearts, setShowHearts] = useState(false)
  const { theme } = useTimelineTheme()

  const load = useCallback(() => setMilestones(getMilestones()), [])
  useEffect(() => {
    load()
  }, [load])

  const persist = useCallback((next) => {
    setMilestones((prev) => {
      const nextList = typeof next === 'function' ? next(prev) : next
      saveMilestones(nextList)
      return nextList
    })
  }, [])

  const handleSave = (form) => {
    const isNew = !milestones.some((m) => m.id === form.id)
    persist((prev) => {
      const filtered = prev.filter((m) => m.id !== form.id)
      const updated = [...filtered, { ...form }].sort(
        (a, b) => new Date(a.date) - new Date(b.date)
      )
      return updated
    })
    setEditing(null)
    setShowForm(false)
    if (isNew) {
      setShowHearts(true)
      setTimeout(() => setShowHearts(false), 2200)
    }
  }

  const handleDelete = (id) => {
    persist((prev) => prev.filter((m) => m.id !== id))
  }

  const handleExport = () => {
    const data = JSON.stringify(milestones, null, 2)
    const blob = new Blob([data], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'our-valentines-timeline.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleShare = async () => {
    const text = milestones
      .map((m) => `${m.date}: ${m.title}${m.message ? ` – ${m.message}` : ''}`)
      .join('\n')
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Our Valentine\'s Timeline',
          text,
        })
      } catch (e) {
        if (e.name !== 'AbortError') navigator.clipboard?.writeText(text)
      }
    } else {
      navigator.clipboard?.writeText(text)
    }
  }

  const fontClass =
    theme.fontFamily === 'script'
      ? 'font-script'
      : theme.fontFamily === 'serif'
        ? 'font-serif'
        : 'font-sans'
  const bgClass = bgClasses[theme.backgroundTheme] || bgClasses['gradient-rose']

  return (
    <div className={`min-h-screen bg-gradient-to-br ${bgClass} ${fontClass} relative`}>
      <div className="max-w-3xl mx-auto px-4 py-6 sm:py-10">
        {/* Romantic card container: rounded, shadow, border, centered */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="rounded-3xl bg-white/95 shadow-card border border-valentine-200/80 overflow-hidden"
        >
          <div className="p-6 sm:p-8 text-center">
            <h1 className="font-script text-2xl sm:text-3xl md:text-4xl text-valentine-600 mb-2">
              Love Story Timeline
            </h1>
            <p className="text-rose-600/90 text-sm sm:text-base mb-6 max-w-md mx-auto">
              Your milestones in one place
            </p>

            {/* Actions: stack on mobile */}
            <div className="flex flex-col sm:flex-row sm:flex-wrap items-center justify-center gap-3 mb-6">
              <button
                type="button"
                onClick={handleExport}
                className="w-full sm:w-auto min-w-[140px] px-4 py-2.5 rounded-2xl bg-white border border-valentine-200 text-sm font-medium text-rose-700 shadow-soft hover:bg-valentine-50 hover:shadow-soft-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
              >
                📥 Export
              </button>
              <button
                type="button"
                onClick={handleShare}
                className="w-full sm:w-auto min-w-[140px] px-4 py-2.5 rounded-2xl bg-white border border-valentine-200 text-sm font-medium text-rose-700 shadow-soft hover:bg-valentine-50 hover:shadow-soft-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
              >
                📤 Share
              </button>
              <button
                type="button"
                onClick={() => {
                  setEditing(null)
                  setShowForm(true)
                }}
                className="w-full sm:w-auto min-w-[160px] px-5 py-2.5 rounded-2xl text-white font-medium shadow-soft hover:shadow-soft-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                style={{ backgroundColor: theme.accentColor }}
              >
                + Add milestone
              </button>
            </div>

            <div className="mb-6">
              <TimelineThemeCustomizer />
            </div>
          </div>

          {/* Form or milestone list inside same card */}
          <div className="px-4 sm:px-6 pb-6 sm:pb-8">
            <AnimatePresence mode="wait">
              {showForm ? (
                <motion.div
                  key={editing ? editing.id : 'new'}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="mb-6"
                >
                  <MilestoneForm
                    initial={editing}
                    onSave={handleSave}
                    onCancel={() => {
                      setShowForm(false)
                      setEditing(null)
                    }}
                  />
                </motion.div>
              ) : null}
            </AnimatePresence>

            <div className="space-y-5 max-w-xl mx-auto">
              <AnimatePresence mode="popLayout">
                {milestones.length === 0 && !showForm && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center text-rose-500 py-10 sm:py-12 text-sm sm:text-base"
                  >
                    No milestones yet. Add your first one above.
                  </motion.p>
                )}
                {milestones.map((m) => (
                  <MilestoneCard
                    key={m.id}
                    milestone={m}
                    onEdit={(milestone) => {
                      setEditing(milestone)
                      setShowForm(true)
                    }}
                    onDelete={handleDelete}
                  />
                ))}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
      <AnimatePresence>{showHearts && <HeartCelebration />}</AnimatePresence>
    </div>
  )
}
