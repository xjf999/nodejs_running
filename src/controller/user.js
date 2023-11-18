const {exec} = require('../db/mysql')

const loginCheck = async (username,password) => {
    let sql = `select * from users where username = '${username}' and password = '${password}'`
    let r = await exec(sql)
    if (r) { return true }
}

module.exports = {loginCheck}