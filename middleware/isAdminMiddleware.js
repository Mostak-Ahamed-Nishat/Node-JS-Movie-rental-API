module.exports = function (req, res, next) {
    if (req.user.isAdmin) {
        next()
    } else {
        res.status(403).send("You do not have permission to access this")
    }
}