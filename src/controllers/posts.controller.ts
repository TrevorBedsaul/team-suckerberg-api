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

export class PostsController {

    constructor(
        @repository(PostRepository) private postRepo: PostRepository
    ) { }

    @post('/posts')
    async makePost(@requestBody() post: Post): Promise<Post> {
        return await this.postRepo.create(post);
    }
}