const formValidations = document.getElementById('formValidations');
const inputs = document.querySelectorAll('#formValidations input');

const expressions = {

	first_name: /^[a-zA-ZÀ-ÿ\s]{2,50}$/, // Letras y espacios, pueden llevar acentos.
	last_name: /^[a-zA-ZÀ-ÿ\s]{2,50}$/, // Letras y espacios, pueden llevar acentos.
	password: /^.{8,50}$/, // 8 a 50 digitos.
	email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, // mail valido
    productName: /^[a-zA-ZÀ-ÿ\s]{2,50}$/, // Letras y espacios, pueden llevar acentos.
    description: /^[a-zA-ZÀ-ÿ\s]{50,255}$/, // Letras y espacios, pueden llevar acentos.
}


const fields = {
	first_name: false,
	last_name: false,
	password: false,
	email: false,
    productName: false,
    description: false
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
			validarCampo(expressions.productName, e.target, 'product_name');
		break;
        case "description":
			validarCampo(expressions.description, e.target, 'description');
		break;
	}
}

const validarCampo = (expression, input, campo) => {
	if(expression.test(input.value)){
		document.querySelector('.form__input-error').classList.remove('form__input-error-activo');
		fields[campo] = true;
	} else {
		document.querySelector('.form__input-error').classList.add('form__input-error-activo');
		fields[campo] = false;
	}
}

inputs.forEach((input) => {
	input.addEventListener('keyup', validateForm);
	input.addEventListener('blur', validateForm);
});

formValidations.addEventListener('submit', (e) => {
	e.preventDefault();

		if(fields.forEach){
			validateForm;
		} else{
			formValidations.submit()
		}

});