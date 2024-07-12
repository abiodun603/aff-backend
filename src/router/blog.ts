import express from 'express'

import { isAuthenticated } from '../middlewares'
import { createBlogPost } from '../controllers/blog.controller'

export default ( router: express.Router ) => {
  router.post("/blog", isAuthenticated, createBlogPost)
}