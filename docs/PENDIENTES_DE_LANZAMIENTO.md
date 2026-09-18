# Pendientes antes del lanzamiento

## Ya preparado en este paquete

- Dominio canónico configurado como `https://apexsystemsnic.com`.
- Exportación estática compatible con Cloudflare Pages.
- Encabezados básicos de seguridad en `public/_headers`.
- Páginas `robots.txt` y `sitemap.xml` generadas con el dominio oficial.
- Archivos de desarrollo y secretos excluidos del repositorio.

## Obligatorios para publicar

- Esperar a que Cloudflare confirme los nameservers nuevos.
- Subir el proyecto a un repositorio privado de GitHub.
- Crear el proyecto de Cloudflare Pages con salida `out`.
- Conectar `apexsystemsnic.com` y `www.apexsystemsnic.com`.
- Confirmar que ambos dominios tengan HTTPS activo.
- Probar la versión publicada en escritorio y teléfono.
- Confirmar que WhatsApp, Instagram, Facebook y correo sigan apuntando a los canales oficiales.
- Revisar profesionalmente privacidad, cookies y términos. Mientras esto no ocurra, las páginas legales muestran de forma explícita que son borradores.

## Operación 24/7

- Activar autenticación de dos factores en dominio y hosting.
- Usar despliegues reproducibles y conservar una versión anterior para rollback.
- Configurar un monitor externo de disponibilidad para la URL pública.
- Revisar periódicamente actualizaciones de seguridad de Node.js, Next.js y dependencias.
- Revisar los registros de compilación y conservar la última versión estable para rollback.

## Después de publicar

- Revisar `/robots.txt` y `/sitemap.xml` en el dominio real.
- Probar los metadatos al compartir la URL en redes/mensajería.
- Verificar que no existan errores de consola, enlaces rotos ni desplazamiento horizontal.
- Probar teclado, movimiento reducido y navegadores actuales.
