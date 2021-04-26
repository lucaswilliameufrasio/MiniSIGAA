import { DbLoadAvailableOffers } from '@/data/usecases/db-load-available-offers'
import { LoadAvailableOffers } from '@/domain/usecases'
import { LoadOffersNotChosenByStudentIdKnexRepository } from '@/infra/repositories/load-offers-not-chosen-by-student-id-knex-repository'
import { LoadStudentByIdKnexRepository } from '@/infra/repositories/load-student-by-id-knex-repository'

export const makeDbLoadAvailableOffers = (): LoadAvailableOffers => {
  const loadStudentByIdRepository = new LoadStudentByIdKnexRepository()
  const loadOffersNotChosenByStudentIdRepository = new LoadOffersNotChosenByStudentIdKnexRepository()
  return new DbLoadAvailableOffers(
    loadStudentByIdRepository,
    loadOffersNotChosenByStudentIdRepository
  )
}
