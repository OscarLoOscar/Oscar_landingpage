import assert from "node:assert/strict";
import test from "node:test";

const sequence = await import("../src/utils/introSequence.js").catch(() => ({}));

test("progress maps to a clamped frame", () => {
  assert.equal(sequence.progressToFrame(-1, 181), 0);
  assert.equal(sequence.progressToFrame(0, 181), 0);
  assert.equal(sequence.progressToFrame(0.25, 181), 45);
  assert.equal(sequence.progressToFrame(0.5, 181), 90);
  assert.equal(sequence.progressToFrame(1, 181), 180);
  assert.equal(sequence.progressToFrame(2, 181), 180);
});

test("scene changes only when an anchor is reached", () => {
  const anchors = [0, 45, 90, 135, 180];
  assert.equal(sequence.frameToScene(0, anchors), 0);
  assert.equal(sequence.frameToScene(44, anchors), 0);
  assert.equal(sequence.frameToScene(45, anchors), 1);
  assert.equal(sequence.frameToScene(134, anchors), 2);
  assert.equal(sequence.frameToScene(135, anchors), 3);
  assert.equal(sequence.frameToScene(179, anchors), 3);
  assert.equal(sequence.frameToScene(180, anchors), 4);
});

test("frame paths are zero padded", () => {
  assert.equal(sequence.framePath(0), "assets/images/intro-sequence/frames/frame-000.webp");
  assert.equal(sequence.framePath(180), "assets/images/intro-sequence/frames/frame-180.webp");
});

test("frame maps to the same relative scroll offset after resize", () => {
  assert.equal(sequence.frameToScrollOffset(-1, 3376, 181), 0);
  assert.equal(sequence.frameToScrollOffset(72, 3376, 181), 1350.4);
  assert.equal(sequence.frameToScrollOffset(180, 3376, 181), 3376);
  assert.equal(sequence.frameToScrollOffset(181, 3376, 181), 3376);
});

test("intro visibility excludes sections completely outside the viewport", () => {
  assert.equal(sequence.isIntroVisible({ top: -500, bottom: 0 }, 800), false);
  assert.equal(sequence.isIntroVisible({ top: 800, bottom: 1300 }, 800), false);
  assert.equal(sequence.isIntroVisible({ top: -500, bottom: 1 }, 800), true);
  assert.equal(sequence.isIntroVisible({ top: 799, bottom: 1300 }, 800), true);
});

test("cover rectangle crops a square image into a wide canvas", () => {
  assert.deepEqual(sequence.coverRect(512, 512, 1200, 675), {
    sx: 0,
    sy: 112,
    sw: 512,
    sh: 288,
    dx: 0,
    dy: 0,
    dw: 1200,
    dh: 675,
  });
});

test("scroll progress resolves to a transition and local scrub progress", () => {
  assert.deepEqual(sequence.progressToIntroSegment(-1, 4), {
    segmentIndex: 0,
    localProgress: 0,
    sceneIndex: 0,
  });
  assert.deepEqual(sequence.progressToIntroSegment(0.125, 4), {
    segmentIndex: 0,
    localProgress: 0.5,
    sceneIndex: 0,
  });
  assert.deepEqual(sequence.progressToIntroSegment(0.25, 4), {
    segmentIndex: 1,
    localProgress: 0,
    sceneIndex: 1,
  });
  assert.deepEqual(sequence.progressToIntroSegment(0.875, 4), {
    segmentIndex: 3,
    localProgress: 0.5,
    sceneIndex: 3,
  });
  assert.deepEqual(sequence.progressToIntroSegment(1, 4), {
    segmentIndex: 3,
    localProgress: 1,
    sceneIndex: 4,
  });
});

test("strict-mode ref cleanup ignores unmounted video elements", () => {
  const first = { id: "first" };
  const second = { id: "second" };
  assert.deepEqual(sequence.getMountedMediaElements([first, null, second]), [
    first,
    second,
  ]);
});

test("inactive transition videos stay pinned to their nearest anchor", () => {
  assert.equal(sequence.getMediaProgress(1, 0.4, 0), 1);
  assert.equal(sequence.getMediaProgress(1, 0.4, 1), 0.4);
  assert.equal(sequence.getMediaProgress(1, 0.4, 2), 0);
});
