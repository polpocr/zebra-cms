"use client"

import Image from "next/image"
import type { ReactNode } from "react"
import { HiOutlineRocketLaunch } from "react-icons/hi2"
import { HiOutlineStar } from "react-icons/hi2"

type Valor = {
  id: string
  title: string
  description: string
  icon: ReactNode
}

const valores: Valor[] = [
  {
    id: "creatividad",
    title: "Creatividad",
    description:
      "Fomentamos la innovación y la originalidad en todos nuestros proyectos. Buscamos soluciones únicas y frescas que destaquen y sorprendan, superando las expectativas de nuestros clientes.",
    icon: (
      <HiOutlineRocketLaunch className="w-16 h-16 md:w-24 md:h-24 lg:w-28 lg:h-28 text-black stroke-[1.5]" />
    ),
  },
  {
    id: "excelencia",
    title: "Excelencia",
    description:
      "Nos comprometemos a entregar trabajos de la más alta calidad en cada aspecto de nuestro servicio. Desde la conceptualización hasta la ejecución, buscamos la perfección y la superioridad en cada proyecto.",
    icon: (
      <HiOutlineStar className="w-16 h-16 md:w-24 md:h-24 lg:w-28 lg:h-28 text-black stroke-[1.5]" />
    ),
  },
  {
    id: "profesionalismo",
    title: "Profesionalismo",
    description:
      "Mantenemos los más altos estándares de conducta y competencia en todas nuestras interacciones. Nuestra experiencia y enfoque detallista aseguran que cada proyecto se maneje con la máxima seriedad y precisión.",
    icon: (
      <Image
        src="/valores-iconos/profesionalismo.svg"
        alt="Profesionalismo"
        width={100}
        height={100}
        className="w-16 h-16 md:w-24 md:h-24 lg:w-28 lg:h-28"
      />
    ),
  },
  {
    id: "personalizacion",
    title: "Personalización",
    description:
      "Cada cliente es único y tratamos cada proyecto de manera individualizada. Escuchamos y comprendemos las necesidades específicas de nuestros clientes para ofrecer soluciones personalizadas que se alineen perfectamente con sus objetivos.",
    icon: (
      <Image
        src="/valores-iconos/personalizacion.svg"
        alt="Personalización"
        width={100}
        height={100}
        className="w-16 h-16 md:w-24 md:h-24 lg:w-28 lg:h-28"
      />
    ),
  },
  {
    id: "responsabilidad",
    title: "Responsabilidad",
    description:
      "Asumimos la responsabilidad de nuestras acciones y decisiones. Desde el respeto por los plazos hasta el cumplimiento de los compromisos, nos aseguramos de que cada aspecto de nuestro trabajo sea manejado con integridad y fiabilidad.",
    icon: (
      <Image
        src="/valores-iconos/responsabilidad.svg"
        alt="Responsabilidad"
        width={100}
        height={100}
        className="w-16 h-16 md:w-24 md:h-24 lg:w-28 lg:h-28"
      />
    ),
  },
]

export default function ValoresSection() {
  return (
    <section className="flex flex-col items-left justify-left gap-8 md:gap-12 container mx-auto px-4 md:px-8 py-8 md:py-12">
      <h2 className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-black uppercase tracking-tight space-y-4 text-center md:text-left">
        NUESTROS
        <br />
        <span className="text-gray-400 mt-3">VALORES</span>
      </h2>

      {/* Values Grid */}
      <div className="flex flex-wrap gap-6 md:gap-8 lg:gap-12 xl:gap-16">
        {valores.map((valor) => (
          <div
            key={valor.id}
            className="flex flex-col items-center md:items-start text-center md:text-left w-full md:w-[45%]"
          >
            <div className="mb-3 md:mb-4 flex justify-center md:justify-start">{valor.icon}</div>
            <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-black mb-2 md:mb-3">
              {valor.title}
            </h3>
            <p className="text-sm md:text-base lg:text-lg text-foreground/80 leading-relaxed">
              {valor.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
