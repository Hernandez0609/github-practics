const GHIBLI_API = "https://ghibliapi.vercel.app/films";

document.addEventListener("DOMContentLoaded", loadFilms);

async function loadFilms() {
  try {
    const response = await fetch(GHIBLI_API);
    const films = await response.json();

    const container = document.getElementById("films");
    container.innerHTML = "";

    films.forEach(movie => {
      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
        <img src="${movie.image}">
        <h4>${movie.title}</h4>
      `;

      card.onclick = () => showFilmDetail(movie);
      container.appendChild(card);
    });

  } catch (error) {
    console.error("Error cargando películas:", error);
  }
}

function showFilmDetail(film) {
  document.getElementById("detail-title").textContent = film.title;
  document.getElementById("detail-image").src = film.movie_banner;
  document.getElementById("detail-director").textContent = film.director;
  document.getElementById("detail-producer").textContent = film.producer;
  document.getElementById("detail-year").textContent = film.release_date;
  document.getElementById("detail-description").textContent = film.description;

  document.getElementById("modal").classList.remove("hidden");
}

function closeFilm() {
  document.getElementById("modal").classList.add("hidden");
}
