# Zebra CMS

Sistema de gestión de contenido para Zebra Producciones.

## Variables de Entorno

### `NEXT_PUBLIC_SITE_URL`

URL base del sitio en producción. Se utiliza para:
- Generar URLs absolutas en el sitemap
- Generar URLs canónicas en metadata
- Configurar Open Graph y Twitter Cards

**Ejemplo:**
```env
NEXT_PUBLIC_SITE_URL=https://www.zebra.com
```

**Nota:** Si no se define, se usará `http://localhost:3000` como fallback (útil para desarrollo local).

## SEO

El sitio incluye:
- `robots.txt` dinámico que excluye páginas de administración (`/admin/*`) y autenticación (`/sign-in/*`, `/sign-up/*`)
- `sitemap.xml` dinámico con todas las páginas públicas
- Metadata optimizada para SEO en todas las páginas públicas
- Open Graph y Twitter Cards configurados
