import { IsString, IsEmail, IsOptional } from 'class-validator';

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

export class UpdateUserDto{
    @IsOptional()
    @IsString()
    name : string;

    @IsOptional()
    @IsString()
    lastNameF : string;

    @IsOptional()
    @IsString()
    lastNameM : string;

    @IsOptional()
    @IsEmail()
    email : string;
}