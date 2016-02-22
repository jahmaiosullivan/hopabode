var Event = sequelize.define('event', {
    title: {
        type: Sequelize.STRING
    },
    start: {
        type: Sequelize.DATE
    },
    end: {
        type: Sequelize.DATE
    },
    allDay: {
        type: Sequelize.BOOLEAN
    },
    frequency: {
        type: Sequelize.STRING
    },
    recurrence: {
        type: Sequelize.JSON
    }
}, {
    timestamps: true
});

module.exports = Group;