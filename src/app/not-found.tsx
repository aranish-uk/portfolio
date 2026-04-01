import type { Metadata } from "next"
import NotFoundClient from "@/components/NotFoundClient"

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you're looking for doesn't exist or has been moved.",
  openGraph: {
    title: "Page Not Found | Abhinav Ranish",
    description: "The page you're looking for doesn't exist or has been moved.",
  },
  robots: {
    index: false,
    follow: false,
  },
}

export default function NotFound() {
  return <NotFoundClient />
}
