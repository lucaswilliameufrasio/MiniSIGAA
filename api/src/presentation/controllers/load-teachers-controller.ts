import { ok, serverError, noContent } from '@/presentation/helpers'
import { Controller, HttpResponse } from '@/presentation/contracts'
import { LoadTeachers } from '@/domain/usecases'

export class LoadTeachersController implements Controller {
  constructor (private readonly loadTeachers: LoadTeachers) {}

  async handle (_: any): Promise<HttpResponse> {
    try {
      const teachers: LoadTeachers.Result[] = await this.loadTeachers.execute()

      return !teachers.length ? noContent() : ok(teachers)
    } catch (error) {
      return serverError(error)
    }
  }
}
