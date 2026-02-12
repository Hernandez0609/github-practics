const productosDiv = document.getElementById('productos');

fetch('https://dummyjson.com/products')
    .then(resp => resp.json())
    .then(data => {

        productosDiv.innerHTML = "";

        data.products.forEach(product => {

            productosDiv.innerHTML += `

                <div onclick="window.location.href='vista_Detalle.html?id=${product.id}'" class="producto">
                    <h2 class="nombre_Product">${product.title}</h2>
                    <img class="img_Product" src="${product.thumbnail}" alt="${product.title}">
                    <p class="precio_Product">Precio: $${product.price}</p>
                    <p class="rating_Product">Rating: ${product.rating}</p>
                    <p class="categoria_Product">Categoría: ${product.category}</p>
                    <p class="stock_Product">Stock: ${product.stock}</p>
                </div>
            `;
        });
    });


const obtenerProducto = () => {
    const buscar = document.getElementById('Buscar').value.toLowerCase();

    fetch(`https://dummyjson.com/products/search?q=${buscar}`)
        .then(resp => resp.json())
        .then(data => {

            productosDiv.innerHTML = "";

            data.products.forEach(product => {

                productosDiv.innerHTML += `

                    <div onclick="window.location.href='vista_Detalle.html?id=${product.id}'" class="producto">
                        <h2 class="nombre_Product">${product.title}</h2>
                        <img class="img_Product" src="${product.thumbnail}" alt="${product.title}">
                        <p class="precio_Product">Precio: $${product.price}</p>
                        <p class="rating_Product">Rating: ${product.rating}</p>
                        <p class="categoria_Product">Categoría: ${product.category}</p>
                        <p class="stock_Product">Stock: ${product.stock}</p>
                    </div>
                `;
            });
        }
    );
};