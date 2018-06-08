import { Post } from "../models/post";
import { PostRepository } from "../repositories/post.repository";
export declare class PostsController {
    private postRepo;
    constructor(postRepo: PostRepository);
    makePost(post: Post): Promise<Post>;
}
