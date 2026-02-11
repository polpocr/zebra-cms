export function InstagramGallery() {
  const images = [
    { src: "/images/instagram/image 6.jpg", alt: "Proyecto de branding de Zebra Producciones" },
    { src: "/images/instagram/image 7.jpg", alt: "Perfil de proyecto de Zebra Producciones" },
    { src: "/images/instagram/image 8.jpg", alt: "Retrato de proyecto de Zebra Producciones" },
    { src: "/images/instagram/image 9.jpg", alt: "Personaje de proyecto de Zebra Producciones" },
  ]

  const instagramUrl = "https://www.instagram.com/zebraproducciones.cr/"

  return (
    <section className="w-full overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:flex md:gap-4 gap-2 md:gap-4">
          {images.map((image) => (
            <a
              key={image.src}
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full"
            >
              <img src={image.src} alt={image.alt} className="w-full h-32 md:h-64 object-cover" />
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
