const path = require('path');
const shell = require('shelljs');
const fs = require('fs-extra');
const axios = require("axios");

const localPath = path.resolve();
const packagePath = path.join(localPath, './package.json');
const packageBackUpPath = path.join(localPath, './package.backup.json');

const cp = () => shell.cp('-f', packagePath, packageBackUpPath);

const back = () => {
  shell.cp('-f', packageBackUpPath, packagePath)
  shell.rm('-f', packageBackUpPath)
};

const getConfig = async () => {
  try {
    const res = await axios.get('http://css.znlh.work/config.json');
    if (res && res.status === 200 && Object.keys(res.data).length) {
      return res.data;
    }
    return {};
  } catch (e) {
    console.log('error: config read fail;')
    return {};
  }
};

const write = async () => {
  const config = await getConfig();
  const packageObj = fs.readJsonSync(packagePath);
  const keyList = Object.keys(config);
  if (keyList.length) {
    Object.keys(config).forEach((key) => {
      if (Object.prototype.hasOwnProperty.call(packageObj, key)) {
        packageObj[key] = Object.assign(packageObj[key], config[key]);
      }
    });
    fs.writeJsonSync(packagePath, packageObj);
  }
};

const build = async () => {
  console.log('step: one ==> backup');
  cp();
  console.log('step: one ==> over');
  console.log('step: two ==> rewrite package.json');
  await write();
  console.log('step: two ==> over');
  console.log('step: three ==> install');
  if (shell.exec('npm install').code !== 0) {
    shell.echo('Error: npm install failed');
    shell.exit(1);
  }
  console.log('step: three ==> over');
  console.log('step: four ==> build');
  if (shell.exec('npm run build').code !== 0) {
    shell.echo('Error: npm run build failed');
    shell.exit(1);
  }
  console.log('step: four ==> over');
  console.log('step: six ==> recovery');
  back();
  console.log('step: six ==> over');
  console.log('==========================');
  console.log('build success');
  console.log();
  console.log('    (>_<)   ');
  console.log();
};

module.exports = build;
build()