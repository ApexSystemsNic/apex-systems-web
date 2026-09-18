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

## 5. Verificación local opcional

En PowerShell:

```powershell
npm.cmd ci
$env:SITE_URL="https://apexsystemsnic.com"
npm.cmd run check:deploy
npm.cmd run preview
```

## 6. Lista posterior al despliegue

- Abrir la portada y navegar con teléfono y computadora.
- Probar `/privacidad`, `/cookies` y `/terminos`.
- Abrir `/robots.txt` y `/sitemap.xml`.
- Probar WhatsApp, Instagram, Facebook y correo.
- Completar el formulario y comprobar el texto generado para WhatsApp.
- Confirmar el candado HTTPS y que no haya advertencias del navegador.
- Mantener una versión anterior disponible para rollback.
