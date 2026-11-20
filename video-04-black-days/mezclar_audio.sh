#!/usr/bin/env bash
# ============================================================================
# ACI · VIDEO 4 · Mezcla de audio (locución + música + efectos) -> assets/audio/mezcla.mp3
#
# Entradas en assets/audio/raw/ (generadas en Magnific):
#   vo1.mp3 … vo8.mp3     locución (voz colombiana), una frase por archivo
#   music.mp3             música instrumental de 30 s
#   sfx_whoosh.mp3        transición
#   sfx_reveal.mp3        aparición de la oferta
#   sfx_pop.mp3           aparición del botón
#
# EDITAR TIEMPOS (segundos) si cambias la línea de tiempo en script.js.
# La música se baja automáticamente cuando habla la voz (ducking).
# ============================================================================
set -euo pipefail
cd "$(dirname "$0")/assets/audio"
R=raw

VO_T=(0.25 3.05 6.35 9.25 12.15 15.20 22.30 27.30)   # inicio de cada frase de locución
VO_TRIM=(0.19 0 0 0.22 0 0 0 0)                      # silencio inicial a recortar de cada toma (s)
VO_TEMPO=(1 1 1 1 1 1.05 1.12 1.07)                  # velocidad (sin cambiar el tono) para que cada frase quepa en su espacio
WHOOSH_T=(2.88 6.18 8.95 11.95 14.95)                # transiciones
REVEAL_T=21.75                                       # cambio a la oferta
POP_T=27.15                                          # botón

ms() { awk -v s="$1" 'BEGIN{printf "%d", s*1000}'; }

inputs=(-i "$R/music.mp3")
for i in 1 2 3 4 5 6 7 8; do inputs+=(-i "$R/vo$i.mp3"); done
for t in "${WHOOSH_T[@]}"; do inputs+=(-i "$R/sfx_whoosh.mp3"); done
inputs+=(-i "$R/sfx_reveal.mp3" -i "$R/sfx_pop.mp3")

f=""
# Locución: cada frase a su tiempo, normalizada
vo_labels=""
for i in 0 1 2 3 4 5 6 7; do
  d=$(ms "${VO_T[$i]}")
  f+="[$((i+1)):a]atrim=start=${VO_TRIM[$i]},asetpts=PTS-STARTPTS,atempo=${VO_TEMPO[$i]},aresample=48000,aformat=channel_layouts=stereo,volume=1.6,adelay=${d}|${d}[vo$i];"
  vo_labels+="[vo$i]"
done
f+="${vo_labels}amix=inputs=8:normalize=0,apad=whole_dur=30[vo];[vo]asplit=2[vomix][vokey];"

# Efectos
n=9; sfx_labels=""
for j in "${!WHOOSH_T[@]}"; do
  d=$(ms "${WHOOSH_T[$j]}")
  f+="[$n:a]aresample=48000,aformat=channel_layouts=stereo,volume=0.35,adelay=${d}|${d}[w$j];"; sfx_labels+="[w$j]"; n=$((n+1))
done
d=$(ms "$REVEAL_T"); f+="[$n:a]aresample=48000,aformat=channel_layouts=stereo,volume=0.55,adelay=${d}|${d}[rv];"; sfx_labels+="[rv]"; n=$((n+1))
d=$(ms "$POP_T");    f+="[$n:a]aresample=48000,aformat=channel_layouts=stereo,volume=0.4,adelay=${d}|${d}[pp];";  sfx_labels+="[pp]"
f+="${sfx_labels}amix=inputs=$(( ${#WHOOSH_T[@]} + 2 )):normalize=0[sfx];"

# Música: 30 s, fade final, ducking con la voz
f+="[0:a]aresample=48000,aformat=channel_layouts=stereo,atrim=0:30,volume=0.55,afade=t=out:st=28.6:d=1.4[mus];"
f+="[mus][vokey]sidechaincompress=threshold=0.03:ratio=6:attack=20:release=350[duck];"

# Mezcla final + limitador
f+="[duck][vomix][sfx]amix=inputs=3:normalize=0,alimiter=limit=0.95,atrim=0:30[out]"

ffmpeg -y -v error "${inputs[@]}" -filter_complex "$f" -map "[out]" -ar 48000 -ac 2 -b:a 192k mezcla.mp3
echo "OK -> assets/audio/mezcla.mp3"
