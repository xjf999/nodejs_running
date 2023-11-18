const querystring = require('querystring')
const { handleBlogRouter } = require('./src/router/blog')
const { handleUserRouter } = require('./src/router/user')
const { access } = require('./src/utils/logs')

const getPost = (req) => {
    const promise = new Promise((resolve, rejects) => {
        if (req.method !== 'POST') {
            resolve({})
            return
        }
        let postD = ''
        req.on('data', chunk => {
            postD += chunk.toString()
        })
        req.on('end', () => {
            if (!postD) {
                resolve({})
                return
            }
            resolve(JSON.parse(postD))
        })
    })
    return promise
}

const serverHandle = async (req, res) => {
    res.setHeader("Content-type", "application/json")
    const url = req.url
    req.path = url.split('?')[0]
    req.query = querystring.parse(url.split('?')[1])

    req.cookie = {}
    const cookie = req.headers.cookie || ''
    cookie.split(';').forEach(item => {
        if (!item) { return }
        const arr = item.split('=')
        const key = arr[0]
        const value = arr[1]
        req.cookie[key] = value
    });

    try {
        req.body = await getPost(req)
        access(` ${req.method} -- ${Date.now()}  -- ${req.headers['user-agent']} -- ${JSON.stringify(req.body)}`)

        const blogData = await handleBlogRouter(req, res);
        const userData = await handleUserRouter(req, res);

        if (blogData) {
            res.end(JSON.stringify(blogData));
            return;
        }
        if (userData) {
            res.end(JSON.stringify(userData));
            return;
        }

        // 处理当 blogData 和 userData 都不存在的情况
        res.end(JSON.stringify({}));
    } catch (error) {
        console.error("处理请求时发生错误:", error);
        res.end(JSON.stringify({ error: "内部服务器错误" }));
    }

}

module.exports = serverHandle