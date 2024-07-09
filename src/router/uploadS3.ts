import express from 'express';
import { isAuthenticated } from '../middlewares';
import upload from '../config/multer.config';
import {deleteFile, UploadBlogImage, viewFile } from '../controllers/image.controller'



export default(router: express.Router) => {
  router.post('/upload', upload.single("file"), isAuthenticated, UploadBlogImage)
  router.get("/file/:filename", isAuthenticated, viewFile)
  router.delete("/file/:filename", isAuthenticated, deleteFile)
}
