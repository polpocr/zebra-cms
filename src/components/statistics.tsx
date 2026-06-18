"use client"

import { useEffect, useRef, useState } from "react"

function useCountUp(target: number, duration = 2000, started: boolean) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!started) return
    let startTime: number | null = null
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      // easeOutQuart
      const eased = 1 - Math.pow(1 - progress, 4)
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [started, target, duration])

  return count
}

function StatCircle({
  target,
  label,
  suffix = "",
  className,
  textClass,
  labelClass,
  started,
}: {
  target: number
  label: string
  suffix?: string
  className: string
  textClass: string
  labelClass?: string
  started: boolean
}) {
  const count = useCountUp(target, 2000, started)
  const display = target >= 1000 ? count.toLocaleString("es") : count

  return (
    <div className={className}>
      <div className={textClass}>
        + {display}
        {suffix}
      </div>
      <div className={labelClass}>{label}</div>
    </div>
  )
}

export function Statistics() {
  const ref = useRef<HTMLDivElement>(null)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      className="container mx-auto px-4 pt-0 pb-12 md:pb-20 lg:pb-24 flex justify-center items-center"
      aria-label="Estadísticas de Zebra Producciones"
    >
      <div
        ref={ref}
        className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-0 mx-auto"
      >
        <StatCircle
          target={9}
          label="AÑOS"
          started={started}
          className="relative w-36 h-36 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-full bg-black border-4 border-black flex flex-col items-center justify-center text-white md:-mr-4 transition-all duration-300 hover:scale-110 hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
          textClass="text-4xl md:text-6xl lg:text-7xl font-bold"
          labelClass="text-xs md:text-base lg:text-lg mt-2 md:mt-3 text-center px-3 leading-tight"
        />
        <StatCircle
          target={3000}
          label="proyectos"
          started={started}
          className="relative w-36 h-36 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-full bg-white border-4 border-black flex flex-col items-center justify-center text-black md:-mr-4 transition-all duration-300 hover:scale-110 hover:shadow-[0_20px_60px_rgba(0,0,0,0.3)]"
          textClass="text-4xl md:text-6xl lg:text-7xl font-bold"
          labelClass="text-xs md:text-base lg:text-lg mt-2 md:mt-3 text-center px-3 text-[#4A4A4A] leading-tight"
        />
        <StatCircle
          target={45000}
          label="personas impactadas"
          started={started}
          className="relative w-36 h-36 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-full bg-black border-4 border-black flex flex-col items-center justify-center text-white transition-all duration-300 hover:scale-110 hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
          textClass="text-3xl md:text-5xl lg:text-6xl font-bold"
          labelClass="text-xs md:text-base lg:text-lg mt-2 md:mt-3 text-center px-3 leading-tight"
        />
      </div>
    </section>
  )
}
