// 本機預覽用的小型靜態伺服器，不需要安裝任何套件。
// 用法：node tools/serve.mjs [port]   （預設 4173，只聽本機）
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const port = Number(process.argv[2]) || 4173;
const types = {
  ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8", ".mjs": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8", ".svg": "image/svg+xml",
  ".png": "image/png", ".jpg": "image/jpeg", ".webp": "image/webp", ".ico": "image/x-icon",
};

http.createServer((req, res) => {
  let rel;
  try { rel = decodeURIComponent(new URL(req.url, "http://localhost").pathname); }
  catch { res.writeHead(400).end("Bad request"); return; }

  let file = path.join(root, rel);
  // 不允許跳出專案資料夾
  if (file !== root && !file.startsWith(root + path.sep)) { res.writeHead(403).end("Forbidden"); return; }

  fs.stat(file, (err, st) => {
    if (!err && st.isDirectory()) {
      if (!rel.endsWith("/")) { res.writeHead(301, { Location: rel + "/" }).end(); return; }
      file = path.join(file, "index.html");
    }
    fs.readFile(file, (err2, data) => {
      if (err2) { res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" }).end("找不到這個頁面"); return; }
      res.writeHead(200, {
        "Content-Type": types[path.extname(file).toLowerCase()] || "application/octet-stream",
        "Cache-Control": "no-store",
      }).end(data);
    });
  });
}).listen(port, "127.0.0.1", () => console.log(`http://localhost:${port}/`));
