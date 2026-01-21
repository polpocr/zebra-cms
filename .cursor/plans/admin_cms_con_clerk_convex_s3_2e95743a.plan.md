---
name: Admin CMS con Clerk Convex S3
overview: Implementar panel de administración completo en /admin con autenticación Clerk, backend Convex para todas las entidades CMS, y subida de archivos a S3. Estructura con páginas separadas para cada entidad.
todos:
  - id: install-deps
    content: "Instalar dependencias: @clerk/nextjs, @aws-sdk/client-s3, @aws-sdk/s3-request-presigner"
    status: pending
  - id: install-shadcn-components
    content: "Instalar componentes shadcn: form, input, textarea, select, label, table, dialog, card, toast/sonner, sidebar, dropdown-menu, alert-dialog"
    status: pending
  - id: install-tanstack-table
    content: Instalar @tanstack/react-table para tablas avanzadas con ordenamiento, filtrado y paginación
    status: pending
  - id: setup-clerk
    content: "Configurar Clerk: middleware, provider en layout, variables de entorno, páginas sign-in/sign-up"
    status: pending
  - id: convex-schema
    content: Crear schema.ts en Convex con todas las tablas (teamMembers, services, clients, clientCategories, contactLeads)
    status: pending
  - id: convex-functions
    content: "Crear funciones Convex: team.ts, services.ts, clients.ts, categories.ts, leads.ts con CRUD completo"
    status: pending
  - id: convex-auth
    content: Integrar autenticación Clerk en Convex usando getAuthTokenId para proteger mutations
    status: pending
  - id: s3-integration
    content: Implementar generateUploadUrl en convex/files.ts y configurar variables de entorno S3 en Convex
    status: pending
  - id: admin-layout
    content: Crear src/app/admin/layout.tsx con sidebar, header, protección Clerk, y navegación
    status: pending
  - id: admin-dashboard
    content: Crear src/app/admin/page.tsx como dashboard principal
    status: pending
  - id: data-table-component
    content: Crear componente reutilizable data-table.tsx usando TanStack Table con componentes base de shadcn
    status: pending
  - id: admin-pages
    content: "Crear páginas admin: /admin/team, /admin/services, /admin/clients, /admin/categories, /admin/leads usando data-table"
    status: pending
  - id: file-upload-component
    content: Crear componente file-upload.tsx reutilizable para subida de archivos a S3
    status: pending
  - id: admin-forms
    content: Crear componentes de formularios para cada entidad (team-form, service-form, client-form, category-form)
    status: pending
  - id: update-public-components
    content: Actualizar componentes públicos (team-section, services-section, client-portfolio) para usar queries de Convex
    status: pending
  - id: contact-form-leads
    content: Implementar guardado de leads en formulario de contacto usando mutation de Convex
    status: pending
---

# Plan de Implementación: Admin CMS con Clerk, Convex y S3

## Arquitectura General

```
/admin (protegido con Clerk)
├── /admin/team - Gestión de integrantes
├── /admin/services - Gestión de servicios  
├── /admin/clients - Gestión de clientes
├── /admin/categories - Gestión de categorías de cliente
└── /admin/leads - Visualización de leads de contacto
```

## Dependencias a Instalar

- `@clerk/nextjs` - Autenticación Clerk
- `@aws-sdk/client-s3` - Cliente S3 para subida de archivos
- `@aws-sdk/s3-request-presigner` - Para generar URLs presignadas
- `@tanstack/react-table` - TanStack Table para tablas avanzadas con ordenamiento, filtrado, paginación
- `convex-helpers` (opcional) - Utilidades para Convex

## Componentes shadcn a Instalar

Usar `npx shadcn@latest add [component]` para instalar:

- `form` - Para formularios con validación (requiere `react-hook-form` y `@hookform/resolvers` para validación con zod)
- `input` - Campos de texto
- `textarea` - Campos de texto multilínea
- `select` - Selectores dropdown
- `label` - Etiquetas de formulario
- `table` - Tablas para listar items
- `dialog` - Modales para crear/editar
- `card` - Cards para mostrar items
- `toast` o `sonner` - Notificaciones/toasts (preferir `sonner` para mejor UX)
- `sidebar` - Sidebar de navegación
- `dropdown-menu` - Menús dropdown (acciones)
- `alert-dialog` - Diálogos de confirmación (eliminar)
- `avatar` - Avatares de usuario
- `badge` - Badges para estados/categorías
- `separator` - Separadores visuales
- `progress` (opcional) - Barra de progreso para uploads

**Nota:** El componente `form` requiere instalar también:

- `react-hook-form` - Manejo de formularios
- `@hookform/resolvers` - Resolvers para validación
- `zod` - Schema validation (recomendado)

## 1. Configuración de Clerk

**Archivos a crear/modificar:**

- `src/middleware.ts` - Middleware de Clerk para proteger rutas `/admin/*`
- `src/app/layout.tsx` - Agregar `ClerkProvider` wrapper
- Variables de entorno: `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`

