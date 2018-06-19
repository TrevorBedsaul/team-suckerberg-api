import { CharityRepository } from "../repositories/charity.repository";
import { Charity } from "../models/charity";
import { Project } from "../models/project";
import { ProjectRepository } from "../repositories/project.repository";
import { PostRepository } from "../repositories/post.repository";
export declare class CharitiesController {
    private charityRepo;
    private projectRepo;
    private postRepo;
    constructor(charityRepo: CharityRepository, projectRepo: ProjectRepository, postRepo: PostRepository);
    getCharitiesList(): Promise<Array<Charity>>;
    getCharityByID(id: number): Promise<Charity>;
    getAllCharityProjects(id: number): Promise<Array<Project>>;
}
