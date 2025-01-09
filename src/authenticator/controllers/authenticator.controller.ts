import { Controller } from '@shared/protocols'
import { StatusCodes } from 'http-status-codes'
import { Request, Response } from 'express'
import { badRequest, ok } from '@shared/helpers'
import { MissingParamError } from '@shared/errors'
import { makePrismaAuthenticatorRepository } from '@authenticator/repositories/prisma-authenticator.repository'
import { HttpResponse } from '@shared/protocols'
class AuthenticatorController implements Controller {
  async handle(request: Request, response: Response): Promise<HttpResponse> {
    const { ...body } = request.body

    const requiredFields = ['email', 'password']
    for (const field of requiredFields) {
      if (!request.body[field]) {
        return response
          .status(StatusCodes.BAD_REQUEST)
          .send(badRequest(new MissingParamError(field)))
      }
    }
    const authenticate = await makePrismaAuthenticatorRepository().auth(body)
    return response
      .status(StatusCodes.OK)
      .send(ok(authenticate, 'User authenticated'))
  }
}

export const makeAuthenticatorController = new AuthenticatorController()
