import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { BoardroomService } from './boardroom.service';
import { CreateBoardroomDto, UpdateBoardroomDto } from './dtos/boardroom.dto';

@Controller('boardroom')
export class BoardroomController {

    constructor( private readonly boardroomService : BoardroomService ){}

    @Get()
    async getAllBoardRooms(@Query('limit') limit : string, @Query('offset') offset : string){
        return await this.boardroomService.getAllBoardrooms(Number(limit), Number(offset));
    }

    @Get(':id')
    async getBoardroomById(@Param('id') idBoardRoom : string){
        return await this.boardroomService.getBoardroomById( idBoardRoom );
    }

    @Post()
    async createBoardroom(@Body() dataBoardroom : CreateBoardroomDto){
        return await this.boardroomService.createBoardroom( dataBoardroom );
    }

    @Put(':id')
    async updateBoardroom(@Param('id') idBoardroom : string, @Body() dataBoardroom : UpdateBoardroomDto ){
        return await this.boardroomService.upateBoardroom( idBoardroom, dataBoardroom );
    }

    @Delete(':id')
    async deleteBoardroom(@Param('id') idBoardroom : string ){
        return await this.boardroomService.deleteBoardroom( idBoardroom );
    }
}
