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
      branchFilteringCMD = `git branch | grep -E "[Ff]eature(s)?\/.*"`;
      break;

    case "hotfixes":
      branchFilteringCMD = `git branch | grep -E "[Hh]otfix(s)?\/.*"`;
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
async function cleanUpRemoteBranches(remote) {
  return execaCommand(`git remote prune ${remote}`, { shell: true });
}
export {
  deleteGitBranches,
  generateCommand,
  deleteBranches,
  cleanUpRemoteBranches,
};
