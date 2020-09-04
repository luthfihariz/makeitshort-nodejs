const randomstring = require('randomstring')
const Key = require('../models/key')
const fs = require('fs')

const generateBase36Key = () => {
    var set = new Set()
    const maxNumberOfStrings = Math.pow(36, 2)
    while(set.size < maxNumberOfStrings) {
        const randString = randomstring.generate({
            length: 6,
            charset: 'alphanumeric',
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

const insertToDb = async (keys) => {
    try {
        await Key.bulkCreate(keys)
    } catch(err) {
        console.log(err)
    }
    
}

