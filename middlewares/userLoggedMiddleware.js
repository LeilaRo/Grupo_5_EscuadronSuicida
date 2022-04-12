const User = require('../src/database/models/User');

async function userLoggedMiddleware(req, res, next) {
	res.locals.isLogged = false;

	const emailInCookie = req.cookies.UserEmail;
	//const userFromCookie = await User.findOne({where: {'email': emailInCookie}});

	next();
}
	
module.exports = userLoggedMiddleware;