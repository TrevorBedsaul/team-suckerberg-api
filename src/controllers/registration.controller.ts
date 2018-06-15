import { repository } from "@loopback/repository";
import { UserRepository } from "../repositories/user.repository";
import { post, get, requestBody } from "@loopback/rest";
import { User } from "../models/user";
import * as bcrypt from 'bcrypt';


export class RegistrationController {

    constructor(
        @repository(UserRepository) private userRepo: UserRepository,
    ) { }

    @post('/registration')
    async createUser(@requestBody() user: User) {

        let hashedPassword = await bcrypt.hash(user.password, 10);

        var newUser = new User();
        newUser.firstname = user.firstname;
        newUser.lastname = user.lastname;
        newUser.email = user.email;
        newUser.id = user.id;
        newUser.password = hashedPassword;

        await this.userRepo.create(newUser);

        var otherUser = newUser;
        otherUser.password = "";
        return otherUser;
    }

}