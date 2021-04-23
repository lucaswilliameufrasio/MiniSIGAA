import { KnexHelper } from '@/infra/database/knex-helper'
import { LoadAdvisorByPersonIdRepository } from '@/data/contracts'

type QueryResult = {
  id: number
  registration: number
}

export class LoadAdvisorByPersonIdKnexRepository implements LoadAdvisorByPersonIdRepository {
  async call (userId: number): Promise<LoadAdvisorByPersonIdRepository.Result> {
    const result = await KnexHelper.execute<QueryResult[]>(`SELECT advisor.id, advisor.registration FROM person
    JOIN advisor ON advisor.person_id = person.id WHERE person.id = ?`, [userId])
    const advisor = result.rows[0]
    return !advisor
      ? undefined
      : {
          id: advisor.id,
          registration: advisor.registration
        }
  }
}
