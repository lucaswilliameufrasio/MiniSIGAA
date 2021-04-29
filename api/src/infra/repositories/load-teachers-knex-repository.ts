import { KnexHelper } from '@/infra/database/knex-helper'
import { LoadTeachersRepository } from '@/data/contracts'

type QueryResult = {
  name: string
  email: string
  registration: number
  person_id: number
}

export class LoadTeachersKnexRepository
implements LoadTeachersRepository {
  async call (): Promise<LoadTeachersRepository.Result[]> {
    const result = await KnexHelper.execute<QueryResult[]>(
      ` SELECT
            person.id as person_id,
            person.name,
            person.email,
            teacher.registration
        FROM
            teacher
        JOIN person ON teacher.person_id = person.id;
      `
    )

    return result === undefined
      ? []
      : result.rows.map((item: QueryResult) => ({
        name: item.name,
        email: item.email,
        registration: item.registration,
        person_id: item.person_id
      }))
  }
}
