// Removes the files and directories matching the glob patterns given as
// arguments, relative to the current directory. Missing matches are fine.
// Used by the root `clean:*` scripts.
import fs from "node:fs/promises";

const matches = await Array.fromAsync(fs.glob(process.argv.slice(2)));

await Promise.all(
  matches.map((match) => fs.rm(match, { recursive: true, force: true })),
);
