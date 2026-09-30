# ACI · Video 2 — "ACI 3 - IELTS 0"

Reel vertical **1080×1920 · 19.5 s · 30 fps** para Alianza Colombo Inglesa.
Metáfora de marcador deportivo nocturno: cada gol de ACI es un estudiante con resultado real.

Exportación lista: `export/aci-video-02.mp4` (H.264).

## Archivos

| Archivo | Qué editar |
| --- | --- |
| `index.html` | Textos (busca `EDITAR`): marcador, subtítulo, filas (nombre + puntaje), beneficios, claim, CTA, ruta del logo |
| `styles.css` | Colores de marca y medidas en `:root` (incluye el fondo LED `--panel`) |
| `script.js` | Tiempos en el objeto `T`: `goals` (cuándo ACI suma), `rows` (cuándo entra cada estudiante) |
| `assets/logos/` | `logo-aci-blanco.png` (archivo oficial), `isotipo-aci-blanco.png` (recorte del mismo). `logo-aci-color.png` reservado |

Si cambias `T.end`, cambia también `data-duration` en `#root`. Cada puntaje aparece dos veces en su fila
(`.score` y `.score-glow`, que es el resplandor): edita ambos.

## Guion de animación

| Tiempo | Momento |
| --- | --- |
| 0:00–0:02 | Estadio nocturno, torres de luces, barrido de haces desde los laterales, diagonales rojo/azul cielo, logo |
| 0:02–0:04 | Marcador "ACI 0 - IELTS 0" con flip; gol: cambia a "ACI 1" con flash de luces y punch de cámara |
| 0:04–0:07 | Entra el tablero LED; Paola Mora, 6.5 se enciende en rojo con parpadeo LED, "Resultado real." |
| 0:07–0:10 | Gol "ACI 2"; Gustavo Reyes, 7.0 |
| 0:10–0:13 | Gol "ACI 3"; Gazán Quintero, 7.0 |
| 0:13–0:15 | Marcador completo, subtítulo "Resultados reales. No promesas.", resplandor en secuencia |
| 0:15–0:17 | Beneficios con íconos (stagger) |
| 0:17–0:19.5 | Claim "Si no pasas, repites gratis" y CTA rojo con pulse y flecha; cierre con marcador y logo visibles |

## Previsualizar y exportar

```bash
cd video-02-aci-3-ielts-0
npx hyperframes@0.8.97 check
npx hyperframes@0.8.97 preview
npx hyperframes@0.8.97 render --quality delivery --fps 30 --output export/aci-video-02.mp4
```

Requiere Node 22+ y FFmpeg. Alternativa: abrir `index.html` en Chrome (agrega `?fit` para ajustar a la ventana) y grabar.
