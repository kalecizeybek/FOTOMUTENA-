import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FOTOMUTENA | Premium Digital Art & Photography",
  description: "Yüksek kontrastlı, premium dijital sanat ve fotoğrafçılık arşivi. Sıradanlığın ötesinde, sessizliğin ve estetiğin gücünü keşfedin.",
  keywords: ["dijital sanat", "fotoğrafçılık", "premium portfolyo", "minimalist tasarım", "mutena art", "visual storytelling"],
  authors: [{ name: "Fotomutena" }],
  openGraph: {
    title: "FOTOMUTENA | Premium Digital Art Portfolio",
    description: "S sessizliğin gücünü ve estetiğin dijital formlarını keşfedin.",
    url: "https://fotomutena.com",
    siteName: "FOTOMUTENA",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FOTOMUTENA",
    description: "Premium Digital Art & Photography Archive",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased cursor-none`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
