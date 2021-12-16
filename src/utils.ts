import fs from 'node:fs'
import { resolve } from 'node:path'
import process from 'node:process'

export interface Agentinfo {
  nodeVersion: string
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