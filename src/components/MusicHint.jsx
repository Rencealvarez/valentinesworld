import { useMusic } from '../context/MusicContext'

export default function MusicHint() {
  const { musicStartedByUser, musicOn } = useMusic()
  if (musicStartedByUser || musicOn) return null
  return (
    <div className="bg-valentine-100/90 border-b border-valentine-200/60 py-1.5 px-3 text-center">
      <p className="text-fluid-sm text-rose-600">Tap anywhere to start background music</p>
    </div>
  )
}
