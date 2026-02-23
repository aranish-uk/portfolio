import React from "react"
import "./globals.css"
import NavBar from "@/components/NavBar"
import MusicBar from "@/components/MusicBar"
import { Analytics } from "@vercel/analytics/next"

export const metadata = {
  title: "Portfolio | Abhinav Ranish",
  description:
    "Software Engineer | Cybersecurity | AI/ML — Building secure, intelligent systems with speed, scale, and creativity.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full scrollbar-hide">
      <body className="flex min-h-screen flex-col bg-neutral-950 text-gray-100 font-sans">
        {/* Top navigation */}
        <NavBar />

        {/* Page content */}
        <main className="flex-1">{children}</main>

        {/* Persistent music bar */}
        <MusicBar />

        <footer className="py-2 text-center text-sm text-gray-400 -mt-2">
          © {new Date().getFullYear()} Abhinav Ranish. All rights reserved.
        </footer>
        <Analytics />
      </body>
    </html>
  )
}
