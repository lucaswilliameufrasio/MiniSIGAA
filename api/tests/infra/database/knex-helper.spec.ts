import { KnexHelper as sut } from '@/infra/database/knex-helper'
import { knexConnectionConfig } from '@/main/config/database'

describe('Knex Helper', () => {
  beforeAll(() => {
    sut.connect(knexConnectionConfig)
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
})
