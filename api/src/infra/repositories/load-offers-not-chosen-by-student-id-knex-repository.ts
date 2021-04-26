import { KnexHelper } from '@/infra/database/knex-helper'
import { LoadOffersNotChosenByStudentIdRepository } from '@/data/contracts'

type QueryResult = {
  offer_id: number
  discipline_name: string
  discipline_code: string
}

export class LoadOffersNotChosenByStudentIdKnexRepository
implements LoadOffersNotChosenByStudentIdRepository {
  async call (
    studentId: number
  ): Promise<LoadOffersNotChosenByStudentIdRepository.Result[]> {
    const result = await KnexHelper.execute<QueryResult[]>(
      `
        SELECT
            offer.id as offer_id,
            discipline.name as discipline_name,
            discipline.code as discipline_code
        FROM 
            student
        INNER JOIN student_has_offers ON student_has_offers.student_id = ?
        RIGHT JOIN offer
            ON (offer.id = student_has_offers.offer_id)
        JOIN discipline ON offer.discipline_id = discipline.id
            WHERE student_has_offers.offer_id IS NULL 
                AND 
                   offer.course_id = (SELECT student.course_id FROM student WHERE student.id = ?);`,
      [studentId, studentId]
    )

    return result === undefined
      ? []
      : result.rows.map((item: QueryResult) => ({
        offer_id: item.offer_id,
        discipline_name: item.discipline_name,
        discipline_code: item.discipline_code
      }))
  }
}