**Implementación:**

- Middleware que redirige a `/sign-in` si no está autenticado
- Protección de todas las rutas bajo `/admin`
- Layout principal envuelve con `ClerkProvider`

## 2. Schema de Convex

**Archivo:** `convex/schema.ts`

Definir tablas para:

- `teamMembers`: `{ _id, name, role, imageUrl, createdAt, updatedAt }`
- `services`: `{ _id, title, description, imageUrl, createdAt, updatedAt }`
- `clients`: `{ _id, name, imageUrl, categoryId, createdAt, updatedAt }`
- `clientCategories`: `{ _id, name, color, createdAt, updatedAt }`
- `contactLeads`: `{ _id, name, phone, email, subject, message, createdAt, read }`

**Relaciones:**

- `clients.categoryId` referencia `clientCategories._id`

## 3. Funciones Convex

**Archivos a crear:**

- `convex/team.ts` - Queries y mutations para team members
- `convex/services.ts` - Queries y mutations para servicios
- `convex/clients.ts` - Queries y mutations para clientes
- `convex/categories.ts` - Queries y mutations para categorías
- `convex/leads.ts` - Queries y mutations para leads
- `convex/files.ts` - Generación de URLs presignadas para S3

**Operaciones CRUD para cada entidad:**

- `list` - Query para obtener todos
- `get` - Query para obtener uno por ID
- `create` - Mutation para crear
- `update` - Mutation para actualizar
- `delete` - Mutation para eliminar

**Autenticación en Convex:**

- Integrar Clerk con Convex usando `getAuthTokenId` de Clerk
- Validar usuario autenticado en mutations

## 4. Integración S3

**Archivo:** `convex/files.ts`

**Funciones:**

- `generateUploadUrl` - Mutation que genera URL presignada para subir archivo
- Configurar bucket S3, región, y credenciales en variables de entorno de Convex

**Variables de entorno Convex:**

- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_REGION`
- `S3_BUCKET_NAME`

**Flujo:**

1. Cliente llama a `generateUploadUrl` con nombre de archivo
2. Convex genera URL presignada de S3
3. Cliente sube archivo directamente a S3 usando URL presignada
4. Cliente guarda URL del archivo en Convex al crear/actualizar entidad

## 5. Layout de Admin

**Archivo:** `src/app/admin/layout.tsx`

**Componentes shadcn a usar:**

- `Sidebar` de shadcn para navegación principal
- `Avatar` para mostrar foto de usuario
- `DropdownMenu` para menú de usuario y logout
- `Separator` para dividir secciones

**Estructura:**

- Sidebar de navegación con links a cada sección usando componente `Sidebar` de shadcn
- Header con información de usuario (`Avatar` + `DropdownMenu`) y botón de logout
- Protección con `auth()` de Clerk
- Redirección si no está autenticado

**Diseño:**

- Usar colores del branding (#7660A0 para primario) - ya configurado en CSS variables
- Sidebar fijo a la izquierda usando componente `Sidebar` de shadcn
- Contenido principal a la derecha

## 6. Páginas de Admin

**Estructura de cada página (`/admin/[entity]/page.tsx`):**

**Componentes shadcn a usar:**

- Componentes base `Table`, `TableHeader`, `TableBody`, `TableRow`, `TableHead`, `TableCell` de shadcn para el styling
- **TanStack Table** (`@tanstack/react-table`) para la lógica de tabla (ordenamiento, filtrado, paginación, selección)
- `Button` (ya instalado) para acciones y ordenamiento
- `Badge` para estados (ej: "leído/no leído" en leads)
- `DropdownMenu` para menú de acciones (Editar, Eliminar)
- `Dialog` para modales de crear/editar
- `Input` para filtros de búsqueda (opcional)

**Estructura:**

- Lista de items usando **TanStack Table** con componentes base de shadcn para el styling
- Columnas configurables con ordenamiento (sorting)
- Filtrado por columnas (opcional)
- Paginación integrada con TanStack Table
- Botón "Agregar nuevo" usando `Button` de shadcn
- Acciones: Editar (abre `Dialog`), Eliminar (abre `AlertDialog`)

**Implementación de TanStack Table:**

**Archivo ejemplo:** `src/components/admin/data-table.tsx` (componente reutilizable)

```typescript
// Estructura básica usando TanStack Table con shadcn
import { useReactTable, getCoreRowModel, getSortedRowModel, getPaginationRowModel } from '@tanstack/react-table'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table'

