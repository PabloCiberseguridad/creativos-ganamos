// Uso: npm run placas -- props/placa-servicio24hs.json
// Genera las 3 placas (1:1, 4:5 y 9:16) en la carpeta salida/.
import { execFileSync } from "node:child_process";
import { basename } from "node:path";

const props = process.argv[2] ?? "props/placa-servicio24hs.json";
const nombre = basename(props, ".json").replace(/^placa-/, "");
for (const [id, fmt] of [["Placa-1x1", "1x1"], ["Placa-4x5", "4x5"], ["Placa-9x16", "9x16"]]) {
  const out = `salida/${nombre}_${fmt}_v1.png`;
  execFileSync("npx", ["remotion", "still", id, out, `--props=${props}`], { stdio: "inherit" });
}
