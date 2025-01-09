import express from 'express'
import { makeAuthenticatorController } from '@authenticator/controllers'

const router = express.Router()

router.post('/authenticate', makeAuthenticatorController.handle)
