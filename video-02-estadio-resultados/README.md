# ACI · Video 2 (v2) — Estadio / tablero LED de resultados

Reel vertical **1080×1920 · 20 s · 30 fps** para Alianza Colombo Inglesa.
Universo visual de estadio nocturno. El protagonista es el volumen: un contador LED sube hasta
**+2.000 estudiantes certificados**, un tablero se actualiza en cascada con resultados (solo nombre),
una cinta LED recorre nombres y el tablero remata en **94% de efectividad**. Debajo del 94% aparece un
mini marcador "ACI 3 - IELTS 0" como guiño visual de competencia (no es el mensaje principal).

Exportación lista: `export/aci-video-02.mp4` (H.264).

## Qué editar

| Archivo | Qué editar |
| --- | --- |
| `index.html` | Busca `EDITAR`: hook, exámenes, pregunta, claim, etiquetas del tablero, mini marcador (`#score-plate`), nombres de la cinta LED, franja fija 94% + garantía (`.proof-bar`), CTA, logo |
| `script.js` | `T` (tiempos; `T.open/exams/ask` = secuencia de inicio, `T.score` = mini marcador, `T.proof` = franja fija), `COUNTER` (hitos del contador: 120, 350, 780, 1.250, +2.000), `EFFECT` (94), `NAMES` (resultados del tablero), `TICKS` (momentos de actualización) |
| `styles.css` | Colores y medidas en `:root` |

Los nombres de `NAMES` y de la cinta son de ejemplo: reemplázalos por nombres reales (sin apellido).
Si cambias `T.end`, cambia también `data-duration` en `#root`.

## Guion

| Tiempo | Momento |
| --- | --- |
| 0:00–0:02 | Estadio: las luces se encienden con barrido; logo ACI |
| 0:02–0:04 | Hook principal grande al centro, línea por línea con impacto: "¿NECESITAS / SUBIR TU / PUNTAJE?" |
| 0:05 | Cápsula roja "IELTS · TOEFL · PTE" debajo del hook |
| 0:07 | El hook sube y queda como titular superior; entran el tablero LED y la franja fija 94% + garantía |
| 0:08–0:12 | Contador 120 → 350 → 780 → 1.250 → +2.000 con destellos; tablero de resultados que se actualiza cada vez más rápido; cinta LED con nombres |
| 0:12–0:13 | +2.000 estudiantes certificados y luego 94% de efectividad (clímax) |
| 0:13,5 | Mini marcador "ACI 3 - IELTS 0" bajo el 94%: la placa se enciende, barrido de luz y "score update" del 3 (~0,45 s); queda visible hasta el cierre |
| 0:14,6–0:17 | "RESULTADOS REALES. NO PROMESAS."; la franja de 94% y garantía hace un pulso de refuerzo |
| 0:17,6–0:20 | CTA rojo con pulse y flecha; tablero, cifras, marcador y garantía visibles |

## Exportar

```bash
cd video-02-estadio-resultados
npx hyperframes@0.8.97 check
npx hyperframes@0.8.97 render --quality delivery --fps 30 --output export/aci-video-02.mp4
```
Requiere Node 22+ y FFmpeg. Alternativa: abrir `index.html` en Chrome (agrega `?fit`) y grabar la pantalla.
