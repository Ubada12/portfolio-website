"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { getConversationActions } from "./ConversationActions"

type Props = {
  open: boolean
  onClose: () => void
}

export function ConversationLauncher({ open, onClose }: Props) {
  const actions = getConversationActions(onClose)

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal wrapper */}
          <motion.div
            className="fixed inset-0 z-[110] flex items-center justify-center px-4"
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            {/* Glow shell */}
            <div className="relative w-full max-w-md">
              <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-br from-primary/30 via-transparent to-accent/30 blur-xl opacity-80" />

              {/* Card */}
              <motion.div
                onClick={(e) => e.stopPropagation()}
                className="
                  relative rounded-3xl
                  bg-background/85 dark:bg-card/70
                  backdrop-blur-xl
                  border border-border/60
                  shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)]
                  overflow-hidden
                "
              >
                {/* Noise texture */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-[0.05]"
                  style={{
                    backgroundImage:
                      "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"120\" height=\"120\"><filter id=\"n\"><feTurbulence type=\"fractalNoise\" baseFrequency=\"0.8\" numOctaves=\"4\"/></filter><rect width=\"120\" height=\"120\" filter=\"url(%23n)\" opacity=\"0.4\"/></svg>')",
                  }}
                />

                {/* Header */}
                <div className="relative flex items-start justify-between px-6 py-5 border-b border-border/40">
                  <div>
                    <h3 className="text-base font-semibold text-foreground">
                      Start a conversation
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Choose how you’d like to connect
                    </p>
                  </div>

                  <button
                    onClick={onClose}
                    className="
                      rounded-full p-2
                      text-muted-foreground
                      hover:text-foreground
                      hover:bg-muted/50
                      transition
                    "
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Actions */}
                <div className="relative p-3 space-y-2">
                  {actions.map((action, i) => (
                    <motion.button
                      key={action.id}
                      onClick={action.onSelect}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.05 * i }}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="
                        group relative w-full text-left
                        rounded-2xl px-5 py-4
                        border border-border/50
                        bg-muted/40
                        transition-all duration-300
                        hover:border-primary/40
                        hover:bg-primary/10
                        overflow-hidden
                      "
                    >
                      {/* Hover glow */}
                      <div className="
                        absolute inset-0 opacity-0
                        group-hover:opacity-100
                        transition-opacity duration-500
                        bg-gradient-to-r from-primary/10 via-transparent to-accent/10
                      " />

                      {/* Content */}
                      <div className="relative">
                        <div className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                          {action.label}
                        </div>
                        <div className="text-xs text-muted-foreground mt-0.5">
                          {action.description}
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>

                {/* Footer hint */}
                <div className="px-6 py-4 text-center text-xs text-muted-foreground border-t border-border/30">
                  No pressure — you’re just starting the conversation.
                </div>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
