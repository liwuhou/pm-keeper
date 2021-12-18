import boxen from 'boxen'
import {exit} from 'node:process'
import { getAgentInfo, getAgentConfig, checkVersionValid } from "./utils"
import { AGENT } from './consts'

const pmInfo = getAgentInfo()
const { name: targetPm, version: targetVersion, } = getAgentConfig() ?? {}
const boxenAlertOpts = {
  title: 'Package Manager Error',
  titleAlignment: 'center' as 'center',
  textAlignment: 'center' as 'center',
  borderStyle: 'double' as 'double',
  borderColor: 'red',
  padding: 1
}

if (targetPm && AGENT.includes(targetPm) && checkVersionValid(targetVersion)) {
  if (pmInfo && targetPm && pmInfo.name !== targetPm) {
    const versionFix = targetVersion ? `@${targetVersion}` : ''
    switch (targetPm) {
      case 'npm':
        console.log(boxen('Use "npm install" for installation in this project' + (
          targetVersion ? `\nAnd the specific version: ${targetVersion}` : ''
        ), boxenAlertOpts))
        break
      case 'pnpm':
        console.log(boxen(`Use "pnpm install" for installation in this project.\n
If you don't have pnpm, install it via "npm i -g pnpm${versionFix}".
For more details, go to https://pnpm.js.org/`, boxenAlertOpts))
        break
      case 'yarn':
        console.log(boxen(`Use "yarn" for installation in this project.\n
If you don't have yarn, install it via "npm i -g yarn${versionFix}".
For more details, go to https://yarnpkg.com/`, boxenAlertOpts))
        break
    }
    exit(1)
  } else if (pmInfo && targetVersion && pmInfo.version !== targetVersion) {
    console.log(boxen(`Use version "${targetVersion}" of the ${targetPm} for installation in this project.\n
you can change version via "npm install -g ${targetPm}@${targetVersion}".`, { ...boxenAlertOpts, title: 'Package Manager Version Error', borderStyle: 'single' }))
    exit(1)
  }
}


