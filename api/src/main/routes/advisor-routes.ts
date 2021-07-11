import { makeAddTeacherController, makeLoadOffersNotChosenController, makeLoadTeachersController, makeUpdatePersonController } from '@/main/factories/controllers'
import { makeAuthMiddleware } from '@/main/factories/middlewares'
import { adaptMiddleware, adaptRoute } from '@/main/adapters'
import { FastifyInstance, FastifyPluginOptions } from 'fastify'

export default async (fastify: FastifyInstance, options: FastifyPluginOptions): Promise<void> => {
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

  fastify.route({
    method: 'PUT',
    url: '/people/:person_id',
    preHandler: adaptMiddleware(makeAuthMiddleware(['advisor'])),
    handler: adaptRoute(makeUpdatePersonController())
  })
}
