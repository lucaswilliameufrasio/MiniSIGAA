import fastify from 'fastify'
import setupRoutes from './routes'

const app = fastify()
setupRoutes(app)

export default app
