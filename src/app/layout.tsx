import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Script from "next/script"
import "./globals.css"
import { Toaster } from "@/components/ui/sonner"
import { ClerkProvider } from "@clerk/nextjs"
import { esES } from "@clerk/localizations"
import { ConvexClientProvider } from "../providers/convex-client-provider"
import { SiteLayout } from "@/components/site-layout"

const interSans = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
})

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Zebra Producciones - Agencia de Marketing y Publicidad",
    template: "%s | Zebra Producciones",
  },
  description:
    "Agencia de marketing que se integra a tu equipo para crear soluciones efectivas, creativas y llenas de impacto. Más de 3000 proyectos completados.",
  keywords: [
    "agencia de marketing",
    "publicidad",
    "marketing digital",
    "diseño gráfico",
    "branding",
    "estrategia de marketing",
    "Zebra Producciones",
  ],
  authors: [{ name: "Zebra Producciones" }],
  creator: "Zebra Producciones",
  publisher: "Zebra Producciones",
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: baseUrl,
    siteName: "Zebra Producciones",
    title: "Zebra Producciones - Agencia de Marketing y Publicidad",
    description:
      "Agencia de marketing que se integra a tu equipo para crear soluciones efectivas, creativas y llenas de impacto. Más de 3000 proyectos completados.",
    images: [
      {
        url: "/images/hero-image.jpg",
        width: 1200,
        height: 630,
        alt: "Zebra Producciones",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zebra Producciones - Agencia de Marketing y Publicidad",
    description:
      "Agencia de marketing que se integra a tu equipo para crear soluciones efectivas, creativas y llenas de impacto.",
    images: ["/images/hero-image.jpg"],
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider localization={esES}>
      <html lang="es">
        <body className={`${interSans.variable} ${interSans.variable} antialiased`}>
          <Script
            id="disable-service-worker"
            strategy="beforeInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                if ('serviceWorker' in navigator) {
                  navigator.serviceWorker.getRegistrations().then(function(registrations) {
                    for(let registration of registrations) {
                      registration.unregister();
                    }
                  });
                }
              `,
            }}
          />
          <ConvexClientProvider>
            <SiteLayout>{children}</SiteLayout>
            <Toaster />
          </ConvexClientProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
