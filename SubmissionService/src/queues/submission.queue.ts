import { Queue } from "bullmq";
import { createNewRedisConnection } from "../config/redis.config";
import logger from "../config/logger.config";

export const submissionQueue = new Queue("submission", {
    connection: createNewRedisConnection(),
    defaultJobOptions: {
        attempts: 3,
        backoff: {
            type: "exponential",
            delay: 2000
        }
    }
});

submissionQueue.on("error", (error) => {
    logger.error(`Submission queue error: ${error}`);
});

submissionQueue.on("waiting", (job) => {
    logger.info(`Submission job waiting: ${job.id}`);
});
