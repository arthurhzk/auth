import { AuthenticateDTO } from '@authenticator/dtos'
import { User } from '@prisma/client'
import prisma from '@shared/database'
class PrismaAuthenticatorRepository {
  async auth(request: AuthenticateDTO.Request): Promise<User> {
    const user = await prisma.user.findUnique({
      where: { email: request.email },
    })
    return {
      id: user.id,
      createdAt: user.createdAt,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
      city: user.city,
    }
  }
}

export const makePrismaAuthenticatorRepository =
  (): PrismaAuthenticatorRepository => {
    return new PrismaAuthenticatorRepository()
  }
