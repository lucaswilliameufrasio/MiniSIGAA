import { Teacher } from '@/domain/entities'

export interface LoadTeachers {
  execute: () => Promise<LoadTeachers.Result[]>
}

export namespace LoadTeachers {
  export type Result = Teacher
}
