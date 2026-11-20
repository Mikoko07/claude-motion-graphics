# ACI · Video 4 — Black Days (30 s)

Reel vertical **1080×1920 · 30 s · 30 fps** a partir del material fuente (`assets/video/fuente.mp4`),
con motion graphics de marca ACI, locución en español colombiano, música y efectos.

## Guion

| Tiempo | Imagen | Texto en pantalla | Locución |
| --- | --- | --- | --- |
| 0:00–0:03 | Persona frente al portátil (+ destacado "Requisito: certificado de inglés") | ESA MAESTRÍA. | "Esa maestría." |
| 0:03–0:06 | Persona preparando entrevista con webcam | ESE TRABAJO. | "Ese trabajo." |
| 0:06–0:09 | Fotos y notas de vivir afuera | ESE PROYECTO DE VIVIR AFUERA. | "Ese proyecto de vivir afuera." |
| 0:09–0:12 | Tríptico con las tres historias | ¿QUÉ EXAMEN TE ACERCA A TU META? · IELTS · TOEFL · PTE · MET | "¿Qué examen te acerca a tu meta?" |
| 0:12–0:15 | Cuaderno + línea gráfica | TU META → TU EXAMEN → TU PREPARACIÓN · SISTEMA DE INGENIERÍA DE PUNTAJE ACI | "Descúbrelo con Ingeniería de Puntaje ACI." |
| 0:15–0:22 | Clase online con docente y microgrupo | 94% DE EFECTIVIDAD · MICROGRUPOS DE MÁXIMO 4 ESTUDIANTES · SI NO PASAS, REPITES GRATIS* + pie legal | "94% de efectividad. Microgrupos de máximo cuatro estudiantes. Y si no pasas, repites gratis." |
| 0:22–0:27 | Barrido rojo → oferta | BLACK DAYS · 15% DE DESCUENTO · EN TU PREPARACIÓN PARA EXÁMENES INTERNACIONALES · DEL 20 AL 27 DE NOVIEMBRE | "Black Days: 15% de descuento en tu preparación, del 20 al 27 de noviembre." |
| 0:27–0:30 | Oferta visible + logo + botón | SOLICITA TU DIAGNÓSTICO ESTRATÉGICO GRATUITO | "Solicita tu diagnóstico estratégico gratuito." |

## Audio

- Locución: voz colombiana (ElevenLabs vía Magnific), una frase por archivo en `assets/audio/raw/vo1..vo8.mp3`.
- Música instrumental de 30 s (`raw/music.mp3`) que crece hacia el final; efectos `raw/sfx_*.mp3`.
- `./mezclar_audio.sh` recorta silencios, ajusta la velocidad de las frases largas (sin cambiar el tono) para que quepan en su espacio, coloca cada frase a su tiempo, baja la música cuando habla la voz (ducking),
  suma los efectos y genera `assets/audio/mezcla.mp3`. Los tiempos se editan al inicio del script.

## Editar y exportar

- Textos: `index.html` (comentarios `EDITAR`). Tiempos: `script.js` (objeto `T`). Colores: `styles.css`.
- Escenas del material: atributos `data-media-start` / `data-duration` de cada `<video>`.

```bash
./mezclar_audio.sh
npx hyperframes@0.8.97 check
npx hyperframes@0.8.97 render --quality delivery --fps 30 --output export/aci-video-04-black-days.mp4
```
