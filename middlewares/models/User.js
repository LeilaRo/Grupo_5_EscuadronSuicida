// 1-guardar al usuario en la DB
// 2-buscar al usuario que se quiere loguear por su email
// 3-buscar a un usuario por su ID
// 4-editar la informacion de un usuario
// 5-eliminar a un usuario de la DB

const path= require('path');
const fs = require('fs');
const { getEnvironmentData } = require('worker_threads');
const bcryptjs = require('bcryptjs');


//const usersFilePath = path.join(__dirname, '../data/users.json')
//const jsonUsers = fs.readFileSync(usersFilePath, "utf-8");

//fileName: './data/users.json'
//JSON.parse(fs.readFileSync(this.userFileName, 'utf-8'));

let hash = bcryptjs.hashSync ('', 10);


const User = {
    
    fileName: './data/users.json',

    getData: function() {
        return JSON.parse(fs.readFileSync(this.userFileName, 'utf-8'));;
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

modele.exports = User;
