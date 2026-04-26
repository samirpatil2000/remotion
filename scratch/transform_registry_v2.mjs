// Transforms compositionRegistry.ts:
// Convert React.lazy(() => import("...").then(m => ({ default: m.Scene })))
// into () => import("...").then(m => m.Scene)
// Also update the interface to use a loader function instead of a component

import fs from "fs";

const FILE = "src/compositions/Gallery/compositionRegistry.ts";
let content = fs.readFileSync(FILE, "utf8");

// Step 1: Remove React import (no longer needed)
content = content.replace('import React from "react";\n', '');

// Step 2: Update the interface - change component type to a loader function
content = content.replace(
  `  // eslint-disable-next-line @typescript-eslint/no-explicit-any\n  component: React.ComponentType<any>;`,
  `  // eslint-disable-next-line @typescript-eslint/no-explicit-any\n  loadComponent: () => Promise<React.ComponentType<any>>;`
);

// Step 3: Replace all React.lazy(() => import("...").then(m => ({ default: m.Scene })))
// with () => import("...").then(m => m.Scene)
const lazyRegex = /component: React\.lazy\(\(\) => import\("([^"]+)"\)\.then\(m => \(\{ default: m\.Scene \}\)\)\)/g;
let count = 0;
content = content.replace(lazyRegex, (_, path) => {
  count++;
  return `loadComponent: () => import("${path}").then(m => m.Scene)`;
});

// Add React import back (needed for the type)
content = 'import type React from "react";\n' + content;

fs.writeFileSync(FILE, content);
console.log(`✅ Converted ${count} entries from React.lazy to imperative loaders`);
