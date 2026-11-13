/* COWBOYS — JS sin dependencias
   0. Retardo artificial  1. Menú móvil  2. Sombra de cabecera
   3. Revelado al hacer scroll  4. Año del pie  5. Visor de galería
   6. Formulario → WhatsApp */

(function () {
  'use strict';

  /* ---- 0. retardo artificial ----
     Cada clic tarda entre RETARDO_MIN y RETARDO_MAX milisegundos, elegido
     al azar, para que la app no responda siempre igual. Se aplica al menú,
     a los enlaces, al visor de la galería y al formulario.
     Pon RETARDO_MAX en 0 para desactivarlo. */
  var RETARDO_MIN = 1500;
  var RETARDO_MAX = 2500;

  function espera() {
    return Math.round(RETARDO_MIN + Math.random() * (RETARDO_MAX - RETARDO_MIN));
  }

  function conRetardo(el, accion) {
    if (RETARDO_MAX <= 0) { accion(); return; }
    if (el && el.dataset.ocupado === '1') return;
    if (el) { el.dataset.ocupado = '1'; el.classList.add('cargando'); }
    document.documentElement.style.cursor = 'progress';
    setTimeout(function () {
      if (el) { el.classList.remove('cargando'); delete el.dataset.ocupado; }
      document.documentElement.style.cursor = '';
      accion();
    }, espera());
  }

  /* ---- 0b. todos los enlaces ---- */
  document.addEventListener('click', function (e) {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
    var a = e.target.closest ? e.target.closest('a[href]') : null;
    if (!a) return;
    var href = a.getAttribute('href');
    if (!href || href.charAt(0) === '#') return;
    e.preventDefault();
    conRetardo(a, function () {
      if (a.target === '_blank') window.open(href, '_blank', 'noopener');
      else window.location.href = href;
    });
  });

  /* ---- 1. menú móvil ---- */
  var btn = document.getElementById('menuBtn');
  var nav = document.getElementById('nav');
  if (btn && nav) {
    btn.addEventListener('click', function () {
      conRetardo(btn, function () {
        var abierto = nav.classList.toggle('abierto');
        btn.setAttribute('aria-expanded', abierto ? 'true' : 'false');
        btn.setAttribute('aria-label', abierto ? 'Cerrar menú' : 'Abrir menú');
      });
    });
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        nav.classList.remove('abierto');
        btn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---- 2. cabecera: sombra al bajar ---- */
  var cab = document.getElementById('cabecera');
  if (cab) {
    var alScroll = function () {
      cab.style.background = window.scrollY > 24
        ? 'rgba(10,10,11,.95)'
        : 'rgba(10,10,11,.82)';
    };
    window.addEventListener('scroll', alScroll, { passive: true });
    alScroll();
  }

  /* ---- 3. revelado al hacer scroll ---- */
  var piezas = document.querySelectorAll('.revelar');
  if (piezas.length && 'IntersectionObserver' in window) {
    var obs = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add('visible');
          obs.unobserve(en.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    piezas.forEach(function (p) { obs.observe(p); });
  } else {
    piezas.forEach(function (p) { p.classList.add('visible'); });
  }

  /* ---- 4. año del pie ---- */
  var anio = document.getElementById('anio');
  if (anio) anio.textContent = new Date().getFullYear();

  /* ---- 5. visor de galería ---- */
  var visor = document.getElementById('visor');
  var visorImg = document.getElementById('visorImg');
  if (visor && visorImg && typeof visor.showModal === 'function') {
    document.querySelectorAll('.mosaico figure').forEach(function (fig) {
      fig.addEventListener('click', function () {
        conRetardo(fig, function () {
          var img = fig.querySelector('img');
          visorImg.src = img.src;
          visorImg.alt = img.alt;
          visor.showModal();
        });
      });
    });
    visor.addEventListener('click', function (e) {
      if (e.target === visor || e.target.dataset.cerrar !== undefined) visor.close();
    });
  }

  /* ---- 6. formulario → WhatsApp ----
     Sin servidor: arma el mensaje y abre WhatsApp.
     Para enviarlo por correo, cambia MODO a "correo" y pon tu endpoint
     (Formspree, Netlify Forms o Cloudflare Worker). */
  var MODO = 'whatsapp';
  var ENDPOINT = ''; // ej. https://formspree.io/f/xxxxxxx
  var TELEFONO = '593995919158'; // WhatsApp de la academia (formato internacional, sin +)

  var form = document.getElementById('formContacto');
  if (form) {
    var estado = document.getElementById('formEstado');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;

      var d = new FormData(form);
      var nombre = (d.get('nombre') || '').toString().trim();
      var correo = (d.get('correo') || '').toString().trim();
      var tema = (d.get('tema') || '').toString().trim();
      var mensaje = (d.get('mensaje') || '').toString().trim();

      if (MODO === 'whatsapp') {
        var texto = 'Hola, soy ' + nombre + '.%0A'
          + 'Tema: ' + encodeURIComponent(tema) + '%0A'
          + 'Correo: ' + encodeURIComponent(correo) + '%0A%0A'
          + encodeURIComponent(mensaje);
        var boton = form.querySelector('button[type="submit"]');
        if (estado) { estado.hidden = false; estado.textContent = 'Enviando…'; }
        conRetardo(boton, function () {
          window.open('https://wa.me/' + TELEFONO + '?text=' + texto, '_blank', 'noopener');
          if (estado) estado.textContent = 'Abrimos WhatsApp con tu mensaje listo para enviar.';
          form.reset();
        });
        return;
      }

      // modo correo
      if (estado) { estado.hidden = false; estado.textContent = 'Enviando…'; }
      fetch(ENDPOINT, { method: 'POST', body: d, headers: { Accept: 'application/json' } })
        .then(function (r) {
          if (!r.ok) throw new Error('fallo');
          if (estado) estado.textContent = 'Mensaje enviado. Te respondemos pronto.';
          form.reset();
        })
        .catch(function () {
          if (estado) estado.textContent = 'No se pudo enviar. Escríbenos por WhatsApp.';
        });
    });
  }
})();
