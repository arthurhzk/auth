import { User } from '@prisma/client'
import { RegistrateDTO } from '@registrator/dtos'
import { RegistrateUser } from '@registrator/protocols'
import prisma from '@shared/database'

export class PrismaRegistratorRepository implements RegistrateUser {
  async register(input: RegistrateDTO.Request): Promise<User> {
    return prisma.user.create({
      data: {
        firstName: input.firstName,
        lastName: input.lastName,
        email: input.email,
        password: input.password,
        city: input.city,
      },
    })
  }
}

export const makePrismaRegistratorRepository =
  (): PrismaRegistratorRepository => {
    return new PrismaRegistratorRepository()
  }
