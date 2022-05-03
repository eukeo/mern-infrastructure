const User = require('../../models/user')
const jwt = require('jsonwebtoken')
const { login } = require('../../src/utilities/users-api')

module.exports = {
    create
    login,
    checkToken
}

async function create(req, res){
    try {
        // Add the user to the database
        const user = await User.create(req.body)
        //token will be a string
        const token = createJWT(user)
        // Yes we can use res.json to send back just a string
        // The client code needs to take this into consideration
        res.json(token)
    } catch (err) {
        // Client will check for non-2xx status code
        // 400 = Bad request
        res.status(400).json(err)
    }
}

function checkToken(req, res) {
    console.log('req.user', req.user)
    res.json(req.exp)
}

// Helper Functions

function createJWT(user){
    return jwt.sign(
        { user },
        process.env.SECRET,
        { expiresIn: '24h'}
    )
}