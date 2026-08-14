import { spawnSync } from 'node:child_process'

const isWindows = process.platform === 'win32'
const command = isWindows ? 'py' : 'python3'
const args = isWindows
  ? ['-3', 'scripts/generate_publications.py']
  : ['scripts/generate_publications.py']

const result = spawnSync(command, args, { stdio: 'inherit' })

if (result.error) {
  console.error(`Unable to run the publication generator with ${command}: ${result.error.message}`)
  process.exit(1)
}

process.exit(result.status ?? 1)
