export namespace RegistrateDTO {
  export type Request = {
    email: string
    firstName: string
    lastName: string
    password: string
    city?: string
  }
}
