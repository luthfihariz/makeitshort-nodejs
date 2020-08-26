const router = require('express').Router()

router.post('/user', (req, res) => {
    res.send('Register a user')
})

module.exports = router