#!/usr/bin/env node

const path = require("path");
const fs = require("fs");
const { rimrafSync } = require("rimraf");

function readdirSync(dir) {
  try {
    return fs.readdirSync(dir);
  } catch (err) {
    return [];
  }
}

function removeOtherPlatformPrebuilds() {
  if (fs.existsSync(".git")) {
    return;
  }

  for (const dir of [path.resolve('prebuilds'), path.resolve('dylibs')]) {
    if (!fs.existsSync(dir)) {
      continue;
    }
    for (const dirName of readdirSync(dir)) {
      if (!path.basename(dirName).startsWith(process.platform)) {
        const dirPath = path.join(dir, dirName);
        // console.log(`remove dir: ${dirPath}`);
        rimrafSync(dirPath);
      }
    }
  }
}

removeOtherPlatformPrebuilds();
