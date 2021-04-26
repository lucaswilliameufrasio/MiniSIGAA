import { LoadOffersNotChosenByStudentIdKnexRepository } from '@/infra/repositories/load-offers-not-chosen-by-student-id-knex-repository'
import { LoadStudentByIdKnexRepository } from '@/infra/repositories'
import { DbLoadAvailableOffers } from '@/data/usecases'
import { LoadAvailableOffers } from '@/domain/usecases'

export const makeDbLoadAvailableOffers = (): LoadAvailableOffers => {
  const loadStudentByIdRepository = new LoadStudentByIdKnexRepository()
  const loadOffersNotChosenByStudentIdRepository = new LoadOffersNotChosenByStudentIdKnexRepository()
  return new DbLoadAvailableOffers(
    loadStudentByIdRepository,
    loadOffersNotChosenByStudentIdRepository
  )
}
