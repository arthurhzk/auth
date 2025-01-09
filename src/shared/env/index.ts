import { InvalidParamError } from '@shared/errors'
import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  DATABASE_URL: z.string(),
  PORT: z.coerce.number().default(5000),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('Invalid enviroment variables', _env.error.format())

  throw new InvalidParamError('Invalid enviroment variables')
}

export const env = _env.data
