import express from 'express'

import { isAuthenticated } from '../middlewares'
import { createBlogPost, getBlogPost, getProductById } from '../controllers/blog.controller'

export default ( router: express.Router ) => {
  router.post("/blog", isAuthenticated, createBlogPost)
  router.get("/blog", isAuthenticated, getBlogPost)
  router.get("/blog/:id", isAuthenticated, getProductById)
}