import { KnexConfig } from '@/infra/database/knex-helper'
import { getEnv } from './env'

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
