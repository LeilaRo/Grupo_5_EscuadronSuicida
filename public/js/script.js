const formValidations = document.getElementById('formValidations');
const inputs = document.querySelectorAll('#formValidations input');

const expressions = {

	firstName: /^[a-zA-ZÀ-ÿ\s]{2,50}$/, // Letras y espacios, pueden llevar acentos.
	lastNamne: /^[a-zA-ZÀ-ÿ\s]{2,50}$/, // Letras y espacios, pueden llevar acentos.
	password: /^.{8,50}$/, // 8 a 50 digitos.
	email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, // mail valido
    productName: /^[a-zA-ZÀ-ÿ\s]{2,50}$/, // Letras y espacios, pueden llevar acentos.
    descriptionName: /^[a-zA-ZÀ-ÿ\s]{50,255}$/, // Letras y espacios, pueden llevar acentos.
}

const fields = {
	firstName: false,
	lastNamne: false,
	password: false,
	email: false,
    productName: false,
    descriptionName: false
}

const validateForm = (e) => {
	switch (e.target.name) {
		case "first_name":
			validarCampo(expresiones.firstName, e.target, 'firstName');
		break;
		case "last_name":
			validarCampo(expressions.lastNamne, e.target, 'lastNamne');
		break;
		case "password":
			validarCampo(expressions.password, e.target, 'password');
		break;
		case "email":
			validarCampo(expressions.email, e.target, 'correo');
		break;
		case "product_name":
			validarCampo(expressions.productName, e.target, 'telefono');
		break;
        case "description":
			validarCampo(expressions.descriptionName, e.target, 'telefono');
		break;
	}
}

const validarCampo = (expression, input, field) => {
	if(expression.test(input.value)){
		document.getElementById(`validation${field}`).classList.remove('formulario__grupo-incorrecto');
		document.getElementById(`validation${field}`).classList.add('formulario__grupo-correcto');
		document.querySelector(`#validation${field} .formulario__input-error`).classList.remove('formulario__input-error-activo');
		fields[field] = true;
	} else {
		document.getElementById(`validation${field}`).classList.add('formulario__grupo-incorrecto');
		document.getElementById(`validation${field}`).classList.remove('formulario__grupo-correcto');
		document.querySelector(`#validation${field} .formulario__input-error`).classList.add('formulario__input-error-activo');
		fields[field] = false;
	}
}

inputs.forEach((input) => {
	input.addEventListener('keyup', validateForm);
	input.addEventListener('blur', validateForm);
});

formulario.addEventListener('submit', (e) => {
	e.preventDefault();

/*	if(fields.firstName && fields.lastNamne && fields.password && fields.email && fields.productName && fields.descriptionName ){
		formulario.reset();

		document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');
		setTimeout(() => {
			document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');
		}, 5000);

		document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {
			icono.classList.remove('formulario__grupo-correcto');
		});
	} else {
		document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
	}*/
});