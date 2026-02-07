import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Timeline from './pages/Timeline'
import VirtualScene from './pages/VirtualScene'
import FloatingHeartsBackground from './components/FloatingHeartsBackground'
import { TimelineThemeProvider } from './context/TimelineThemeContext'
import { MusicProvider } from './context/MusicContext'
import MusicHint from './components/MusicHint'

function App() {
  return (
    <MusicProvider>
    <TimelineThemeProvider>
      <div className="min-h-screen flex flex-col relative">
        {/* Subtle animated gradient (pink to red) */}
        <div className="fixed inset-0 bg-gradient-animated z-0" aria-hidden />
        {/* Gentle floating hearts */}
        <FloatingHeartsBackground />
        <Navbar />
        <MusicHint />
        <main className="flex-1 relative z-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/timeline" element={<Timeline />} />
            <Route path="/scene" element={<VirtualScene />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </TimelineThemeProvider>
    </MusicProvider>
  )
}

export default App
