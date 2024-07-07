// src/types/express.d.ts
import { IUser } from '../db/models/users'; // Adjust the path as necessary

declare module 'express-serve-static-core' {
  interface Request {
    identity?: IUser;
  }
}