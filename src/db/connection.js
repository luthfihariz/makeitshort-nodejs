const {Sequelize} = require('sequelize')

const sequalize = new Sequelize('makeitshort_db', 'makeitshort_db_user', 'makeitshort', {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = sequalize

