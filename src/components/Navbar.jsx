import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useMusic } from '../context/MusicContext'

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/timeline', label: 'Love Story' },
  { to: '/scene', label: 'Virtual Scene' },
]

export default function Navbar() {
  const { musicOn, handleMusicToggle } = useMusic()
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-valentine-200/60 shadow-soft">
      <div className="max-w-6xl mx-auto px-page sm:px-6 w-full">
        <div className="flex items-center justify-between min-h-[3rem] sm:min-h-[4rem] gap-2 sm:gap-3">
          <NavLink
            to="/"
            className="flex items-center gap-1 sm:gap-2 text-valentine-600 hover:text-valentine-700 transition-colors min-w-0 flex-1 xs:flex-initial"
          >
            <span className="text-lg sm:text-xl md:text-2xl shrink-0" aria-hidden>💕</span>
            <span className="font-script text-fluid-xl sm:text-xl md:text-2xl font-semibold truncate max-w-[12rem] xs:max-w-[14rem] sm:max-w-none">
              Our Valentine's World
            </span>
          </NavLink>
          <div className="flex items-center gap-1 xs:gap-1.5 sm:gap-2 shrink-0">
          <label className="flex items-center gap-1.5 min-h-touch cursor-pointer touch-manipulation text-rose-600 hover:text-valentine-600 transition-colors" title={musicOn ? 'Mute music' : 'Play music'}>
            <input
              type="checkbox"
              checked={musicOn}
              onChange={(e) => handleMusicToggle(e.target.checked)}
              className="rounded border-valentine-300 w-4 h-4 sm:w-[1.1rem] sm:h-[1.1rem]"
            />
            <span className="text-lg sm:text-xl" aria-hidden>{musicOn ? '🔊' : '🔇'}</span>
          </label>
          <ul className="flex items-center gap-1 xs:gap-1.5 sm:gap-2">
            {navItems.map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    `min-h-touch inline-flex items-center px-2 xs:px-2.5 sm:px-3 py-2 rounded-xl text-fluid-sm sm:text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-valentine-100 text-valentine-700 shadow-sm'
                        : 'text-rose-600 hover:bg-valentine-50 hover:text-valentine-600'
                    }`
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
          </div>
        </div>
      </div>
    </nav>
  )
}
