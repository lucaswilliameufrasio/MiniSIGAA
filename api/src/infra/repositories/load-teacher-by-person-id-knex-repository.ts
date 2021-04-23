import { KnexHelper } from '@/infra/database/knex-helper'
import { LoadTeacherByPersonIdRepository } from '@/data/contracts'

type QueryResult = {
  id: number
  registration: number
}

export class LoadTeacherByPersonIdKnexRepository implements LoadTeacherByPersonIdRepository {
  async call (userId: number): Promise<LoadTeacherByPersonIdRepository.Result> {
    const result = await KnexHelper.execute<QueryResult[]>(`SELECT teacher.id, teacher.registration FROM person
    JOIN teacher ON teacher.person_id = person.id WHERE person.id = ?`, [userId])
    const teacher = result.rows[0]
    return !teacher
      ? undefined
      : {
          id: teacher.id,
          registration: teacher.registration
        }
  }
}
