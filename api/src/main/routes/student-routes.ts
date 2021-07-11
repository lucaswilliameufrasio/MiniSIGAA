import { makeLoadOffersNotChosenController } from '@/main/factories/controllers'
import { makeAuthMiddleware } from '@/main/factories/middlewares'
import { adaptMiddleware, adaptRoute } from '@/main/adapters'
import { FastifyInstance, FastifyPluginOptions } from 'fastify'

export default async (fastify: FastifyInstance, options: FastifyPluginOptions): Promise<void> => {
  fastify.route({
    method: 'GET',
    url: '/students/offers',
    preHandler: adaptMiddleware(makeAuthMiddleware(['student'])),
    handler: adaptRoute(makeLoadOffersNotChosenController())
  })
}
