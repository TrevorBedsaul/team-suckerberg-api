"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const post_1 = require("../models/post");
const post_repository_1 = require("../repositories/post.repository");
let PostsController = class PostsController {
    constructor(postRepo) {
        this.postRepo = postRepo;
    }
    async makePost(post) {
        return await this.postRepo.create(post);
    }
};
__decorate([
    rest_1.post('/posts'),
    __param(0, rest_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [post_1.Post]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "makePost", null);
PostsController = __decorate([
    __param(0, repository_1.repository(post_repository_1.PostRepository)),
    __metadata("design:paramtypes", [post_repository_1.PostRepository])
], PostsController);
exports.PostsController = PostsController;
//# sourceMappingURL=posts.controller.js.map