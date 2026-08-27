import assert from "node:assert/strict";
import test from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { createServer } from "vite";

test("the landing page opens on the restored hero", async () => {
  const vite = await createServer({ server: { middlewareMode: true }, appType: "custom" });

  try {
    const { default: App } = await vite.ssrLoadModule("/src/App.jsx");
    const markup = renderToStaticMarkup(createElement(App));
    const appMarkup = markup.replace(/^(?:<link[^>]+>)+/, "");

    assert.match(appMarkup, /^<a class="skip-link" href="#main-content">Skip to content<\/a><header class="hero" id="top">/);
    assert.doesNotMatch(appMarkup, /scroll-intro/);
    assert.equal((appMarkup.match(/class="hero__frame"/g) || []).length, 4);
    assert.match(appMarkup, /Freelance delivery/);
    assert.match(appMarkup, /Digital human production/);
  } finally {
    await vite.close();
  }
});
