const Sequelize = require('sequelize'); 

const sequelize = new Sequelize('groupchatapp', 'root','abc', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;