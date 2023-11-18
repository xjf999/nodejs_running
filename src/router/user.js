const {loginCheck} = require('../controller/user')
const {successModule,errnoModule} = require('../module/module')

const handleUserRouter = async (req,res) => {
    if (req.method === 'POST' && req.path === '/api/user/login') {
        const { username, password } = req.body
        let r = await loginCheck(username,password).then(data => {
            if (data) { return new successModule(data)} else {return new errnoModule('fail')}
        })
    }
}

module.exports = { handleUserRouter }