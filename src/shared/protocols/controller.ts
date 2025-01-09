import { Request, Response } from 'express'
import { HttpResponse } from '@shared/protocols/http'

export interface Controller {
  handle: (request: Request, response: Response) => Promise<HttpResponse>
}
