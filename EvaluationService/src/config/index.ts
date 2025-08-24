// This file contains all the basic configuration logic for the app server to work
import dotenv from 'dotenv';

type ServerConfig = {
    PORT: number,
    PROBLEM_SERVICE: string,
    SUBMISSION_SERVICE: string
}

function loadEnv() {
    dotenv.config();
    console.log(`Environment variables loaded`);
}

loadEnv();

export const serverConfig: ServerConfig = {
    PORT: Number(process.env.PORT) || 3003,
    PROBLEM_SERVICE: process.env.PROBLEM_SERVICE || "http://localhost:3000/api/v1",
    SUBMISSION_SERVICE: process.env.SUBMISSION_SERVICE || "http://localhost:3001/api/v1"
};