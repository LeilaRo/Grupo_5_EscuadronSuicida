const path = require('path');
const express = require("express");
const { validationResult } = require('express-validator');
const router = require('../routes/users');


const bcrypt = require('bcryptjs');
//const {User}=require('../database/models')
const db = require('../src/database/models/User')

const controlador = {

    register: (req, res) => {
        res.render('users/register')

    },
    saveRegister: async function (req, res){
        try {
            const resultValidation = validationResult(req);
            if (resultValidation.errors.length > 0) {
                return res.render('users/register', {
                    errors: resultValidation.mapped(),
                    oldData: req.body
                });
            };
            let userInDB = await db.User.findOne({
                where: {email: req.body.email}});
            if (userInDB != null) {
                return res.render('users/register', {
                    errors: {
                        email: {
                            msg : 'Este email ya está registrado'
                        }
                    },
                    oldData: req.body
                });
            };
            let imageUser = await UserImageId.create({
                url: req.file.filename
            })
            let userCreated = await User.create({
                firstName:req.body.first_name,
                lastName: req.body.last_name,
                email: req.body.email,
                password: bcryptjs.hashSync(req.body.password, 10),
                userImageId: imageUser,
            });
            return res.render('users/login');
        } catch (error) {
            res.status(500).send({msg: error.message})
        }
    },
    /*saveRegister: async function (req, res) {
        try {
            const resultValidation = validationResult(req);
            if (resultValidation.errors.length < 0) {
                await db.User.create({
                    firstName:req.body.first_name,
                    lastName: req.body.last_name,
                    email: req.body.email,
                    image: req.file.filename,
                    password: bcrypt.hashSync(req.body.password, 10)
                });
                return res.redirect('/login');
            } else {
                res.render('users/register', { error: resultValidation.errors })
            }

        } catch (error) {
            console.log(error);
        }
        console.log(firstName)

    }*/
    login: (req, res) => {
        res.render('users/login')

    },

    saveLogin: function (req, res) {
        const resultValidation = validationResult(req);
        if (resultValidation.errors.length < 0) {
            db.User.findOne({
                where: {
                    email: req.body.email
                }
            }).then((userOne) => {

                if (userOne) {
                    let isOkThePassword = bcrypt.compareSync(req.body.password, userOne.password);
                    if (isOkThePassword) {
                        req.session.userLogged = userOne.email

                        /*delete userToLogin.password;
                        req.session.userLogged = userToLogin;*/

                        /*if (req.body.remember_user) {
                            res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 60 })
                        }*/
                        return res.redirect('/users/profile');
                    }
                    return res.render('users/login', {
                        errors: {
                            email: {
                                msg: 'Las credenciales son inválidas'
                            }
                        }
                    });
                }
                return res.render('users/login', {
                    errors: {
                        email: {
                            msg: 'usuario no registrado'
                        }
                    }
                });
            })
        }
    },

    edit: (req, res) => {
        User.findByPK(req.params.id)
            .then(function (idUser) {
                res.render('users/edit', { idUser })
            });
    },

    saveEdit: (req, res) => {
        User.update({
            firstName: req.body.first_name,
            lastName: req.body.last_name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10),
            // address: req.body.address,
            // city: req.body.city,
            // province: req.body.province,
            // phone: req.body.phone,
            // brithDate: req.body.brithDate,
            // country: req.body.country,
            roleId: req.body.role,
            userimageId: req.file.image,

        });
    },

    profile: (req, res) => {
        return res.render('users/Profile', {
            user: req.session.userLogged
        });
    },
    logout: (req, res) => {

        req.session.destroy();
        return res.redirect('/');
    }
}

module.exports = controlador
/*

const User = {
    
    fileName: './data/users.json',

    getData: function() {
        return users;
    },

    findAll: function() {
        return this.getData();
    },

    findByPk: function(id) {
        let allUsers = this.findAll();
        let userFound = allUsers.find(oneUser => oneUser.id === id);
        return userFound;
    },

    findByField: function(field, text) {
        let allUsers = this.findAll();
        let userFound = allUsers.find(oneUser => oneUser[field] === text);
        return userFound;
    }

}

.....................

    /*
    saveRegister:function (req, res){

        const resultValidation = validationResult(req);
        if(resultValidation.errors.length > 0){
            return res.render('users/register',{
                errors: resultValidation.mapped(),
                oldData:req.body
            })
        }

        let userInDb = users.find(user => user.email == req.body.email)
        if (userInDb){
            return res.render('users/register',{
                errors:{
                    email:{
                        msg:'Este email ya está registrado'
                    }
                },
                oldData:req.body
            })
        } 
        let newUser ={
            id: users[users.length - 1].id +1,
            ...req.body,
            image: req.file.filename,
            password: bcrypt.hashSync(req.body.password,10),

        }
        console.log(newUser)
        users.push(newUser);
        const newJsonUser = JSON.stringify(users);
    
        fs.writeFileSync(usersFilePath, newJsonUser, "utf-8")

        res.redirect("/users/login");

    },
    
    login: (req, res) => {
        res.render('users/login')

    },

saveLogin: (req, res) => {
 
    let userToLogin = User.findByField('email', req.body.email);
    
    if(userToLogin) {
        let isOkThePassword = bcrypt.compareSync(req.body.password, userToLogin.password);
        if (isOkThePassword) {
            delete userToLogin.password;
            req.session.userLogged = userToLogin;

            if(req.body.remember_user) {
                res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 60 })
            }
            return res.redirect('/users/profile');
        } 
        return res.render('users/login', {
            errors: {
                email: {
                    msg: 'Las credenciales son inválidas'
                }
            }
        });
    }
    return res.render('users/login', {
        errors: {
            email: {
                msg: 'usuario no registrado'
            }
        }
    });
},*/
