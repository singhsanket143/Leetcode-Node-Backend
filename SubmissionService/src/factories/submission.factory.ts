import { SubmissionController } from "../controllers/submission.controller";
import { SubmissionService } from "../services/submission.service";
import { SubmissionRepository } from "../repositories/submission.repository";

export class SubmissionFactory {
    private static submissionRepository: SubmissionRepository;
    private static submissionService: SubmissionService;
    private static submissionController: SubmissionController;

    static getSubmissionRepository(): SubmissionRepository {
        if (!this.submissionRepository) {
            this.submissionRepository = new SubmissionRepository();
        }
        return this.submissionRepository;
    }

    static getSubmissionService(): SubmissionService {
        if (!this.submissionService) {
            this.submissionService = new SubmissionService(this.getSubmissionRepository());
        }
        return this.submissionService;
    }

    static getSubmissionController(): SubmissionController {
        if (!this.submissionController) {
            this.submissionController = new SubmissionController(this.getSubmissionService());
        }
        return this.submissionController;
    }
}
