// Add building polygons to the map
function addBuildings(map, data) {
    var buildingLayer = L.geoJson(data, {
        style: function(feature) {
            return getBuildingStyle(feature);
        },
        onEachFeature: function(feature, layer) {
            layer.bindPopup(buildBuildingPopup(feature));

            // Use event delegation on the popup's content wrapper
            layer.on('popupopen', function() {
                var popup = layer.getPopup();
                var wrapper = popup.getElement().querySelector('.leaflet-popup-content');

                wrapper.addEventListener('click', function(e) {
                    // Handle amenity row click → drill down
                    var row = e.target.closest('.popup-amenity-row');
                    if (row) {
                        var type = row.getAttribute('data-type');
                        popup.setContent(buildAmenityDetail(feature, type));
                        popup.update();
                        return;
                    }

                    // Handle back button click → return to building popup
                    var back = e.target.closest('.detail-back-btn');
                    if (back) {
                        popup.setContent(buildBuildingPopup(feature));
                        popup.update();
                        return;
                    }
                });
            });
        }
    }).addTo(map);

    return buildingLayer;
}

// Render the campus boundary as a non-interactive styled outline
function addBoundary(map, boundary) {
    return L.geoJson(boundary, {
        style: CONFIG.BOUNDARY_STYLE,
        interactive: false
    }).addTo(map);
}

// Return style object for a building based on open/closed status
function getBuildingStyle(feature) {
    var open = isBuildingOpen(feature.properties.hours);

    return {
        fillColor: open ? CONFIG.DEFAULT_COLOR : CONFIG.CLOSED_COLOR,
        weight: 1,
        opacity: 1,
        color: '#333',
        fillOpacity: open ? 0.4 : 0.6
    };
}
