var jwt = require('jsonwebtoken');

function createJWT(req, res) {
    try {
        let token = jwt.sign({ username: req.body.username }, 'whoami', { expiresIn : '1h'})
        return res.status(200).json({
            success: true,
            message: 'Authentication successful!',
            token: token
        })
    } catch (error) {
        console.log('error', error);
    }
}

function verifyJWT(req, res, next) {
    if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
        return res.status(403).json({ message: "Token is not supplied" });
    }
    let token = req.headers.authorization.slice(7, req.headers.authorization.length);
    jwt.verify(token, 'whoami', (err, decoded) => {
        if (err) {
            return res.json({
                success: false,
                message: 'Token is not valid'
            });
        } else {
            req.decoded = decoded;
            return res.json({
                success: true,
                message: 'Token valid'
            });
        }
    })
}

module.exports = { createJWT, verifyJWT };