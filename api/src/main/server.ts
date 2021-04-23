import 'module-alias/register'

import { getEnv } from './config/env'
import { knexConnectionConfig } from './config/database'
import { KnexHelper } from '@/infra/database/knex-helper'

KnexHelper.connect(knexConnectionConfig).then(async () => {
  const app = (await import ('./config/app')).default
  app.listen(getEnv('port'), getEnv('host'), function (err, address) {
    if (err) {
      console.error(err)
      process.exit(1)
    }
    console.log(`server listening on ${address}`)
  })
}).catch(console.error)
