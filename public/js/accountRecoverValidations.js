window.onload = function(){

    let form = document.querySelector('.formBody');

    form.addEventListener('submit', async (e) => {
        e.preventDefault()

        let errors = []

        let accountRecover = document.getElementById('accountRecover');

        if(accountRecover.value == ""){
            errors.push('Debes completar el campo email')
            accountRecover.classList.add('is-invalid')
        }else if(!accountRecover.value.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)){
            errors.push('Debes ingresar un formato de email válido')
            accountRecover.classList.add('is-invalid')
        }else accountRecover.classList.remove('is-invalid')

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
