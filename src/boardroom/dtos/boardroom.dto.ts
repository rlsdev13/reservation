import { IsOptional, IsString } from 'class-validator';

export class CreateBoardroomDto{
    @IsString()
    name : string;

    @IsString()
    imageUrl : string;

    @IsString()
    description : string;
}

export class UpdateBoardroomDto{
    @IsOptional()
    @IsString()
    name : string;

    @IsOptional()
    @IsString()
    imageUrl : string;

    @IsOptional()
    @IsString()
    description : string;
}