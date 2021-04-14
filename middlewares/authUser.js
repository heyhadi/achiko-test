const { verifyToken } = require("../helpers/jwt")
const { User } = require('../models/index')

async function authentication(req, res, next) {
    try {
        const access_token = req.headers.access_token
        if(!access_token){
            throw { name: 'Authentication Failed' }
        }else{
            const decoded = verifyToken(access_token)
            const user = await User.findOne({
                where: {
                    email: decoded.email
                }
            })
            if (!user){
                throw { name: 'Invalid Email / Password' }
            }else{
                req.loggedInUser = decoded
                console.log('berhasil');
                next()
            }
        }
    } catch (err) {
        next(err)
    }
}




module.exports = { authentication }