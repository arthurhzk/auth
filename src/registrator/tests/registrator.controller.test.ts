import supertest from 'supertest'
import { faker } from '@faker-js/faker'
import { StatusCodes } from 'http-status-codes'
import { app } from '@shared/http/server'
import { describe, expect, it } from 'vitest'
describe('Registrator Controller', () => {
  it('should return 201 if user is created', async () => {
    const password = faker.internet.password()
    const { status } = await supertest(app).post('/api/registrate').send({
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      password: password,
      passwordConfirmation: password,
    })
    expect(status).toBe(StatusCodes.CREATED)
  })
  it('should return 400 if password and passwordConfirmation do not match', async () => {
    const { status } = await supertest(app).post('/api/registrate').send({
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      passwordConfirmation: faker.internet.password(),
    })
    expect(status).toBe(StatusCodes.BAD_REQUEST)
  })
})
