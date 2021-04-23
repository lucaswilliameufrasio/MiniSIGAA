import { KnexHelper } from '@/infra/database/knex-helper'
import { LoadStudentByPersonIdRepository } from '@/data/contracts'

type QueryResult = {
  id: number
  registration: number
}

export class LoadStudentByPersonIdKnexRepository implements LoadStudentByPersonIdRepository {
  async call (userId: number): Promise<LoadStudentByPersonIdRepository.Result> {
    const result = await KnexHelper.execute<QueryResult[]>(`SELECT student.id, student.registration FROM person
    JOIN student ON student.person_id = person.id WHERE person.id = ?`, [userId])
    const student = result.rows[0]
    return !student
      ? undefined
      : {
          id: student.id,
          registration: student.registration
        }
  }
}
