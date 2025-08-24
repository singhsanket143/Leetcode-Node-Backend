import express from 'express';
import { SubmissionFactory } from '../../factories/submission.factory';
import { validateRequestBody, validateQueryParams } from '../../validators';
import { 
    createSubmissionSchema, 
    updateSubmissionStatusSchema, 
    submissionQuerySchema 
} from '../../validators/submission.validator';

const submissionRouter = express.Router();

// Get submission controller instance from factory
const submissionController = SubmissionFactory.getSubmissionController();

// POST /submissions - Create a new submission
submissionRouter.post(
    '/', 
    validateRequestBody(createSubmissionSchema), 
    submissionController.createSubmission
);

// GET /submissions/:id - Get submission by ID
submissionRouter.get(
    '/:id', 
    submissionController.getSubmissionById
);

// GET /submissions/problem/:problemId - Get all submissions for a problem
submissionRouter.get(
    '/problem/:problemId', 
    validateQueryParams(submissionQuerySchema),
    submissionController.getSubmissionsByProblemId
);

// DELETE /submissions/:id - Delete a submission
submissionRouter.delete(
    '/:id', 
    submissionController.deleteSubmissionById
);

// PATCH /submissions/:id/status - Update submission status
submissionRouter.patch(
    '/:id/status', 
    validateRequestBody(updateSubmissionStatusSchema),
    submissionController.updateSubmissionStatus
);

export default submissionRouter;
