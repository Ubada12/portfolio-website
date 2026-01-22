import { ConversationAction } from "./types"

export function getConversationActions(
  close: () => void,
): ConversationAction[] {
  return [
    {
      id: "project",
      label: "Send a project message",
      description: "Tell me about your idea or requirement",
      onSelect: () => {
        close()
        document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })
        setTimeout(() => {
          document.querySelector("textarea")?.focus()
        }, 600)
      },
    },
    {
      id: "call",
      label: "Book a quick call",
      description: "15–30 min intro discussion",
      onSelect: () => {
        close()
        window.open("https://cal.com/your-link", "_blank")
      },
    },
    {
      id: "email",
      label: "Email me directly",
      description: "Open your email client",
      onSelect: () => {
        close()
        window.location.href =
          "mailto:hello@johndoe.dev?subject=Project inquiry from portfolio"
      },
    },
    {
      id: "explore",
      label: "Just exploring",
      description: "No pressure — browse freely",
      onSelect: () => {
        close()
      },
    },
  ]
}
