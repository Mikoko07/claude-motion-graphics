# ACI · Video 5 · Black Days (horizontal 16:9)

Adaptación 1920x1080 del Video 4 (vertical). Mismo guion, mismos tiempos y la misma mezcla de audio
(locución + música + efectos: `assets/audio/mezcla.mp3`).

## Layout
- 0:00–0:09 y 0:12–0:22: material vertical en un panel a la izquierda, sobre la misma escena desenfocada; textos a la derecha.
- 0:09–0:12: tríptico a pantalla completa (3 columnas de 640 px) con la pregunta abajo.
- 0:22–0:30: oferta a dos columnas (BLACK DAYS / 15% a la izquierda; fechas y CTA a la derecha), logo arriba al centro.

## Editar
- Textos: `index.html` (comentarios "EDITAR").
- Posiciones y tamaños: `styles.css` (variables en `:root`: panel y columna de textos).
- Tiempos: `script.js` (objeto `T`). Si cambian, regenera el audio con `video-04-black-days/mezclar_audio.sh` y cópialo aquí.

## Exportar
```
npx hyperframes render --quality delivery --fps 30 --output export/aci-video-05-black-days-horizontal.mp4
```
