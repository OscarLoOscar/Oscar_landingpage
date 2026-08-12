#!/usr/bin/env bash

set -euo pipefail

repo_root=$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)
sequence_dir="$repo_root/assets/images/intro-sequence"
keyframe_dir="$sequence_dir/keyframes"
scene_dir="$repo_root/assets/images/intro-scenes"
output_dir="$sequence_dir/frames"
preview_path="$sequence_dir/preview.mp4"
stage_root=$(mktemp -d "$sequence_dir/.build-intro-sequence.XXXXXX")
stage_frames="$stage_root/frames"
raw_dir="$stage_root/raw"
stage_preview="$stage_root/preview.mp4"
backup_frames="$sequence_dir/.frames.backup.$$"
backup_preview="$sequence_dir/.preview.backup.$$"
had_previous_frames=0
had_previous_preview=0
frames_replaced=0
preview_replaced=0

cleanup() {
  status=$?
  if (( status != 0 )); then
    if (( frames_replaced )); then
      rm -rf "$output_dir"
    fi
    if (( had_previous_frames )) && test -d "$backup_frames"; then
      mv "$backup_frames" "$output_dir"
    fi
    if (( preview_replaced )); then
      rm -f "$preview_path"
    fi
    if (( had_previous_preview )) && test -f "$backup_preview"; then
      mv "$backup_preview" "$preview_path"
    fi
  fi
  rm -rf "$stage_root" "$backup_frames" "$backup_preview"
  exit "$status"
}
trap cleanup EXIT

anchors=(
  "$scene_dir/scene-05-cafe.avif"
  "$keyframe_dir/scene-04-room-night.webp"
  "$scene_dir/scene-03-office.avif"
  "$scene_dir/scene-02-estate.avif"
  "$scene_dir/scene-01-city.avif"
)
bridges=(
  "$keyframe_dir/cafe-room-01.webp"
  "$keyframe_dir/cafe-room-02.webp"
  "$keyframe_dir/room-office-01.webp"
  "$keyframe_dir/room-office-02.webp"
  "$keyframe_dir/office-estate-01.webp"
  "$keyframe_dir/office-estate-02.webp"
  "$keyframe_dir/estate-city-01.webp"
  "$keyframe_dir/estate-city-02.webp"
)
inputs=("${anchors[@]}" "${bridges[@]}")

test "${#inputs[@]}" = "13"
for input_path in "${inputs[@]}"; do
  test -f "$input_path"
  ffprobe -v error -select_streams v:0 -show_entries stream=codec_type -of csv=p=0 "$input_path" | grep -Fx "video" >/dev/null
  ffmpeg -v error -i "$input_path" -frames:v 1 -f null -
done

mkdir -p "$stage_frames" "$raw_dir"

decode_source() {
  local input_path=$1
  local output_path=$2
  ffmpeg -v error -y -i "$input_path" -frames:v 1 -sws_flags lanczos -s 512x512 "$output_path"
}

for anchor_index in 0 1 2 3 4; do
  decode_source "${anchors[$anchor_index]}" "$raw_dir/anchor-$anchor_index.png"
done
for bridge_index in 0 1 2 3 4 5 6 7; do
  decode_source "${bridges[$bridge_index]}" "$raw_dir/bridge-$bridge_index.png"
done
for rendered_source in "$raw_dir"/*.png; do
  dimensions=$(ffprobe -v error -select_streams v:0 -show_entries stream=width,height -of csv=s=x:p=0 "$rendered_source")
  test "$dimensions" = "512x512"
done

render_intermediates() {
  local from_path=$1
  local to_path=$2
  local first_frame=$3

  ffmpeg -v error -y \
    -loop 1 -framerate 15 -i "$from_path" \
    -loop 1 -framerate 15 -i "$to_path" \
    -filter_complex "[0:v][1:v]blend=all_expr='A*(1-N/15)+B*N/15':shortest=1,trim=start_frame=1:end_frame=15,setpts=PTS-STARTPTS" \
    -frames:v 14 -start_number "$first_frame" "$raw_dir/frame-%03d.png"
}

for span in 0 1 2 3; do
  base=$((span * 45))
  first_bridge=$((span * 2))
  second_bridge=$((first_bridge + 1))

  render_intermediates "$raw_dir/anchor-$span.png" "$raw_dir/bridge-$first_bridge.png" "$((base + 1))"
  render_intermediates "$raw_dir/bridge-$first_bridge.png" "$raw_dir/bridge-$second_bridge.png" "$((base + 16))"
  render_intermediates "$raw_dir/bridge-$second_bridge.png" "$raw_dir/anchor-$((span + 1)).png" "$((base + 31))"
done

python3 - "$raw_dir" "$stage_frames" <<'PY'
from pathlib import Path
import sys

from PIL import Image

raw_dir = Path(sys.argv[1])
output_dir = Path(sys.argv[2])
landmarks = {
    0: "anchor-0.png", 15: "bridge-0.png", 30: "bridge-1.png", 45: "anchor-1.png",
    60: "bridge-2.png", 75: "bridge-3.png", 90: "anchor-2.png",
    105: "bridge-4.png", 120: "bridge-5.png", 135: "anchor-3.png",
    150: "bridge-6.png", 165: "bridge-7.png", 180: "anchor-4.png",
}
anchor_frames = {0, 45, 90, 135, 180}

for frame in range(181):
    source = raw_dir / landmarks.get(frame, f"frame-{frame:03d}.png")
    if not source.is_file():
        raise SystemExit(f"Missing rendered source for frame {frame}: {source}")
    with Image.open(source) as image:
        image.save(
            output_dir / f"frame-{frame:03d}.webp",
            "WEBP",
            lossless=frame in anchor_frames,
            quality=80,
            method=6,
        )
PY

for anchor_frame in 0 45 90 135 180; do
  source_index=$((anchor_frame / 45))
  ssim_output=$(ffmpeg -v info -i "$raw_dir/anchor-$source_index.png" -i "$stage_frames/frame-$(printf '%03d' "$anchor_frame").webp" -lavfi ssim -f null - 2>&1)
  printf '%s\n' "$ssim_output" | grep -F "All:1.000000" >/dev/null
  printf 'anchor %03d exact\n' "$anchor_frame"
done

ffmpeg -v error -y -framerate 30 \
  -i "$stage_frames/frame-%03d.webp" \
  -c:v libx264 -pix_fmt yuv420p -movflags +faststart \
  "$stage_preview"

test -d "$stage_frames"
test -f "$stage_preview"

if test -e "$output_dir"; then
  mv "$output_dir" "$backup_frames"
  had_previous_frames=1
fi
if test -e "$preview_path"; then
  mv "$preview_path" "$backup_preview"
  had_previous_preview=1
fi
mv "$stage_frames" "$output_dir"
frames_replaced=1
if test "${INTRO_SEQUENCE_FAILPOINT:-}" = "after-frames-replacement"; then
  printf 'Injected failure after frames replacement\n' >&2
  exit 1
fi
mv "$stage_preview" "$preview_path"
preview_replaced=1

frame_count=$(find "$output_dir" -type f -name 'frame-*.webp' | wc -l | tr -d ' ')
test "$frame_count" = "181"
test -f "$output_dir/frame-000.webp"
test -f "$output_dir/frame-045.webp"
test -f "$output_dir/frame-090.webp"
test -f "$output_dir/frame-135.webp"
test -f "$output_dir/frame-180.webp"
rm -rf "$backup_frames" "$backup_preview"

printf '181 frames generated\n'
