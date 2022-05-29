import { program } from "commander";
import { deleteGitBranches } from "./gitCommands.js";

// git-branch-clean clean --except -x --all -a -c --clean
program
  .name("git-branch-clean")
  .description(
    "A CLI that cleans up the local branches with options to exclude develop & master/main branches."
  )
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
      await deleteGitBranches("all");
      return;
    }
    if (options.features) {
      await deleteGitBranches("features", options.except);
    }
    if (options.hotfixes) {
      await deleteGitBranches("hotfixes", options.except);
    }
    if (options.clean) {
      await deleteGitBranches("clean", options.except);
    }
  } catch (error) {
    console.log(error.message);
  }
}
export { cli };
