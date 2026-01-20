import Image from "next/image";

export default function ContactoPage() {
  return (
    <>
      <section className="relative w-full min-h-screen">
        {/* Header Image - full width, partial height with black overlay */}
        <div className="relative w-full h-[65vh]">
          <Image
            src="/images/contact-image.png"
            alt="Contacto"
            fill
            className="object-cover object-center grayscale"
            priority
          />

          {/* Black overlay */}
          <div className="absolute inset-0 bg-black/60" />

          {/* Vertical text overlay - positioned absolutely from left edge */}
          <div className="absolute top-[20vh] left-4 md:left-8 lg:left-[10vw] h-full flex items-end gap-1 md:gap-2 z-50">
            <h1
              className="text-[32px] md:text-[42px] lg:text-[96px] font-bold leading-none [writing-mode:vertical-lr] rotate-180 tracking-tight text-white whitespace-nowrap"
              style={{
                textShadow: "-2px -2px 0 black, 2px -2px 0 black, -2px 2px 0 black, 2px 2px 0 black, -2px 0 0 black, 2px 0 0 black, 0 -2px 0 black, 0 2px 0 black"
              }}
            >
              SEAMOS
            </h1>
            <h2
              className="text-[24px] md:text-[32px] lg:text-[72px] font-bold leading-none [writing-mode:vertical-lr] rotate-180 tracking-tight text-black whitespace-nowrap"
              style={{
                textShadow: "-2px -2px 0 white, 2px -2px 0 white, -2px 2px 0 white, 2px 2px 0 white, -2px 0 0 white, 2px 0 0 white, 0 -2px 0 white, 0 2px 0 white"
              }}
            >
              MANADA
            </h2>
          </div>
        </div>

        {/* Descriptive Content Area (below hero) */}
        <div className="w-full px-4 md:px-8 mt-12 py-8">
          <div className="max-w-5xl mx-auto">
            <p className="text-base md:text-lg text-foreground/80 mb-4 leading-relaxed">
              Hablemos, tomemos café, hagamos brain-storming: lo importante es ponernos en sintonía para crear algo espectacular.
            </p>
            <p className="text-base md:text-lg text-foreground/80 leading-relaxed">
              ¡Escribinos y hagamos manada
            </p>
          </div>
        </div>

        {/* Main Contact Section */}
        <div className="mx-auto container my-24 w-full">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Left Column - Contact Form */}
            <div className="flex flex-col bg-[#2a2a2a] gap-6 p-6 md:p-8 max-h-[720px] overflow-auto md:col-span-2">
              <input
                type="text"
                placeholder="NOMBRE"
                className="w-full bg-[#3a3a3a] text-white placeholder:text-white/70 px-4 py-3 border-none outline-none focus:ring-2 focus:ring-primary/50"
              />
              <input
                type="tel"
                placeholder="NÚMERO DE TELÉFONO"
                className="w-full bg-[#3a3a3a] text-white placeholder:text-white/70 px-4 py-3 border-none outline-none focus:ring-2 focus:ring-primary/50"
              />
              <input
                type="email"
                placeholder="CORREO ELECTRÓNICO"
                className="w-full bg-[#3a3a3a] text-white placeholder:text-white/70 px-4 py-3 border-none outline-none focus:ring-2 focus:ring-primary/50"
              />
              <input
                type="text"
                placeholder="ASUNTO"
                className="w-full bg-[#3a3a3a] text-white placeholder:text-white/70 px-4 py-3 border-none outline-none focus:ring-2 focus:ring-primary/50"
              />
              <textarea
                placeholder="MENSAJE"
                rows={6}
                className="w-full bg-[#3a3a3a] text-white placeholder:text-white/70 px-4 py-3 border-none outline-none resize-none focus:ring-2 focus:ring-primary/50"
              />
              <button
                type="submit"
                className="w-full bg-[#7c3aed] hover:bg-[#6d28d9] text-white py-3 text-lg font-medium transition-colors"
              >
                ENVIAR MENSAJE
              </button>
            </div>

            {/* Right Column - Image */}
            <div className="max-h-[720px] overflow-hidden md:col-span-1">
              <Image
                src="/images/contact.png"
                alt="Zebra"
                width={700}
                height={500}
                className="w-full grayscale"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
