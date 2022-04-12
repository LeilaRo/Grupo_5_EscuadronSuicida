window.addEventListener('load', function() {
    

let first_name = document.querySelector(".first_name");
let last_name = document.querySelector(".last_name");
let email = document.querySelector(".email");
let password = document.querySelector(".password");
let image = document.querySelector(".image");
let form = document.querySelector("form");

form.addEventListener('submit', function(event) {

    let errorsfront = {}

    if(first_name.value = ""){
        errorsfront.push("campo obligatorio");
    }else if(first_name.value.length <2){
        errorsfront.push("El campo debe tener al menos 2 caracteres")
    }
    
    if(last_name.value = ""){
        errorsfront.push("campo obligatorio");
    }else if(last_name.value.length <2){
        errorsfront.push("El campo debe tener al menos 2 caracteres")
    }
    
    if(email.value != "@"){
        errorsfront.push("debe ser un mail valido")
    }
    
    if(password.value = ""){
        errorsfront.push("campo obligatorio");
    }else if(password.value.length <8){
        errorsfront.push("El campo debe tener al menos 8 caracteres")
    }
    
    /*if(image.value ){
        
    }*/

    if(errorsfront.length >0) {
        event.preventDefault();

        let ulErrors = document.querySelector("div.errorFormFront ul")

        for (let i = 0; i < errorsfront.length; i++) {
            
            ulErrors.innerHTML += "<li>" + errorsfront[i] + "</li>"
        }

    }


  })

  });