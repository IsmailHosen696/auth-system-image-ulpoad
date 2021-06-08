const jwt = require('jsonwebtoken');

const verifyuser = (req, res, next) => {
    const token = req.cookies[ 'user' ];
    if (token) {
        const validtoken = jwt.verify(token, process.env.SECREET_TOKEN)
        if (validtoken) {
            req.userId = validtoken.id;
            next();
        } else {
            res.redirect('/login')
        }
    } else {
        res.redirect('/login')
    }
}
module.exports = { verifyuser }