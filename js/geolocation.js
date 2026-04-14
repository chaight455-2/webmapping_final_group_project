// Initialize geolocation to show user's current position
function initGeolocation(map) {
    if (!navigator.geolocation) return;

    var userMarker = null;

    // Create locate-me button as a Leaflet control
    var LocateControl = L.Control.extend({
        options: { position: 'bottomright' },

        onAdd: function() {
            var container = L.DomUtil.create('div', 'leaflet-bar leaflet-control locate-btn-container');
            var btn = L.DomUtil.create('a', 'locate-btn', container);
            btn.href = '#';
            btn.title = 'Zoom to your location';
            btn.setAttribute('role', 'button');
            btn.innerHTML = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="8"/><line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/></svg>';

            L.DomEvent.disableClickPropagation(container);
            L.DomEvent.on(btn, 'click', function(e) {
                L.DomEvent.preventDefault(e);
                if (userMarker) {
                    map.setView(userMarker.getLatLng(), 17);
                }
            });

            container.style.display = 'none';
            this._container = container;
            return container;
        }
    });

    var locateControl = new LocateControl();
    locateControl.addTo(map);

    navigator.geolocation.watchPosition(
        function(position) {
            var lat = position.coords.latitude;
            var lng = position.coords.longitude;

            if (userMarker) {
                userMarker.setLatLng([lat, lng]);
            } else {
                userMarker = L.marker([lat, lng], {
                    icon: L.divIcon({
                        className: 'user-location-icon',
                        html: '<div class="user-location-dot"></div>',
                        iconSize: [16, 16]
                    })
                }).addTo(map);
                userMarker.bindPopup('You are here');

                // Zoom to user on first location fix
                map.setView([lat, lng], 17);

                // Show the locate button now that we have a position
                locateControl._container.style.display = '';
            }
        },
        function(error) {
            // Geolocation denied or unavailable — fail silently
        },
        {
            enableHighAccuracy: true
        }
    );
}
