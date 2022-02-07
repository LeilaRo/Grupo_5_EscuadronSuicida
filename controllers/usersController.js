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

       /* Esto no funcionó asi que voy a probar la manera que muestra en el video
       let userInDb = users.find(user => user.email == req.body.email);
        if (userInDb){
            return res.render('users/register',{
                errors:{
                    email:{
                        msg:'Este email ya está registrado'
                    }
                },
                oldData:req.body
            })
        } else  
        */

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

        res.redirect("/users/profile");

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