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
const user_repository_1 = require("../repositories/user.repository");
const user_1 = require("../models/user");
const jsonwebtoken_1 = require("jsonwebtoken");
let LoginController = class LoginController {
    constructor(userRepo) {
        this.userRepo = userRepo;
    }
    async loginUser(user) {
        // Check that email and password are both supplied
        if (!user.email || !user.password) {
            throw new rest_1.HttpErrors.Unauthorized('invalid credentials');
        }
        //user.password = await bcrypt.hash(user.password, 10);
        // Check that email and password are valid
        let userExists = !!(await this.userRepo.count({
            and: [
                { email: user.email },
                { password: user.password },
            ],
        }));
        if (!userExists) {
            throw new rest_1.HttpErrors.Unauthorized('invalid credentials');
        }
        var user = await this.userRepo.findOne({
            where: {
                and: [
                    { email: user.email },
                    { password: user.password }
                ],
            },
        });
        var jwt = jsonwebtoken_1.sign({
            user: {
                id: user.id,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email
            }
        }, 'secret-key', {
            issuer: 'auth.ix.co.za',
            audience: 'ix.co.za'
        });
        return {
            token: jwt
        };
    }
};
__decorate([
    rest_1.post('/login'),
    __param(0, rest_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_1.User]),
    __metadata("design:returntype", Promise)
], LoginController.prototype, "loginUser", null);
LoginController = __decorate([
    __param(0, repository_1.repository(user_repository_1.UserRepository)),
    __metadata("design:paramtypes", [user_repository_1.UserRepository])
], LoginController);
exports.LoginController = LoginController;
//# sourceMappingURL=login.controller.js.map