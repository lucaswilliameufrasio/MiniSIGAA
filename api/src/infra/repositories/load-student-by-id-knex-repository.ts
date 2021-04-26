import { KnexHelper } from '@/infra/database/knex-helper'
import { LoadStudentByIdRepository } from '@/data/contracts'

type QueryResult = {
  id: number
  registration: number
  ingress_year: number
  status: string
  course_id: number
  person_id: number
}

export class LoadStudentByIdKnexRepository implements LoadStudentByIdRepository {
  async call (id: number): Promise<LoadStudentByIdRepository.Result> {
    const result = await KnexHelper.execute<QueryResult[]>(`
    SELECT 
        student.id, 
        student.registration,
        student.course_id,
        student.ingress_year,
        student.person_id,
        student.status
        FROM 
        student
    WHERE student.id = ?`, [id])
    const student = result.rows[0]
    return !student
      ? undefined
      : {
          id: student.id,
          registration: student.registration,
          course_id: student.course_id,
          ingress_year: student.ingress_year,
          person_id: student.person_id,
          status: student.status
        }
  }
}
