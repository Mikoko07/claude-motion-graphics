# ACI · Video 1 (v2) — "Resultados reales. No promesas."

Reel vertical **1080×1920 · 19.5 s · 30 fps** para Alianza Colombo Inglesa.
Un celular protagonista recibe, una tras otra, las notificaciones de resultados IELTS de Paola
(Listening, Reading, Writing, Speaking y, como clímax, Overall Band). Detrás, un flujo secundario
de resultados de otros estudiantes (solo nombre) comunica volumen.

Exportación lista: `export/aci-video-01.mp4` (H.264).

## Qué editar

| Archivo | Qué editar |
| --- | --- |
| `index.html` | Busca `EDITAR`: hook, antetítulo, titular de apertura, claim, notificaciones (nombre, sección, puntaje), nombres del flujo secundario, diferenciales, CTA, logo |
| `styles.css` | Colores y medidas en `:root` |
| `script.js` | Tiempos en `T` (`notifs` = llegada de cada notificación); alturas de notificación en `NOTIF_H` |
| `assets/logos/` | `logo-aci-blanco.png` (oficial) e `isotipo-aci-blanco.png` (recorte del mismo; se usa como ícono de la app en las notificaciones, ruta en `styles.css` · `.app-icon::after`) |

Los nombres del flujo secundario son de ejemplo: reemplázalos por nombres reales de estudiantes (sin apellido).
Si cambias `T.end`, cambia también `data-duration` en `#root`.

## Guion

| Tiempo | Momento |
| --- | --- |
| 0:00–0:02 | Hook grande desde el primer fotograma: "ANTES DE PRESENTAR / IELTS, TOEFL O PTE, / MIRA ESTO." (cápsula roja) |
| 0:02 | El hook se reduce a antetítulo y entra "No son palabras. / Son resultados."; entra el celular |
| 0:03 | 94% de efectividad y +2.000 certificados (conteo), garantía y tutor: fijos bajo el celular hasta el final |
| 0:05–0:11 | Notificaciones de Paola, cada vez más seguidas; flujo secundario de resultados detrás |
| 0:10–0:11 | Overall Band 7.0: clímax con borde rojo, anillo, destello y vibración |
| 0:12–0:14 | Titular y antetítulo cambian a "RESULTADOS REALES. NO PROMESAS."; pulso de refuerzo de las cifras a los 14 s |
| 0:17–0:19.5 | CTA rojo con pulse y flecha |

## Exportar

```bash
cd video-01-notificaciones-resultados
npx hyperframes@0.8.97 check
npx hyperframes@0.8.97 render --quality delivery --fps 30 --output export/aci-video-01.mp4
```
Requiere Node 22+ y FFmpeg. Alternativa: abrir `index.html` en Chrome (agrega `?fit`) y grabar la pantalla.
