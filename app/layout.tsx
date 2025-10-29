import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "hyeker - Full-stack Developer & AI Researcher",
  description: "보안을 고려한 풀스택 개발자 장혜승의 포트폴리오",
  keywords: ["풀스택 개발자", "Next.js", "React", "AI", "보안", "FastAPI", "Full-stack Developer"],
  authors: [{ name: "Hyeseung Jang", url: "https://hyeker.com" }],
  icons: {
    icon: "/hyeker-terminal-icon.svg",
    shortcut: "/hyeker-terminal-icon.svg",
    apple: "/hyeker-terminal-icon.svg"
  },
  openGraph: {
    title: "hyeker - Full-stack Developer & AI Researcher",
    description: "보안을 고려한 풀스택 개발자 장혜승의 포트폴리오",
    url: "https://hyeker.com",
    siteName: "hyeker",
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: "/hero1.png",
        width: 1920,
        height: 1080,
        alt: "Hyeker portfolio hero image"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "hyeker - Full-stack Developer",
    description: "보안을 고려한 풀스택 개발자",
    images: ["/hero1.png"]
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className="antialiased font-sans">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 pt-16">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
