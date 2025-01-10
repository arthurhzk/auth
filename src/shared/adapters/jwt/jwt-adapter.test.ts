import { JwtAdapter } from '@shared/adapters/jwt'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { faker } from '@faker-js/faker'
describe('Jwt Adapter', () => {
  let sut: JwtAdapter
  beforeEach(() => {
    sut = new JwtAdapter()
  })
  it('should be able to verify a token', () => {
    const jwtToken = faker.internet.jwtAlgorithm()
    const jwtSecret = faker.internet.jwtAlgorithm()
    vi.spyOn(sut, 'verify').mockReturnValue({ id: jwtToken })
    const payload = sut.verify(jwtToken, jwtSecret)
    expect(payload).toEqual({ id: jwtToken })
    expect(sut.verify).toHaveBeenCalledWith(jwtToken, jwtSecret)
    expect(sut.verify).toHaveBeenCalledOnce()
  })
  it('should be able to sign a payload', () => {
    const jwtSecret = faker.internet.jwtAlgorithm()
    const payload = { id: faker.number.hex() }
    const sign = sut.sign(payload, jwtSecret)
    expect(sign).toBeTypeOf('string')
    expect(sign).toBeTruthy()
  })
  it('should be able to decode a token', () => {
    const jwtToken = faker.internet.jwtAlgorithm()
    vi.spyOn(sut, 'decode').mockReturnValue({ id: jwtToken })
    const payload = sut.decode(jwtToken)
    expect(payload).toEqual({ id: jwtToken })
    expect(sut.decode).toHaveBeenCalledWith(jwtToken)
    expect(sut.decode).toHaveBeenCalledOnce()
  })
})
