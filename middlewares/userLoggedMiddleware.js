const User= require('../src/database/models').User

module.exports = async (req, res, next) => {
    let user = null
	res.locals.isLogged = false;
    if(req.cookie && req.cookie.user){
        user = await User.findOne({where: {user: req.cookie.user}})
        req.session.user = user;
    }

    if(req.session.user){
		res.locals.userLogged = req.session.userLogged;
        user = req.session.user;
    }

    res.locals.user = user;
	if (req.session.userLogged) {
		res.locals.isLogged = true;
		res.locals.userLogged = req.session.userLogged;
	}
    next();
}