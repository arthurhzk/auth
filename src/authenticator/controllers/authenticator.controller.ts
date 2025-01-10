import { Controller } from '@shared/protocols'
import { StatusCodes } from 'http-status-codes'
import { Request, Response } from 'express'
import { badRequest, ok } from '@shared/helpers'
import { MissingParamError, NotFoundError } from '@shared/errors'
import { makePrismaAuthenticatorRepository } from '@authenticator/repositories'
import { HttpResponse } from '@shared/protocols'
class AuthenticatorController implements Controller {
  async handle(request: Request, response: Response): Promise<HttpResponse> {
    const { email, password } = request.body

    const requiredFields = ['email', 'password']
    for (const field of requiredFields) {
      if (!request.body[field]) {
        return response
          .status(StatusCodes.BAD_REQUEST)
          .send(badRequest(new MissingParamError(field)))
      }
    }

    const findUserByEmail =
      await makePrismaAuthenticatorRepository().findByEmail(email)

    if (!findUserByEmail) {
      return response
        .status(StatusCodes.UNAUTHORIZED)
        .send(badRequest(new NotFoundError('User not found')))
    }

    const authenticate = await makePrismaAuthenticatorRepository().auth({
      email,
      password,
    })
    return response
      .status(StatusCodes.OK)
      .send(ok(authenticate, 'User authenticated'))
  }
}

export const makeAuthenticatorController = new AuthenticatorController()
