#!/usr/bin/env node
import("../src/index.js")
  .then(({ cli }) => cli())
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
