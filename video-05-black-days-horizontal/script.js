/* ============================================================================
   ACI · VIDEO 4 · BLACK DAYS · versión horizontal 16:9 (mismos tiempos que el Video 4)
   Línea de tiempo GSAP (una sola, pausada y "seekable" para HyperFrames).
   EDITAR TIEMPOS: objeto T (segundos). La locución está colocada en los
   mismos tiempos dentro de assets/audio/mezcla.mp3 (ver README).
   ============================================================================ */

(function () {
  const T = {
    goals: [0.1, 2.95, 6.25],  // "ESA MAESTRÍA." / "ESE TRABAJO." / "ESE PROYECTO DE VIVIR AFUERA." (cortes del material: 2,92 y 6,21)
    goalsOut: [2.85, 6.15, 8.9],
    chip: 0.55,                // destacado "Requisito: certificado de inglés"
    ask: 9.15,                 // 0:09 "¿QUÉ EXAMEN TE ACERCA A TU META?" + exámenes
    flow: 12.1,                // 0:12 TU META → TU EXAMEN → TU PREPARACIÓN
    system: 13.45,             //      "SISTEMA DE INGENIERÍA DE PUNTAJE ACI"
    benefits: [15.3, 17.5, 19.7], // 0:15 beneficios en secuencia
    legal: 19.9,               //      pie legal de la garantía
    wipe: 21.8,                // 0:22 cambio contundente a la oferta
    offer: 22.35,              //      BLACK DAYS / 15% / ... / fechas
    cta: 27.0,                 // 0:27 logo + botón
    end: 30.0,
  };

  window.ACI4 = {
    T: T,
    build: function () {
      const $ = (s) => document.querySelector(s);
      const tl = gsap.timeline({ paused: true, defaults: { ease: "power3.out" } });

      /* ---------------- 0:00-0:09 · Tres metas ---------------- */
      T.goals.forEach((t, i) => {
        const id = "#goal-" + (i + 1);
        tl.fromTo(id, { opacity: 0, scale: 1.25, y: 30 }, { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: "back.out(1.6)" }, t);
        tl.fromTo(id + " .goal-bar", { scaleX: 0 }, { scaleX: 1, duration: 0.4 }, t + 0.25);
        tl.to(id, { opacity: 0, y: -30, duration: 0.15, ease: "power2.in" }, T.goalsOut[i]);
      });
      tl.fromTo("#req-chip", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.35 }, T.chip);
      tl.to("#req-chip", { opacity: 0, duration: 0.15 }, T.goalsOut[0]);

      /* ---------------- 0:09-0:12 · Tríptico + pregunta ---------------- */
      tl.fromTo("#tri-lines", { opacity: 0 }, { opacity: 1, duration: 0.2 }, 9.0);
      tl.to("#tri-lines", { opacity: 0, duration: 0.1 }, 11.95);
      tl.fromTo("#ask-card", { opacity: 0, y: 60, scale: 0.92 }, { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "back.out(1.6)" }, T.ask);
      tl.fromTo(".ask-exams", { opacity: 0 }, { opacity: 1, duration: 0.35 }, T.ask + 0.45);
      tl.to("#ask-card", { opacity: 0, duration: 0.15 }, 11.9);

      /* ---------------- 0:12-0:15 · Flujo + sistema ---------------- */
      tl.fromTo("#tri-scrim", { opacity: 0 }, { opacity: 1, duration: 0.3 }, 9.1);
      tl.to("#tri-scrim", { opacity: 0, duration: 0.1 }, 11.95);
      const path = $("#flow-path");
      const len = Math.ceil(path.getTotalLength());
      path.style.strokeDasharray = len + " " + len;
      tl.fromTo(path, { strokeDashoffset: len }, { strokeDashoffset: 0, duration: 1.1, ease: "power2.inOut" }, T.flow + 0.1);
      ["#node-1", "#arrow-1", "#node-2", "#arrow-2", "#node-3"].forEach((id, i) => {
        tl.fromTo(id, { opacity: 0, scale: 0.7 }, { opacity: 1, scale: 1, duration: 0.35, ease: "back.out(2)" }, T.flow + i * 0.22);
      });
      tl.fromTo("#system", { opacity: 0, y: 50, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "back.out(1.7)" }, T.system);
      tl.to(["#flow", "#system"], { opacity: 0, duration: 0.2 }, 14.85);

      /* ---------------- 0:15-0:22 · Beneficios ---------------- */
      T.benefits.forEach((t, i) => {
        tl.fromTo("#ben-" + (i + 1), { opacity: 0, x: -80 }, { opacity: 1, x: 0, duration: 0.45, ease: "back.out(1.6)" }, t);
        tl.to("#ben-" + (i + 1), { scale: 1.04, duration: 0.15, yoyo: true, repeat: 1, ease: "sine.inOut" }, t + 0.45);
      });
      tl.fromTo("#legal", { opacity: 0 }, { opacity: 1, duration: 0.3 }, T.legal);

      /* ---------------- 0:22 · Cambio a la oferta ---------------- */
      tl.fromTo("#wipe", { opacity: 1, xPercent: -100 }, { xPercent: 0, duration: 0.3, ease: "power3.in" }, T.wipe);
      tl.set(["#benefits", "#legal"], { opacity: 0 }, T.wipe + 0.3);
      tl.set("#offer-bg", { opacity: 1 }, T.wipe + 0.3);
      tl.to("#wipe", { xPercent: 100, duration: 0.35, ease: "power3.out" }, T.wipe + 0.32);

      tl.fromTo("#bd", { opacity: 0, scale: 1.4 }, { opacity: 1, scale: 1, duration: 0.45, ease: "back.out(1.6)" }, T.offer);
      tl.fromTo("#pct", { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1, duration: 0.55, ease: "back.out(1.8)" }, T.offer + 0.35);
      const pctNum = $("#pct-num");
      const c = { v: 0 };
      tl.fromTo(c, { v: 0 }, { v: 15, duration: 0.6, ease: "power2.out", onUpdate: () => { pctNum.textContent = Math.round(c.v); } }, T.offer + 0.35);
      tl.fromTo("#pct-label", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.4 }, T.offer + 0.8);
      tl.fromTo("#offer-sub", { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.4 }, T.offer + 1.2);
      tl.fromTo("#dates", { opacity: 0, y: 24, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: "back.out(1.8)" }, T.offer + 1.6);
      tl.to("#pct", { scale: 1.06, duration: 0.2, yoyo: true, repeat: 1, ease: "sine.inOut" }, T.offer + 2.6);

      /* ---------------- 0:27-0:30 · Logo + CTA ---------------- */
      tl.fromTo("#logo", { opacity: 0, y: -16 }, { opacity: 1, y: 0, duration: 0.5 }, T.cta);
      tl.fromTo("#cta", { opacity: 0, y: 60, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "back.out(1.7)" }, T.cta + 0.2);
      [T.cta + 1.0, T.cta + 1.9].forEach((p) => {
        tl.to("#cta", { scale: 1.04, duration: 0.18, yoyo: true, repeat: 1, ease: "sine.inOut" }, p);
        tl.fromTo("#cta-ring", { opacity: 0.8, scale: 1 }, { opacity: 0, scale: 1.12, duration: 0.5, ease: "power2.out", immediateRender: false }, p);
      });
      tl.to("#cta-arrow", { x: 12, duration: 0.2, yoyo: true, repeat: 3, ease: "sine.inOut" }, T.cta + 1.1);

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
