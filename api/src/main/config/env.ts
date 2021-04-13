import dotenv from 'dotenv'
dotenv.config()

const env = {
  dbClient: process.env.DB_CLIENT || '',
  dbHost: process.env.DB_HOST || 'localhost',
  dbPort: process.env.DB_PORT || 5432,
  dbUser: process.env.DB_USER || 'postgres',
  dbPassword: process.env.DB_PASS || '',
  dbDatabase: process.env.DB_NAME || 'mini'
}

export const getEnv = (name: string): any => {
  const value = env[name]

  if (value === '' || value === null) {
    throw Error(`The variable ${name} was not found`)
  }

  return value
}
