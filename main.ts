import { serve, readJson } from './deps.ts'

console.log(`Env Port: ${Deno.env.get('PORT')}`)
const port: number = Number(Deno.env.get('PORT')) || 8080

const server = serve({ port })

console.log(`Server running at http://localhost:${port}`)

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
