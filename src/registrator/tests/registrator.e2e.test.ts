import supertest from 'supertest'
import { faker } from '@faker-js/faker'
import { StatusCodes } from 'http-status-codes'
import { app } from '@shared/http/server'
import { describe, expect, it, vi } from 'vitest'
import { afterEach } from 'node:test'
describe('Registrator Controller', () => {
  const password = faker.internet.password()
  const badRequestBody = JSON.stringify({
    status: false,
    statusCode: StatusCodes.BAD_REQUEST,
    body: {
      name: 'InvalidParamError',
    },
    data: 'BAD_REQUEST',
  })
  it('should return 201 if user is created', async () => {
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
    const { status, text } = await supertest(app).post('/api/registrate').send({
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      passwordConfirmation: faker.internet.password(),
    })
    expect(status).toBe(StatusCodes.BAD_REQUEST)
    expect(text).toEqual(badRequestBody)
  })
  it('should return 400 if firstName is not provided', async () => {
    const { status, text } = await supertest(app).post('/api/registrate').send({
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      password: password,
      passwordConfirmation: password,
    })
    expect(status).toBe(StatusCodes.BAD_REQUEST)
    expect(text).toEqual(badRequestBody)
  })
  it('should return 400 if lastName is not provided', async () => {
    const { status, text } = await supertest(app).post('/api/registrate').send({
      firstName: faker.person.firstName(),
      email: faker.internet.email(),
      password: password,
      passwordConfirmation: password,
    })
    expect(status).toBe(StatusCodes.BAD_REQUEST)
    expect(text).toEqual(badRequestBody)
  })
  it('should return 400 if email is not provided', async () => {
    const { status, text } = await supertest(app).post('/api/registrate').send({
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      password: password,
      passwordConfirmation: password,
    })
    expect(status).toBe(StatusCodes.BAD_REQUEST)
    expect(text).toEqual(badRequestBody)
  })
  it('should return 400 if password is not provided', async () => {
    const { status, text } = await supertest(app).post('/api/registrate').send({
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      passwordConfirmation: password,
    })
    expect(status).toBe(StatusCodes.BAD_REQUEST)
    expect(text).toEqual(badRequestBody)
  })
  it('should return 400 if passwordConfirmation is not provided', async () => {
    const { status, text } = await supertest(app).post('/api/registrate').send({
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      password: password,
    })
    expect(status).toBe(StatusCodes.BAD_REQUEST)
    expect(text).toEqual(badRequestBody)
  })
})
