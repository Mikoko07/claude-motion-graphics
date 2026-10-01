# ACI · Video 3 — "No necesitas estudiar más. Necesitas responder mejor."

Reel vertical **1080×1920 · 18 s · 30 fps** para Alianza Colombo Inglesa.
Conversación de chat en un celular: el contacto "IELTS Writing" (globos a la izquierda) abre con
"¿Otra vez no aprobaste el examen?", el usuario (globo a la derecha, escrito en la barra antes de enviarse)
responde con su frustración y el contacto revela el insight. Sin etiquetas de quién habla. Cierra con el bloque comercial de ACI.

Exportación lista: `export/aci-video-03.mp4` (H.264).

## Qué editar

| Archivo | Qué editar |
| --- | --- |
| `index.html` | Busca `EDITAR`: nombre del contacto, avatar, textos de los mensajes, bloque rojo, líneas de apoyo, CTA, logo |
| `script.js` | Tiempos en `T` (`typing1/2/3` = "escribiendo…", `m1`…`m4` = mensajes, `compose` = tecleo en la barra, `m4` = remate) |
| `styles.css` | Colores y medidas en `:root` (`--bubble-out` = globo enviado, `--chat-bg` = fondo del chat) |
| `assets/logos/` | `logo-aci-blanco.png` (oficial) |

Si cambias `T.end`, cambia también `data-duration` en `#root`.

## Guion

| Tiempo | Momento |
| --- | --- |
| 0:00–0:02 | Fondo, logo y entrada del celular (fade + scale) |
| 0:02–0:03 | Encabezado "IELTS Writing · en línea" (avatar, punto activo), etiqueta "Hoy" |
| 0:03–0:04 | "escribiendo…" y luego "¿Otra vez no aprobaste el examen?" (izquierda) |
| 0:05–0:06 | El usuario teclea en la barra y envía: "Pero yo sí sé inglés. / Ya no sé qué estudiar más." (derecha) |
| 0:07–0:08 | "escribiendo…" y "Sí. Ese es el error." |
| 0:09–0:12 | "escribiendo…" y remate en globo azul oscuro: "No necesitas estudiar más. / Necesitas responder mejor." (anillo y pulso) |
| 0:12,8–0:15 | Bloque rojo "EN ACI TE ENSEÑAMOS A RESPONDER / CON CRITERIO DE EXAMEN." sube desde abajo |
| 0:14,8–0:16 | "IELTS · TOEFL · PTE" y "94% efectividad · Tutor personalizado." |
| 0:16,4–0:18 | CTA rojo con pulse y flecha |

## Exportar

```bash
cd video-03-chat-criterio-examen
npx hyperframes@0.8.97 check
npx hyperframes@0.8.97 render --quality delivery --fps 30 --output export/aci-video-03.mp4
```
Requiere Node 22+ y FFmpeg. Alternativa: abrir `index.html` en Chrome (agrega `?fit`) y grabar la pantalla.
