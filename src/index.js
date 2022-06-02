import { Command } from "commander";
import { cleanUpRemoteBranches, deleteGitBranches } from "./gitCommands.js";
const program = new Command();
program
  .command("local", { isDefault: true })
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
  )
  .addHelpText(
    "afterAll",
    `
Usage example:
$ git-branch-clean -c`
  )
  .action(async (options) => {
    if (options.all) {
      await deleteGitBranches("all");
      //the a flag has higher priority than all the other flags
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
  });

program
  .command("remote")
  .description("Cleans up your remote branches")
  .argument("<remote>", `remote's name`)
  .addHelpText(
    "afterAll",
    `
Usage example:
$ git-branch-clean remote origin`
  )
  .action(async (options) => {
    await cleanUpRemoteBranches(options);
  });

async function cli() {
  try {
    program.parse();
  } catch (error) {
    console.log(error.message);
  }
}
export { cli };
