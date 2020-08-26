const express = require('express')
const shortLinkRouter = require('./routers/shortLink')
const userRouter = require('./routers/user')
require('./db/connection')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(shortLinkRouter)
app.use(userRouter)


app.listen(port,() => {
    console.log('Server running at', port)
})