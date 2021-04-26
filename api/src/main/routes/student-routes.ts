import { adaptMiddleware, adaptRoute } from '@/main/adapters'
import { makeOffersNotChosenController } from '@/main/factories/controllers'
import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import { makeAuthMiddleware } from '../factories/middlewares'

export default (fastify: FastifyInstance, options: FastifyPluginOptions, done: (err?: Error) => void): void => {
  fastify.route({
    method: 'GET',
    url: '/students/:student_id/offers',
    preHandler: adaptMiddleware(makeAuthMiddleware(['advisor', 'student'])),
    handler: adaptRoute(makeOffersNotChosenController())
  })
  done()
}
