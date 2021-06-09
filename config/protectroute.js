const jwt = require('jsonwebtoken');
const User = require('../server/models/User');

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

// const currentuser = (req, res, next) => {
//     const token = req.cookies[ 'user' ];
//     if (token) {
//         jwt.verify(token, process.env.SECREET_TOKEN, async (err, decodedToken) => {
//             if (err) {
//                 res.locals.user = null
//                 next();
//             } else {
//                 const user = await User.findById(decodedToken.id);
//                 res.locals.user = user;
//                 next();
//             }
//         })
//     } else {
//         res.redirect('/login')
//     }
// }

module.exports = { verifyuser }