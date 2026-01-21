import Image from "next/image"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="w-full bg-black text-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          {/* Logo Column */}
          <div className="flex flex-col gap-4">
            <Image src="/footer/logo_footer.svg" alt="Zebra" width={160} height={100} />
          </div>

          {/* Servicio al cliente Column */}
          <div className="flex flex-col gap-4 text-left">
            <h3 className="text-white font-semibold">Servicio al cliente:</h3>
            <p className="text-white/70 text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
            <div className="flex flex-col gap-2 text-sm">
              <a
                href="mailto:manada@zebracr.com"
                className="text-white hover:text-white/80 underline"
              >
                manada@zebracr.com
              </a>
              <a href="tel:+506XXXXXXXX" className="text-white hover:text-white/80">
                (506) XXX-XXXX
              </a>
            </div>
          </div>

          {/* Explore Column */}
          <div className="flex flex-col gap-4 text-left">
            <h3 className="text-white font-semibold">Explore:</h3>
            <nav className="flex flex-col gap-2">
              <Link href="/acerca-de" className="text-white/70 hover:text-white text-sm">
                About
              </Link>
              <Link href="/servicios" className="text-white/70 hover:text-white text-sm">
                Service
              </Link>
              <Link href="/portfolio" className="text-white/70 hover:text-white text-sm">
                Portfolio
              </Link>
              <Link href="/contacto" className="text-white/70 hover:text-white text-sm">
                Contact
              </Link>
            </nav>
          </div>

          {/* Social Media Column */}
          <div className="flex flex-col gap-4 items-end text-right">
            <h3 className="text-white font-semibold">Social Media:</h3>
            <div className="flex gap-4 justify-end">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center transition-opacity hover:opacity-80"
                aria-label="Facebook"
              >
                <Image
                  src="/footer/facebook_svg.svg"
                  alt="Facebook"
                  width={35}
                  height={35}
                  className="w-10 h-10"
                />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center transition-opacity hover:opacity-80"
                aria-label="Instagram"
              >
                <Image
                  src="/footer/instagram_svg.svg"
                  alt="Instagram"
                  width={35}
                  height={35}
                  className="w-10 h-10"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
