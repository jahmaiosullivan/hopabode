var deferred = Q.defer(),
    MongoService = require('../datalayer/mongodb_repository'),
    inherits     = require('util').inherits,
    indicative = new (require('indicative'))(),
    moment = require('moment'),
    tablename = 'groups';


var validation_rules = {
    name: 'required'
};

function GroupService() {
    MongoService.call(this);
}
inherits(GroupService, MongoService);

GroupService.prototype.Create = function(name, description, bannerurl, currentuserid, tags)
{
    var self = this;
    var newgroup = {
        name: name,
        description: description,
        bannerurl: bannerurl,
        createdby: currentuserid,
        tags: tags,
        createddate: moment.utc().toDate(),
        members: [ currentuserid ]
    };
    return indicative.validate(validation_rules,newgroup).then(function(){
        return self.save(tablename, newgroup);
    });
};

GroupService.prototype.AddMember = function(groupid, userId)
{
    return this.findById(tablename, groupid)
               .then(function(group)
                {
                    if (group.members.indexOf(userId) < 0) {
                        group.members.push(userId);
                        return this.updateById(groupid, group.members);
                    }
                });
};


GroupService.prototype.RemoveMember = function(groupid, userId)
{
    return this.findById(tablename, groupid)
        .then(function(group)
        {
            var index = group.members.indexOf(userId);
            if (index > -1) {
                group.members.splice(index, 1);
                return this.updateById(groupid, group.members);
            }

            return group;
        });
};

GroupService.prototype.Find = function(id) {
    console.log('finding group by id ' + id);
    return this.findById(tablename, id);
};


GroupService.prototype.FindByName = function(name) {
    console.log('finding group ' + name);
    return this.single(tablename, {'name': name });
};

GroupService.prototype.All = function() {
    console.log('finding all groups');
    return this.all(tablename);
};

module.exports = GroupService;