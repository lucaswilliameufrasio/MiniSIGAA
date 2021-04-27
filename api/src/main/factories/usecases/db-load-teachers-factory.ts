import { DbLoadTeachers } from '@/data/usecases'
import { LoadTeachers } from '@/domain/usecases'
import { LoadTeachersKnexRepository } from '@/infra/repositories/load-teachers-knex-repository'

export const makeDbLoadTeachers = (): LoadTeachers => {
  const loadTeachersRepository = new LoadTeachersKnexRepository()
  return new DbLoadTeachers(loadTeachersRepository)
}
