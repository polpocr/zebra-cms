export function Statistics() {
  return (
    <section className="container mx-auto px-4 py-12 md:py-20 lg:py-24 flex justify-center items-center" aria-label="Estadísticas de Zebra Producciones">
      <div className="flex flex-col md:flex-row items-center gap-8 md:gap-0 md:gap-[-20px] mx-auto">
        {/* Circle 1 - Black */}
        <div className="relative w-36 h-36 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-full bg-black border-4 border-black flex flex-col items-center justify-center text-white z-10 md:-mr-12 transition-transform duration-300 hover:scale-105">
          <div className="text-4xl md:text-6xl lg:text-7xl font-bold" aria-label="82 mil">82k</div>
          <div className="text-xs md:text-base lg:text-lg mt-2 md:mt-3 text-center px-3 leading-tight">Projects completed</div>
        </div>

        {/* Circle 2 - White */}
        <div className="relative w-36 h-36 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-full bg-white border-4 border-black flex flex-col items-center justify-center text-black z-20 md:-mr-12 transition-transform duration-300 hover:scale-105">
          <div className="text-4xl md:text-6xl lg:text-7xl font-bold" aria-label="100">100</div>
          <div className="text-xs md:text-base lg:text-lg mt-2 md:mt-3 text-center px-3 text-[#4A4A4A] leading-tight">Honorable awards</div>
        </div>

        {/* Circle 3 - Black */}
        <div className="relative w-36 h-36 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-full bg-black border-4 border-black flex flex-col items-center justify-center text-white z-30 md:-mr-12 transition-transform duration-300 hover:scale-105">
          <div className="text-4xl md:text-6xl lg:text-7xl font-bold" aria-label="80 mil">80k</div>
          <div className="text-xs md:text-base lg:text-lg mt-2 md:mt-3 text-center px-3 leading-tight">Satisfied customers</div>
        </div>

        {/* Circle 4 - White */}
        <div className="relative w-36 h-36 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-full bg-white border-4 border-black flex flex-col items-center justify-center text-black z-40 transition-transform duration-300 hover:scale-105">
          <div className="text-4xl md:text-6xl lg:text-7xl font-bold" aria-label="680">680</div>
          <div className="text-xs md:text-base lg:text-lg mt-2 md:mt-3 text-center px-3 text-[#4A4A4A] leading-tight">Professional team</div>
        </div>
      </div>
    </section>
  )
}
