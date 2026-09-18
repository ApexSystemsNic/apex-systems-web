# Apex Systems — sitio web listo para Cloudflare Pages

Código fuente del sitio institucional de Apex Systems, desarrollado con Next.js 16, React 19, TypeScript, Tailwind CSS 4 y Motion.

El proyecto genera un sitio estático en `out/`. No requiere servidor, base de datos ni almacenamiento de formularios: Cloudflare Pages sirve los archivos y el formulario abre WhatsApp en el dispositivo del visitante.

## Requisitos

- Node.js 20.9 o posterior.
- npm.

## Desarrollo local

En Windows PowerShell, si `npm` está bloqueado por la política de scripts, usa `npm.cmd`:

```powershell
npm.cmd ci
npm.cmd run dev
```

Abre `http://localhost:3000`.

## Verificación técnica

Antes de entregar cualquier cambio:

```powershell
npm.cmd run check
```

`check` ejecuta ESLint, TypeScript y el build estático optimizado de Next.js.

## URL pública

La URL canónica predeterminada es:

```text
https://apexsystemsnic.com
```

`SITE_URL` permite reemplazarla de forma explícita en el entorno de construcción. Se usa para metadatos, Open Graph, `robots.txt` y `sitemap.xml`. Para desarrollo local se usa `http://localhost:3000`.

Antes del despliegue definitivo, valida la configuración pública:

```powershell
$env:SITE_URL="https://apexsystemsnic.com"
npm.cmd run check:deploy
```

`check:deploy` rechaza una URL sin HTTPS, localhost o una URL con rutas adicionales.

## Organización

| Ruta | Contenido |
| --- | --- |
| `src/app` | App Router, layout, páginas legales, errores, robots y sitemap. |
| `src/components/layout` | Encabezado, menú móvil y pie de página. |
| `src/components/sections` | Secciones de la página principal en orden visual. |
| `src/components/ui` | Componentes reutilizables. |
| `src/content` | Textos, empresa y canales de contacto. |
| `src/lib` | Validación, mensaje de contacto y URL pública. |
| `src/styles` | Estilos globales, responsive, movimiento y secciones. |
| `public` | Recursos públicos, incluido el logotipo. |
| `scripts` | Validaciones previas al despliegue. |
| `docs` | Revisión técnica, despliegue y pendientes. |

## Formulario

El formulario no guarda datos en un backend de Apex. Valida la información en el navegador, prepara un mensaje y abre WhatsApp para que la persona decida si desea enviarlo.

El número de WhatsApp se configura en:

```text
src/content/contact-channels.ts
```

## Publicación

Consulta `docs/DESPLIEGUE.md` para los valores exactos de GitHub y Cloudflare Pages, y `docs/PENDIENTES_DE_LANZAMIENTO.md` para la lista final.
