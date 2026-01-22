"use client"

import { useRef, useState, useEffect, useMemo } from "react"
import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence } from "framer-motion"

/** Data */
import { processSteps } from "./ProcessSteps"

/** Reusable components */
import { CardStage } from "./CardStage"
import { ProcessHeader } from "./ProcessHeader"
import { ProgressIndicators } from "./ProgressIndicators"

export function EngineeringProcess() {
  const targetRef = useRef<HTMLDivElement | null>(null)
  const [activeStep, setActiveStep] = useState(0)
  const [isInView, setIsInView] = useState(false)

  const { scrollYProgress } = useScroll({
    target: targetRef,
  })

  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-95%"])
  
  const glowIntensity = useTransform(scrollYProgress, [0, 0.5, 1], [0.2, 0.6, 0.2])

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const stepIndex = Math.min(
      Math.floor(latest * processSteps.length),
      processSteps.length - 1
    )
    setActiveStep(stepIndex)
    setIsInView(latest > 0.01 && latest < 0.99)
  })

  const currentColor = processSteps[activeStep]?.color || "#8B5CF6"

  return (
    <section
      id="process"
      ref={targetRef}
      className="relative h-[400vh] overflow-x-clip"
    >
      <motion.div 
        className="absolute inset-0 transition-colors duration-700"
        style={{
          background: `linear-gradient(135deg, 
            hsl(var(--background)) 0%, 
            ${currentColor}08 30%, 
            ${currentColor}12 50%, 
            ${currentColor}08 70%, 
            hsl(var(--background)) 100%)`
        }}
      />
      
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ opacity: glowIntensity }}
        >
          <div 
            className="absolute top-1/4 left-1/4 w-[300px] sm:w-[400px] md:w-[600px] h-[300px] sm:h-[400px] md:h-[600px] rounded-full blur-[100px] md:blur-[150px] transition-colors duration-700"
            style={{ backgroundColor: `${currentColor}20` }}
          />
          <div 
            className="absolute bottom-1/4 right-1/4 w-[250px] sm:w-[350px] md:w-[500px] h-[250px] sm:h-[350px] md:h-[500px] rounded-full blur-[80px] md:blur-[120px] transition-colors duration-700"
            style={{ backgroundColor: `${currentColor}15` }}
          />
        </motion.div>

        <GridBackground activeStep={activeStep} />

        <AnimatePresence>
          {isInView && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="absolute top-16 sm:top-20 md:top-24 left-0 right-0 z-20"
            >
              <ProcessHeader activeStep={activeStep} totalSteps={processSteps.length} />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex h-full items-center pt-12 sm:pt-10 md:pt-6 pb-28 sm:pb-24 md:pb-20 overflow-hidden">
          <motion.div style={{ x }} className="flex will-change-transform">
            <CardStage activeStep={activeStep} />
          </motion.div>
        </div>

        <AnimatePresence>
          {isInView && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
              className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-0 right-0 z-20"
            >
              <ProgressIndicators activeStep={activeStep} scrollProgress={scrollYProgress} />
            </motion.div>
          )}
        </AnimatePresence>

        <FloatingParticles color={currentColor} />
      </div>
    </section>
  )
}

function GridBackground({ activeStep }: { activeStep: number }) {
  const color = processSteps[activeStep]?.color || "#8B5CF6"
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div 
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
        animate={{ opacity: [0.03, 0.06, 0.03] }}
        transition={{ duration: 4, repeat: Infinity }}
        style={{
          backgroundImage: `
            linear-gradient(${color}40 1px, transparent 1px),
            linear-gradient(90deg, ${color}40 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}
      />
      
      <motion.div
        className="absolute inset-0"
        animate={{ 
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, ${color}05 0%, transparent 50%)`
        }}
      />
    </div>
  )
}

function FloatingParticles({ color }: { color: string }) {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])

  const particles = useMemo(() => {
    if (!mounted) return []
    return [...Array(15)].map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 3 + Math.random() * 2,
      delay: Math.random() * 3,
    }))
  }, [mounted])

  if (!mounted) return null

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-1 h-1 rounded-full"
          style={{
            backgroundColor: color,
            left: `${particle.left}%`,
            top: `${particle.top}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0, 0.6, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  )
}
