/// <reference path="../typings/mongoose.d.ts"/>
import * as mongoose from 'mongoose';

export interface IPostModel extends mongoose.Document {
    title: String,
    content: String,
    images: [String]
}