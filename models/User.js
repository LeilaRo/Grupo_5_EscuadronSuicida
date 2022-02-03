const fs = require('fs');


const User ={
    fileName:'./data/users.json',

    getData: function(){
        return JSON.parse(fs.readFileSync(this.filename, 'utf -8'));
   },

   findAll: function(){
       return this.getData();
   },
//Buscar un usuario por id
   findByPk: function(id){
       let allUsers = this.findAll();
       let userFound = allUsers.find( oneUser => oneUser.id === id);
       return userFound;
   },
//Buscar usuario por mail (field = campo y text es lo que estamos buscando)
   findByField: function(field, text){
    let allUsers = this.findAll();
    let userFound = allUsers.find( oneUser => oneUser[field] === text);
    return userFound;
},
    
    create: function(userData){
        let allUsers = this.findAll();
        allUsers.push(userData);
        fs.writeFileSync(this.fileName, JSON.stringify(allUsers, null, ' '));
        return true;
    

    },

    
}