import {
  HttpException,
  Injectable,
  InternalServerErrorException,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UserService } from 'src/user/user.service';
import { AuthedUser } from './types/authedUser.type';
import { IUser } from 'src/user/interfaces';
import { ATPayload } from 'src/shared/types';
import { ConfigService } from 'src/config/config.service';
import { Request } from 'express';
import { RegisterDTO } from './dtos';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private userSVC: UserService,
    private JwtSVC: JwtService,
  ) { }


  public async signIn(
    email: string,
    enterdPassword: string,
  ): Promise<AuthedUser> {

      const user = await this.userSVC.findUserByEmail(email);
      if (!user) {
        throw new UnauthorizedException('User not found');
      }
      const validUser = await this.verifyHash(enterdPassword, user.password);
      if (!validUser) {
        throw new UnauthorizedException('wrong email or password');
      }
      const token = this.generateAccessToken(user);
      const authedUser: AuthedUser = new AuthedUser(user, token);


      return authedUser;
  
  }

  public async signUp(reqisterUser: RegisterDTO): Promise<string> {
  

      await this.userSVC.create(reqisterUser);
      return "User registered Successfully!"
    
  }

  public async getMe(request: Request): Promise<String> {

    const { user } = request;
    return `Welcome Back ${user["name"]}`;
  }

  private generateAccessToken(user: IUser): string {
    const ATPayload: ATPayload = {
      id: user._id as unknown as string,
      email: user.email,
      role: user.role,
    };
    const token = this.JwtSVC.sign(ATPayload, {
      secret: this.configService.get("JWT_SECRET", 'J0ZY74ZxzFGQK7p26IyoWIlBKAuolOwB'),
      expiresIn: '1d',
    });

    return token;
  }

  private async verifyHash(
    userPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(userPassword, hashedPassword);
  }
}