import express from 'express';
import {UploadBlogImage } from '../controllers/image.controller'
import { isAuthenticated } from '../middlewares';

export default(router: express.Router) => {
  router.post('/upload', isAuthenticated, UploadBlogImage)
}
