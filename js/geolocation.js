// Initialize geolocation to show user's current position
function initGeolocation(map) {
    if (!navigator.geolocation) return;

    var userMarker = null;

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
