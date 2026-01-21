export function Statistics() {
  return (
    <section className="container mx-auto py-16 flex justify-center items-center">
      <div className="flex items-center gap-[-20px] mx-auto">
        {/* Circle 1 - Black */}
        <div className="relative w-64 h-64 rounded-full bg-black border-4 border-black flex flex-col items-center justify-center text-white z-10 -mr-12">
          <div className="text-6xl font-bold">82k</div>
          <div className="text-base mt-2">Projects completed</div>
        </div>

        {/* Circle 2 - White */}
        <div className="relative w-64 h-64 rounded-full bg-white border-4 border-black flex flex-col items-center justify-center text-black z-20 -mr-12">
          <div className="text-6xl font-bold">100</div>
          <div className="text-base mt-2 text-[#4A4A4A]">Honorable awards</div>
        </div>

        {/* Circle 3 - Black */}
        <div className="relative w-64 h-64 rounded-full bg-black border-4 border-black flex flex-col items-center justify-center text-white z-30 -mr-12">
          <div className="text-6xl font-bold">80k</div>
          <div className="text-base mt-2">Satisfied customers</div>
        </div>

        {/* Circle 4 - White */}
        <div className="relative w-64 h-64 rounded-full bg-white border-4 border-black flex flex-col items-center justify-center text-black z-40">
          <div className="text-6xl font-bold">680</div>
          <div className="text-base mt-2 text-[#4A4A4A]">Professional team</div>
        </div>
      </div>
    </section>
  )
}
