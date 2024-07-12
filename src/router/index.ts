import express from 'express'
import authentication from './authentication';
import users from './users';
import category from './category';
import uploadS3 from './uploadS3';
import blog from './blog';

const router = express.Router();

export default (): express.Router => {
  authentication(router)
  category(router)
  users(router)
  uploadS3(router)
  blog(router)
  return router;
}