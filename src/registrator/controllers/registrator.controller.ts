import { badRequest, created } from '@shared/helpers'
import { Controller } from '@shared/protocols'
import { HttpResponse } from '@shared/protocols/http'
import { Request, Response } from 'express'
import { InvalidParamError } from '@shared/errors'
import { StatusCodes } from 'http-status-codes'
import { makePrismaRegistratorRepository } from '@registrator/repositories'
import { EmailValidatorAdapter } from '@shared/adapters/email-validator'
class RegistratorController implements Controller {
  async handle(request: Request, response: Response): Promise<HttpResponse> {
    const { firstName, lastName, email, password, passwordConfirmation, city } =
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
    const isEmailValid = new EmailValidatorAdapter().isValid(email)

    if (!isEmailValid) {
      return response
        .status(StatusCodes.BAD_REQUEST)
        .send(badRequest(new InvalidParamError('email')))
    }

    if (password !== passwordConfirmation) {
      return response
        .status(StatusCodes.BAD_REQUEST)
        .send(badRequest(new InvalidParamError('passwordConfirmation')))
    }

    const findUserByEmail = await makePrismaRegistratorRepository().findByEmail(
      email,
    )

    if (findUserByEmail) {
      return response
        .status(StatusCodes.BAD_REQUEST)
        .send(badRequest(new InvalidParamError('email')))
    }
    await makePrismaRegistratorRepository().register({
      firstName,
      lastName,
      email,
      password,
      city,
    })

    return response
      .status(StatusCodes.CREATED)
      .send(
        created({ firstName, lastName, email }, 'User created successfully'),
      )
  }
}

export const makeRegistratorController = new RegistratorController()
