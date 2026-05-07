// Initialize and return the Leaflet map
function createMap() {
    var container = document.getElementById('map');

    // Clear stale Leaflet state if container was previously initialized
    if (container._leaflet_id) {
        delete container._leaflet_id;
        delete container._leaflet_events;
        container.innerHTML = '';
    }

    var map = L.map('map', {
        center: CONFIG.CENTER,
        zoom: CONFIG.ZOOM,
        zoomControl: false,
        maxBoundsViscosity: 1.0,
        maxZoom: 19
    });

    // Ensure that when the map is fully zomed in that the base layer dosen't dissapear
    L.tileLayer(CONFIG.TILE_URL, {
        attribution: CONFIG.TILE_ATTRIBUTION,
        maxNativeZoom: 18,
        maxZoom: 19
    }).addTo(map);

    window.__map = map;
    return map;
}
