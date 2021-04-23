import { getEnv } from './env'

type KnexConfig = {
  client: string
  connectionConfig: {
    host: string
    user: string
    port: number
    password: string
    database: string
  }
}

export const knexConnectionConfig: KnexConfig = {
  client: getEnv('dbClient'),
  connectionConfig: {
    host: getEnv('dbHost'),
    user: getEnv('dbUser'),
    port: getEnv('dbPort'),
    password: getEnv('dbPassword'),
    database: getEnv('dbDatabase')
  }
}
