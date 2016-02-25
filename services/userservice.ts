/// <reference path="../typings/node/node.d.ts"/>
/// <reference path="./IService.ts"/>


import {IUserModel} from "../models/IUser";
var bcrypt = require('bcryptjs'),
    User = require('../models/user'),
    deferred = global.Q.defer(),
    indicative = new (require('indicative'))();

class UserService implements Services.IService<IUserModel> {

    private validation_rules = {
                                    email: 'required',
                                    password: 'required|min:3',
                                    name: 'required',
                                    gender: 'required',
                                    agerange: 'required',
                                    homecity: 'required'
                                };

    findByStartLetter(letter: string): IUserModel {
        console.log("Getting users starting with " + letter);

        var regexp = new RegExp("^"+ letter);
        return User.find({'name.first': regexp})
            .exec()
            .then(function(users) {
                return users;
            });
    }

    find(id?: string): Array<IUserModel> {
        if(!id) {
            console.log('finding all users');

            return User.find()
                .exec()
                .then(function(users) {
                    console.log(users);
                    return users; // returns a promise
                })
                .catch(function(err){
                    // just need one of these
                    console.log('error:', err);
                });
        }
        else {
            console.log('finding user with Id  ' + id);
            return User.findById(id)
                .exec()
                .then(function (user) {
                    return user;
                });
        }
    }

    findByEmail (email: string): IUserModel {
        console.log('finding user with email ' + email);
        return User.find({email: email})
            .exec()
            .then(function(user) {
                return user;
            });
    }

    findByIds (ids: any): Array<IUserModel> {
        return User.find({
                '_id': { $in: ids}
            })
            .exec()
            .then(function(users) {
                console.log(users);
                return users; // returns a promise
            })
            .catch(function(err){
                // just need one of these
                console.log('error:', err);
            });
    }

    validate (email: string, password: string): any {
        this.findByEmail(email)
            .then(function (user) {
                console.log("FOUND USER " + email);
                var hash = user.password;
                console.log('comparison result:' + bcrypt.compareSync(password, hash));
                if (!bcrypt.compareSync(password, hash)) {
                    console.log("PASSWORDS NOT MATCH");
                    return deferred.resolve(false);
                }
                return deferred.resolve(user);
            });
        return deferred.promise;
    }

    create (newuser: IUserModel): IUserModel {
        var self = this;
        newuser.password = bcrypt.hashSync(newuser.password, 8);


        indicative.validate(this.validation_rules, newuser)
            .then(function () {
                return self.findByEmail(newuser.email);
            })
            .then(function (user) { //case in which user already exists in db
                if (user) {
                    console.log('username already exists');
                    return deferred.resolve(false); //username already exists
                } else {
                    return user.save();
                }
            });


        return deferred.promise;
    }
}

export = UserService;
