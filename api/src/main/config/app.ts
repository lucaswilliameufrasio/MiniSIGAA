import setupRoutes from './routes'

import fastify from 'fastify'

const app = fastify()
setupRoutes(app)

export default app
