import {
  Lightbulb,
  PenTool,
  Code2,
  Rocket,
} from "lucide-react"

export type ProcessStep = {
  id: number              // ✅ for React keys
  step: number            // ✅ for UI numbering
  title: string
  subtitle: string
  description: string
  icon: React.ElementType
  color: string
  highlights: string[]
}

export const processSteps: ProcessStep[] = [
  {
    id: 1,
    step: 1,
    title: "Discovery & Ideation",
    subtitle: "Understanding the Vision",
    description:
      "Every great product begins with deep understanding. I dive into research, user needs analysis, and the competitive landscape to transform raw ideas into validated concepts.",
    icon: Lightbulb,
    color: "#F59E0B",
    highlights: [
      "User Research",
      "Market Analysis",
      "Problem Definition",
      "Opportunity Mapping",
    ],
  },
  {
    id: 2,
    step: 2,
    title: "Architecture & Design",
    subtitle: "Blueprinting Excellence",
    description:
      "With clarity on objectives, I craft scalable architectures and intuitive designs. This phase bridges vision with technical feasibility through detailed planning.",
    icon: PenTool,
    color: "#8B5CF6",
    highlights: [
      "System Design",
      "UI/UX Wireframes",
      "Tech Stack Selection",
      "Database Schema",
    ],
  },
  {
    id: 3,
    step: 3,
    title: "Development Sprint",
    subtitle: "Building with Precision",
    description:
      "Code meets creativity. I implement features iteratively, following best practices and clean code principles while maintaining constant communication on progress.",
    icon: Code2,
    color: "#06B6D4",
    highlights: [
      "Agile Development",
      "Code Reviews",
      "CI/CD Pipeline",
      "Performance Optimization",
    ],
  },
  {
    id: 4,
    step: 4,
    title: "Launch & Iterate",
    subtitle: "Delivering Impact",
    description:
      "Deployment is just the beginning. I ensure smooth launches with monitoring, gather real-world feedback, and continuously iterate to maximize product value.",
    icon: Rocket,
    color: "#EC4899",
    highlights: [
      "Deployment Strategy",
      "Performance Monitoring",
      "User Feedback Loop",
      "Continuous Improvement",
    ],
  },
]
