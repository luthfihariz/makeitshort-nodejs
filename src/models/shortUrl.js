const { DataTypes } = require('sequelize')
const sequalize = require('../db/connection')

const ShortUrl = sequalize.define('shortUrl',{
    originalUrl : {
        type: DataTypes.STRING(2048),
        allowNull:false
    }
})

module.exports = ShortUrl