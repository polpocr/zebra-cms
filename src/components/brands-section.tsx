const mockBrands = [
  { name: "NAMELOGO", tagline: "TAGLINE GOES HERE" },
  { name: "NAMELOGO", tagline: "TAGLINE GOES HERE" },
  { name: "NAMELOGO", tagline: "TAGLINE GOES HERE" },
  { name: "NAMELOGO", tagline: "TAGLINE GOES HERE" },
  { name: "NAMELOGO", tagline: "TAGLINE GOES HERE" },
]

export function BrandsSection() {
  return (
    <section className="w-full bg-background py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-foreground uppercase">
          MARCAS QUE SON PARTE DE NUESTRA MANADA
        </h2>

        <div className="flex items-center justify-center gap-8 flex-wrap">
          {mockBrands.map((brand, index) => (
            <div key={`brand-${index}-${brand.name}`} className="shrink-0 w-48 text-center">
              <div className="mb-4">
                <div className="text-4xl font-bold text-foreground/60 mb-2">MC</div>
              </div>
              <div className="text-lg font-semibold text-foreground mb-1">{brand.name}</div>
              <div className="text-sm text-muted-foreground">{brand.tagline}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
