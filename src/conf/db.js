const env = process.env.NODE_ENV

let MYSQL_ENV
let REDIS_ENV

if (env === 'dev') { 
    MYSQL_ENV = {
    host: 'localhost',
    user: 'root',
    password: '123456',
    port: '3306',
    database: 'blog-1'
} 

REDIS_ENV = {
    port:6379,
    host:'127.0.0.1'
}

}
if (env === 'production') { MYSQL_ENV = {
    host: 'localhost',
    user: 'root',
    password: '123456',
    port: '3306',
    database: 'blog-1'
} }

module.exports = { MYSQL_ENV, REDIS_ENV }