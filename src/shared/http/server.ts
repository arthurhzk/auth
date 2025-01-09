import { env } from '@shared/env'
import 'express-async-errors'
import express from 'express'
import cors from 'cors'
import routes from '@shared/http/routes'
import prisma from '@shared/database'

class AuthenticationServer {
  public app: express.Application
  private prisma = prisma

  constructor() {
    this.app = express()
    this.setupDependencies()
  }

  public startServer() {
    this.prisma.$connect().then(() => {
      this.app.listen(env.PORT, () => {
        console.log(`Server running on port ${env.PORT}`)
      })
    })
  }

  private setupDependencies() {
    this.app.use(cors())
    this.app.use(express.json())
    this.app.use(routes)
  }
}

const server = new AuthenticationServer()
server.startServer()

export const app = server.app
