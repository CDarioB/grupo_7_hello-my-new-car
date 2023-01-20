window.onload = function(){
    let titulo = document.querySelector('.moviesAddTitulo')
    let formulario = document.querySelector('#formulario');
    let article = document.querySelector('article');
    titulo.innerHTML = 'AGREGAR PELÍCULA';
    titulo.classList.add('titulo');
    article.classList.add('fondoTransparente');
    formulario.classList.add('fondoCRUD');

//------------------------CLASE 39 -----------------------------//
//------DESDE AQUÍ CONTINÚE CON LAS VALIDACIONES DEL FORMULARIO //
//-------------------DE REGISTRO DE PELÍCULAS------------------//    


    let form = document.querySelector('.form');
    form.title.focus()

    form.addEventListener('submit', async (e) => {
        e.preventDefault()
        let errores = []
        
        let title = document.querySelector('#title')
        let rating = document.querySelector("#rating")
        let awards = document.querySelector("#awards")
        let release_date = document.querySelector("#release_date")
        let length = document.querySelector("#length")
        let genre_id = document.querySelector("#genre_id")


        if (title.value == ""){
            errores.push("El titulo no puede estar vacío")
            title.classList.add('is-invalid')
            title.classList.remove('is-valid')
        }
        else {
            title.classList.add("is-valid")
            title.classList.remove('is-invalid')
        }

        if (release_date.value == ""){
            errores.push("La fecha no puede estar vacia")
            release_date.classList.add('is-invalid')
            release_date.classList.remove('is-valid')
        }
        else {
            release_date.classList.add("is-valid")
            release_date.classList.remove('is-invalid')
        }


        if (genre_id.value == ""){
            errores.push("Tiene que elegir un genero")
            genre_id.classList.add('is-invalid')
            genre_id.classList.remove('is-valid')
        }
        else {
            genre_id.classList.add("is-valid")
            genre_id.classList.remove('is-invalid')
        }

        if (rating.value <= 0 || rating.value > 10) {
            errores.push("El rating tiene que ir de 1 a 10")
            rating.classList.add('is-invalid')
            rating.classList.remove('is-valid')
        }
        else {
            rating.classList.add("is-valid")
            rating.classList.remove('is-invalid')
        }

        if (awards.value <= 0 || awards.value > 10) {
            errores.push("Los premios obtenidos van de 1 a 10")
            awards.classList.add('is-invalid')
            awards.classList.remove('is-valid')
        }
        else {
            awards.classList.add("is-valid")
            awards.classList.remove('is-invalid')
        }

        if (length.value < 60 || length.value > 360) {
            errores.push("El largo pelicula tiene que estar entre 60 y 360 minutos")
            length.classList.add('is-invalid')
            length.classList.remove('is-valid')
        }
        else {
            length.classList.add("is-valid")
            length.classList.remove('is-invalid')
        }

        if (errores.length > 0) {
            let ulErrores = document.querySelector('.errores')
            ulErrores.classList.add("alert-warning")
            ulErrores.innerHTML = ""
            for (let i = 0; i < errores.length; i++) {
                ulErrores.innerHTML += `<li> ${errores[i]} </li>`
            }
            Swal.fire(
                'Cuidado!',
                'Verifica los errores',
                'error'
            )
        }
        else {

            let body = {
                title: title.value,
                rating: rating.value,
                awards: awards.value,
                release_date: release_date.value,
                length: length.value,
                genre_id: genre_id.value
            }
            const respuesta = await fetchCreate(body)
            if (respuesta.meta.status == 200) {
                Swal.fire(
                    'Todo ok!',
                    'pelicula guardada!',
                    'success'
                )
            }
            else {
                Swal.fire(
                    'Cuidado!',
                    'Hubo un error al cargar la pelicula',
                    'error'
                )
            }
            
        }

    })

    async function fetchCreate(model) {
        const res = await fetch('/api/movies/create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(model)
        })
        let info = await res.json()
        return info
    }

}