import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the portfolio home page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Zeping Shen<\/title>/i);
  assert.match(html, /WELCOME[\s\S]*TO MY[\s\S]*PORTFOLIO/);
  assert.match(html, /AI探索与学习/);
  assert.match(html, /申泽平的个人照片/);
});

test("keeps the preview workflow and direct local image delivery configured", async () => {
  const [page, layout, packageJson, previewScript, visualCheck] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
    readFile(new URL("../scripts/preview.mjs", import.meta.url), "utf8"),
    readFile(new URL("../docs/visual-check.md", import.meta.url), "utf8"),
  ]);

  assert.match(page, /<img src="\/about-portrait\.jpg"/);
  assert.match(page, /loading="lazy" decoding="async"/);
  assert.match(layout, /title:\s*"Zeping Shen"/);
  assert.match(packageJson, /"preview": "npm run build && node scripts\/preview\.mjs"/);
  assert.match(previewScript, /findFreePort/);
  assert.match(previewScript, /waitForHttp/);
  assert.match(visualCheck, /1440 × 900/);
  assert.match(visualCheck, /390 × 844/);
});
