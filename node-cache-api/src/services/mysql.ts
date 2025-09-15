import mysql from 'mysql2/promise';
import type { Post } from '../types/Post.js'

const { MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE, MYSQL_PORT } = process.env;

if (!MYSQL_HOST || !MYSQL_USER || !MYSQL_PASSWORD || !MYSQL_DATABASE) {
    throw new Error('Missing MySQL environment variable(s)')
}

const pool = mysql.createPool({
    host: MYSQL_HOST,
    user: MYSQL_USER,
    password: MYSQL_PASSWORD,
    database: MYSQL_DATABASE,
    port: Number(MYSQL_PORT), //convert string to number
    waitForConnections: true, // Queue connection requests if all connections are in use
    connectionLimit: 10,
    queueLimit: 5  // Maximum number of connections in the pool
});

export const getAllPosts = async (): Promise<Post[]> => {
    const [rows] = await pool.query('SELECT * FROM posts');
    return rows as Post[];
}

export const getPostById = async (id: number): Promise<Post | undefined> => {
    // destructure only the rows from the result
    const [rows] = await pool.query('SELECT * FROM posts WHERE id = ?', [id]);
    return (rows as Post[])[0];
}