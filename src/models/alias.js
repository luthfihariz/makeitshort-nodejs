const { DataTypes } = require('sequelize')
const sequalize = require('../db/connection')

const Alias = sequalize.define('alias', {
    key: {
        type: DataTypes.STRING(10),
        allowNull: false,
        unique: true,
        validate: {
            len: [3,10]
        }
    },
    expiredDate: {
        type: DataTypes.DATE,
        allowNull: false,
    }
})

module.exports = Alias