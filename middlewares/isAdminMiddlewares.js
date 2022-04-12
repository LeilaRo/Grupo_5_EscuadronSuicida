
function isAdminMiddleware(req, res, next) {
    if(req.session.roll != "administrador") {
        res.status(403).send('perfil no autorizado')
    } else{
        next();
    }
}

module.exports = isAdminMiddleware;