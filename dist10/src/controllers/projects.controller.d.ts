import { Project } from "../models/project";
import { ProjectRepository } from "../repositories/project.repository";
export declare class ProjectsController {
    private projectRepo;
    constructor(projectRepo: ProjectRepository);
    getProjectsList(): Promise<Array<Project>>;
    getProjectByID(id: number): Promise<Project>;
}
