const authService = require('./auth-service/auth-service');

module.exports = basicAuth;

async function basicAuth(req, res, next) {

    // check for basic auth header
    if (!req.headers.authorization || req.headers.authorization.indexOf('Basic') === -1) {
        return res.status(401).json({ message: "Authorization request!" })
    }
    // verify auth credentials
    const base64Credentials = req.headers.authorization.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [username, password] = credentials.split(':');
    const user = await authService.basicAuth(username, password);
    if(!user) {
        return res.status(401).json({ message: "Authentication fails!" })
    }
    next();
}