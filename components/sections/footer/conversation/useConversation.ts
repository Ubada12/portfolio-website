import { useState } from "react"

export function useConversation() {
  const [open, setOpen] = useState(false)

  return {
    open,
    openConversation: () => setOpen(true),
    closeConversation: () => setOpen(false),
  }
}
