"use client"

import type React from "react"

import { useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { Send, Mail, MapPin, Phone, CheckCircle2, Loader2 } from "lucide-react"

/** Reusable components */
import { TextReveal, MagneticButton, SectionBadge } from "@/components/reusable"

export function Contact() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    console.log(formState)
    setIsSubmitting(false)
    setIsSubmitted(true)
    setTimeout(() => setIsSubmitted(false), 3000)
  }

  const contactInfo = [
    { icon: Mail, label: "Email", value: "hello@johndoe.dev" },
    { icon: Phone, label: "Phone", value: "+1 (555) 123-4567" },
    { icon: MapPin, label: "Location", value: "San Francisco, CA" },
  ]

  const formFields = [
    { id: "name", label: "Name", type: "text", placeholder: "Your name" },
    { id: "email", label: "Email", type: "email", placeholder: "your@email.com" },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
    },
  }

  return (
    <section
      id="contact"
      ref={ref}
      data-section="contact"
      className="relative py-20 px-4 sm:py-32 sm:px-6 overflow-x-clip"
    >
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/4 -right-32 w-96 h-96 rounded-full bg-primary/5 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 -left-32 w-80 h-80 rounded-full bg-accent/5 blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
      </div>

      <div className="mx-auto max-w-7xl relative z-10">
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-10 sm:mb-10"
        >
          <SectionBadge index={5} label="Contact" icon={<Mail size={14} />} />
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left column - Slides in from LEFT */}
          <motion.div 
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ 
              duration: 0.7, 
              ease: [0.25, 0.46, 0.45, 0.94],
              delay: 0.1
            }}
          >

            <div>
              <TextReveal>
                <h2 className="mb-4 text-3xl font-bold tracking-tight sm:mb-6 sm:text-4xl md:text-5xl font-heading">
                  {"Let's work together"}
                </h2>
              </TextReveal>
            </div>

            <motion.p
              initial={{ opacity: 0, x: -40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="mb-10 max-w-md text-sm text-muted-foreground sm:mb-14 sm:text-base leading-relaxed"
            >
              Have a project in mind? Let's create something amazing together. Feel free to reach out and I'll get back
              to you as soon as possible.
            </motion.p>

            {/* Contact info - row on mobile, column on tablet+ */}
            <div className="flex flex-wrap gap-3 sm:gap-4 lg:flex-col">
              {contactInfo.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ 
                    duration: 0.5, 
                    delay: 0.4 + index * 0.1,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                  whileHover={{ scale: 1.02 }}
                  className="group flex items-center gap-2 sm:gap-4 p-2 sm:p-4 rounded-xl sm:rounded-2xl border border-border/50 bg-card/30 hover:border-primary/30 hover:bg-card/50 transition-all duration-300 cursor-pointer flex-1 min-w-[140px] lg:flex-none"
                >
                  <div className="relative flex h-9 w-9 sm:h-12 sm:w-12 items-center justify-center rounded-lg sm:rounded-xl border border-border bg-card/80 backdrop-blur-sm transition-all duration-300 group-hover:border-primary/50 group-hover:bg-primary/10 flex-shrink-0">
                    <item.icon
                      size={16}
                      className="sm:hidden text-muted-foreground transition-colors duration-300 group-hover:text-primary"
                    />
                    <item.icon
                      size={20}
                      className="hidden sm:block text-muted-foreground transition-colors duration-300 group-hover:text-primary"
                    />
                    <div className="absolute inset-0 rounded-lg sm:rounded-xl bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] sm:text-xs text-muted-foreground mb-0 sm:mb-0.5 uppercase tracking-wider">{item.label}</p>
                    <p className="text-xs sm:text-sm lg:text-base font-medium transition-colors duration-300 group-hover:text-primary truncate">
                      {item.value}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right column - Slides in from RIGHT */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ 
              duration: 0.7, 
              ease: [0.25, 0.46, 0.45, 0.94],
              delay: 0.2
            }}
            className="relative"
          >
            <div className="relative rounded-3xl p-[1px] bg-gradient-to-br from-primary/40 via-transparent to-accent/40">
              <div
                className="relative rounded-3xl bg-background/80 dark:bg-card/60 backdrop-blur-xl border border-border/60 p-6 sm:p-8 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.5)] dark:shadow-[0_20px_80px_-30px_rgba(0,0,0,0.85)] overflow-hidden">

              {/* Inner ambient glow */}
              <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/10 via-transparent to-accent/10 opacity-70 dark:opacity-100" />

              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex flex-col items-center justify-center py-16 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 15 }}
                      className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 border border-primary/20"
                    >
                      <CheckCircle2 className="h-10 w-10 text-primary" />
                    </motion.div>
                    <h3 className="text-xl font-semibold mb-2">Message Sent!</h3>
                    <p className="text-muted-foreground text-sm">
                      Thank you for reaching out. I'll get back to you soon.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form key="form" onSubmit={handleSubmit} className="relative z-10 space-y-5 sm:space-y-6">
                    <div className="mb-6 sm:mb-8">
                      <h3 className="text-base sm:text-lg font-semibold mb-1">Send a message</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        Fill out the form below and I'll respond within 24 hours.
                      </p>
                    </div>

                    <div className="grid gap-4 sm:gap-5 sm:grid-cols-2">
                      {formFields.map((field) => (
                        <div key={field.id} className="relative">
                          <motion.label
                            htmlFor={field.id}
                            className={`
                              absolute left-4 z-10 transition-all duration-200 pointer-events-none
                              ${focusedField === field.id || formState[field.id as keyof typeof formState]
                                ? "-top-2.5 text-xs bg-background dark:bg-card px-2 text-primary font-medium"
                                : "top-3.5 text-sm text-muted-foreground"
                              }
                            `}
                          >
                            {field.label}
                          </motion.label>
                          <input
                            type={field.type}
                            id={field.id}
                            value={formState[field.id as keyof typeof formState]}
                            onChange={(e) => setFormState({ ...formState, [field.id]: e.target.value })}
                            onFocus={() => setFocusedField(field.id)}
                            onBlur={() => setFocusedField(null)}
                            className="w-full rounded-xl border border-border bg-background/50 dark:bg-card/40 px-4 py-3.5 text-sm text-foreground outline-none transition-colors duration-200 focus:border-primary focus:ring-1 focus:ring-primary/20 hover:border-muted-foreground/30"
                            required
                          />
                        </div>
                      ))}
                    </div>

                    <div className="relative">
                      <motion.label
                        htmlFor="message"
                        className={`
                          absolute left-4 z-10 transition-all duration-200 pointer-events-none
                          ${focusedField === "message" || formState.message
                            ? "-top-2.5 text-xs bg-background dark:bg-card px-2 text-primary font-medium"
                            : "top-3.5 text-sm text-muted-foreground"
                          }
                        `}
                      >
                        Message
                      </motion.label>
                      <textarea
                        id="message"
                        value={formState.message}
                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                        onFocus={() => setFocusedField("message")}
                        onBlur={() => setFocusedField(null)}
                        rows={5}
                        className="w-full resize-none rounded-xl border border-border bg-background/50 dark:bg-card/40 px-4 py-3.5 text-sm text-foreground outline-none transition-colors duration-200 focus:border-primary focus:ring-1 focus:ring-primary/20 hover:border-muted-foreground/30"
                        required
                      />
                    </div>

                    <MagneticButton>
                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="group relative w-full inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-4 text-sm font-medium text-primary-foreground transition-all duration-300 hover:bg-primary/90 disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden"
                      >
                        {/* Button shine effect */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full"
                          animate={!isSubmitting ? { translateX: ["−100%", "200%"] } : {}}
                          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, repeatDelay: 3 }}
                        />
                        <span className="relative z-10 flex items-center gap-2">
                          {isSubmitting ? (
                            <>
                              <Loader2 size={18} className="animate-spin" />
                              Sending...
                            </>
                          ) : (
                            <>
                              Send Message
                              <Send
                                size={18}
                                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5"
                              />
                            </>
                          )}
                        </span>
                      </motion.button>
                    </MagneticButton>

                    <p className="text-xs text-muted-foreground text-center pt-2">
                      Your information is secure and will never be shared.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
