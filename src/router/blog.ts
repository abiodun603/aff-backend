import express from 'express'

import { isAuthenticated } from '../middlewares'
import { createBlogPost, getBlogPost } from '../controllers/blog.controller'

export default ( router: express.Router ) => {
  router.post("/blog", isAuthenticated, createBlogPost)
  router.get("/blog", isAuthenticated, getBlogPost)
}