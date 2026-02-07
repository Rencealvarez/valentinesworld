import { useState, useEffect, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { getSceneData, saveSceneData } from '../utils/sceneStorage'
import { useMusic } from '../context/MusicContext'
import SceneBackground from '../components/scene/SceneBackground'
import SceneItem from '../components/scene/SceneItem'
import SceneMessage from '../components/scene/SceneMessage'
import SceneToolbar from '../components/scene/SceneToolbar'
import FloatingHeartsScene from '../components/scene/FloatingHeartsScene'
import { itemConfig } from '../components/scene/SceneItem'

function generateId() {
  return crypto.randomUUID?.() ?? Date.now().toString(36) + Math.random().toString(36).slice(2)
}

const SCENE_ID = 'camera'

export default function VirtualScene() {
  const { musicOn, musicStartedByUser } = useMusic()
  const [photoDataUrl, setPhotoDataUrl] = useState(null)
  const [items, setItems] = useState([])
  const [messages, setMessages] = useState([])
  const [activeTool, setActiveTool] = useState(null)
  const [showMessageForm, setShowMessageForm] = useState(false)
  const [messageText, setMessageText] = useState('')
  const [messageAuthor, setMessageAuthor] = useState('')
  const [pendingMessagePos, setPendingMessagePos] = useState(null)
  const [customEmoji, setCustomEmoji] = useState('❤️')
  const [cameraActive, setCameraActive] = useState(false)
  const [stream, setStream] = useState(null)
  const [cameraError, setCameraError] = useState(null)
  const sceneRef = useRef(null)
  const videoRef = useRef(null)
  const canvasRef = useRef(null)

  const load = useCallback(() => {
    const data = getSceneData()
    setPhotoDataUrl(data.photoDataUrl ?? null)
    setItems(data.items || [])
    setMessages(data.messages || [])
  }, [])
  useEffect(() => load(), [load])

  const persist = useCallback(() => {
    saveSceneData({ scene: SCENE_ID, photoDataUrl, items, messages })
  }, [photoDataUrl, items, messages])
  useEffect(() => persist(), [persist])

  const startCamera = useCallback(async () => {
    setCameraError(null)
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } })
      setStream(mediaStream)
      setCameraActive(true)
    } catch (e) {
      setCameraError(e.message || 'Could not access camera. Try allowing camera access for this site.')
    }
  }, [])

  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach((t) => t.stop())
      setStream(null)
    }
    setCameraActive(false)
    if (videoRef.current) videoRef.current.srcObject = null
  }, [stream])

  useEffect(() => {
    if (stream && videoRef.current) {
      videoRef.current.srcObject = stream
    }
  }, [stream])

  useEffect(() => {
    return () => {
      if (stream) stream.getTracks().forEach((t) => t.stop())
    }
  }, [stream])

  const takePhoto = useCallback(() => {
    const video = videoRef.current
    const canvas = canvasRef.current
    if (!video || !canvas || !stream) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    ctx.drawImage(video, 0, 0)
    const dataUrl = canvas.toDataURL('image/jpeg', 0.85)
    stopCamera()
    setPhotoDataUrl(dataUrl)
  }, [stream, stopCamera])

  const retakePhoto = useCallback(() => {
    setPhotoDataUrl(null)
    setItems([])
    setMessages([])
    setPendingMessagePos(null)
  }, [])

  const handleSceneClick = (e) => {
    if (pendingMessagePos) return
    if (!sceneRef.current) return
    const rect = sceneRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100

    if (activeTool === 'message') {
      setPendingMessagePos({ x, y })
      setShowMessageForm(true)
      setActiveTool(null)
      return
    }
    if (activeTool) {
      const emoji = activeTool === 'custom' ? (customEmoji?.trim() || '❤️') : itemConfig[activeTool]?.emoji
      setItems((prev) => [
        ...prev,
        { id: generateId(), type: activeTool, x, y, emoji },
      ])
    }
  }

  const onPlaceMessageSubmit = () => {
    if (!messageText.trim()) return
    const pos = pendingMessagePos || { x: 30 + Math.random() * 40, y: 30 + Math.random() * 40 }
    setMessages((prev) => [
      ...prev,
      {
        id: generateId(),
        text: messageText.trim(),
        author: messageAuthor.trim() || 'Anonymous',
        x: pos.x,
        y: pos.y,
      },
    ])
    setMessageText('')
    setMessageAuthor('')
    setShowMessageForm(false)
    setPendingMessagePos(null)
  }

  const removeItem = (id) => setItems((prev) => prev.filter((i) => i.id !== id))
  const removeMessage = (id) => setMessages((prev) => prev.filter((m) => m.id !== id))

  const handleExportSnapshot = () => {
    const canvas = document.createElement('canvas')
    const dpr = 2
    canvas.width = 800 * dpr
    canvas.height = 500 * dpr
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    if (photoDataUrl) {
      const img = new Image()
      img.crossOrigin = 'anonymous'
      img.onload = () => {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
        drawItemsAndDownload(ctx, canvas, dpr)
      }
      img.src = photoDataUrl
    } else {
      const g = ctx.createLinearGradient(0, 0, 0, canvas.height)
      g.addColorStop(0, '#fce7f3')
      g.addColorStop(0.5, '#fbcfe8')
      g.addColorStop(1, '#f9a8d4')
      ctx.fillStyle = g
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      drawItemsAndDownload(ctx, canvas, dpr)
    }
  }

  function drawItemsAndDownload(ctx, canvas, dpr) {
    ctx.scale(dpr, dpr)
    const scaleX = 800 / 100
    const scaleY = 500 / 100
    items.forEach((item) => {
      const emoji = item.emoji || itemConfig[item.type]?.emoji || '❤️'
      ctx.font = '48px serif'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(emoji, item.x * scaleX, item.y * scaleY)
    })
    messages.forEach((msg) => {
      ctx.font = '14px serif'
      ctx.fillStyle = '#831843'
      ctx.textAlign = 'center'
      const x = msg.x * scaleX
      const y = msg.y * scaleY
      ctx.fillText(msg.text.slice(0, 30), x, y)
    })
    canvas.toBlob((blob) => {
      if (!blob) return
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'valentines-scene.png'
      a.click()
      URL.revokeObjectURL(url)
    }, 'image/png')
  }

  const showCameraUI = !photoDataUrl
  const showCameraPreview = showCameraUI && cameraActive
  const showUseCameraPrompt = showCameraUI && !cameraActive
  const showInteractiveScene = !!photoDataUrl
  const canPlaceOnScene = showCameraPreview || showInteractiveScene

  return (
    <div className="min-h-screen bg-valentine-50/40 relative">
      <div className="max-w-4xl mx-auto px-page py-section w-full min-w-0">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-script text-fluid-3xl sm:text-3xl md:text-4xl text-valentine-600 mb-2 sm:mb-4 text-center"
        >
          Virtual Valentine Scene
        </motion.h1>
        {!musicStartedByUser && !musicOn && (
          <p className="text-center text-rose-600/90 text-fluid-sm mb-4">Tap anywhere to start background music</p>
        )}

        <SceneToolbar
          activeTool={activeTool}
          setActiveTool={setActiveTool}
          onExportSnapshot={handleExportSnapshot}
          showMessageForm={showMessageForm}
          setShowMessageForm={setShowMessageForm}
          messageText={messageText}
          setMessageText={setMessageText}
          messageAuthor={messageAuthor}
          setMessageAuthor={setMessageAuthor}
          onPlaceMessageSubmit={onPlaceMessageSubmit}
          photoDataUrl={photoDataUrl}
          onRetakePhoto={retakePhoto}
          customEmoji={customEmoji}
          setCustomEmoji={setCustomEmoji}
        />

        {activeTool && activeTool !== 'message' && canPlaceOnScene && (
          <p className="text-fluid-sm text-rose-600 mb-2 px-1">
            {activeTool === 'custom'
              ? 'Pick your emoji above, then click on the scene to place it.'
              : `Click on the scene to place a ${itemConfig[activeTool]?.label || 'item'}.`}
          </p>
        )}
        {activeTool === 'message' && !showMessageForm && canPlaceOnScene && (
          <p className="text-fluid-sm text-rose-600 mb-2 px-1">Click on the scene to choose where to place your message.</p>
        )}

        <div className="w-full min-w-0">
        <motion.div
          ref={sceneRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="relative rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden shadow-photo-card border-2 sm:border-[3px] border-valentine-200 aspect-[16/10] min-h-[200px] xs:min-h-[220px] sm:min-h-[280px] bg-valentine-100 cursor-crosshair ring-2 ring-valentine-300/40 ring-inset w-full"
          onClick={canPlaceOnScene ? handleSceneClick : undefined}
        >
          {(showUseCameraPrompt || showInteractiveScene) && <FloatingHeartsScene />}
          {showUseCameraPrompt && (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-page sm:p-6 bg-valentine-50/95 rounded-xl sm:rounded-2xl md:rounded-3xl z-10">
              <p className="text-rose-600 text-fluid-sm text-center mb-4 sm:mb-5">Use your photo as the scene background</p>
              <motion.button
                type="button"
                onClick={startCamera}
                className="min-h-touch min-w-touch px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-gradient-to-b from-valentine-500 to-valentine-600 text-white text-fluid-sm font-medium shadow-soft-lg hover:from-valentine-600 hover:to-valentine-700 hover:shadow-card active:scale-[0.98] transition-all duration-200"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                📷 Use Camera
              </motion.button>
              <p className="mt-4 sm:mt-5 text-fluid-sm text-rose-500 text-center max-w-xs">
                Camera is only used to take your photo. Nothing is uploaded.
              </p>
              {cameraError && (
                <p className="mt-3 text-rose-600 text-xs text-center max-w-sm">{cameraError}</p>
              )}
            </div>
          )}

          {showCameraPreview && (
            <>
              <div className="absolute inset-0 bg-black/10">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                  style={{ transform: 'scaleX(-1)' }}
                />
              </div>
              <div className="absolute top-0 left-0 right-0 rounded-t-xl sm:rounded-t-2xl md:rounded-t-3xl py-2.5 px-3 bg-black/40 backdrop-blur-sm z-20">
                <p className="text-center text-white/95 text-xs sm:text-sm">
                  Camera is only used to take your photo. Nothing is uploaded.
                </p>
              </div>
              {cameraError && (
                <p className="absolute top-12 left-0 right-0 text-center text-rose-200 text-sm px-4 z-20">
                  {cameraError}
                </p>
              )}
              <div className="absolute bottom-0 left-0 right-0 rounded-b-xl sm:rounded-b-2xl md:rounded-b-3xl pt-6 pb-3 sm:pt-6 sm:pb-4 flex justify-center items-center bg-gradient-to-t from-black/80 from-40% via-black/50 via-60% to-transparent z-20 min-h-0">
                <motion.button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); takePhoto() }}
                  className="shrink-0 rounded-full w-14 h-14 sm:w-20 sm:h-20 min-h-touch min-w-touch flex items-center justify-center border-[3px] sm:border-4 border-white bg-white/25 shadow-xl hover:bg-white/35 active:bg-white/45 focus:outline-none focus:ring-2 focus:ring-white/60 focus:ring-offset-2 focus:ring-offset-transparent"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.92 }}
                  title="Take photo"
                  aria-label="Take photo"
                >
                  <span className="sr-only">Take photo</span>
                </motion.button>
              </div>
              {items.map((item) => (
                <SceneItem key={item.id} item={item} onRemove={removeItem} />
              ))}
              {messages.map((msg) => (
                <SceneMessage key={msg.id} message={msg} onRemove={removeMessage} />
              ))}
            </>
          )}

          {showInteractiveScene && (
            <>
              <div className="absolute inset-0 rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden z-[1]">
                <SceneBackground sceneId={SCENE_ID} photoDataUrl={photoDataUrl} />
              </div>
              {items.map((item) => (
                <SceneItem key={item.id} item={item} onRemove={removeItem} />
              ))}
              {messages.map((msg) => (
                <SceneMessage key={msg.id} message={msg} onRemove={removeMessage} />
              ))}
            </>
          )}
        </motion.div>
        </div>

        {showMessageForm && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-page sm:p-4 rounded-xl sm:rounded-2xl bg-white/95 shadow-soft border border-valentine-200 w-full min-w-0"
          >
            <h4 className="font-medium text-rose-700 mb-2 text-fluid-sm sm:text-base">Leave a message</h4>
            <input
              type="text"
              placeholder="Your name (optional)"
              value={messageAuthor}
              onChange={(e) => setMessageAuthor(e.target.value)}
              className="w-full rounded-lg sm:rounded-xl border border-valentine-200 px-3 py-2 text-fluid-sm mb-2 min-w-0"
            />
            <textarea
              placeholder="Your message..."
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              rows={2}
              className="w-full rounded-lg sm:rounded-xl border border-valentine-200 px-3 py-2 text-fluid-sm resize-none min-w-0"
            />
            <div className="flex flex-wrap gap-2 mt-2">
              <motion.button
                type="button"
                onClick={onPlaceMessageSubmit}
                className="min-h-touch px-4 py-2 rounded-xl bg-valentine-500 text-white text-fluid-sm font-medium hover:bg-valentine-600"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Place message
              </motion.button>
              <button
                type="button"
                onClick={() => { setShowMessageForm(false); setMessageText(''); setMessageAuthor(''); setActiveTool(null); setPendingMessagePos(null) }}
                className="min-h-touch px-4 py-2 rounded-xl bg-gray-100 text-fluid-sm hover:bg-gray-200 transition"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        )}

        <canvas ref={canvasRef} className="hidden" />
      </div>
    </div>
  )
}
