import { LoadPersonByEmailRepository } from '@/data/contracts'
import { KnexHelper } from '../database/knex-helper'

type QueryResult = {
  id: number
  name: string
  email: string
  password
}

export class LoadPersonByEmailKnexRepository implements LoadPersonByEmailRepository {
  async call (email: string): Promise<LoadPersonByEmailRepository.Result> {
    return KnexHelper.connection.raw<QueryResult>('SELECT id, name, email, password FROM person WHERE email = ?', [email])
  }
}
