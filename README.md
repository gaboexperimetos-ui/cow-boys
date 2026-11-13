# COWBOYS · Academia de Baloncesto — sitio web

**Versión 1.0** · el detalle de lo que incluye está en [CHANGELOG.md](CHANGELOG.md).

Sitio estático (HTML + CSS + JS, sin dependencias ni build). Se abre con doble clic en
`index.html` y se publica gratis en Cloudflare Pages.

---

## 1. Ver el sitio en local

```bash
cd cowboys-web
python3 -m http.server 8899
# abrir http://localhost:8899
```

No hace falta Node, ni npm, ni WordPress.

---

## 2. Datos que DEBES reemplazar antes de publicar

Todo lo de abajo es **demo**. Está marcado así en el código con `EDITAR` y aparece en varias páginas.

| Dato | Dónde | Valor actual (demo) |
|---|---|---|
| Teléfono / WhatsApp | ✅ ya aplicado en las 9 páginas y en `assets/js/app.js` (`TELEFONO`) | `+593 99 591 9158` |
| Correo | todas las páginas | `info@cowboysbc.com` |
| Dirección | `sedes.html`, `contacto.html`, pie | `Av. Principal y Calle 2, Quito` |
| Horarios | `sedes.html`, `contacto.html` | valores de ejemplo |
| Sedes (nombre y dirección) | `sedes.html` | Sede principal / Sede norte |
| Nombres del cuerpo técnico | `index.html`, `academia.html` | `Nombre Apellido` |
| Cifras del hero | `index.html` | 6 categorías · 60+ jugadoras · 2 sedes · 8 años |
| Redes sociales | pie de página | enlaces `#` |
| Categorías | `academia.html` | Sub 8 a Sub 16 |
| Aviso legal / privacidad | pie | enlaces `#` |

**Buscar todo de una vez:**

```bash
grep -rn "9999\|cowboysbc.com\|Av. Principal\|Nombre Apellido" .
```

### El teléfono se cambia en dos sitios

1. En el HTML está escrito a mano (`wa.me/593995919158` y `tel:+593995919158`).
2. En `assets/js/app.js`, la constante `TELEFONO` (lo usa el formulario).

---

## 3. Cambiar el logo y las fotos

### Logo
El logo **oficial** ya está aplicado. Los archivos son:

| Archivo | Uso |
|---|---|
| `assets/img/logo-toro.png` | cabeza del toro, fondo transparente (900×820). Header, banner y pie |
| `assets/img/logo-completo.png` | emblema + palabra COWBOYS, transparente (900×842). Para camisetas, redes o piezas que pidan el logo completo |
| `assets/img/favicon.png` | ícono del navegador (180×180), recortado de la misma cabeza |

Salieron del archivo vectorial `LOGO UNIFORMES.ai` (600 dpi, fondo transparente). Si el cliente
entrega una versión nueva, reemplaza esos tres archivos manteniendo el nombre y lista.

### Fotos
Están en `assets/img/` en WebP, ya recortadas y comprimidas:

| Archivo | Uso |
|---|---|
| `hero.webp` | fondo del inicio (16:9, 2000 px) |
| `equipo.webp` | página Academia |
| `indumentaria.webp` | bloque de patrocinios |
| `sede-1.webp`, `sede-2.webp` | páginas de sede |
| `nota-1 … nota-6.webp` | tarjetas de noticias |
| `staff-1 … staff-3.webp` | cuerpo técnico (3:4) |
| `gal-1 … gal-12.webp` | galería (4:3) |

Para reemplazar una foto mantén el **mismo nombre** y listo. Si cambias la proporción, respeta
el ratio indicado (el diseño recorta con `object-fit: cover`).

### Logos de patrocinadores
Ahora son texto en SVG (`patro-*.svg`) para no inventar marcas. Pide los logos reales en
PNG/SVG **con fondo transparente**, guárdalos con el mismo nombre y se ven igual.

---

## 4. Publicar gratis (Cloudflare Pages)

1. Crea una cuenta en <https://dash.cloudflare.com> → **Workers & Pages → Create → Pages**.
2. Opción **Upload assets**: arrastra la carpeta `cowboys-web` completa.
3. Cloudflare te da una URL `algo.pages.dev` en segundos.
4. En **Custom domains** conecta el dominio del cliente.

Alternativas igual de gratis: Netlify (arrastrar carpeta) y GitHub Pages.

**Dominio:** `.com` ~11 USD/año en Cloudflare Registrar. `.com.ec` ~35–50 USD/año en <https://nic.ec>.
El hosting en Pages es 0 USD.

---

## 5. Editar contenido

### Retardo artificial en los clics

Cada clic (menú, enlaces, galería, formulario) tarda entre **1,5 y 2,5 segundos**,
elegido al azar, para que la app se sienta como un sistema con servidor. Mientras
"piensa", el elemento se atenúa y el cursor pasa a `progress`.

En `assets/js/app.js`, al principio:

```js
var RETARDO_MIN = 1500;   // ms
var RETARDO_MAX = 2500;   // ms — pon 0 para desactivar el retardo
```

---

### Añadir una noticia
1. Duplica `noticia.html` → `noticia-mi-titulo.html`.
2. Cambia título, fecha, foto y texto.
3. En `noticias.html`, copia una tarjeta `<article class="nota">` y apunta el enlace a la nueva página.

### Añadir una foto a la galería
1. Guarda la imagen como `assets/img/gal-13.webp` (900×675).
2. En `galeria.html`, copia un `<figure>` y cambia el `src` y el `alt`.

### Cambiar colores
Todo está en `assets/css/estilos.css`, bloque `:root`:

```css
--tinta:  #0D0514;  /* fondo oscuro */
--hueso:  #F5F0E6;  /* fondo claro */
--rojo:   #F2A93B;  /* dorado de marca (acentos) */
--morado: #7A1FA2;  /* morado de marca */
```

---

## 6. Formulario de contacto

Por defecto **no usa servidor**: arma el mensaje y abre WhatsApp. Funciona siempre y no cuesta nada.
Si el cliente prefiere correo:

1. Crea un formulario gratis en <https://formspree.io> (50 envíos/mes).
2. En `assets/js/app.js` cambia `MODO` a `'correo'` y pega tu endpoint en `ENDPOINT`.

---

## 7. Checklist antes de entregar

- [ ] Teléfono, correo y dirección reales (HTML + `app.js`).
- [ ] Logo oficial y favicon.
- [ ] Nombres reales del cuerpo técnico.
- [ ] Cifras del hero verificadas con el cliente.
- [ ] Horarios y sedes reales.
- [ ] Enlaces de redes sociales.
- [ ] Aviso legal y política de privacidad (obligatorio si hay fotos de menores).
- [ ] Probar el formulario y el botón de WhatsApp **en un celular real**.
- [ ] Revisar las fotos: consentimiento de imagen de las menores.
- [ ] Lighthouse en móvil ≥ 90 en rendimiento y accesibilidad.

---

## 8. Estructura

```
cowboys-web/
├── index.html            Inicio
├── academia.html         Quiénes somos
├── servicios.html        Programas y patrocinios
├── sedes.html            Sedes y horarios
├── noticias.html         Listado de noticias
├── noticia.html          Artículo (plantilla)
├── galeria.html          Galería con visor
├── contacto.html         Formulario + datos
├── 404.html              Página no encontrada
└── assets/
    ├── css/estilos.css   Todo el diseño
    ├── js/app.js         Menú, animaciones, visor, formulario
    └── img/              Logo, fotos y patrocinadores
```

Todas las páginas son HTML plano: no hay base de datos, ni plugins, ni actualizaciones que rompan nada.
