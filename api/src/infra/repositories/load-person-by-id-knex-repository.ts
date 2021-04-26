import { LoadPersonByIdRepository } from '@/data/contracts'
import { KnexHelper } from '../database/knex-helper'

type QueryResult = {
  id: number
  name: string
  email: string
  password
}

export class LoadPersonByIdKnexRepository implements LoadPersonByIdRepository {
  async call (id: number): Promise<LoadPersonByIdRepository.Result> {
    const result = await KnexHelper.execute<QueryResult[]>('SELECT id, name, email, password FROM person WHERE id = ?', [id])
    const person = result.rows[0]
    return person
  }
}
