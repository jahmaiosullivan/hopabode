/// <reference path="../typings/mongoose.d.ts"/>
import * as mongoose from 'mongoose';

export interface ICityModel extends mongoose.Document {
    name: String,
    location: String,
    about?: String,
    image?: String
}