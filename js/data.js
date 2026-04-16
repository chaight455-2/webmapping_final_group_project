// Fetch campus boundary, building footprints, and CSV amenity data,
// then join CSV rows to the matching footprint features by Name.
function loadAll(callback) {
    var boundaryReq = fetch(CONFIG.BOUNDARY_PATH).then(function(r) { return r.json(); });
    var footprintsReq = fetch(CONFIG.FOOTPRINTS_PATH).then(function(r) { return r.json(); });
    var csvReq = fetch(CONFIG.CSV_PATH).then(function(r) { return r.text(); });

    Promise.all([boundaryReq, footprintsReq, csvReq]).then(function(results) {
        var boundary = results[0];
        var footprints = results[1];
        var csvText = results[2];

        var rows = d3.csvParse(csvText);
        var buildings = joinFootprintsWithCsv(footprints, rows);

        callback({ boundary: boundary, buildings: buildings });
    });
}

// Build a {type: 'FeatureCollection', features: [...]} from footprint features
// whose Name matches a CSV row's building_name. CSV-derived props replace
// footprint props so the rest of the app sees the familiar schema.
function joinFootprintsWithCsv(footprints, csvRows) {
    var csvByName = {};
    for (var i = 0; i < csvRows.length; i++) {
        var row = csvRows[i];
        if (!row.building_name) continue;
        var key = row.building_name.trim().toLowerCase();
        csvByName[key] = csvRowToBuildingProps(row);
    }

    var pickedByBuildingId = {};
    for (var j = 0; j < footprints.features.length; j++) {
        var feat = footprints.features[j];
        var name = (feat.properties && feat.properties.Name) || '';
        var nameKey = name.trim().toLowerCase();
        if (!csvByName[nameKey]) continue;

        // Dedupe multiple footprints per building (Foundation + Eave).
        // Prefer Foundation; fall back to whatever arrives first.
        var bid = feat.properties.BUILDINGFO;
        var existing = pickedByBuildingId[bid];
        if (existing && existing.properties.FootprintT === 'Foundation') continue;

        pickedByBuildingId[bid] = feat;
    }

    var features = [];
    for (var bid in pickedByBuildingId) {
        var picked = pickedByBuildingId[bid];
        var keyLower = picked.properties.Name.trim().toLowerCase();
        var mergedProps = Object.assign(
            { name: picked.properties.Name.trim() },
            csvByName[keyLower]
        );
        features.push({
            type: 'Feature',
            geometry: picked.geometry,
            properties: mergedProps
        });
    }

    return { type: 'FeatureCollection', features: features };
}
