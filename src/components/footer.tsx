import Image from "next/image"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="w-full bg-black text-white py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 md:gap-12">
          {/* Logo Column */}
          <div className="flex flex-col gap-6 w-full md:w-auto items-center md:items-start">
            <Image
              src="/footer/logo_footer.svg"
              alt="Zebra Producciones - Logo"
              width={160}
              height={100}
              className="w-36 md:w-40 h-auto"
            />
          </div>

          {/* Servicio al cliente Column */}
          <div className="flex flex-col gap-4 text-left items-center md:items-start">
            <h3 className="text-white font-semibold text-base md:text-lg tracking-tight">Servicio al cliente:</h3>
            <p className="text-white/70 text-sm md:text-base leading-relaxed max-w-xs">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
            <div className="flex flex-col gap-3 text-sm md:text-base">
              <a
                href="mailto:manada@zebracr.com"
                className="text-white/90 hover:text-white underline decoration-white/30 hover:decoration-white transition-all duration-200 break-all"
              >
                manada@zebracr.com
              </a>
              <a 
                href="tel:+506XXXXXXXX" 
                className="text-white/90 hover:text-white transition-colors duration-200"
              >
                (506) XXX-XXXX
              </a>
            </div>
          </div>

          {/* Explore Column */}
          <div className="flex flex-col gap-4 text-left items-center md:items-start">
            <h3 className="text-white font-semibold text-base md:text-lg tracking-tight">Explore:</h3>
            <nav className="flex flex-col gap-3">
              <Link 
                href="/acerca-de" 
                className="text-white/70 hover:text-white text-sm md:text-base transition-colors duration-200 hover:translate-x-1 inline-block"
              >
                About
              </Link>
              <Link 
                href="/servicios" 
                className="text-white/70 hover:text-white text-sm md:text-base transition-colors duration-200 hover:translate-x-1 inline-block"
              >
                Service
              </Link>
              <Link 
                href="/portfolio" 
                className="text-white/70 hover:text-white text-sm md:text-base transition-colors duration-200 hover:translate-x-1 inline-block"
              >
                Portfolio
              </Link>
              <Link 
                href="/contacto" 
                className="text-white/70 hover:text-white text-sm md:text-base transition-colors duration-200 hover:translate-x-1 inline-block"
              >
                Contact
              </Link>
            </nav>
          </div>

          {/* Social Media Column */}
          <div className="flex flex-col gap-4 items-center md:items-end text-left md:text-right w-full md:w-auto">
            <h3 className="text-white font-semibold text-base md:text-lg tracking-tight">Social Media:</h3>
            <div className="flex gap-4 justify-start md:justify-end">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center transition-all duration-200 hover:scale-110 hover:opacity-80"
                aria-label="Facebook"
              >
                <Image
                  src="/footer/facebook_svg.svg"
                  alt="Facebook"
                  width={35}
                  height={35}
                  className="w-9 h-9 md:w-10 md:h-10"
                />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center transition-all duration-200 hover:scale-110 hover:opacity-80"
                aria-label="Instagram"
              >
                <Image
                  src="/footer/instagram_svg.svg"
                  alt="Instagram"
                  width={35}
                  height={35}
                  className="w-9 h-9 md:w-10 md:h-10"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
