# Zebra CMS - Agent Instructions

## Stack Tecnológico
- **Framework**: Next.js 16.1.3 con App Router
- **Lenguaje**: TypeScript (strict mode)
- **Backend**: Convex
- **Autenticación**: Clerk
- **UI**: Radix UI + shadcn/ui components
- **Estilos**: Tailwind CSS 4
- **Formularios**: React Hook Form + Zod
- **Linting/Formatting**: Biome
- **Gestor de paquetes**: pnpm

## Estilo de Comunicación
- Sé directo y conciso - no explicaciones de alto nivel innecesarias
- Proporciona código real, no descripciones de cómo hacerlo
- Trata al usuario como experto
- Anticipa necesidades y sugiere soluciones proactivamente
- Responde inmediatamente con la solución, explica después si es necesario
- Sé casual en el tono
- No lecciones morales ni advertencias innecesarias

## Convenciones de Código

### TypeScript
- Usa strict mode siempre
- Evita `any` - usa tipos específicos o `unknown`
- Usa `import type` para imports de tipos (Biome lo requiere)
- Paths aliases: `@/*` para `src/*`, `convex/*` para `convex/*`

### Formateo (Biome)
- Indentación: 2 espacios
- Ancho de línea: 100 caracteres
- Comillas: dobles para strings y JSX
- Semicolones: solo cuando sean necesarios
- Trailing commas: ES5 style
- Organiza imports automáticamente

### React/Next.js
- Usa Server Components por defecto, Client Components solo cuando sea necesario
- Prefijo `use` para hooks personalizados
- Componentes en PascalCase
- Archivos de componentes: kebab-case (ej: `category-form.tsx`)
- Usa `"use client"` solo cuando sea estrictamente necesario

### Estructura de Archivos
- Componentes UI reutilizables en `src/components/ui/`
- Componentes de dominio en `src/components/`
- Hooks en `src/hooks/`
- Utilidades en `src/lib/`
- Convex functions en `convex/`

### Convex
- Usa queries/mutations de Convex con tipos generados
- Valida datos con Zod antes de guardar
- Maneja errores apropiadamente

### Formularios
- React Hook Form + Zod para validación
- Usa `@hookform/resolvers` para integración
- Componentes de formulario consistentes con shadcn/ui

### Estilos
- Tailwind CSS utility-first
- Usa `cn()` de `@/lib/utils` para merge de clases
- Componentes UI siguen el patrón de shadcn/ui

## Principios de Desarrollo
- **Arregla la causa, no el síntoma**: Analiza problemas en profundidad
- **Código limpio**: Mantén funciones pequeñas y enfocadas
- **Type safety**: Aprovecha TypeScript al máximo
- **Performance**: Optimiza renders, usa memo cuando sea apropiado
- **Accesibilidad**: Sigue patrones de Radix UI (ya accesibles por defecto)

## Cuando el Usuario Pide Ajustes
- No repitas todo el código - solo muestra las líneas relevantes antes/después
- Múltiples bloques de código están bien si es necesario
- Mantén la respuesta breve y enfocada

## Resúmenes y Documentación
- Sé muy detallado en resúmenes
- No omitas información importante
- Incluye contexto relevante

## Testing y Validación
- Ejecuta `pnpm run verify` (lint + type-check) antes de considerar código completo
- Asegúrate de que el código compile sin errores
- Verifica que los tipos sean correctos
