import { BeforeCreate, Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { ObjectId } from '@mikro-orm/mongodb';
import * as bcrypt from 'bcryptjs';

@Entity({ tableName : 'users' })
export class Users{

    @PrimaryKey({ type : 'ObjectId' })
    _id : ObjectId;

    @Property({ type : 'string' })
    name : string;

    @Property({ type : 'string' })
    lastNameF : string;

    @Property({ type : 'string' })
    lastNameM : string;

    @Property({ type : 'string', unique : true })
    email : string;

    @Property({ type : 'string' })
    password : string;

    @Property({ type : 'Date' })
    createdAt : Date = new Date();
    
    @Property({ type : 'Date', onUpdate : () => new Date() })
    updatedAt : Date = new Date();

    @Property({ type : 'boolean', default : 'false' })
    deleted : boolean = false;

    @BeforeCreate()
    async hashPassword() {
        const salt = await bcrypt.genSalt();
        this.password = await bcrypt.hash(this.password, salt);
    }    
}