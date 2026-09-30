/* ============================================================================
   ACI · VIDEO 1 · "Tres resultados. Cero promesas."
   Línea de tiempo GSAP (una sola, pausada y "seekable" para HyperFrames).

   EDITAR TIEMPOS: objeto T (segundos). Si cambias T.end, cambia también
   data-duration en #root (index.html).
   EDITAR ABANICO DE NOTIFICACIONES: arreglo CARDS (dirección de entrada y giro).
   ============================================================================ */

(function () {
  // ---------- Tiempos de cada momento (segundos) ----------
  const T = {
    deco: 0.1, // 0:00 formas de marca
    logo: 0.45, // 0:00 logo fade-in
    head1: 2.0, // 0:02 "Tres resultados."
    head2: 2.55, //      "Cero promesas."
    underline: 3.2, //      trazo azul cielo bajo "promesas."
    subtitle: 4.1, // 0:04 subtítulo
    phone: 6.0, // 0:06 entra el celular
    cards: [8.0, 9.0, 10.0], // 0:08 - 0:11 notificaciones
    phrase: 11.1, // 0:11 "Resultados reales. No promesas."
    benefits: 13.0, // 0:13 beneficios (stagger)
    cta: 15.0, // 0:15 CTA
    end: 17.0, // duración total (= data-duration)
  };

  // ---------- Abanico de notificaciones ----------
  // from: dirección de entrada · rot: giro final (grados) · x: desplazamiento final
  const CARDS = [
    { id: 1, from: { x: 760, y: -20, rotation: 12 }, rot: 3, x: 34 }, // desde la derecha
    { id: 2, from: { x: -760, y: -20, rotation: -12 }, rot: -3, x: -34 }, // desde la izquierda
    { id: 3, from: { x: 0, y: 820, rotation: 0 }, rot: 1.5, x: 14 }, // desde abajo
  ];

  /* ---------------- API pública ----------------
     build(): construye la timeline (llamado desde index.html al final del body).
     playStandalone(): reproducción automática al abrir index.html directo en navegador. */
  window.ACI = {
    T: T,
    CARDS: CARDS,
    build: function () {
      const $ = (s) => document.querySelector(s);
      const $$ = (s) => Array.from(document.querySelectorAll(s));

      // Prepara trazos SVG para animación "draw" (longitud medida, determinista)
      function prepDraw(el) {
        const len = Math.ceil(el.getTotalLength());
        el.style.strokeDasharray = len + " " + len;
        return len;
      }

      const tl = gsap.timeline({ paused: true, defaults: { ease: "power3.out" } });

      /* ---------------- 0:00 - 0:02 · Fondo, formas y logo ---------------- */
      tl.fromTo("#bg-glow", { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 1.6, ease: "power2.out" }, T.deco);

      $$(".deco svg path.draw").forEach((p, i) => {
        const len = prepDraw(p);
        tl.fromTo(p, { strokeDashoffset: len }, { strokeDashoffset: 0, duration: 1.4, ease: "power2.inOut" }, T.deco + i * 0.12);
      });
      tl.fromTo(".deco-rect", { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 1.0, stagger: 0.15 }, T.deco + 0.2);
      tl.fromTo(
        ".deco-lines span",
        { scaleX: 0, transformOrigin: "left center" },
        { scaleX: 1, duration: 0.6, stagger: 0.06 },
        T.deco + 0.3,
      );
      // Deriva ambiental muy sutil durante todo el video
      tl.fromTo("#deco", { y: 0 }, { y: -26, duration: T.end - T.deco, ease: "none" }, T.deco);

      tl.fromTo("#logo", { opacity: 0, y: -16 }, { opacity: 1, y: 0, duration: 1.0, ease: "power2.out" }, T.logo);

      /* ---------------- 0:02 - 0:04 · Titular ---------------- */
      tl.fromTo("#head-1", { opacity: 0, y: 80 }, { opacity: 1, y: 0, duration: 0.7, ease: "back.out(1.7)" }, T.head1);
      tl.fromTo("#head-2", { opacity: 0, y: 80 }, { opacity: 1, y: 0, duration: 0.7, ease: "back.out(1.7)" }, T.head2);
      const ul = $("#underline-path");
      const ulLen = prepDraw(ul);
      tl.fromTo(ul, { strokeDashoffset: ulLen }, { strokeDashoffset: 0, duration: 0.6, ease: "power2.inOut" }, T.underline);

      /* ---------------- 0:04 - 0:06 · Subtítulo ---------------- */
      tl.fromTo("#subtitle", { opacity: 0, y: 34 }, { opacity: 1, y: 0, duration: 0.7 }, T.subtitle);

      /* ---------------- 0:06 - 0:08 · Celular ---------------- */
      tl.fromTo(
        "#phone-motion",
        { opacity: 0, y: 520, scale: 0.85, rotation: 9, rotationY: -26, rotationX: 10 },
        { opacity: 1, y: 0, scale: 1, rotation: -2, rotationY: -8, rotationX: 4, duration: 1.3, ease: "power4.out" },
        T.phone,
      );
      tl.fromTo("#lock-header", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, T.phone + 0.8);

      /* ---------------- 0:08 - 0:11 · Notificaciones ---------------- */
      CARDS.forEach((c, i) => {
        const t = T.cards[i];
        const card = "#card-" + c.id;

        // Entrada con aterrizaje (overshoot)
        tl.fromTo(
          card,
          { opacity: 0, x: c.from.x, y: c.from.y, rotation: c.from.rotation, scale: 0.92 },
          { opacity: 1, x: c.x, y: 0, rotation: c.rot, scale: 1, duration: 0.62, ease: "back.out(1.5)" },
          t,
        );
        // Vibración / bounce al aterrizar
        // (.to encadenado: parte del estado final de la entrada, seguro al hacer seek)
        tl.to(card, { rotation: c.rot + 1.6, duration: 0.05, yoyo: true, repeat: 5, ease: "sine.inOut" }, t + 0.62);
        tl.to(card, { scale: 1.035, duration: 0.12, yoyo: true, repeat: 1, ease: "power1.inOut" }, t + 0.62);

        // Vibración sutil del celular al recibir la notificación
        tl.to("#phone-buzz", { x: 5, duration: 0.04, yoyo: true, repeat: 7, ease: "sine.inOut" }, t + 0.5);

        // Microinteracción: anillo y trazos azul cielo alrededor de la card
        tl.fromTo(
          "#ring-" + c.id,
          { opacity: 0.95, scale: 0.97, x: c.x, rotation: c.rot },
          { opacity: 0, scale: 1.08, x: c.x, rotation: c.rot, duration: 0.7, ease: "power2.out", immediateRender: false },
          t + 0.5,
        );
        $$("#sparks-" + c.id + " path").forEach((p) => {
          const len = prepDraw(p);
          tl.fromTo(p, { strokeDashoffset: len, opacity: 1 }, { strokeDashoffset: 0, duration: 0.28, ease: "power2.out" }, t + 0.5);
          tl.to(p, { opacity: 0, duration: 0.35 }, t + 0.95);
        });
        gsap.set("#sparks-" + c.id, { x: c.x * 0.5 }); // offset estático

        // Conteo del puntaje hasta data-score
        const scoreEl = $(card + " .r-score");
        const target = parseFloat(scoreEl.dataset.score);
        const counter = { v: 0 };
        tl.fromTo(
          counter,
          { v: 0 },
          {
            v: target,
            duration: 0.7,
            ease: "power2.out",
            onUpdate: () => {
              scoreEl.textContent = (Math.round(counter.v * 2) / 2).toFixed(1);
            },
          },
          t + 0.2,
        );
      });

      /* ---------------- 0:11 - 0:13 · Frase de refuerzo ---------------- */
      tl.fromTo(
        "#phrase",
        { opacity: 0, scale: 0.6, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: "back.out(1.8)" },
        T.phrase,
      );

      /* ---------------- 0:13 - 0:15 · Beneficios (stagger) ---------------- */
      $$(".benefit").forEach((b, i) => {
        const t = T.benefits + i * 0.2;
        tl.fromTo(
          b.querySelector(".benefit-icon"),
          { opacity: 0, scale: 0.4 },
          { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(2)" },
          t,
        );
        b.querySelectorAll(".stroke, .stroke-sky").forEach((p) => {
          const len = prepDraw(p);
          tl.fromTo(p, { strokeDashoffset: len }, { strokeDashoffset: 0, duration: 0.5, ease: "power2.out" }, t + 0.12);
        });
        tl.fromTo(b.querySelectorAll(".fill-sky"), { opacity: 0 }, { opacity: 1, duration: 0.3 }, t + 0.3);
        tl.fromTo(b.querySelector(".benefit-label"), { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.45 }, t + 0.1);
      });

      /* ---------------- 0:15 - 0:17 · CTA ---------------- */
      tl.fromTo("#cta", { opacity: 0, y: 70, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "back.out(1.7)" }, T.cta);
      tl.fromTo("#cta-arrow", { opacity: 0, x: -24 }, { opacity: 1, x: 0, duration: 0.4 }, T.cta + 0.35);
      // Pulse elegante + anillo expansivo (2 veces)
      [T.cta + 0.8, T.cta + 1.45].forEach((p, i) => {
        tl.to("#cta", { scale: 1.05, duration: 0.22, yoyo: true, repeat: 1, ease: "sine.inOut" }, p);
        tl.fromTo(
          "#cta-ring",
          { opacity: 0.8, scale: 1 },
          { opacity: 0, scale: 1.18, duration: 0.5, ease: "power2.out", immediateRender: false },
          p,
        );
      });
      // Flecha animada hacia la derecha
      tl.to("#cta-arrow", { x: 12, duration: 0.25, yoyo: true, repeat: 3, ease: "sine.inOut" }, T.cta + 1.0);
      return tl;
    },
    playStandalone: function (tl) {
      // Añade ?fit a la URL para escalar el lienzo 1080x1920 a la ventana.
      if (location.search.indexOf("fit") !== -1) {
        const s = Math.min(window.innerWidth / 1080, window.innerHeight / 1920);
        document.documentElement.style.zoom = s;
      }
      document.fonts.ready.then(() => tl.restart());
    },
  };
})();
