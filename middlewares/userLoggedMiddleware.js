const User = require('../src/database/models/User');

async function userLoggedMiddleware(req, res, next) {
	res.locals.isLogged = false;

	const emailInCookie = req.cookies.UserEmail;
	const userFromCookie = await User.findOne({where: {'email': emailInCookie}});

	if (userFromCookie) {
		req.session.userLogged = userFromCookie;
	}

	if (req.session.userLogged) {
		res.locals.isLogged = true;
		res.locals.userLogged = req.session.userLogged;
	}

	next();
}

module.exports = userLoggedMiddleware;