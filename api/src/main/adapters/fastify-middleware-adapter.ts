import { Middleware } from '@/presentation/contracts'
import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from 'fastify'

export const adaptMiddleware = (middleware: Middleware) => {
  return async (
    req: FastifyRequest,
    res: FastifyReply,
    next: HookHandlerDoneFunction
  ) => {
    const accessToken = req.headers?.authorization?.split(' ')[1] || ''
    const request = {
      accessToken,
      ...(req.headers || {})
    }

    const httpResponse = await middleware.handle(request)
    if (httpResponse.statusCode === 200) {
      Object.assign(req, httpResponse.body)
      next()
    } else {
      await res.status(httpResponse.statusCode).send({
        error: httpResponse.body.message
      })
    }
  }
}
