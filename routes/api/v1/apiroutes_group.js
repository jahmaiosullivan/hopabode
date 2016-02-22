var groupservice =  new (require('../../../services/groupservice'))();
var userservice =  new (require('../../../services/userservice'))();

module.exports = function (router) {
    var api = router.route('/group');

    api.all(function (req, res, next) {
        console.log(req.method, req.url);
        next();
    });
    
    //GET verb
    api.get(function (req, res) {
        res.send("Get list of groups ...");
    });

    //POST verb
    api.post(function (req, res) {
        var tags = req.body.tags.split(",").map(Function.prototype.call, String.prototype.trim).map(Function.prototype.call, String.prototype.toLowerCase);
        res.send(groupservice.Create(req.body.name,req.body.description,req.body.bannerurl, req.user._id, tags));
    });
    
    //PUT verb
    api.put(function (req, res) {
        res.send("Edit / modify a group ...");
    });

    //DELETE verb
    api.delete(function (req, res) {
        res.send("Delete a group ...");
    });

    router.get('/group/all', function(req, res) {
        groupservice
            .All()
            .then(function (groups) {
                res.json(groups);
            });
    });

    router.post('/group/members/add', function (req, res) {
        res.send(groupservice.AddMember(req.body.group._id,req.user._id));
    });

    router.post('/group/members/delete', function (req, res) {
        res.send(groupservice.RemoveMember(req.body.group._id,req.user._id));
    });

    router.get('/group/:groupId/members/:startletter?', function (req, res) {
        groupservice.Find(req.params.groupId)
                    .then(function(group) {
                        userservice.FindByIds(group.members)
                            .then(function(members) {
                                if(req.params.startletter) {
                                    function matchesStartLetter(member) {
                                        var searchPattern = new RegExp('^' + req.params.startletter, 'i');
                                        return searchPattern.test(member.name);
                                    }
                                    var filteredMembers = members.filter(matchesStartLetter);
                                    res.json(filteredMembers);
                                }
                                else {
                                    res.json(members);
                                }
                            });
                        });
    });
    
    return router;
}




