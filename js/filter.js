// Initialize the filter panel with amenity checkboxes
function initFilter(map, buildingLayer) {
    var panel = document.getElementById('filter-panel');
    var activeFilters = [];

    // Build checkbox for each amenity type
    for (var i = 0; i < CONFIG.AMENITIES.length; i++) {
        var amenity = CONFIG.AMENITIES[i];
        var row = document.createElement('label');
        row.className = 'inline-flex md:flex items-center gap-1 mr-3 md:mr-0 mb-1 md:mb-1.5 text-sm cursor-pointer';

        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'w-[18px] h-[18px] m-0';
        checkbox.value = amenity.type;
        checkbox.checked = true;

        var dot = document.createElement('span');
        dot.className = 'inline-block w-2.5 h-2.5 rounded-full';
        dot.style.backgroundColor = amenity.color;

        var text = document.createTextNode(' ' + amenity.label);

        row.appendChild(checkbox);
        row.appendChild(dot);
        row.appendChild(text);
        panel.appendChild(row);

        activeFilters.push(amenity.type);
    }

    // Listen for checkbox changes
    panel.addEventListener('change', function(e) {
        if (e.target.type === 'checkbox') {
            var type = e.target.value;
            if (e.target.checked) {
                activeFilters.push(type);
            } else {
                activeFilters = activeFilters.filter(function(f) { return f !== type; });
            }
            updateBuildingVisibility(buildingLayer, activeFilters);
        }
    });
}

// Update building layer visibility based on active filters
function updateBuildingVisibility(buildingLayer, activeFilters) {
    buildingLayer.eachLayer(function(layer) {
        var props = layer.feature.properties;
        var hasActiveAmenity = false;

        for (var i = 0; i < activeFilters.length; i++) {
            if (getAmenityCount(props, activeFilters[i]) > 0) {
                hasActiveAmenity = true;
                break;
            }
        }

        if (hasActiveAmenity || activeFilters.length === 0) {
            layer.setStyle({ opacity: 1, fillOpacity: 0.4 });
        } else {
            layer.setStyle({ opacity: 0.2, fillOpacity: 0.1 });
        }
    });
}
