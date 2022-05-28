# git-branch-clean

A package that helps you clean up your local environment from unused and merge git branches.

## Installation & Usage

```bash
npx git-branch-clean
# or
npm install -g git-branch-clean
```

## Features

Here's a list of options that this CLI supports now

- Use `-x` or `--except` if you want to exclude a list of branches from being deleted, seperate them with a comma.

- Use `-a` or `--all` if you want to delete all branches expect `master` & `main` (the flag `-a` has a higher priority then `-x` flag so please use one of them at a time).

- Use `-a` or `--all` if you want to delete all branches expect `master`, `main` and `develop`.

- Use `-f` or `--features` if you want to delete all branches that start with `feature/*`.

- Use `-h` or `--hotfixes` if you want to delete all branches that start with `hotfix/*`.

**Note that the `-a` or `--all` flag has higher priority than all the other flags, so please use it carefully.**

## Licenses

MIT

## Collaborators

- Yacine BENKAIDALI <yacinebenkaidali@gmail.com>
