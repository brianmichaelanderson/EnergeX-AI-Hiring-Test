import * as services from '../services/mysql.js';
import type { Request, Response, NextFunction } from 'express';

export const getAllPosts = async(_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const posts = await services.getAllPosts();
        if(posts && posts.length > 0) {
            res.json(posts);
        } else {
            res.status(404).send('Posts not found');
        }
    } catch (error) {
        console.error('Error fetching posts:', error);
        next(error);  //send error to express global error handler
    }
}

export const getPostById = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        // Get the post ID from the request parameters & validate it's a number
        const id = Number(req.params.id);
        if(isNaN(id)) {
            res.status(400).send('Invalid post ID');
            return;  // Exit early if ID is invalid
        }
    
        const post = await services.getPostById(id);
        if(post) {
            res.json(post);  // parse to JSON & send as HTTP response
        } else {
            res.status(404).send('Post not found');
        }
    } catch (error) {
        console.error('Error fetching post by ID:', error);
        next(error);
    }
}