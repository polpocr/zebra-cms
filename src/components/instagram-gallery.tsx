export function InstagramGallery() {
  const images = [
    { src: "/images/instagram/image 6.jpg", alt: "Zebra branding" },
    { src: "/images/instagram/image 7.jpg", alt: "Zebra profile" },
    { src: "/images/instagram/image 8.jpg", alt: "Zebra portrait" },
    { src: "/images/instagram/image 9.jpg", alt: "Zebra character" },
  ]

  const instagramUrl = "https://www.instagram.com/zebraproducciones.cr/"

  return (
    <section className="w-full overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex gap-4">
          {images.map((image) => (
            <a
              key={image.src}
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full"
            >
              <img src={image.src} alt={image.alt} className="w-full h-64 object-cover" />
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
