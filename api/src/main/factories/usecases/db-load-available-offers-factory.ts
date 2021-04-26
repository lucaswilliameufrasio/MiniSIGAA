import { LoadStudentByIdKnexRepository, LoadOffersNotChosenByStudentIdKnexRepository } from '@/infra/repositories'
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
