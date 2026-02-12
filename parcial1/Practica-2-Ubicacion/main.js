let lat = 21.175626
let lon = -98.593225

if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(

        (respuesta) => {

            var coordenadas = [lat, lon]

            let map = L.map('map').setView(coordenadas, 16)

            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(map);

            var polygon = L.polygon([
                [21.175632, -98.593117],
                [21.175693, -98.593126],
                [21.175698, -98.593078],
                [21.175637, -98.593069]

            ]).addTo(map);
            

            polygon.bindPopup('<b>Hola, esta es la ubicacion de mi casa en San Felipe Orizatlan:</b> <br> Mis coordenadas son: ' + lat + ', ' + lon).openPopup();
        },
        ()=>{}

    )
}
else
{
    alert("El navegador que tiene, no cuenta con geolocalización")
}