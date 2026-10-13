# Guía de despliegue en Cloudflare Pages

Dominio oficial: `apexsystemsnic.com`

Este paquete usa la exportación estática oficial de Next.js. `npm run build` crea la carpeta `out`, que Cloudflare Pages publica directamente. No se necesita comprar otro hosting ni mantener un servidor encendido.

## 1. Subir a GitHub

1. Crea un repositorio privado, por ejemplo `apex-systems-web`.
2. Sube **el contenido de la carpeta del proyecto**, de modo que `package.json` quede en la raíz del repositorio.
3. No subas `node_modules`, `.next`, `out` ni archivos `.env`; ya están excluidos por `.gitignore`.
4. Usa `main` como rama principal y activa autenticación de dos factores en GitHub.

## 2. Crear el proyecto en Pages

En Cloudflare abre **Workers & Pages → Create application → Pages → Import an existing Git repository**, conecta GitHub y selecciona el repositorio.

Usa exactamente estos valores:

| Campo | Valor |
| --- | --- |
| Production branch | `main` |
| Framework preset | `Next.js (Static HTML Export)` |
| Build command | `npm run build` |
| Build output directory | `out` |
| Root directory | dejar vacío |

`npm run build` es el valor documentado y esperado para **Build command**, pero debe verificarse en el panel: a 2026-10-13 el sitio publicado no se está compilando con ese comando (ver la nota sobre el bundler en la sección 5).

Variables de entorno de producción:

| Variable | Valor |
| --- | --- |
| `SITE_URL` | `https://apexsystemsnic.com` |
| `NODE_VERSION` | `22` |

Inicia el despliegue y comprueba primero la dirección temporal `*.pages.dev`.

## 3. Conectar el dominio

En el proyecto de Pages abre **Custom domains** y agrega primero:

```text
apexsystemsnic.com
```

Después agrega:

```text
www.apexsystemsnic.com
```

Si Cloudflare indica que ya existe un registro DNS, elimina únicamente los registros antiguos del estacionamiento de Namecheap:

- El registro `A` de `@` que apunta a `162.255.119.174`.
- El `CNAME` de `www` que apunta a `parkingpage.namecheap.com`.

No elimines los registros `MX` ni el `TXT` SPF; pertenecen al reenvío de correo de Namecheap.

Usa `apexsystemsnic.com` como dirección principal. Cuando ambas variantes estén activas, configura una redirección permanente de `www` hacia el dominio principal.

## 4. HTTPS y seguridad

Cuando Cloudflare muestre el dominio como **Active** y el certificado esté emitido:

1. En **SSL/TLS → Overview**, usa `Full (strict)`.
2. En **SSL/TLS → Edge Certificates**, activa `Always Use HTTPS` y `Automatic HTTPS Rewrites`.
3. En **Security**, activa `Bot Fight Mode` y conserva el nivel de seguridad en `Medium`.
4. Activa autenticación de dos factores en Cloudflare y Namecheap.
5. Activa HSTS solamente después de verificar que tanto el dominio principal como `www` abren correctamente por HTTPS.

El archivo `public/_headers` ya añade protección contra MIME sniffing, clickjacking, permisos innecesarios y fuga excesiva del referente. También evita que las direcciones temporales de Pages sean indexadas.

## 5. Validación de despliegue (`check:deploy`)

`npm run check:deploy` ejecuta tres pasos y se detiene en el primero que falle:

1. **Antes del build** (`node scripts/validate-production.mjs`): si `SITE_URL` está definida, debe ser un origen `https://` sin ruta, query ni hash y no puede ser `localhost`. Si no es `https://apexsystemsnic.com` muestra un aviso, sin fallar (vistas previas o migraciones). Si no está definida no falla: el build usa el dominio oficial.
2. **`npm run check`**: lint, typecheck y build.
3. **Después del build** (`node scripts/validate-production.mjs --out`): revisa `out/` sin modificarlo.
   - Existen `index.html`, `404.html`, las tres páginas legales, `robots.txt`, `sitemap.xml` y `_headers`.
   - Ningún `.html`, `.xml` o `.txt` contiene `localhost` ni `127.0.0.1`.
   - `canonical`, `og:url`, `sitemap.xml` y `robots.txt` usan un único origen `https://`, igual a `SITE_URL` cuando está definida.
   - `out/_headers` es idéntico a `public/_headers`.

El script no usa red, dependencias ni secretos.

En PowerShell:

```powershell
npm.cmd ci
npm.cmd run check:deploy
npm.cmd run preview
```

### Propuesta: usarlo como build command en Cloudflare

El build command del panel no ejecuta esta validación, así que hoy no corre en el despliegue. Para que un export defectuoso no llegue a publicarse, se puede cambiar en **Settings → Builds & deployments → Build command**:

| Campo | Valor documentado | Valor propuesto |
| --- | --- | --- |
| Build command | `npm run build` (verificar en el panel) | `npm run check:deploy` |

El directorio de salida sigue siendo `out`. Con el cambio, un error de lint, de tipos o de la verificación de `out/` detiene el despliegue y la versión anterior sigue publicada; el build tarda algo más por el lint y el typecheck.

#### Nota: el bundler de producción no es el del repositorio

A 2026-10-13, el HTML de `https://apexsystemsnic.com/` carga `/_next/static/chunks/turbopack-*.js`: producción se sirve compilada con **Turbopack**. En el repositorio, `npm run build` es `next build --webpack`, y `check` y `check:deploy` lo usan, así que el build local se hace con **webpack**. Eso indica que el build command del panel no es `npm run build` (probablemente sea el comando por defecto del preset, `npx next build`).

Consecuencias:

- Cambiar el build command a `npm run check:deploy` (o a `npm run build`) cambiaría además el bundler de producción a webpack. Es una decisión del propietario, a tomar a sabiendas, y conviene probarla primero en un preview `*.pages.dev`.
- Alternativa equivalente: mantener el build command actual y ejecutar `npm run check:deploy` solo en local antes de publicar. En ese caso lo que se valida en local (webpack) no es exactamente lo que compila Cloudflare (Turbopack).

Cualquier cambio se hace en el panel de Cloudflare y **es decisión del propietario del sitio**: el repositorio no lo aplica.

## 6. Lista posterior al despliegue

- Abrir la portada y navegar con teléfono y computadora.
- Probar `/privacidad`, `/cookies` y `/terminos`.
- Abrir `/robots.txt` y `/sitemap.xml`.
- Probar WhatsApp, Instagram, Facebook y correo.
- Completar el formulario y comprobar el texto generado para WhatsApp.
- Confirmar el candado HTTPS y que no haya advertencias del navegador.
- Mantener una versión anterior disponible para rollback.
