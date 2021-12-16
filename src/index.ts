import boxen from 'boxen'
import process from 'node:process'
import { getAgentInfo, getPackageJSON } from "./utils"

const pmInfo = getAgentInfo()
const { pmKeeper: { name: targetPm = '', version: targetVersion = '' } = {} } = getPackageJSON() ?? {}
const boxenAlertOpts = {
  title: 'Package Manager Error',
  titleAlignment: 'center' as 'center',
  textAlignment: 'center' as 'center',
  borderStyle: 'double' as 'double',
  borderColor: 'red',
  padding: 1
}

if (pmInfo && targetPm && pmInfo.name !== targetPm) {
  switch (targetPm) {
    case 'npm':
      console.log(boxen('Use "npm install" for installation in this project', boxenAlertOpts))
      break
    case 'pnpm':
      console.log(boxen(`Use "pnpm install" for installation in this project.

If you don't have pnpm, install it via "npm i -g pnpm".
For more details, go to https://pnpm.js.org/`, boxenAlertOpts))
      break
    case 'yarn':
      console.log(boxen(`Use "yarn" for installation in this project.
      
If you don't have yarn, install it via "npm i -g yarn".
For more details, go to https://yarnpkg.com/`, boxenAlertOpts))
      break
  }
  process.exit(1)
} else if (pmInfo && targetVersion && pmInfo.version !== targetVersion) {
  console.log(boxen(`Use version "${targetVersion}" of the ${targetPm} for installation in this project.
  
you can change version via "npm install ${targetPm}@${targetVersion}".`, { ...boxenAlertOpts, title: 'Package Manager Version Error', borderStyle: 'single' }))
  process.exit(1)
}
