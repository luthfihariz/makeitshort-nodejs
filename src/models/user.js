const { DataTypes } = require('sequelize')
const sequalize = require('../db/connection')
const ShortUrl = require('./shortUrl')
const bcrypt = require('bcryptjs')

const User = sequalize.define('user', {
    username: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(64),
        allowNull: false,
        validate: {
            isEmail: {
                msg: "Not a valid email address"
            }
        }
    },
    password: {
        type: DataTypes.STRING(64),
        allowNull: false,
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

User.getUserIdFromToken = (token) => {
    console.log(token)
    jwt.verify(token, 'sosecretthatyouwillneverknowaboutit', function(err, decoded){
        if(err){
            console.log(err)
            return
        }
        console.log(decoded.user)
        return decoded
    })
}
module.exports = User