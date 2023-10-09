import {
  Injectable,
  Dependencies,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { User } from './interfaces/user.interface';
import { InjectModel } from '@nestjs/mongoose';

@Dependencies(UsersService, JwtService)
@Injectable()
export class AuthService {
  usersService: any;
  jwtService: any;
  constructor(
    usersService,
    jwtService,
    @InjectModel('User') private readonly userModel: Model<User>,
  ) {
    this.usersService = usersService;
    this.jwtService = jwtService;
  }

  async signIn(username, pass) {
    const user = await this.usersService.findOne(username);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async createUser(user: User): Promise<User> {
    const newUser = new this.userModel(user);
    return await newUser.save();
  }

  //   async signUp(username, pass, email, phone, image) {
  //     const user = await this.usersService.findOne(username);
  //     if (user?.password !== pass) {
  //       throw new UnauthorizedException();
  //     }
  //     const payload = { username: user.username, sub: user.userId };
  //     return {
  //       access_token: await this.jwtService.signAsync(payload),
  //     };
  //   }
}
