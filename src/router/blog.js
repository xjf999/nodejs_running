const { getList, getDetail, newBlog, updateBlog, delBlog } = require('../controller/blog')
const { successModule, errnoModule } = require('../module/module')

const handleBlogRouter = async (req, res) => {
    const method = req.method
    let id = req.query.id
    try {
        if (method === 'GET' && req.path === '/api/blog/list') {
            const author = req.query.author || ''
            const keyword = req.query.keyword || ''
            const data = await getList(author, keyword)
            return new successModule(data)
        }

        if (method === 'GET' && req.path === '/api/blog/detail') {
            let resData =await getDetail(id)
           return new successModule(resData)
        }

        if (method === 'POST' && req.path === '/api/blog/new') {
           let r = await newBlog(req.body)
           return new successModule(r)
        }
        if (method === 'POST' && req.path === '/api/blog/update') { 
            await updateBlog(id,req.body)
            return new successModule()
        }
        if (method === 'POST' && req.path === '/api/blog/delete') { 
            await delBlog(id)
            return new successModule()
        }
    } catch (error) {
        console.error('router error: ', error)
    }
}

module.exports = { handleBlogRouter }