import { AddPersonRepository } from '@/data/contracts'
import { KnexHelper } from '../database/knex-helper'

type QueryResult = {
  id: number
}

export class AddPersonKnexRepository implements AddPersonRepository {
  async call (
    params: AddPersonRepository.Params
  ): Promise<AddPersonRepository.Result> {
    const result = await KnexHelper.execute<QueryResult[]>(
      `
    INSERT INTO
    person (
        name,
        email,
        password,
        cpf,
        sex,
        address,
        age
        )
    VALUES
        (
        ?,
        ?,
        ?,
        ?,
        ?,
        (
            ?,
            ?,
            ?,
            ?
        ),
        ?
    )
    RETURNING id;
    `,
      [
        params.name,
        params.email,
        params.password,
        params.cpf,
        params.sex,
        params.address.city,
        params.address.country_state,
        params.address.street,
        params.address.house_number,
        params.age
      ]
    )

    console.log(result.rows)

    return {
      id: result.rows[0].id
    }
  }
}
