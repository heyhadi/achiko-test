const { User } = require('../models/index')
const { comparePass } = require('../helpers/bcrypt')
const { loginToken } = require('../helpers/jwt')


class UserController {
    static async register(req,res, next){
        try {
            const input ={
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                userName: req.body.userName,
                email: req.body.email,
                password: req.body.password,
                city: req.body.city,
                gender: req.body.gender,
            }
          
            const newUser = await User.create(input)
            res.status(201).json({
                id: newUser.id,
                email: newUser.email
            })

        } catch (err) {
            next(err)
        }
    }
    static async login(req, res, next) {
        // console.log('masuk login')
        try {
            const { email, password } = req.body
    
            const user = await User.findOne({
                where: {
                    email
                }
            })
            if (!user) {
                console.log('ga ada email')
                next({name: 'Invalid Email / Password'})
    
            } else {
                const { id, firstName, lastName,userName, email, gender, city } = user
                const isValidPass = comparePass(password, user.password)
                if (isValidPass) {
                    const payload = {
                        id: user.id,
                        email: user.email
                    }
                    const access_token = loginToken(payload)
                    return res.status(200).json({ 
                      access_token
                    })
                } else {
                    next({name: 'Invalid Email / Password'})
                }
            }
        } catch (err) {
            next(err)
            
        }
      }

      static async showProfile(req, res, next) {
        try {
            const data = await User.findAll({
                attributes: { exclude: ['password'] }
              })
            res.status(200).json(data)
          } catch (err) {
            next(err)
          }
      }
}

module.exports = UserController 
