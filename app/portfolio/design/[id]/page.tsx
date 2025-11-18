import { notFound } from "next/navigation"
import { getPortfolioItemByRouteId } from "@/lib/portfolio-data"
import { DesignDetailView } from "./detail-view"
import fs from "fs"
import path from "path"

type DesignDetailPageProps = {
  params: Promise<{
    id: string
  }>
}

export default async function DesignDetailPage({ params }: DesignDetailPageProps) {
  const { id } = await params
  const item = getPortfolioItemByRouteId(id)

  if (!item || item.category !== 'design') {
    notFound()
  }

  // Read markdown content if markdownPath exists
  let markdownContent = ""
  if (item.markdownPath) {
    try {
      const filePath = path.join(process.cwd(), item.markdownPath)
      markdownContent = fs.readFileSync(filePath, "utf8")
      console.log("✅ Markdown loaded:", filePath, "Length:", markdownContent.length)
    } catch (error) {
      console.error("❌ Failed to read markdown file:", error)
      markdownContent = ""
    }
  } else {
    console.log("⚠️ No markdownPath for item:", item.id)
  }

  console.log("📄 Passing markdownContent length:", markdownContent.length)

  return <DesignDetailView item={item} markdownContent={markdownContent} />
}
