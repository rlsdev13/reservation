import { EntityRepository, ObjectId } from '@mikro-orm/mongodb';
import { InjectRepository } from '@mikro-orm/nestjs';
import { HttpException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Boardrooms } from './boardroom.entity';
import { CreateBoardroomDto, UpdateBoardroomDto } from './dtos/boardroom.dto';

@Injectable()
export class BoardroomService {

    constructor(@InjectRepository(Boardrooms) private readonly boardroomRepo: EntityRepository<Boardrooms>) { }

    /**
     * function to create a new boardroom and saved
     * 
     * @param dataBoardroom data of one boardroom to be saved on the DB
     * @returns an object on Boardroom
     */
    async createBoardroom(dataBoardroom: CreateBoardroomDto): Promise<Boardrooms> {
        try {
            const newBoardroom = await this.boardroomRepo.create(dataBoardroom);
            await this.boardroomRepo.persistAndFlush(newBoardroom);
            return newBoardroom;
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException();
        }
    }

    /**
     * function for get all the Boardrooms stored in the database (only boardrooms !deleted)
     * 
     * @param limit number of number of records to get 
     * @param offset since what record start
     * @returns an object with an boardrooms array and the total of users 
     */
    async getAllBoardrooms(limit: number = 5, offset: number = 0): Promise<{ boardrooms: Boardrooms[], total: number }> {
        // try {
            const [boardrooms, total] = await Promise.all([
                this.boardroomRepo.find({ deleted: false }, 
                    { limit, offset, 
                        fields : [
                            'name',
                            'description',
                            'imageUrl',
                            {reservation : [
                                'dateStart',
                                'dateEnd',
                                'idUser',
                                {idUser : [
                                    'name',
                                    'email'
                                ]}
                            ]},
                            
                        ] 
                    }),
                this.boardroomRepo.count({ deleted: false })
            ]);

            return {
                boardrooms,
                total
            }
        // } catch (error) {
            // console.log(error);
            // throw new HttpException(error,HttpStatus.INTERNAL_SERVER_ERROR);
        // }
    }

    /**
     * function to get a boardroom by id
     * 
     * @param idBoardroom id of the boardroom 
     * @returns the data of the boardroom if exist
     */
    async getBoardroomById( idBoardroom : string ): Promise<Boardrooms>{
        try {
            const boardroom = await this.boardroomRepo.findOne({ _id : new ObjectId(idBoardroom), 
                deleted : false },{
                    fields : [
                        'name',
                        'description',
                        'imageUrl',
                        {reservation : [
                            'dateStart',
                            'dateEnd',
                            'idUser',
                            {idUser : [
                                'name',
                                'email'
                            ]}
                        ]},
                        
                    ] 
                })

            if( !boardroom ){
                throw new Error('Boardroom not found');
            }

            return boardroom;
        } catch (error) {
            throw new HttpException(error,HttpStatus.NOT_FOUND);
        }
    }

    /**
     * fucntion to update the info of one boardroom 
     * 
     * @param idBoardroom id of the boardroom the be updated
     * @param dataBoardroom new data of the boardroom
     * @returns the object of the boardroom updated
     */
    async upateBoardroom( idBoardroom : string, dataBoardroom : UpdateBoardroomDto ) : Promise<Boardrooms>{
        try {
            const boardroom = await this.boardroomRepo.findOne({ _id : new ObjectId(idBoardroom), deleted : false })
             
            if( !boardroom ){
                throw new Error('Boardroom not found');
            }

            Object.assign( boardroom, dataBoardroom );
            await this.boardroomRepo.persistAndFlush(boardroom);

            return boardroom;
        } catch (error) {
            throw new HttpException(error,HttpStatus.NOT_FOUND);
        }
    }

    /**
     * Function to soft delete a boardroom
     *  
     * @param idBoardroom id of the boardroom to be soft deleted
     * @returns the object of the boardroom deleted
     */
    async deleteBoardroom( idBoardroom : string ) : Promise<Boardrooms>{
        try {
            const boardroom = await this.boardroomRepo.findOne({ _id : new ObjectId( idBoardroom ), deleted : false });

            if(!boardroom){
                throw new Error('Board not found');
            }

            boardroom.deleted = true;
            await this.boardroomRepo.persistAndFlush(boardroom);

            return boardroom;
        } catch (error) {
            throw new HttpException(error,HttpStatus.NOT_FOUND);
        }
    }

}
