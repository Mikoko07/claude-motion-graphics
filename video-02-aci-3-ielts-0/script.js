/* ============================================================================
   ACI · VIDEO 2 · "ACI 3 - IELTS 0"
   Línea de tiempo GSAP (una sola, pausada y "seekable" para HyperFrames).

   EDITAR TIEMPOS: objeto T (segundos). Si cambias T.end, cambia también
   data-duration en #root (index.html).
   Cada "gol" (T.goals) suma un punto a ACI; cada fila (T.rows) muestra al
   estudiante que lo logró.
   ============================================================================ */

(function () {
  // ---------- Tiempos de cada momento (segundos) ----------
  const T = {
    lights: 0.1,              // 0:00 barrido de luces de estadio
    logo: 0.5,                // 0:00 logo
    headline: 1.7,            // 0:02 marcador "ACI 0 - IELTS 0"
    board: 3.5,               //      entra el tablero LED
    goals: [2.9, 7.0, 10.0],  // ACI 1, ACI 2, ACI 3 (flip + flash)
    rows: [4.1, 7.6, 10.6],   // Paola, Gustavo, Gazán
    full: 13.0,               // 0:13 marcador completo + subtítulo
    benefits: 15.0,           // 0:15 beneficios
    claim: 17.0,              // 0:17 "Si no pasas, repites gratis"
    cta: 17.7,                //      CTA
    end: 19.5,                // duración total (= data-duration)
  };

  /* ---------------- API pública ----------------
     build(): construye la timeline (llamado desde index.html al final del body).
     playStandalone(): reproducción automática al abrir index.html directo en navegador. */
  window.ACI2 = {
    T: T,
    build: function () {
      const $$ = (s) => Array.from(document.querySelectorAll(s));

      // Prepara trazos SVG para animación "draw" (longitud medida, determinista)
      function prepDraw(el) {
        const len = Math.ceil(el.getTotalLength());
        el.style.strokeDasharray = len + " " + len;
        return len;
      }

      const tl = gsap.timeline({ paused: true, defaults: { ease: "power3.out" } });
      const beams = ["#beam-l1", "#beam-l2", "#beam-r1", "#beam-r2"];

      /* ---------------- 0:00 - 0:02 · Estadio, luces y logo ---------------- */
      tl.fromTo(".rig i", { opacity: 0 }, { opacity: 1, duration: 0.05, stagger: { each: 0.03, from: "random" } }, T.lights);
      tl.fromTo(".rig", { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.5 }, T.lights);

      // Barrido: los haces entran desde fuera del lienzo hacia el centro
      const sweep = [
        { id: "#beam-l1", from: 55, to: -32 },
        { id: "#beam-l2", from: 65, to: -12 },
        { id: "#beam-r1", from: -55, to: 32 },
        { id: "#beam-r2", from: -65, to: 12 },
      ];
      sweep.forEach((b, i) => {
        tl.fromTo(b.id, { rotation: b.from, opacity: 0 }, { rotation: b.to, opacity: 0.55, duration: 1.2, ease: "power3.out" }, T.lights + (i % 2) * 0.12);
        // Vaivén suave y finito durante el resto del video
        const start = T.lights + 1.4;
        const cycle = 3;
        const repeat = Math.max(0, Math.floor((T.end - start) / cycle) - 1);
        tl.to(b.id, { rotation: b.to + (i < 2 ? -5 : 5), duration: cycle, yoyo: true, repeat: repeat, ease: "sine.inOut" }, start);
      });

      tl.fromTo(".diag-left", { x: -220 }, { x: 0, duration: 0.8 }, T.lights + 0.3);
      tl.fromTo(".diag-right", { x: 220 }, { x: 0, duration: 0.8 }, T.lights + 0.4);
      tl.fromTo("#field-lines", { opacity: 0 }, { opacity: 1, duration: 1.2 }, T.lights + 0.4);
      tl.fromTo("#logo", { opacity: 0, y: -16 }, { opacity: 1, y: 0, duration: 0.9, ease: "power2.out" }, T.logo);

      // Movimiento de cámara muy sutil durante todo el video
      gsap.set("#cam-drift", { transformOrigin: "50% 40%" });
      tl.fromTo("#cam-drift", { scale: 1 }, { scale: 1.02, duration: T.end, ease: "none" }, 0);

      /* ---------------- 0:02 · Marcador titular ACI 0 - IELTS 0 ---------------- */
      tl.fromTo(
        ["#team-aci", "#dash", "#team-ielts"],
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 0.6, ease: "back.out(1.7)", stagger: 0.08 },
        T.headline
      );
      tl.fromTo(
        ["#tile-aci", "#tile-ielts"],
        { opacity: 0, rotationX: -90 },
        { opacity: 1, rotationX: 0, duration: 0.55, ease: "back.out(1.6)", stagger: 0.12 },
        T.headline + 0.1
      );

      /* ---------------- Goles: ACI suma un punto ---------------- */
      function goal(n, t) {
        // Flip LED del dígito
        tl.to("#aci-" + (n - 1), { rotationX: 90, opacity: 0, duration: 0.16, ease: "power2.in" }, t);
        tl.fromTo(
          "#aci-" + n,
          { rotationX: -90, opacity: 0 },
          { rotationX: 0, opacity: 1, duration: 0.3, ease: "back.out(2)", immediateRender: false },
          t + 0.16
        );
        // "Score update": rebote de la ficha
        tl.to("#tile-aci", { scale: 1.16, duration: 0.14, yoyo: true, repeat: 1, ease: "power2.out" }, t + 0.16);
        // Flash de luces del estadio
        tl.fromTo("#flash", { opacity: 0 }, { opacity: 1, duration: 0.08, ease: "none", immediateRender: false }, t + 0.1);
        tl.to("#flash", { opacity: 0, duration: 0.7, ease: "power2.out" }, t + 0.18);
        tl.to(beams, { opacity: 1, duration: 0.1, ease: "none" }, t + 0.1);
        tl.to(beams, { opacity: 0.55, duration: 0.8, ease: "power2.out" }, t + 0.2);
        // Pequeño "punch" de cámara
        tl.to("#cam-punch", { scale: 1.015, duration: 0.14, yoyo: true, repeat: 1, ease: "power2.out" }, t + 0.12);
      }
      T.goals.forEach((t, i) => goal(i + 1, t));

      /* ---------------- Tablero LED ---------------- */
      tl.fromTo("#board", { opacity: 0, y: 50, scale: 0.94 }, { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: "back.out(1.4)" }, T.board);

      /* ---------------- Filas: estudiante + puntaje LED ---------------- */
      function row(n, t) {
        const r = "#row-" + n;
        tl.fromTo([r + " .row-num", r + " .row-info"], { opacity: 0, x: -60 }, { opacity: 1, x: 0, duration: 0.5, stagger: 0.06 }, t);
        tl.fromTo(r + " .score-box", { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.45, ease: "back.out(1.8)" }, t + 0.2);
        // Encendido LED con parpadeo
        const s = "#score-" + n;
        tl.fromTo(s, { opacity: 0 }, { opacity: 1, duration: 0.04, ease: "none" }, t + 0.4);
        tl.to(s, { opacity: 0.2, duration: 0.04, ease: "none" }, t + 0.5);
        tl.to(s, { opacity: 1, duration: 0.04, ease: "none" }, t + 0.58);
        tl.to(s, { opacity: 0.4, duration: 0.03, ease: "none" }, t + 0.66);
        tl.to(s, { opacity: 1, duration: 0.04, ease: "none" }, t + 0.72);
        // Resplandor rojo del puntaje
        const g = r + " .score-glow";
        tl.fromTo(g, { opacity: 0 }, { opacity: 1, duration: 0.25, ease: "power2.out" }, t + 0.72);
        tl.to(g, { opacity: 0.55, duration: 0.8, ease: "power2.inOut" }, t + 1.0);
        // "Resultado real."
        tl.fromTo("#tag-" + n, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.4 }, t + 0.85);
      }
      T.rows.forEach((t, i) => row(i + 1, t));

      /* ---------------- 0:13 · Marcador completo ---------------- */
      tl.fromTo("#subtitle", { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: 0.6 }, T.full);
      $$(".score-glow").forEach((g, i) => {
        tl.to(g, { opacity: 1, duration: 0.2, yoyo: true, repeat: 1, ease: "sine.inOut" }, T.full + 0.3 + i * 0.18);
      });
      tl.to("#tile-aci", { scale: 1.1, duration: 0.18, yoyo: true, repeat: 1, ease: "sine.inOut" }, T.full + 0.2);

      /* ---------------- 0:15 · Beneficios (stagger) ---------------- */
      $$(".benefit").forEach((b, i) => {
        const t = T.benefits + i * 0.18;
        tl.fromTo(b.querySelector(".benefit-icon"), { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1, duration: 0.45, ease: "back.out(2)" }, t);
        b.querySelectorAll(".stroke, .stroke-sky").forEach((p) => {
          const len = prepDraw(p);
          tl.fromTo(p, { strokeDashoffset: len }, { strokeDashoffset: 0, duration: 0.45, ease: "power2.out" }, t + 0.1);
        });
        tl.fromTo(b.querySelectorAll(".fill-sky"), { opacity: 0 }, { opacity: 1, duration: 0.3 }, t + 0.25);
        tl.fromTo(b.querySelector(".benefit-label"), { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 0.4 }, t + 0.08);
      });

      /* ---------------- 0:17 · Claim + CTA ---------------- */
      tl.fromTo("#claim", { opacity: 0, scale: 0.8, y: 20 }, { opacity: 1, scale: 1, y: 0, duration: 0.55, ease: "back.out(1.8)" }, T.claim);
      $$(".claim-icon path").forEach((p) => {
        const len = prepDraw(p);
        tl.fromTo(p, { strokeDashoffset: len }, { strokeDashoffset: 0, duration: 0.5, ease: "power2.out" }, T.claim + 0.2);
      });

      tl.fromTo("#cta", { opacity: 0, y: 60, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 0.55, ease: "back.out(1.7)" }, T.cta);
      tl.fromTo("#cta-arrow", { opacity: 0, x: -24 }, { opacity: 1, x: 0, duration: 0.35 }, T.cta + 0.3);
      // Pulse elegante + anillo expansivo (dos veces, termina antes de T.end)
      [T.cta + 0.75, T.cta + 1.3].forEach((p) => {
        tl.to("#cta", { scale: 1.05, duration: 0.2, yoyo: true, repeat: 1, ease: "sine.inOut" }, p);
        tl.fromTo("#cta-ring", { opacity: 0.8, scale: 1 }, { opacity: 0, scale: 1.18, duration: 0.45, ease: "power2.out", immediateRender: false }, p);
      });
      // Flecha animada hacia la derecha
      tl.to("#cta-arrow", { x: 12, duration: 0.2, yoyo: true, repeat: 3, ease: "sine.inOut" }, T.cta + 0.8);

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
