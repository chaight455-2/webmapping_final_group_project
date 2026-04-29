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

    L.tileLayer(CONFIG.TILE_URL, {
        attribution: CONFIG.TILE_ATTRIBUTION
    }).addTo(map);

    window.__map = map;
    return map;
}
