import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import { adaptRoute } from '../adapters/fastify-routes-adapter'
import { makeLoginController } from '../factories/controllers/login-controller-factory'

export default (fastify: FastifyInstance, options: FastifyPluginOptions, done: (err?: Error) => void): void => {
  fastify.post('/login', adaptRoute(makeLoginController()))
  done()
}
