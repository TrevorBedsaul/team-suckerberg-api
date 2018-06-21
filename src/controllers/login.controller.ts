import { repository } from "@loopback/repository";
import { post, get, requestBody, HttpErrors } from "@loopback/rest";
import { UserRepository } from "../repositories/user.repository";
import { User } from "../models/user";
import { sign, verify } from "jsonwebtoken";
import * as bcrypt from 'bcrypt';

export class LoginController {

  constructor(
    @repository(UserRepository) private userRepo: UserRepository
  ) { }

  @post('/login')
  async loginUser(@requestBody() user: User): Promise<any> {
    // Check that email and password are both supplied
    if (!user.email || !user.password) {
      throw new HttpErrors.Unauthorized('invalid credentials');
    }

    //user.password = await bcrypt.hash(user.password, 10);
    // Check that email and password are valid
    let userExists: boolean = !!(await this.userRepo.count({
      and: [
        { email: user.email }
      ],
    }));

    if (!userExists) {
      throw new HttpErrors.Unauthorized('user does not exist');
    }

    var userList = await this.userRepo.find();
    for (var i = 0; i < userList.length; i++) {
      var element = userList[i];
      if (user.email == element.email && bcrypt.compare(element.password, user.password)) {
        console.log("USER: " + user.email);
        var jwt = sign(
          {
            user: {
              id: element.id,
              firstname: element.firstname,
              lastname: element.lastname,
              email: element.email,
            }
          },
          'secret-key',
          {
            issuer: 'auth.ix.co.za',
            audience: 'ix.co.za'
          }
        );
        return {
          token: jwt
        };
      }
    }
  }
}