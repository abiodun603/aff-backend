import express from 'express'

import { isAuthenticated } from '../middlewares'
import { createBlogPost, deleteProductPost, getBlogPost, getProductById, productCount, updateProductPost } from '../controllers/blog.controller'

export default ( router: express.Router ) => {
  router.post("/product", isAuthenticated, createBlogPost)
  router.get("/products", isAuthenticated, getBlogPost)
  router.get("/product/:id", isAuthenticated, getProductById)
  router.get("/product/counts", isAuthenticated, productCount)
  router.patch("/product/:id", isAuthenticated, updateProductPost)
  router.delete("/product/:id", isAuthenticated, deleteProductPost);
}