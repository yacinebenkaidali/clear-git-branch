import { program } from "commander";
import { deleteAllGitBranches } from "./gitCommands.js";
// git-branch-clean clean --except -x --all -a
program
  .option(
    "-x, --except <string>",
    "list of branch names that you want to exclude, must be seperated by a comma",
    (value) => value.split(/,/)
  )
  .option("-a, --all", "remove all branches except master/main", false)
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
    await deleteAllGitBranches();
  } catch (error) {
    console.log(error.message);
  }
}
export { cli };
