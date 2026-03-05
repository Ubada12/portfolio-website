/**
 * Conversation action definitions.
 *
 * Returns the list of options shown in the ConversationLauncher modal:
 * send a project message, email directly, or dismiss.
 */

import { ConversationAction } from "./types"
import { PERSONAL_INFO } from "@/constants/personal"
import { CONVERSATION_ACTIONS } from "@/constants/footer"

const ACTION_HANDLERS: Record<string, (close: () => void) => void> = {
  project: (close) => {
    close()
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })
    setTimeout(() => {
      document.querySelector("textarea")?.focus()
    }, 600)
  },
  email: (close) => {
    close()
    window.location.href =
      `mailto:${PERSONAL_INFO.email}?subject=Project inquiry from portfolio`
  },
  explore: (close) => {
    close()
  },
}

export function getConversationActions(
  close: () => void,
): ConversationAction[] {
  return CONVERSATION_ACTIONS.map((action) => ({
    id: action.id,
    label: action.label,
    description: action.description,
    onSelect: () => ACTION_HANDLERS[action.id]?.(close),
  }))
}
