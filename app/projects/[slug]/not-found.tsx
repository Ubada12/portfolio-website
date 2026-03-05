"use client"

import { motion } from "framer-motion"
import { useParams } from "next/navigation"
import { ArrowLeft, Home, FolderSearch } from "lucide-react"

export default function ProjectNotFound() {
  const params = useParams<{ slug: string }>()
  const slug = params?.slug || "unknown"

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-md w-full text-center"
      >
        <div className="mb-8">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/10 mb-6"
          >
            <FolderSearch className="w-10 h-10 text-primary" />
          </motion.div>

          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
            Project Not Found
          </h1>

          <p className="text-muted-foreground text-base leading-relaxed mb-4">
            The project you&apos;re looking for doesn&apos;t exist or may have been removed.
          </p>

          <p className="text-xs text-muted-foreground/50 font-mono bg-muted/50 dark:bg-white/[0.04] rounded-lg px-3 py-2 inline-block border border-border/50">
            Slug: &quot;{slug}&quot;
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="/#projects"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium text-sm transition-all duration-300 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto"
          >
            <ArrowLeft size={16} />
            Browse Projects
          </a>

          <a
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-border bg-card text-foreground font-medium text-sm transition-all duration-300 hover:bg-secondary hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto"
          >
            <Home size={16} />
            Go Home
          </a>
        </div>
      </motion.div>
    </div>
  )
}
