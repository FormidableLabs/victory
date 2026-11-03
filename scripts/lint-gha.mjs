// Runs zizmor (https://docs.zizmor.sh) on .github/ with .github/zizmor.yml.
// zizmor isn't a Node tool, so this skips with a hint if it isn't installed;
// CI runs it in the lint job.
import { spawnSync } from "node:child_process";

const result = spawnSync("zizmor", ["."], { stdio: "inherit" });

if (result.error?.code === "ENOENT") {
  process.stdout.write(
    "zizmor is not installed, skipping (CI runs it). To match CI's version, see CONTRIBUTING.md.\n",
  );
  process.exit(0);
}
if (result.error) throw result.error;
process.exit(result.status ?? 1);
