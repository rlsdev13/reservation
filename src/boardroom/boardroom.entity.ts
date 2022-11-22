import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { ObjectId } from '@mikro-orm/mongodb';

@Entity({ tableName : 'boardrooms' })
export class Boardrooms{

    @PrimaryKey({ type : 'ObjectId' })
    _id : ObjectId;

    @Property({ type : 'string' })
    name : string;

    @Property({ type : 'string' })
    imageUrl : string;

    @Property({ type : 'string' })
    description : string;

    @Property({ type : 'Date' })
    createdAt : Date = new Date();
    
    @Property({ type : 'Date', onUpdate : () => new Date() })
    updatedAt : Date = new Date();

    @Property({ type : 'boolean', default : 'false' })
    deleted : boolean = false;
}