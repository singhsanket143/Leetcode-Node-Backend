import { Document, Schema, model } from "mongoose";

export enum SubmissionStatus {
    PENDING = "pending",
    COMPILING = "compiling",
    RUNNING = "running",
    ACCEPTED = "accepted",
    WRONG_ANSWER = "wrong_answer",
}

export enum SubmissionLanguage {
    CPP = "cpp",
    PYTHON = "python",
}
export interface ISubmission extends Document {
    problemId: string;
    code: string;
    language: SubmissionLanguage;
    status: SubmissionStatus;
    createdAt: Date;
    updatedAt: Date;
}

const submissionSchema = new Schema<ISubmission>({
    problemId: { 
        type: String, 
        required: [true, "Problem Id required for the submission"] 
    },
    code: { 
        type: String, 
        required: [true, "Code is required for evaluation"] 
    },
    language: { 
        type: String, 
        required: [true, "Language is required for evaluation"],
        enum: Object.values(SubmissionLanguage)
    },
    status: { 
        type: String, 
        required: true, 
        default: SubmissionStatus.PENDING,
        enum: Object.values(SubmissionStatus)
    },
}, {
    timestamps: true,
    toJSON: {
        transform: (_, record) => {
            delete (record as any).__v; // delete __v field
            record.id = record._id; // add id field
            delete record._id; // delete _id field
            return record;
        }
    }
});

submissionSchema.index({ status: 1, createdAt: -1 });

export const Submission = model<ISubmission>("Submission", submissionSchema);