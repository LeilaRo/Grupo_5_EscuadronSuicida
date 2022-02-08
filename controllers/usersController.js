const path= require('path');
const express = require("express");
const {validationResult} = require('express-validator');
const bcryptjs = require('bcryptjs');


const fs = require('fs');

const usersFilePath = path.join(__dirname, '../data/users.json')
const jsonUsers = fs.readFileSync(usersFilePath, "utf-8");

const users = JSON.parse(jsonUsers);

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

const controlador={
    userList : (req, res) => {
    res.render('users/usersList')
    },
    register: (req, res) => {
        res.render('users/register')
        
    },
    saveRegister:function (req, res){
        const resultValidation = validationResult(req);
        if(resultValidation.errors.length > 0){
            return res.render('users/register',{
                errors: resultValidation.mapped()
            })
        }

        
        let newUser ={
            ...req.body
        }
        console.log(newUser)
        users.push(newUser);
        const newJsonUser = JSON.stringify(users);
    
        fs.writeFileSync(usersFilePath, newJsonUser, "utf-8")

        res.redirect("/users");

    },

    login: (req, res) => {
        res.render('users/login')

    },

    
saveLogin: (req, res) => {
   /* const resultValidation = validationResult(req);
        if(resultValidation.errors.length > 0){
            return res.render('users/login',{
                errors: resultValidation.mapped()
            })
        }*/
    let userToLogin = User.findByField('email', req.body.email);
    
    if(userToLogin) {
        let isOkThePassword = bcryptjs.compareSync(req.body.password, userToLogin.password);
        if (isOkThePassword) {
            delete userToLogin.password;
            req.session.userLogged = userToLogin;

            if(req.body.remember_user) {
                res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 60 })
            }

            return res.redirect('/user/');
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
                msg: 'No se encuentra este email en nuestra base de datos'
            }
        }
    });
},
profile: (req, res) => {
    return res.render('/users', {
        user: req.session.userLogged
    });
},
}

module.exports = controlador;