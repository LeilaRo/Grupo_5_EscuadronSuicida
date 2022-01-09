const controlador={
    register: (req, res) => {
        res.send("registrarse")

        
        /*res.render( "register");*/
        
    },
    login: (req, res) => {
        res.send("Login")
    
       /* res.render("login");*/
    }
    
}

module.exports= controlador;