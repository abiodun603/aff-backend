import express from 'express'

import { createCategory, getCategoryForUser } from "../controllers/category.controller"
import { isAuthenticated } from '../middlewares'

export default ( router: express.Router ) => {
  router.post("/category", isAuthenticated, createCategory)
  router.get("/category", isAuthenticated, getCategoryForUser)
}