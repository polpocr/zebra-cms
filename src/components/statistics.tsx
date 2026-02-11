export function Statistics() {
  return (
    <section
      className="container mx-auto px-4 py-12 md:py-20 lg:py-24 flex justify-center items-center"
      aria-label="Estadísticas de Zebra Producciones"
    >
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-0 mx-auto">
        {/* Circle 1 - Black: + 9 AÑOS */}
        <div className="relative w-36 h-36 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-full bg-black border-4 border-black flex flex-col items-center justify-center text-white md:-mr-4 transition-transform duration-300 hover:scale-105">
          <div className="text-4xl md:text-6xl lg:text-7xl font-bold" aria-label="Más de 9 años">
            + 9
          </div>
          <div className="text-xs md:text-base lg:text-lg mt-2 md:mt-3 text-center px-3 leading-tight">
            AÑOS
          </div>
        </div>

        {/* Circle 2 - White: + 3000 proyectos */}
        <div className="relative w-36 h-36 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-full bg-white border-4 border-black flex flex-col items-center justify-center text-black md:-mr-4 transition-transform duration-300 hover:scale-105">
          <div
            className="text-4xl md:text-6xl lg:text-7xl font-bold"
            aria-label="Más de 3000 proyectos"
          >
            + 3000
          </div>
          <div className="text-xs md:text-base lg:text-lg mt-2 md:mt-3 text-center px-3 text-[#4A4A4A] leading-tight">
            proyectos
          </div>
        </div>

        {/* Circle 3 - Black: + 45 000 personas impactadas */}
        <div className="relative w-36 h-36 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-full bg-black border-4 border-black flex flex-col items-center justify-center text-white transition-transform duration-300 hover:scale-105">
          <div
            className="text-3xl md:text-5xl lg:text-6xl font-bold"
            aria-label="Más de 45 000 personas impactadas"
          >
            + 45 000
          </div>
          <div className="text-xs md:text-base lg:text-lg mt-2 md:mt-3 text-center px-3 leading-tight">
            personas impactadas
          </div>
        </div>
      </div>
    </section>
  )
}
