#!/usr/bin/env node
// console.log(process.argv);
process.argv.push("--cwd");
process.argv.push(process.cwd());
process.argv.push("--gulpfile");
process.argv.push(require.resolve("../lib"));
// console.log(process.argv);
require("gulp/bin/gulp");
