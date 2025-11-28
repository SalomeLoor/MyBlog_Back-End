import express from 'express';
import { login, getOneUser,createUsers} from '../Controllers/users.controller.js';
import  {verifyToken}  from '../Middleware/auth.middleware.js';

const rotuer = express.Router();
rotuer.get('/user',verifyToken, getOneUser);
rotuer.post('/register', createUsers);//nunca debe llevar un token
rotuer.post('/login', login); //nunca debe llevar un token

export const RouterUser = rotuer;