import express from 'express';
import {getAllPosts,createPost} from '../Controllers/posts.controller.js';
import  {verifyToken}  from '../Middleware/auth.middleware.js';

const rotuer = express.Router();
rotuer.get('/getPost', getAllPosts);
rotuer.post('/createPost',verifyToken,createPost);

export const RouterPost = rotuer;