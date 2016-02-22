var User = sequelize.define('user', {
    Id: { type: Sequelize.BIGINT, primaryKey: true },
    username: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    },
    logourl: {
        type: Sequelize.STRING
    }
}, {
    timestamps: true
});


module.exports = User;