require('dotenv').config()
const randomstring = require('randomstring')
const Key = require('../models/key')
const bases = require('bases')

const generate = async () => {
    try {
        const keysGenerated = await generateKeys(100000)
        const dbRows = Array.from(keysGenerated).map((value) => {
            return {key : value}
        })
        console.log(keysGenerated.size)
        const result = await Key.bulkCreate(dbRows)
    } catch(err) {
        console.log(err)
    }
    
}

const generateKeys = async (quantity) => {
    var set = new Set()
    var latestId = await getLatestId()
    latestId += 13330 // to make sure it's start with 'aaa'
    console.log('latestId', latestId)
    while(set.size < quantity) {
        const key = bases.toBase36((latestId++).toString())
        set.add(key)
    }
    
    return set

}

const getLatestId = async () => {
    try {
        const latestId = await Key.findOne({attributes:['id'], order:[['id', 'DESC']]})
        return latestId['id']
    } catch(err) {
        return 0
    }
}

generate()