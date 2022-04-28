const formValidations = document.getElementById('formValidations');
const inputs = document.querySelectorAll('#formValidations input');

const expressions = {

	first_name: /^[a-zA-ZÀ-ÿ\s]{2,50}$/, // Letras y espacios, pueden llevar acentos.
	last_name: /^[a-zA-ZÀ-ÿ\s]{2,50}$/, // Letras y espacios, pueden llevar acentos.
	password: /^.{8,50}$/, // 8 a 50 digitos.
	email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, // mail valido
    product_name: /^[a-zA-ZÀ-ÿ\s]{5,50}$/, // Letras y espacios, pueden llevar acentos.
    description: /^[a-zA-ZÀ-ÿ\s]{20,255}$/, // Letras y espacios, pueden llevar acentos.
}


const fields = {
	first_name: undefined,
	last_name: undefined,
	password: undefined,
	email: undefined,
    product_name: undefined,
    description: undefined
}

const validateForm = (e) => {
	switch (e.target.name) {
		case "first_name":
			validarCampo(expressions.first_name, e.target, 'first_name');
		break;
		case "last_name":
			validarCampo(expressions.last_name, e.target, 'last_name');
		break;
		case "password":
			validarCampo(expressions.password, e.target, 'password');
		break;
		case "email":
			validarCampo(expressions.email, e.target, 'email');
		break;
		case "product_name":
			validarCampo(expressions.product_name, e.target, 'product_name');
		break;
        case "description":
			validarCampo(expressions.description, e.target, 'description');
		break;
	}
}

const validarCampo = (expression, input, campo) => {
	if(expression.test(input.value)){
		document.querySelector(`.form__input-error_${campo}`).classList.remove('form__input-error-activo');
		fields[campo] = true;
		console.log(fields);
	} else {
		document.querySelector(`.form__input-error_${campo}`).classList.add('form__input-error-activo');
		fields[campo] = false;
		console.log(fields);
	}
}

inputs.forEach((input) => {
	input.addEventListener('keyup', validateForm);
	input.addEventListener('blur', validateForm);
});

formValidations.addEventListener('submit', (e) => {
	e.preventDefault();

	if(fields.description === undefined && fields.email === undefined && fields.first_name === undefined && fields.last_name === undefined && fields.password === undefined && fields.product_name === undefined){
		e.preventDefault();
	}else if(fields.description != false && fields.email != false && fields.first_name != false && fields.last_name != false && fields.password != false && fields.product_name != false){
		formValidations.submit()
	}



});