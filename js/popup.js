// Build popup HTML for a building feature
function buildBuildingPopup(feature) {
    var props = feature.properties;
    var open = isBuildingOpen(props.hours);
    var statusClasses = open
        ? 'inline-block px-2 py-0.5 rounded text-xs font-bold mb-1.5 bg-green-100 text-green-800'
        : 'inline-block px-2 py-0.5 rounded text-xs font-bold mb-1.5 bg-red-100 text-red-800';
    var statusText = open ? 'Open' : 'Closed';

    var html = '<div>';
    html += '<h3 class="m-0 mb-1 text-base">' + props.name + '</h3>';
    html += '<span class="' + statusClasses + '">' + statusText + '</span>';
    html += '<details class="text-xs text-gray-500 mb-1.5"><summary class="cursor-pointer list-none font-medium">Hours &#9662;</summary><div class="mt-1">' + formatHours(props.hours) + '</div></details>';
    html += '<div><h4 class="my-1 text-[13px]">Amenities</h4>';

    for (var i = 0; i < CONFIG.AMENITIES.length; i++) {
        var amenity = CONFIG.AMENITIES[i];
        var count = getAmenityCount(props, amenity.type);
        if (count > 0) {
            html += '<div class="popup-amenity-row flex items-center gap-1.5 text-[13px] py-0.5 cursor-pointer hover:bg-gray-100" data-building="' + props.name + '" data-type="' + amenity.type + '">';
            html += '<span class="inline-block w-2.5 h-2.5 rounded-full" style="background:' + amenity.color + '"></span> ';
            html += amenity.label + ': ' + count;
            html += '</div>';
        }
    }

    html += '</div></div>';
    return html;
}

// Build detail popup for a specific amenity type within a building
function buildAmenityDetail(feature, type) {
    var props = feature.properties;
    var amenity = CONFIG.AMENITIES.find(function(a) { return a.type === type; });
    var details = props[type + '_details'];

    var html = '<div>';
    html += '<span class="detail-back-btn cursor-pointer text-blue-500 text-xs mb-1.5 inline-block">&larr; Back</span>';
    html += '<h3 class="m-0 mb-1 text-base">' + amenity.label + '</h3>';
    html += '<p class="text-[13px] text-gray-500 m-0 mb-1">Building: ' + props.name + '</p>';

    if (details && details.length > 0) {
        for (var i = 0; i < details.length; i++) {
            var d = details[i];
            html += '<div class="border-b border-gray-200 py-1 text-[13px]">';
            if (details.length > 1) {
                html += '<p class="m-0 font-bold">#' + (i + 1) + '</p>';
            }
            html += '<p class="m-0">Floor: ' + (d.floor || 'N/A') + '</p>';
            html += '<p class="m-0">Location: ' + (d.location || 'N/A') + '</p>';
            if (d.access) {
                html += '<p class="m-0 text-gray-500">Access: ' + d.access + '</p>';
            }
            html += '</div>';
        }
    } else {
        html += '<p class="text-[13px] text-gray-400">No location details available.</p>';
    }

    html += '</div>';
    return html;
}
