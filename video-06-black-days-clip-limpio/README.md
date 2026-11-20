# ACI · Video 6 · Black Days (clip limpio 16:9)

Base de 30 s en 16:9 (1920x1080, 24 fps) para montar después textos, logo y audio.
El clip original de IA traía el texto quemado en casi todos los fotogramas, así que se regeneró
en Magnific (Seedance 2.5) usando como referencia los únicos fotogramas limpios del original.

| Tiempo | Escena |
|---|---|
| 0:00–0:05 | Estudiante en su escritorio aplicando a la maestría |
| 0:05–0:10 | Joven se prepara para la entrevista de trabajo |
| 0:10–0:15 | Fotos de ciudades y mapa: el proyecto de vivir afuera |
| 0:15–0:20 | Preparación de noche: cuaderno y resaltador |
| 0:20–0:25 | Clase online en microgrupo con docente |
| 0:25–0:30 | Celebración del resultado (espacio libre a la derecha para la oferta) |

## Versión final con texto, logo y audio

`export/aci-video-06-black-days-texto.mp4`: el clip limpio (`assets/video/clip.mp4`) montado con el mismo guion,
tiempos y mezcla de audio del Video 4 (locución + música + efectos). Logo oficial fijo arriba a la derecha todo el video.
El clip base sin texto sigue en `export/aci-video-06-black-days-sin-texto.mp4`.

- Escenas: cada `<video>` de `index.html` toma un tramo del clip (`data-media-start`) para calzar con la locución.
- Textos: `index.html` (EDITAR) · Tiempos: `script.js` (objeto `T`) · Layout: `styles.css`.

```
npx hyperframes render --quality delivery --fps 30 --output export/aci-video-06-black-days-texto.mp4
```
