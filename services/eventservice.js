var calendar = require('calendar-tools'),
    Seed = calendar.seed,
    enums = require('../public/javascripts/enums'),
    deferred = Q.defer(),
    moment = require('moment'),
    MongoService = require('../datalayer/mongodb_repository'),
    inherits     = require('util').inherits,
    indicative = new (require('indicative'))();

var tablename = 'events';

// defining rules

var validation_rules = {
    groupid: 'required|above:0',
    title: 'required|min:3',
    start: 'required',
    location: 'required'
};


function EventService() {
    MongoService.call(this);
}
inherits(EventService, MongoService);

EventService.prototype.frequency = new enums.Enum("year", "month", "week", "day");

EventService.prototype.Create = function(groupid, title, description, startdate, enddate, location){
    var ev = {
        groupid: groupid,
        title: title,
        description: description,
        start: startdate,
        end: enddate,
        allDay: false,
        location: location,
        frequency: 'none',
        recurrence: { }
    };

    var self = this;

    return indicative.validate(validation_rules,ev)
        .then(function(data) {
            console.log('event validation passed',data);
            return self.save(tablename, ev);
        })
        .catch(function(error){
            console.log('event validation failed',error);
            throw error;
        });
}

EventService.prototype.Update = function(id, title, description, startdate, enddate, location)
{
    console.log('Attempting to update event with id ' + id);
    var changed = {};
    if(!indicative.is.empty(title)) {
        if(title.trim().length < 3) {
            var ex = 'Event-' + id + ': event title must be at least 4 characters in length';
            console.log(ex);
            throw ex;
        }
        changed.title = title;
    }
    if(!indicative.is.empty(description)) changed.description = description;
    if(startdate) changed.start = startdate;
    if(enddate) changed.end = enddate;
    if(!indicative.is.empty(location)) changed.location = location;

    return this.updateById(tablename, id, changed);
}

EventService.prototype.Delete = function(id){
    return this.delete(tablename, id);
}

EventService.prototype.Find = function(id) {
    return this.findById(tablename, id);
}

EventService.prototype.FindByGroup = function(groupid) {
    console.log('finding events for groupid ' + groupid);
    return this.find(tablename,
                            {'groupid': parseInt(groupid), "start" : { $gte : moment.utc().toDate() }, isdeleted: { $ne: true}},
                            {"sort" : [['start', 'asc']]});
}

EventService.prototype.get = function(ev){
    var today = new Date();

    // creates a new seed Object passing event object and options
    var eventseed = new Seed(ev, {
        start: new Date(2000, 0, 1),
        end: today
    });

    // generates ans retrieves all instances by period
    return eventseed.getInstances();
}

module.exports = EventService;