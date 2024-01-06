const jwt = require('jsonwebtoken')


// Check the user is authenticated or not by valid JWT token . if the user is not authenticated then he/she will not be allowed to access to create a new genre

function isAuthenticatedUser(req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) {
        return res.status(401).send("Access denied. No token available")
    }
    try {
        // Verify the token
        const decode = jwt.verify(token, process.env.JWT_PRIVATE_KEY)
        //_id
        req.user = decode

        next()
    } catch (error) {
        return res.status(400).send("Invalid token")
    }
}

module.exports = isAuthenticatedUser