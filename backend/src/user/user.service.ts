import {
  BadRequestException,
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
  
      const userExists = await this.userModel.findOne({ email: createUserDto.email });
      if (userExists) {
        throw new BadRequestException('Email already in use.');
      }

      const newUser = await this.userModel.create(createUserDto);
      return newUser;
   
  }


  async findAll(): Promise<User[]> {
    try {
      return await this.userModel.find().exec();
    } catch (error) {
      throw new InternalServerErrorException('Unable to fetch users.');
    }
  }


  async findOne(id: string): Promise<User> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid user ID format.');
    }

    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException(`User with ID "${id}" not found.`);
    }

    return user;
  }


  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid user ID format.');
    }

    const updated = await this.userModel.findByIdAndUpdate(id, updateUserDto, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      throw new NotFoundException(`User with ID "${id}" not found.`);
    }

    return updated;
  }


  async remove(id: string): Promise<{ message: string }> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid user ID format.');
    }

    const result = await this.userModel.findByIdAndDelete(id);

    if (!result) {
      throw new NotFoundException(`User with ID "${id}" not found.`);
    }

    return { message: 'User deleted successfully.' };
  }

    async findUserByEmail(email: string): Promise<User> {
    try {
      const user = await this.userModel.findOne({ email }).exec();

      return user;
    } catch (error) {
      throw new InternalServerErrorException('Failed to find user by email.');
    }
  }
}
