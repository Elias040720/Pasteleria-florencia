# QA automatizado (17/11/2026)

Playwright/Chromium sobre HTML con CSS y JS incorporados en memoria.

- PASS en 1440×900, 768×1024, 390×844 y 320×740.
- PASS sin overflow horizontal; sin excepciones JavaScript.
- PASS hero: selector de fotografía.
- PASS carta: cambio de categoría y flecha derecha de teclado.
- PASS menú móvil: apertura, cierre y tecla Escape.
- PASS enlaces ancla y alternativas de imágenes.

**Límite:** el entorno de pruebas bloquea peticiones externas; no fue posible validar descarga real de Unsplash, Google Fonts ni Google Maps, ni realizar una inspección visual completa con las fotografías cargadas. Se necesita QA final en un navegador con Internet y con las fotos autorizadas por Florencia antes de publicar.
