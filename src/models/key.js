const { DataTypes } = require('sequelize')
const sequalize = require('../db/connection')

const Key = sequalize.define('key', {
    key: {
        type: DataTypes.STRING(6),
        allowNull: false
    }
}, {
    indexes: [
        {
            unique: true, 
            fields: ['key']
        }
    ],
    timestamps: false
})

module.exports = Key