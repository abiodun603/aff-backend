import express from 'express'

import { getAllUsers } from '../controllers/users.controller'
import { isAuthenticated } from '../middlewares'

export default (router: express.Router) => {
  router.get("/users", isAuthenticated, getAllUsers)
}