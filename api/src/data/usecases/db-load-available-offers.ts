import {
  LoadStudentByIdRepository,
  LoadOffersNotChosenByStudentIdRepository
} from '@/data/contracts'
import { LoadAvailableOffers } from '@/domain/usecases'
import { StudentNotFoundError } from '@/domain/errors'
import { left, right } from '@/shared/either'

export class DbLoadAvailableOffers implements LoadAvailableOffers {
  constructor (
    private readonly loadStudentById: LoadStudentByIdRepository,
    private readonly loadOffersNotChosenByStudentId: LoadOffersNotChosenByStudentIdRepository
  ) {}

  async execute (
    params: LoadAvailableOffers.Params
  ): Promise<LoadAvailableOffers.Result> {
    const student = await this.loadStudentById.call(params.studentId)

    if (!student) {
      return left(new StudentNotFoundError())
    }

    const offersAvailable = await this.loadOffersNotChosenByStudentId.call(
      student.id
    )

    return right(offersAvailable)
  }
}
