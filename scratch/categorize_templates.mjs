import fs from "fs";
import path from "path";

const FILE_PATH = path.resolve("src/compositions/Gallery/compositionRegistry.ts");
let content = fs.readFileSync(FILE_PATH, "utf8");

// Add category to interface
if (!content.includes("category: string;")) {
  content = content.replace(
    /export interface CompositionDef \{([\s\S]*?)id: string;/m,
    `export interface CompositionDef {$1id: string;\n  category: string;`
  );
}

// Simple categorizer function
function categorize(title, id) {
  const t = (title + " " + id).toLowerCase();
  
  if (t.includes("chart") || t.includes("graph") || t.includes("data") || t.includes("ad-spend") || t.includes("stats") || t.includes("growth")) {
    return "Data & Charts";
  }
  if (t.includes("app") || t.includes("ui") || t.includes("button") || t.includes("card") || t.includes("click") || t.includes("toggle") || t.includes("calendar") || t.includes("mockup") || t.includes("mac") || t.includes("website") || t.includes("window")) {
    return "UI & App";
  }
  if (t.includes("youtube") || t.includes("tiktok") || t.includes("subscribe") || t.includes("spotify") || t.includes("post") || t.includes("social") || t.includes("music") || t.includes("podcast")) {
    return "Social & Media";
  }
  if (t.includes("text") || t.includes("story") || t.includes("typography") || t.includes("letting") || t.includes("words") || t.includes("comic") || t.includes("quote") || t.includes("title") || t.includes("font") || t.includes("mood") || t.includes("motivational")) {
    return "Typography";
  }
  if (t.includes("3d") || t.includes("cube") || t.includes("blob") || t.includes("bouncing") || t.includes("spin") || t.includes("sphere") || t.includes("abstract") || t.includes("morph") || t.includes("physics") || t.includes("fluid")) {
    return "3D & Abstract";
  }
  if (t.includes("clock") || t.includes("timer") || t.includes("counter") || t.includes("error") || t.includes("loader") || t.includes("progress") || t.includes("spinner") || t.includes("alarm")) {
    return "Utility";
  }
  return "Miscellaneous";
}

// Regex to find all objects in REGISTRY
// We look for: id: "something", \n title: "something", ...
const itemRegex = /(id:\s*"([^"]+)",\s*title:\s*"([^"]+)",[\s\S]*?icon:\s*"[^"]+",)/g;

let count = 0;
const categoriesCount = {};

content = content.replace(itemRegex, (match, fullMatch, id, title) => {
  // If it already has category, skip
  if (match.includes("category:")) return match;
  
  const category = categorize(title, id);
  categoriesCount[category] = (categoriesCount[category] || 0) + 1;
  count++;
  
  return fullMatch + `\n    category: "${category}",`;
});

fs.writeFileSync(FILE_PATH, content);

console.log(`✅ Updated ${count} templates with categories.`);
console.table(categoriesCount);
