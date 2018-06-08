import { repository } from "@loopback/repository";
import { UserRepository } from "../repositories/user.repository";
import { post, get, requestBody, param, HttpErrors } from "@loopback/rest";
import { User } from "../models/user";
import { request } from "http";


export class UsersController {

  constructor(
    @repository(UserRepository) private userRepo: UserRepository
  ) { }

  @get('/users')
  async getAllUsers(): Promise<Array<User>> {
    return await this.userRepo.find();
  }


  @get('/users/{id}')
  async getUserByID(@param.path.number('id') id: number): Promise<User> {
    try {
      return await this.userRepo.findById(id);
    }
    catch{
      throw new HttpErrors.Unauthorized('user does not exist');
    }
  }
}