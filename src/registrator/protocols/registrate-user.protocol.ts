import { RegistrateDTO } from '@registrator/dtos'
import { User } from '@prisma/client'

export interface RegistrateUser {
  register: (input: RegistrateDTO.Request) => Promise<User>
}
