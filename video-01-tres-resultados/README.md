# ACI · Video 1 — "Tres resultados. Cero promesas."

Reel vertical **1080×1920 · 17 s · 30 fps** para Alianza Colombo Inglesa.
Composición HTML/CSS/GSAP construida por capas editables y compatible con HyperFrames.

Exportación lista: `export/aci-video-01.mp4` (H.264).

## Archivos

| Archivo | Qué editar |
| --- | --- |
| `index.html` | Textos (busca `EDITAR`): titular, subtítulo, notificaciones (nombre, `data-score`, nivel), frase, beneficios, CTA, ruta del logo |
| `styles.css` | Colores de marca y medidas en `:root`; posición del abanico (`.slot-1/2/3`) |
| `script.js` | Tiempos en el objeto `T`; dirección y giro de cada notificación en `CARDS` |
| `assets/logos/` | `logo-aci-blanco.png` (archivo oficial entregado), `isotipo-aci-blanco.png` (recorte del mismo archivo). `logo-aci-color.png` queda reservado: no se usa sobre fondo azul |
| `assets/fonts/` | Montserrat 400–900 local |
| `vendor/gsap.min.js` | GSAP 3.14.2 local |

Si cambias `T.end` en `script.js`, cambia también `data-duration` en `#root` (`index.html`).
Para reemplazar el logo por la versión SVG, cambia el `src` de `#logo`.

## Guion de animación

| Tiempo | Momento |
| --- | --- |
| 0:00–0:02 | Fondo #0A396D, formas azul cielo, fade-in del logo |
| 0:02–0:04 | "Tres resultados." / "Cero promesas." con overshoot y trazo bajo "promesas." |
| 0:04–0:06 | Subtítulo en azul cielo |
| 0:06–0:08 | El celular entra desde abajo (escala 0.85→1, giro con perspectiva) |
| 0:08–0:11 | 3 notificaciones: derecha, izquierda, abajo; rebote, vibración del celular, anillo y trazos azul cielo, conteo del puntaje |
| 0:11–0:13 | Píldora "Resultados reales. No promesas." |
| 0:13–0:15 | Beneficios con íconos (stagger + trazado) |
| 0:15–0:17 | CTA rojo con pulse, anillo y flecha animada; cierre con todo visible |

## Previsualizar y exportar

```bash
cd video-01-tres-resultados
npx hyperframes@0.8.97 check                         # validación (lint, layout, contraste)
npx hyperframes@0.8.97 preview                       # Studio con línea de tiempo
npx hyperframes@0.8.97 render --quality delivery --fps 30 --output export/aci-video-01.mp4
```

Requiere Node 22+ y FFmpeg. Alternativa sin CLI: abre `index.html` en Chrome (se reproduce solo;
agrega `?fit` a la URL para ajustarlo a la ventana) y graba la pantalla a 1080×1920.
