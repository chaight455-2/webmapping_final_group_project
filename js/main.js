// Entry point — bootstrap the application
(function() {
    var map = createMap();

    loadAll(function(data) {
        var boundaryLayer = addBoundary(map, data.boundary);
        var buildingLayer = addBuildings(map, data.buildings);
        var dotsLayer = createAmenityDotsLayer(map);

        var campusBounds = boundaryLayer.getBounds();
        map.setMaxBounds(campusBounds);
        map.setMinZoom(map.getBoundsZoom(campusBounds));
        map.fitBounds(campusBounds, { padding: [10, 10] });

        initFilter(map, buildingLayer, dotsLayer);
        initSearch(map, buildingLayer);
        initGeolocation(map, campusBounds);

        document.getElementById('sheet-close').addEventListener('click', closeBuildingSheet);
        document.getElementById('sheet-back').addEventListener('click', function() {
            renderSheet('building');
            document.getElementById('sheet-close').focus();
        });
        document.getElementById('sheet-body').addEventListener('click', function(e) {
            var row = e.target.closest('.popup-amenity-row');
            if (row) renderSheet(row.getAttribute('data-type'));
        });
        document.addEventListener('keydown', function(e) {
            if (e.key !== 'Escape' || !sheetState.feature) return;
            if (sheetState.view === 'building') closeBuildingSheet();
            else renderSheet('building');
        });
    });
})();
