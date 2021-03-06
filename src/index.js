require('dotenv').config()

const express = require('express')
const shortUrlRouter = require('./routers/shortUrl')
const userRouter = require('./routers/user')
const sequalize = require('./db/connection')

const models = {
    shortUrl: require('./models/shortUrl'),
    user: require('./models/user'),
    alias: require('./models/alias')
}

models.user.hasMany(models.shortUrl, {
    foreignKey: {
        allowNull: true,
    }
})
models.shortUrl.belongsTo(models.user)
models.alias.belongsTo(models.shortUrl)
models.shortUrl.hasMany(models.alias)


sequalize.sync()

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(shortUrlRouter)
app.use(userRouter)


app.listen(port,() => {
    console.log('Server running at', port)
})
