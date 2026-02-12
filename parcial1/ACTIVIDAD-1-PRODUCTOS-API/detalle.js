const parametros = new URLSearchParams(window.location.search);
const id = parametros.get("id");

const detalleDiv = document.getElementById('vista_Detalle');

fetch(`https://dummyjson.com/products/${id}`)

    .then(resp => resp.json())
    .then(product => {
        detalleDiv.innerHTML = "";

        detalleDiv.innerHTML += `
            <button class="btn-regresar" onclick="history.back()">
                <i class="fas fa-arrow-left"></i>
                Regresar
            </button>


            <div class="product_Detalle">
                <h2 class="nombre_ProductDetalle">${product.title}</h2>
                <img class="img_ProductDetalle" src="${product.thumbnail}" alt="${product.title}">
                <p class="descripcion_ProductDetalle">Descripción: ${product.description}</p>
                <p class="precio_ProductDetalle">Precio: $${product.price}</p>
                <p class="marca_ProductDetalle">Marca: ${product.brand}</p>
            </div>
            <h3>Comentarios:</h3>
        `;
        const comentarios = product.reviews || [];


        comentarios.forEach(coment => {

            detalleDiv.innerHTML += `
                <div class="comentario_Detalle">
                    <p class="usuario_ComentarioDetalle">${coment.reviewerName}</p>
                    <p class="texto_ComentarioDetalle">${coment.comment}</p>
                    <small>Fecha: ${coment.date}</small>
                </div>
            `;
        })

    }
)