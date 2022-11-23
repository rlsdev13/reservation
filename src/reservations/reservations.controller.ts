import { Body, Controller, Post } from '@nestjs/common';
import { CreateReservationsDto } from './dtos/reservations.dto';
import { ReservationsService } from './reservations.service';

@Controller('reservations')
export class ReservationsController {
    constructor(private readonly reservationService : ReservationsService){}

    @Post()
    async createReservation(@Body() dataReservation : CreateReservationsDto){
        return await this.reservationService.createReservation( dataReservation );
    }
}
