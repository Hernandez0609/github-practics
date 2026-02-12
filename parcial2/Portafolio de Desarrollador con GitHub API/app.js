const GITHUB_USER = "Hernandez0609";

async function cargarDatosGitHub() {

    try {

        const peticiones = await Promise.all([
            fetch(`https://api.github.com/users/${GITHUB_USER}`),
            fetch(`https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=7&type=owner`),
            fetch(`https://api.github.com/users/${GITHUB_USER}/followers?per_page=5`)
        ]);

        const datosUsuario = await peticiones[0].json();
        const listaRepos = await peticiones[1].json();
        const listaSeguidores = await peticiones[2].json();

        renderizarPerfil(datosUsuario);
        renderizarRepos(listaRepos);
        renderizarSeguidores(listaSeguidores);

    } catch (err) {

        console.error("Fallo en la carga de datos:", err);
        document.getElementById("perfil-header").innerHTML =
            "<p>No fue posible obtener la información en este momento.</p>";
    }
}

function renderizarPerfil(info) {

    const contenedorPerfil = document.getElementById("perfil-header");

    contenedorPerfil.innerHTML = `
        <img src="${info.avatar_url}" alt="Foto de perfil" class="avatar">
        <h1>Juan José Hernandez Calva</h1>
        <p class="bio">Estudiante de la UTHH</p>
        <span class="location">Huejutla de Reyes, Hidalgo</span>
    `;
}

function renderizarRepos(repositorios) {

    const areaRepos = document.getElementById("repos-container");

    const tarjetas = repositorios.map(item => {

        const enlaceGithubPages = `https://${GITHUB_USER}.github.io/${item.name}/`;

        return `
            <div class="repo-card">
                <h4>${item.name}</h4>
                <p>${item.description ? item.description : "Proyecto disponible para revisión"}</p>
                <a href="${enlaceGithubPages}" target="_blank" class="btn-link">
                    Abrir proyecto
                </a>
            </div>
        `;
    });

    areaRepos.innerHTML = tarjetas.join("");
}

function renderizarSeguidores(personas) {

    const zonaSeguidores = document.getElementById("followers-container");

    if (personas.length === 0) {
        zonaSeguidores.innerHTML = "<p style='color:#9ca3af;'>Aún no hay seguidores registrados.</p>";
        return;
    }

    const avatares = personas.map(usuario => `
        <a href="${usuario.html_url}" target="_blank">
            <img src="${usuario.avatar_url}" 
                 alt="${usuario.login}" 
                 title="${usuario.login}" 
                 class="follower-avatar">
        </a>
    `);

    zonaSeguidores.innerHTML = avatares.join("");
}

cargarDatosGitHub();
