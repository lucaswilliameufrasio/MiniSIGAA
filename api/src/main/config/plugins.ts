import { FastifyInstance } from 'fastify'
import { fastifyRequestContextPlugin } from 'fastify-request-context'

export default async function (app: FastifyInstance): Promise<void> {
  await app.register(fastifyRequestContextPlugin)
}
