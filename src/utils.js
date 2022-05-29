import { execaCommand } from "execa";

export const generateCommand = (cmd) => {
  let generatedCommand;
  if (!["all", "features", "hotfixes", "clean"].includes(cmd)) {
    throw new Error("Command not supported !");
  }
  switch (cmd) {
    case "all":
      generatedCommand = `git branch | grep -v -E "master|main"`;
      break;

    case "features":
      generatedCommand = `git branch | grep "feature/*"`;

      break;
    case "hotfixes":
      generatedCommand = `git branch | grep "hotfix/*"`;

      break;
    case "clean":
      generatedCommand = `git branch | grep -v -E "master|main|develop|development"`;

      break;
  }
  //use the identity function to resolve the errors and handle them manually
  return execaCommand(generatedCommand, { shell: true }).catch((err) => err);
};
export const deleteBranches = (branches) =>
  branches.length ? execaCommand(`git branch -D ${branches.join(" ")}`) : true;
