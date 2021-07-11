import { adaptRoute } from '@/main/adapters'
import { makeLoginController } from '@/main/factories/controllers'
import { FastifyInstance, FastifyPluginOptions } from 'fastify'

export default async (fastify: FastifyInstance, options: FastifyPluginOptions): Promise<void> => {
  fastify.post('/login', adaptRoute(makeLoginController()))
}
