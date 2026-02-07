import { motion } from 'framer-motion'
import { itemConfig } from './SceneItem'

const itemTypes = Object.entries(itemConfig)

export default function SceneToolbar({
  activeTool,
  setActiveTool,
  onExportSnapshot,
  showMessageForm,
  setShowMessageForm,
  messageText,
  setMessageText,
  messageAuthor,
  setMessageAuthor,
  onPlaceMessageSubmit,
  photoDataUrl,
  onRetakePhoto,
  customEmoji,
  setCustomEmoji,
}) {
  const handlePlace = (type) => {
    setActiveTool(type)
    setShowMessageForm(false)
  }
  const hasPhoto = !!photoDataUrl
  const isCustom = activeTool === 'custom'

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 p-page sm:p-4 bg-white/95 rounded-xl sm:rounded-2xl shadow-soft border border-valentine-100 mb-4 w-full min-w-0">
        <div className="flex flex-wrap items-center gap-2 min-w-0">
          <span className="text-fluid-sm font-medium text-rose-700 shrink-0">Add:</span>
          {itemTypes.map(([type, { emoji, label }]) => (
            <motion.button
              key={type}
              type="button"
              onClick={() => handlePlace(type)}
              className={`flex items-center justify-center gap-1 min-h-touch min-w-touch px-2 xs:px-3 py-2 rounded-xl sm:rounded-2xl text-lg xs:text-xl sm:text-2xl transition-colors touch-manipulation shrink-0 ${
                activeTool === type ? 'bg-valentine-200 ring-2 ring-valentine-400 shadow-sm' : 'bg-valentine-50 hover:bg-valentine-100 active:bg-valentine-200'
              } ${type === 'custom' ? 'min-w-[3rem] xs:min-w-[4.5rem]' : ''}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title={type === 'custom' ? 'Custom emoji' : label}
            >
              <span className="shrink-0">{emoji}</span>
              {type === 'custom' && <span className="hidden xs:inline text-fluid-sm font-medium text-rose-700 whitespace-nowrap">Custom</span>}
            </motion.button>
          ))}
          <motion.button
            type="button"
            onClick={() => { setActiveTool('message'); setShowMessageForm(false) }}
            className="min-h-touch min-w-touch p-2 xs:p-3 rounded-xl sm:rounded-2xl text-lg sm:text-xl bg-valentine-50 hover:bg-valentine-100 active:bg-valentine-200 transition-colors touch-manipulation shrink-0"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title="Leave a message"
          >
            💬
          </motion.button>
        </div>
        {isCustom && setCustomEmoji && (
          <div className="flex flex-col gap-2 w-full sm:w-auto order-first sm:order-none basis-full sm:basis-auto min-w-0">
            <div className="flex items-center gap-2 min-w-0">
              <label className="text-fluid-sm font-medium text-rose-700 whitespace-nowrap shrink-0">Your emoji:</label>
              <input
                type="text"
                inputMode="text"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                value={customEmoji || ''}
                onChange={(e) => setCustomEmoji(e.target.value)}
                placeholder="Tap below or type"
                className="flex-1 sm:flex-none min-w-0 w-16 xs:w-20 sm:w-24 text-center text-fluid-xl sm:text-2xl rounded-lg sm:rounded-xl border-2 border-valentine-300 px-2 sm:px-3 py-2 bg-white focus:border-valentine-500 focus:ring-2 focus:ring-valentine-200 outline-none"
                maxLength={8}
                title="Type or tap an emoji below, then click on the scene to place it"
              />
            </div>
            <p className="text-xs text-rose-600">Tap to select:</p>
            <div className="flex flex-wrap gap-1.5">
              {['❤️', '💕', '💗', '🌹', '😊', '🎉', '🌟', '💖', '💝', '✨', '🥰', '💐', '🌸', '🦋', '💌'].map((emoji) => (
                <motion.button
                  key={emoji}
                  type="button"
                  onClick={() => setCustomEmoji(emoji)}
                  className={`text-2xl rounded-xl transition-colors min-w-touch min-h-touch p-2 flex items-center justify-center touch-manipulation ${
                    customEmoji === emoji ? 'bg-valentine-200 ring-2 ring-valentine-400' : 'bg-valentine-50 hover:bg-valentine-100 active:bg-valentine-200'
                  }`}
                  whileTap={{ scale: 0.92 }}
                  title={`Use ${emoji}`}
                >
                  {emoji}
                </motion.button>
              ))}
            </div>
          </div>
        )}
        <div className="flex flex-wrap items-center gap-2 xs:gap-3 sm:ml-auto border-t border-valentine-100 pt-3 sm:border-t-0 sm:pt-0">
          {hasPhoto && onRetakePhoto && (
            <motion.button
              type="button"
              onClick={onRetakePhoto}
              className="min-h-touch px-3 xs:px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl bg-rose-100 text-rose-700 text-fluid-sm font-medium hover:bg-rose-200 active:scale-[0.98] transition-all touch-manipulation border border-rose-200/60 shrink-0"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Retake photo
            </motion.button>
          )}
          <motion.button
            type="button"
            onClick={onExportSnapshot}
            className="min-h-touch px-3 xs:px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl bg-gradient-to-b from-valentine-500 to-valentine-600 text-white text-fluid-sm font-medium shadow-soft hover:from-valentine-600 hover:to-valentine-700 hover:shadow-card active:scale-[0.98] transition-all touch-manipulation shrink-0"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            📷 Snapshot
          </motion.button>
        </div>
      </div>

      {showMessageForm && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 p-4 rounded-2xl bg-white/95 shadow-soft border border-valentine-200"
        >
          <h4 className="font-medium text-rose-700 mb-2 text-sm sm:text-base">Leave a message</h4>
          <input
            type="text"
            placeholder="Your name (optional)"
            value={messageAuthor}
            onChange={(e) => setMessageAuthor(e.target.value)}
            className="w-full rounded-xl border border-valentine-200 px-3 py-2 text-sm mb-2"
          />
          <textarea
            placeholder="Your message..."
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            rows={2}
            className="w-full rounded-xl border border-valentine-200 px-3 py-2 text-sm resize-none"
          />
          <div className="flex gap-3 mt-3">
            <motion.button
              type="button"
              onClick={onPlaceMessageSubmit}
              className="min-h-touch px-5 py-3 rounded-2xl bg-gradient-to-b from-valentine-500 to-valentine-600 text-white text-sm font-medium shadow-soft hover:from-valentine-600 hover:to-valentine-700 active:scale-[0.98] transition-all touch-manipulation"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Place message
            </motion.button>
            <button
              type="button"
              onClick={() => { setShowMessageForm(false); setMessageText(''); setMessageAuthor(''); setActiveTool(null) }}
              className="min-h-touch px-5 py-3 rounded-2xl bg-gray-100 text-sm font-medium hover:bg-gray-200 active:scale-[0.98] transition-all touch-manipulation"
            >
              Cancel
            </button>
          </div>
        </motion.div>
      )}
    </>
  )
}
