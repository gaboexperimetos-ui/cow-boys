# Historial de versiones

## v1.0 — 13 de noviembre de 2026

Primera versión del sitio de **COWBOYS Academia de Baloncesto**. Es la base
entregable: se puede publicar tal cual y sirve de punto de partida para
cualquier cambio futuro.

### Páginas
- Inicio, Academia, Servicios, Sedes, Noticias, Noticia (plantilla),
  Galería, Contacto y 404.

### Identidad
- Logo oficial extraído del vectorial `LOGO UNIFORMES.ai`: cabeza del toro
  transparente (header, banner, pie) y logo completo como asset aparte.
- Paleta morado `#7A1FA2` + dorado `#F2A93B` sobre fondo `#0D0514`.
- Tipografías Anton (titulares) y Manrope (texto).
- Lema oficial: *Formación con identidad · Mentalidad ganadora*.
- Valores: identidad, mentalidad ganadora, personas íntegras, formación de
  calidad.

### Contenido
- Fotos reales del club (21 originales de 175 MB → 3,2 MB en WebP).
- Banner de cierre con los seis patrocinadores (76 Strom, Maxildent, Kiniz,
  Muscle House, Paul Ayala R, Rendr Studio).
- Redes reales: Instagram, Facebook y TikTok (`@cowboysbasket`), con QR en
  Contacto y `sameAs` en el JSON-LD.

### Funcionalidad
- Menú móvil, visor de galería, revelado al hacer scroll.
- Formulario de contacto que arma el mensaje y abre WhatsApp al
  **+593 99 591 9158** (sin servidor ni coste).
- Retardo simulado de 1,5 a 2,5 s por interacción (`RETARDO_MIN` /
  `RETARDO_MAX` en `assets/js/app.js`; poner `RETARDO_MAX = 0` lo desactiva).

### Técnico
- HTML + CSS + JS estático, sin build, sin dependencias, sin base de datos.
- SEO por página: títulos, descripciones, Open Graph y JSON-LD
  `SportsOrganization`.
- Accesibilidad: enlace "saltar al contenido", foco visible, `aria-*` en
  menú y visor, respeto a `prefers-reduced-motion`.
- 49 archivos, 6,9 MB con historial de git.

### Pendiente antes de entregar al cliente
- Datos reales: correo, dirección, horarios, nombres del cuerpo técnico,
  cifras del hero y sedes (todo listado en `README.md`).
- Logos reales de los patrocinadores (hoy son texto en SVG).
- Aviso legal y política de privacidad (obligatorio con fotos de menores).
- Repo en privado y publicación por Cloudflare Pages/Netlify.
