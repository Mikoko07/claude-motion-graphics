/* ============================================================================
   ACI · VIDEO 1 (v2) · "Resultados reales. No promesas."
   Línea de tiempo GSAP (una sola, pausada y "seekable" para HyperFrames).

   EDITAR TIEMPOS: objeto T (segundos). Si cambias T.end, cambia también
   data-duration en #root (index.html).
   Las notificaciones se apilan: la más nueva entra arriba y empuja las
   anteriores hacia abajo (alturas en NOTIF_H, deben coincidir con styles.css).
   ============================================================================ */

(function () {
  const T = {
    hook: 0.0,       // 0:00 hook grande "ANTES DE PRESENTAR IELTS, TOEFL O PTE, MIRA ESTO." (visible desde el fotograma 0)
    hookOut: 1.95,   // 0:02 el hook se reduce y pasa a antetítulo
    deco: 0.1,       //      formas de marca
    logo: 0.3,       //      logo
    open: 2.25,      // 0:02 "No son palabras. / Son resultados." (con antetítulo encima)
    phone: 2.6,      //      entra el celular
    stats: 3.2,      // 0:03 94% · +2.000 (fijos bajo el celular hasta el final)
    pills: 3.6,      //      garantía · tutor (fijos)
    ghosts: 3.9,     // 0:04 flujo secundario de resultados (volumen)
    // 0:05 - 0:11 notificaciones de Paola (el ritmo se acelera; la última es el Overall)
    notifs: [4.8, 6.0, 7.05, 8.0, 9.4],
    overallHit: 10.0, //     énfasis del Overall Band
    claim: 11.6,     // 0:12 "RESULTADOS REALES. NO PROMESAS." (reemplaza titular y antetítulo)
    statsPulse: 14.1,// 0:14 pulso de refuerzo de las cifras
    cta: 16.9,       // 0:17 CTA
    end: 19.5,       // duración total (= data-duration)
  };

  const NOTIF_H = [128, 128, 128, 128, 186]; // alto de cada notificación (px)
  const GAP = 14;                             // espacio entre notificaciones (px)

  window.ACI1 = {
    T: T,
    build: function () {
      const $ = (s) => document.querySelector(s);
      const $$ = (s) => Array.from(document.querySelectorAll(s));
      // 2000 -> "2.000" (separador de miles colombiano, sin depender del locale)
      const fmtMiles = (n) => (n >= 1000 ? Math.floor(n / 1000) + "." + String(n % 1000).padStart(3, "0") : String(n));
      function prepDraw(el) {
        const len = Math.ceil(el.getTotalLength());
        el.style.strokeDasharray = len + " " + len;
        return len;
      }

      const tl = gsap.timeline({ paused: true, defaults: { ease: "power3.out" } });

      /* ---------------- 0:00 - 0:02 · Fondo, logo y titular ---------------- */
      tl.fromTo("#bg-glow", { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 1.6, ease: "power2.out" }, T.deco);
      $$(".deco svg path.draw").forEach((p, i) => {
        const len = prepDraw(p);
        tl.fromTo(p, { strokeDashoffset: len }, { strokeDashoffset: 0, duration: 1.3, ease: "power2.inOut" }, T.deco + i * 0.12);
      });
      tl.fromTo(".deco-lines span", { scaleX: 0, transformOrigin: "left center" }, { scaleX: 1, duration: 0.6, stagger: 0.06 }, T.deco + 0.3);
      tl.fromTo("#logo", { opacity: 0, y: -16 }, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, T.logo);
      /* ---------------- 0:00 - 0:02 · Hook ---------------- */
      // Línea 1 visible desde el fotograma 0 (solo asienta su escala); luego entran 2 y 3 con golpe
      tl.fromTo("#hook-1", { scale: 1.05 }, { scale: 1, duration: 0.35, ease: "power3.out" }, T.hook);
      tl.fromTo("#hook-2", { opacity: 0, scale: 1.25 }, { opacity: 1, scale: 1, duration: 0.3, ease: "power3.out" }, T.hook + 0.25);
      tl.fromTo("#hook-3", { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(2.2)" }, T.hook + 0.55);
      tl.to("#hook-3", { scale: 1.07, duration: 0.14, yoyo: true, repeat: 1, ease: "power2.out" }, T.hook + 1.2);
      // Salida: se encoge hacia arriba (hacia el antetítulo) y se desvanece
      tl.to("#hook", { opacity: 0, scale: 0.35, y: -470, duration: 0.45, ease: "power3.in" }, T.hookOut);
      tl.fromTo("#kicker", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" }, T.hookOut + 0.3);

      tl.fromTo("#open-1", { opacity: 0, y: 70 }, { opacity: 1, y: 0, duration: 0.6, ease: "back.out(1.7)" }, T.open);
      tl.fromTo("#open-2", { opacity: 0, y: 70 }, { opacity: 1, y: 0, duration: 0.6, ease: "back.out(1.7)" }, T.open + 0.35);

      /* ---------------- 0:02 - 0:04 · Celular ---------------- */
      tl.fromTo("#phone-motion", { opacity: 0, y: 420, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 1.1, ease: "power4.out" }, T.phone);

      /* ---------------- Flujo secundario: volumen de resultados ---------------- */
      tl.fromTo(".ghost-lane", { opacity: 0 }, { opacity: 1, duration: 0.8 }, T.ghosts);
      tl.fromTo("#ghost-left", { y: 880 }, { y: -1200, duration: T.end - T.ghosts, ease: "none" }, T.ghosts);
      tl.fromTo("#ghost-right", { y: 950 }, { y: -1130, duration: T.end - T.ghosts, ease: "none" }, T.ghosts);

      /* ---------------- 0:04 - 0:11 · Notificaciones de Paola ---------------- */
      // Posición vertical de la notificación i cuando ya llegó la k (la más nueva queda arriba)
      const yAt = (i, k) => {
        let y = 0;
        for (let j = i + 1; j <= k; j++) y += NOTIF_H[j] + GAP;
        return y;
      };
      T.notifs.forEach((t, k) => {
        const card = "#n-" + (k + 1);
        tl.fromTo(card, { opacity: 0, y: -150, scale: 0.94 }, { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "back.out(1.3)" }, t);
        // Las anteriores bajan suavemente para dejar espacio
        for (let i = 0; i < k; i++) {
          tl.to("#n-" + (i + 1), { y: yAt(i, k), duration: 0.45, ease: "power3.out" }, t);
        }
        // Vibración sutil del celular
        tl.to("#phone-buzz", { x: 5, duration: 0.04, yoyo: true, repeat: 7, ease: "sine.inOut" }, t + 0.1);
      });

      /* ---------------- Clímax: Overall Band ---------------- */
      tl.fromTo("#overall-ring", { opacity: 0.95, scale: 0.97 }, { opacity: 0, scale: 1.07, duration: 0.8, ease: "power2.out", immediateRender: false }, T.overallHit);
      tl.fromTo("#flash", { opacity: 0 }, { opacity: 1, duration: 0.12, ease: "none", immediateRender: false }, T.overallHit);
      tl.to("#flash", { opacity: 0, duration: 0.8, ease: "power2.out" }, T.overallHit + 0.12);
      tl.to("#overall-score", { scale: 1.16, duration: 0.16, yoyo: true, repeat: 1, ease: "power2.out" }, T.overallHit);
      tl.to("#phone-buzz", { x: 7, duration: 0.04, yoyo: true, repeat: 9, ease: "sine.inOut" }, T.overallHit);

      /* ---------------- 0:11 - 0:14 · Claim protagonista ---------------- */
      tl.to(["#kicker", "#open-1", "#open-2"], { opacity: 0, y: -40, duration: 0.35, ease: "power2.in", stagger: 0.05 }, T.claim - 0.35);
      tl.fromTo("#claim-1", { opacity: 0, y: 60, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 0.55, ease: "back.out(1.8)" }, T.claim);
      tl.fromTo("#claim-2", { opacity: 0, y: 60, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 0.55, ease: "back.out(1.8)" }, T.claim + 0.25);
      tl.to("#claim-2", { scale: 1.06, duration: 0.18, yoyo: true, repeat: 1, ease: "sine.inOut" }, T.claim + 1.1);
      // El flujo secundario se atenúa para no competir con el cierre
      tl.to(".ghost-lane", { opacity: 0.55, duration: 0.8 }, T.claim);

      /* ---------------- 0:03 · Diferenciales fijos bajo el celular ---------------- */
      [
        { id: "#stat-1", to: 94, fmt: (v) => Math.round(v) + "%" },
        { id: "#stat-2", to: 2000, fmt: (v) => "+" + fmtMiles(Math.round(v)) },
      ].forEach((s, i) => {
        const t = T.stats + i * 0.2;
        tl.fromTo(s.id, { opacity: 0, y: 40, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "back.out(1.6)" }, t);
        const num = $(s.id + " .stat-num");
        const c = { v: 0 };
        tl.fromTo(c, { v: 0 }, { v: s.to, duration: 0.9, ease: "power2.out", onUpdate: () => { num.textContent = s.fmt(c.v); } }, t + 0.1);
      });
      tl.fromTo(".pill", { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: 0.45, stagger: 0.18 }, T.pills);
      // Pulso de refuerzo de las cifras (ya visibles desde el inicio)
      tl.to([".stat", ".pill"], { scale: 1.05, duration: 0.18, yoyo: true, repeat: 1, ease: "sine.inOut", stagger: 0.12 }, T.statsPulse);
      $$(".pill .p-stroke, .pill .p-sky").forEach((p, i) => {
        const len = prepDraw(p);
        tl.fromTo(p, { strokeDashoffset: len }, { strokeDashoffset: 0, duration: 0.5, ease: "power2.out" }, T.pills + 0.1 + Math.floor(i / 2) * 0.18);
      });

      /* ---------------- 0:17 - 0:19 · CTA ---------------- */
      tl.fromTo("#cta", { opacity: 0, y: 60, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 0.55, ease: "back.out(1.7)" }, T.cta);
      tl.fromTo("#cta-arrow", { opacity: 0, x: -24 }, { opacity: 1, x: 0, duration: 0.35 }, T.cta + 0.3);
      [T.cta + 0.9, T.cta + 1.6].forEach((p) => {
        tl.to("#cta", { scale: 1.05, duration: 0.2, yoyo: true, repeat: 1, ease: "sine.inOut" }, p);
        tl.fromTo("#cta-ring", { opacity: 0.8, scale: 1 }, { opacity: 0, scale: 1.18, duration: 0.5, ease: "power2.out", immediateRender: false }, p);
      });
      tl.to("#cta-arrow", { x: 12, duration: 0.2, yoyo: true, repeat: 3, ease: "sine.inOut" }, T.cta + 1.0);

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
