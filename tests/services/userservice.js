var bcrypt = require('bcryptjs'),
    deferred = Q.defer(),
    MongoService = require('../datalayer/mongodb_repository'),
    inherits     = require('util').inherits,
    indicative = new (require('indicative'))();

var tablename = 'users';

function UserService() {
    MongoService.call(this);
}
inherits(UserService, MongoService);

var validation_rules = {
    email: 'required',
    password: 'required|min:3',
    name: 'required',
    gender: 'required',
    agerange: 'required',
    homecity: 'required'
};

UserService.prototype.All = function() {
    console.log('finding all users');
    return this.all(tablename);
}

UserService.prototype.FindByStartLetter = function(letter) {
    console.log("Getting users for tablename " + tablename);
    return this.find(tablename, { name : new RegExp('^' + letter, 'i') });
}

UserService.prototype.FindByEmail = function(email) {
    console.log('finding user ' + email);
    return this.single(tablename, {'email': email});
}

UserService.prototype.FindById = function(id) {
    console.log('finding user with Id  ' + id);
    return this.findById(tablename, id);
}

UserService.prototype.FindByIds = function(ids) {
    return this.findByIds(tablename, ids);
}

UserService.prototype.validateUser = function (email, password) {
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

UserService.prototype.CreateUser = function(email, password, name, gender, agerange, homecity) {
    var hash = bcrypt.hashSync(password, 8);
    var self = this;
    var newuser = { email: email, password: hash, name: name, gender: gender, agerange: agerange, homecity: homecity };

    indicative.validate(validation_rules,newuser)
             .then(function(){
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

module.exports = UserService;