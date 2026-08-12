#!/usr/bin/env bash

set -euo pipefail

repo_root=$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)
fixture_root=$(mktemp -d "${TMPDIR:-/tmp}/intro-sequence-rollback.XXXXXX")
fixture_sequence="$fixture_root/assets/images/intro-sequence"

cleanup() {
  rm -rf "$fixture_root"
}
trap cleanup EXIT

mkdir -p "$fixture_root/scripts" "$fixture_root/assets/images/intro-scenes" "$fixture_sequence/keyframes" "$fixture_sequence/frames"
cp "$repo_root/scripts/build-intro-sequence.sh" "$fixture_root/scripts/"

for source in \
  scene-05-cafe.avif \
  scene-03-office.avif \
  scene-02-estate.avif \
  scene-01-city.avif; do
  cp "$repo_root/assets/images/intro-scenes/$source" "$fixture_root/assets/images/intro-scenes/"
done
for source in \
  scene-04-room-night.webp \
  cafe-room-01.webp \
  cafe-room-02.webp \
  room-office-01.webp \
  room-office-02.webp \
  office-estate-01.webp \
  office-estate-02.webp \
  estate-city-01.webp \
  estate-city-02.webp; do
  cp "$repo_root/assets/images/intro-sequence/keyframes/$source" "$fixture_sequence/keyframes/"
done

printf 'prior frames sentinel\n' > "$fixture_sequence/frames/sentinel.txt"
printf 'prior preview sentinel\n' > "$fixture_sequence/preview.mp4"

if INTRO_SEQUENCE_FAILPOINT=after-frames-replacement bash "$fixture_root/scripts/build-intro-sequence.sh"; then
  printf 'Expected injected failure, but generator succeeded.\n' >&2
  exit 1
fi

grep -Fx 'prior frames sentinel' "$fixture_sequence/frames/sentinel.txt" >/dev/null
grep -Fx 'prior preview sentinel' "$fixture_sequence/preview.mp4" >/dev/null
if find "$fixture_sequence/frames" -type f -name 'frame-*.webp' | grep -q .; then
  printf 'Partial generated frames were left behind after rollback.\n' >&2
  exit 1
fi
if find "$fixture_sequence" -maxdepth 1 \( -name '.build-intro-sequence.*' -o -name '.frames.backup.*' -o -name '.preview.backup.*' \) | grep -q .; then
  printf 'Rollback staging artifacts were left behind.\n' >&2
  exit 1
fi

printf 'rollback test passed\n'
