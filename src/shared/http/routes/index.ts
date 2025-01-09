import { Router } from 'express'
import * as registrator from '@registrator/routes'
const routes: Router = Router()

routes.use('/api', registrator.default)

export default routes
