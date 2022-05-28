import { execaCommand } from "execa";

/**
 * @description Deletes all branches except for `main` and `master`
 * This Option has higher priority than all the others.
 * This is the command that this functions runs `git branch | grep -v "master\|main\" | xargs git branch -D`
 * @example git-branch-clean -a
 * @example git-branch-clean --all
 * @returns either the command as a promise or true if no branch that matches the constraint was found.
 */

async function deleteAllGitBranches() {
  const { stdout } = await execaCommand(`git branch | grep -v "master|main"`, {
    shell: true,
  });
  const branches = stdout
    .split("\n")
    .map((branch) => branch.replace(new RegExp(/\*|\s/g), ""))
    .filter((branch) => !new RegExp(/master|main/g).test(branch));
  if (branches.length) {
    return execaCommand(`git branch -D ${branches.join(" ")}`);
  }
  return true;
}

/**
 * @description Deletes all branches the matches the following pattern `feature/*`
 * This is the command that this functions runs `git branch | grep "feature/*" | xargs git branch -D`
 * @example git-branch-clean -f
 * @example git-branch-clean --features
 * @returns either the command as a promise or true if no branch that matches the constraint was found.
 */

async function deleteAllGitFeatureBranches() {
  const { stdout } = await execaCommand(`git branch | grep "feature/*"`, {
    shell: true,
  });
  const branches = stdout
    .split("\n")
    .map((branch) => branch.replace(new RegExp(/\*|\s/g), ""));

  if (branches.length) {
    return execaCommand(`git branch -D ${branches.join(" ")}`);
  }
  return true;
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
  const { stdout } = await execaCommand(`git branch | grep "hotfix/*"`, {
    shell: true,
  });
  const branches = stdout
    .split("\n")
    .map((branch) => branch.replace(new RegExp(/\*|\s/g), ""));

  if (branches.length) {
    return execaCommand(`git branch -D ${branches.join(" ")}`);
  }
  return true;
}
export {
  deleteAllGitBranches,
  deleteAllGitFeatureBranches,
  deleteAllGitHotFixBranches,
};
