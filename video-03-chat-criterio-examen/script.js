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
    out: [4.0, 5.0, 6.0],      // 0:04 - 0:08 mensajes enviados (ritmo ágil)
    typing1: [7.6, 8.95],      // 0:08 indicador "escribiendo…" [inicio, fin]
    m4: 9.0,            // 0:09 "Sí. Ese es el error."
    typing2: [9.9, 10.95],     // 0:10 segundo "escribiendo…"
    m5: 11.0,           // 0:11 remate "No necesitas estudiar más. Necesitas responder mejor."
    promo: 13.0,        // 0:13 bloque rojo "En ACI te enseñamos…"
    exams: 15.0,        // 0:15 IELTS · TOEFL · PTE
    support: 15.5,      //      94% efectividad · Tutor personalizado.
    cta: 16.5,          // 0:17 CTA
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
        tl.to("#st-online", { opacity: 0, duration: 0.15 }, t0);
        tl.fromTo("#st-typing", { opacity: 0 }, { opacity: 1, duration: 0.15, immediateRender: false }, t0);
        tl.to("#st-typing", { opacity: 0, duration: 0.15 }, t1);
        tl.to("#st-online", { opacity: 1, duration: 0.15 }, t1);
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

      /* ---------------- 0:04 - 0:08 · Mensajes enviados (derecha) ---------------- */
      T.out.forEach((t, i) => {
        tl.fromTo("#m" + (i + 1), { opacity: 0, x: 40, y: 20, scale: 0.85, transformOrigin: "100% 100%" }, { opacity: 1, x: 0, y: 0, scale: 1, duration: 0.35, ease: "back.out(1.8)" }, t);
        arrive(t);
      });

      /* ---------------- 0:08 - 0:11 · Respuesta del contacto (izquierda) ---------------- */
      typing("#typing-1", T.typing1[0], T.typing1[1]);
      tl.fromTo("#m4", { opacity: 0, x: -40, y: 20, scale: 0.85, transformOrigin: "0% 100%" }, { opacity: 1, x: 0, y: 0, scale: 1, duration: 0.35, ease: "back.out(1.8)" }, T.m4);
      arrive(T.m4);

      typing("#typing-2", T.typing2[0], T.typing2[1]);
      // Remate principal: entrada con más énfasis
      tl.fromTo("#m5", { opacity: 0, x: -50, y: 30, scale: 0.75, transformOrigin: "0% 100%" }, { opacity: 1, x: 0, y: 0, scale: 1, duration: 0.5, ease: "back.out(2)" }, T.m5);
      arrive(T.m5);
      tl.fromTo("#key-ring", { opacity: 0.95, scale: 0.96 }, { opacity: 0, scale: 1.08, duration: 0.8, ease: "power2.out", immediateRender: false }, T.m5 + 0.45);
      tl.to("#m5", { scale: 1.04, duration: 0.18, yoyo: true, repeat: 1, ease: "sine.inOut" }, T.m5 + 0.6);
      tl.fromTo(".key-strong", { opacity: 0.2 }, { opacity: 1, duration: 0.35, ease: "power2.out" }, T.m5 + 0.35);

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
