import express from 'express';
import submissionRouter from './submission.router';

const v2Router = express.Router();

v2Router.use('/submissions', submissionRouter);

export default v2Router;