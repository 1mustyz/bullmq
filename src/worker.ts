import { Worker } from 'bullmq';
import { processJob } from './controller';
import { bulkQueueProvider, redisClient } from './queue';

export const bulkQueueWorker = new Worker('myQueue', processJob);

bulkQueueWorker.on('completed', async (job) => {
    console.log(`Job ${job.id} completed.`);
    const activeJobs = await bulkQueueProvider.getActiveCount();
    const completedJobs = await bulkQueueProvider.getCompletedCount();
    
    console.log(activeJobs,completedJobs)
    if (activeJobs === 0 ) {
        console.log('All jobs are done processing.');
        // Perform any additional actions you need.
        
    }
  });


  bulkQueueWorker.on('failed', async (job, error) => {
    console.error(`Job ${job?.id} failed:`, error.message);
    // Handle the failed job here if needed.
  });  

// Listen for errors
bulkQueueProvider.on('error', (error) => {
    console.error('Queue error:', error);
  });
  
  // Gracefully close the connections on application exit
process.on('exit', async () => {
    await bulkQueueProvider.close();
    await bulkQueueWorker.close();
    redisClient.quit();
});

// export default bulkQueueWorker    