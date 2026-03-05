import {
  Lightbulb,
  PenTool,
  Code2,
  Rocket,
} from "lucide-react"
import { PROCESS_STEPS } from "@/constants/experience"

const ICON_MAP: Record<string, React.ElementType> = {
  Lightbulb,
  PenTool,
  Code2,
  Rocket,
}

export type ProcessStep = {
  id: number
  step: number
  title: string
  subtitle: string
  description: string
  icon: React.ElementType
  color: string
  highlights: string[]
}

export const processSteps: ProcessStep[] = PROCESS_STEPS.map((s) => ({
  ...s,
  highlights: [...s.highlights],
  icon: ICON_MAP[s.iconName],
}))
