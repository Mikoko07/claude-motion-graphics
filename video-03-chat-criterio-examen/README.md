# ACI · Video 3 — "No necesitas estudiar más. Necesitas responder mejor."

Reel vertical **1080×1920 · 18 s · 30 fps** para Alianza Colombo Inglesa.
Conversación de chat en un celular: el usuario (globos a la derecha) expresa su frustración y el
contacto "IELTS Writing" (globos a la izquierda) revela el insight. Cierra con el bloque comercial de ACI.

Exportación lista: `export/aci-video-03.mp4` (H.264).

## Qué editar

| Archivo | Qué editar |
| --- | --- |
| `index.html` | Busca `EDITAR`: nombre del contacto, avatar, textos de los mensajes, bloque rojo, líneas de apoyo, CTA, logo |
| `script.js` | Tiempos en `T` (`out` = mensajes enviados, `typing1/typing2` = "escribiendo…", `m4`, `m5` = remate) |
| `styles.css` | Colores y medidas en `:root` (`--bubble-out` = globo enviado, `--chat-bg` = fondo del chat) |
| `assets/logos/` | `logo-aci-blanco.png` (oficial) |

Si cambias `T.end`, cambia también `data-duration` en `#root`.

## Guion

| Tiempo | Momento |
| --- | --- |
| 0:00–0:02 | Fondo, logo y entrada del celular (fade + scale) |
| 0:02–0:04 | Encabezado "IELTS Writing · en línea" (avatar, punto activo), etiqueta "Hoy" |
| 0:04–0:07 | Tres mensajes enviados en ritmo ágil; vibración y destello de acentos azul cielo en cada uno |
| 0:07,6–0:09 | "escribiendo…" en el encabezado y burbuja de puntos |
| 0:09 | "Sí. Ese es el error." |
| 0:10–0:11 | Segundo "escribiendo…" |
| 0:11–0:13 | Remate en globo azul oscuro: "No necesitas estudiar más. / Necesitas responder mejor." (anillo y pulso) |
| 0:13–0:15 | Bloque rojo "EN ACI TE ENSEÑAMOS A RESPONDER / CON CRITERIO DE EXAMEN." sube desde abajo |
| 0:15–0:16 | "IELTS · TOEFL · PTE" y "94% efectividad · Tutor personalizado." |
| 0:16,5–0:18 | CTA rojo con pulse y flecha |

## Exportar

```bash
cd video-03-chat-criterio-examen
npx hyperframes@0.8.97 check
npx hyperframes@0.8.97 render --quality delivery --fps 30 --output export/aci-video-03.mp4
```
Requiere Node 22+ y FFmpeg. Alternativa: abrir `index.html` en Chrome (agrega `?fit`) y grabar la pantalla.
