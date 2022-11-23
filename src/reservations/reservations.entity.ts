import { Cascade, Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { ObjectId } from '@mikro-orm/mongodb';
import { Boardrooms } from 'src/boardroom/boardroom.entity';
import { Users } from 'src/users/users.entity';

@Entity({ tableName : 'reservations' })
export class Reservations{

    @PrimaryKey({ type : 'ObjectId' })
    _id : ObjectId;

    @ManyToOne(() => Boardrooms, { type : Boardrooms } )
    idBoardroom : Boardrooms;

    @ManyToOne(() => Users, { type : Users } )
    idUser : Users;

    @Property({ type : 'Date' })
    dateStart : Date;

    @Property({ type : 'Date' })
    dateEnd : Date;

    @Property({ type : 'Date' })
    createdAt : Date = new Date();

    @Property({ type : 'Date', onUpdate : () => new Date() })
    updatedAt : Date = new Date();
}