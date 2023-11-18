const fs = require('fs')
const path = require('path')

function writeLog(writeStream,log){
    writeStream.write(log +'\n')
}

function createWriteStream(filename) {
    const fullname = path.join(__dirname,'../','../','logs',filename)
    const writeStream = fs.createWriteStream(fullname,{flags:'a'})
    return writeStream
}

const accessW = createWriteStream('access.log')

function access(log){
    writeLog(accessW,log)
}

module.exports = { access }