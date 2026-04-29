// Build popup HTML for a building feature
// when: optional Date to evaluate open/closed status against; defaults to now
function buildBuildingPopup(feature, when) {
    var props = feature.properties;
    var open = isBuildingOpen(props.hours, when);
    var statusClasses = open
        ? 'inline-block px-2 py-0.5 rounded text-xs font-bold mb-1.5 bg-green-100 text-green-800'
        : 'inline-block px-2 py-0.5 rounded text-xs font-bold mb-1.5 bg-red-100 text-red-800';
    var statusText = open ? 'Open' : 'Closed';

    var html = '<div>';
    html += '<span class="' + statusClasses + '">' + statusText + '</span>';
    html += '<details class="text-xs text-gray-500 mb-1.5"><summary class="cursor-pointer list-none font-medium">Hours &#9662;</summary><div class="mt-1">' + formatHours(props.hours) + '</div></details>';
    html += '<div><h4 class="my-1 text-sm font-semibold">Amenities</h4>';

    for (var i = 0; i < CONFIG.AMENITIES.length; i++) {
        var amenity = CONFIG.AMENITIES[i];
        var count = getAmenityCount(props, amenity.type);
        if (count > 0) {
            html += '<div class="popup-amenity-row flex items-center gap-2 text-sm py-3 min-h-[44px] cursor-pointer border-b border-gray-100 hover:bg-gray-50 active:bg-gray-100" data-building="' + props.name + '" data-type="' + amenity.type + '">';
            html += '<span class="inline-block w-3 h-3 rounded-full flex-shrink-0" style="background:' + amenity.color + '"></span>';
            html += '<span class="flex-1">' + amenity.label + '</span>';
            html += '<span class="text-gray-500">' + count + ' &rsaquo;</span>';
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

    if (details && details.length > 0) {
        for (var i = 0; i < details.length; i++) {
            var d = details[i];
            html += '<div class="py-3 border-b border-gray-100 text-sm">';
            if (details.length > 1) {
                html += '<p class="m-0 mb-1 font-semibold text-gray-700">#' + (i + 1) + '</p>';
            }
            html += '<p class="m-0 mb-0.5"><span class="text-gray-500">Floor:</span> ' + (d.floor || 'N/A') + '</p>';
            html += '<p class="m-0 mb-0.5"><span class="text-gray-500">Location:</span> ' + (d.location || 'N/A') + '</p>';
            if (d.access) {
                html += '<p class="m-0 text-gray-500">Access: ' + d.access + '</p>';
            }
            html += '</div>';
        }
    } else {
        html += '<p class="text-sm text-gray-400 py-3">No location details available.</p>';
    }

    html += '</div>';
    return html;
}

// Sheet state and API
var sheetState = { feature: null, view: 'building', lastFocus: null };

function openBuildingSheet(feature) {
    sheetState.feature = feature;
    sheetState.lastFocus = document.activeElement;
    renderSheet('building');
    var sheet = document.getElementById('building-sheet');
    sheet.classList.remove('hidden');
    sheet.setAttribute('aria-hidden', 'false');
    requestAnimationFrame(function() { sheet.classList.add('open'); });
    document.getElementById('sheet-close').focus();
}

function closeBuildingSheet() {
    var sheet = document.getElementById('building-sheet');
    if (sheet.classList.contains('hidden')) return;
    sheet.classList.remove('open');
    sheet.setAttribute('aria-hidden', 'true');
    sheet.addEventListener('transitionend', function onEnd() {
        sheet.classList.add('hidden');
        sheet.removeEventListener('transitionend', onEnd);
    });
    if (sheetState.lastFocus && sheetState.lastFocus.focus) sheetState.lastFocus.focus();
    sheetState.feature = null;
    sheetState.view = 'building';
}

function renderSheet(view) {
    sheetState.view = view;
    var f = sheetState.feature;
    var titleEl = document.getElementById('sheet-title');
    var backBtn = document.getElementById('sheet-back');
    var body = document.getElementById('sheet-body');
    if (view === 'building') {
        titleEl.textContent = f.properties.name;
        backBtn.classList.add('hidden');
        body.innerHTML = buildBuildingPopup(f, getCheckTime());
    } else {
        var amenity = CONFIG.AMENITIES.find(function(a) { return a.type === view; });
        titleEl.textContent = amenity.label;
        backBtn.classList.remove('hidden');
        body.innerHTML = buildAmenityDetail(f, view);
    }
}

var helpSheetState = { lastFocus: null };

function openHelpSheet() {
    helpSheetState.lastFocus = document.activeElement;
    var sheet = document.getElementById('help-sheet');
    sheet.classList.remove('hidden');
    sheet.setAttribute('aria-hidden', 'false');
    requestAnimationFrame(function() { sheet.classList.add('open'); });
    document.getElementById('help-close').focus();
}

function closeHelpSheet() {
    var sheet = document.getElementById('help-sheet');
    if (sheet.classList.contains('hidden')) return;
    sheet.classList.remove('open');
    sheet.setAttribute('aria-hidden', 'true');
    sheet.addEventListener('transitionend', function onEnd() {
        sheet.classList.add('hidden');
        sheet.removeEventListener('transitionend', onEnd);
    });
    if (helpSheetState.lastFocus && helpSheetState.lastFocus.focus) helpSheetState.lastFocus.focus();
}
