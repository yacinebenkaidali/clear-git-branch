# git-branch-clean

Sometime your local envirement will get a little bit slower due to the number of branches that you may have created while working on a project, this package helps you clean up your local environment from unused branches git branches.

## Installation & Usage

```bash
npx git-branch-clean --help
# or
npm install -g git-branch-clean
```

## Features

Here's a list of options that this CLI supports now

- Use `-a` or `--all` if you want to delete all branches expect `master` & `main` (the flag `-a` has a higher priority then `-x` flag so please use one of them at a time).

- Use `-c` or `--clean` if you want to delete all branches except `master`,`main`, `develop` & `development`.

- Use `-f` or `--features` if you want to delete all branches that start with `feature/*`.

- Use `-h` or `--hotfixes` if you want to delete all branches that start with `hotfix/*`.

- Use `-x` or `--except` if you want to exclude a list of branches from being deleted, seperate them with a comma.

**Note that the `-a` or `--all` flag has higher priority than all the other flags, so please use it carefully.**

## Examples

```bash
# to get the list of options
npx git-branch-clean --help
# to delete all feature/* branches
npx git-branch-clean -f
# to delete all hotfix/* branches
npx git-branch-clean -h
# to delete all branches
npx git-branch-clean -a
# to clean all branches
npx git-branch-clean -c
```

## Licenses

MIT

## Collaborators

- Yacine BENKAIDALI <yacinebenkaidali@gmail.com>
