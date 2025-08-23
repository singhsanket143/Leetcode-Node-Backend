import { ISubmission, Submission, SubmissionStatus } from "../models/submission.model";

export interface ISubmissionRepository {
    create(submissionData: Partial<ISubmission>): Promise<ISubmission>;
    findById(id: string): Promise<ISubmission | null>;
    findByProblemId(problemId: string): Promise<ISubmission[]>;
    deleteById(id: string): Promise<boolean>;
    updateStatus(id: string, status: SubmissionStatus): Promise<ISubmission | null>;
}

export class SubmissionRepository implements ISubmissionRepository {

    async create(submissionData: Partial<ISubmission>): Promise<ISubmission> {
        const newSubmission = await Submission.create(submissionData);
        return newSubmission;
    }

    async findById(id: string): Promise<ISubmission | null> {
        const submission = await Submission.findById(id);
        return submission;
    }
    
    async findByProblemId(problemId: string): Promise<ISubmission[]> {
        const submissions = await Submission.find({ problemId });
        return submissions;
    }

    async deleteById(id: string): Promise<boolean> {
        const result = await Submission.findByIdAndDelete(id);
        return result !== null;
    }

    async updateStatus(id: string, status: SubmissionStatus): Promise<ISubmission | null> {
        const submission = await Submission.findByIdAndUpdate(id, { status }, { new: true });
        return submission;
    }
}