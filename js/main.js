// Initialize the Leaflet map centered on UW-Madison
function createMap() {
    var map = L.map('map', {
        center: [43.0766, -89.4125],
        zoom: 15
    });

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>'
    }).addTo(map);
}

document.addEventListener('DOMContentLoaded', createMap);
