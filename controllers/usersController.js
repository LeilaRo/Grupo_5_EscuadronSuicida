const path= require('path');
const {validationResult} = require('express-validator');

const fs = require('fs');

const usersFilePath = path.join(__dirname, '../data/users.json')
const jsonUsers = fs.readFileSync(usersFilePath, "utf-8");

const users = JSON.parse(jsonUsers);

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

    saveLogin:function (req, res){
        const resultValidation = validationResult(req);
        if(resultValidation.errors.length > 0){
            return res.render('users/login', {
                errors: resultValidation.mapped(), 
                oldData: req.body,
            });
        }
    }
       
}

module.exports= controlador;