const User = require('../../src/database/models').User
const UserImages = require('../../src/database/models').UserImages

module.exports = {
    index: async (req, res) => {
        try {
            let allUsers = await User.findAll({include: {all: true}});

            return res.status(200).json({
                count: allUsers.length,
                users: allUsers.map(user => Object({
                    id: user.id,
                    email: user.email,
                    detail: 'http://localhost:3030/api/user/'+ user.id,
                    })
                )
            }
            );
        } catch (error) {
            res.status(500).send({message: error.message})
        }
    },
    show: async (req, res) => {
        try {
            let user = await User.findByPk(req.params.id, {include: {all: true}});
            let imageUser = await UserImages.findByPk(user.userImageId, {include: {all: true}});

            return res.status(200).json({

                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                image: imageUser.url
            })
        } catch (error) {
            res.status(500).send({message: error.message})
        }
    }
}