// Definir columnas con acceso a datos y configuración de sorting
// Usar flexRender para renderizar celdas y headers
// Integrar con componentes Table* de shadcn
```

**Características a implementar:**

- Usar `useReactTable` hook con `getCoreRowModel`, `getSortedRowModel`, `getPaginationRowModel`
- Definir columnas con `createColumnHelper` o array de definiciones de columnas
- Configurar sorting por columna (ascendente/descendente)
- Paginación con controles usando `Button` de shadcn
- Filtrado opcional usando `Input` de shadcn
- Renderizar usando `flexRender` dentro de componentes `Table*` de shadcn para mantener consistencia visual
- Acciones por fila usando `DropdownMenu` de shadcn

**Páginas a crear:**

- `src/app/admin/page.tsx` - Dashboard/redirect a primera sección
- `src/app/admin/team/page.tsx` - Gestión de integrantes
- `src/app/admin/services/page.tsx` - Gestión de servicios
- `src/app/admin/clients/page.tsx` - Gestión de clientes
- `src/app/admin/categories/page.tsx` - Gestión de categorías
- `src/app/admin/leads/page.tsx` - Visualización de leads (solo lectura)

## 7. Componentes de Formularios

**Archivos a crear:**

- `src/components/admin/team-form.tsx` - Formulario crear/editar integrante
- `src/components/admin/service-form.tsx` - Formulario crear/editar servicio
- `src/components/admin/client-form.tsx` - Formulario crear/editar cliente
- `src/components/admin/category-form.tsx` - Formulario crear/editar categoría
- `src/components/admin/file-upload.tsx` - Componente reutilizable para subida de archivos

**Componentes shadcn a usar:**

- `Form` con `react-hook-form` para validación y manejo de estado
- `Input` para campos de texto
- `Textarea` para descripciones
- `Select` para dropdowns (ej: categoría de cliente)
- `Label` para etiquetas de campos
- `Button` para submit y cancelar
- `Card` para contener el formulario dentro del `Dialog`
- `Alert` o `AlertDialog` para mostrar errores

**Características:**

- Validación de campos requeridos usando `react-hook-form` con `Form` de shadcn
- Upload de imágenes usando S3 (componente custom que usa `Button` de shadcn)
- Preview de imagen antes de guardar
- Loading states usando `disabled` en `Button`
- Manejo de errores usando `Alert` o `toast` de shadcn

## 8. Componente de Upload de Archivos

**Archivo:** `src/components/admin/file-upload.tsx`

**Componentes shadcn a usar:**

- `Button` para seleccionar archivo
- `Card` o `div` para contener preview
- `Progress` (opcional) para mostrar progreso de upload
- `Alert` para mostrar errores de upload

**Funcionalidad:**

- Botón para seleccionar archivo usando `Button` de shadcn
- Preview de imagen seleccionada
- Progreso de upload (usar `Progress` de shadcn si se instala)
- Integración con `generateUploadUrl` de Convex
- Retorna URL del archivo subido

## 9. Actualizar Componentes Existentes

**Archivos a modificar:**

- `src/components/team-section.tsx` - Usar `useQuery(api.team.list)`
- `src/components/services-section.tsx` - Usar `useQuery(api.services.list)`
- `src/components/client-portfolio.tsx` - Usar queries de clients y categories
- `src/app/contacto/page.tsx` - Guardar leads en Convex al enviar formulario

## 10. Variables de Entorno

**`.env.local` (agregar):**

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/admin
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/admin
```

**Convex Dashboard (configurar):**

```
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_REGION=
S3_BUCKET_NAME=
```

## 11. Páginas de Autenticación

**Archivos a crear:**

- `src/app/sign-in/[[...sign-in]]/page.tsx` - Página de login
- `src/app/sign-up/[[...sign-up]]/page.tsx` - Página de registro (opcional)

Usar componentes de Clerk: `<SignIn />` y `<SignUp />`

## Consideraciones de Diseño

- Usar colores del branding (#7660A0, #000000, #FFFFFF) - ya configurado en CSS variables de shadcn
- Tipografía Inter ya configurada
- Diseño responsive usando clases de Tailwind
- Feedback visual en todas las acciones usando `toast` o `sonner` de shadcn
- Confirmación antes de eliminar items usando `AlertDialog` de shadcn
- Todos los componentes UI usarán componentes de shadcn para consistencia visual

## Orden de Implementación Sugerido

1. Instalar dependencias principales (@clerk/nextjs, AWS SDK, @tanstack/react-table)
2. Instalar componentes shadcn necesarios (form, input, textarea, select, label, table, dialog, card, toast, sidebar, dropdown-menu, alert-dialog, avatar, badge, separator)
3. Configurar Clerk (middleware + provider)
4. Crear schema de Convex
5. Crear funciones básicas de Convex (queries list)
6. Configurar S3 en Convex
7. Crear layout de admin usando `Sidebar` de shadcn
8. Crear página de dashboard/admin principal
9. Crear componente reutilizable `data-table.tsx` usando TanStack Table con componentes base de shadcn
10. Implementar páginas de cada entidad usando `data-table` y `Dialog` (una por una)
11. Crear componentes de formularios usando `Form` y componentes de shadcn
12. Crear componente de upload usando `Button` y `Progress` de shadcn
13. Actualizar componentes públicos para usar Convex
14. Implementar guardado de leads en formulario de contacto