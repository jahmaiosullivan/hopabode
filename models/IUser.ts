/// <reference path="../typings/mongoose.d.ts"/>
import * as mongoose from 'mongoose';

export interface IUserModel extends mongoose.Document {
    username: String,
    password: String    ,
    logourl: String
}