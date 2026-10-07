import assert from "node:assert/strict";
import test from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { createServer } from "vite";

test("the landing page links both worlds and retains the introduction", async () => {
  const vite = await createServer({ server: { middlewareMode: true }, appType: "custom" });

  try {
    const { default: App } = await vite.ssrLoadModule("/src/App.jsx");
    const markup = renderToStaticMarkup(createElement(App));
    const appMarkup = markup.replace(/^(?:<link[^>]+>)+/, "");

    assert.match(appMarkup, /^<a class="skip-link" href="#main-content">Skip to content<\/a><header class="hero hero--dual" id="top">/);
    assert.doesNotMatch(appMarkup, /scroll-intro/);
    assert.equal((appMarkup.match(/class="hero__frame"/g) || []).length, 1);
    assert.match(appMarkup, /href="#projects"/);
    assert.match(appMarkup, /href="#courses"/);
    assert.match(appMarkup, /dual-world\/2.png/);
    assert.match(appMarkup, /dual-world\/8.png/);
    assert.match(appMarkup, /dual-world\/10.png/);
    assert.match(appMarkup, /由服務業及團隊管理轉型至軟件工程/);
    assert.match(appMarkup, /Backend-first engineer/);
  } finally {
    await vite.close();
  }
});
