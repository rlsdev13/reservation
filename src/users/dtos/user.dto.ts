import { IsString, IsEmail } from 'class-validator';

export class CreateUserDto{
    @IsString()
    name : string;

    @IsString()
    lastNameF : string;

    @IsString()
    lastNameM : string;

    @IsEmail()
    email : string;

    @IsString()
    password : string;
}