"use client"

import { api } from "convex/_generated/api"
import { useMutation } from "convex/react"
import Image from "next/image"
import { useState } from "react"
import { toast } from "sonner"

export default function ContactoPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const createLead = useMutation(api.leads.create)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await createLead({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
      })
      toast.success("Mensaje enviado exitosamente")
      setFormData({
        name: "",
        phone: "",
        email: "",
        subject: "",
        message: "",
      })
    } catch (error) {
      toast.error("Error al enviar el mensaje")
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <section className="relative w-full min-h-screen">
        {/* Header Image - full width, partial height with black overlay */}
        <div className="relative w-full h-[50vh] md:h-[65vh]">
          <Image
            src="/images/contact-image.png"
            alt="Contacto - Zebra Producciones - Seamos manada"
            fill
            className="object-cover object-center grayscale"
            priority
          />

          {/* Black overlay - darker on mobile */}
          <div className="absolute inset-0 bg-black/80 md:bg-black/60" />

          {/* Header text - overlaid on image */}
          {/* Mobile: Horizontal centered */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 lg:hidden z-10">
            <h1 className="text-4xl font-bold leading-none tracking-tight text-white text-center">
              SEAMOS
            </h1>
            <h2 className="text-3xl font-bold leading-none tracking-tight text-white text-center">
              MANADA
            </h2>
          </div>
          {/* Desktop: Vertical, left side - visible only on LG */}
          <div className="hidden lg:flex absolute top-[20vh] left-4 md:left-8 lg:left-[10vw] h-full items-end gap-1 md:gap-2 z-10">
            <h1
              className="text-[32px] md:text-[42px] lg:text-[96px] font-bold leading-none [writing-mode:vertical-lr] rotate-180 tracking-tight text-white z-50 whitespace-nowrap"
              style={{
                textShadow:
                  "-2px -2px 0 black, 2px -2px 0 black, -2px 2px 0 black, 2px 2px 0 black, -2px 0 0 black, 2px 0 0 black, 0 -2px 0 black, 0 2px 0 black",
              }}
            >
              SEAMOS
            </h1>
            <h2
              className="text-[24px] md:text-[32px] lg:text-[72px] font-bold leading-none [writing-mode:vertical-lr] rotate-180 tracking-tight text-black z-50 whitespace-nowrap"
              style={{
                textShadow:
                  "-2px -2px 0 white, 2px -2px 0 white, -2px 2px 0 white, 2px 2px 0 white, -2px 0 0 white, 2px 0 0 white, 0 -2px 0 white, 0 2px 0 white",
              }}
            >
              MANADA
            </h2>
          </div>
        </div>

        {/* Descriptive Content Area (below hero) */}
        <div className="w-full px-4 md:px-8 mt-8 md:mt-12 py-6 md:py-8">
          <div className="max-w-5xl mx-auto">
            <div className="flex justify-end mb-8 md:mb-12">
              <div className="max-w-2xl">
                <p className="text-base md:text-lg text-foreground/80 mb-3 md:mb-4 leading-relaxed">
                  Hablemos, tomemos café, hagamos brain-storming: lo importante es ponernos en
                  sintonía para crear algo espectacular.
                </p>
                <p className="text-base md:text-lg text-foreground/80 leading-relaxed">
                  ¡Escribinos y hagamos manada
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Contact Section */}
        <div className="mx-auto container my-12 md:my-24 w-full px-4 md:px-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12">
            {/* Left Column - Contact Form */}
            <form
              onSubmit={handleSubmit}
              className="flex flex-col bg-[#2a2a2a] gap-4 md:gap-6 p-4 md:p-6 lg:p-8 max-h-[720px] overflow-auto md:col-span-2"
            >
              <input
                type="text"
                name="name"
                placeholder="NOMBRE"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-[#3a3a3a] text-white placeholder:text-white/70 px-3 md:px-4 py-2 md:py-3 text-sm md:text-base border-none outline-none focus:ring-2 focus:ring-primary/50"
              />
              <input
                type="tel"
                name="phone"
                placeholder="NÚMERO DE TELÉFONO"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full bg-[#3a3a3a] text-white placeholder:text-white/70 px-3 md:px-4 py-2 md:py-3 text-sm md:text-base border-none outline-none focus:ring-2 focus:ring-primary/50"
              />
              <input
                type="email"
                name="email"
                placeholder="CORREO ELECTRÓNICO"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-[#3a3a3a] text-white placeholder:text-white/70 px-3 md:px-4 py-2 md:py-3 text-sm md:text-base border-none outline-none focus:ring-2 focus:ring-primary/50"
              />
              <input
                type="text"
                name="subject"
                placeholder="ASUNTO"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full bg-[#3a3a3a] text-white placeholder:text-white/70 px-3 md:px-4 py-2 md:py-3 text-sm md:text-base border-none outline-none focus:ring-2 focus:ring-primary/50"
              />
              <textarea
                name="message"
                placeholder="MENSAJE"
                rows={6}
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full bg-[#3a3a3a] text-white placeholder:text-white/70 px-3 md:px-4 py-2 md:py-3 text-sm md:text-base border-none outline-none resize-none focus:ring-2 focus:ring-primary/50"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#7c3aed] hover:bg-[#6d28d9] disabled:opacity-50 disabled:cursor-not-allowed text-white py-2.5 md:py-3 text-base md:text-lg font-medium transition-colors"
              >
                {isSubmitting ? "ENVIANDO..." : "ENVIAR MENSAJE"}
              </button>
            </form>

            {/* Right Column - Image with contact info overlay */}
            <div className="relative max-h-[720px] overflow-hidden md:col-span-1">
              <Image
                src="/images/contact.jpg"
                alt="Zebra Producciones - Contacto"
                width={700}
                height={500}
                className="w-full h-full object-cover grayscale"
              />
              <div
                className="absolute inset-y-0 left-[58%] flex flex-col justify-center text-white z-10 -translate-x-1/2"
              >
                <div className="space-y-3 md:space-y-4 text-sm md:text-base">
                  <div>
                    <p className="text-white/80 text-xs md:text-sm uppercase tracking-wider">
                      Teléfono
                    </p>
                    <p className="font-semibold text-lg md:text-xl">+506 83745365</p>
                  </div>
                  <div>
                    <p className="text-white/80 text-xs md:text-sm uppercase tracking-wider">
                      Correo electrónico
                    </p>
                    <p className="font-semibold text-lg md:text-xl">manada@zebracr.com</p>
                  </div>
                  <div>
                    <p className="text-white/80 text-xs md:text-sm uppercase tracking-wider">
                      Ubicación
                    </p>
                    <p className="font-semibold text-lg md:text-xl">San José, Costa Rica</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
