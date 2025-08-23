import { CreateProblemDto, UpdateProblemDto } from "../validators/problem.validator";
import { IProblem } from "../models/problem.model";
import { IProblemRepository } from "../repositories/problem.repository";
import { BadRequestError, NotFoundError } from "../utils/errors/app.error";
import { sanitizeMarkdown } from "../utils/markdown.sanitizer";

export interface IProblemService {
    createProblem(problem: CreateProblemDto): Promise<IProblem>;
    getProblemById(id: string): Promise<IProblem | null>;
    getAllProblems(): Promise<{ problems: IProblem[], total: number}>;
    updateProblem(id: string, updateData: UpdateProblemDto): Promise<IProblem | null>;
    deleteProblem(id: string): Promise<boolean>;
    findByDifficulty(difficulty: "easy" | "medium" | "hard"): Promise<IProblem[]>;
    searchProblems(query: string): Promise<IProblem[]>;
}

export class ProblemService implements IProblemService {

    private problemRepository: IProblemRepository;

    constructor(problemRepository: IProblemRepository) { // constructor based dependency injection
        this.problemRepository = problemRepository;
        console.log("ProblemService constructor called");
    }

    async createProblem(problem: CreateProblemDto): Promise<IProblem> {
        console.log("problem service", problem);
        const sanitizedPayload = {
            ...problem,
            description: await sanitizeMarkdown(problem.description),
            editorial: problem.editorial && await sanitizeMarkdown(problem.editorial)
        }
        return await this.problemRepository.createProblem(sanitizedPayload);
    }

    async getProblemById(id: string): Promise<IProblem | null> {
        const problem = await this.problemRepository.getProblemById(id);
        if(!problem) {
            throw new NotFoundError("Problem not found");
        }
        return problem;
    }

    async getAllProblems(): Promise<{ problems: IProblem[], total: number}> {
        return await this.problemRepository.getAllProblems();
    }

    async updateProblem(id: string, updateData: UpdateProblemDto): Promise<IProblem | null> {
        const problem = await this.problemRepository.getProblemById(id);

        if(!problem) {
            throw new NotFoundError("Problem not found");
        }

        const sanitizedPayload: Partial<IProblem> = {
            ...updateData
        }
        if(updateData.description) {
            sanitizedPayload.description = await sanitizeMarkdown(updateData.description);
        }

        if(updateData.editorial) {
            sanitizedPayload.editorial = await sanitizeMarkdown(updateData.editorial);
        }

        return await this.problemRepository.updateProblem(id, sanitizedPayload);
    }

    async deleteProblem(id: string): Promise<boolean> {
        const result = await this.problemRepository.deleteProblem(id);
        if(!result) {
            throw new NotFoundError("Problem not found");
        }
        return result;
    }

    async findByDifficulty(difficulty: "easy" | "medium" | "hard"): Promise<IProblem[]> {
        return await this.problemRepository.findByDifficulty(difficulty);
    }

    async searchProblems(query: string): Promise<IProblem[]> {
        if(!query || query.trim() === "") {
            throw new BadRequestError("Query is required");
        }
        return await this.problemRepository.searchProblems(query);
    }
}