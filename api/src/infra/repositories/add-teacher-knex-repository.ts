import { AddTeacherRepository } from '@/data/contracts'
import { KnexHelper } from '../database/knex-helper'

export class AddTeacherKnexRepository implements AddTeacherRepository {
  async call (params: AddTeacherRepository.Params): Promise<void> {
    await KnexHelper.execute(
      `
      INSERT INTO
        teacher (registration, person_id)
      VALUES
        (?, ?);
    `,
      [params.registration, params.person_id]
    )
  }
}
