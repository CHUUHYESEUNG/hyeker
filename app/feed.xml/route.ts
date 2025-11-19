import { blogPosts } from "@/lib/blog-data"

export async function GET() {
  const siteUrl = "https://hyeker.com"
  const author = {
    name: "장혜승 (HYEKER)",
    email: "hey@hyeker.com",
  }

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:atom="http://www.w3.org/2005/Atom"
  xmlns:content="http://purl.org/rss/1.0/modules/content/"
  xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>HYEKER STUDIO - 개발 블로그</title>
    <link>${siteUrl}</link>
    <description>디자이너에서 개발자로 전환한 1인 인디 개발자 혜커의 개발 이야기</description>
    <language>ko</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${siteUrl}/og.png</url>
      <title>HYEKER STUDIO</title>
      <link>${siteUrl}</link>
    </image>
    ${blogPosts
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .map(
        (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${siteUrl}/blog/${post.id}</link>
      <guid isPermaLink="true">${siteUrl}/blog/${post.id}</guid>
      <description><![CDATA[${post.excerpt}]]></description>
      <content:encoded><![CDATA[
        <img src="${siteUrl}${post.image}" alt="${post.title}" />
        <p>${post.excerpt}</p>
        <p>${post.content}</p>
      ]]></content:encoded>
      <dc:creator><![CDATA[${author.name}]]></dc:creator>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <category>${post.category}</category>
      ${post.tags.map((tag) => `<category>${tag}</category>`).join("\n      ")}
    </item>`
      )
      .join("")}
  </channel>
</rss>`

  return new Response(rss, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
    },
  })
}
