const path = require('path');
const express = require("express");
const { validationResult } = require('express-validator');
const router = require('../routes/users');


const bcrypt = require('bcryptjs');
const User = require('../src/database/models').User
const UserImages = require('../src/database/models').UserImages
//const db = require('../src/database/models/User')

const controlador = {

    register: (req, res) => {
        res.render('users/register')

    },
    saveRegister: async function (req, res) {
        try {
            const resultValidation = validationResult(req);
            if (resultValidation.errors.length > 0) {
                return res.render('users/register', {
                    errors: resultValidation.mapped(),
                    oldData: req.body
                });
            };
            let userInDB = await User.findOne({
                where: { email: req.body.email }
            });
            if (userInDB != null) {
                return res.render('users/register', {
                    errors: {
                        email: {
                            msg: 'Este email ya está registrado'
                        }
                    },
                    oldData: req.body
                });
            };
            let imageUser = await UserImages.create({
                url: req.file.filename

            }); console.log(imageUser)

            let userCreated = await User.create({
                firstName: req.body.first_name,
                lastName: req.body.last_name,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 10),
                userImageId: imageUser.id,
                admin: false,
            });
            return res.render('users/login');


        } catch (error) {
            res.status(500).send({ msg: error.message })
        }
    },
    login: (req, res) => {
        res.render('users/login')
    },
    saveLogin: async function (req, res) {
        /*const resultValidation = validationResult(req);
                if (resultValidation.errors.length > 0) {
                    return res.render('users/login', {
                        errors: resultValidation.mapped(),
                        oldData: req.body
                    });
                };*/
        try {

            let userToLogin = await User.findOne({ where: { email: req.body.email } });
            if (userToLogin != null) {
                let okPassword = bcrypt.compareSync(req.body.password, userToLogin.password);
                if (okPassword) {

                    req.session.userLogged = userToLogin //userLogged;
                    if (req.body.remember_user) {
                        res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 60 });
                    }
                    return res.redirect('/');
                }
                return res.render('users/login', {
                    errors: {
                        email: {
                            msg: 'Las credenciales no son válidas'
                        }
                    }
                });
            }
            return res.render('users/login', {
                errors: {
                    email: {
                        msg: 'El usuario no se encuentra registrado.'
                    }
                }
            });
        } catch (errors) {
            res.status(500).send({ message: errors.message })
        }
    },
    profile: (req, res) => {
        return res.render('users/Profile', {
            user: req.session.userLogged
        });
    },
    editProfile: async (req, res) => {
        const id = Number(req.params.id);
        try {
            const resultValidation = validationResult(req);
            if (resultValidation.errors.length > 0) {
                return res.render('users/editProfile', {
              
                });
            };
            const user = await User.findByPk(id);
            res.render('users/editProfile', { user: user });
        } catch (error) {
            res.status(500).send({ message: error.message })
        }
    },
    
    updateProfile:async (req, res) =>{

            const resultValidation = validationResult(req);
            /* if (resultValidation.errors.length > 0) {
                console.log(resultValidation.errors)
                return res.render('products/editProduct', {
                    errors: resultValidation.mapped(),
                    oldData: req.body
                });
            }; */
            try {
                let id = Number(req.params.id);
              
                let userToModify = await User.findByPk(id);
                /*let id = req.params.id
                console.log(id)
                let userToModify = await User.findByPK(req.params.id);*/

                let userEdit = await userToModify.update({
                    firstName: req.body.first_name,
                    lastName: req.body.last_name,
                    email: req.body.email,
                    //password: bcrypt.hashSync(req.body.password, 10),
                    admin: false,
                    userImage: req.body.file,
        
                });
                console.log(req.body)
                console.log("Hola" + userEdit)
        
                await userToModify.save() 
                return res.redirect('/users/profile');
            } catch (error) {
                res.status(500).send({ message: error.message })
            }
        },
    logout: (req, res) => {

        req.session.destroy();
        return res.redirect('/');
    },
    list: (req, res) => {
        User
            .findAll()
            .then(users => {
                return res.status(200).json({
                    count: User.length,
                    users: {
                        id: User.id,
                        firstName: User.firstName,
                        lastName: User.lastName,
                        email: User.email,
                        detail: 'http://localhost:3030/users/api/list/:id'
                    },
                    //status: 200
                })
            })
    },
    show: (req, res) => {
        User.findByPK(req.params.id)
            .then(user => {
                let respuesta = {
                    meta: {
                        status: 200,
                        total: user.length,
                        url: 'http://localhost:3030/users/api/list/:id'
                    },
                    data: user
                }
                res.json(respuesta);
            });
    },

}



module.exports = controlador
