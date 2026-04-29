// Time-of-check state. null = use the system's current time.
// Module-scoped so buildings.js can read it via getCheckTime().
var checkTime = null;
function getCheckTime() { return checkTime; }

// Initialize the filter panel with amenity checkboxes
function initFilter(map, buildingLayer, dotsLayer) {
    var panel = document.getElementById('filter-panel');
    var toggle = document.getElementById('filter-toggle');
    var icon = document.getElementById('filter-icon');
    var list = document.getElementById('filter-list');
    var activeFilters = [];

    // Wire up the time-of-check picker (day-of-week + time-of-day)
    var dayInput = document.getElementById('check-day');
    var timeInput = document.getElementById('check-time');

    function updateCheckTime() {
        var dayVal = dayInput.value;     // '' = today; '0'..'6' = Sun..Sat
        var timeVal = timeInput.value;   // '' = current time; '0'..'23' = hour-of-day

        if (dayVal === '' && timeVal === '') {
            checkTime = null;
        } else {
            var d = new Date();
            if (dayVal !== '') {
                var target = parseInt(dayVal, 10);
                d.setDate(d.getDate() + ((target - d.getDay() + 7) % 7));
            }
            if (timeVal !== '') {
                d.setHours(parseInt(timeVal, 10), 0, 0, 0);
            }
            checkTime = d;
        }

        buildingLayer.eachLayer(function(layer) {
            layer.setStyle(getBuildingStyle(layer.feature, checkTime));
        });
        updateBuildingVisibility(buildingLayer, activeFilters);
    }

    dayInput.addEventListener('change', updateCheckTime);
    timeInput.addEventListener('change', updateCheckTime);

    // Toggle expand/collapse
    toggle.addEventListener('click', function() {
        var open = list.style.display !== 'none';
        list.style.display = open ? 'none' : 'block';
        // Swap hamburger / X icon
        if (open) {
            icon.innerHTML = '<line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>';
        } else {
            icon.innerHTML = '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>';
        }
    });

    // Build checkbox for each amenity type
    for (var i = 0; i < CONFIG.AMENITIES.length; i++) {
        var amenity = CONFIG.AMENITIES[i];
        var row = document.createElement('label');
        row.className = 'flex items-center gap-2 py-1 cursor-pointer text-[13px] text-gray-700';

        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'w-4 h-4 m-0';
        checkbox.value = amenity.type;
        checkbox.checked = true;
        checkbox.style.accentColor = '#4285f4';

        var dot = document.createElement('span');
        dot.className = 'inline-block w-2.5 h-2.5 rounded-full';
        dot.style.backgroundColor = amenity.color;

        var text = document.createTextNode(' ' + amenity.label);

        row.appendChild(checkbox);
        row.appendChild(dot);
        row.appendChild(text);
        list.appendChild(row);

        activeFilters.push(amenity.type);
    }

    updateAmenityDots(map, dotsLayer, buildingLayer, activeFilters);

    // Re-wrap dots when zoom changes (building pixel width changes with zoom)
    map.on('zoomend', function() {
        updateAmenityDots(map, dotsLayer, buildingLayer, activeFilters);
    });

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
            updateAmenityDots(map, dotsLayer, buildingLayer, activeFilters);
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
