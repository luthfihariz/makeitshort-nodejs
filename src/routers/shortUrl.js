const ShortUrl = require('../models/shortUrl')
const router = require('express').Router()
const Key = require('../models/key')
const jwt = require('jsonwebtoken')
const Alias = require('../models/alias')

router.post('/api/short-url', async (req, res) => {
    try {
        const keyQueryResult = await Key.findOne(
            {
                attributes: ['key'], 
                order: [['id', 'asc']]
            })
        const key = keyQueryResult.key
        console.log(key)
        var userId = undefined
        const token = req.headers.authorization
        if (token) {
            const userDataFromToken = jwt.verify(token, process.env.JWT_SECRET_KEY)
            userId = userDataFromToken.id
        }

        console.log(userId)

        const newShortUrl = {
            originalUrl: req.body.url,
            userId
        }

        

        console.log(newShortUrl)
        
        const shortUrlResult = await ShortUrl.create(newShortUrl)
        const shortUrlId = shortUrlResult.id

        const expiredDate = new Date()
        expiredDate.setFullYear(expiredDate.getFullYear() + 5)

        const newAlias = {
            key: key,
            shortUrlId,
            expiredDate
        }

        await Alias.create(newAlias)

        // deleting used key
        await Key.destroy({ 
            where: {key} 
        })

        const alias = req.body.alias
        if (alias) {
            const newAlias = {
                key: alias,
                shortUrlId,
                expiredDate
            }

            await Alias.create(newAlias)
        }

        res.status(204).send()
    } catch (err) {
        res.status(400).send({err})
    }
})

router.get('/api/short-url/:url', async (req, res) => {
    try {
        const alias = await Alias.findOne({
            where: {
                key: req.params.url
            },
            attributes: ['key'],
            include: [{
                model: ShortUrl,
                attributes: ['originalUrl']
            }]
        })

        if (!alias) {
            return res.status(404).send()   
        }

        return res.send({alias:alias.key, originalUrl:alias.shortUrl.originalUrl})
        
    } catch (err) {
        res.status(500).send(err)
    }
})


router.get("/:url", async (req, res) => {
    try {
        const alias = await Alias.findOne({
            where: {
                key: req.params.url
            },
            attributes: [],
            include: [{
                model: ShortUrl,
                attributes: ['originalUrl']                
            }]
        })

        if (!alias) {
            return res.status(404).send()
        }

        return res.redirect(301, alias.shortUrl.originalUrl)
    } catch (err) {
        res.status(500).send(err)
    }
})

module.exports = router