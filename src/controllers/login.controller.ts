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
        { email: user.email },
        { password: user.password },
      ],
    }));

    if (!userExists) {
      throw new HttpErrors.Unauthorized('invalid credentials');
    }

    var user = await this.userRepo.findOne({
      where: {
        and: [
          { email: user.email },
          { password: user.password }
        ],
      },
    });
    
    var jwt = sign(
      {
        user: {
          id: user.id,
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email
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