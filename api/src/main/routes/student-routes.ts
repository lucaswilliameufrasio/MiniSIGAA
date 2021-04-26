import { adaptRoute } from '@/main/adapters'
import { makeOffersNotChosenController } from '@/main/factories/controllers'
import { FastifyInstance, FastifyPluginOptions } from 'fastify'

export default (fastify: FastifyInstance, options: FastifyPluginOptions, done: (err?: Error) => void): void => {
  fastify.get('/students/:student_id/offers', adaptRoute(makeOffersNotChosenController()))
  done()
}
