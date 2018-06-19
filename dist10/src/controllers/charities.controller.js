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
const charity_repository_1 = require("../repositories/charity.repository");
const rest_1 = require("@loopback/rest");
const project_repository_1 = require("../repositories/project.repository");
const post_repository_1 = require("../repositories/post.repository");
let CharitiesController = class CharitiesController {
    constructor(charityRepo, projectRepo, postRepo) {
        this.charityRepo = charityRepo;
        this.projectRepo = projectRepo;
        this.postRepo = postRepo;
    }
    async getCharitiesList() {
        return await this.charityRepo.find();
    }
    async getCharityByID(id) {
        try {
            return await this.charityRepo.findById(id);
        }
        catch (_a) {
            throw new rest_1.HttpErrors.Unauthorized('charity does not exist');
        }
    }
    async getAllCharityProjects(id) {
        return await this.projectRepo.find();
    }
};
__decorate([
    rest_1.get('/charities'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CharitiesController.prototype, "getCharitiesList", null);
__decorate([
    rest_1.get('/charities/{id}'),
    __param(0, rest_1.param.path.number('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CharitiesController.prototype, "getCharityByID", null);
__decorate([
    rest_1.get('/charities/{id}/projects'),
    __param(0, rest_1.param.path.number('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CharitiesController.prototype, "getAllCharityProjects", null);
CharitiesController = __decorate([
    __param(0, repository_1.repository(charity_repository_1.CharityRepository)),
    __param(1, repository_1.repository(project_repository_1.ProjectRepository)),
    __param(2, repository_1.repository(post_repository_1.PostRepository)),
    __metadata("design:paramtypes", [charity_repository_1.CharityRepository,
        project_repository_1.ProjectRepository,
        post_repository_1.PostRepository])
], CharitiesController);
exports.CharitiesController = CharitiesController;
//# sourceMappingURL=charities.controller.js.map