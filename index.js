const shell = require('shelljs');
const path = require('path');
const fs = require('fs-extra');

const command = process.env.COMMAND;
const projName = process.env.PROJECT_NAME || 'project';
const templateName = process.env.TEMPLATE || 'blank';
const packageName = process.env.PACKAGE_NAME;
const username = process.env.USERNAME;
const password = process.env.PASSWORD;
const keystorePath = process.env.KEYSTORE_PATH || 'keys/android/key.jks';
const keystoreAlias = process.env.KEYSTORE_ALIAS || 'appalias';
const keystorePassword = process.env.KEYSTORE_PASSWORD || 'password';
const actionsMap = {
  'test': 'expo -V && ls files',
  'login': `expo login -u ${username} -p ${password} && expo whoami`,
  'init': `expo init --name ${projName} ${packageName ? '--android-package '+packageName+' --ios-bundle-identifier '+packageName : ''} -t ${templateName} files`,
  'whoami': 'expo whoami',
  'serve': 'cd files && expo start --no-dev --tunnel',
  'build:android': `cd files && expo login -u ${username} -p ${password} && EXPO_ANDROID_KEYSTORE_PASSWORD=${keystorePassword} EXPO_ANDROID_KEY_PASSWORD=${keystorePassword} EXPO_DEBUG=true expo build:android --keystore-path ${keystorePath} --keystore-alias ${keystoreAlias}`,
  'build:ios': `expo login -u ${username} -p ${password} && expo build:ios files`,
  'gen-keys': () => {
    const keystoreFullPath = path.join('files', keystorePath);
    fs.ensureFileSync(keystoreFullPath);
    fs.removeSync(keystoreFullPath);
    shell.exec(`keytool -genkey -v -keystore ${keystoreFullPath} -keyalg RSA -dname "cn=Unknown, ou=Unknown, o=Unknown, c=Unknown" -keysize 2048 -storepass ${keystorePassword} -keypass ${keystorePassword} -validity 10000 -alias ${keystoreAlias}`);
  }
}
const currentCommand = actionsMap[command];

if (!currentCommand) {
  throw `Invalid command: ${command}`;
  return;
}

if (typeof currentCommand == 'string') {
  shell.exec(currentCommand);
  // console.log(currentCommand);
} else {
  currentCommand();
}