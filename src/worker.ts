import { Worker } from 'bullmq';
import { processJob } from './controller';

export const bulkQueueWorker = new Worker('myQueue', processJob);


// export default bulkQueueWorker    