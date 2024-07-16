import express from 'express';

import { get, merge } from 'lodash'


import { getUserBySessionToken } from '../db/models/users';

export const isAuthenticated = async(req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    // const sessionToken = req.cookies['ABIODUN-AUTH']
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.sendStatus(403);
    }

    const sessionToken = authHeader.split(' ')[1];

    if(!sessionToken) {
      return res.sendStatus(403)
    }

    const existingUser = await getUserBySessionToken(sessionToken);

    if(!existingUser) {
      return res.sendStatus(403);
    }

    merge(req, { identity: existingUser })

    return next()
  } catch (error) {
    
  }
}