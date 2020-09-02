const { DataTypes } = require('sequelize')
const sequalize = require('../db/connection')

const ShortUrl = sequalize.define('shortUrl',{
    originalUrl : {
        type: DataTypes.STRING(2048),
        allowNull:false
    },
    shortUrl : {
        type: DataTypes.STRING(10),
        allowNull:false
    },
    alias: {
        type: DataTypes.STRING(10),
        allowNull: true
    },
    expiredDate: {
        type: DataTypes.DATE,
        allowNull: false
    }
})

module.exports = ShortUrl