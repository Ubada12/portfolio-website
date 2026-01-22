"use client"

import { motion } from "framer-motion"
import { processSteps } from "./ProcessSteps"
import { ProcessCard } from "./ProcessCard"

interface CardStageProps {
  activeStep: number
}

export function CardStage({ activeStep }: CardStageProps) {
  return (
    <div className="flex items-center gap-[clamp(16px,4vw,40px)] px-[clamp(8px,4vw,60px)]">
      <div className="w-[clamp(8px,2vw,20px)] flex-shrink-0" />
      
      {processSteps.map((step, index) => (
        <motion.div
          key={step.id}
          className="flex-shrink-0 flex items-center justify-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ 
            opacity: 1, 
            y: 0,
          }}
          transition={{ 
            delay: index * 0.1,
            duration: 0.6,
            ease: "easeOut"
          }}
        >
          <ProcessCard 
            step={step} 
            isActive={index === activeStep}
            index={index}
          />
        </motion.div>
      ))}
      
      <div className="w-[clamp(8px,2vw,20px)] flex-shrink-0" />
    </div>
  )
}
