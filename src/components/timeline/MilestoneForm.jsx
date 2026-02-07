import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { useTimelineTheme } from '../../context/TimelineThemeContext'

const defaultMilestone = {
  id: null,
  date: '',
  title: '',
  message: '',
  photo: null,
}

export default function MilestoneForm({ initial, onSave, onCancel }) {
  const [form, setForm] = useState(
    () => initial || { ...defaultMilestone, id: crypto.randomUUID() }
  )
  const [dragOver, setDragOver] = useState(false)
  const fileInputRef = useRef(null)
  const { theme } = useTimelineTheme()

  const accentStyle = { borderColor: theme.accentColor, color: theme.accentColor }

  const handleChange = (field, value) => setForm((prev) => ({ ...prev, [field]: value }))

  const handleFile = (file) => {
    if (!file?.type.startsWith('image/')) return
    const reader = new FileReader()
    reader.onload = () => handleChange('photo', reader.result)
    reader.readAsDataURL(file)
  }

  const onDrop = (e) => {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }

  const onDragOver = (e) => {
    e.preventDefault()
    setDragOver(true)
  }
  const onDragLeave = () => setDragOver(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl sm:rounded-3xl bg-white/98 shadow-card border-2 p-5 sm:p-6 max-w-xl mx-auto"
      style={{ borderColor: theme.accentColor + '40' }}
    >
      <h3 className="font-script text-2xl mb-4" style={accentStyle}>
        {initial ? 'Edit milestone' : 'New milestone'}
      </h3>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          if (form.date && form.title) onSave(form)
        }}
        className="space-y-4"
      >
        <div>
          <label className="block text-sm font-medium text-rose-700 mb-1">Date</label>
          <input
            type="date"
            value={form.date}
            onChange={(e) => handleChange('date', e.target.value)}
            className="w-full rounded-xl border-2 px-4 py-2 focus:ring-2 focus:ring-valentine-200 outline-none transition"
            style={accentStyle}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-rose-700 mb-1">Title</label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => handleChange('title', e.target.value)}
            placeholder="e.g. First date"
            className="w-full rounded-xl border-2 px-4 py-2 focus:ring-2 focus:ring-valentine-200 outline-none transition"
            style={accentStyle}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-rose-700 mb-1">Message (optional)</label>
          <textarea
            value={form.message}
            onChange={(e) => handleChange('message', e.target.value)}
            placeholder="A few words about this moment..."
            rows={3}
            className="w-full rounded-xl border-2 px-4 py-2 focus:ring-2 focus:ring-valentine-200 outline-none transition resize-none"
            style={accentStyle}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-rose-700 mb-1">Photo (optional)</label>
          <div
            onDrop={onDrop}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition ${
              dragOver ? 'bg-valentine-50' : 'bg-valentine-50/50 hover:bg-valentine-50'
            }`}
            style={accentStyle}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFile(e.target.files[0])}
            />
            {form.photo ? (
              <div className="relative inline-block">
                <img
                  src={form.photo}
                  alt="Preview"
                  className="max-h-32 rounded-lg object-cover mx-auto"
                />
                <span className="text-sm text-rose-600 mt-2 block">Click or drag to replace</span>
              </div>
            ) : (
              <p className="text-rose-600">Drag & drop a photo here or click to choose</p>
            )}
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <motion.button
            type="submit"
            className="flex-1 py-3 rounded-2xl font-medium text-white shadow-soft"
            style={{ backgroundColor: theme.accentColor }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Save
          </motion.button>
          <motion.button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 rounded-2xl bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Cancel
          </motion.button>
        </div>
      </form>
    </motion.div>
  )
}
