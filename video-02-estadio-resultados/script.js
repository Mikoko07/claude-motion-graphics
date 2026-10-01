/* ============================================================================
   ACI · VIDEO 2 (v2) · Estadio / tablero LED de resultados
   Línea de tiempo GSAP (una sola, pausada y "seekable" para HyperFrames).

   EDITAR TIEMPOS: objeto T (segundos). Si cambias T.end, cambia también
   data-duration en #root (index.html).
   EDITAR CONTADOR: arreglo COUNTER (hitos y momento de cada uno).
   ============================================================================ */

(function () {
  const T = {
    lights: 0.1,        // 0:00 barrido de luces
    logo: 0.2,          //      logo
    ask: [0.35, 0.75, 1.15], // 0:00 - 0:01 "¿NECESITAS" / "SUBIR TU" / "PUNTAJE?" (impacto, grande al centro)
    exams: 1.75,        // 0:02 cápsula roja "IELTS · TOEFL · PTE"
    dock: 3.6,          // 0:04 el hook sube y queda como titular superior
    board: 3.9,         //      entra el tablero LED
    ticker: 4.8,        // 0:05 el tablero de resultados empieza a actualizarse
    effect: 12.4,       // 0:12 94% de efectividad
    score: 13.5,        // 0:13 mini marcador "ACI 3 - IELTS 0" (guiño visual)
    claim: 14.6,        // 0:15 "RESULTADOS REALES. NO PROMESAS."
    proof: 4.4,         // 0:04 franja fija: 94% + garantía (visible hasta el final)
    proofPulse: 16.0,   // 0:16 pulso de la franja
    cta: 17.6,          // 0:18 CTA
    end: 20.0,          // duración total (= data-duration)
  };

  // Hitos del contador de estudiantes certificados: [valor, segundo]
  // El último hito se muestra con "+" (p. ej. "+2.000").
  const COUNTER = [
    [120, 5.4],
    [350, 6.6],
    [780, 7.8],
    [1250, 9.0],
    [2000, 10.6],
  ];
  const EFFECT = 94; // porcentaje de efectividad

  // Resultados del tablero (solo nombre, sin apellido) · EDITAR
  const NAMES = [
    ["Paola", "7.0"], ["Daniel", "6.5"], ["Laura", "7.5"], ["Sergio", "7.0"],
    ["Valentina", "6.5"], ["Mateo", "7.0"], ["Camila", "7.0"], ["Andrés", "6.5"],
    ["Sofía", "7.5"], ["Juan", "7.0"], ["Mariana", "7.0"], ["Felipe", "6.5"],
    ["Natalia", "7.5"], ["Carlos", "7.0"], ["Isabela", "7.0"], ["Tomás", "6.5"],
    ["Daniela", "7.5"], ["Santiago", "7.0"], ["Lucía", "6.5"], ["Julián", "7.0"],
    ["Paula", "7.5"], ["Gabriel", "7.0"], ["Manuela", "6.5"], ["Esteban", "7.0"],
  ];
  // Momentos de actualización del tablero (cada vez más rápidos = volumen creciente)
  const TICKS = [4.8, 5.7, 6.5, 7.2, 7.85, 8.45, 9.0, 9.5, 9.95, 10.35, 10.75, 11.15, 11.55];
  const SLOTS = 4; // filas visibles en el tablero

  // 2000 -> "2.000" (separador de miles colombiano, sin depender del locale)
  const fmtMiles = (n) => (n >= 1000 ? Math.floor(n / 1000) + "." + String(n % 1000).padStart(3, "0") : String(n));

  window.ACI2 = {
    T: T,
    COUNTER: COUNTER,
    build: function () {
      const $ = (s) => document.querySelector(s);
      function prepDraw(el) {
        const len = Math.ceil(el.getTotalLength());
        el.style.strokeDasharray = len + " " + len;
        return len;
      }

      const tl = gsap.timeline({ paused: true, defaults: { ease: "power3.out" } });
      const beams = ["#beam-l1", "#beam-l2", "#beam-r1", "#beam-r2"];

      // Destello de estadio reutilizable (fuerza 0-1)
      function flash(t, strength) {
        tl.fromTo("#flash", { opacity: 0 }, { opacity: strength, duration: 0.08, ease: "none", immediateRender: false }, t);
        tl.to("#flash", { opacity: 0, duration: 0.6, ease: "power2.out" }, t + 0.08);
        tl.to(beams, { opacity: 0.55 + 0.45 * strength, duration: 0.08, ease: "none" }, t);
        tl.to(beams, { opacity: 0.55, duration: 0.7, ease: "power2.out" }, t + 0.1);
      }

      /* ---------------- 0:00 - 0:02 · Estadio, luces y logo ---------------- */
      tl.fromTo(".rig i", { opacity: 0 }, { opacity: 1, duration: 0.05, stagger: { each: 0.03, from: "random" } }, T.lights);
      tl.fromTo(".rig", { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.5 }, T.lights);
      [
        { id: "#beam-l1", from: 55, to: -32 },
        { id: "#beam-l2", from: 65, to: -12 },
        { id: "#beam-r1", from: -55, to: 32 },
        { id: "#beam-r2", from: -65, to: 12 },
      ].forEach((b, i) => {
        tl.fromTo(b.id, { rotation: b.from, opacity: 0 }, { rotation: b.to, opacity: 0.55, duration: 1.2 }, T.lights + (i % 2) * 0.12);
        const start = T.lights + 1.4;
        const cycle = 3;
        const repeat = Math.max(0, Math.floor((T.end - start) / cycle) - 1);
        tl.to(b.id, { rotation: b.to + (i < 2 ? -5 : 5), duration: cycle, yoyo: true, repeat: repeat, ease: "sine.inOut" }, start);
      });
      tl.fromTo(".diag-left", { x: -220 }, { x: 0, duration: 0.8 }, T.lights + 0.3);
      tl.fromTo(".diag-right", { x: 220 }, { x: 0, duration: 0.8 }, T.lights + 0.4);
      tl.fromTo("#field-lines", { opacity: 0 }, { opacity: 1, duration: 1.2 }, T.lights + 0.4);
      tl.fromTo("#logo", { opacity: 0, y: -16 }, { opacity: 1, y: 0, duration: 0.9, ease: "power2.out" }, T.logo);

      gsap.set("#cam-drift", { transformOrigin: "50% 40%" });
      tl.fromTo("#cam-drift", { scale: 1 }, { scale: 1.02, duration: T.end, ease: "none" }, 0);

      /* ---------------- 0:02 - 0:05 · Hook principal ---------------- */
      // Cada línea entra desde arriba con impacto deportivo (escala + rebote), destello y punch de cámara
      ["#ask-1", "#ask-2", "#ask-3"].forEach((id, i) => {
        const t = T.ask[i];
        tl.fromTo(id, { opacity: 0, y: -90, scale: 1.25 }, { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: "back.out(1.6)" }, t);
        tl.to("#cam-punch", { scale: 1.012, duration: 0.1, yoyo: true, repeat: 1, ease: "power2.out" }, t + 0.25);
        flash(t + 0.25, i === 2 ? 0.6 : 0.35);
      });
      // 0:05 cápsula de exámenes
      tl.fromTo("#hook-exams", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, T.exams);
      // 0:07 el bloque sube y queda como titular superior (sin tapar el logo)
      gsap.set("#hook", { transformOrigin: "50% 0%" });
      tl.to("#hook", { scale: 0.46, y: -442, duration: 0.6, ease: "power3.inOut" }, T.dock);
      // La cápsula crece un poco al subir para que los exámenes sigan siendo legibles
      tl.to("#hook-exams", { scale: 1.3, transformOrigin: "50% 0%", duration: 0.6, ease: "power3.inOut" }, T.dock);

      tl.fromTo("#board", { opacity: 0, y: 60, scale: 0.94 }, { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: "back.out(1.4)" }, T.board);
      // Encendido del contador (parpadeo LED)
      tl.fromTo("#counter-box", { opacity: 0 }, { opacity: 1, duration: 0.04, ease: "none" }, T.board + 0.6);
      tl.to("#counter-box", { opacity: 0.3, duration: 0.04, ease: "none" }, T.board + 0.7);
      tl.to("#counter-box", { opacity: 1, duration: 0.04, ease: "none" }, T.board + 0.78);
      tl.fromTo("#count-label", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4 }, T.board + 0.5);
      tl.fromTo("#ticker", { opacity: 0 }, { opacity: 1, duration: 0.4 }, T.board + 0.9);

      /* ---------------- 0:05 - 0:11 · Volumen: contador + ticker ---------------- */
      const countEl = $("#count");
      const glowEl = $("#count-glow");
      let prev = 0;
      COUNTER.forEach(([value, t], i) => {
        const last = i === COUNTER.length - 1;
        const from = prev;
        const c = { v: from };
        tl.fromTo(
          c,
          { v: from },
          {
            v: value,
            duration: last ? 0.9 : 0.6,
            ease: "power2.out",
            immediateRender: false,
            onUpdate: () => {
              const n = Math.round(c.v);
              const txt = (last && n === value ? "+" : "") + fmtMiles(n);
              countEl.textContent = txt;
              glowEl.textContent = txt;
            },
          },
          t - (last ? 0.9 : 0.6)
        );
        // "Score update": pulso del contador y destello
        tl.to("#counter-box", { scale: last ? 1.06 : 1.03, duration: 0.12, yoyo: true, repeat: 1, ease: "power2.out" }, t);
        flash(t, last ? 1 : 0.45);
        prev = value;
      });
      // Punch de cámara en el hito final
      const tFinal = COUNTER[COUNTER.length - 1][1];
      tl.to("#cam-punch", { scale: 1.02, duration: 0.14, yoyo: true, repeat: 1, ease: "power2.out" }, tFinal);

      // Tablero de resultados: filas fijas que se actualizan en cascada, cada vez más rápido
      const slotsEl = $("#ticker-slots");
      const entries = []; // entries[slot][step]
      for (let s = 0; s < SLOTS; s++) {
        const slot = document.createElement("div");
        slot.className = "t-slot";
        entries.push([]);
        TICKS.forEach((_, k) => {
          const [name, score] = NAMES[(k * SLOTS + s) % NAMES.length];
          const row = document.createElement("div");
          row.className = "t-row";
          row.innerHTML = "<b>" + name + "</b><span>" + score + "</span>";
          slot.appendChild(row);
          entries[s].push(row);
        });
        slotsEl.appendChild(slot);
      }
      TICKS.forEach((t, k) => {
        const quick = k >= 5; // al final el cambio es más rápido
        for (let s = 0; s < SLOTS; s++) {
          const at = t + s * (quick ? 0.03 : 0.06);
          if (k > 0) tl.to(entries[s][k - 1], { opacity: 0, y: -26, duration: quick ? 0.1 : 0.15, ease: "power2.in" }, at);
          tl.fromTo(entries[s][k], { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: quick ? 0.16 : 0.24, ease: "power2.out", immediateRender: false }, at + (quick ? 0.08 : 0.12));
        }
        // Destello de la fila destacada
        tl.fromTo(".ticker-lane", { opacity: 0.35 }, { opacity: 1, duration: 0.25, ease: "power2.out", immediateRender: false }, t + 0.1);
      });

      // Cinta LED inferior: nombres en movimiento continuo hasta el final
      const track = $("#ribbon-track");
      const half = Math.round(track.scrollWidth / 2);
      tl.fromTo("#ribbon", { opacity: 0 }, { opacity: 1, duration: 0.5 }, T.ticker);
      tl.fromTo(track, { x: 0 }, { x: -half, duration: T.end - T.ticker, ease: "none" }, T.ticker);

      /* ---------------- 0:12 · 94% de efectividad ---------------- */
      tl.to("#ticker", { opacity: 0, scale: 0.96, duration: 0.35, ease: "power2.in" }, T.effect - 0.3);
      tl.fromTo("#effect", { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.6)" }, T.effect);
      const effNum = $("#effect-num");
      const effGlow = $("#effect-glow");
      const e = { v: 0 };
      tl.fromTo(
        e,
        { v: 0 },
        {
          v: EFFECT,
          duration: 0.8,
          ease: "power2.out",
          onUpdate: () => {
            const txt = Math.round(e.v) + "%";
            effNum.textContent = txt;
            effGlow.textContent = txt;
          },
        },
        T.effect + 0.1
      );
      tl.to("#effect-box", { scale: 1.05, duration: 0.12, yoyo: true, repeat: 1, ease: "power2.out" }, T.effect + 0.9);
      flash(T.effect + 0.9, 0.7);

      /* ---------------- 0:13 · Mini marcador ACI 3 - IELTS 0 ---------------- */
      // Entrada rápida (~0.45 s): la placa se enciende, barrido de luz y "score update" del 3
      tl.fromTo("#score-plate", { opacity: 0, scaleX: 0.7 }, { opacity: 1, scaleX: 1, duration: 0.3, ease: "power3.out" }, T.score);
      tl.fromTo("#sp-sweep", { x: -180, opacity: 1 }, { x: 820, opacity: 1, duration: 0.45, ease: "power2.inOut", immediateRender: false }, T.score + 0.05);
      tl.to("#sp-sweep", { opacity: 0, duration: 0.1 }, T.score + 0.5);
      tl.fromTo("#sp-aci", { rotationX: -90, opacity: 0 }, { rotationX: 0, opacity: 1, duration: 0.3, ease: "back.out(2)" }, T.score + 0.15);
      tl.fromTo("#sp-ielts", { opacity: 0 }, { opacity: 1, duration: 0.25 }, T.score + 0.15);
      tl.to("#score-plate", { scale: 1.04, duration: 0.12, yoyo: true, repeat: 1, ease: "power2.out" }, T.score + 0.45);
      flash(T.score + 0.2, 0.35);

      /* ---------------- 0:14 - 0:17 · Claim ---------------- */
      tl.to("#hook", { opacity: 0, duration: 0.35, ease: "power2.in" }, T.claim - 0.35);
      tl.fromTo("#claim-1", { opacity: 0, y: 60, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 0.55, ease: "back.out(1.8)" }, T.claim);
      tl.fromTo("#claim-2", { opacity: 0, y: 60, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 0.55, ease: "back.out(1.8)" }, T.claim + 0.25);
      tl.to("#claim-2", { scale: 1.06, duration: 0.18, yoyo: true, repeat: 1, ease: "sine.inOut" }, T.claim + 1.0);

      /* ---------------- Franja fija: 94% + garantía ---------------- */
      tl.fromTo([".proof-chip"], { opacity: 0, y: 30, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "back.out(1.7)", stagger: 0.15 }, T.proof);
      document.querySelectorAll(".g-icon path").forEach((p) => {
        const len = prepDraw(p);
        tl.fromTo(p, { strokeDashoffset: len }, { strokeDashoffset: 0, duration: 0.5, ease: "power2.out" }, T.proof + 0.3);
      });
      // Pulso de refuerzo en el cierre
      tl.to(".proof-chip", { scale: 1.06, duration: 0.18, yoyo: true, repeat: 1, ease: "sine.inOut", stagger: 0.15 }, T.proofPulse);

      /* ---------------- 0:17 - 0:19.5 · CTA ---------------- */
      tl.fromTo("#cta", { opacity: 0, y: 60, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 0.55, ease: "back.out(1.7)" }, T.cta);
      tl.fromTo("#cta-arrow", { opacity: 0, x: -24 }, { opacity: 1, x: 0, duration: 0.35 }, T.cta + 0.3);
      [T.cta + 0.8, T.cta + 1.5].forEach((p) => {
        tl.to("#cta", { scale: 1.05, duration: 0.2, yoyo: true, repeat: 1, ease: "sine.inOut" }, p);
        tl.fromTo("#cta-ring", { opacity: 0.8, scale: 1 }, { opacity: 0, scale: 1.18, duration: 0.45, ease: "power2.out", immediateRender: false }, p);
      });
      tl.to("#cta-arrow", { x: 12, duration: 0.2, yoyo: true, repeat: 3, ease: "sine.inOut" }, T.cta + 0.9);

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
