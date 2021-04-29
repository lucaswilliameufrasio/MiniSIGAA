import { LoadTeachers } from '@/domain/usecases'
import { LoadTeachersRepository } from '../contracts'

export class DbLoadTeachers implements LoadTeachers {
  constructor (private readonly loadTeachers: LoadTeachersRepository) {}

  async execute (): Promise<LoadTeachers.Result[]> {
    const teachers = await this.loadTeachers.call()
    return !teachers.length
      ? []
      : teachers.map(teacher => ({
        name: teacher.name,
        email: teacher.email,
        registration: String(teacher.registration),
        person_id: teacher.person_id
      }))
  }
}
