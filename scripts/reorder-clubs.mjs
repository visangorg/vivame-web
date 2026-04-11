import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const mainPath = path.join(__dirname, "..", "js", "main.js");
let src = fs.readFileSync(mainPath, "utf8");

const startMarker = "var CLUB_PORTAL_CLUBS = [";
const i0 = src.indexOf(startMarker);
const endReal = src.indexOf("\n];\n\nfunction escapeHtmlText", i0);
if (endReal < 0) {
  console.error("end marker not found");
  process.exit(1);
}

const snippet = src.slice(i0, endReal + 3);
const clubs = new Function(snippet + "\nreturn CLUB_PORTAL_CLUBS;")();

const order = [
  "그립(Grip)",
  "포시즌스",
  "비상턴",
  "모종의 시작",
  "그림책 놀이터",
  "퐁당다이브클럽",
  "팝케팅",
  "Focus on",
  "원모어 (One More)",
  "비상다독",
  "다람지",
  "비상골린이들",
  "온니 플라워",
  "떼구르",
  "AVOCADO",
];

const byName = Object.fromEntries(clubs.map((c) => [c.name, c]));
const missing = order.filter((n) => !byName[n]);
if (missing.length) {
  console.error("Missing names:", missing);
  process.exit(1);
}

const reordered = order.map((n) => byName[n]);

function fmt(obj) {
  const esc = JSON.stringify;
  const d = obj.detail;
  const detailLit =
    "`" +
    String(d).replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$\{/g, "\\${") +
    "`";
  return [
    "  {",
    "    name: " + esc(obj.name) + ",",
    "    tagline: " + esc(obj.tagline) + ",",
    "    summary:",
    "      " + esc(obj.summary) + ",",
    "    detail: " + detailLit + ",",
    "    leaderInfo: " + esc(obj.leaderInfo) + ",",
    "    email: " + esc(obj.email) + ",",
    "    image: " + esc(obj.image) + ",",
    "    badge: " + esc(obj.badge) + ",",
    "  }",
  ].join("\n");
}

const body = reordered.map(fmt).join(",\n");
const out =
  src.slice(0, i0) + "var CLUB_PORTAL_CLUBS = [\n" + body + "\n];" + src.slice(endReal + 3);

fs.writeFileSync(mainPath, out);
console.log("OK", reordered.length, "clubs reordered");
