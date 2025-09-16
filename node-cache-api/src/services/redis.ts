import { createClient } from 'redis';
import type { Post } from '../types/Post.ts';

const { REDIS_HOST, REDIS_PORT, REDIS_PASSWORD, REDIS_TTL } = process.env;

if (!REDIS_HOST || !REDIS_PORT || !REDIS_TTL) {
  throw new Error('Missing Redis environment variable(s)');
}

//ternary check for pwd for url w/ pwd or w/out
const redisUrl = REDIS_PASSWORD
  ? `redis://:${REDIS_PASSWORD}@${REDIS_HOST}:${REDIS_PORT}`
  : `redis://${REDIS_HOST}:${REDIS_PORT}`;

const client = createClient({ url: redisUrl });

client.on('error', (err) => console.error('Redis client error.', err));

await client.connect();

// using node: prefix for all keys to avoid collisions w/ other apps
export const getCachedPosts = async (): Promise<string | null> => {
  const cached = await client.get('node:posts');
  if (cached) {
    console.log('Cache hit: node:posts');
  } else {
    console.log('Cache miss: node:posts');
  }
  return cached;
};

// Pass options object to set expiry time via env var
export const setCachedPosts = async (posts: Post[]): Promise<void> => {
  await client.set('node:posts', JSON.stringify(posts), {
    EX: Number(REDIS_TTL),
  });
};

export const getCachedPostById = async (id: number): Promise<string | null> => {
  const key = `node:post:${id}`;
  const cached = await client.get(key);
  if(cached) {
    console.log('Cache hit: ', key);
  } else {
    console.log('Cache miss: ', key);
  }
  return cached;
};

export const setCachedPostById = async (
  id: number,
  post: Post
): Promise<void> => {
  await client.set(`node:post:${id}`, JSON.stringify(post), {
    EX: Number(REDIS_TTL),
  });
};
