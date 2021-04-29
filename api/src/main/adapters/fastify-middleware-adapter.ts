import { Middleware } from '@/presentation/contracts'
import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from 'fastify'

export const adaptMiddleware = (middleware: Middleware) => {
  return async (
    req: FastifyRequest,
    res: FastifyReply,
    // Do not use use the done function when working with async/await
    // This may cause duplicated handler calls
    _: HookHandlerDoneFunction
  ) => {
    const accessToken = req.headers?.authorization?.split(' ')[1] || ''
    const request = {
      accessToken,
      ...(req.headers || {})
    }

    const httpResponse = await middleware.handle(request)
    if (httpResponse.statusCode === 200) {
      req.requestContext.set('user_id', httpResponse.body.person_id)
    } else {
      await res.status(httpResponse.statusCode).send({
        error: httpResponse.body.message
      })
    }
  }
}
