import assert from "node:assert/strict";
import test from "node:test";

const introScroll = await import("../src/utils/introScroll.js").catch(() => ({}));

test("large wheel deltas advance only one intro scene", () => {
  assert.equal(typeof introScroll.getNextIntroIndex, "function");
  assert.equal(introScroll.getNextIntroIndex(0, 2600, 5), 1);
  assert.equal(introScroll.getNextIntroIndex(1, 2600, 5), 2);
  assert.equal(introScroll.getNextIntroIndex(4, 2600, 5), 5);
  assert.equal(introScroll.getNextIntroIndex(5, 2600, 5), 5);
});

test("large upward wheel deltas move back only one intro scene", () => {
  assert.equal(typeof introScroll.getNextIntroIndex, "function");
  assert.equal(introScroll.getNextIntroIndex(4, -2600, 5), 3);
  assert.equal(introScroll.getNextIntroIndex(5, -2600, 5), 4);
  assert.equal(introScroll.getNextIntroIndex(0, -2600, 5), 0);
});
