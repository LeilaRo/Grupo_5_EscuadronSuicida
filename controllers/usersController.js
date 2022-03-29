const path= require('path');
const express = require("express");
const {validationResult} = require('express-validator');

const bcrypt = require('bcryptjs');


const fs = require('fs');

const usersFilePath = path.join(__dirname, '../data/users.json')
const jsonUsers = fs.readFileSync(usersFilePath, "utf-8");

const users = JSON.parse(jsonUsers);

const db =require('../src/database/models')

const controlador={

    register: (req, res) => {
        res.render('users/register')

    },
    saveRegister:function (req, res){
        const resultValidation = validationResult(req);
        if(resultValidation.errors.length < 0){
            db.User.create({
                email: req.body.email,
                image: req.file.filename,
                password: bcrypt.hashSync(req.body.password,10)
            })
            }else {
                res.render('users/register', {error : resultValidation.errors})
            }
        },
    login: (req, res) => {
        res.render('users/login')
    
        },
    
        saveLogin:function (req, res){
            const resultValidation = validationResult(req);
                if(resultValidation.errors.length < 0){
                    db.User.findOne({
                        where: {
                            email: req.body.email
                                }
                                }).then((userOne) =>{
                        
                                    if(userOne) {
                                        let isOkThePassword = bcrypt.compareSync(req.body.password, userOne.password);
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
        })
    }},

        edit: (req, res) => {
            db.User.findByPK(req.params.id)
            .then(function(idUser){
                res.render('users/edit', {idUser})
        });
    },

        saveEdit: (req, res) => {
            db.User.update({
                name: req.body.name,
                lastName: req.body.lastName,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password,10),
                address: req.body.address,
                city: req.body.city,
                province: req.body.province,
                phone: req.body.phone,
                brithDate: req.body.brithDate,
                country: req.body.country,
                role: req.body.role,
                userimage: req.file.image,
                
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
