import { Router } from 'express';
import { getAllPosts, getPostById } from '../controllers/postsController.js';

const postsRouter = Router();

// Route to get all posts
postsRouter.get('/', getAllPosts);

// Route to get a specific post by ID
postsRouter.get('/:id', getPostById);

export default postsRouter;