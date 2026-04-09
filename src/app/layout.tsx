import React from "react"
import "./globals.css"
import NavBar from "@/components/NavBar"
import MusicBar from "@/components/MusicBar"
import { AIChat } from "@/components/AIChat"
import InteractiveCursorGlow from "@/components/fun_animations/InteractiveCursorGlow"
import { Analytics } from "@vercel/analytics/next"

import type { Metadata } from "next"

const siteUrl = "https://aranish.uk"
const siteName = "Abhinav Ranish"
const siteTitle = "Abhinav Ranish — Software Engineer, Cybersecurity & AI"
const siteDescription =
  "Abhinav Ranish is a software engineer specializing in cybersecurity and AI/ML. Explore projects, skills, and experience in full-stack development, penetration testing, and machine learning."

export const metadata: Metadata = {
  title: {
    default: siteTitle,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  keywords: [
    "Abhinav Ranish",
    "software engineer",
    "cybersecurity",
    "AI developer",
    "machine learning",
    "full stack developer",
    "portfolio",
    "ASU",
    "penetration testing",
    "React",
    "Next.js",
    "Python",
  ],
  authors: [{ name: siteName, url: siteUrl }],
  creator: siteName,
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: siteUrl,
    siteName,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Abhinav Ranish — Software Engineer, Cybersecurity & AI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/og-image.png"],
    creator: "@madebyabhinav",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: siteName,
      description: siteDescription,
      publisher: { "@id": `${siteUrl}/#person` },
    },
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: "Abhinav Ranish",
      url: siteUrl,
      jobTitle: "Software Engineer",
      description:
        "Software engineer specializing in cybersecurity, AI/ML, and full-stack development. Student at Arizona State University.",
      sameAs: [
        "https://github.com/abhinav-ranish",
        "https://linkedin.com/in/abhinavranish",
        "https://x.com/madebyabhinav",
        "https://instagram.com/abhinav.ranish",
      ],
      knowsAbout: [
        "Software Engineering",
        "Cybersecurity",
        "Artificial Intelligence",
        "Machine Learning",
        "Penetration Testing",
        "React",
        "Next.js",
        "Python",
        "TypeScript",
      ],
    },
    {
      "@type": "WebPage",
      "@id": `${siteUrl}/#webpage`,
      url: siteUrl,
      name: siteTitle,
      isPartOf: { "@id": `${siteUrl}/#website` },
      about: { "@id": `${siteUrl}/#person` },
      description: siteDescription,
    },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full scrollbar-hide">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="flex min-h-screen flex-col bg-neutral-950 text-gray-100 font-sans">
        {/* Cursor glow effect */}
        <InteractiveCursorGlow />

        {/* Top navigation */}
        <NavBar />

        {/* Page content */}
        <main className="flex-1">{children}</main>

        {/* Persistent music bar */}
        <MusicBar />

        {/* Persistent AI chat */}
        <div className="fixed bottom-6 left-6 z-50">
          <AIChat />
        </div>

        <footer className="py-2 text-center text-sm text-gray-400 -mt-2">
          © {new Date().getFullYear()} Abhinav Ranish. All rights reserved.
        </footer>
        <Analytics />
      </body>
    </html>
  )
}
