const path= require('path');

const controlador={
    register: (req, res) => {
        res.render(path.resolve(__dirname, '../views/users/register'))
        
    },
    login: (req, res) => {
        res.render(path.resolve(__dirname, '../views/users/login'))
    
       /* res.render("login");*/
    }
    
}

module.exports= controlador;