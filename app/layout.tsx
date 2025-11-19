import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { MotionProvider } from "@/components/motion-provider";
import { AuthProvider } from "@/components/admin/auth-provider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PersonSchema } from "@/components/schema/person-schema";
import { WebSiteSchema } from "@/components/schema/website-schema";
import Script from 'next/script'

const GA_ID = process.env.NEXT_PUBLIC_GA_ID

const pretendard = localFont({
  src: "../public/fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://hyeker.com'),
  title: {
    default: "혜커 HYEKER",
    template: "%s - 혜커 HYEKER",
  },
  description: "디발자 혜커의 포트폴리오. Next.js, React Native, AI/ML 기반 프로덕트 개발 전문.",
  keywords: ["장혜승", "혜커", "HYEKER", "풀스택 개발자", "Full-stack Developer", "Next.js", "React Native", "포트폴리오", "1인 개발자", "인디 개발자", "디자이너 개발자", "커리어 전환"],
  authors: [{ name: "장혜승 (Hyeseung Jang)", url: "https://hyeker.com" }],
  creator: "장혜승 (HYEKER)",
  publisher: "HYEKER STUDIO",
  icons: {
    icon: "/hyeker-terminal-icon.svg",
    shortcut: "/hyeker-terminal-icon.svg",
    apple: "/hyeker-terminal-icon.svg"
  },
  openGraph: {
    title: "HYEKER STUDIO - Designer & Full-stack Developer",
    description: "디발자 혜커의 포트폴리오",
    url: "https://hyeker.com",
    siteName: "HYEKER STUDIO",
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "HYEKER STUDIO 포트폴리오"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "HYEKER STUDIO - Designer & Full-stack Developer",
    description: "디발자 혜커의 포트폴리오",
    images: ["/og.png"],
    creator: "@heyhyeker",
  },
  alternates: {
    canonical: "https://hyeker.com",
  },
  verification: {
    google: "google-site-verification-code",
    other: {
      "naver-site-verification": "naver-site-verification-code",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
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
        <PersonSchema />
        <WebSiteSchema />
      </head>
      <body className={`${pretendard.variable} ${pretendard.className} antialiased`}>
        {/* Google Analytics - Production Only */}
        {GA_ID && process.env.NODE_ENV === 'production' && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}');
              `}
            </Script>
          </>
        )}
        {/* Google Analytics End */}
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <MotionProvider>
              <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-1 pt-16">{children}</main>
                <Footer />
              </div>
            </MotionProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}