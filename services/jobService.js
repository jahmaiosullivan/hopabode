var dbconfig = require('../config/mongodbconfig');
//var Agenda = require('agenda');
//var agenda = new Agenda({ db: { address: dbconfig.connectionstring } });

module.exports = {

    schedule: function () {
        //agenda.define('greet the world', function (job, done) {
        //    console.log(job.attrs.data.time, 'Started OneToMany job service!');
        //    done();
        //});
        
        //agenda.schedule('in 2 seconds', 'greet the world', { time: new Date() });
        //agenda.start();        
    }

}