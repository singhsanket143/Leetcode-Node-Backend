import mongoose, { Document } from "mongoose";

export interface ITestcase {
    input: string;
    output: string;
}

export interface IProblem extends Document {
    title: string;
    description: string;
    difficulty: "easy" | "medium" | "hard";
    createdAt: Date;
    updatedAt: Date;
    editorial?: string;
    testcases: ITestcase[];
}

const testSchema = new mongoose.Schema<ITestcase>({
    input: {
        type: String,
        required: [true, "Input is required"],
        trim: true,
    },
    output: {
        type: String,
        required: [true, "Output is required"],
        trim: true,
    },
}, {
    // _id: false // can be enabled if we don't want to use the default _id field
})

const problemSchema = new mongoose.Schema<IProblem>({
    title: {
        type: String,
        required: [true, "Title is required"],
        maxLength: [100, "Title must be less than 100 characters"],
        trim: true,
    },
    description: {
        type: String,
        required: [true, "Description is required"],
        trim: true,
    },
    difficulty: {
        type: String,
        enum: {
            values: ["easy", "medium", "hard"],
            message: "Invalid difficulty level",
        },
        default: "easy",
        required: [true, "Difficulty level is required"],
    },
    editorial: {
        type: String,
        trim: true
    },
    testcases: [testSchema]
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

problemSchema.index({ title: 1 }, { unique: true }); // index on title field
problemSchema.index({ difficulty: 1 }); // index on difficulty field

export const Problem = mongoose.model<IProblem>("Problem", problemSchema);