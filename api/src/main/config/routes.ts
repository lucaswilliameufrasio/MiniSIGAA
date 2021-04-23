import { FastifyInstance } from 'fastify'
import { readdirSync } from 'fs'
import path from 'path'

export default (app: FastifyInstance): void => {
  const routesFolderPath = path.join(__dirname, '..', 'routes')
  readdirSync(routesFolderPath).map(async file => {
    if (!file.endsWith('.map')) {
      const routeDynamicallyImported = (await import(`../routes/${file}`))
      await app.register(routeDynamicallyImported , { prefix: '/api' })
    }
  })
}
