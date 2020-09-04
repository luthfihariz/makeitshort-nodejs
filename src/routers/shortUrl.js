const ShortUrl = require('../models/shortUrl')
const router = require('express').Router()
const Key = require('../models/key')
const jwt = require('jsonwebtoken')

router.post('/api/short-url', async (req, res) => {
    try {
        const keyQueryResult = await Key.findOne(
            {
                attributes: ['key'], 
                order: [['id', 'asc']]
            })
        const key = keyQueryResult.key
        
        var userId = undefined
        const token = req.headers.authorization
        console.log(token)
        if (token) {
            const userDataFromToken = jwt.verify(token, "sosecretthatyouwillneverknowaboutit")
            console.log(userDataFromToken)
            userId = userDataFromToken.id
        }
        
        const expiredDate = new Date()
        expiredDate.setFullYear(expiredDate.getFullYear() + 5)
        
        const newShortUrl = {
            shortUrl: key,
            originalUrl: req.body.url,
            alias: req.body.alias,
            userId,
            expiredDate
        }

        console.log(newShortUrl)
        await Key.destroy({ 
                where: {key} 
            })
        const result = await ShortUrl.create(newShortUrl)
        res.send(result)
    } catch (err) {
        res.status(400).send(err)
    }
})

router.get('/api/short-url/:url', async (req, res) => {
    try {
        const shortUrl = await ShortUrl.findOne({
            where: {
                shortUrl: req.params.url
            }
        })

        if (!shortUrl) {
            return res.status(404).send()
        }

        return res.send(shortUrl)
        
    } catch (err) {
        res.status(500).send(err)
    }
})


router.get("/:url", async (req, res) => {
    try {
        const shortUrlQueryResult = await ShortUrl.findOne({
            attributes: ['originalUrl'],
            where: {
                shortUrl: req.params.url
            }
        })
        
        if(!shortUrlQueryResult) {
            return res.status(404).send()
        }

        return res.redirect(301, shortUrlQueryResult.originalUrl)
    } catch (err) {
        res.status(500).send(err)
    }
})

module.exports = router