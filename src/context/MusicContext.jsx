import { createContext, useContext, useState, useRef, useEffect, useCallback } from 'react'

const MUSIC_STORAGE_KEY = 'valentines-music-on'
const BACKGROUND_MUSIC_URL = '/music/valentine.mp3'
const FALLBACK_MUSIC_URL = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'

const MusicContext = createContext(null)

export function useMusic() {
  const ctx = useContext(MusicContext)
  if (!ctx) throw new Error('useMusic must be used within MusicProvider')
  return ctx
}

export function MusicProvider({ children }) {
  const [musicOn, setMusicOnState] = useState(() => {
    try {
      const saved = localStorage.getItem(MUSIC_STORAGE_KEY)
      return saved !== null ? saved === 'true' : true
    } catch {
      return true
    }
  })
  const [musicUrl, setMusicUrl] = useState(BACKGROUND_MUSIC_URL)
  const [musicStartedByUser, setMusicStartedByUser] = useState(false)
  const audioRef = useRef(null)

  const setMusicOn = useCallback((value) => {
    setMusicOnState(value)
    try {
      localStorage.setItem(MUSIC_STORAGE_KEY, String(value))
    } catch {}
  }, [])

  const startMusic = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.volume = 0.5
    audio.play().catch(() => setMusicOn(false))
  }, [setMusicOn])

  const handleMusicToggle = useCallback((checked) => {
    setMusicOn(checked)
    const audio = audioRef.current
    if (!audio) return
    if (checked) {
      audio.volume = 0.5
      audio.play().catch(() => {})
    } else {
      audio.pause()
    }
  }, [setMusicOn])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    if (musicOn) {
      audio.volume = 0.5
      audio.play().catch(() => setMusicOn(false))
    } else {
      audio.pause()
    }
  }, [musicOn, setMusicOn])

  const handleMusicError = useCallback(() => {
    setMusicUrl((url) => (url === BACKGROUND_MUSIC_URL ? FALLBACK_MUSIC_URL : url))
  }, [])

  useEffect(() => {
    if (musicStartedByUser) return
    const startOnInteraction = () => {
      setMusicStartedByUser(true)
      setMusicOn(true)
      startMusic()
    }
    window.addEventListener('click', startOnInteraction, { once: true })
    window.addEventListener('touchstart', startOnInteraction, { once: true, passive: true })
    return () => {
      window.removeEventListener('click', startOnInteraction)
      window.removeEventListener('touchstart', startOnInteraction)
    }
  }, [musicStartedByUser, setMusicOn, startMusic])

  const handleCanPlay = useCallback(() => {
    if (musicOn && audioRef.current) audioRef.current.play().catch(() => {})
  }, [musicOn])

  const value = {
    musicOn,
    setMusicOn,
    handleMusicToggle,
    musicStartedByUser,
    startMusic,
  }

  return (
    <MusicContext.Provider value={value}>
      {children}
      <audio
        ref={audioRef}
        loop
        preload="auto"
        src={musicUrl}
        onError={handleMusicError}
        onCanPlayThrough={handleCanPlay}
      />
    </MusicContext.Provider>
  )
}
