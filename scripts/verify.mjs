import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const wikiRoot = path.join(root, "wiki");

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(fullPath) : [fullPath];
  });
}

const markdownFiles = walk(wikiRoot).filter((file) => file.endsWith(".md"));
const rawFiles = markdownFiles.filter((file) => file.includes(`${path.sep}raw${path.sep}`));
const sourceIds = [];
const problems = [];

if (rawFiles.length < 5) problems.push(`需要至少 5 個來源，目前只有 ${rawFiles.length} 個。`);

for (const file of rawFiles) {
  const content = fs.readFileSync(file, "utf8");
  for (const field of ["source_id:", "title:", "url:", "ingested_at:", "status:"]) {
    if (!content.includes(field)) problems.push(`${path.relative(root, file)} 缺少 ${field}`);
  }
  const id = content.match(/source_id:\s*(S\d+)/)?.[1];
  if (id) sourceIds.push(id);
}

if (new Set(sourceIds).size !== sourceIds.length) problems.push("Raw sources 有重複 source_id。");

for (const file of markdownFiles) {
  const content = fs.readFileSync(file, "utf8");
  const links = [...content.matchAll(/\[[^\]]+\]\(([^)]+)\)/g)].map((match) => match[1]);
  for (const link of links) {
    if (/^(https?:|#)/.test(link)) continue;
    const target = path.resolve(path.dirname(file), link.split("#")[0]);
    if (!fs.existsSync(target)) problems.push(`${path.relative(root, file)} → 找不到 ${link}`);
  }
}

const conceptFiles = markdownFiles.filter((file) => file.includes(`${path.sep}pages${path.sep}`));
const allText = conceptFiles.map((file) => fs.readFileSync(file, "utf8")).join("\n");
if (/準確率[^\n]{0,30}0\.930|93%[^\n]{0,30}72\.7%/.test(allText)) {
  problems.push("發現可能將 AUC 誤寫成準確率的內容。");
}

for (const htmlFile of ["index.html", "wiki.html", "workflow.html"]) {
  const fullPath = path.join(root, htmlFile);
  const content = fs.readFileSync(fullPath, "utf8");
  const assets = [...content.matchAll(/(?:src|href)="([^"]+)"/g)].map((match) => match[1]);
  for (const asset of assets) {
    if (/^(https?:|#)/.test(asset)) continue;
    const target = path.resolve(root, asset.split("#")[0]);
    if (!fs.existsSync(target)) problems.push(`${htmlFile} → 找不到 ${asset}`);
  }
}

if (problems.length) {
  console.error(`VERIFY FAILED (${problems.length})`);
  problems.forEach((problem) => console.error(`- ${problem}`));
  process.exit(1);
}

console.log("VERIFY PASSED");
console.log(`- raw sources: ${rawFiles.length}`);
console.log(`- markdown files: ${markdownFiles.length}`);
console.log("- relative wiki links: valid");
console.log("- required HTML assets: present");
console.log("- metric-name guard: passed");

