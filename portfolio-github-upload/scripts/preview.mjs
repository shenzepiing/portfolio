import { createServer, get } from "node:http";
import { once } from "node:events";
import { spawn } from "node:child_process";

const host = "127.0.0.1";
const listenHost = "0.0.0.0";
const firstPort = 3000;
const lastPort = 3100;

function canListen(port) {
  return new Promise((resolve) => {
    const server = createServer();
    server.once("error", () => resolve(false));
    // vinext binds to all interfaces; probe the same address to avoid treating
    // an existing 0.0.0.0 listener as a free 127.0.0.1 port.
    server.listen(port, listenHost, () => server.close(() => resolve(true)));
  });
}

async function findFreePort() {
  for (let port = firstPort; port <= lastPort; port += 1) {
    if (await canListen(port)) return port;
  }
  throw new Error(`No free preview port found between ${firstPort} and ${lastPort}.`);
}

function waitForHttp(url, timeoutMs = 30_000) {
  const deadline = Date.now() + timeoutMs;
  return new Promise((resolve, reject) => {
    const poll = () => {
      const request = get(url, (response) => {
        response.resume();
        if (response.statusCode && response.statusCode < 500) return resolve(response.statusCode);
        retry();
      });
      request.on("error", retry);
      request.setTimeout(1_000, () => request.destroy());
    };
    const retry = () => {
      if (Date.now() >= deadline) return reject(new Error(`Preview did not become reachable: ${url}`));
      setTimeout(poll, 250);
    };
    poll();
  });
}

const port = await findFreePort();
const url = `http://${host}:${port}/`;
const command = process.platform === "win32" ? "npm.cmd" : "npm";
const preview = spawn(command, ["run", "start", "--", "--port", String(port)], {
  stdio: "inherit",
});

const stop = (signal) => {
  preview.kill(signal);
  process.exit(0);
};
process.once("SIGINT", () => stop("SIGINT"));
process.once("SIGTERM", () => stop("SIGTERM"));

try {
  const status = await waitForHttp(url);
  console.log(`\nPreview ready (${status}): ${url}`);
  await once(preview, "exit");
} catch (error) {
  preview.kill("SIGTERM");
  throw error;
}
