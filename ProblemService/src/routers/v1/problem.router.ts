import express from 'express';
import {  validateRequestBody, validateRequestParams } from '../../validators';
import { createProblemSchema, findByDifficultySchema, updateProblemSchema } from '../../validators/problem.validator';
import { ProblemController } from '../../controllers/problem.controller';

const problemRouter = express.Router();


problemRouter.post(
    '/', 
    validateRequestBody(createProblemSchema), 
    ProblemController.createProblem);


problemRouter.get(
    '/:id',
    ProblemController.getProblemById);


problemRouter.get(
    '/', 
    ProblemController.getAllProblems);


problemRouter.put(
    '/:id', 
    validateRequestBody(updateProblemSchema),
    ProblemController.updateProblem);


problemRouter.delete(
    '/:id', 
    ProblemController.deleteProblem);

problemRouter.get(
    '/difficulty/:difficulty', 
    validateRequestParams(findByDifficultySchema),
    ProblemController.findByDifficulty);

problemRouter.get(
    '/search', 
    ProblemController.searchProblems);

export default problemRouter;