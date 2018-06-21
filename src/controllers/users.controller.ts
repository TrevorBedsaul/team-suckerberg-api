import { repository } from "@loopback/repository";
import { UserRepository } from "../repositories/user.repository";
import { post, get, requestBody, param, HttpErrors } from "@loopback/rest";
import { User } from "../models/user";
import { request } from "http";
import { verify } from "jsonwebtoken";

export class UsersController {

  constructor(
    @repository(UserRepository) private userRepo: UserRepository
  ) { }

  @get('/users')
  async getAllUsers(): Promise<Array<User>> {
    return await this.userRepo.find();
  }

  @get('/user/token')
  async getUserByKey(@param.query.string('token') token:any ): Promise<any> {
    if (!token) {
      throw new HttpErrors.Unauthorized(`Need a token`);
    }
    try{
      var jwtBody = verify(token,'secret-key');;
      return jwtBody;
    }
    catch (err) {
      throw new HttpErrors.BadRequest('JWT invalid')
    }
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

  @get('/users/{email}')
  async getUserByEmail(@param.path.string('email') email: string): Promise<User> {
    try {
      var users = await this.userRepo.find({
        where: {
          email: email
        }
      });
      return users[0];
    }
    catch{
      throw new HttpErrors.Unauthorized('user does not exist');
    }
  }
}