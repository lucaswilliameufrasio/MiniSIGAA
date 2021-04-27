import { makeDbLoadAvailableOffers } from '@/main/factories/usecases'
import { LoadOffersNotChosenController } from '@/presentation/controllers'
import { Controller } from '@/presentation/contracts'

export const makeLoadOffersNotChosenController = (): Controller => {
  const controller = new LoadOffersNotChosenController(makeDbLoadAvailableOffers())
  return controller
}
