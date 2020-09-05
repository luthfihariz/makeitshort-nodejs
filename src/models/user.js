const { DataTypes } = require('sequelize')
const sequalize = require('../db/connection')
const bcrypt = require('bcryptjs')

const User = sequalize.define('user', {
    username: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,
        validate: {
            len: [5,20]
        }
    },
    email: {
        type: DataTypes.STRING(64),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: {
                msg: "Not a valid email address"
            }
        }
    },
    password: {
        type: DataTypes.STRING(64),
        allowNull: false,
        validate: {
            len: [8, 9999]
        },
        set(value) {
            const hashedPassword = bcrypt.hashSync(value, 8)
            this.setDataValue('password', hashedPassword)
        }
    }
})

User.findUserByCredentials = async (email, password) => {
    const user = await User.findOne({ where: {email}})
    console.log(user.email)
    if (!user) {
        throw new Error({ 'error': 'Unable to login' })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    console.log(isMatch)
    if (!isMatch) {
        throw new Error({ 'error': 'Unable to login'})
    }

    return user
}

module.exports = User