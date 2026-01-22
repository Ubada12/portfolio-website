"use client"

import { motion, useScroll, useTransform, useInView, useSpring } from "framer-motion"
import { Github, Linkedin, Twitter, Mail, ArrowUpRight, Sparkles } from "lucide-react"
import { useRef, useEffect, useState } from "react"

/** Conversation hook and launcher */
import { useConversation } from "@/components/sections/footer/conversation/useConversation"
import { ConversationLauncher } from "@/components/sections/footer/conversation/ConversationLauncher"

const socialLinks = [
  { icon: Github, href: "https://github.com", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: Mail, href: "mailto:hello@example.com", label: "Email" },
]

const words = ["innovative", "scalable", "beautiful", "impactful"]

function useTypewriter(words: string[], typingSpeed = 100, deletingSpeed = 50, pauseDuration = 2000) {
  const [text, setText] = useState("")
  const [wordIndex, setWordIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentWord = words[wordIndex]

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (text.length < currentWord.length) {
            setText(currentWord.slice(0, text.length + 1))
          } else {
            setTimeout(() => setIsDeleting(true), pauseDuration)
          }
        } else {
          if (text.length > 0) {
            setText(currentWord.slice(0, text.length - 1))
          } else {
            setIsDeleting(false)
            setWordIndex((prev) => (prev + 1) % words.length)
          }
        }
      },
      isDeleting ? deletingSpeed : typingSpeed,
    )

    return () => clearTimeout(timeout)
  }, [text, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pauseDuration])

  return text
}

function FloatingParticle({ delay, duration, x, y }: { delay: number; duration: number; x: number; y: number }) {
  return (
    <motion.div
      className="absolute w-1 h-1 rounded-full bg-primary/30"
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, 1, 0],
        scale: [0, 1, 0],
        y: [y, y - 100],
        x: [x, x + (Math.random() - 0.5) * 50],
      }}
      transition={{
        duration,
        delay,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeOut",
      }}
    />
  )
}

export function Footer() {
  const containerRef = useRef<HTMLElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, amount: 0.3 })
  const ctaInView = useInView(ctaRef, { once: true, amount: 0.5 })

  const convo = useConversation()

  const typedWord = useTypewriter(words)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1])
  const y = useTransform(scrollYProgress, [0, 0.5], [100, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.9, 1])

  const smoothY = useSpring(y, { stiffness: 100, damping: 30 })
  const smoothScale = useSpring(scale, { stiffness: 100, damping: 30 })

  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    delay: Math.random() * 5,
    duration: 3 + Math.random() * 2,
    x: Math.random() * 100,
    y: Math.random() * 100,
  }))

  return (
    <footer
      ref={containerRef}
      className="relative overflow-x-clip overflow-y-clip border-t border-border/30 bg-gradient-to-b from-background via-background to-card/50"
    >
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px),
                             linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Gradient orbs */}
      <motion.div
        className="absolute -top-40 -left-40 w-80 h-80 rounded-full bg-primary/10 blur-[100px]"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 -right-40 w-80 h-80 rounded-full bg-accent/10 blur-[100px]"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 4 }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <FloatingParticle key={particle.id} {...particle} />
        ))}
      </div>

      <motion.div style={{ opacity, y: smoothY, scale: smoothScale }} className="relative z-10">
        {/* Main CTA Section */}
        <div ref={ctaRef} className="px-4 py-16 sm:py-24 md:py-32 sm:px-6">
          <div className="mx-auto max-w-5xl text-center">
            {/* Sparkle badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={ctaInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                <Sparkles className="w-4 h-4 text-primary" />
              </motion.div>
              <span className="text-sm text-primary font-medium">Available for new opportunities</span>
            </motion.div>

            {/* Main headline with typewriter */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={ctaInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6"
            >
              <span className="block">Let's build something</span>
              <span className="relative inline-block mt-2">
                <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                  {typedWord}
                </span>
                <motion.span
                  className="inline-block w-[3px] h-[0.9em] ml-1 bg-primary align-middle"
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
                />
              </span>
              <span className="block mt-2">together.</span>
            </motion.h2>

            {/* Emotional subtext */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={ctaInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
            >
              I don't just write code — I craft digital experiences that solve real problems and leave lasting
              impressions. Your vision deserves someone who cares as much as you do.
            </motion.p>

            {/* Footer Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={ctaInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <motion.button
                type="button"
                onClick={convo.openConversation}
                className="
                  group relative inline-flex items-center gap-3
                  px-8 py-4 rounded-full
                  bg-primary text-primary-foreground
                  font-semibold text-base sm:text-lg
                  overflow-hidden
                "
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Button shine effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                  initial={{ x: "-200%" }}
                  whileHover={{ x: "200%" }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                />

                <span className="relative">Start a conversation</span>

                <motion.span
                  className="relative"
                  initial={{ x: 0, y: 0 }}
                  whileHover={{ x: 3, y: -3 }}
                  transition={{ duration: 0.2 }}
                >
                  <ArrowUpRight className="w-5 h-5" />
                </motion.span>
              </motion.button>
            </motion.div>

          </div>
        </div>

        {/* Animated divider */}
        <div className="relative h-px mx-4 sm:mx-6">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-border to-transparent" />
          <motion.div
            className="absolute top-0 left-0 h-full w-1/3 bg-gradient-to-r from-transparent via-primary/50 to-transparent"
            animate={{
              x: ["0%", "200%"],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        </div>

        {/* Bottom section */}
        <div className="px-4 py-8 sm:py-12 sm:px-6">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">
              {/* Logo/Brand */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-center md:text-left"
              >
                <div className="font-heading text-xl font-bold text-foreground mb-1">John Doe</div>
                <div className="text-sm text-muted-foreground">Full-Stack Developer & Designer</div>
              </motion.div>

              {/* Social links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex items-center gap-2"
              >
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex items-center justify-center w-11 h-11 rounded-full border border-border/50 bg-card/50 backdrop-blur-sm text-muted-foreground transition-all duration-300 hover:border-primary/50 hover:text-primary hover:bg-primary/5"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{
                      duration: 0.4,
                      delay: 0.5 + index * 0.1,
                      type: "spring",
                      stiffness: 200,
                    }}
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {/* Hover glow */}
                    <div className="absolute inset-0 rounded-full bg-primary/20 blur-md opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <social.icon className="relative w-[18px] h-[18px]" />
                  </motion.a>
                ))}
              </motion.div>

              {/* Copyright */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="text-center md:text-right"
              >
                <div className="text-sm text-muted-foreground">© {new Date().getFullYear()} All rights reserved.</div>
                <div className="text-xs text-muted-foreground/60 mt-1">Designed & built with passion</div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Bottom edge fade - subtle */}
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-card/60 to-transparent pointer-events-none" />
      
      <ConversationLauncher
        open={convo.open}
        onClose={convo.closeConversation}
      />
    </footer>
  )
}
