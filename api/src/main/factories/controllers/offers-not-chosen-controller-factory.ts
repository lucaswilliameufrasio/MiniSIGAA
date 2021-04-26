import { makeDbLoadAvailableOffers } from '@/main/factories/usecases'
import { OffersNotChosenController } from '@/presentation/controllers'
import { Controller } from '@/presentation/contracts'

export const makeOffersNotChosenController = (): Controller => {
  const controller = new OffersNotChosenController(makeDbLoadAvailableOffers())
  return controller
}
