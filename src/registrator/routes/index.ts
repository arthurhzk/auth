import express from 'express'
import { makeRegistratorController } from '@registrator/controllers'

const router = express.Router()

router.post('/registrate', makeRegistratorController.handle)

export default router
