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
