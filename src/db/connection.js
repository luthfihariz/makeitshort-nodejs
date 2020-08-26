const {Sequelize} = require('sequelize')

const connection = new Sequelize('makeitshort_db', 'makeitshort_db_user', 'makeitshort', {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = connection

