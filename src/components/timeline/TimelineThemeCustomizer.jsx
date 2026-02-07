import { useState } from 'react'
import { useTimelineTheme } from '../../context/TimelineThemeContext'

const accentOptions = [
  { name: 'Pink', value: '#ec4899' },
  { name: 'Rose', value: '#f43f5e' },
  { name: 'Red', value: '#dc2626' },
  { name: 'Purple', value: '#a855f7' },
  { name: 'Coral', value: '#fb7185' },
]

const fontOptions = [
  { value: 'serif', label: 'Playfair (elegant)' },
  { value: 'sans', label: 'System (clean)' },
  { value: 'script', label: 'Dancing Script (romantic)' },
]

const backgroundOptions = [
  { value: 'gradient-rose', label: 'Rose gradient' },
  { value: 'gradient-pink', label: 'Pink gradient' },
  { value: 'gradient-lavender', label: 'Lavender gradient' },
  { value: 'solid-cream', label: 'Cream' },
]

export default function TimelineThemeCustomizer() {
  const { theme, setTheme } = useTimelineTheme()
  const [open, setOpen] = useState(false)
  return (
    <div className="rounded-2xl bg-white/90 shadow-soft border border-valentine-200/60 p-4 max-w-md mx-auto">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between font-medium text-rose-700 text-sm sm:text-base py-1 rounded-xl hover:bg-valentine-50/50 transition-colors"
      >
        <span>🎨 Customize timeline</span>
        <span className="text-valentine-500">{open ? '▼' : '▶'}</span>
      </button>
      {open && (
        <div className="mt-4 space-y-4 pt-4 border-t border-valentine-100">
          <div>
            <label className="block text-sm text-rose-600 mb-2">Accent color</label>
            <div className="flex flex-wrap gap-2">
              {accentOptions.map(({ name, value }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setTheme({ accentColor: value })}
                  className={`w-8 h-8 rounded-full border-2 transition ${
                    theme.accentColor === value ? 'border-rose-800 scale-110' : 'border-transparent'
                  }`}
                  style={{ backgroundColor: value }}
                  title={name}
                />
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm text-rose-600 mb-2">Font</label>
            <select
              value={theme.fontFamily}
              onChange={(e) => setTheme({ fontFamily: e.target.value })}
              className="w-full rounded-xl border-2 border-valentine-200 px-3 py-2 text-sm"
            >
              {fontOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm text-rose-600 mb-2">Background</label>
            <select
              value={theme.backgroundTheme}
              onChange={(e) => setTheme({ backgroundTheme: e.target.value })}
              className="w-full rounded-xl border-2 border-valentine-200 px-3 py-2 text-sm"
            >
              {backgroundOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  )
}
