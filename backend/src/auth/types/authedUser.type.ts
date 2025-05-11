import { Types } from "mongoose";
import { IUser } from "src/user/interfaces";

export class LoggedUser implements IUser {
  id?: Types.ObjectId;
  email: string;
  name: string;
  role: string;


  constructor(user: IUser) {
    this.id = user._id;
    this.email = user.email;
    this.name = user.name;
    this.role = user.role;

  }
}
export class AuthedUser {
  user: IUser;

  access_token: string;

  constructor(user: IUser, accessToken: string) {
    this.user = new LoggedUser(user);
    this.access_token = accessToken;
  }
}