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
    });
})();
