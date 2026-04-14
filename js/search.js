// Initialize the building search bar
function initSearch(map, buildingLayer) {
    var searchInput = document.getElementById('search-bar');

    searchInput.addEventListener('input', function() {
        var query = searchInput.value.toLowerCase().trim();
        if (!query) return;

        buildingLayer.eachLayer(function(layer) {
            var name = layer.feature.properties.name.toLowerCase();
            if (name.indexOf(query) !== -1) {
                map.fitBounds(layer.getBounds());
                layer.openPopup();
            }
        });
    });

    // Zoom to building on Enter key
    searchInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            var query = searchInput.value.toLowerCase().trim();
            if (!query) return;

            buildingLayer.eachLayer(function(layer) {
                var name = layer.feature.properties.name.toLowerCase();
                if (name.indexOf(query) !== -1) {
                    map.fitBounds(layer.getBounds());
                    layer.openPopup();
                }
            });
        }
    });
}
