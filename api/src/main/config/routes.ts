import { FastifyInstance } from 'fastify'
import autoload from 'fastify-autoload'
import path from 'path'

export default async (app: FastifyInstance): Promise<void> => {
  const routesFolderPath = path.join(__dirname, '..', 'routes')

  await app.register(autoload, {
    dir: routesFolderPath,
    options: { prefix: '/api' },
    ignorePattern: /\.map\./
  })
}
