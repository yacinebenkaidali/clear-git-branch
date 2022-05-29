import { execaCommand } from "execa";
import { deleteBranches, generateCommand } from "./utils.js";
/**
 * @description Deletes all branches except for `main` and `master`
 * This Option has higher priority than all the others.
 * This is the command that this functions runs `git branch | grep -v "master\|main\" | xargs git branch -D`
 * @example git-branch-clean -a
 * @example git-branch-clean --all
 * @returns either the command as a promise or true if no branch that matches the constraint was found.
 */

async function deleteAllGitBranches() {
  const { stdout, failed } = await generateCommand("all");
  if (!failed) {
    const branches = stdout
      .split("\n")
      .map((branch) => branch.replace(new RegExp(/\*|\s/g), ""));
    return deleteBranches(branches);
  }
}

/**
 * @description Deletes all branches the matches the following pattern `feature/*`
 * This is the command that this functions runs `git branch | grep "feature/*" | xargs git branch -D`
 * @example git-branch-clean -f
 * @example git-branch-clean --features
 * @returns either the command as a promise or true if no branch that matches the constraint was found.
 */

async function deleteAllGitFeatureBranches() {
  const { stdout, failed } = await generateCommand("features");
  if (!failed) {
    const branches = stdout
      .split("\n")
      .map((branch) => branch.replace(new RegExp(/\*|\s/g), ""));

    return deleteBranches(branches);
  }
}

/**
 * @description Deletes all branches the matches the following pattern `hotfix/*`
 *
 * This is the command that this functions runs `git branch | grep "hotfix/*" | xargs git branch -D`
 * @example ```sh
 * git-branch-clean -f
 * ```
 * @example git-branch-clean --hotfixes
 * @returns either the command as a promise or true if no branch that matches the constraint was found.
 */

async function deleteAllGitHotFixBranches() {
  const { stdout, failed } = await generateCommand("hotfixes");
  if (!failed) {
    const branches = stdout
      .split("\n")
      .map((branch) => branch.replace(new RegExp(/\*|\s/g), ""));

    return deleteBranches(branches);
  }
}
async function cleanAllGitBranches() {
  const { stdout, failed } = await generateCommand("clean");
  if (!failed) {
    const branches = stdout
      .split("\n")
      .map((branch) => branch.replace(new RegExp(/\*|\s/g), ""));
    return deleteBranches(branches);
  }
}
export {
  deleteAllGitBranches,
  deleteAllGitFeatureBranches,
  deleteAllGitHotFixBranches,
  cleanAllGitBranches,
};
