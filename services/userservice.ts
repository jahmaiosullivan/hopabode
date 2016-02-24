/// <reference path="./IService.ts"/>

var bcrypt = require('bcryptjs'),
    deferred = Q.defer(),
    User = require('../models/user'),
    indicative = new (require('indicative'))();

class UserService implements Services.IService<User> {

    private validation_rules = {
                                    email: 'required',
                                    password: 'required|min:3',
                                    name: 'required',
                                    gender: 'required',
                                    agerange: 'required',
                                    homecity: 'required'
                                };

    findByStartLetter(letter: string): Model<User> {
        console.log("Getting users starting with " + letter);

        var regexp = new RegExp("^"+ letter);
        return User.find({'name.first': regexp})
            .exec()
            .then(function(users) {
                return users;
            });
    },

    find(id?: string): ArrayList<Model<User>> {
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
    },

    findByEmail (email: string): Model<User> {
        console.log('finding user with email ' + email);
        return User.find({email: email})
            .exec()
            .then(function(user) {
                return user;
            });
    },

    findByIds (ids: any): ArrayList<Model<User>> {
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
        this.FindByEmail(email)
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

    create (email: string, password: string, name: string, gender: string, agerange: string, homecity: string): any {
        var hash = bcrypt.hashSync(password, 8);
        var self = this;
        var newuser = {email: email, password: hash, name: name, gender: gender, agerange: agerange, homecity: homecity};

        indicative.validate(this.validation_rules, newuser)
            .then(function () {
                return self.FindByEmail(email);
            })
            .then(function (user) { //case in which user already exists in db
                if (user) {
                    console.log('username already exists');
                    return deferred.resolve(false); //username already exists
                } else {
                    return self.save(tablename, newuser)
                        .then(function (user) {
                            console.log('created a new user');
                            return deferred.resolve(user);
                        });
                }
            });


        return deferred.promise;
    }
}

export = UserService;
