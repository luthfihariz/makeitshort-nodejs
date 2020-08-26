const router = require('express').Router()

router.post('/short-link', (req, res) => {
    res.send("Hello world post")
})

router.get('/short-link/:url', (req, res) => {
    res.send("Retrieving short link detail")
})

router.delete('/short-link/:url', (req, res) => {
    res.send('Deleting short-link')
})

module.exports = router