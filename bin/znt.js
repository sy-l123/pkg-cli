#!/usr/bin/env node

const version = require('../package.json').version;
const { program } = require('commander');
const build = require('../lib/build.js');

program
  .version(`@pkg/cli ${version}`)
  .usage('<command> [options]')

program
  .command('build')
  .description('build pkg in production mode')
  .action((cmd) => {
    build().then();
  })

program.parse(process.argv);
