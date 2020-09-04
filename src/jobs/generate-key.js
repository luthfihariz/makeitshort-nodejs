const randomstring = require('randomstring')
const Key = require('../models/key')
const fs = require('fs')
const bases = require('bases')

const generate = async () => {
    try {
        const keysGenerated = await generateKeys(1000000)
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

const generateBase36KeyBatch1 = () => {
    var set = new Set()
    const maxNumberOfStrings = Math.pow(12, 6)
    while(set.size < maxNumberOfStrings) {
        const randString = randomstring.generate({
            length: 6,
            charset: 'abcdefghijkl',
            capitalization: 'lowercase'
        })
        set.add(randString)
    }
    return set
}


const generateBase36KeyBatch2 = () => {
    var set = new Set()
    const maxNumberOfStrings = Math.pow(12, 6)
    while(set.size < maxNumberOfStrings) {
        const randString = randomstring.generate({
            length: 6,
            charset: 'mnopqrstuvwx',
            capitalization: 'lowercase'
        })
        set.add(randString)
    }
    return set
}


const generateBase36KeyBatch3 = () => {
    var set = new Set()
    const maxNumberOfStrings = Math.pow(12, 6)
    while(set.size < maxNumberOfStrings) {
        const randString = randomstring.generate({
            length: 6,
            charset: 'yz1234567890',
            capitalization: 'lowercase'
        })
        set.add(randString)
    }
    return set
}

const writeToFile = (string) => {
    fs.appendFile('generated-key.txt', string, function(err){
        if(err) return console.log("Error writing", string)
    })
}

generate()