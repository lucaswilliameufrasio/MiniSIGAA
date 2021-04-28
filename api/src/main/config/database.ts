import { KnexConfig } from '@/infra/database/knex-helper'
import { getEnv } from './env'

export const knexConnectionConfig: KnexConfig = getEnv('useDbUrl') === 'true'
  ? {
      client: getEnv('dbClient'),
      connectionConfig: {
        connectionString: getEnv('dbUrl')
      }
    }
  : {
      client: getEnv('dbClient'),
      connectionConfig: {
        host: getEnv('dbHost'),
        user: getEnv('dbUser'),
        port: getEnv('dbPort'),
        password: getEnv('dbPassword'),
        database: getEnv('dbDatabase')
      }
    }
