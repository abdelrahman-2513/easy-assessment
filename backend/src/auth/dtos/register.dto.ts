import { IsEmail,  IsString, Matches, MinLength } from 'class-validator';
// import { IsEmailUnique } from 'src/auth/validators/isUniqueEmail.validator';

export class RegisterDTO {
  @IsEmail()
//   @IsEmailUnique({message:"Email Already Exists"})
  email: string;

  @IsString()
  @MinLength(3, { message: 'Name must be at least 3 characters long' })
  name: string;

  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
    message:
      'Password must contain at least one letter, one number, and one special character',
  })
  password: string;
}