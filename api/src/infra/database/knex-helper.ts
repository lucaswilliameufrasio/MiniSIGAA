import knex, { Knex } from 'knex'

type KnexConnectionOptions = {
  client: string
  connectionConfig: Knex.Config | Knex.StaticConnectionConfig | Knex.ConnectionConfigProvider
}

type KnexHelperProps = {
  connection: Knex<any, unknown[]>
  connectionOptions: any
  connect: (connectionOptions: KnexConnectionOptions) => Promise<void>
  disconnect: () => Promise<void>
  execute: <R = any[]>(query: string, values?: any) => Promise<{rows: R}>
}

export const KnexHelper: KnexHelperProps = {
  connection: null as Knex<any, unknown[]>,
  connectionOptions: null as any,

  async connect (connectionOptions: KnexConnectionOptions) {
    try {
      this.connectionOptions = connectionOptions
      this.connection = knex({
        client: connectionOptions.client,
        connection: {
          ...connectionOptions.connectionConfig
        }
      })

      await this.execute('select 1')
    } catch (error) {
      throw new Error('Could not stablish a connection')
    }
  },

  async disconnect (): Promise<void> {
    await this.connection.destroy()
    this.connection = null
  },

  async execute<R = any[]>(query: string, values?: any[]): Promise<{rows: R}> {
    if (this.connection === null) {
      this.connect(this.connectionOptions)
    }
    return this.connection.raw(query, values)
  }
}
