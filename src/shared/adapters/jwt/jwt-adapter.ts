import jsonwebtoken, { JwtPayload } from 'jsonwebtoken'

export class JwtAdapter {
  verify(token: string, secret: string) {
    return jsonwebtoken.verify(token, secret)
  }
  sign(payload: JwtPayload, secret: string) {
    return jsonwebtoken.sign(payload, secret)
  }
  decode(token: string) {
    return jsonwebtoken.decode(token)
  }
}
