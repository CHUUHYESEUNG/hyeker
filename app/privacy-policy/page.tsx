import type { Metadata } from "next"
import { readFile } from "fs/promises"
import path from "path"
import { PrivacyPolicyTabs } from "@/components/privacy-policy-tabs"

const koreanStartMarkers = [
  'TerraDice(이하 "본 앱")',
  "TerraDice(이하 '본 앱')",
  "TerraDice(이하 “본 앱”)"
]

export const metadata: Metadata = {
  title: "Hyeker - Privacy Policy",
  description: "개인정보 처리방침 제공 페이지"
}

async function getPolicyContents() {
  const filePath = path.join(process.cwd(), "privacypolicy.md")
  const raw = await readFile(filePath, "utf-8")

  let markerIndex = -1
  for (const marker of koreanStartMarkers) {
    markerIndex = raw.indexOf(marker)
    if (markerIndex !== -1) break
  }

  if (markerIndex === -1) {
    return { english: raw.trim(), korean: raw.trim() }
  }

  return {
    english: raw.slice(0, markerIndex).trim(),
    korean: raw.slice(markerIndex).trim()
  }
}

export default async function PrivacyPolicyPage() {
  const { english, korean } = await getPolicyContents()

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">Privacy Policy</h1>
        <p className="mt-4 text-base text-muted-foreground">
          개인정보 처리방침
        </p>
      </div>

      <div className="mt-12">
        <PrivacyPolicyTabs english={english} korean={korean} />
      </div>
    </div>
  )
}
