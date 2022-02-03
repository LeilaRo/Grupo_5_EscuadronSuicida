const path= require('path');
const {validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');

const fs = require('fs');

const usersFilePath = path.join(__dirname, '../data/users.json')
const jsonUsers = fs.readFileSync(usersFilePath, "utf-8");

const users = JSON.parse(jsonUsers);

const controlador={
    profile : (req, res) => {
    res.render('users/profile')
    },
    register: (req, res) => {
        res.render('users/register')
        
    },
    saveRegister:function (req, res){
        const resultValidation = validationResult(req);
        if(resultValidation.errors.length > 0){
            return res.render('users/register',{
                errors: resultValidation.mapped(),
                oldData:req.body
            })
        }
        let newUser ={
            ...req.body,
            password: bcrypt.hashSync(req.body.password,10),

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
    saveLogin: function (req, res){

    }
    
}

module.exports= controlador;