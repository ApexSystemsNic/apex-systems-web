# Apex Systems — sitio web corporativo

## Propósito

Sitio institucional de Apex Systems (`https://apexsystemsnic.com`): presenta la empresa, sus soluciones, su proceso y sus canales de contacto, y convierte visitas en conversaciones por WhatsApp. Es una web de marketing de una sola página más tres páginas legales (`/privacidad`, `/terminos`, `/cookies`).

## Separación respecto al SaaS

El producto SaaS de Apex Systems se desarrolla en **otro proyecto y por otro equipo**. Este repositorio no lo contiene ni depende de él.

- No hay autenticación, usuarios, roles, backend, API, base de datos ni almacenamiento de formularios en este repo. No los agregues.
- No asumas ni inventes funcionalidades, precios, endpoints o arquitectura del SaaS. El contenido que lo mencione sale únicamente de `src/content/`.
- No compartas código, dependencias, secretos ni configuración de despliegue con el SaaS.
- Si una tarea requiere lógica de servidor o datos del SaaS, está fuera del alcance: detente y avisa.

## Stack

- Next.js 16.4 (App Router, `output: "export"`, build con `--webpack`).
- React 19.2 con React Compiler (`reactCompiler: true`).
- TypeScript 5 en modo `strict`; alias `@/*` → `src/*`.
- Tailwind CSS 4 (`@tailwindcss/postcss`) más CSS propio en `src/styles/`.
- Motion 13 para animaciones.
- ESLint 9 con `eslint-config-next` (core-web-vitals + typescript).
- Node.js ≥ 20.9 y npm.
- Hosting: Cloudflare Pages sirve `out/` como archivos estáticos.
- No hay framework de tests: la verificación es `npm run check`.

## Estructura

| Ruta | Contenido |
| --- | --- |
| `src/app` | Layout, página principal, páginas legales, errores, `robots.ts`, `sitemap.ts`, `globals.css`. |
| `src/components/layout` | Encabezado, menú móvil y pie (`01-header`, `02-footer`). |
| `src/components/sections` | Secciones de la home en carpetas numeradas según el orden visual (`00-preloader` … `11-final-cta`). |
| `src/components/ui` | Componentes reutilizables: botones, `Section`, `SectionHeading`, `Reveal`, `MotionProvider`. |
| `src/content` | Textos, datos de empresa y canales de contacto. `src/content/site/` tiene un archivo por sección. |
| `src/lib` | Validación y mensaje del formulario, URL pública, metadatos y datos estructurados. |
| `src/styles` | Estilos globales numerados (`00-foundation`, `02-motion`, `03-content`, `04-responsive`) y `sections/`. |
| `src/types` | Tipos compartidos. |
| `public` | Logos y `_headers` (cabeceras de Cloudflare Pages, incluida la CSP). |
| `scripts` | `validate-production.mjs`, validación previa al despliegue. |
| `docs` | Despliegue, revisión técnica y pendientes de lanzamiento. |

## Comandos

En PowerShell usa `npm.cmd` si la política de scripts bloquea `npm`.

| Comando | Uso |
| --- | --- |
| `npm ci` | Instalar dependencias. |
| `npm run dev` | Servidor de desarrollo en `http://localhost:3000`. |
| `npm run lint` | ESLint. |
| `npm run typecheck` | `tsc --noEmit`. |
| `npm run build` | Export estático a `out/`. |
| `npm run check` | lint + typecheck + build. Obligatorio antes de entregar. |
| `npm run check:deploy` | Valida `SITE_URL` y ejecuta `check`. Antes de publicar. |
| `npm run preview` | Sirve `out/` localmente. |

## Convenciones

- Los textos visibles viven en `src/content/`, no dentro de los componentes.
- Una sección nueva sigue el patrón existente: carpeta numerada en `src/components/sections/`, contenido en `src/content/site/` y, si necesita CSS propio, archivo en `src/styles/sections/`.
- Reutiliza `src/components/ui` antes de crear componentes nuevos.
- Componentes de servidor por defecto; `"use client"` solo cuando hay estado, efectos o eventos.
- React Compiler está activo: no agregues `useMemo`/`useCallback`/`memo` sin una razón medida.
- Imports con el alias `@/`.
- Movimiento, estado actual: `MotionProvider` envuelve el sitio en `MotionConfig reducedMotion="user"`, así que las animaciones hechas con Motion siguen la preferencia del visitante; además pausa las escenas `[data-motion-scene]` fuera del viewport o con la pestaña oculta. Las animaciones CSS se ajustan con bloques `@media (prefers-reduced-motion: …)` en `src/styles/`, y el JS que anima por su cuenta (`PreloaderTimer`, `HeroPointerGlow`) consulta `matchMedia`. `Reveal`, `MaskReveal`, `WordReveal`, `StaggerList` y `StaggerItem` (`src/components/ui/MotionPrimitives.tsx`) son hoy envoltorios sin animación que ignoran `delay`: no gestionan movimiento reducido.
- Movimiento, convención para animaciones nuevas: toda animación debe respetar `prefers-reduced-motion`. Con Motion, dentro de `MotionProvider`; con CSS, con su bloque `@media (prefers-reduced-motion: reduce)`; con JS propio, consultando `matchMedia`. Si se devuelve animación a los envoltorios `Reveal`, deben cumplirlo ellos mismos.
- Metadatos con `buildPageMetadata` y URL pública con `getSiteUrl`; no escribas el dominio a mano.
- Contenido, comentarios y mensajes de commit en español.
- No agregues dependencias para resolver algo de pocas líneas.

## Restricciones del export estático

El build produce solo HTML, CSS y JS. No existe servidor en producción.

