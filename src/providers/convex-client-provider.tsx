"use client"

import { useAuth } from "@clerk/nextjs"
import { ConvexProvider, ConvexReactClient } from "convex/react"
import type { ReactNode } from "react"
import { useEffect, useState } from "react"

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL
if (!convexUrl) {
  throw new Error("NEXT_PUBLIC_CONVEX_URL environment variable is not set")
}

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  const { getToken, isLoaded } = useAuth()
  const [convexClient] = useState(() => new ConvexReactClient(convexUrl as string))

  useEffect(() => {
    if (!isLoaded) return

    const fetchToken = async () => {
      try {
        // Intenta obtener el token con el template "convex" si existe
        const token = await getToken({ template: "convex" })
        return token ?? null
      } catch (error) {
        // Si el template no existe, intenta obtener el token sin template
        // Esto funcionará si Clerk está configurado para emitir tokens para Convex
        try {
          const token = await getToken()
          return token ?? null
        } catch {
          // Si falla, retorna null (usuario no autenticado)
          return null
        }
      }
    }

    convexClient.setAuth(fetchToken)
  }, [getToken, isLoaded, convexClient])

  return <ConvexProvider client={convexClient}>{children}</ConvexProvider>
}
