import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "HYEKER STUDIO",
  description: "1인 인디 개발자 혜커의 블로그 & 포트폴리오",
  keywords: ["1인 개발", "1인 인디 개발자", "풀스택 개발자", "Next.js", "React", "AI", "보안", "FastAPI", "Full-stack Developer"],
  authors: [{ name: "Hyeseung Jang", url: "https://hyeker.com" }],
  icons: {
    icon: "/hyeker-terminal-icon.svg",
    shortcut: "/hyeker-terminal-icon.svg",
    apple: "/hyeker-terminal-icon.svg"
  },
  openGraph: {
    title: "HYEKER STUDIO",
    description: "1인 인디 개발자 혜커의 블로그 & 포트폴리오",
    url: "https://hyeker.com",
    siteName: "hyeker",
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Hyeker portfolio cover"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "hyeker - Full-stack Developer",
    description: "1인 인디 개발자 혜커",
    images: ["/og.png"]
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
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
