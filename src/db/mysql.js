const mysql = require('mysql')
const redis = require('redis')
const { MYSQL_ENV, REDIS_ENV } = require('../conf/db')



const conn = mysql.createConnection(MYSQL_ENV)

const redisClient = redis.createClient(REDIS_ENV)

const set = (key,val) => {
    if (typeof val === 'object') {
        val = JSON.stringify(val)
    }
    redisClient.set(key,val,redis.print)
}

const get = (key) => {
    const promise = new Promise((resolve,reject) => {
        redisClient.get(key,(err,val) => {
            if (err) { return reject(err) }
            if (val === null) {return resolve(null)}
            try {
                resolve(JSON.parse(val))
            } catch (error) {
                reject(error)
            }
        })
    })
    return promise
}

conn.connect()

const exec = (sql) => {
    const promise = new Promise((resolve, reject) => {
        conn.query(sql, (err, result) => {
            if (err) {
                reject(err)
                return
            }
            resolve(result)
        })
    })
    return promise
}

module.exports = { exec, get, set }
