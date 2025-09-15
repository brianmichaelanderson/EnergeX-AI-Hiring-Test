import express from 'express';
import dotenv from 'dotenv';
import postsRouter from './routes/posts.js'
import type { Request, Response, NextFunction } from 'express';

dotenv.config();
const app = express();

app.use(express.json());

app.use('/posts', postsRouter);

// Global error handler
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error('Global error handler:', err);
    res.status(500).send('Internal Server Error');
});

export default app;