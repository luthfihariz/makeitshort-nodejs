const router = require('express').Router()
const User = require('../models/user')
const jwt = require('jsonwebtoken')

router.post('/api/user', async (req, res) => {
    try {
        const user = await User.create(req.body)
        res.send(user)
    } catch (err) {
        res.status(400).send(err)
    }  
})

router.post('/api/user/session', async (req, res) => {
    try {
        const user = await User.findUserByCredentials(req.body.email, req.body.password)
        const token = jwt.sign({id:user.id,name:user.name}, "sosecretthatyouwillneverknowaboutit")
        res.send({token})
    } catch (err) {
        res.status(400).send(err)
    }
})

module.exports = router