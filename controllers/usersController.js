const path= require('path');

const controlador={
    register: (req, res) => {
        res.render('users/register')
        
    },
    login: (req, res) => {
        res.render('users/login')

    }
    
}

module.exports= controlador;