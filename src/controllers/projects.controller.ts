import { repository, WhereBuilder } from "@loopback/repository";
import { request } from "http";
import { UserRepository } from "../repositories/user.repository";
import { CharityRepository } from "../repositories/charity.repository";
import { post, get, requestBody, param, HttpErrors } from "@loopback/rest";
import { User } from "../models/user";
import { Charity } from "../models/charity";
import { Project } from "../models/project";
import { Post } from "../models/post";
import { ProjectRepository } from "../repositories/project.repository";
import { PostRepository } from "../repositories/post.repository";

export class ProjectsController {

    constructor( 
        @repository(ProjectRepository) private projectRepo: ProjectRepository
    ) { }

    @get('/projects')
    async getProjectsList(): Promise<Array<Project>> {
        return await this.projectRepo.find();
    }

    @get('/projects/{id}')
    async getProjectByID(@param.path.number('id') id: number): Promise<Project> {
        try {
            return await this.projectRepo.findById(id);
        }
        catch{
            throw new HttpErrors.Unauthorized('project does not exist');
        }
    }
}