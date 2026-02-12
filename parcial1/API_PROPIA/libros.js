const urlApi = "https://giovanni.grupoctic.com/bibliotecamovil/api/apiLibros.php";


const cargarLibros = () => {
    
    fetch(urlApi)
        .then(res => res.json()) 
        .then(data => {
            const libros = data;
           
            console.log("Datos recibidos:", libros); 
           
            
            mostrarLibros(libros);
        })
        .catch(error => {
            console.error("Error:", error);
            alert("No se pudieron cargar los libros.");
        })
}


const mostrarLibros = (libros) => {
    const contenedor = document.getElementById("contenedor-libros");
   
    contenedor.innerHTML = "";

    libros.forEach(libro => {

        const tarjeta = document.createElement("div");
       
        tarjeta.classList.add("card");
       
        tarjeta.innerHTML = `
            <img src="https://biblioteca.grupoctic.com/libros_img/${libro.imagen}" alt="${libro.titulo}" width="100%" style="object-fit: contain; height: 250px;">
            <h3 class="card-title">${libro.titulo}</h3>
            <p class="card-description">${libro.sinopsis}</p>
            <p><strong>Autor:</strong> ${libro.autor}</p>
            <p><strong>Género:</strong> ${libro.genero}</p>
            <p><strong>Editorial:</strong> ${libro.editorial}</p>
            <div class='${libro.estado}'>${libro.estado}</div>
        `;

        contenedor.appendChild(tarjeta);
    })
}