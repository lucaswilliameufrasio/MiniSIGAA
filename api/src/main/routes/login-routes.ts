import { adaptRoute } from '@/main/adapters'
import { makeLoginController } from '@/main/factories/controllers'
import { FastifyInstance, FastifyPluginOptions } from 'fastify'

export default (fastify: FastifyInstance, options: FastifyPluginOptions, done: (err?: Error) => void): void => {
  fastify.post('/login', adaptRoute(makeLoginController()))
  done()
}
