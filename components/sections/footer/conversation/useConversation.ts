/**
 * useConversation Hook
 *
 * Manages the open/closed state of the ConversationLauncher modal.
 * Used by the Footer component to toggle the conversation options overlay.
 */

import { useState } from "react"

export function useConversation() {
  const [open, setOpen] = useState(false)

  return {
    open,
    openConversation: () => setOpen(true),
    closeConversation: () => setOpen(false),
  }
}
