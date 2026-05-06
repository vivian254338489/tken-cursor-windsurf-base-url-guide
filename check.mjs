import fs from "node:fs";

const required = ["README.md", "LICENSE", "PROMOTION.md", "package.json", "configs/cursor.example.json", "configs/windsurf.example.json", "docs/test-prompts.md", "docs/troubleshooting.md", "check.mjs", ".github/workflows/check.yml"];
const missing = required.filter((file) => !fs.existsSync(file));

if (missing.length) {
  console.error(`Missing files: ${missing.join(", ")}`);
  process.exit(1);
}

for (const config of ["configs/cursor.example.json", "configs/windsurf.example.json"]) {
  const parsed = JSON.parse(fs.readFileSync(config, "utf8"));
  const text = JSON.stringify(parsed);
  if (!text.includes("https://www.tken.shop/v1") || !text.includes("free-model")) {
    console.error(`Invalid config: ${config}`);
    process.exit(1);
  }
}

const readme = fs.readFileSync("README.md", "utf8");
for (const text of ["Cursor", "Windsurf", "https://www.tken.shop/v1"]) {
  if (!readme.includes(text)) {
    console.error(`README missing expected text: ${text}`);
    process.exit(1);
  }
}

console.log(JSON.stringify({ ok: true, checked: required.length }, null, 2));
