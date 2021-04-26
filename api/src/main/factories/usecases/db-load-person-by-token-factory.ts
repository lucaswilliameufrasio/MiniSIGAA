import { getEnv } from '@/main/config/env'
import { JwtAdapter } from '@/infra/cryptography'
import {
  LoadAdvisorByPersonIdKnexRepository,
  LoadPersonByIdKnexRepository,
  LoadStudentByPersonIdKnexRepository,
  LoadTeacherByPersonIdKnexRepository
} from '@/infra/repositories'
import { DbLoadPersonByToken } from '@/data/usecases'
import { LoadPersonByToken } from '@/domain/usecases'

export const makeDbLoadPersonByToken = (): LoadPersonByToken => {
  const loadPersonByIdRepository = new LoadPersonByIdKnexRepository()
  const loadStudentByPersonIdRepository = new LoadStudentByPersonIdKnexRepository()
  const loadTeacherByPersonIdRepository = new LoadTeacherByPersonIdKnexRepository()
  const loadAdvisorByPersonIdRepository = new LoadAdvisorByPersonIdKnexRepository()
  const jwtAdapter = new JwtAdapter(getEnv('jwtSecret'))

  return new DbLoadPersonByToken(
    loadAdvisorByPersonIdRepository,
    loadStudentByPersonIdRepository,
    loadTeacherByPersonIdRepository,
    loadPersonByIdRepository,
    jwtAdapter
  )
}
