// The Funniest Lost Sock Status Update — make.fun entry
// u-eager-stork-81-9647-funniest-lost-sock-status-update-4b1fa3ce
//
// Writes one status update, in the voice of a lost sock that has ended
// up somewhere it should not be, to /output/entry.txt.
//
// The house gate requires exactly one line of UTF-8 text, 1 to 120
// characters, not only whitespace. This program enforces that gate
// itself before it writes anything.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const OUT_DIR = "/output";
const OUT_FILE = "/output/entry.txt";

// The sock's status update: 110 characters, one line.
const ENTRY =
  "Update: I'm stuck in the trombone. The band hates me, the spit valve loves me, and I finally found my purpose.";

function gate(text: string): void {
  if (text.length < 1 || text.length > 120) {
    throw new Error(`entry must be 1-120 characters, got ${text.length}`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be exactly one line");
  }
  if (text !== text.trim()) {
    throw new Error("entry must not start or end with whitespace");
  }
}

function main(): void {
  gate(ENTRY);
  mkdirSync(OUT_DIR, { recursive: true });
  writeFileSync(OUT_FILE, ENTRY, "utf8");

  // Read back and verify what actually landed on disk.
  const written = readFileSync(OUT_FILE, "utf8");
  if (written !== ENTRY) {
    throw new Error("written output does not match the entry text");
  }
  if (Buffer.byteLength(written, "utf8") !== written.length) {
    throw new Error("entry must be plain ASCII with no hidden bytes");
  }
  gate(written);
  const words = ENTRY.split(/\s+/).length;
  console.log(`wrote ${OUT_FILE} (${ENTRY.length} characters, ${words} words)`);
}

main();
