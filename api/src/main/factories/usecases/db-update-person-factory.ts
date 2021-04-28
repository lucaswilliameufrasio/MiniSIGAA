import { DbUpdatePerson } from '@/data/usecases'
import { UpdatePerson } from '@/domain/usecases'
import { UpdatePersonKnexRepository } from '@/infra/repositories'

export const makeDbUpdatePerson = (): UpdatePerson => {
  const updatePersonKnexRepository = new UpdatePersonKnexRepository()
  return new DbUpdatePerson(updatePersonKnexRepository)
}
