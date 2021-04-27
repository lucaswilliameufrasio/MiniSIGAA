import { HttpResponse } from '@/presentation/contracts'

export interface Middleware<T = any> {
  handle: (httpRequest: T) => Promise<HttpResponse>
}
