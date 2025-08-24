import { NextFunction, Request, Response } from "express";
import logger from "../config/logger.config";
import { SubmissionService } from "../services/submission.service";

export class SubmissionController {
    private submissionService: SubmissionService;

    constructor(submissionService: SubmissionService) {
        this.submissionService = submissionService;
    }

    createSubmission = async (req: Request, res: Response, next: NextFunction) => {
        logger.info("Creating new submission", { body: req.body });
        
        const submission = await this.submissionService.createSubmission(req.body);
        
        logger.info("Submission created successfully", { submissionId: submission.id });
        
        res.status(201).json({
            success: true,
            message: "Submission created successfully",
            data: submission
        });
    };

    getSubmissionById = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        logger.info("Fetching submission by ID", { submissionId: id });
        
        const submission = await this.submissionService.getSubmissionById(id);
        
        logger.info("Submission fetched successfully", { submissionId: id });
        
        res.status(200).json({
            success: true,
            message: "Submission fetched successfully",
            data: submission
        });
    };

    getSubmissionsByProblemId = async (req: Request, res: Response, next: NextFunction) => {
        const { problemId } = req.params;
        logger.info("Fetching submissions by problem ID", { problemId });
        
        const submissions = await this.submissionService.getSubmissionsByProblemId(problemId);
        
        logger.info("Submissions fetched successfully", { 
            problemId, 
            count: submissions.length 
        });
        
        res.status(200).json({
            success: true,
            message: "Submissions fetched successfully",
            data: submissions
        });
    };

    deleteSubmissionById = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        logger.info("Deleting submission", { submissionId: id });
        
        await this.submissionService.deleteSubmissionById(id);
        
        logger.info("Submission deleted successfully", { submissionId: id });
        
        res.status(200).json({
            success: true,
            message: "Submission deleted successfully"
        });
    };

    updateSubmissionStatus = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        const { status } = req.body;
        
        logger.info("Updating submission status", { 
            submissionId: id, 
            status 
        });
        
        const submission = await this.submissionService.updateSubmissionStatus(id, status);
        
        logger.info("Submission status updated successfully", { 
            submissionId: id, 
            status 
        });
        
        res.status(200).json({
            success: true,
            message: "Submission status updated successfully",
            data: submission
        });
    };
}
