import { UpdatePersonRepository } from '@/data/contracts'
import { KnexHelper } from '../database/knex-helper'

type QueryResult = {
  id: number
}

export class UpdatePersonKnexRepository implements UpdatePersonRepository {
  async call (params: UpdatePersonRepository.Params): Promise<void> {
    await KnexHelper.execute<QueryResult[]>(
      `
    UPDATE person
    SET name = ?,
        email = ?,
        cpf = ?,
        sex = ?,
        address.city = ?,
        address.country_state = ?,
        address.street = ?,
        address.house_number = ?,
        age = ?
    WHERE id = ?
    `,
      [
        params.name,
        params.email,
        params.cpf,
        params.sex,
        params.address.city,
        params.address.country_state,
        params.address.street,
        params.address.house_number,
        params.age,
        params.id
      ]
    )
  }
}
