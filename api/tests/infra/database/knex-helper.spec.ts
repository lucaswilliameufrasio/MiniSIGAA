import { KnexHelper as sut } from '@/infra/database/knex-helper'
import { knexConnectionConfig } from '@/main/config/database'

describe('Knex Helper', () => {
  beforeAll(async () => {
    await sut.connect(knexConnectionConfig)
  })

  afterAll(async () => {
    await sut.disconnect()
  })

  it('Should reconnect if connection was lost or destroyed', async () => {
    const result = await sut.execute('SELECT id FROM person')

    expect(result).not.toBe(null)
    await sut.disconnect()
    const result2 = await sut.execute('SELECT id FROM person')

    expect(result2).not.toBe(null)
  })

  it('Should throw an error if the connection could be established', async () => {
    const promise = sut.connect({
      client: 'pg',
      connectionConfig: {
        host: 'localhost',
        port: 5431,
        user: 'notevenexist',
        password: 'what',
        database: 'doesnotexist'
      }
    })

    await expect(promise).rejects.toThrow()
  })
})
