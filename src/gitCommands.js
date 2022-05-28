import { execaCommand } from "execa";

async function deleteAllGitBranches() {
  //git branch | grep -v "master\|main\|develop" | xargs git branch -D
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

export { deleteAllGitBranches };
