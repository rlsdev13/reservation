import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { CreateReservationsDto } from './dtos/reservations.dto';
import { ReservationsService } from './reservations.service';

@Controller('reservations')
@UseGuards(JwtAuthGuard)
export class ReservationsController {
    constructor(private readonly reservationService : ReservationsService){}

    @Post()
    async createReservation(@Body() dataReservation : CreateReservationsDto){
        return await this.reservationService.createReservation( dataReservation );
    }
}
