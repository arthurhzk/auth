import { badRequest, created } from '@shared/helpers'
import { Controller } from '@shared/protocols'
import { HttpResponse } from '@shared/protocols/http'
import { Request, Response } from 'express'
import { InvalidParamError } from '@shared/errors'
import { StatusCodes } from 'http-status-codes'

class RegistratorController implements Controller {
  async handle(request: Request, response: Response): Promise<HttpResponse> {
    const { firstName, lastName, email, password, passwordConfirmation } =
      request.body

    const requiredFields = [
      'firstName',
      'lastName',
      'email',
      'password',
      'passwordConfirmation',
    ]

    for (const field of requiredFields) {
      if (!request.body[field]) {
        return response
          .status(StatusCodes.BAD_REQUEST)
          .send(badRequest(new InvalidParamError(field)))
      }
    }
    if (password !== passwordConfirmation) {
      return response
        .status(StatusCodes.BAD_REQUEST)
        .send(badRequest(new InvalidParamError('passwordConfirmation')))
    }
    return response
      .status(StatusCodes.CREATED)
      .send(
        created({ firstName, lastName, email }, 'User created successfully'),
      )
  }
}

export const makeRegistratorController = new RegistratorController()
