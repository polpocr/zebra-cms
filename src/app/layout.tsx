import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/sonner"
import { ClerkProvider } from "@clerk/nextjs"
import { ConvexClientProvider } from "../providers/convex-client-provider"
import { SiteLayout } from "@/components/site-layout"

const interSans = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Zebra CMS",
  description: "Zebra CMS",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${interSans.variable} ${interSans.variable} antialiased`}>
          <ConvexClientProvider>
            <SiteLayout>{children}</SiteLayout>
            <Toaster />
          </ConvexClientProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
