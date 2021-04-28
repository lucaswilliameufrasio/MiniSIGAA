import { makeAddTeacherController, makeLoadOffersNotChosenController, makeLoadTeachersController } from '@/main/factories/controllers'
import { makeAuthMiddleware } from '@/main/factories/middlewares'
import { adaptMiddleware, adaptRoute } from '@/main/adapters'
import { FastifyInstance, FastifyPluginOptions } from 'fastify'

export default (fastify: FastifyInstance, options: FastifyPluginOptions, done: (err?: Error) => void): void => {
  fastify.route({
    method: 'GET',
    url: '/teachers',
    preHandler: adaptMiddleware(makeAuthMiddleware(['advisor'])),
    handler: adaptRoute(makeLoadTeachersController())
  })

  fastify.route({
    method: 'POST',
    url: '/teachers',
    preHandler: adaptMiddleware(makeAuthMiddleware(['advisor'])),
    handler: adaptRoute(makeAddTeacherController())
  })

  fastify.route({
    method: 'GET',
    url: '/students/:student_id/offers',
    preHandler: adaptMiddleware(makeAuthMiddleware(['advisor'])),
    handler: adaptRoute(makeLoadOffersNotChosenController())
  })

  done()
}
