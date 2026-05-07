import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const textExtensions = new Set([".md", ".json", ".js", ".example", ".gitignore"]);
const ignoreDirs = new Set([".git", "node_modules"]);
const errors = [];
const warnings = [];

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if (ignoreDirs.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walk(full));
    } else if (textExtensions.has(path.extname(entry.name)) || entry.name === "LICENSE") {
      files.push(full);
    }
  }
  return files;
}

function rel(file) {
  return path.relative(root, file).replaceAll(path.sep, "/");
}

function addError(file, message) {
  errors.push(`${rel(file)}: ${message}`);
}

function stripCodeBlocks(text) {
  return text.replace(/```[\s\S]*?```/g, "");
}

function withoutNegatedClaimSentences(text) {
  return text
    .split(/(?<=[.!?])\s+/)
    .filter((sentence) => !/\b(does not|do not|don't|avoid|never)\b/i.test(sentence))
    .join(" ");
}

const files = walk(root);
const markdownFiles = files.filter((file) => path.extname(file) === ".md");

const bannedClaimPatterns = [
  /\b(Cursor|Windsurf)\b[^.\n]*(officially\s+)?supports\s+(all|any|every)\s+OpenAI-compatible\s+providers?/i,
  /\b(all|any|every)\s+OpenAI-compatible\s+providers?\s+work\s+in\s+\b(Cursor|Windsurf)\b/i,
  /\bguaranteed\s+to\s+work\s+in\s+\b(Cursor|Windsurf)\b/i,
  /\bofficial\s+TKEN\s+support\s+in\s+\b(Cursor|Windsurf)\b/i
];

const secretPatterns = [
  { name: "OpenAI-style key", pattern: /\bsk-[A-Za-z0-9_-]{20,}\b/g },
  { name: "GitHub token", pattern: /\bgh[pousr]_[A-Za-z0-9_]{20,}\b/g },
  { name: "JWT", pattern: /\beyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\b/g },
  { name: "AWS access key", pattern: /\bAKIA[0-9A-Z]{16}\b/g }
];

for (const file of files) {
  const text = fs.readFileSync(file, "utf8");
  const scanText = file.endsWith(".md") ? withoutNegatedClaimSentences(stripCodeBlocks(text)) : text;

  for (const claim of bannedClaimPatterns) {
    if (claim.test(scanText)) {
      addError(file, "unsupported blanket compatibility claim found");
    }
  }

  for (const { name, pattern } of secretPatterns) {
    const matches = scanText.match(pattern) ?? [];
    if (matches.length > 0) {
      addError(file, `possible leaked secret detected (${name})`);
    }
  }

  if (file.endsWith(".md")) {
    const tkenLinks = [...scanText.matchAll(/https:\/\/www\.tken\.shop[^\s)\]`.,]*/g)];
    for (const match of tkenLinks) {
      const url = match[0];
      const parsed = new URL(url);
      if (parsed.pathname.startsWith("/v1")) continue;
      if (!url.includes("utm_source=github") || !url.includes("utm_campaign=cursor_windsurf_base_url_guide")) {
        addError(file, `TKEN CTA missing required UTM parameters: ${url}`);
      }
    }
  }
}

for (const file of markdownFiles) {
  const text = fs.readFileSync(file, "utf8");
  const linkRegex = /\[[^\]]+\]\(([^)]+)\)/g;
  for (const match of text.matchAll(linkRegex)) {
    const target = match[1].trim();
    if (target.startsWith("#") || target.startsWith("mailto:")) continue;

    if (target.startsWith("http://") || target.startsWith("https://")) {
      try {
        const url = new URL(target);
        if (url.hostname === "www.tken.shop") continue;
        warnings.push(`${rel(file)}: external link not checked over network: ${target}`);
      } catch {
        addError(file, `invalid URL: ${target}`);
      }
      continue;
    }

    const [targetPath, hash] = target.split("#");
    const resolved = path.resolve(path.dirname(file), decodeURIComponent(targetPath));
    if (!resolved.startsWith(root)) {
      addError(file, `local link points outside repo: ${target}`);
      continue;
    }
    if (!fs.existsSync(resolved)) {
      addError(file, `broken local link: ${target}`);
      continue;
    }
    if (hash) {
      const linkedText = fs.readFileSync(resolved, "utf8");
      const slugs = new Set(
        [...linkedText.matchAll(/^#{1,6}\s+(.+)$/gm)].map((heading) =>
          heading[1]
            .toLowerCase()
            .replace(/`/g, "")
            .replace(/[^\w\s-]/g, "")
            .trim()
            .replace(/\s+/g, "-")
        )
      );
      if (!slugs.has(hash)) {
        addError(file, `broken heading link: ${target}`);
      }
    }
  }
}

if (warnings.length > 0) {
  console.warn(warnings.join("\n"));
}

if (errors.length > 0) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`OK: scanned ${files.length} files for links, claims, and secrets.`);
