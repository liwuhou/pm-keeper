import fs from 'node:fs'
import { resolve } from 'node:path'
import process from 'node:process'

export interface Agentinfo {
  nodeVersion?: string
  version: string
  name: string
}

export const getAgentInfo = (): Agentinfo | null => {
  if (!process.env.npm_config_user_agent) return null
  const [pm, , nodeInfo] = process.env.npm_config_user_agent.split(' ')
  const [name, version] = pm.split('/')
  const [, nodeVersion] = nodeInfo.split('/')

  return {
    name,
    version,
    nodeVersion
  }
}

export const getPackageJSON = (cwd = process.cwd()) => {
  const packagePath = resolve(cwd, 'package.json')

  if (fs.existsSync(packagePath)) {
    try {
      const raw = fs.readFileSync(packagePath, 'utf-8')
      const data = JSON.parse(raw)
      return data
    } catch (e) {
      console.warn('Filed to parse package.json')
      process.exit(0)
    }
  }
}

const getArgvConf = (argv: string[]): Agentinfo => {
  const [name, version] = argv.length >= 2 ? argv : argv[0].split('@')

  return {
    name,
    version
  }
}

export const getAgentConfig = (): void | Agentinfo => {
  const argv = process.argv.slice(2)
  if (argv.length) {
    return getArgvConf(argv)
  } else {    
    const { pmKeeper } = getPackageJSON()
    return pmKeeper
  }
}

export const checkVersionValid = (version?: string): boolean => {
  if (!version) return true
  return /^([1-9]\d|[1-9])(\.([1-9]\d|\d)){2}$/.test(version)
}