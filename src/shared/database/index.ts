import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

prisma
  .$connect()
  .then(() => {
    console.log('Database connected')
  })
  .catch(error => {
    console.log('Error connecting to database', error)
  })

export default prisma
