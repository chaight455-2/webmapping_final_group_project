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

// Create the (initially empty) layer that holds amenity dot markers
function createAmenityDotsLayer(map) {
    return L.layerGroup().addTo(map);
}

// Look up an amenity's color from CONFIG.AMENITIES by type
function getAmenityColor(type) {
    for (var i = 0; i < CONFIG.AMENITIES.length; i++) {
        if (CONFIG.AMENITIES[i].type === type) return CONFIG.AMENITIES[i].color;
    }
    return '#000';
}

// Rebuild the amenity dot markers based on the current active filters.
// One marker per building; its divIcon contains colored dots laid out in a
// flex grid that wraps when the row would exceed the building's pixel width
// at the current zoom.
function updateAmenityDots(map, dotsLayer, buildingLayer, activeFilters) {
    dotsLayer.clearLayers();
    if (!activeFilters || activeFilters.length === 0) return;

    var DOT_SIZE = 8;
    var DOT_GAP = 2;

    buildingLayer.eachLayer(function(layer) {
        var props = layer.feature.properties;
        var colors = [];

        for (var i = 0; i < activeFilters.length; i++) {
            var type = activeFilters[i];
            if (getAmenityCount(props, type) > 0) {
                colors.push(getAmenityColor(type));
            }
        }

        if (colors.length === 0) return;

        var bounds = layer.getBounds();
        var nw = map.latLngToContainerPoint(bounds.getNorthWest());
        var se = map.latLngToContainerPoint(bounds.getSouthEast());
        var buildingWpx = Math.abs(se.x - nw.x);

        var maxFit = Math.floor((buildingWpx + DOT_GAP) / (DOT_SIZE + DOT_GAP));
        var perRow = Math.max(1, Math.min(colors.length, maxFit));
        var rows = Math.ceil(colors.length / perRow);

        var iconW = perRow * DOT_SIZE + (perRow - 1) * DOT_GAP;
        var iconH = rows * DOT_SIZE + (rows - 1) * DOT_GAP;

        var html = '<div style="display:flex; flex-wrap:wrap; gap:' + DOT_GAP + 'px; width:' + iconW + 'px; pointer-events:none;">';
        for (var j = 0; j < colors.length; j++) {
            html += '<span style="width:' + DOT_SIZE + 'px; height:' + DOT_SIZE + 'px; border-radius:50%; background:' + colors[j] + '; box-shadow:0 0 0 1px #fff;"></span>';
        }
        html += '</div>';

        var icon = L.divIcon({
            className: '',
            html: html,
            iconSize: [iconW, iconH],
            iconAnchor: [iconW / 2, iconH / 2]
        });

        L.marker(bounds.getCenter(), {
            icon: icon,
            interactive: false,
            keyboard: false
        }).addTo(dotsLayer);
    });
}
