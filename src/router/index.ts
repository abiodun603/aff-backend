import express from 'express'
import authentication from './authentication';
import users from './users';
import category from './category';
import uploadS3 from './uploadS3';

const router = express.Router();

export default (): express.Router => {
  authentication(router)
  category(router)
  users(router)
  uploadS3(router)
  return router;
}