import { notFound } from "next/navigation"
import { getPortfolioItemByRouteId } from "@/lib/portfolio-data"
import { PortfolioDetailView } from "./detail-view"

type PortfolioDetailPageProps = {
  params: Promise<{
    id: string
  }>
}

export default async function PortfolioDetailPage({ params }: PortfolioDetailPageProps) {
  const { id } = await params
  const item = getPortfolioItemByRouteId(id)
  if (!item) {
    notFound()
  }

  return <PortfolioDetailView item={item} />
}
