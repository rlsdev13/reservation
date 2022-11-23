import { EntityRepository } from '@mikro-orm/mongodb';
import { InjectRepository } from '@mikro-orm/nestjs';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateReservationsDto } from './dtos/reservations.dto';
import { Reservations } from './reservations.entity';
import dayjs from 'dayjs';

@Injectable()
export class ReservationsService {

    constructor(@InjectRepository(Reservations) private readonly reservationRepo : EntityRepository<Reservations>){}

    //reservar solo maximo de 2hrs

    //
    async createReservation( data : CreateReservationsDto) : Promise<any>{
        // 2hrs = 7200s
        const time = Number(process.env.TIME_MAX_RESERV_SECONDS); 
        const dateStart = dayjs(data.dateStart);
        const dateEnd = dayjs(data.dateEnd);
        const diff = dateEnd.diff( dateStart, 'seconds' );
        const currentDate = dayjs();
        
        if( currentDate > dateStart ){
            throw new HttpException(`The start date should be greater than the current date`, HttpStatus.BAD_REQUEST);
        }

        if( dateStart > dateEnd ){
            throw new HttpException(`The start date is greater than the end date`, HttpStatus.BAD_REQUEST);
        }

        if( diff > time){
            throw new HttpException(`You can only reserve the room for max 2 hours`, HttpStatus.BAD_REQUEST);
        }

        const newReservation = await this.reservationRepo.create( data );
        await this.reservationRepo.persistAndFlush(newReservation);

        return newReservation;
    }

}
