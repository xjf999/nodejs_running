const { exec } = require('../db/mysql')

const getList = async (author, keyword) => {
    try {
        let sql = `select * from blogs where 1=1 `
        if (author) { sql += `and author = '${author}' ` }
        if (keyword) { sql += `and title like '%${keyword}%' ` }
        sql += `order by createtime desc;`
        const r = await exec(sql)
        return r
    } catch (error) { console.error('controller mysql error: ', error) }
}

const getDetail = async (id) => {
    let sql = `select * from blogs where id = ${id};` 
    try {
        return await exec(sql)
    } catch (error) {
        console.error('controller mysql error: ',error)
    }
}

const newBlog = async (d) => {
   let title = d.title
   let content = d.content
   let createtime = Date.now()
   let author = d.author
   let sql = `insert into blogs(title,content,createtime,author) values('${title}','${content}','${createtime}','${author}')`
   try {
    return await exec(sql)
   } catch (error) {
    console.error('controller mysql error: ',error)
   }
}

const updateBlog = async (id, d = {}) => {
    let sql = `update blogs set title = '${d.title}',content = '${d.content}' where id = ${id};`
    try {
        return await exec(sql)
    } catch (error) {
        console.log('controller mysql error: ',error)
    }
}

const delBlog = async (id) => {
    let sql = `delete from blogs where id = ${id}`
    try {
        return await exec(sql)
    } catch (error) {
        console.log('controller mysql error: ',error)
    }
}

module.exports = { getList, getDetail, newBlog, updateBlog, delBlog }