- Prohibido: route handlers dinámicos, Server Actions, middleware/proxy, `cookies()`, `headers()`, ISR/`revalidate`, `redirects`/`rewrites`/`headers` en `next.config.ts` y rutas dinámicas sin `generateStaticParams`.
- `next/image` funciona sin optimización (`images.unoptimized`): las imágenes se entregan tal cual, así que deben subirse ya optimizadas y con dimensiones correctas.
- Las variables de entorno se leen solo en build (`SITE_URL`, `GOOGLE_SITE_VERIFICATION`). No hay secretos en runtime y todo lo que llega al bundle es público.
- `robots.ts` y `sitemap.ts` deben seguir siendo estáticos.
- Las cabeceras HTTP, la caché y la CSP se definen en `public/_headers`.
- La CSP solo permite recursos del propio dominio (`script-src`, `connect-src`, `font-src`, `img-src 'self' data:`). Cualquier script, fuente, imagen o petición a terceros exige actualizar `public/_headers` de forma explícita y justificada.
- El formulario de contacto valida en el navegador y abre WhatsApp; no envía datos a ningún backend.

## Criterios de calidad

Un cambio está terminado cuando:

1. `npm run check` pasa sin errores ni advertencias nuevas.
2. Funciona en móvil y escritorio, sin scroll horizontal.
3. Cumple WCAG 2.2 AA: HTML semántico, navegación por teclado, foco visible, contraste y movimiento reducido.
4. No degrada Core Web Vitals ni aumenta el JS del cliente sin justificación.
5. Mantiene título, descripción, canonical, Open Graph, datos estructurados y sitemap coherentes.
6. No introduce secretos, recursos de terceros no declarados en la CSP ni dependencias innecesarias.
7. El alcance se limita a lo pedido.

## Agentes del proyecto

Definidos en `.claude/agents/`. La columna "Dominio" es el criterio de delegación automática.

| Agente | Dominio | Puede editar |
| --- | --- | --- |
| `frontend` | React, Next.js, TypeScript, componentes, lógica, arquitectura frontend, errores de compilación e implementación. | Código del proyecto. |
| `ui-ux` | Diseño visual, responsive, layout, jerarquía, spacing, interacción, animaciones y contenido visual. | Componentes visuales, estilos y textos. |
| `seo` | Metadata, sitemap, robots, JSON-LD, headings, enlaces internos, canonical e indexación. | Solo elementos de SEO. |
| `accessibility` | Semántica, teclado, foco, ARIA, contraste, reduced-motion y WCAG. | Solo cambios de accesibilidad. |
| `performance` | Bundle, Core Web Vitals, imágenes, carga, JavaScript cliente, animaciones y rendimiento. | Nada (lectura + Bash). |
| `security` | CSP, XSS, secretos, dependencias, formularios, headers, URLs, contenido no confiable y superficie de ataque. | Nada (lectura + Bash). |
| `qa-reviewer` | Verificación de cambios de código: diff, regresiones, `npm run check` y veredicto antes de cerrar un cambio sustancial. | Nada (lectura + Bash). |

### Orquestación automática

Estas reglas son para la sesión principal. Aplícalas sin que el usuario escriba `/`, un comando ni el nombre del agente.

1. Cuando una tarea corresponda claramente a un dominio de la tabla, delégala al agente de ese dominio con la herramienta Agent.
2. Si la tarea afecta varias áreas, delega solo a los agentes de los dominios realmente relevantes, en paralelo cuando su trabajo sea independiente. No invoques a todos por defecto.
3. Prefiere estos agentes sobre los globales equivalentes (por ejemplo `ecc:seo-specialist`, `ecc:security-reviewer`, `ecc:performance-optimizer`, `ecc:a11y-architect`) cuando ambos cubran el mismo dominio.
4. No delegues tareas triviales: una pregunta, una lectura puntual o un cambio de una línea se resuelven directamente si delegar solo añade costo o latencia.
5. En cambios sustanciales de código:
   - usa el agente especializado del dominio durante el trabajo;
   - ejecuta `qa-reviewer` antes de considerar la tarea terminada: es obligatorio;
   - ejecuta `security` si el cambio afecta formularios, datos externos, headers, dependencias, URLs, contenido no confiable o configuración de seguridad;
   - ejecuta `accessibility` si cambia UI interactiva;
   - ejecuta `performance` si cambia carga de recursos, animaciones, imágenes, componentes cliente o bundle.
6. En una auditoría de solo lectura, sin cambios ni diff, `qa-reviewer` no es obligatorio. Delégalo ahí únicamente si necesitas un veredicto integrador; que la tarea se describa como "revisión final" no basta para ejecutarlo.
7. `performance`, `security` y `qa-reviewer` son de solo lectura: no les pidas modificar código. Sus hallazgos los corrige el agente con permiso de edición del dominio afectado, y `qa-reviewer` vuelve a revisar.
8. Agentes en paralelo no ejecutan a la vez comandos que escriben o compiten por artefactos compartidos: `npm run build`, `npm run check` (incluye build), cualquier generación de `out/` o `.next/`, instalación de dependencias u otro proceso que escriba en el árbol de trabajo. Indícalo en el encargo aunque el prompt del agente proponga ejecutar el build. Si varios necesitan la misma validación pesada, la ejecuta uno solo, o la sesión principal una vez tras reunir los informes; los demás trabajan por inspección estática. Al cerrar un cambio sustancial, la validación completa la ejecuta preferentemente `qa-reviewer`.
9. Los agentes pueden reportar hallazgos solapados. La sesión principal los consolida antes de responder: elimina duplicados, asigna cada hallazgo al agente principal responsable según el dominio de la tabla, y conserva lo que otros agentes aporten solo cuando añada evidencia distinta. Un mismo problema no se presenta varias veces como hallazgos independientes.
