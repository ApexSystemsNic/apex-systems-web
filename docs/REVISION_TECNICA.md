# Revisión técnica

## Estado

El proyecto cuenta con scripts reproducibles para lint, TypeScript y exportación estática de producción. Está preparado para Cloudflare Pages y genera el contenido publicable en `out`.

## Correcciones incorporadas

- Límites de errores de ruta y error global.
- Navegación interna compatible con las páginas legales.
- Enlace de accesibilidad “Saltar al contenido”.
- Validación local del formulario y apertura segura de WhatsApp.
- Encabezados de seguridad conservadores mediante `public/_headers`, compatibles con archivos estáticos de Cloudflare Pages.
- Exportación `output: "export"` e imágenes locales sin dependencia de un servidor de optimización.
- `metadataBase` configurable mediante `SITE_URL` y resolución automática de la URL de producción de Vercel.
- Metadatos por página con canonical correcto para evitar que las páginas legales apunten al canonical de la portada.
- Canonical, Open Graph y Twitter metadata.
- `robots.txt` y `sitemap.xml` generados desde la URL canónica.
- Validación `check:deploy` para impedir despliegues con URL HTTP/localhost mal configurada.
- Logotipo del preloader reducido a una versión dedicada de ~24 KB para evitar descargar el PNG social de ~813 KB solo para una imagen de 96 px.
- Código fuente separado de artefactos generados (`node_modules`, `.next`, caches y archivos temporales).

## Límites de la revisión

La disponibilidad 24/7 no depende solamente del código. DNS, HTTPS, infraestructura de Cloudflare, renovación del dominio, incidentes del proveedor y despliegues también afectan la disponibilidad.

La política CSP estricta no se activa todavía porque la aplicación y Next.js incluyen scripts necesarios para hidratación/preloader; una CSP mal configurada podría romper el sitio. Debe implementarse únicamente con una estrategia probada para el proveedor final.

Los textos legales siguen marcados como borradores hasta recibir revisión profesional.
