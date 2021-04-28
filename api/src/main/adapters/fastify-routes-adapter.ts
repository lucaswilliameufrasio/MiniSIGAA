import { Controller } from '@/presentation/contracts'
import { FastifyRequest, FastifyReply } from 'fastify'

export const adaptRoute = (controller: Controller) => {
  return async (req: FastifyRequest, res: FastifyReply) => {
    const request = {
      user_id: req.requestContext.get('user_id'),
      ...((req.body as object) || {}),
      ...((req.params as object) || {}),
      ...((req.query as object) || {})
    }

    const httpResponse = await controller.handle(request)
    if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
      return await res.status(httpResponse.statusCode).send(httpResponse.body)
    } else {
      return await res.status(httpResponse.statusCode).send({
        error: httpResponse.body.message
      })
    }
  }
}
