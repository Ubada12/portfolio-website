"use client"

import { motion } from "framer-motion"
import { Zap, ChevronRight, ArrowRight } from "lucide-react"
import type { ProcessStep } from "./ProcessSteps"

interface ProcessCardProps {
  step: ProcessStep
  isActive: boolean
  index: number
}

export function ProcessCard({ step, isActive, index }: ProcessCardProps) {
  const Icon = step.icon

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
      whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
      viewport={{ once: false, amount: 0.5 }}
      transition={{ 
        type: "spring", 
        stiffness: 100, 
        damping: 20,
        delay: index * 0.1 
      }}
      className="relative w-[clamp(260px,75vw,550px)] max-h-[calc(100vh-180px)]"
      style={{ perspective: "1000px" }}
    >
      <motion.div
        className="absolute -inset-1 sm:-inset-1.5 rounded-xl sm:rounded-2xl opacity-0 blur-lg sm:blur-xl transition-opacity duration-500 -z-10"
        style={{ backgroundColor: step.color }}
        animate={{ opacity: isActive ? 0.15 : 0 }}
      />

      <motion.div
        className="absolute -inset-px sm:-inset-0.5 rounded-xl sm:rounded-2xl opacity-0 -z-10"
        style={{ 
          background: `linear-gradient(135deg, ${step.color}60, transparent 50%, ${step.color}30)`,
        }}
        animate={{ 
          opacity: isActive ? 1 : 0,
          rotate: isActive ? [0, 1, -1, 0] : 0 
        }}
        transition={{ rotate: { duration: 4, repeat: Infinity } }}
      />

      <motion.div
        className="relative rounded-xl sm:rounded-2xl border border-border/50 bg-background/70 dark:bg-background/50 backdrop-blur-2xl overflow-hidden shadow-xl"
        style={{
          padding: "clamp(12px, 2vw, 22px)",
        }}
        animate={{
          scale: isActive ? 1 : 0.95,
          y: isActive ? 0 : 10,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 25 }}
        whileHover={{ 
          scale: 1.02,
          boxShadow: `0 20px 40px -12px ${step.color}25`
        }}
      >
        <div 
          className="absolute top-0 right-0 w-16 sm:w-24 md:w-32 h-16 sm:h-24 md:h-32 rounded-full blur-xl sm:blur-2xl opacity-20 -z-10"
          style={{ backgroundColor: step.color }}
        />
        <div 
          className="absolute bottom-0 left-0 w-12 sm:w-20 md:w-24 h-12 sm:h-20 md:h-24 rounded-full blur-xl sm:blur-2xl opacity-10 -z-10"
          style={{ backgroundColor: step.color }}
        />

        <div 
          className="flex flex-row items-start gap-[clamp(6px,1.2vw,12px)]"
          style={{ marginBottom: "clamp(6px, 1.2vw, 12px)" }}
        >
          <motion.div
            className="relative flex-shrink-0"
            animate={isActive ? {
              rotate: [0, 5, -5, 0],
              scale: [1, 1.05, 1],
            } : {}}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <div
              className="flex items-center justify-center rounded-lg sm:rounded-xl"
              style={{ 
                width: "clamp(32px, 5vw, 44px)",
                height: "clamp(32px, 5vw, 44px)",
                background: `linear-gradient(135deg, ${step.color}30, ${step.color}10)`,
                boxShadow: `0 0 15px ${step.color}20`
              }}
            >
              <Icon 
                style={{ 
                  color: step.color,
                  width: "clamp(14px, 2.5vw, 22px)",
                  height: "clamp(14px, 2.5vw, 22px)",
                }} 
              />
            </div>
            
            <motion.div
              className="absolute -inset-0.5 rounded-lg sm:rounded-xl border opacity-50"
              style={{ borderColor: step.color }}
              animate={{ 
                scale: [1, 1.15, 1], 
                opacity: [0.5, 0, 0.5] 
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />

            <motion.div
              className="absolute -top-0.5 -right-0.5 rounded-full flex items-center justify-center font-bold text-white shadow-lg"
              style={{ 
                backgroundColor: step.color,
                width: "clamp(12px, 1.8vw, 16px)",
                height: "clamp(12px, 1.8vw, 16px)",
                fontSize: "clamp(6px, 0.9vw, 9px)",
              }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
            >
              {step.step}
            </motion.div>
          </motion.div>

          <div className="flex-1 min-w-0">
            <motion.p
              className="uppercase font-semibold"
              style={{ 
                color: step.color,
                fontSize: "clamp(7px, 0.9vw, 9px)",
                letterSpacing: "0.1em",
                marginBottom: "clamp(1px, 0.2vw, 2px)",
              }}
              animate={{ opacity: isActive ? 1 : 0.7 }}
            >
              {step.subtitle}
            </motion.p>
            <h3 
              className="font-bold text-foreground leading-tight"
              style={{ fontSize: "clamp(13px, 2.2vw, 20px)" }}
            >
              {step.title}
            </h3>
          </div>
        </div>

        <motion.div
          className="h-px w-full"
          style={{ 
            background: `linear-gradient(90deg, transparent, ${step.color}50, transparent)`,
            marginBottom: "clamp(6px, 1.2vw, 12px)",
          }}
          animate={{ scaleX: isActive ? 1 : 0.5, opacity: isActive ? 1 : 0.3 }}
          transition={{ duration: 0.5 }}
        />

        <motion.p 
          className="text-muted-foreground leading-relaxed"
          style={{ 
            fontSize: "clamp(9px, 1.1vw, 12px)",
            marginBottom: "clamp(8px, 1.5vw, 14px)",
          }}
          animate={{ opacity: isActive ? 1 : 0.7 }}
        >
          {step.description}
        </motion.p>

        <div>
          <div 
            className="flex items-center"
            style={{ 
              gap: "clamp(3px, 0.6vw, 6px)",
              marginBottom: "clamp(4px, 0.8vw, 8px)",
            }}
          >
            <ArrowRight style={{ width: "clamp(8px, 1vw, 11px)", height: "clamp(8px, 1vw, 11px)", color: step.color }} />
            <span 
              className="uppercase tracking-wider text-muted-foreground font-medium"
              style={{ fontSize: "clamp(6px, 0.8vw, 8px)" }}
            >
              Key Focus Areas
            </span>
          </div>
          
          <div 
            className="grid grid-cols-2"
            style={{ gap: "clamp(3px, 0.6vw, 6px)" }}
          >
            {step.highlights.map((highlight, i) => (
              <motion.div
                key={highlight}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.03, x: 5 }}
                className="group flex items-center rounded-md transition-all duration-300 cursor-default"
                style={{
                  gap: "clamp(3px, 0.6vw, 6px)",
                  padding: "clamp(3px, 0.6vw, 6px) clamp(5px, 0.8vw, 8px)",
                  background: `linear-gradient(135deg, ${step.color}15, ${step.color}05)`,
                  border: `1px solid ${step.color}20`,
                }}
              >
                <motion.div
                  className="flex-shrink-0"
                  animate={isActive ? { rotate: [0, 360] } : {}}
                  transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }}
                >
                  <Zap 
                    style={{ 
                      color: step.color,
                      width: "clamp(7px, 0.9vw, 10px)",
                      height: "clamp(7px, 0.9vw, 10px)",
                    }}
                  />
                </motion.div>
                <span 
                  className="font-medium truncate"
                  style={{ 
                    color: step.color,
                    fontSize: "clamp(7px, 0.9vw, 10px)",
                  }}
                >
                  {highlight}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          className="absolute flex items-center text-muted-foreground/50"
          style={{
            bottom: "clamp(5px, 0.8vw, 10px)",
            right: "clamp(5px, 0.8vw, 10px)",
            gap: "clamp(2px, 0.3vw, 3px)",
            fontSize: "clamp(6px, 0.8vw, 8px)",
          }}
          animate={{ x: isActive ? [0, 5, 0] : 0 }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <span className="hidden sm:inline">Scroll to continue</span>
          <ChevronRight style={{ width: "clamp(8px, 1vw, 12px)", height: "clamp(8px, 1vw, 12px)" }} />
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
