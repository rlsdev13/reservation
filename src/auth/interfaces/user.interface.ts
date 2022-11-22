import { ObjectId } from "@mikro-orm/mongodb";

export interface UserResponse {
    _id : ObjectId;
    name : string; 
    lastNameF : string;
    email : string;
}