import express from 'express';

import { createUser, getUserByEmail } from '../db/models/users';
import { authentication, random } from '../helpers';

export const login = async ( req: express.Request, res: express.Response) => {
  try {
    const { email, password } = req.body;

    if(!email || !password) {
      return res.sendStatus(400)
    }

    const user = await getUserByEmail(email).select('+authentication.salt +authentication.password');

    if(!user) {
      return res.sendStatus(400)
    }

    // authenticate user without knowing there password using the hash comparison 
    const expectedHash = authentication(user?.authentication?.salt, password)

    if(user.authentication.password !== expectedHash) {
      return res.sendStatus(403);
    }

    const salt = random();
    user.authentication.sessionToken = authentication(salt, user._id.toString());

    await user.save();

    res.cookie('ABIODUN-AUTH', user.authentication.sessionToken, {
      domain: 'localhost',
      path: "/"
    })

    return res.status(200).json(user).send()

  } catch (error) {
    
  }
}


export const register = async ( req: express.Request, res: express.Response ) => {

  try {
    const { email, password, firstName, lastName, username } = req.body;

    console.log(email, password, username);

    if ( !email || !password  || !firstName || !lastName) {
      return res.sendStatus(400);
    }

    const existingUser = await getUserByEmail(email)

    if (existingUser) {
      console.log(existingUser, "hmmm");
      return res.status(400).json({ error: 'User already exists' });
    }

    const salt = random();

    const user = await createUser({
      username,
      firstName,
      lastName,
      email,
      authentication: {
        salt,
        password: authentication(salt, password),
      }
    })

    console.log(user)



    return res.status(200).json(user).end();
  } catch ( err ) {
    console.log( err );
    return res.sendStatus( 400 );
  }

}