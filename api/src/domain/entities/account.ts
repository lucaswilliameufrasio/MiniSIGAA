export type Account = {
  token: string
  name: string
  role: string
}

export enum Role {
  student = 'student',
  advisor = 'advisor',
  teacher = 'teacher',
}
