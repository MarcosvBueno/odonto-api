import { z } from 'zod'
import 'dotenv/config'

const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  PORT: z.string().default('3000'),
  API_URL: z.string().default('http://localhost:3000'),
})

const _env = envSchema.safeParse(process.env)

if (!_env.success) {
  throw new Error(_env.error.message)
}

export const env = _env.data
