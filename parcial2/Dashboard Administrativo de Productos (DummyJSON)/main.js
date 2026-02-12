const ENDPOINT = "https://dummyjson.com/products";

let desplazamiento = 0;
const cantidad = 10;
let paginaActual = 1;
let totalItems = 0;

let modoVista = "todo";
let valorFiltro = "";

const cuerpoTabla = document.getElementById("tablaDatos");
const lblPagina = document.getElementById("lblPagina");
const txtBusqueda = document.getElementById("txtBusqueda");
const btnBuscar = document.getElementById("btnBuscar");
const comboCategorias = document.getElementById("comboCategorias");
const comboOrden = document.getElementById("comboOrden");
const btnPrev = document.getElementById("btnPrev");
const btnNext = document.getElementById("btnNext");

async function cargarProductos() {
    let url = "";

    if (modoVista === "todo") {
        url = `${ENDPOINT}?limit=${cantidad}&skip=${desplazamiento}`;
    }
    if (modoVista === "buscar") {
        url = `${ENDPOINT}/search?q=${valorFiltro}&limit=${cantidad}&skip=${desplazamiento}`;
    }
    if (modoVista === "categoria") {
        url = `${ENDPOINT}/category/${valorFiltro}?limit=${cantidad}&skip=${desplazamiento}`;
    }

    if (comboOrden.value) {
        const [campo, orden] = comboOrden.value.split("-");
        url += `&sortBy=${campo}&order=${orden}`;
    }

    const resp = await fetch(url);
    const data = await resp.json();

    totalItems = data.total;
    pintarTabla(data.products);
    actualizarPager();
}

function pintarTabla(lista) {
    cuerpoTabla.innerHTML = "";
    lista.forEach(item => {
        cuerpoTabla.innerHTML += `
        <tr id="fila-${item.id}">
            <td>${item.id}</td>
            <td><img src="${item.thumbnail}"></td>
            <td>${item.title}</td>
            <td>$${item.price}</td>
            <td>${item.category}</td>
            <td class="acciones">
                <a href="add-product.html?mode=edit&id=${item.id}" title="Editar">
                    <i class="fi fi-br-edit"></i>
                </a>
                <button onclick="eliminarItem(${item.id})" title="Eliminar">
                    <i class="fi fi-br-cross"></i>
                </button>
            </td>
        </tr>`;
    });
}

function actualizarPager() {
    lblPagina.textContent = `Página ${paginaActual}`;
    btnPrev.disabled = desplazamiento === 0;
    btnNext.disabled = desplazamiento + cantidad >= totalItems;
}

btnPrev.onclick = () => {
    if (desplazamiento === 0) return;
    desplazamiento -= cantidad;
    paginaActual--;
    cargarProductos();
};

btnNext.onclick = () => {
    if (desplazamiento + cantidad >= totalItems) return;
    desplazamiento += cantidad;
    paginaActual++;
    cargarProductos();
};

btnBuscar.onclick = () => {
    if (!txtBusqueda.value.trim()) return;
    modoVista = "buscar";
    valorFiltro = txtBusqueda.value.trim();
    desplazamiento = 0;
    paginaActual = 1;
    cargarProductos();
};

comboCategorias.onchange = () => {
    if (!comboCategorias.value) {
        modoVista = "todo";
    } else {
        modoVista = "categoria";
        valorFiltro = comboCategorias.value;
    }
    desplazamiento = 0;
    paginaActual = 1;
    cargarProductos();
};

comboOrden.onchange = () => {
    desplazamiento = 0;
    paginaActual = 1;
    cargarProductos();
};

window.eliminarItem = async (id) => {
    const ok = confirm("⚠ ¿Eliminar este artículo del sistema?");
    if (!ok) return;

    await fetch(`${ENDPOINT}/${id}`, { method: "DELETE" });
    document.getElementById(`fila-${id}`).remove();
    alert("🗑 Producto eliminado (simulación)");
};

async function cargarCategorias() {
    const res = await fetch(`${ENDPOINT}/category-list`);
    const cats = await res.json();

    cats.forEach(c => {
        const op = document.createElement("option");
        op.value = c;
        op.textContent = c;
        comboCategorias.appendChild(op);
    });
}

cargarCategorias();
cargarProductos();
