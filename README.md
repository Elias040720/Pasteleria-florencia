# Florencia — propuesta de sitio web

Sitio de presentación editorial para **Florencia Panadería, Pastelería y Cafetería**, ubicada en Av. Universitaria 889, San Miguel, Lima. Elaborado con HTML, CSS y JavaScript puros, sin build ni dependencias de producción.

## Abrir

1. Abre `index.html` en tu navegador con conexión a Internet (las fotografías de ambientación proceden de Unsplash, Google Fonts y el mapa es de Google Maps).
2. Para una prueba local completa, desde la carpeta ejecuta `python -m http.server 8080` y abre `http://localhost:8080`.
3. Puedes publicar los archivos directamente en GitHub Pages, Cloudflare Pages, Netlify o Vercel con salida estática, sin configurar un framework.

## Diseño

- Hero **fotográfico y sin copy superpuesto**, con cambio de imagen suave y controles discretos.
- Personalidad editorial, color cacao, granate, marfil y un isotipo floral de concepto (no reproduce la marca oficial).
- Nuestra historia; cuatro familias de productos; carta interactiva con pestañas y consultas específicas a WhatsApp; tortas y bocaditos; ambiente; ubicación y contactos.
- Menú móvil usable con teclado; enlaces reales, iconos y textos alternativos; preferencia de movimiento reducido; carga diferida y metadatos SEO.

## Lo confirmado y lo que falta

- Negocio familiar desde los años 90, variedad de rubros y dirección: anuncios publicados de Florencia y ficha pública.
- Teléfonos de pedidos públicos: fijo **(01) 566 0855** y WhatsApp **+51 989 048 345**.
- Catálogos de WhatsApp confirmados: enlaces publicados en https://beacons.ai/florenciapasteler (carta, desayunos, bocaditos, tortas y cafés).
- Redes: Facebook `FlorenciaPasteleriaCafe`, Instagram `florenciapasteleriacafe`.
- **No se inventaron precios, stock, delivery integrado, reservas ni pasarela de pagos.** Las consultas se abren en el WhatsApp que publica el negocio.
- Horarios publicados difieren entre directorios. La web lleva a Google Maps para ver horario actualizado, sin afirmar uno no contrastado.
- **Las fotografías actuales son de ambientación / demostración, NO fotografías de Florencia ni prueba visual del producto exacto.** Para una publicación oficial, reemplaza todas con imágenes autorizadas por el propietario. La web incluye un aviso discreto cerca de las especialidades. No uses fotografías de reseñas o redes ajenas sin autorización.
- El isotipo y el wordmark son una propuesta visual, sujetos a aprobación del negocio. No pretenden ser el logo oficial.

## Enlaces de las fuentes y derechos de fotos

- Florencia: https://www.restaurants10.com/PE/Lima/149639351908131/Florencia-Panaderia-Pasteleria-Cafeter%C3%ADa
- Catálogos oficiales: https://beacons.ai/florenciapasteler
- Dirección/reseñas: https://www.google.com/maps/search/?api=1&q=Florencia+Av.+Universitaria+889+San+Miguel+Lima
- Fotografías de ambientación cargadas desde images.unsplash.com. Uso sujeto a https://unsplash.com/license; atribución recomendada y sujetos a derechos de imagen o marcas según cada caso.

## QA mínimo recomendado antes de ponerlo en producción

- Comprobar que el negocio autorice la identidad, el texto y todas las fotos.
- Sustituir imágenes de referencia por fotos reales de productos e interior, optimizadas a AVIF/WebP, alojadas en el proyecto/CDN propio.
- Confirmar teléfono, horario, categorías y enlaces oficiales de catálogos; no usar precios obsoletos.
- Probar WhatsApp, Maps, redes, pestañas y menú móvil sobre teléfonos reales en Chrome, Safari y Firefox.
- Ejecutar Lighthouse y axe-core desde el dominio definitivo; completar revisión de contraste y metas de Open Graph.

No se ha desplegado ni publicado la propuesta en cuentas del cliente.
