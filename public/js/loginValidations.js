window.onload = function(){

    let form = document.querySelector('.formBody');

    form.addEventListener('submit', async (e) => {
        e.preventDefault()

        let errors = []

        let nombreUsuario = document.getElementById('nombreUsuario');
        let password = document.getElementById('password');

        if(nombreUsuario.value == ""){
            errors.push('Debes completar el campo email')
            nombreUsuario.classList.add('is-invalid')
        }else if(!nombreUsuario.value.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)){
            errors.push('Debes ingresar un formato de email válido')
            nombreUsuario.classList.add('is-invalid')
        }else nombreUsuario.classList.remove('is-invalid')

        if(password.value == ""){
            errors.push('Debes ingresar una contraseña')
            password.classList.add('is-invalid')
        }else password.classList.remove('is-invalid')

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
