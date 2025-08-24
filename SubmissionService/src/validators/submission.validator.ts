import { z } from "zod";
import { SubmissionLanguage, SubmissionStatus } from "../models/submission.model";

// Schema for creating a new submission
export const createSubmissionSchema = z.object({
    problemId: z.string().min(1, "Problem ID is required"),
    code: z.string().min(1, "Code is required"),
    language: z.nativeEnum(SubmissionLanguage, {
        errorMap: () => ({ message: "Language must be either 'cpp' or 'python'" })
    })
});

// Schema for updating submission status
export const updateSubmissionStatusSchema = z.object({
    status: z.nativeEnum(SubmissionStatus, {
        errorMap: () => ({ message: "Status must be one of: pending, compiling, running, accepted, wrong_answer" })
    })
});

// Schema for query parameters (if needed for filtering)
export const submissionQuerySchema = z.object({
    status: z.nativeEnum(SubmissionStatus).optional(),
    language: z.nativeEnum(SubmissionLanguage).optional(),
    limit: z.string().transform(val => parseInt(val)).pipe(z.number().min(1).max(100)).optional(),
    page: z.string().transform(val => parseInt(val)).pipe(z.number().min(1)).optional()
});
