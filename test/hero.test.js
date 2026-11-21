import assert from "node:assert/strict";
import test from "node:test";
import { existsSync } from "node:fs";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { createServer } from "vite";

test("the portfolio provides clear routes, accurate evidence boundaries and working local targets", async () => {
  const vite = await createServer({
    server: { middlewareMode: true, hmr: false },
    appType: "custom",
  });
  try {
    const { default: App } = await vite.ssrLoadModule("/src/App.jsx");
    const markup = renderToStaticMarkup(createElement(App));
    assert.equal((markup.match(/<h1[ >]/g) || []).length, 1);
    assert.match(markup, /class="money-hero"/);
    assert.doesNotMatch(markup, /site-nav__inner/);
    assert.ok(existsSync("assets/money-gun/hero.js"));
    const ids = [...markup.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]);
    assert.equal(new Set(ids).size, ids.length, "IDs must be unique");
    for (const [, id] of markup.matchAll(/href="#([^"]+)"/g)) {
      assert.ok(ids.includes(id), `Missing anchor target: ${id}`);
    }
    for (const [, src] of markup.matchAll(/src="([^"]+)"/g)) {
      if (src.startsWith("/Oscar_landingpage/")) {
        assert.ok(existsSync(decodeURI(src.replace("/Oscar_landingpage/", ""))), `Missing image: ${src}`);
      }
    }
    const order = ["profile", "projects", "courses", "experience", "about", "faq", "course-contact"];
    for (let i = 1; i < order.length; i++) {
      assert.ok(markup.indexOf(`id="${order[i - 1]}"`) < markup.indexOf(`id="${order[i]}"`));
    }
    assert.match(markup, /https:\/\/www.instagram.com\/innotrendedu\//);
    assert.doesNotMatch(markup, /contact__actions|contact__address|mailto:|wa.me|tel:/);
    assert.match(markup, /InnoTrend Education/);
    assert.match(markup, /個人實作/);
    assert.match(markup, /功能流程示意/);
    assert.match(markup, /並非學員成效或正式系統準確率/);
    assert.match(markup, /BSc \(Hons\) in Computing · Wrexham University/);
    assert.match(markup, /Asana Workflow Specialist/);
    assert.doesNotMatch(markup, /證書預計|2025 年 3 月發出|2026 年 3 月到期|WSET/);
    assert.doesNotMatch(markup, /33,000|1 year|四個月|一年使用|限時|無條件退款/);
    assert.equal((markup.match(/role="tab"/g) || []).length, 6);
    assert.equal((markup.match(/role="tabpanel"/g) || []).length, 6);
    assert.equal((markup.match(/aria-selected="true"/g) || []).length, 1);
    assert.match(markup, /id="corporate-training"/);
    assert.match(markup, /以 36 小時主線展示/);
    assert.match(markup, /primary-04.png/);
    assert.match(markup, /vibe_Coding_04.png/);
  } finally {
    await vite.close();
  }
});
