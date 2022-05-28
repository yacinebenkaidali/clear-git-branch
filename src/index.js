import { program } from "commander";
import {
  deleteAllGitBranches,
  deleteAllGitFeatureBranches,
  deleteAllGitHotFixBranches,
} from "./gitCommands.js";
// git-branch-clean clean --except -x --all -a -c --clean
// we won't support the except flag on the first release
program
  .option(
    "-x, --except <string>",
    "list of branch names that you want to exclude, must be seperated by a comma",
    (value) => value.split(/,/)
  )
  .option("-a, --all", "remove all branches except master/main", false)
  .option(
    "-c, --clean",
    "remove all branches except master/main/develop",
    false
  )
  .option(
    "-f, --features",
    "removes all branches that start with feature/*",
    false
  )
  .option(
    "-h, --hotfixes",
    "removes all branches that start with hotfix/*",
    false
  );

async function cli() {
  program.parse();
  const options = program.opts();
  try {
    if (options.all) {
      await deleteAllGitBranches();
      return;
    }
    if (options.features) {
      await deleteAllGitFeatureBranches();
    }
    if (options.hotfixes) {
      await deleteAllGitHotFixBranches();
    }
  } catch (error) {
    console.log(error.message);
  }
}
export { cli };
