window.onload = function(){

    let form = document.querySelector('.formBody');

    form.addEventListener('submit', async (e) => {
        e.preventDefault()

        let errors = []

        let firstName = document.getElementById('firstName');
        let lastName = document.getElementById('lastName');
        let tel = document.getElementById('tel');
        let email = document.getElementById('email');
        let pass = document.getElementById('pass');
        let acceptTerms = document.getElementById('accept-terms'); 
        let avatarUser = document.getElementById('avatarUser');

        if (firstName.value == "") {
            errors.push('Debes completar el campo de tus nombres')
            firstName.classList.add('is-invalid')
        }else if (firstName.value.length < 2){
            errors.push('El nombre debe tener al menos 2 caracteres')
            firstName.classList.add('is-invalid')
        }else firstName.classList.remove('is-invalid')

        if (lastName.value == ""){
            errors.push('Debes completar el campo de tus apellidos')
            lastName.classList.add('is-invalid')
        }else lastName.classList.remove('is-invalid')

        if(tel.value == "") {
            errors.push('Debes ingresar un teléfono de contacto')
            tel.classList.add('is-invalid')
        }else if (!tel.value.match(/^\+\d{2} \d{3} \d{3} \d{4}$/)){
            errors.push('Debes ingresar un número de teléfono válido, Ej: +57 300 555 5566')
            tel.classList.add('is-invalid')
        }else tel.classList.remove('is-invalid')

        if(email.value == ""){
            errors.push('Debes ingresar un email para la autenticación de tu usuario')
            email.classList.add('is-invalid')
        }else if(!email.value.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)){
            errors.push('Debes ingresar un formato de email válido')
            email.classList.add('is-invalid')
        }else email.classList.remove('is-invalid')

        if(pass.value == ""){
            errors.push('Debes crear una contraseña')
            pass.classList.add('is-invalid')
        }else if(pass.value.length < 8){
            errors.push('La contraseña debe tener al menos 8 caractéres')
            pass.classList.add('is-invalid')
        }else pass.classList.remove('is-invalid')


        if (!avatarUser.value) {
            errors.push('No has seleccionado ninguna imágen');
            avatarUser.classList.add('is-invalid')
        }else if (!avatarUser.value.match(/\.(jpeg|jpg|png|gif)$/i)){
            errors.push('Las extensiones de archivo permitidas son: .jpg, .jpeg, .png, .gif');
            avatarUser.classList.add('is-invalid')
        } else avatarUser.classList.remove('is-invalid')
                         
        if (!acceptTerms.checked){
            errors.push('Debes aceptar los términos y condiciones')
            acceptTerms.classList.add('is-invalid')
        }else{
            acceptTerms.classList.remove('is-invalid')
        }

        if (errors.length > 0) {
            let ulErrors = document.getElementById('ulErrors')
            ulErrors.classList.add("alert-warning")
            ulErrors.innerHTML = ""
            for (let i = 0; i < errors.length; i++) {
                ulErrors.innerHTML += `<li> ${errors[i]} </li>`
            }
            Swal.fire(
                'Cuidado!',
                'Verifica los errores',
                'error'
            )
        } else {
           form.submit();
        }
    })

}
