import setupRoutes from './routes'
import setupPlugins from './plugins'
import fastify from 'fastify'

const app = fastify()
setupPlugins(app).then().catch(console.error)
setupRoutes(app).then().catch(console.error)

export default app
