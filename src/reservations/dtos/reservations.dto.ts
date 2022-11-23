import { IsDateString, IsMongoId, } from 'class-validator';

export class CreateReservationsDto{
    @IsMongoId()
    idBoardroom : string;

    @IsMongoId()
    idUser : string;

    @IsDateString()
    dateStart : Date;

    @IsDateString()
    dateEnd : Date;
}