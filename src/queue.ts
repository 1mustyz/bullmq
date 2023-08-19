import { Queue, Worker } from 'bullmq';
import Redis from 'ioredis';

// Create a Redis client instance
export const redisClient = new Redis();

// Create a queue
export const bulkQueueProvider = new Queue('myQueue', {
    connection: redisClient,
  });


  