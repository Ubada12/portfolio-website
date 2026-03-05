import fs from "fs"
import path from "path"
import { notFound } from "next/navigation"
import { Metadata } from "next"
import { PROJECTS, getProjectBySlug } from "@/constants/projects"
import { ProjectDetail } from "./ProjectDetail"

/**
 * Reads public/docs/ and returns a list of existing .html filenames.
 *
 * Lives here (server component) rather than in constants/projects/index.ts
 * because it uses Node.js `fs` — that file is also imported by client
 * components where `fs` is unavailable.
 *
 * Fails safe — returns an empty array if the directory is missing or
 * any filesystem error occurs.
 */
function getAvailableDocs(): string[] {
  try {
    const docsDir = path.join(process.cwd(), "public", "docs")
    if (!fs.existsSync(docsDir)) return []
    return fs.readdirSync(docsDir).filter((f) => f.endsWith(".html"))
  } catch {
    return []
  }
}

export function generateStaticParams() {
  return PROJECTS.map((project) => ({
    slug: project.slug,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = getProjectBySlug(slug)

  if (!project) {
    return { title: "Project Not Found" }
  }

  return {
    title: `${project.title} | Portfolio`,
    description: project.description,
  }
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  const availableDocs = getAvailableDocs()
  const docsAvailable = !!(
    project.docsHtml &&
    availableDocs.includes(path.basename(project.docsHtml))
  )

  if (project.docsHtml && !docsAvailable && process.env.NODE_ENV === "development") {
    console.warn(
      `⚠️  [${project.slug}] docsHtml is set to "${project.docsHtml}" but the file was not found in public/docs/`
    )
  }

  return <ProjectDetail project={project} docsAvailable={docsAvailable} />
}
