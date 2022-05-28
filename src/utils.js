import { execaCommand } from "execa";
const possibleCommands = ["all", "features", "hotfixes", "clean"];
export const generateCommand = (cmd) => {
  let generatedCommand;
  if (!possibleCommands.includes(cmd)) {
    throw new Error("Command not supported !");
  }
  switch (cmd) {
    case "all":
      generatedCommand = `git branch | grep -v "master\|main"`;
      break;

    case "features":
      generatedCommand = `git branch | grep "feature/*"`;

      break;
    case "hotfixes":
      generatedCommand = `git branch | grep "hotfix/*"`;

      break;
    case "clean":
      generatedCommand = `git branch | grep -v "master\|main\|develop\|development"`;

      break;
  }
  return execaCommand(generatedCommand, { shell: true });
};
