/* ============================================================================
   ACI · VIDEO 3 · Conversación en celular
   Línea de tiempo GSAP (una sola, pausada y "seekable" para HyperFrames).

   EDITAR TIEMPOS: objeto T (segundos). Si cambias T.end, cambia también
   data-duration en #root (index.html).
   ============================================================================ */

(function () {
  const T = {
    deco: 0.1,          // 0:00 fondo y formas
    logo: 0.2,          //      logo
    phone: 0.4,         //      entra el celular (fade + scale)
    head: 2.0,          // 0:02 encabezado del chat "IELTS Writing" en línea
    day: 2.6,           //      etiqueta "Hoy"
    typing1: [2.9, 3.9],       // 0:03 el contacto escribe…
    m1: 3.95,           // 0:04 "¿Otra vez no aprobaste el examen?" (izquierda)
    compose: [4.9, 6.1],       // 0:05 el usuario escribe su respuesta en la barra [inicio, fin]
    m2: 6.25,           // 0:06 "Pero yo sí sé inglés. Ya no sé qué estudiar más." (derecha)
    typing2: [7.2, 8.35],      // 0:07 el contacto escribe…
    m3: 8.4,            // 0:08 "Sí. Ese es el error."
    typing3: [9.2, 10.35],     // 0:09 el contacto escribe…
    m4: 10.4,           // 0:10 remate "No necesitas estudiar más. Necesitas responder mejor."
    promo: 12.8,        // 0:13 bloque rojo "En ACI te enseñamos…"
    exams: 14.8,        // 0:15 IELTS · TOEFL · PTE
    support: 15.3,      //      94% efectividad · Tutor personalizado.
    cta: 16.4,          // 0:17 CTA
    end: 18.0,          // duración total (= data-duration)
  };

  window.ACI3 = {
    T: T,
    build: function () {
      const $$ = (s) => Array.from(document.querySelectorAll(s));
      function prepDraw(el) {
        const len = Math.ceil(el.getTotalLength());
        el.style.strokeDasharray = len + " " + len;
        return len;
      }

      const tl = gsap.timeline({ paused: true, defaults: { ease: "power3.out" } });

      // Microinteracción al llegar un mensaje: vibración sutil + destello de los acentos azul cielo
      function arrive(t) {
        tl.to("#phone-buzz", { x: 5, duration: 0.04, yoyo: true, repeat: 5, ease: "sine.inOut" }, t + 0.05);
        tl.to([".rays"], { opacity: 1, scale: 1.12, duration: 0.1, ease: "power2.out" }, t);
        tl.to([".rays"], { opacity: 0.45, scale: 1, duration: 0.5, ease: "power2.out" }, t + 0.12);
      }

      // Indicador de escritura del contacto entre [t0, t1]
      function typing(id, t0, t1) {
        tl.fromTo(id, { opacity: 0, scale: 0.7, transformOrigin: "0% 100%" }, { opacity: 1, scale: 1, duration: 0.25, ease: "back.out(2)" }, t0);
        const dots = $$(id + " i");
        const cycle = 0.36;
        const reps = Math.max(0, Math.floor((t1 - t0 - 0.25) / cycle) - 1);
        dots.forEach((d, i) => {
          tl.fromTo(d, { y: 0 }, { y: -9, duration: cycle / 2, yoyo: true, repeat: reps * 2 + 1, ease: "sine.inOut" }, t0 + 0.2 + i * 0.1);
        });
        tl.to(id, { opacity: 0, duration: 0.12, ease: "none" }, t1 - 0.1);
        // Estado del encabezado: "en línea" -> "escribiendo…" -> "en línea"
        // (estados explícitos con fromTo para que nunca se superpongan al hacer seek)
        // Cambio secuencial: uno sale y luego entra el otro (nunca se ven a la vez)
        tl.fromTo("#st-online", { opacity: 1 }, { opacity: 0, duration: 0.1, ease: "none", immediateRender: false }, t0);
        tl.fromTo("#st-typing", { opacity: 0 }, { opacity: 1, duration: 0.12, ease: "none", immediateRender: false }, t0 + 0.1);
        tl.fromTo("#st-typing", { opacity: 1 }, { opacity: 0, duration: 0.1, ease: "none", immediateRender: false }, t1);
        tl.fromTo("#st-online", { opacity: 0 }, { opacity: 1, duration: 0.12, ease: "none", immediateRender: false }, t1 + 0.1);
      }

      /* ---------------- 0:00 - 0:02 · Fondo, logo, celular ---------------- */
      tl.fromTo("#bg-glow", { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 1.4, ease: "power2.out" }, T.deco);
      $$(".deco svg path.draw").forEach((p, i) => {
        const len = prepDraw(p);
        tl.fromTo(p, { strokeDashoffset: len }, { strokeDashoffset: 0, duration: 1.2, ease: "power2.inOut" }, T.deco + i * 0.1);
      });
      tl.fromTo("#logo", { opacity: 0, y: -16 }, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, T.logo);
      tl.fromTo("#phone-motion", { opacity: 0, scale: 0.88, y: 80 }, { opacity: 1, scale: 1, y: 0, duration: 1.0, ease: "power3.out" }, T.phone);
      tl.fromTo([".rays"], { opacity: 0, scale: 0.6 }, { opacity: 0.45, scale: 1, duration: 0.6 }, T.phone + 0.6);

      /* ---------------- 0:02 - 0:04 · Encabezado del chat ---------------- */
      tl.fromTo("#avatar", { scale: 0 }, { scale: 1, duration: 0.45, ease: "back.out(2.2)" }, T.head);
      tl.fromTo([".contact-name", ".contact-status"], { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.4, stagger: 0.12 }, T.head + 0.1);
      tl.fromTo(".dot", { scale: 0.4 }, { scale: 1.4, duration: 0.25, yoyo: true, repeat: 3, ease: "sine.inOut" }, T.head + 0.4);
      tl.fromTo("#day-chip", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.35 }, T.day);

      const bubbleIn = (id, t, strong) =>
        tl.fromTo(id, { opacity: 0, x: strong ? -50 : -40, y: strong ? 30 : 20, scale: strong ? 0.75 : 0.85, transformOrigin: "0% 100%" },
          { opacity: 1, x: 0, y: 0, scale: 1, duration: strong ? 0.5 : 0.35, ease: strong ? "back.out(2)" : "back.out(1.8)" }, t);

      /* ---------------- 0:03 - 0:04 · Abre el contacto (izquierda) ---------------- */
      typing("#typing-1", T.typing1[0], T.typing1[1]);
      bubbleIn("#m1", T.m1);
      arrive(T.m1);

      /* ---------------- 0:05 - 0:06 · El usuario escribe y envía (derecha) ---------------- */
      const typedEl = document.getElementById("cf-typed");
      const full = typedEl.dataset.text;
      const c = { n: 0 };
      tl.to("#cf-placeholder", { opacity: 0, duration: 0.1 }, T.compose[0]);
      tl.fromTo(c, { n: 0 }, {
        n: full.length,
        duration: T.compose[1] - T.compose[0],
        ease: "none",
        onUpdate: () => { typedEl.textContent = full.slice(0, Math.round(c.n)); },
      }, T.compose[0]);
      tl.fromTo("#send-btn", { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 0.2, ease: "back.out(2)" }, T.compose[0] + 0.1);
      tl.to("#send-btn", { scale: 0.85, duration: 0.08, yoyo: true, repeat: 1 }, T.m2 - 0.12);
      tl.to("#cf-typed", { opacity: 0, duration: 0.08 }, T.m2);
      tl.to("#send-btn", { opacity: 0, duration: 0.15 }, T.m2 + 0.05);
      tl.to("#cf-placeholder", { opacity: 1, duration: 0.15 }, T.m2 + 0.1);
      tl.fromTo("#m2", { opacity: 0, x: 40, y: 20, scale: 0.85, transformOrigin: "100% 100%" }, { opacity: 1, x: 0, y: 0, scale: 1, duration: 0.35, ease: "back.out(1.8)" }, T.m2);
      arrive(T.m2);

      /* ---------------- 0:07 - 0:10 · Respuesta y remate del contacto (izquierda) ---------------- */
      typing("#typing-2", T.typing2[0], T.typing2[1]);
      bubbleIn("#m3", T.m3);
      arrive(T.m3);

      typing("#typing-3", T.typing3[0], T.typing3[1]);
      bubbleIn("#m4", T.m4, true);
      arrive(T.m4);
      tl.fromTo("#key-ring", { opacity: 0.95, scale: 0.96 }, { opacity: 0, scale: 1.08, duration: 0.8, ease: "power2.out", immediateRender: false }, T.m4 + 0.45);
      tl.to("#m4", { scale: 1.04, duration: 0.18, yoyo: true, repeat: 1, ease: "sine.inOut" }, T.m4 + 0.6);
      tl.fromTo(".key-strong", { opacity: 0.2 }, { opacity: 1, duration: 0.35, ease: "power2.out" }, T.m4 + 0.35);

      /* ---------------- 0:13 - 0:15 · Bloque comercial ---------------- */
      tl.fromTo("#promo", { opacity: 0, y: 220 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, T.promo);
      tl.fromTo(["#promo-1", "#promo-2"], { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.15 }, T.promo + 0.3);

      /* ---------------- 0:15 - 0:17 · Líneas de apoyo ---------------- */
      tl.fromTo("#exams", { opacity: 0, y: 24, scale: 0.92 }, { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: "back.out(1.8)" }, T.exams);
      tl.fromTo("#support", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4 }, T.support);

      /* ---------------- 0:17 - 0:18 · CTA ---------------- */
      tl.fromTo("#cta", { opacity: 0, y: 50, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: "back.out(1.7)" }, T.cta);
      tl.fromTo("#cta-arrow", { opacity: 0, x: -24 }, { opacity: 1, x: 0, duration: 0.3 }, T.cta + 0.25);
      [T.cta + 0.55, T.cta + 1.0].forEach((p) => {
        tl.to("#cta", { scale: 1.05, duration: 0.15, yoyo: true, repeat: 1, ease: "sine.inOut" }, p);
        tl.fromTo("#cta-ring", { opacity: 0.8, scale: 1 }, { opacity: 0, scale: 1.16, duration: 0.4, ease: "power2.out", immediateRender: false }, p);
      });
      tl.to("#cta-arrow", { x: 12, duration: 0.15, yoyo: true, repeat: 3, ease: "sine.inOut" }, T.cta + 0.6);

      return tl;
    },
    playStandalone: function (tl) {
      if (location.search.indexOf("fit") !== -1) {
        const s = Math.min(window.innerWidth / 1080, window.innerHeight / 1920);
        document.documentElement.style.zoom = s;
      }
      document.fonts.ready.then(() => tl.restart());
    },
  };
})();
