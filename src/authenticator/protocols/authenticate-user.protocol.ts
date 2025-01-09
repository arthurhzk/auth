import { AuthenticateDTO } from '@authenticator/dtos'
import { User } from '@prisma/client'

export interface AuthenticateUser {
  auth: (input: AuthenticateDTO.Request) => Promise<User>
}
