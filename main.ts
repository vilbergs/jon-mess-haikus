import { serve, readJson } from './deps.ts'

const server = serve({ port: 8000 })

console.log('Server running at http://localhost:8000')

for await (const req of server) {
  const haiku = await randomHaiku()

  req.respond({ body: haiku })
}

async function randomHaiku() {
  return randomArrayItem(await readHaikus())
}

async function readHaikus(): Promise<string[]> {
  const haikus = await readJson('./haikus.json')

  if (!validateHaikus(haikus)) {
    throw Error('Error reading from Haiku repository, check that the source file is valid')
  }

  return haikus
}

function validateHaikus(array: unknown): array is string[] {
  return array instanceof Array && array.every((value) => typeof value === 'string')
}

function randomArrayItem(items: string[]): string {
  const index = Math.floor(Math.random() * items.length)

  return items[index]
}
