import { User } from '@prisma/client'
import { RegistrateDTO } from '@registrator/dtos'
import { RegistrateUser } from '@registrator/protocols'
import prisma from '@shared/database'
import { BcryptAdapter } from '@shared/adapters/bcrypt'
export class PrismaRegistratorRepository implements RegistrateUser {
  async register(input: RegistrateDTO.Request): Promise<User> {
    const salt = 12
    const hashedPassword = await new BcryptAdapter().hashPassword(
      input.password,
      salt,
    )
    return prisma.user.create({
      data: {
        firstName: input.firstName,
        lastName: input.lastName,
        email: input.email,
        password: hashedPassword,
        city: input.city,
      },
    })
  }
  async findByEmail(email: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: { email },
    })
  }
}

export const makePrismaRegistratorRepository =
  (): PrismaRegistratorRepository => {
    return new PrismaRegistratorRepository()
  }
