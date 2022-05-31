import { execaCommand } from "execa";

const generateCommand = (cmd) => {
  let branchFilteringCMD;
  if (!["all", "features", "hotfixes", "clean"].includes(cmd)) {
    throw new Error("Command not supported !");
  }
  switch (cmd) {
    case "all":
      branchFilteringCMD = `git branch | grep -v -E "master|main"`;
      break;

    case "features":
      branchFilteringCMD = `git branch | grep -E "feature\/.*"`;
      break;

    case "hotfixes":
      branchFilteringCMD = `git branch | grep -E "hotfix\/.*"`;
      break;

    case "clean":
      branchFilteringCMD = `git branch | grep -v -E "master|main|develop|development"`;
      break;
  }
  //use the identity function to resolve the errors and handle them through the failed flag
  return execaCommand(branchFilteringCMD, { shell: true }).catch((err) => err);
};

const deleteBranches = (branches, exceptBranches) => {
  const branchesToDelete = branches.filter(
    (branch) => !exceptBranches.includes(branch)
  );
  return branchesToDelete.length
    ? execaCommand(`git branch -D ${branchesToDelete.join(" ")}`)
    : true;
};

async function deleteGitBranches(cmd, exceptBranches = []) {
  const { stdout, failed } = await generateCommand(cmd);
  if (!failed) {
    const branches = stdout
      .split("\n")
      .map((branch) => branch.replace(new RegExp(/\*|\s/g), ""));
    return deleteBranches(branches, exceptBranches);
  }
}
export { deleteGitBranches, generateCommand, deleteBranches };
