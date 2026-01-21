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
    icon: <HiOutlineRocketLaunch className="w-24 h-24 md:w-28 md:h-28 text-black stroke-[1.5]" />,
  },
  {
    id: "excelencia",
    title: "Excelencia",
    description:
      "Nos comprometemos a entregar trabajos de la más alta calidad en cada aspecto de nuestro servicio. Desde la conceptualización hasta la ejecución, buscamos la perfección y la superioridad en cada proyecto.",
    icon: <HiOutlineStar className="w-24 h-24 md:w-28 md:h-28 text-black stroke-[1.5]" />,
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
        className="w-24 h-24 md:w-28 md:h-28"
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
        className="w-24 h-24 md:w-28 md:h-28"
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
        className="w-24 h-24 md:w-28 md:h-28"
      />
    ),
  },
]

export default function ValoresSection() {
  return (
    <section className="flex flex-col items-left justify-left gap-12 container mx-auto px-8">
      <h2 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-black uppercase tracking-tight space-y-4">
        NUESTROS
        <br />
        <span className="text-gray-400 mt-3">VALORES</span>
      </h2>

      {/* Values Grid */}
      <div className="flex flex-wrap gap-8 md:gap-12 lg:gap-16">
        {valores.map((valor) => (
          <div key={valor.id} className="flex flex-col items-start text-left w-full md:w-[45%]">
            <div className="mb-4 flex justify-start">{valor.icon}</div>
            <h3 className="text-xl md:text-2xl font-bold text-black mb-3">{valor.title}</h3>
            <p className="text-base md:text-lg text-foreground/80 leading-relaxed">
              {valor.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
